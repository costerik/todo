import axios from 'axios';
import {AnyAction} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

/* constants */
import * as actionTypes from './actions-types';
import * as generalActionTypes from '../general-actions-types';

/* types */
import {ActionsTypes, TaskType} from './types';
import {ReturnRootStateType} from '../reducers.types';

/* actions */
import {fetchUsers} from '../users/actions';

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
      await dispatch(fetchTasks() as any);
    } catch (e) {
      dispatch(errorCreateTask(e));
    }
  };
};

/* create task */
export const startedUpdateTask = (): ActionsTypes => ({
  type: actionTypes.STARTED_UPDATE_TASK,
  payload: {
    state: generalActionTypes.UPDATE,
  },
});

export const finishedUpdateTask = (): ActionsTypes => ({
  type: actionTypes.FINISHED_UPDATE_TASK,
  payload: {
    state: generalActionTypes.FINISHED,
  },
});

export const errorUpdateTask = (error: string): ActionsTypes => ({
  type: actionTypes.ERROR_UPDATE_TASK,
  payload: {
    state: generalActionTypes.ERROR,
    error,
  },
});

export const updateTask = ({
  title = '',
  description = '',
  state = '',
  id,
}: {
  title?: string;
  description?: string;
  state?: string;
  id: string;
}): ThunkAction<Promise<void>, ReturnRootStateType, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<void> => {
    try {
      const body = {} as Partial<{title: string; state: string; description: string; id: string}>;
      if (title.trim().length > 0) body.title = title;
      if (description.trim().length > 0) body.description = description;
      if (state.trim().length > 0) body.state = state;
      dispatch(startedUpdateTask());
      await axios.patch<TaskType>(`${process.env.REACT_APP_BASE_URL}/tasks/${id}`, body);
      dispatch(finishedUpdateTask());
      //eslint-disable-next-line
      await Promise.all([dispatch(fetchTasks() as any), dispatch(fetchUsers() as any)]);
    } catch (e) {
      dispatch(errorUpdateTask(e));
    }
  };
};
