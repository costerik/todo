import * as actionsTypes from './actions-types';
import {UserType} from '../users/types';
import {StateType} from '../states/types';

export type TaskType = {
  _id: string;
  title: string;
  description: string;
  state: StateType;
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
export type startedCreateTaskType = {
  type: typeof actionsTypes.STARTED_CREATE_TASK;
  payload: {
    state: string;
  };
};
export type finishedCreateTaskType = {
  type: typeof actionsTypes.FINISHED_CREATE_TASK;
  payload: {
    state: string;
  };
};
export type errorCreateTaskType = {
  type: typeof actionsTypes.ERROR_CREATE_TASK;
  payload: {
    state: string;
    error: string;
  };
};
export type startedUpdateTaskType = {
  type: typeof actionsTypes.STARTED_UPDATE_TASK;
  payload: {
    state: string;
  };
};
export type finishedUpdateTaskType = {
  type: typeof actionsTypes.FINISHED_UPDATE_TASK;
  payload: {
    state: string;
  };
};
export type errorUpdateTaskType = {
  type: typeof actionsTypes.ERROR_UPDATE_TASK;
  payload: {
    state: string;
    error: string;
  };
};
export type ActionsTypes =
  | startedFetchTasksType
  | finishedFetchTasksType
  | errorFetchTasksType
  | startedCreateTaskType
  | finishedCreateTaskType
  | errorCreateTaskType
  | startedUpdateTaskType
  | finishedUpdateTaskType
  | errorUpdateTaskType;
