import initialState from './initial-state';
import * as actionTypes from './actions-types';

/* types */
import {InitialStateType, ActionsTypes} from './types';

export default (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case actionTypes.FINISHED_CREATE_TASK:
    case actionTypes.STARTED_FETCH_TASKS:
    case actionTypes.STARTED_CREATE_TASK:
      return {
        ...state,
        state: action.payload.state,
      };
    case actionTypes.FINISHED_FETCH_TASKS:
      return {
        ...state,
        state: action.payload.state,
        tasks: action.payload.data,
        error: null,
      };
    case actionTypes.ERROR_CREATE_TASK:
    case actionTypes.ERROR_FETCH_TASKS:
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
