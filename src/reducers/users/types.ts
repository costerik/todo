import * as actionsTypes from './actions-types';
import {TaskType} from '../tasks/types';

export type UserType = {
  _id: string;
  name: string;
  lastname: string;
  tasks: Array<TaskType>;
  createAt: Date;
  updatedAt: Date;
  __v: number;
};
export type InitialStateType = {
  state: string;
  users: Array<UserType> | null | undefined;
  error: string | null | undefined;
};
export type startedFetchUsersType = {
  type: typeof actionsTypes.STARTED_FETCH_USERS;
  payload: {
    state: string;
  };
};
export type finishedFetchUsersType = {
  type: typeof actionsTypes.FINISHED_FETCH_USERS;
  payload: {
    state: string;
    data: Array<UserType>;
  };
};
export type errorFetchUsersType = {
  type: typeof actionsTypes.ERROR_FETCH_USERS;
  payload: {
    state: string;
    error: string;
  };
};
export type ActionsTypes = startedFetchUsersType | finishedFetchUsersType | errorFetchUsersType;
