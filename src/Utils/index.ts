import { Types, Field } from '../Interfaces';

// needs to be in every high-level field hook just before the custom
// event handling function ends.
// exactly vice versa of `preventDefault` as it runs in the very beginning.
export const continueDefault = (
  e: React.ChangeEvent<Types.HTMLElement>,
  state: Field.HTMLGenericAttributes,
  action: string
): void => 
{
  state[action] && state[action](e);
}



