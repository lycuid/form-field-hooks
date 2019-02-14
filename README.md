# form-field-hooks (React)
stateful input field hooks built with react-hooks, for ease of validations etc. <small>(This is experimental for now, feel free to pr fixes and upgrades.)</small>

# still in "BETA" bois!
![the lord himself](https://picon.ngfiles.com/657000/flash_657585_largest_crop.png)

## Attributes and return types
### Input fields:
(`useInput`,&nbsp; `useSelect`,&nbsp; `useTextArea`,&nbsp; `useCheckbox`)<br />

*_Input Parameters:_*

| property | description |
| ------ | ------ |
| attributes: `{}` | valid html input attributes |
| options: <br />`{validations: (attr) => [boolean, string], display: (attr) => boolean}` | these functions are called to<br />set `meta` and while `sanitize()` |
| React | React's imported object (kinda necessary in the current version as it throws hooks related errors, would be fixed in the future) |

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
| prevInputs: `Array<string | string[]>` | List history of input values |
| <strike>customValidity</strike> validationMessage: `string` | error message if `valid` is `false` |
<strong>Note: </strong> validations work side by side with the [ValidityState API](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) and [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)

(use `options.validations` instead of the validity API as it might break the behaviour of the hooks' `meta`).

<!-- ### Radio Group: <small>(not entirely development ready yet)</small><br />
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

 -->

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
    }, React
  );

  const { touched, dirty, show, valid } = name.meta;

  // An Example of how `meta can be useful`
  const style = {boderColor: (touched || dirty) && !valid ? 'red' : 'none'};

  return (
    <Fragment>

      {/* Form.Input takes care of not rendering the input if `show` is False */}

      <Form.Input element={name} style={style} react={React} />
      {(
        !meta.valid &&
        meta.validationMessage.length // we get to set this in `options.validations`
      ) ? <ErrorMessage msg={meta.validationMessage} /> : <></>}


      {/* Or using without `Form` */}

      {show && <input element={name} style={style} />}
    </Fragment>
  )
}
```

# Using the Hooks
### 'useInput' (Input field, can be any `<input />` except radio button)
```jsx
const InputElements = () => {
  const name = useInput({value: 'luffy', name: 'name'}, {}, React);

  const isSaiyan = useCheckbox({name: 'isSaiyan', checked: true}, {}, React);
  const isSuper = useCheckbox({name: 'isSuper'}, {}, React);

  // Can be any Input Element
  // (text, checkbox, password, datetime
  // datetime-local, time, phone, checkbox etc)
  return (
    <Fragment>
      <Form.Input element={name} react={React} />
      <Form.Input element={isSuper} react={React} />
      <Form.Input element={isSaiyan} react={React} />
      
      {/** can also use
        * <input {...name.attr} />
        * <input {...isSuper.attr} />
        * <input {...isSaiyan.attr} />
        */}
    </Fragment>
  )
}
```
<!-- 
### 'useRadioGroup' (`<input type="radio" />` field)
```jsx
const RadioElements = () => {
  // radio-group
  const genderRadio = useRadioGroup(null, [
    {attributes: { value: 'Male', checked: false, name: 'gender' }},
    {attributes: { value: 'Female', checked: false, name: 'gender' }},
  ], React);

  // radio elements
  const [gender1, gender2] = genderRadio.elements;
  var currentSelection = genderRadio.current;

  return (
    <Fragment>
      <Form.Input element={gender1} react={React} />
      <Form.Input element={gender2} react={React} />

      {/** can also use
        * <input {...gender1.attr} />
        * <input {...gender.attr} />
        */}
    </Fragment>
  )
}
``` -->

### 'useSelect' (`<select />` field):
```jsx
  const SelectElement = () => {
    const select = useSelect({value: '', name: 'select'}, {}, React);
    const multiselect = useSelect(
      {value: '', name: 'multiselect', multiple: true},
      {},
      React
    );

    return (
      <Fragment>
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
          react={React}
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
      </Fragment>
    )
  }
```

### 'useTextArea' (`<textarea />` field)
```jsx
  const TextAreaElement = () => {
    const description = useTextArea({value: '', name: 'description'}, {}, React);

    return (
      <Fragment>
        <Field.TextArea element={description} react={React} />

        {/** can also use
          * <textarea {...description.attr} />
          */}
      </Fragment>
    )
  }
```