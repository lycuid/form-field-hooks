import { Field } from '../Interfaces';

// needs to be in every high-level field hook just before the custom
// event handling function ends.
// exactly vice versa of `preventDefault` as it runs in the very beginning.
export const continueDefault = <T extends {}>(
  e: React.ChangeEvent<T>,
  state: Field.Attributes | Field.TextAreaAttributes,
  action: string
): void => 
{
  state[action] && state[action](e);
}

