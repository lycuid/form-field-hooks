// import Types from './Types';

/// <reference path='../Types.d.ts' />
/// <reference types='react' />

export interface ObjectInterface { [index: string]: any }

declare namespace Field {

  /**
   * @Info interface for parameter values.
   */
  interface Attributes extends React.InputHTMLAttributes<Types.HTMLInput>, ObjectInterface {
    value?: string | string[]
    onChange?: Types.Void
  }

  interface InputAttributes extends Attributes {
    value: string | string[]
  }

  interface TextAreaAttributes extends React.TextareaHTMLAttributes<Types.HTMLTextArea>, ObjectInterface {
    value: string
    onChange?: Types.Void
  }

  interface CheckboxAttributes extends Attributes {
    value: string | string[]
    defaultChecked?: boolean
  }

  interface RadioAttributes extends CheckboxAttributes { }



  /**
   * @Info Generic parameter no 2 for all Fields.
   */
  interface Options extends ObjectInterface {
    validations: (a: Object) => boolean
  }  


  /**
   * @Info interfaces for FormFields paramters.
   */
  interface FormInputProps { element: Element }
  interface FormTextAreaProps { element: TextAreaElement }



  /**
   * @Info Field related data
   */
  // field's metadata interface.
  interface Meta {
    touched: boolean
    dirty: boolean
    valid: boolean
    show: boolean
  }
  
  // for low level Field hooks.
  interface BasicElement {
    state: Attributes
    dispatchState: Types.Void
    meta: Meta
    dispatchMeta: Types.Void
    sanitize: Types.Void
  }

  // high level generic Field hook
  interface Element {
    attr: Attributes
    setAttr: Types.Void // equivalent to `setState`.
    meta: Meta
  }


  // high level textarea Field hook
  interface TextAreaElement {
    attr: TextAreaAttributes
    setAttr: Types.Void
    meta: Meta
  }

  // high level radio button Field hook
  interface RadioElements {
    selected: string
    elements: Element[]
  }

}

export default Field;