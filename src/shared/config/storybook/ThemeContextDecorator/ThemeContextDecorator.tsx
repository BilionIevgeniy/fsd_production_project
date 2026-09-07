import { Story } from '@storybook/react';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { AppThemeRoot } from 'shared/config/storybook/AppThemeRoot/AppThemeRoot';
import { Theme } from 'shared/config/theme';

// use for components that call useTheme() directly (ThemeSwitcher) or that render Modal
export const ThemeContextDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <ThemeProvider initialTheme={theme}>
    <AppThemeRoot theme={theme}>
      <StoryComponent />
    </AppThemeRoot>
  </ThemeProvider>
);
