import { Story } from '@storybook/react';
import { AppThemeRoot } from 'shared/config/storybook/AppThemeRoot/AppThemeRoot';
import { Theme } from 'shared/config/theme';

// Applies only the data-theme attribute (via AppThemeRoot) — no
// ThemeProvider, no context, no document-wide side effect. This is what the
// vast majority of stories actually need: something to restyle via CSS
// custom properties. Reserve ThemeContextDecorator for the few that read
// the theme via useTheme() itself (ThemeSwitcher) or that portal outside
// this wrapper and need document.documentElement's attribute to be
// unambiguous (Modal) — nesting a ThemeProvider under this one is exactly
// what those need to avoid, since two active at once race over that same
// single global attribute (see ThemeContextDecorator's comment).
export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <AppThemeRoot theme={theme}>
    <StoryComponent />
  </AppThemeRoot>
);
