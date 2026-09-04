import { Story } from '@storybook/react';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'shared/config/theme';

// Mirrors what app/App.tsx does for the real app: read the current theme
// from context and apply it as the "app <theme>" class on the wrapper div.
// Needed so a story's own toggle button (e.g. ThemeSwitcher) flips the class
// that's actually rendered, not just a context value nothing reads.
function AppThemeRoot({ StoryComponent }: { StoryComponent: Story }) {
  const { theme } = useTheme();
  return (
    <div className={classNames('app', {}, [theme])}>
      <StoryComponent />
    </div>
  );
}

// For stories whose component reads the theme via useTheme() itself (e.g.
// ThemeSwitcher) rather than only being restyled by the CSS class
// ThemeDecorator applies. Wraps the real ThemeProvider (pinned to
// initialTheme) instead of re-implementing its state/toggle logic, so the
// story exercises the same provider code the app actually ships.
export const ThemeContextDecorator = (initialTheme: Theme) => (StoryComponent: Story) => (
  <ThemeProvider initialTheme={initialTheme}>
    <AppThemeRoot StoryComponent={StoryComponent} />
  </ThemeProvider>
);
