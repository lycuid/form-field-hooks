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
): Field.BasicElement<T> =>
{

  const defaultMeta: Field.Meta = {
    touched: false,
    dirty: false,
    show: true,
    valid: true,
    prevInputs: [attributes.value || null],
    validationMessage: '',
  };

  let [attr, dispatchAttr]: Types.Dispatcher<any> = useStateReducer(attributes, react);
  let [meta, dispatchMeta]: Types.Dispatcher<any> = useStateReducer(defaultMeta, react);
  let [opts, dispatchOptions]: Types.Dispatcher<Field.Options> = useStateReducer(options, react);
  let [ref, setRef] = (react || React).useState(null);
  /**
   * @param defaultValid just in case if any validations needs
   * to be run before `sanitize`.
   * 
   * local function, so the attr, dispatch etc is accessable, rather
   * than passing as argument, which can get a little messy in this case.
   */
  const sanitize = () => {
    let valid: boolean = true, show: boolean = true, validationMessage: string = '';
    let defaultMeta: any = {};

    if (opts) {
      if (opts.validations) {
        [valid, validationMessage] = opts.validations(attr);
      }
      show = opts.display ?
        (opts.display(attr) && show) : show;
    }

    if (ref) {
      if (!valid) {
        ref.setCustomValidity(validationMessage)
      } else {
        if (ref.validity.customError) {
          ref.setCustomValidity('');
        }
        valid = ref.validity.valid;
        validationMessage = ref.validationMessage;
      }
    }

    if (valid !== meta.valid) defaultMeta.valid = valid;
    if (show !== meta.show) defaultMeta.show = show;
    if (validationMessage !== meta.validationMessage) defaultMeta.validationMessage = validationMessage;

    Object.keys(defaultMeta).length && dispatchMeta(defaultMeta);
  }


  const addValueToMeta = (value: string | string[]) => {
    // appending to meta, if not the same as last
    if (meta.prevInputs[meta.prevInputs.length - 1] !== value) {
      let updated = meta.prevInputs.slice();
      updated.push(value)
      dispatchMeta({ prevInputs: updated });
    }
  }

  // Event Handlers.

  const onBlur: Types.Void = (
    e: React.FocusEvent<Field.HTMLGenericElement>,
  ): void =>
  {
    let { touched } = meta;
    if (!ref) { setRef(e.target) }
    if (!touched) { dispatchMeta({ touched: true }) }

    sanitize();
    addValueToMeta(attr.value);

    continueDefault(e, attr, 'onBlur');
  }

  const onFocus: Types.Void = (
    e: React.FocusEvent<Field.HTMLGenericElement>,
  ): void =>
  {
    let { touched } = meta;
    if (!ref) { setRef(e.target) }
    if (!touched) { dispatchMeta({ touched: true }) }

    sanitize();
    continueDefault(e, attr, 'onFocus');
  }

  // same as the above event handling functions, except no `sanitize`
  // here as it is been taken care of in the side effect for value
  // change, which is almost equivivalent to what this function does.
  // 
  // the only difference between this funciton and the effect is that
  // the side effect is called after the value changes,
  // where as `onChange` is called before.
  const onChange: Types.Void = (
    e: React.ChangeEvent<Field.HTMLGenericElement>,
  ): void =>
  {
    let { touched } = meta;
    if (!ref) { setRef(e.target) }
    if (!touched) { dispatchMeta({ touched: true }) }

    continueDefault(e, attr, 'onChange');
  }
  
  // effects: cDM, cDU.
  // attr specific cDU, called only when `attr.value` is updated.
  (react || React).useEffect(() => {
    // checks if new 'attr.value' is equal to the originally provided
    // 'value' in 'Attributes'.
    if (!meta.dirty && attributes.value != attr.value)
      dispatchMeta({ dirty: true });
    sanitize();
  }, [attr.value]);

  (react || React).useEffect(() => sanitize(), [opts]);

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
    sanitize();
  }, [attr.checked]);

  return { attr, dispatchAttr, meta, dispatchMeta, sanitize, dispatchOptions };
}

