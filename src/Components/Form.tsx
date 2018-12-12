import * as React from 'react';

import { FormContext } from '../context';

let { useContext, useState, useRef } = React;

const Form = (_: Object): JSX.Element => {

  const [formID, setFormID] = useState(Math.random().toString());

  const {
    name, surname, prize,
    password, skills1, skills2,
    gender1, gender2, sampleRadio
  } = useContext(FormContext);

  console.log(sampleRadio);

  const values = (obj: any) => obj; // Object.keys(obj).map((key) => obj[key]);

  return (
    <>
      <form id={'sample'}>

        <input id={'name'} {...name.attr} /><br />
        <span>{JSON.stringify(values(name.meta))}</span><br />

        <input id={'surname'} {...surname.attr} /><br />
        <span>{JSON.stringify(values(surname.meta))}</span><br />

        <input id={'prize'} {...prize.attr} /><br />
        <span>{JSON.stringify(values(prize.meta))}</span><br />

        <input id={'password'} {...password.attr} /><br />
        <span>{JSON.stringify(values(password.meta))}</span><br />

        <input id={'skills1'} {...skills1.attr} />
        <input id={'skills2'} {...skills2.attr} /><br />
        <span>{JSON.stringify(values(skills1.meta))}</span><br />
        <span>{JSON.stringify(values(skills2.meta))}</span><br />

        <input id={'gender1'} {...gender1.attr} />
        <input id={'gender2'} {...gender2.attr} /><br />
        <span>{JSON.stringify(values(gender1.meta))}</span><br />
        <span>{JSON.stringify(values(gender2.meta))}</span><br />

        <input id={'sampleRadio'} {...sampleRadio.attr} /><br />
        <span>{JSON.stringify(values(sampleRadio.meta))}</span><br />

        <br />
        <br />
        <br />
        <button type={'button'} onClick={
          () => name.setAttr({ disabled: !name.attr.disabled })
        }>{'toggle disabled.'}</button><br />

        <button type={'button'} onClick={
          () => name.setAttr({ onChange: (_: any): void => alert('It works!..')})
          // () => name.meta.dirty = false
        }>{'change onChange.'}</button><br />

        <button type={'button'} onClick={
          () => setFormID(Math.random().toString())
        }>{'change ID'}</button><br />

        <button type={'button'} onClick={
          () => skills1.setAttr({ value: 'basketball' })
        }>{'checkbox value change'}</button>

      </form>
    </>
  )
}

export default Form;