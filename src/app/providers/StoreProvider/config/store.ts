import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { ReduxStoreWithManager, StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersList,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    ...asyncReducers,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  }) as ReduxStoreWithManager;

  store.reducerManager = reducerManager;

  return store;
}
