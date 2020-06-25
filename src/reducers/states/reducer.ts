import initialState from './initial-state';
import * as actionTypes from './actions-types';

/* types */
import {InitialStateType, ActionsTypes} from './types';

export default (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case actionTypes.STARTED_FETCH_STATES:
      return {
        ...state,
        state: action.payload.state,
      };
    case actionTypes.FINISHED_FETCH_STATES:
      return {
        ...state,
        state: action.payload.state,
        states: action.payload.data,
        error: null,
      };
    case actionTypes.ERROR_FETCH_STATES:
      return {
        ...state,
        state: action.payload.state,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
