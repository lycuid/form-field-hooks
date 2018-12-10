import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Field } from './Interfaces';
import { useInput, useCheckbox } from './Hooks';
import { FormContext } from './context';

import { Form } from './Components';


const App = (_: Object): JSX.Element => {


  const name: Field.Input = useInput(
    { value: 'Mary', disabled: false},
    { validity: (attr: Field.Attributes) => {console.log(attr.value.length); return attr.value.length < 7} }
  );
  const surname: Field.Input = useInput({ value: 'Poppins', readOnly: true });
  const prize: Field.Input = useInput({ value: '21', disabled: true });
  const password: Field.Input = useInput({ value: 'passwd', type: 'password' });
  const gender1: Field.Input = useCheckbox({ checked: true, type: 'password', name: 'gender' });
  const gender2: Field.Input = useCheckbox({ checked: true, type: 'password', name: 'gender' });
  
  const value: any = { name, surname, prize, password, gender1, gender2 };
  
  return (
    <FormContext.Provider value={value}>
      <Form />
    </FormContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'));