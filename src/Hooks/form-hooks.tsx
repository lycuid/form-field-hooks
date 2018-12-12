import * as React from 'react';

import { Field, Types } from '../Interfaces';
import { useField, useCheckableField } from './generic-form-hooks';

import { continueDefault } from '../Utils';

let { useEffect, useState } = React;


export const useInput = (
  attributes: Field.InputAttributes,
  options?: Field.Options
): Field.Element =>
{

  let { state, dispatchState, meta } = useField(attributes, options);

  const onChange: Types.Void = (
    e: React.ChangeEvent<Types.HTMLInput>
  ) =>
  {
    const { value } = e.target;
    console.log('custom onchange');
    // The dom is updated but, the state object wont
    // update instantly though (probably async)
    dispatchState({ value: value });
    continueDefault(e, state, 'onChange');
  }

  let input: Field.Element = { attr: { ...state, onChange }, setAttr: dispatchState, meta };

  return input;
}



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



export const useRadio = (
  attributes: Field.RadioAttributes,
  options?: Field.Options
): Field.Element =>
{
  let { state, dispatchState, meta } = useCheckableField(
    { ...attributes, type: 'radio' }, (options || {}) as Field.Options
  );
  
  // no need to handle `dirty` from meta as it is handled in 
  // a side-effect in the `useCheckableField`.
  var onChange: Types.Void = (
    e: React.ChangeEvent<Types.HTMLInput>
  ) => {
    console.log('called radio');
    if (!state.checked) dispatchState({ checked: true });
    continueDefault(e, state, 'onChange');
  }

  return { attr: {...state, onChange}, setAttr: dispatchState, meta };
}


export const useRadioGroup = (
  params: Array<{
    attributes: Field.RadioAttributes,
    options?: Field.Options
  }>
): Field.Element[] =>
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
    let { attr, setAttr, meta } = useRadio({
      ...attributes,
      checked: groupValue === attributes.value
    }, options);

    var onChange: Types.Void = (
      e: React.ChangeEvent<Types.HTMLInput>
    ) =>
    {
      // just change the root value for group radios
      // and the controlled check will update in a side-effect.
      console.log('called radio group')
      setGroupValue(attr.value);
      continueDefault(e, attr, 'onChange');
    }

    useEffect(() => {
      // update checked after root value is updated.
      // making the radio button group controlled.
      
      setAttr({ checked: groupValue === attr.value });
        
      console.log('called group effect');
    }, [groupValue]);

    radioGroup.push({ attr: {...attr, onChange}, setAttr, meta });
  }

  return radioGroup;
}