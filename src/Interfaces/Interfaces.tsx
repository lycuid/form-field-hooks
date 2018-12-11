import Types from './Types';

export interface ObjectInterface { [index: string]: any }

declare namespace Field {

  interface Attributes extends React.InputHTMLAttributes<Types.HTMLInput>, ObjectInterface {
    // required
    value?: string | string[];

    onChange?: Types.Void;
  }

  interface Options extends ObjectInterface {
    validations: (a: Object) => boolean
  }

  interface Meta {
    touched?: boolean;
    dirty?: boolean,
    valid?: boolean
  }
  
  interface Element {
    attr: Attributes
    setAttr: Types.Void
    meta: Meta
  }

  interface InputAttributes extends Attributes {
    value: string | string[]
  }

  interface CheckboxAttributes extends Attributes {
    value: string | string[]
    defaultChecked?: boolean
  }

  interface RadioAttributes extends CheckboxAttributes { }

}

export default Field;