import * as React from 'react';

import { Field, Types } from '../Interfaces';
import { useStateReducer } from "./form-reducers";

import { continueDefault } from '../Utils';

let { useEffect } = React;

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
  const sanitize = (defaultValid: boolean/** just in case */) => {
    // run-validations
    const valid = (options && options.validations) ?
    (options.validations(state) && defaultValid) : defaultValid;
    
    valid !== state.valid && dispatchMeta({ valid });
  }
  
  
  // event handlers
  const onChange: Types.Void = (
    e: React.ChangeEvent<Types.HTMLInput>
  ): void => {
    console.log('called Field');
    // if (!meta.touched) { dispatchMeta({ touched: true }); }
    continueDefault(e, state, 'onChange');
  }
  
  const onBlur: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    continueDefault(e, state, 'onBlur');
  }

  const onFocus: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    continueDefault(e, state, 'onFocus');
  }
  
  // effects: cDM, cDU.
  // state specific cDU, called only when `state.value` is updated.
  useEffect(() => {
    // checks if new 'state.value' is equal to the originally provided
    // 'value' in 'Attributes'.
    if (attributes.value != state.value && !meta.dirty)
      dispatchMeta({ dirty: true });
    sanitize(true);
  }, [state.value]);
  

  /** @todo add proper type definition here. */
  const field: any = {
    state: {...state, onChange, onBlur, onFocus}, dispatchState,
    meta, dispatchMeta, sanitize
  };

  return field;
}



export const useCheckableField = (
  attributes: Field.Attributes,
  options?: Field.Options
): any =>
{

  let { state, dispatchState, meta, dispatchMeta, sanitize } = useField(
    attributes, (options || {}) as Field.Options
  );

  // effects: cDM, cDU.
  // state specific cDU, called only when
  // `state.checked` || `state.value` is updated.
  useEffect(() => {
    // we wont check value as it is already been handled in `useField`.
    if (attributes.checked !== state.checked && !meta.dirty)
      dispatchMeta({ dirty: true });
    sanitize(true);
  }, [state.checked]);

  return {
    state, dispatchState,
    meta, dispatchMeta,
    sanitize
  };
}


