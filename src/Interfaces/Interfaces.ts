import Types from './Types';

export interface ObjectInterface { [index: string]: any }

declare namespace Field {
  // interface for parameter values.

  /** valid HTML DOM Input element attributes */
  interface InputAttributes extends
    React.InputHTMLAttributes<HTMLInputElement>, ObjectInterface
  {
    value?: string
    onChange?: Types.Void
  }

  /** valid HTML DOM TextArea element attributes */
  interface TextAreaAttributes extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    ObjectInterface
  {
    value?: string
    onChange?: Types.Void
  }

  /** valid HTML DOM Select element attributes */
  interface SelectAttributes extends
    React.SelectHTMLAttributes<HTMLSelectElement>, ObjectInterface
  {
    value?: string | string[]
    suppressChange?: boolean
  }

  /** valid HTML DOM Checkbox element attributes */
  interface CheckboxAttributes extends InputAttributes {
    value?: string
    defaultChecked?: boolean
  }

  /** valid HTML DOM RadioButton element attributes */
  interface RadioAttributes extends CheckboxAttributes { }


  type HTMLGenericAttributes
    = InputAttributes
    | TextAreaAttributes
    | SelectAttributes
    | CheckboxAttributes



  /**
   * Generic second parameter for all Fields.
   */
  interface Options extends ObjectInterface {
    validations?: (a: object) => [boolean, string]
    display?: (a: object) => boolean
  }


  interface FormElementProps<ElementType> {
    element: ElementType
    show?: boolean
  }

  interface FormInputProps extends InputAttributes,
    FormElementProps<InputElement>  {}


  interface FormTextAreaProps extends TextAreaAttributes,
    FormElementProps<TextAreaElement>  {}

  interface SelectDefaultOption {
    value?: string
    label?: string
    hideAfter?: boolean
  }

  interface FormSelectProps extends
    FormElementProps<SelectElement>, SelectAttributes
  {
    /**
     * Element returned from any high level
     * Field hooks (`useInput` etc).
     */
    element: SelectElement

    /**
     * prepends a null value
     * (selected by default if no value was provided)
     */
    defaultOption?: SelectDefaultOption
  }

  // Field related stuff.

  /** field's metadata interface. */
  interface Meta {
    touched: boolean
    dirty: boolean
    valid: boolean
    show: boolean
    prevInputs: Array<string | string[]>
    validationMessage: string
  }

  /** for low level Field hooks. */
  interface BasicElement<T> {
    attr: T
    /** equivalent to `setState`. */
    dispatchAttr: Types.Void
    meta: Meta
    dispatchMeta: Types.Void
    sanitize: Types.Void
    dispatchOptions: Types.Void
  }
  
  /** high level generic Field hook. */
  interface Element extends ObjectInterface {
    attr: InputAttributes | TextAreaAttributes | SelectAttributes
    dispatchAttr: Types.Void
    meta: Field.Meta
    dispatchMeta: Types.Void
    fieldType: string
  }


  /** high level Input Field hook. */
  interface InputElement extends Element {
    attr: InputAttributes
  }

  /** high level textarea Field hook. */
  interface TextAreaElement extends Element {
    attr: TextAreaAttributes
  }

  /** high level textarea Field hook. */
  interface SelectElement extends Element {
    attr: SelectAttributes
  }

  /** high level radio button Field hook. */
  interface RadioElements {
    current: Types.Dispatcher<any>
    elements: InputElement[]
    append: any
    fieldType: string
  }

  type GenericElement
    = InputElement
    | TextAreaElement
    | SelectElement
    | RadioElements

  type HTMLGenericElement
    = HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement

  type MutationEvent<T>
    = React.ChangeEvent<T>
    | React.FocusEvent<T>

}

export default Field;
