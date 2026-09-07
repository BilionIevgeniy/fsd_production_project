import { Story } from '@storybook/react';
import { AppThemeRoot } from 'shared/config/storybook/AppThemeRoot/AppThemeRoot';
import { Theme } from 'shared/config/theme';

// use for Sidebar: it needs `.content-page`'s explicit height for its own `height: 100%` to resolve
export const ContentPageDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <AppThemeRoot theme={theme}>
    <div className="content-page">
      <StoryComponent />
    </div>
  </AppThemeRoot>
);
