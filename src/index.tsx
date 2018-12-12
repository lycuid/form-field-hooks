import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Field } from './Interfaces';
import { useInput, useCheckbox, useRadio, useRadioGroup } from './Hooks';
import { FormContext } from './context';

import { Form } from './Components';


const App = (_: Object): JSX.Element => {


  const name: Field.Element = useInput(
    { value: 'Mary', disabled: false, name: 'name' },
    { validations:
      (attr: Field.Attributes) => {
        console.log(attr.value.length);
        return attr.value.length < 7;
      }
    }
  );
  const surname: Field.Element = useInput({ value: 'Poppins', readOnly: true });
  const prize: Field.Element = useInput({ value: '21', disabled: true });
  const password: Field.Element = useInput({ value: 'passwd', type: 'password' });
  const skills1: Field.Element = useCheckbox({ value: 'football', checked: true, name: 'skills' });
  const skills2: Field.Element = useCheckbox({ value: 'cricket', checked: true, name: 'skills' });
  
  const [gender1, gender2]: Field.Element[] = useRadioGroup([
    {attributes: { value: 'Male', checked: false }},
    {attributes: { value: 'Female', checked: false }},
  ]);

  const sampleRadio = useRadio({ value: 'Male', checked: false, name: 'sample' });

  const value: any = {
    name, surname, prize, password, skills1, skills2,
    gender1, gender2, sampleRadio
  };
  
  return (
    <FormContext.Provider value={value}>
      <Form />
    </FormContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'));