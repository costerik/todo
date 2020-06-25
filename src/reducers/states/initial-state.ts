import * as generalActionsTypes from '../general-actions-types';

/* types */
import {InitialStateType} from './types';

const initialState: InitialStateType = {
  state: generalActionsTypes.IDLE,
  states: [],
  error: null,
};

export default initialState;
