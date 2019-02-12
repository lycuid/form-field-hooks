import * as React from 'react';
import { Field } from '../Interfaces';

/**
 * setting custom validity here.
 * taking advantage of the `Validity` API for validation purposes.
 */




const Input = React.forwardRef((
  props: Field.FormInputProps,
  ref: React.MutableRefObject<HTMLInputElement>
) => {
  const { element, show, react, ...rest } = props;
  ref = ref || (react || React).useRef(null);
  
  element.sanitize();
  
  // (react || React).useEffect(() => {
  //   console.log(element.meta.validationMessage);
  //   ref.current &&
  //     ref.current.setCustomValidity(element.meta.validationMessage);
  // }, [element.meta.valid]);
  
  return (
    <>
      {element.meta.show && (show || true) &&
        (<input {...element.attr} ref={ref} {...rest} />) }
    </>
  )

});


const Select = (props: Field.FormSelectProps) => {
  const { element, defaultOption, show, children, react, _ref, ...rest } = props;
  const selectRef = _ref || (react || React).useRef(null);

  const option = (element: Field.Element, defaultOption: Field.SelectDefaultOption):
  React.ReactNode => (
    defaultOption.hideAfter ?
      (!element.attr.value.length &&
        <option value={defaultOption.value || ''}>
          {defaultOption.label || ''}
        </option>) :
      (<option value={defaultOption.value || ''}>
        {defaultOption.label || ''}
      </option>)
  )


  // element.sanitize({});

  // (react || React).useEffect(() => {
  //   selectRef.current &&
  //     selectRef.current.setCustomValidity(element.meta.validationMessage);
  // }, [element.meta.valid]);
  
  return (
    <>
      {element.meta.show && (show || true) && (
        <select {...element.attr} ref={selectRef} {...rest}>
          {defaultOption && option(element, defaultOption)}
          {children}
        </select>
      )}
    </>
  )

}


const TextArea = (props: Field.FormTextAreaProps) => {
  const { element, show, _ref, react, ...rest } = props;
  const textareaRef = (react || React).useRef(null);

  // element.sanitize({});

  // (react || React).useEffect(() => {
  //   textareaRef &&
  //     textareaRef.current.setCustomValidity(element.meta.validationMessage);
  // }, [element.meta.valid]);
  
  return (
    <>
      {element.meta.show && (show || true) && (
        <textarea {...element.attr} ref={textareaRef} {...rest} />
      )}
    </>
  )
}


export default { Input, Select, TextArea };
