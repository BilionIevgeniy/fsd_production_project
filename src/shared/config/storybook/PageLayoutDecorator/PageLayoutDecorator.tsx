import { Story } from '@storybook/react';
import { AppThemeRoot } from 'shared/config/storybook/AppThemeRoot/AppThemeRoot';
import { Theme } from 'shared/config/theme';

// use for routed pages (e.g. NotFoundPage): same reasoning as ContentPageDecorator, one level deeper via `.page-wrapper`
export const PageLayoutDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <AppThemeRoot theme={theme}>
    <div className="content-page">
      <div className="page-wrapper">
        <StoryComponent />
      </div>
    </div>
  </AppThemeRoot>
);
