import {combineReducers} from 'redux';

/* reducers */
import tasksReducer from '../reducers/tasks';

/* types */
import {RootStateType} from './reducers.types';

export const rootState = {
  tasksReducer,
};

const rootReducer = combineReducers<RootStateType>(rootState);

export default rootReducer;
