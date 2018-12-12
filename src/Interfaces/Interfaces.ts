import Types from './Types';

/// <reference types='react' />

export interface ObjectInterface { [index: string]: any }

declare namespace Field {

  // parameter interfaces for all field hooks.
  interface Attributes extends React.InputHTMLAttributes<Types.HTMLInput>, ObjectInterface {
    value?: string | string[]
    onChange?: Types.Void
  }

  interface Options extends ObjectInterface {
    validations: (a: Object) => boolean
  }

  interface InputAttributes extends Attributes {
    value: string | string[]
  }

  interface CheckboxAttributes extends Attributes {
    value: string | string[]
    defaultChecked?: boolean
  }

  interface RadioAttributes extends CheckboxAttributes { }


  // field's metadata interface.
  interface Meta {
    touched: boolean
    dirty: boolean
    valid: boolean
  }
  
  // return value type for high level field hooks.
  interface Element {
    attr: Attributes
    setAttr: Types.Void // equivalent to `setState`.
    meta: Meta
  }

}

export default Field;