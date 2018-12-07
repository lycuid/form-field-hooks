import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Field } from './Interfaces';
import { useField } from './Hooks';
import { FormContext } from './context';

import { Form } from './Components';


const App = (_: Object): JSX.Element => {


  const name: Field.Input = useField(
    { value: 'Mary', disabled: false},
    { validity: (attr: Field.Params) => attr.value.length < 7 }
  );


  const surname: Field.Input = useField({value: 'Poppins', readOnly: true});
  const prize: Field.Input = useField({value: '21', disabled: true });
  const password: Field.Input = useField({value: 'passwd', type: 'password'});
  
  const sampleValidityCheck = ({}: Object): boolean => {
    return name.attr.value.toString().toLowerCase() === 'Mary';
  }

  const sample: Field.Input = useField(
    {value: 'sample', readOnly: true},
    { validity: sampleValidityCheck }
  );
  const value: any = { name, surname, prize, password, sample };
  

  return (
    <FormContext.Provider value={value}>
      <Form />
    </FormContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'));