import { Story } from '@storybook/react';
import { AppThemeRoot } from 'shared/config/storybook/AppThemeRoot/AppThemeRoot';
import { Theme } from 'shared/config/theme';

// theme via CSS only, no ThemeProvider — global default in preview.js. Use ThemeContextDecorator instead if the component reads useTheme() or uses Modal.
export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <AppThemeRoot theme={theme}>
    <StoryComponent />
  </AppThemeRoot>
);
