# useField-hook-experimental
stateful input field hooks built with react-hooks (experimental), making stuff like validations and 'should display' easy to use.


## Usage
### Fields:<br />
(`useInput`,&nbsp; `useSelect`,&nbsp; `useTextArea`,&nbsp; `useCheckbox`)<br />

*_Input Parameters:_*

| property | description |
| ------ | ------ |
| attributes: `{}` | valid html input attributes |
| options: <br />`{validations: (attr) => void, display: (attr) => void}` | these functions are called to<br />set meta and while `sanitize()` |

*_Output Element:_*

| property | description |
| ------- | ------- |
| attr: `{}` | html attributes |
| meta: `{}` | meta data (stateful)<br />_valid options_ below in `meta` table|
| dispatchAttr:<br />`(...attr) => void` | `setState` for attr |
| dispatchMeta:<br />`(...meta) =>  void` | `setState` for meta |
| dispatchOptions:<br />`(...options) =>  void` | `setState` for options |
| sanitize:<br />`({valid?: boolean, show?: boolean}) => void` | `setState` for meta,<br />_(provided options run in this method)_ |
| fieldType: `string` | type of html field<br />(`input`, `checkbox`, `textarea` etc) |

*_Meta:_*

| property | description |
| ------- | ------- |
| touched: `boolean` | if at all focused |
| dirty: `boolean` | if value changed |
| valid: `boolean` | is valid |
| show: `boolean` | should display |


### Radio Group:<br />
(`useRadioGroup`)<br />

*_Input Parameters:_*

| property | description |
| ------ | ------- |
| defaultValue: `string` \| `null` | default selected radio |
| params: `[{attributes: {}, options: {}}]` | Array of &lsaquo;same as the above Fields&rsaquo;. |

*_Output Element:_*

| property | description |
| ------ | ------- |
| elements: `Field[]` | Array of &lsaquo;same as the above Fields&rsaquo;. |
| current: `string` | selected option |
| fieldType: `string` | always 'radio-group' |



## Examples:
### Import
```jsx
import Form, {
  useInput,
  useSelect,
  useCheckbox,
  useRadioGroup,
  useTextArea
}from 'field-hooks-react';
```

### 'useInput' (Input Element, can be any &lt;input /&gt;)
```jsx
const InputElements = () => {
  const name = useInput({value: 'luffy', name: 'name'});

  const isSaiyan = useCheckbox({name: 'isSaiyan', checked: true});
  const isSuper = useCheckbox({name: 'isSuper'});

  // Can be any Input Element
  // (text, checkbox, password, datetme
  // datetime-local, time, phone, checkbox etc)
  return (
    <>
      <Form.Input element={name} />
      <Form.Input element={isSuper} />
      <Form.Input element={isSaiyan} />
      
      {/** can also use
        * <input {...name.attr} />
        * <input {...isSuper.attr} />
        * <input {...isSaiyan.attr} />
        */}
    </>
  )
}
```

### 'useRadioGroup' Radio Elements
```jsx
const RadioElements = () => {
  // radio-group
  const genderRadio = useRadioGroup(null, [
    {attributes: { value: 'Male', checked: false, name: 'gender' }},
    {attributes: { value: 'Female', checked: false, name: 'gender' }},
  ]);

  // radio elements
  const [gender1, gender2] = genderRadio.elements;
  var currentSelection = genderRadio.current;

  return (
    <>
      <Form.Input element={gender1} />
      <Form.Input element={gender2} />

      {/** can also use
        * <input {...gender1.attr} />
        * <input {...gender.attr} />
        */}
    </>
  )
}
```

### 'useSelect' Select Element:
```jsx
  const SelectElement = () => {
    const select = useSelect({value: '', name: 'select'});
    const multiselect = useSelect({value: '', name: 'multiselect', multiple: true});

    return (
      <>
        <Form.Select
          element={select}
          defaultOption={{ value: '', label: '--', hideAfter: true}}
        >
          <option value='1'>One Piece</option>
          <option value='2'>Cowboy Bebop</option>
          <option value='3'>Death Note</option>
          <option value='4'>Naruto</option>
        </Form.Select>

        {/** can also use
          * <select {...multiselect.attr}>
          * ...
          * </Form.Select>
          */}
      </>
    )
  }
```

### 'useTextArea' TextArea Element
```jsx
  const TextAreaElement = () => {
    const description = useTextArea({value: '', name: 'description'});

    return (
      <>
        <Field.TextArea element={description} />

        {/** can also use
          * <textarea {...description.attr} />
          */}
      </>
    )
  }
```