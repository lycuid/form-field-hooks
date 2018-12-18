import * as React from 'react';

import { Types, Field } from '../Interfaces';
import { useField, useCheckableField, useTextAreaField } from './generic-form-hooks';

import { continueDefault } from '../Utils';

let { useEffect, useState } = React;


export const useInput = (
  attributes: Field.InputAttributes,
  options?: Field.Options
): Field.InputElement =>
{

  let {
    attr, dispatchAttr,
    meta, dispatchMeta,
    sanitize, dispatchOptions
  } = useField<Field.InputAttributes>(attributes, options);

  /**
   * The dom is updated almost instantly,
   * but the attr object wont.
   */
  const onChange: Types.Void = (
    e: React.ChangeEvent<HTMLInputElement>
  ) =>
  {
    const { value } = e.target;

    dispatchAttr({ value });
    continueDefault(e, attr, 'onChange');
  }

  let element: Field.InputElement = {
    attr: {...attr, onChange}, dispatchAttr,
    meta, dispatchMeta, dispatchOptions,
    sanitize, fieldType: attr.type
  };

  return element;
}



/**
 * @todo somehow make this a high leve hook
 * 
 * @param attributes Valid Text Area attributes
 * @param options 
 */
export const useTextArea = (
  attributes: Field.TextAreaAttributes,
  options?: Field.Options
): Field.TextAreaElement => useTextAreaField(attributes, options);





export const useSelect = (
  attributes: Field.SelectAttributes,
  options?: Field.Options
): Field.SelectElement =>
{

  let {
    attr, dispatchAttr,
    meta, dispatchMeta,
    sanitize, dispatchOptions
  } = useField<Field.SelectAttributes>(attributes, options);

  // The dom is updated almost instantly, but the attr object isn't.
  const onChange: Types.Void = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) =>
  {
    // @ts-ignore
    const { value, options } = e.target;

    // Only in case of multiple select,
    // we need to dispatch value as an array not a string.
    if (attr.multiple) {
      let newValue: string[] = Array.apply(null, options) // convert to array
        .filter((option: any) => option.selected) // filter selected
        .map((option: any) => option.value); // return only selected.

      dispatchAttr({ value: newValue });
    } else dispatchAttr({ value });

    continueDefault(e, attr, 'onChange');
  }

  let element: Field.SelectElement = {
    attr: {...attr, onChange}, dispatchAttr,
    meta, dispatchMeta, dispatchOptions,
    sanitize, fieldType: 'select'
  };
  

  return element;
}





export const useCheckbox = (
  attributes: Field.CheckboxAttributes,
  options?: Field.Options
): Field.InputElement =>
{
  let {
    attr, dispatchAttr,
    meta, dispatchMeta,
    sanitize, dispatchOptions
  } = useCheckableField<Field.CheckboxAttributes>(
    {...attributes, type: 'checkbox'},
    (options || {}) as Field.Options
  );

  const onChange: Types.Void = (
    e: React.ChangeEvent<HTMLInputElement>
  ) =>
  {
    dispatchAttr({ checked: !attr.checked });
    continueDefault(e, attr, 'onChange');
  }

  let element: Field.InputElement = {
    attr: {...attr, onChange}, dispatchAttr,
    meta, dispatchMeta, dispatchOptions,
    sanitize, fieldType: 'checkbox'
  };

  return element;
}






/**
 * This hook returns an object in order to 
 */

export const useRadioGroup = (
  defaultValue: string | null,
  params: {
    attributes: Field.RadioAttributes,
    options?: Field.Options
  }[]
): Field.RadioElements =>
{

  // being a radio group, needs to be controlled as we'll have
  // a root value (`groupValue`).
  // And each radio being a controlled element, 
  // only need to control the root value and the state of all the 
  // radios in the group should be updated eventually.
  let [groupValue, setGroupValue] = useState(defaultValue);

  var radioGroup: Field.InputElement[] = [];

  for (let { attributes, options } of params) {

    // create radio button with controlled `checked` attribute.
    let {
      attr, dispatchAttr,
      meta, dispatchMeta,
      sanitize, dispatchOptions
    } = useCheckableField<Field.RadioAttributes>({
      ...attributes, type: 'radio', checked: !!attributes.checked
    }, options);


    var onChange: Types.Void = (
      e: React.ChangeEvent<HTMLInputElement>
    ) =>
    {
      // just change the root value for group radios
      // and the controlled check will update in a side-effect.
      setGroupValue(attr.value);
      continueDefault(e, attr, 'onChange');
    }

    // effects: cDM, cDU
    // will only execute when `groupValue` is updated.
    useEffect(() => {
      dispatchAttr({ checked: groupValue === attr.value });
      sanitize(true);
    }, [groupValue]);

    var element = {
      attr: {...attr, onChange}, dispatchAttr,
      meta, dispatchMeta, dispatchOptions,
      sanitize, fieldType: 'radio'
    };

    radioGroup.push(element);
  }
  
  let elements: Field.RadioElements = {
    current: [groupValue, setGroupValue],
    elements: radioGroup,
    fieldType: 'radio-elements'
  };

  return elements;
}