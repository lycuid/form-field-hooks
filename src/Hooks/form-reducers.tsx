import * as React from 'react';

import { Types } from '../Interfaces';

// Generic state reducer, behaviour some what similar to good ol'
// react's `setState`.
const stateReducer = (
  state: any,
  newState: any
): React.Reducer<any, any> => ({...state, ...newState});


// Generic reducer hook, can be used anywhere.
export const useStateReducer = <T extends {}>(
  initialState: any,
  react?: any
): Types.Dispatcher<T> => (react || React).useReducer(stateReducer, initialState);


