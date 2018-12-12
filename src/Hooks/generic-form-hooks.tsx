import * as React from 'react';

import { Field, Types } from '../Interfaces';
import { useStateReducer } from "./form-reducers";

import { continueDefault } from '../Utils';

let { useEffect } = React;

/**
 * @todo instead of having seperate reducers, have the same one somehow,
 * rendering will be jsut once then.
 * 
 * @param attributes should be valid HTML DOM-input props.
 * @param options: reference -> Field.Options 
 */
export const useField = (
  attributes: Field.Attributes,
  options?: Field.Options
): any => /** @todo add a static return type here */
{
  // By default setting it to text as there are some jquery/querySelectors, 
  // dependent on the type of the input itself.
  attributes.type = attributes.type || '';

  const defaultMeta: Field.Meta = {touched: false, dirty: false, valid: true};

  let [state, dispatchState] = useStateReducer(attributes);
  let [meta, dispatchMeta] = useStateReducer(defaultMeta);
  
  /**
   * @param defaultValid just in case if any validations run before `sanitize`.
   * 
   * local function, so the state, dispatch etc is accessable, rather
   * than passing as argument, which can get a little messy in this case.
   */
  const sanitize = (defaultValid: boolean) => {
    // run-validations
    const valid: boolean = (options && options.validations) ?
    (options.validations(state) && defaultValid) : defaultValid;
    
    valid !== state.valid && dispatchMeta({ valid });
  }

  // EVENT HANDLERS
  // as this is the lowest level of Field, we dont need `continueDefault`
  // for onChange as it will be done by default.
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
    state: {...state, onBlur, onFocus}, dispatchState,
    meta, dispatchMeta, sanitize
  };

  return field;
}



export const useCheckableField = (
  attributes: Field.Attributes,
  options?: Field.Options
): any =>
{
  // extending `useField` for checkableField.
  let {
    state,
    dispatchState,
    meta,
    dispatchMeta,
    sanitize
  } = useField(attributes, (options || {}) as Field.Options);

  // effects: cDM, cDU.
  // probably the only difference would be to watch the `checked`
  // attribute for updating `meta`, rest should be handled in `useField`.
  useEffect(() => {
    // we wont check value as it is already been handled in `useField`.
    console.log('meta called');
    console.log(attributes.checked, state.checked);
    if (attributes.checked !== state.checked && !meta.dirty)
      dispatchMeta({ dirty: true });
    sanitize(true);
  }, [state.checked]);

  return { state, dispatchState, meta, dispatchMeta, sanitize };
}


