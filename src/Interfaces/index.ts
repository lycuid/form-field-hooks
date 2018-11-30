import * as React from 'react';

export interface iInput {
  value: string | number | string[] | number[]
  onChange: (e: React.FormEvent<any>) => void
}

export interface ISelect {

}

export interface IText extends iInput {
  disabled: boolean
  readOnly: boolean
}

// export interface IField {
//   type: IText | ISelect 
// }

// export interface IForm { fields: IField[] }



