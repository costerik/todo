import axios from 'axios';
import {AnyAction} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

/* constants */
import * as actionTypes from './actions-types';
import * as generalActionTypes from '../general-actions-types';

/* types */
import {ActionsTypes, UserType} from './types';
import {ReturnRootStateType} from '../reducers.types';
import {fetchTasks} from '../tasks/actions';

/* fetch users */
export const startedFetchUsers = (): ActionsTypes => ({
  type: actionTypes.STARTED_FETCH_USERS,
  payload: {
    state: generalActionTypes.FETCHING,
  },
});

export const finishedFetchUsers = (data: Array<UserType>): ActionsTypes => ({
  type: actionTypes.FINISHED_FETCH_USERS,
  payload: {
    state: generalActionTypes.FINISHED,
    data,
  },
});

export const errorFetchUsers = (error: string): ActionsTypes => ({
  type: actionTypes.ERROR_FETCH_USERS,
  payload: {
    state: generalActionTypes.ERROR,
    error,
  },
});

export const fetchUsers = (): ThunkAction<Promise<void>, ReturnRootStateType, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<void> => {
    try {
      dispatch(startedFetchUsers());
      const {data} = await axios.get<Array<UserType>>(`${process.env.REACT_APP_BASE_URL}/users`);
      dispatch(finishedFetchUsers(data));
    } catch (e) {
      dispatch(errorFetchUsers(e));
    }
  };
};

/* add task to a user */
export const startedAddTaskToUser = (): ActionsTypes => ({
  type: actionTypes.STARTED_ADD_TASK_TO_USER,
  payload: {
    state: generalActionTypes.UPDATE,
  },
});

export const finishedAddTaskToUser = (): ActionsTypes => ({
  type: actionTypes.FINISHED_ADD_TASK_TO_USER,
  payload: {
    state: generalActionTypes.FINISHED,
  },
});

export const errorAddTaskToUser = (error: string): ActionsTypes => ({
  type: actionTypes.ERROR_ADD_TASK_TO_USER,
  payload: {
    state: generalActionTypes.ERROR,
    error,
  },
});

export const addTaskToUser = ({
  userId,
  taskId,
}: {
  userId: string;
  taskId: string;
}): ThunkAction<Promise<void>, ReturnRootStateType, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<void> => {
    try {
      dispatch(startedAddTaskToUser());
      await axios.patch<Array<UserType>>(`${process.env.REACT_APP_BASE_URL}/users/${userId}/task`, {
        taskId,
      });
      dispatch(finishedAddTaskToUser());
      //eslint-disable-next-line
      await Promise.all([dispatch(fetchUsers() as any), dispatch(fetchTasks() as any)]);
    } catch (e) {
      dispatch(errorAddTaskToUser(e));
    }
  };
};
