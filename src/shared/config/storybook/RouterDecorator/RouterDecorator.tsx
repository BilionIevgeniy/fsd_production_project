import { Story } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

// Opt-in decorator for stories whose component renders react-router-dom's
// Link/NavLink (e.g. via AppLink) and needs a Router context to not throw.
export const RouterDecorator = (StoryComponent: Story) => (
  <MemoryRouter>
    <StoryComponent />
  </MemoryRouter>
);
