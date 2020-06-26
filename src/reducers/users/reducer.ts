import initialState from './initial-state';
import * as actionTypes from './actions-types';

/* types */
import {InitialStateType, ActionsTypes} from './types';

export default (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case actionTypes.STARTED_ADD_TASK_TO_USER:
    case actionTypes.FINISHED_ADD_TASK_TO_USER:
    case actionTypes.STARTED_FETCH_USERS:
      return {
        ...state,
        state: action.payload.state,
      };
    case actionTypes.FINISHED_FETCH_USERS:
      return {
        ...state,
        state: action.payload.state,
        users: action.payload.data,
        error: null,
      };
    case actionTypes.ERROR_ADD_TASK_TO_USER:
    case actionTypes.ERROR_FETCH_USERS:
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
