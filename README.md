# form-field-hooks (React)
stateful input field hooks built with react-hooks, for ease of validations etc.



## Attributes and return types
### Input fields:
(`useInput`,&nbsp; `useSelect`,&nbsp; `useTextArea`,&nbsp; `useCheckbox`)<br />

*_Input Parameters:_*

| property | description |
| ------ | ------ |
| attributes: `{}` | valid html input attributes |
| options: <br />`{validations: (attr) => [boolean, string], display: (attr) => boolean}` | these functions are called to<br />set `meta` and while `sanitize()` |

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
| customValidity: `string` | error message if `valid` is `false` |


### Radio Group:<br />
(`useRadioGroup`)<br />

*_Input Parameters:_*

| property | description |
| ------ | ------- |
| defaultValue: `string` \| `null` | default selected radio |
| params: `[{attributes: {}, options: {}}]` | Array of Field Inputs<br />&lsaquo;same as the above Fields&rsaquo;. |

*_Output Element:_*

| property | description |
| ------ | ------- |
| elements: `Field[]` | Array of Input Fields (type=radio)<br />&lsaquo;same as the above Fields&rsaquo;. |
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
} from 'form-field-hooks';
```

### validations and display
```jsx
const InputElement = () => {
  const name = useInput(
    {value: '', name: 'passwd', type: 'password'},
    {
      // this is to set the properties of the field's `meta`
      validations: (attr) => {
        if (attr.value.length < 8) {
          return [false, 'should be atleast 8 characters long.'];
        }
        return [true, ''];
      },
      display: (attr) => {
        if (attr.className && attr.className.includes('hide-input'))
          return false;
        return true;
      }
    }
  );

  const { touched, dirty, show, valid } = name.meta;
  const style = {boderColor: (touched || dirty) && !valid ? 'red' : 'none'};

  return (
    <>
      {/*
        * Using `Form` has a couple of advantages,
        * -> sanitize is run everytime before render.
        * -> will only show if `meta.show` is true
        * -> able to add defaultOption in case of <Form.Select />
        */}

      <Form.Input element={name} style={style} />


      {/* Or using without `Form` */}

      <>{show && <input element={name} style={style} />}</>
    </>
  )
}
```

# Using the Hooks
### 'useInput' (Input field, can be any `<input />` except radio button)
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

### 'useRadioGroup' (`<input type="radio" />` field)
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

### 'useSelect' (`<select />` field):
```jsx
  const SelectElement = () => {
    const select = useSelect({value: '', name: 'select'});
    const multiselect = useSelect({value: '', name: 'multiselect', multiple: true});

    return (
      <>
        {/*
          * Here the `defaultOption` attr will add
          * an extra null option
          * value: the value of the default option.
          * label: display value for the default option.
          * hideAfter: remove default option on any other value selection.
          */}

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
          * </select>
          */}
      </>
    )
  }
```

### 'useTextArea' (`<textarea />` field)
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