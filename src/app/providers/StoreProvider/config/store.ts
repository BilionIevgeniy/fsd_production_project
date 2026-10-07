import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import type { ReducersList, ReduxStoreWithManager, StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersList,
  navigate?: (to: To, options?: NavigateOptions) => void,
  api: AxiosInstance = $api,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    ...asyncReducers,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api,
            navigate,
          },
        },
      }),
  }) as ReduxStoreWithManager;

  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
