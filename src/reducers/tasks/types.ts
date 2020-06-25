import * as actionsTypes from './actions-types';
import {UserType} from '../users/types';

export type TaskType = {
  _id: string;
  title: string;
  description: string;
  user: UserType | null;
  createAt: Date;
  updatedAt: Date;
  __v: number;
};
export type InitialStateType = {
  state: string;
  tasks: Array<TaskType> | null | undefined;
  error: string | null | undefined;
};
export type startedFetchTasksType = {
  type: typeof actionsTypes.STARTED_FETCH_TASKS;
  payload: {
    state: string;
  };
};
export type finishedFetchTasksType = {
  type: typeof actionsTypes.FINISHED_FETCH_TASKS;
  payload: {
    state: string;
    data: Array<TaskType>;
  };
};
export type errorFetchTasksType = {
  type: typeof actionsTypes.ERROR_FETCH_TASKS;
  payload: {
    state: string;
    error: string;
  };
};
export type ActionsTypes = startedFetchTasksType | finishedFetchTasksType | errorFetchTasksType;
