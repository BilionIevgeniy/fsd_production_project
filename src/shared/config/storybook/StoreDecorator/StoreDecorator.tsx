import { Story } from '@storybook/react';
import { DeepPartial } from '@reduxjs/toolkit';
import { StoreProvider } from 'app/providers/StoreProvider';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

// use for components that read the Redux store directly (useSelector/useDispatch)
export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: Story) => (
  <StoreProvider initialState={state}>
    <StoryComponent />
  </StoreProvider>
);
