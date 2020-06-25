import * as actionsTypes from './actions-types';

export type StateType = {
  _id: string;
  name: string;
  createAt: Date;
  updatedAt: Date;
  __v: number;
};
export type InitialStateType = {
  state: string;
  states: Array<StateType> | null | undefined;
  error: string | null | undefined;
};
export type startedFetchStatesType = {
  type: typeof actionsTypes.STARTED_FETCH_STATES;
  payload: {
    state: string;
  };
};
export type finishedFetchStatesType = {
  type: typeof actionsTypes.FINISHED_FETCH_STATES;
  payload: {
    state: string;
    data: Array<StateType>;
  };
};
export type errorFetchStatesType = {
  type: typeof actionsTypes.ERROR_FETCH_STATES;
  payload: {
    state: string;
    error: string;
  };
};
export type ActionsTypes = startedFetchStatesType | finishedFetchStatesType | errorFetchStatesType;
