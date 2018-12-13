declare namespace Types {
  export type Maybe<T> = T | void
  export type Void = (params?: any) => void
  
  export type Value = string | boolean | number | null
  export type Json = { [k: string]: Value | Value[] | Json }
  
  export type HTMLInput = HTMLInputElement
  export type HTMLSelect = HTMLSelectElement
  export type HTMLTextArea = HTMLTextAreaElement

  export type Reducer<T> = [T, React.Dispatch<T>]
}

// export default Types;