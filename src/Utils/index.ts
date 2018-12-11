import { Field, Types } from '../Interfaces';

// kindly opposite of preventDefault, only this continues the action
export const continueDefault = (
  e: React.ChangeEvent<Types.HTMLInput>,
  state: Field.Attributes,
  action: string
): void => 
{
  state[action] && state[action](e);
}

