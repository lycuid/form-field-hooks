import * as React from 'react';

import { Field, Types } from '../Interfaces';
import { useStateReducer } from "./form-reducers";


let { useEffect, useMemo, useRef } = React;


/**
 * 
 * @todo instead of having seperate reducers, have the same one somehow,
 * rendering will be jsut once then.
 * 
 * @param attributes: Field.Attributes
 * @param options: Field.Options 
 */
export const useField = (
  attributes: Field.Attributes,
  options?: Field.Options
): any => /** @todo add a static return type here */
{
  // By default setting it to text as there are some jquery/querySelectors, 
  // dependent on the type of the input itself.
  attributes.type = attributes.type || '';
  let [state, dispatchState]: [Field.Attributes, React.Dispatch<any>] = useStateReducer(attributes);

  let [meta, dispatchMeta]: [Field.Meta, React.Dispatch<Field.Meta>] = useStateReducer({
    touched: false, dirty: false, valid: true
  });
  
  
  // local function, so the state, dispatch etc is accessable, rather
  // than passing as argument, which can get a little messy in this case.
  const sanitize = (e: any, action: string /** @todo add static type here */) => {
    // update meta
    if (!meta.touched) { dispatchMeta({ touched: true }); }

    // run-validations
    var valid = e.target.validity.valid;
    valid = (options && options.validity) ?
    (options.validity(state) && valid) : valid;
    dispatchMeta({ valid });

    // kindly opposite of preventDefault, only this continues the action
    continueDefault(e, state, action);
  }
 

  // event handlers
  const onChange: Types.Void = (
    e: React.ChangeEvent<Types.HTMLInput>
  ): void => sanitize(e, 'onChange');
  
  const onBlur: Types.Void = (e: any) => sanitize(e, 'onBlur');

  const input: any = { state: {...state, onChange, onBlur}, dispatchState, meta, dispatchMeta };

  return input;
}




export const useInput = (
  attributes: Field.InputAttributes,
  options?: Field.Options
): Field.Input =>
{
  let { state, dispatchState, meta, dispatchMeta } = useField(attributes, options)

  const onChange: Types.Void = (
    e: React.ChangeEvent<Types.HTMLInput>
  ) =>
  {
    const { value } = e.target;
    dispatchState({ value });
    
    continueDefault(e, state, 'onChange');
  }

  // effects: cDM, cDU.
  // state specific cDU, called only when 'input.value' state is updated.
  useEffect(() => {
    // checks if new 'input.value' is equal to the originally provided
    // 'value' in 'Attributes'.
    if (attributes.value != state.value && !meta.dirty)
      dispatchMeta({ dirty: true });
  }, [state.value]);
  

  let input: Field.Input = { attr: { ...state, onChange }, setAttr: dispatchState, meta };

  return input;
}



export const useCheckbox = (
  attributes: Field.CheckboxAttributes,
  options?: Field.Options
): Field.Input =>
{
  // dont need the useless value prop here
  let { ...initialAttr } = attributes; 

  let { state, dispatchState, meta, dispatchMeta } = useField(
    {...{initialAttr, value: 'true'}, type: 'checkbox'},
    (options || {}) as Field.Options
  );

  const onChange: Types.Void = (
    e: React.ChangeEvent<Types.HTMLInput>
  ) =>  {
    if (!meta.dirty) dispatchMeta({ dirty: true });
    console.log(state.checked);
    dispatchState({ checked: !state.checked });

    continueDefault(e, state, 'onChange');
  }

  return { attr: {...state, onChange}, setAttr: dispatchState, meta };
}




















const continueDefault = (
  e: React.ChangeEvent<Types.HTMLInput>,
  state: Field.Attributes,
  action: string
): void => state[action] && state[action](e);