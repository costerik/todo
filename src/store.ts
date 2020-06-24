import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

/* import the root reducer */
import rootReducer from './reducers';

/* setup global initial state */
const defaultState = {};

const store = createStore(rootReducer, defaultState, compose(applyMiddleware(thunk)));

export default store;
