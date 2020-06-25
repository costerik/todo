import axios from 'axios';
import {AnyAction} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

/* constants */
import * as actionTypes from './actions-types';
import * as generalActionTypes from '../general-actions-types';

/* types */
import {ActionsTypes, StateType} from './types';
import {ReturnRootStateType} from '../reducers.types';

/* validation data */
export const startedFetchStates = (): ActionsTypes => ({
  type: actionTypes.STARTED_FETCH_STATES,
  payload: {
    state: generalActionTypes.FETCHING,
  },
});

export const finishedFetchStates = (data: Array<StateType>): ActionsTypes => ({
  type: actionTypes.FINISHED_FETCH_STATES,
  payload: {
    state: generalActionTypes.FINISHED,
    data,
  },
});

export const errorFetchStates = (error: string): ActionsTypes => ({
  type: actionTypes.ERROR_FETCH_STATES,
  payload: {
    state: generalActionTypes.ERROR,
    error,
  },
});

export const fetchStates = (): ThunkAction<Promise<void>, ReturnRootStateType, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<void> => {
    try {
      dispatch(startedFetchStates());
      const {data} = await axios.get<Array<StateType>>(`${process.env.REACT_APP_BASE_URL}/states`);
      dispatch(finishedFetchStates(data));
    } catch (e) {
      dispatch(errorFetchStates(e));
    }
  };
};
