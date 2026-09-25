import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { DeepPartial, StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: ReducersList;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState, asyncReducers } = props;

  const store = createReduxStore(initialState as StateSchema, asyncReducers);

  return <Provider store={store}>{children}</Provider>;
};
