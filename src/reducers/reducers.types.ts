import rootReducer, {rootState} from './reducers';

export type RootStateType = typeof rootState;
export type ReturnRootStateType = ReturnType<typeof rootReducer>;
