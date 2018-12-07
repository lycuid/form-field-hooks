import * as React from 'react';

import { Field, Types } from '../Interfaces';
import { useStateReducer } from "./form-reducers";


const { useEffect } = React;

/*
  @TODO instead of having seperate reducers, have the same one somehow,
  rendering will be jsut once then.
*/
export const useField =
(params: Field.Params, options?: Field.Options): Field.Input =>
{
  // By default setting it to text as there are some jquery/querySelectors, 
  // dependent on the type of the input itself.
  params.type = params.type || 'text';
  let [state, setAttr] = useStateReducer(params);

  let [meta, dispatchMeta] = useStateReducer({
    touched: false, dirty: false, valid: true
  });

  // local function, so the state, dispatch etc is accessable, rather
  // than passing as argument, which can get a little messy in this case.
  const applyValidations = (valid: boolean): void => {
    valid = (options && options.validity) ?
      (options.validity(state) && valid) : valid;
    dispatchMeta({ valid });
  }

  // custom default onChange.
  const onChange: Types.Void = 
  (e: React.ChangeEvent<Types.HTMLInput>) => {
    let { value } = e.target;
    // handle `touched`
    if (!meta.touched) { dispatchMeta({ touched: true }); }
    // set value on input
    setAttr({ value });

    applyValidations(e.target.validity.valid);

    // finally call the provided onChange.
    state.onChange && state.onChange(e);
  };


  const onBlur: Types.Void = (e: any) => {
    // handle touched
    !meta.touched && dispatchMeta({ touched: true })

    applyValidations(e.target.validity.valid);
  };
 

  // effects: cDM, cDU.
  // state specific cDU, called only when 'input.value' state is updated.
  useEffect(() => {
    // checks if new 'input.value' is equal to the originally provided
    // 'value' in 'params'.
    if (params.value != state.value && !meta.dirty)
      dispatchMeta({ dirty: true });
    applyValidations(true);
  }, [state.value]);


  // Finally constructing the 'Field' for returning.
  var attr: any = {...state, onChange, onBlur};
  const field: Field.Input = { attr, meta, setAttr };

  return field;
}


const applyValiditions = (): void => {

}