import * as React from 'react';

import { Types, Field } from '../Interfaces';
import { useStateReducer } from "./form-reducers";

import { continueDefault } from '../Utils';

/**
 * @param attributes should be valid HTML-DOM input attributes.
 * @param options: reference -> Field.Options 
 */
export const useField = <T extends {}>(
  attributes: Field.HTMLGenericAttributes,
  options?: Field.Options,
  react?: any,
): any =>
{

  const defaultMeta: Field.Meta = {
    touched: false,
    dirty: false,
    show: true,
    valid: true,
    customValidity: '',
  };

  let [attr, dispatchAttr]: Types.Dispatcher<any> = useStateReducer(attributes, react);
  let [meta, dispatchMeta]: Types.Dispatcher<any> = useStateReducer(defaultMeta, react);
  let [opts, dispatchOptions]: Types.Dispatcher<Field.Options> = useStateReducer(options, react);
  /**
   * @param defaultValid just in case if any validations needs
   * to be run before `sanitize`.
   * 
   * local function, so the attr, dispatch etc is accessable, rather
   * than passing as argument, which can get a little messy in this case.
   */
  const sanitize = ({valid, show}: {valid?: boolean, show?: boolean}) => {
    // run-validations
    valid = valid !== undefined ? valid : meta.valid;
    show = show !== undefined ? show : meta.show;
    
    let customValidity = meta.customValidity, isValid;
    
    let defaultMeta: any = {};

    if (opts) {
      if (opts.validations) {
        [isValid, customValidity] = opts.validations(attr);
        valid = isValid && valid
      }
      show = opts.display ?
      (opts.display(attr) && show) : show;
    }

    if (valid !== meta.valid) defaultMeta.valid = valid;
    if (customValidity !== meta.customValidity) defaultMeta.customValidity = customValidity;
    if (show !== meta.show) defaultMeta.show = show;
    Object.keys(defaultMeta).length && dispatchMeta(defaultMeta);

  }

  // Event Handlers.
  const onBlur: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    const { valid, customError } = e.target.validity;
    sanitize({ valid: customError ? true : valid });
    continueDefault(e, attr, 'onBlur');
  }

  const onChange: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    const { valid, customError } = e.target.validity;
    sanitize({ valid: customError ? true : valid });
    continueDefault(e, attr, 'onChange');
  }
  
  const onFocus: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    const { valid, customError } = e.target.validity;
    sanitize({ valid: customError ? true : valid });
    continueDefault(e, attr, 'onFocus');
  }

  // effects: cDM, cDU.
  // attr specific cDU, called only when `attr.value` is updated.
  (react || React).useEffect(() => {
    // checks if new 'attr.value' is equal to the originally provided
    // 'value' in 'Attributes'.
    if (!meta.dirty && attributes.value != attr.value)
      dispatchMeta({ dirty: true });
    sanitize({});
  }, [attr.value]);

  (react || React).useEffect(() => sanitize({}), [opts]);

  const field: Field.BasicElement<T> = {
    attr: {...attr, onBlur, onFocus, onChange}, dispatchAttr,
    meta, dispatchMeta, sanitize, dispatchOptions
  };

  return field;
}



export const useCheckableField = <T extends {}>(
  attributes: Field.InputAttributes,
  options?: Field.Options,
  react?: any,
): Field.BasicElement<T> =>
{
  // extending `useField` for checkableField.
  let {
    attr,
    dispatchAttr,
    meta,
    dispatchMeta,
    sanitize,
    dispatchOptions
  } = useField(attributes, (options || {}) as Field.Options, react);

  // effects: cDM, cDU.
  // probably the only difference would be to watch the `checked`
  // attribute for updating `meta`, rest should be handled in `useField`.
  (react || React).useEffect(() => {
    // we wont check value as it is already been handled in `useField`.
    if (attributes.checked !== attr.checked && !meta.dirty)
      dispatchMeta({ dirty: true });
    sanitize({});
  }, [attr.checked]);

  return { attr, dispatchAttr, meta, dispatchMeta, sanitize, dispatchOptions };
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
  options?: Field.Options,
  react?: any,
): Field.TextAreaElement =>
{

  const defaultMeta: Field.Meta = {
    touched: false,
    dirty: false,
    valid: true,
    show: true,
    customValidity: '',
  };

  let [attr, dispatchAttr]: Types.Dispatcher<any> = useStateReducer(attributes, react);
  let [meta, dispatchMeta]: Types.Dispatcher<any> = useStateReducer(defaultMeta, react);
  let [opts, dispatchOptions]: Types.Dispatcher<Field.Options> = useStateReducer(options, react);

  /**
   * @param defaultValid just in case if any validations needs
   * to be run before `sanitize`.
   * 
   * local function, so the attr, dispatch etc is accessable, rather
   * than passing as argument, which can get a little messy in this case.
   */
  const sanitize = ({valid, show}: {valid?: boolean, show?: boolean}) => {
    // run-validations
    valid = valid !== undefined ? valid : meta.valid;
    show = show !== undefined ? show : meta.show;
    
    let customValidity = meta.customValidity, isValid;
    
    let defaultMeta: any = {};

    if (opts) {
      if (opts.validations) {
        [isValid, customValidity] = opts.validations(attr);
        valid = isValid && valid
      }
      show = opts.display ?
      (opts.display(attr) && show) : show;
    }

    if (valid !== meta.valid) defaultMeta.valid = valid;
    if (customValidity !== meta.customValidity) defaultMeta.customValidity = customValidity;
    if (show !== meta.show) defaultMeta.show = show;
    Object.keys(defaultMeta).length && dispatchMeta(defaultMeta);

  }

  // Event Handlers.
  const onBlur: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    const { valid, customError } = e.target.validity;
    sanitize({ valid: customError ? true : valid });
    continueDefault(e, attr, 'onBlur');
  }

  const onChange: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    const { valid, customError } = e.target.validity;
    sanitize({ valid: customError ? true : valid });
    continueDefault(e, attr, 'onChange');
  }
  
  const onFocus: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    const { valid, customError } = e.target.validity;
    sanitize({ valid: customError ? true : valid });
    continueDefault(e, attr, 'onFocus');
  }

  // effects: cDM, cDU.
  // attr specific cDU, called only when `attr.value` is updated.
  (react || React).useEffect(() => {
    // checks if new 'attr.value' is equal to the originally provided
    // 'value' in 'Attributes'.
    if (attributes.value != attr.value && !meta.dirty)
      dispatchMeta({ dirty: true });
    sanitize({});
  }, [attr.value]);

  (react || React).useEffect(() => sanitize({}), [opts]);

  const element: Field.TextAreaElement = {
    attr: {...attr, onChange, onBlur, onFocus}, dispatchAttr,
    meta, dispatchMeta, dispatchOptions,
    sanitize, fieldType: 'textarea'
  };

  return element;
}


