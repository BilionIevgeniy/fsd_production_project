import { AxiosInstance } from 'axios';
import { Story } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import type {
  DeepPartial,
  ReducersList,
  StateSchema,
} from 'app/providers/StoreProvider/config/StateSchema';

// use for components that read the Redux store directly (useSelector/useDispatch)
export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList, api?: AxiosInstance) =>
  (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={asyncReducers} api={api}>
      <StoryComponent />
    </StoreProvider>
  );
