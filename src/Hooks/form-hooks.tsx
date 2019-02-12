import * as React from 'react';

import { Types, Field } from '../Interfaces';
import { useField, useCheckableField } from './generic-form-hooks';

import { continueDefault } from '../Utils';


export const useInput = (
  attributes: Field.InputAttributes,
  options?: Field.Options,
  react?: any,
): Field.InputElement =>
{

  let { attr, dispatchAttr, ...rest } = useField(attributes, options, (react || React));

  /**
   * The dom is updated almost instantly,
   * but the attr object wont.
   */
  const onChange: Types.Void = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) =>
  {
    const { value } = e.target;

    dispatchAttr({ value });

    continueDefault(e, attr, 'onChange');
  }

  let element: Field.InputElement = {
    attr: {...attr, onChange}, dispatchAttr,
    fieldType: attr.type,
    ...rest
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
  options?: Field.Options,
  react?: any,
): Field.TextAreaElement => {
  let { attr, dispatchAttr, ...rest } = useField<Field.TextAreaAttributes>(attributes, options, (react || React));

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

  let element: Field.TextAreaElement = {
    attr: {...attr, onChange}, dispatchAttr,
    fieldType: attr.type,
    ...rest
  };

  return element;
}





export const useSelect = (
  attributes: Field.SelectAttributes,
  options?: Field.Options,
  react?: any,
): Field.SelectElement =>
{
  const { suppressChange, ...restAttr } = attributes;

  let {
    attr, dispatchAttr, ...rest
  } = useField<Field.SelectAttributes>(restAttr, options, (react || React));

  // The dom is updated almost instantly, but the attr object isn't.
  const onChange: Types.Void = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) =>
  {
    // @ts-ignore
    const { value, options } = e.target;

    if (!suppressChange) {
      // Only in case of multiple select,
      // we need to dispatch value as an array not a string.
      if (attr.multiple) {
        let newValue: string[] = Array.apply(null, options) // convert to array
          .filter((option: any) => option.selected) // filter selected
          .map((option: any) => option.value); // return only selected.
  
        dispatchAttr({ value: newValue });
      } else dispatchAttr({ value });
    }
        
    continueDefault(e, attr, 'onChange');
  }

  let element: Field.SelectElement = {
    attr: {...attr, onChange}, dispatchAttr,
    fieldType: 'select',
    ...rest
  };


  return element;
}





export const useCheckbox = (
  attributes: Field.CheckboxAttributes,
  options?: Field.Options,
  react?: any,
): Field.InputElement =>
{
  let {
    attr, dispatchAttr, ...rest
  } = useCheckableField<Field.CheckboxAttributes>(
    {...attributes, type: 'checkbox'},
    (options || {}) as Field.Options,
    (react || React)
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
    fieldType: 'checkbox',
    ...rest
  };

  return element;
}






/**
 * @todo Fix this situation for radio buttons ->
 * `hooks` can only be called at the `top level`. yet we are using them
 * in a loop.
 * 
 * @NOTE DO NOT USE THIS
 */
export const useRadioGroup = (
  defaultValue: string | null,
  params: {
    attributes: Field.RadioAttributes,
    options?: Field.Options,
  }[],
  react?: any,
): Field.RadioElements =>
{

  // being a radio group, needs to be controlled as we'll have
  // a root value (`groupValue`).
  // And each radio being a controlled element,
  // only need to control the root value and the state of all the
  // radios in the group should be updated eventually.
  let [groupValue, setGroupValue] = (react || React).useState(defaultValue);

  let radioGroup: Field.InputElement[] = [];

  const append = ({ attributes, options, react }: Field.InputAttributes) => {
    // create radio button with controlled `checked` attribute.
    let {
      attr, dispatchAttr, sanitize, ...rest
    } = useCheckableField<Field.RadioAttributes>({
      ...attributes, type: 'radio', checked: !!attributes.checked
    }, options, (react || React));


    let onChange: Types.Void = (
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
    (react || React).useEffect(() => {
      dispatchAttr({ checked: groupValue === attr.value });
      sanitize({});
    }, [groupValue]);

    let element = {
      attr: {...attr, onChange}, dispatchAttr,
      sanitize,
      fieldType: 'radio',
      ...rest
    };

    radioGroup.push(element);
  }

  for (let element of params) {
    append(element);
  }


  let elements: Field.RadioElements = {
    current: [groupValue, setGroupValue],
    elements: radioGroup, append,
    fieldType: 'radio-elements'
  };

  return elements;
}
