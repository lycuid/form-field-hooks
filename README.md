# useField-hook-experimental
`useField` hook for input state built with react hooks (experimental), yet seems like can be a solid. If it works out, then probably move towards `useForm` as well.


## usage
Hooks:
* `useInput`, `useSelect`, `useTextArea`, `useCheckbox`
  * params:
    * `attributes`: &nbsp; should be valid attributes of element (which ever is bieng used).
    * `options`: for now, only one function `validity`, which takes current state of the respective input as argument and returns boolean.
  * returns:
    * `attr`: &nbsp; new attributes with custom event handlers after extending them with the provider event handlers.
    * `setAttr`: similar to `setState` for the returned `attr`.
    * `meta`: &nbsp; a list of booleans which are self explanatory (`touched`, `dirty`, `valid` etc)

* `useRadio`
  * params: An Array of `{attributes, options}` (almost same as the above).
  * returns: An Object with structure `{current, elements}`
    * `current`: current selected value.
    * `elements`: Array of `{attr, setAttr, meta}` in same order as provided.

## Examples:
In Progress.
<!--
    function Form() {
      const name = useInput({value: 'Mary', name: 'name'});
      const surname = useInput({value: 'Poppins', name: 'surname'});

      const isSaiyan = useCheckbox({name: 'isSaiyan'});
      const isSuper = useCheckbox({name: 'isSuper'});

      const select = useSelect({value: '', name: 'select'});
      const multiselect = useSelect({value: '', name: 'multiselect', multiple: true});

      const description = useTextArea({value: '', name: 'description'});
      return (
        <>
          <input {...name.attr} />
        </>
      )
    }
-->