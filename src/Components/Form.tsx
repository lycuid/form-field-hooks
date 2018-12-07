import * as React from 'react';

import { Types } from '../Interfaces';
import { FormContext } from '../context';

let { useContext } = React;

const Form = (_: Object): JSX.Element => {

  const { name, surname, prize, password, sample } = useContext(FormContext);

  return (
    <>
      <form>
        <input id={'name'} {...name.attr} /><br />
        {!name.meta.valid && <><span>{'Name not valid.'}</span><br /></>}
        <input {...surname.attr}
          onClick={(_: React.FormEvent<Types.HTMLInput>) => {
            surname.setAttr({ readOnly: !surname.attr.readOnly })
          }
        }/><br />
        <input {...prize.attr}  /><br />
        <input {...password.attr} /><br />
        <input {...sample.attr} /><br />

        <button type={'button'} onClick={
          () => name.setAttr({ disabled: !name.attr.disabled })
        }>{'toggle disabled.'}</button>
        <button type={'button'} onClick={
          () => name.setAttr({ onChange: (_: any): void => alert('It works!..')})
        }>{'change onChange.'}</button>

      </form>
    </>
  )
}

export default Form;