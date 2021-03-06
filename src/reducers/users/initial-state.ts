import * as generalActionsTypes from '../general-actions-types';

/* types */
import {InitialStateType} from './types';

const initialState: InitialStateType = {
  state: generalActionsTypes.IDLE,
  users: [],
  error: null,
};

export default initialState;
