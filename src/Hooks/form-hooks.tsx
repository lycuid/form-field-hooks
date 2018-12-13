import * as React from 'react';

import { Field } from '../Interfaces';
import { useField, useCheckableField, useTextAreaField } from './generic-form-hooks';

import { continueDefault } from '../Utils';

let { useEffect, useState } = React;


export const useInput = (
  attributes: Field.InputAttributes,
  options?: Field.Options
): Field.Element =>
{

  let { state, dispatchState, meta } = useField(attributes, options);

  /**
   * @note The dom is updated almost instantly,
   * but the state object wont.
   */
  const onChange: Types.Void = (
    e: React.ChangeEvent<Types.HTMLInput>
  ) =>
  {
    // @ts-ignore
    const { value, options } = e.target;
    

    // Only in case of multiple select,
    // we need to dispatch value as an array not a string.
    if (state.multiple) {
      let newValue: string[] = Array.apply(null, options) // convert to arry
        .filter((option: any) => option.selected) // filter selected
        .map((option: any) => option.value); // return only selected.

      dispatchState({ value: newValue });
    } else dispatchState({ value });

    continueDefault(e, state, 'onChange');
  }

  let element: Field.Element = { attr: {...state, onChange}, setAttr: dispatchState, meta };

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




export const useCheckbox = (
  attributes: Field.CheckboxAttributes,
  options?: Field.Options
): Field.Element =>
{
  let { state, dispatchState, meta } = useCheckableField(
    {...attributes, type: 'checkbox'},  (options || {}) as Field.Options
  );

  const onChange: Types.Void = (
    e: React.ChangeEvent<Types.HTMLInput>
  ) =>
  {
    dispatchState({ checked: !state.checked });
    continueDefault(e, state, 'onChange');
  }

  return { attr: {...state, onChange}, setAttr: dispatchState, meta };
}






export const useRadioGroup = (
  params: Array<{
    attributes: Field.RadioAttributes,
    options?: Field.Options
  }>
): Field.RadioElements =>
{

  // being a radio group, needs to be controlled as we'll have
  // a root value (`groupValue`).
  // And each radio being a controlled element, 
  // only need to control the root value and the state of all the 
  // radios in the group should be updated eventually.
  let [groupValue, setGroupValue] = useState(null);

  var radioGroup: Field.Element[] = [];

  for (let { attributes, options } of params) {

    // create radio button with controlled `checked` attribute.
    let { state, dispatchState, meta, sanitize } = useCheckableField({
      ...attributes,
      type: 'radio',
      checked: !!attributes.checked
    }, options);


    var onChange: Types.Void = (
      e: React.ChangeEvent<Types.HTMLInput>
    ) =>
    {
      // just change the root value for group radios
      // and the controlled check will update in a side-effect.
      setGroupValue(state.value);
      continueDefault(e, state, 'onChange');
    }

    // effects: cDM, cDU
    // will only execute when `groupValue` is updated.
    useEffect(() => {
      dispatchState({ checked: groupValue === state.value });
      sanitize(true);
    }, [groupValue]);

    radioGroup.push({ attr: {...state, onChange}, setAttr: dispatchState, meta });
  }

  return { selected: groupValue, elements: radioGroup };
}