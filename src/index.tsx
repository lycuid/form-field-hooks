import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Field } from './Interfaces';
import { useInput, useCheckbox, useRadioGroup, useTextArea } from './Hooks';
import { FormContext } from './context';

import { Form } from './Components';


const App = (_: Object): JSX.Element => {


  const name: Field.Element = useInput(
    { value: 'Mary', disabled: false, name: 'name' },
    { validations:
      (attr: Field.Attributes) => {
        return attr.value.length < 7;
      }
    }
  );
  const surname: Field.Element = useInput(
    { value: 'Poppins', readOnly: false },
    { validations: (_: Field.Element) => {
      return name.meta.valid;
    }}
  );
  const prize: Field.Element = useInput({ value: '21', disabled: true });
  const password: Field.Element = useInput({ value: 'passwd', type: 'password' });
  const skills1: Field.Element = useCheckbox({ value: 'football', checked: true, name: 'skills' });
  const skills2: Field.Element = useCheckbox({ value: 'cricket', checked: true, name: 'skills' });
  
  const createdDate: Field.Element = useInput({value: '', name: 'createdDate', type: 'date' });
  const createdTime: Field.Element = useInput({value: '', name: 'createdTime', type: 'time' });
  const createdDateTime: Field.Element = useInput({value: '', name: 'createdDateTime', type: 'datetime-local' });

  const remarks: Field.TextAreaElement = useTextArea({ value: '', placeholder: 'remarks..', name: 'remarks' });
  const games: Field.Element = useInput({ value: [], name: 'games', multiple: true });

  const genderRadio: Field.RadioElements = useRadioGroup([
    {attributes: { value: 'Male', checked: false, name: 'gender' }},
    {attributes: { value: 'Female', checked: false, name: 'gender' }},
  ]);


  const [gender1, gender2]: Field.Element[] = genderRadio.elements;

  const value: any = {
    name, surname, prize, password, skills1, skills2,
    gender1, gender2, createdDate, createdTime, createdDateTime,
    remarks, games
  };
  
  return (
    <FormContext.Provider value={value}>
      <Form />
    </FormContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'));