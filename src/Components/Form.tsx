import * as React from 'react';
import { Field } from '../Interfaces';


export class Input extends React.PureComponent<Field.FormInputProps, {}> {
  constructor(props: Field.FormInputProps) { super(props); }
  render() {
    const { element, show, ...rest } = this.props;
    element.sanitize({});
    return (
      <>
        {element.meta.show && (show || true) &&
          (<input {...rest} {...element.attr} />)}
      </>
    )
  }
}


export class Select extends React.PureComponent<Field.FormSelectProps, {}> {
  constructor(props: Field.FormSelectProps) { super(props as Field.FormSelectProps); }

  option = (element: Field.Element, defaultOption: Field.SelectDefaultOption):
  React.ReactNode => (
    defaultOption.hideAfter ?
      (!element.attr.value.length &&
        <option value={defaultOption.value || ''}>
          {defaultOption.label || ''}
        </option>) :
      (<option value={defaultOption.value || ''}>
        {defaultOption.label || ''}
      </option>)
  )

  render() {
    const { element, defaultOption, show, children, ...rest } = this.props;
    element.sanitize({});
    
    return (
      <>
        {element.meta.show && (show || true) && (
          <select {...rest} {...element.attr} >
            {defaultOption && this.option(element, defaultOption)}
            {children}
          </select>
        )}
      </>
    )
  }
}


export class TextArea extends React.PureComponent<Field.FormTextAreaProps, {}> {
  constructor(props: Field.FormTextAreaProps) { super(props); }
  render() {
    const { element, show, ...rest } = this.props;
    element.sanitize({});
    return (
      <>
        {element.meta.show && (show || true) && (
          <textarea {...rest} {...element.attr} />
        )}
      </>
    )
  }
}


export default { Input, Select, TextArea };