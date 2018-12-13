import * as React from 'react';

import { FormContext } from '../context';
import { Field } from '../Interfaces';

let { useContext, useState, useRef } = React;

const Form = (_: Object): JSX.Element => {

  const [formID, setFormID] = useState(Math.random().toString());

  const {
    name, surname, prize, password, skills1, skills2,
    gender1, gender2, createdDate, createdTime, createdDateTime,
    remarks, games,
  } = useContext(FormContext);

  const values = (obj: any) => obj; // Object.keys(obj).map((key) => obj[key]);

  return (
    <>
      <form id={'sample'}>

        <FormInput element={name} /><br />
        <span>{JSON.stringify(values(name.meta))}</span><br />

        <FormInput element={surname} /><br />
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

        <input id={'createdDate'} {...createdDate.attr} /><br />
        <span>{JSON.stringify(values(createdDate.meta))}</span><br />

        <input id={'createdTime'} {...createdTime.attr} /><br />
        <span>{JSON.stringify(values(createdTime.meta))}</span><br />

        <input id={'createdDateTime'} {...createdDateTime.attr} /><br />
        <span>{JSON.stringify(values(createdDateTime.meta))}</span><br />

        <textarea id={'remarks'} {...remarks.attr} /><br />
        <span>{JSON.stringify(values(remarks.meta))}</span><br />

        <select id={'games'} {...games.attr}>
          <option value={''}></option>
          <option value='Starcraft 2'>{'Starcraft 2'}</option>
          <option value='Getting over it'>{'Getting over it'}</option>
          <option value='CS: GO'>{'CS: GO'}</option>
        </select>
        <br />
        <span>{JSON.stringify(values(games.meta))}</span><br />

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


const FormInput = (
  { element }: Field.FormInputProps
): JSX.Element => (<>{element.meta.show && <input {...element.attr} />}</>);

const FormArea = (
  { element }: Field.FormTextAreaProps
): JSX.Element => (<>{element.meta.show && <textarea {...element.attr} />}</>);

export default Form;