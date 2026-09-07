import { ReactNode } from 'react';
import { Theme } from 'shared/config/theme';

interface AppThemeRootProps {
  theme: Theme;
  children: ReactNode;
}

// Shared by every Storybook decorator that needs a themed root
// (ThemeContextDecorator, ContentPageDecorator, PageLayoutDecorator — each
// nests different markup inside it, which is why this only owns the themed
// div itself, not what's inside). Mirrors how ThemeProvider now scopes the
// real app's theme: a data-theme attribute (see src/app/styles/themes/*.scss
// for the [data-theme='...'] selectors it feeds), not a class.
export function AppThemeRoot({ theme, children }: AppThemeRootProps) {
  return <div data-theme={theme}>{children}</div>;
}
