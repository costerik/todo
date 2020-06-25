import {combineReducers} from 'redux';

/* reducers */
import tasksReducer from '../reducers/tasks';
import statesReducer from '../reducers/states';
import usersReducer from '../reducers/users';

/* types */
import {RootStateType} from './reducers.types';

export const rootState = {
  tasksReducer,
  statesReducer,
  usersReducer,
};

const rootReducer = combineReducers<RootStateType>(rootState);

export default rootReducer;
