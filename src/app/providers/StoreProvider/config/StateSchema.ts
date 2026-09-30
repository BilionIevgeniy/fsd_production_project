import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import {
  AnyAction,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  ThunkMiddleware,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  profile: ProfileSchema;

  // Async Reduers
  loginForm?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

// redux's own DeepPartial doesn't distribute over optional (T | undefined)
// properties, so it leaves async slices like `loginForm` fully required
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export interface ReducerManagerSchema {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema | undefined, action: AnyAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<
  StateSchema,
  AnyAction,
  [ThunkMiddleware<StateSchema>]
> {
  reducerManager: ReducerManagerSchema;
}
