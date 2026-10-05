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
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateSchema {
  user: UserSchema;

  // Async Reduers
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
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
  [ThunkMiddleware<StateSchema, AnyAction, ThunkExtraArgs>]
> {
  reducerManager: ReducerManagerSchema;
}

export interface ThunkExtraArgs {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkApiConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArgs;
}
