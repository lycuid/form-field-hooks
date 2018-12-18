import * as React from 'react';

import { Types, Field } from '../Interfaces';
import { useStateReducer } from "./form-reducers";

import { continueDefault } from '../Utils';

let { useEffect } = React;

/**
 * @param attributes should be valid HTML-DOM input attributes.
 * @param options: reference -> Field.Options 
 */
export const useField = <T extends {}>(
  attributes: Field.HTMLGenericAttributes,
  options?: Field.Options
): Field.BasicElement<T> =>
{
  
  // By default setting it to text as there are some jquery/querySelectors, 
  // dependent on the type of the input itself.
  attributes.type = attributes.type || '';

  const defaultMeta: Field.Meta = {
    touched: false,
    dirty: false,
    show: true,
    valid: true,
  };

  let [attr, dispatchAttr]: Types.Dispatcher<any> = useStateReducer(attributes);
  let [meta, dispatchMeta]: Types.Dispatcher<any> = useStateReducer(defaultMeta);
  let [opts, dispatchOptions]: Types.Dispatcher<Field.Options> = useStateReducer(options);
  /**
   * @param defaultValid just in case if any validations needs
   * to be run before `sanitize`.
   * 
   * local function, so the attr, dispatch etc is accessable, rather
   * than passing as argument, which can get a little messy in this case.
   */
  const sanitize = (defaultValid: boolean, defaultShow: boolean) => {
    // run-validations
    if (opts) {
      var defaultMeta: any = {};

      const valid: boolean = opts.validations ?
        (opts.validations(attr) && defaultValid) : defaultValid;
      const show: boolean = opts.display ?
        (opts.display(attr) && defaultShow) : defaultShow;

      if (valid !== meta.valid) defaultMeta.valid = valid;
      if (show !== meta.show) defaultMeta.show = show;

      Object.keys(defaultMeta).length && dispatchMeta(defaultMeta);
    }
  }

  // Event Handlers.
  const onBlur: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    sanitize(e.target.validity.valid, true);
    continueDefault(e, attr, 'onBlur');
  }

  const onFocus: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    sanitize(e.target.validity.valid, true);
    continueDefault(e, attr, 'onFocus');
  }

  // effects: cDM, cDU.
  // attr specific cDU, called only when `attr.value` is updated.
  useEffect(() => {
    // checks if new 'attr.value' is equal to the originally provided
    // 'value' in 'Attributes'.
    if (!meta.dirty && attributes.value != attr.value)
      dispatchMeta({ dirty: true });
    sanitize(true, true);
  }, [attr.value]);

  useEffect(() => sanitize(true, true), [opts]);

  const field: Field.BasicElement<T> = {
    attr: {...attr, onBlur, onFocus}, dispatchAttr,
    meta, dispatchMeta, sanitize, dispatchOptions
  };

  return field;
}



export const useCheckableField = <T extends {}>(
  attributes: Field.InputAttributes,
  options?: Field.Options
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
  } = useField(attributes, (options || {}) as Field.Options);

  // effects: cDM, cDU.
  // probably the only difference would be to watch the `checked`
  // attribute for updating `meta`, rest should be handled in `useField`.
  useEffect(() => {
    // we wont check value as it is already been handled in `useField`.
    if (attributes.checked !== attr.checked && !meta.dirty)
      dispatchMeta({ dirty: true });
    sanitize(true);
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
  options?: Field.Options
): Field.TextAreaElement =>
{

  const defaultMeta: Field.Meta = {
    touched: false,
    dirty: false,
    valid: true,
    show: true
  };

  let [attr, dispatchAttr]: Types.Dispatcher<any> = useStateReducer(attributes);
  let [meta, dispatchMeta]: Types.Dispatcher<any> = useStateReducer(defaultMeta);
  let [opts, dispatchOptions]: Types.Dispatcher<Field.Options> = useStateReducer(options);

  /**
   * @param defaultValid just in case if any validations needs
   * to be run before `sanitize`.
   * 
   * local function, so the attr, dispatch etc is accessable, rather
   * than passing as argument, which can get a little messy in this case.
   */
  const sanitize = (defaultValid: boolean, defaultShow: boolean) => {
    // run-validations
    if (opts) {
      var defaultMeta: any = {};

      const valid: boolean = opts.validations ?
        (opts.validations(attr) && defaultValid) : defaultValid;
      const show: boolean = opts.display ?
        (opts.display(attr) && defaultShow) : defaultShow;

      if (valid !== meta.valid) defaultMeta.valid = valid;
      if (show !== meta.show) defaultMeta.show = show;

      Object.keys(defaultMeta).length && dispatchMeta(defaultMeta);
    }
  }

  // Event Handlers.
  const onChange: Types.Void = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) =>
  {
    const { value } = e.target;
    dispatchAttr({ value });
    continueDefault(e, attr, 'onChange');
  }

  const onBlur: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    sanitize(e.target.validity.valid, true);
    continueDefault(e, attr, 'onBlur');
  }

  const onFocus: Types.Void = (e: any) => {
    if (!meta.touched) dispatchMeta({ touched: true });
    sanitize(e.target.validity.valid, true);
    continueDefault(e, attr, 'onFocus');
  }

  // effects: cDM, cDU.
  // attr specific cDU, called only when `attr.value` is updated.
  useEffect(() => {
    // checks if new 'attr.value' is equal to the originally provided
    // 'value' in 'Attributes'.
    if (attributes.value != attr.value && !meta.dirty)
      dispatchMeta({ dirty: true });
    sanitize(true, true);
  }, [attr.value]);

  useEffect(() => sanitize(true, true), [opts]);

  const element: Field.TextAreaElement = {
    attr: {...attr, onChange, onBlur, onFocus}, dispatchAttr,
    meta, dispatchMeta, dispatchOptions,
    sanitize, fieldType: 'textarea'
  };

  return element;
}


