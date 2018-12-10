import * as React from 'react';
import Types from "./Types";


export interface ObjectInterface { [index: string]: any }

namespace Field {

  export interface Attributes extends React.InputHTMLAttributes<Types.HTMLInput>, ObjectInterface {
    // required
    value?: string | string[];
 
    onChange?: Types.Void;
  }

  export interface Options extends ObjectInterface {
    validity: (a: Object) => boolean
  }

  export interface Meta {
    touched?: boolean;
    dirty?: boolean,
    valid?: boolean
  }
  
  export interface Input {
    attr: Attributes
    setAttr: Types.Void
    meta: Meta
  }

  export interface InputAttributes extends Attributes {
    value: string | string[]
  }

  export interface CheckboxAttributes extends Attributes {
    defaultChecked?: boolean
  }

}

export default Field;