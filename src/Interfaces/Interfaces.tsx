import * as React from 'react';
import Types from "./Types";


export interface ObjectInterface { [index: string]: any }

namespace Field {

  export interface Params extends React.InputHTMLAttributes<Types.HTMLInput>, ObjectInterface {
    // required
    value: string | string[];
 
    onChange?: Types.Void;
  }

  export interface Options extends ObjectInterface {
    validity: (a: Object) => boolean
  }

  export interface Meta { touched: boolean; dirty: boolean }
  
  export interface Input { attr: Params; meta: Meta, setAttr: Types.Void }

  export const Element = (field: Input): JSX.Element => {
    
    return (
      <React.Fragment>
        {<input {...field.attr} />}
      </React.Fragment>
    )
  }

}

export default Field;