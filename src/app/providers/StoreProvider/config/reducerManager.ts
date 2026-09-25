import { AnyAction, combineReducers, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { ReducerManagerSchema, StateSchema, StateSchemaKey } from './StateSchema';

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManagerSchema {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysOfReducersToRemove: Array<StateSchemaKey> = [
    // example: 'loginForm'
  ];

  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchema | undefined, action: AnyAction) => {
      if (keysOfReducersToRemove.length > 0 && state) {
        const newState = { ...state };
        keysOfReducersToRemove.forEach((key) => {
          delete newState[key];
        });
        keysOfReducersToRemove = [];
        state = newState;
      }
      return combinedReducer(state, action);
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;

      combinedReducer = combineReducers(reducers);
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      keysOfReducersToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
