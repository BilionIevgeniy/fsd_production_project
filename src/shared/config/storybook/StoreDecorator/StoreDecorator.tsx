import { Story } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial, StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
};

// use for components that read the Redux store directly (useSelector/useDispatch)
export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
