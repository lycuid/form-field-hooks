import * as React from 'react';

import { Field } from '../Interfaces';
import { useStateReducer } from "./form-reducers";

import { continueDefault } from '../Utils';

let { useEffect } = React;

/**
 * @param attributes should be valid HTML-DOM input attributes.
 * @param options: reference -> Field.Options 
 */
export const useField = (
  attributes: Field.Attributes,
  options?: Field.Options
): Field.BasicElement =>
{
  // By default setting it to text as there are some jquery/querySelectors, 
  // dependent on the type of the input itself.
  attributes.type = attributes.type || '';

  const defaultMeta: Field.Meta = {
    touched: false,
    dirty: false,
    valid: true,
    show: true
  };

  let [state, dispatchState]: Types.Reducer<any> = useStateReducer(attributes);
  let [meta, dispatchMeta]: Types.Reducer<any> = useStateReducer(defaultMeta);
  
  /**
   * @param defaultValid just in case if any validations needs
   * to be run before `sanitize`.
   * 
   * local function, so the state, dispatch etc is accessable, rather
   * than passing as argument, which can get a little messy in this case.
   */
  const sanitize = (defaultValid: boolean) => {
    // run-validations
    const valid: boolean = (options && options.validations) ?
    (options.validations(state) && defaultValid) : defaultValid;
    
    valid !== state.valid && dispatchMeta({ valid, show: valid });
  }

  // Event Handlers.
  const onBlur: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    sanitize(e.target.validity.valid);
    continueDefault(e, state, 'onBlur');
  }

  const onFocus: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    sanitize(e.target.validity.valid);
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
  

  const field: Field.BasicElement = {
    state: {...state, onBlur, onFocus}, dispatchState,
    meta, dispatchMeta, sanitize
  };

  return field;
}



export const useCheckableField = (
  attributes: Field.Attributes,
  options?: Field.Options
): Field.BasicElement =>
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
    if (attributes.checked !== state.checked && !meta.dirty)
      dispatchMeta({ dirty: true });
    sanitize(true);
  }, [state.checked]);

  return { state, dispatchState, meta, dispatchMeta, sanitize };
}








/**
 * @todo make this one a basic Field (only meta manipulation)
 * and create a high level hook for state manipulation.
 * 
 * @param attributes valid textarea attributes
 * @param options 
 */
export const useTextAreaField = (
  attributes: Field.TextAreaAttributes,
  options?: Field.Options
): Field.TextAreaElement =>
{

  const defaultMeta: Field.Meta = {
    touched: false,
    dirty: false,
    valid: true,
    show: true
  };

  let [state, dispatchState]: Types.Reducer<any> = useStateReducer(attributes);
  let [meta, dispatchMeta]: Types.Reducer<any> = useStateReducer(defaultMeta);
  
  /**
   * @param defaultValid just in case if any validations needs
   * to be run before `sanitize`.
   * 
   * local function, so the state, dispatch etc is accessable, rather
   * than passing as argument, which can get a little messy in this case.
   */
  const sanitize = (defaultValid: boolean) => {
    // run-validations
    const valid: boolean = (options && options.validations) ?
    (options.validations(state) && defaultValid) : defaultValid;
    
    valid !== state.valid && dispatchMeta({ valid, show: valid });
  }

  // Event Handlers.
  const onChange: Types.Void = (
    e: React.ChangeEvent<Types.HTMLTextArea>
  ) =>
  {
    const { value } = e.target;
    dispatchState({ value });
    continueDefault<Types.HTMLTextArea>(e, state, 'onChange');
  }

  const onBlur: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    sanitize(e.target.validity.valid);
    continueDefault(e, state, 'onBlur');
  }

  const onFocus: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    sanitize(e.target.validity.valid);
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
  

  const field: Field.TextAreaElement = {
    attr: {...state, onChange, onBlur, onFocus}, setAttr: dispatchState, meta
  };

  return field;
}


