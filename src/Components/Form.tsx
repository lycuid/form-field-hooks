import * as React from 'react';

import { Types } from '../Interfaces';
import { FormContext } from '../context';

let { useContext, useState, useRef } = React;

const Form = (_: Object): JSX.Element => {

  const [formID, setFormID] = useState(Math.random().toString());

  const { name, surname, prize, password, gender1, gender2 } = useContext(FormContext);
  // console.log(gender.attr);
  // console.log(name.attr);

  return (
    <>
      <form id={'sample'}>
        <input id={'name'} {...name.attr} /><br />
        {!name.meta.valid && <><span>{'Name not valid.'}</span><br /></>}
        <span>{name.meta.dirty.toString()}</span><br />

        <input {...surname.attr}
          onClick={(_: React.FormEvent<Types.HTMLInput>) => {
            surname.setAttr({ readOnly: !surname.attr.readOnly })
          }
        }/><br />

        <input {...prize.attr}  /><br />

        <input {...password.attr} /><br />

        <input {...gender1.attr} />
        <input {...gender2.attr} />

        <button type={'button'} onClick={
          () => name.setAttr({ disabled: !name.attr.disabled })
        }>{'toggle disabled.'}</button>

        <button type={'button'} onClick={
          () => name.setAttr({ onChange: (_: any): void => alert('It works!..')})
          // () => name.meta.dirty = false
        }>{'change onChange.'}</button>
        <button type={'button'} onClick={
          () => setFormID(Math.random().toString())
        }>{'change ID'}</button>

      </form>
    </>
  )
}

export default Form;