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

  let {
    state, dispatchState,
    meta, dispatchMeta,
    sanitize
  } = useField(attributes, options)

  const onChange: Types.Void = (
    e: React.ChangeEvent<Types.HTMLInput>
  ) =>
  {
    const { value } = e.target;
    console.log('custom onchange');
    // The dom is updated but, the state object wont
    // update instantly though (probably async)
    dispatchState({ value: value }) 

    continueDefault(e, state, 'onChange')
  }


  let input: Field.Element = { attr: { ...state, onChange }, setAttr: dispatchState, meta };

  return input;
}



export const useCheckbox = (
  attributes: Field.CheckboxAttributes,
  options?: Field.Options
): Field.Element =>
{
  let { state, dispatchState, meta, ...rest } = useCheckableField(
    {...attributes, type: 'checkbox'},  (options || {}) as Field.Options
  );

  const onChange: Types.Void = (
    e: React.ChangeEvent<Types.HTMLInput>
  ) =>
  {
    dispatchState({ checked: !state.checked });
    continueDefault(e, state, 'onChange')
  }

  return { attr: {...state, onChange}, setAttr: dispatchState, meta };
}


export const useRadioGroup = (
  parameters: {
    attributes: Field.RadioAttributes,
    options?: Field.Options
  }[]
): Field.Element[] =>
{
  let [groupValue, setGroupValue] = useState(null);

  var checkBoxes: Field.Element[] = [];
  for (let p of parameters) {
    let { state, dispatchState, meta, dispatchMeta } = useCheckableField(
      {...p.attributes, checked: groupValue === p.attributes.value, type: 'radio'},  (p.options || {}) as Field.Options
    );
    
    var onChange: Types.Void = (
      e: React.ChangeEvent<Types.HTMLInput>
    ) =>
    {
      if (!meta.dirty) dispatchMeta({ dirty: true });
      setGroupValue(state.value);
      continueDefault(e, state, 'onChange')
    }
    
    useEffect(() => {
      dispatchState({ checked: groupValue === state.value });
    }, [groupValue]);

    checkBoxes.push({ attr: {...state, onChange}, setAttr: dispatchState, meta });
  }

  return checkBoxes;
}