import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Field } from './Interfaces';
import { useInput, useCheckbox, useRadioGroup, useTextArea, useSelect } from './Hooks';
import { FormContext } from './context';

import App2 from './index2';


const App = (_: Object): JSX.Element => {


  const name: Field.Element = useInput(
    { value: 'Mary', disabled: false, name: 'name' },
    { validations:
      (attr: Field.InputAttributes) => {
        return attr.value.length < 7;
      }
    }
  );
  const surname: Field.InputElement = useInput(
    { value: 'Poppins', readOnly: false },
    { validations: (_: Field.InputElement) => {
      return name.meta.valid;
    }}
  );
  const prize: Field.InputElement = useInput({ value: '21', disabled: true });
  const password: Field.InputElement = useInput({ value: 'passwd', type: 'password' });
  const skills1: Field.InputElement = useCheckbox({ value: 'football', checked: true, name: 'skills' });
  const skills2: Field.InputElement = useCheckbox({ value: 'cricket', checked: true, name: 'skills' });
  
  const createdDate: Field.InputElement = useInput({value: '', name: 'createdDate', type: 'date' });
  const createdTime: Field.InputElement = useInput({value: '', name: 'createdTime', type: 'time' });
  const createdDateTime: Field.InputElement = useInput({value: '', name: 'createdDateTime', type: 'datetime-local' });

  const remarks: Field.TextAreaElement = useTextArea({ value: '', placeholder: 'remarks..', name: 'remarks' });
  const games: Field.SelectElement = useSelect({ value: [], name: 'games', multiple: true });

  const genderRadio: Field.RadioElements = useRadioGroup('', [
    {attributes: { value: 'Male', checked: false, name: 'gender' }},
    {attributes: { value: 'Female', checked: false, name: 'gender' }},
  ]);


  const [gender1, gender2]: Field.InputElement[] = genderRadio.elements;

  const value: any = {
    name, surname, prize, password, skills1, skills2,
    gender1, gender2, createdDate, createdTime, createdDateTime,
    remarks, games
  };
  
  return (
    <FormContext.Provider value={value}>
    </FormContext.Provider>
  )
}



// ReactDOM.render(<App />, document.querySelector('#app'));
ReactDOM.render(<App2 />, document.querySelector('#app'));