import axios from 'axios';
import {AnyAction} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

/* constants */
import * as actionTypes from './actions-types';
import * as generalActionTypes from '../general-actions-types';

/* types */
import {ActionsTypes, TaskType} from './types';
import {ReturnRootStateType} from '../reducers.types';

/* tasks */
export const startedFetchTasks = (): ActionsTypes => ({
  type: actionTypes.STARTED_FETCH_TASKS,
  payload: {
    state: generalActionTypes.FETCHING,
  },
});

export const finishedFetchTasks = (data: Array<TaskType>): ActionsTypes => ({
  type: actionTypes.FINISHED_FETCH_TASKS,
  payload: {
    state: generalActionTypes.FINISHED,
    data,
  },
});

export const errorFetchTasks = (error: string): ActionsTypes => ({
  type: actionTypes.ERROR_FETCH_TASKS,
  payload: {
    state: generalActionTypes.ERROR,
    error,
  },
});

export const fetchTasks = (): ThunkAction<Promise<void>, ReturnRootStateType, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<void> => {
    try {
      dispatch(startedFetchTasks());
      const {data} = await axios.get<Array<TaskType>>(`${process.env.REACT_APP_BASE_URL}/tasks`);
      dispatch(finishedFetchTasks(data));
    } catch (e) {
      dispatch(errorFetchTasks(e));
    }
  };
};

/* create task */
export const startedCreateTask = (): ActionsTypes => ({
  type: actionTypes.STARTED_CREATE_TASK,
  payload: {
    state: generalActionTypes.CREATE,
  },
});

export const finishedCreateTask = (): ActionsTypes => ({
  type: actionTypes.FINISHED_CREATE_TASK,
  payload: {
    state: generalActionTypes.FINISHED,
  },
});

export const errorCreateTask = (error: string): ActionsTypes => ({
  type: actionTypes.ERROR_CREATE_TASK,
  payload: {
    state: generalActionTypes.ERROR,
    error,
  },
});

export const createTask = (
  title: string,
  state: string,
): ThunkAction<Promise<void>, ReturnRootStateType, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<void> => {
    try {
      const body = {} as Partial<{title: string; state: string}>;
      body.title = title;
      body.state = state;
      dispatch(startedCreateTask());
      await axios.post<TaskType>(`${process.env.REACT_APP_BASE_URL}/tasks`, body);
      dispatch(finishedCreateTask());
      //eslint-disable-next-line
      dispatch(fetchTasks() as any);
    } catch (e) {
      dispatch(errorCreateTask(e));
    }
  };
};
