import { Story } from '@storybook/react';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { Theme } from 'shared/config/theme';

// For stories whose component reads the theme via useTheme() itself (e.g.
// ThemeSwitcher) rather than only being restyled by the CSS class
// ThemeContextDecorator applies. Wraps the real ThemeProvider (pinned to
// initialTheme) instead of re-implementing its state/toggle logic, so the
// story exercises the same provider code the app actually ships.
export const ThemeContextDecorator = (theme: Theme) => (StoryComponent: Story) =>
  (
    <ThemeProvider initialTheme={theme}>
      <div className={classNames('app', {}, [theme])}>
        <StoryComponent />
      </div>
    </ThemeProvider>
  );
