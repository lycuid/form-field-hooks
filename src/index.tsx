import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useInput } from './Hooks';
import { Form } from './Components';


const { useContext } = React;

const App = () => {
  const name = useInput({ value: '' });
  return (
    <>
      <div>{JSON.stringify(name.meta)}</div>
      <Form.Input element={name} />
    </>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'));
