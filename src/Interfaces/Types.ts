declare namespace Types {
  type Maybe<T> = T | void
  type Void = (...params: any) => void
  
  type Value = string | boolean | number | null
  type Json = { [k: string]: Value | Value[] | Json }
 
  type HTMLElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

  type Dispatcher<T> = [T, React.Dispatch<T>]
}

export default Types;