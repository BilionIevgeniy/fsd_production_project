import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import type {
  DeepPartial,
  ReducersList,
  StateSchema,
} from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: ReducersList;
  api?: AxiosInstance;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState, asyncReducers, api } = props;
  const navigate = useNavigate();
  const store = createReduxStore(initialState as StateSchema, asyncReducers, navigate, api);

  return <Provider store={store}>{children}</Provider>;
};
