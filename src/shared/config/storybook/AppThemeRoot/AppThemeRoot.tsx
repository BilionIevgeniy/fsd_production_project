import { ReactNode } from 'react';
import { Theme } from 'shared/config/theme';

interface AppThemeRootProps {
  theme: Theme;
  children: ReactNode;
}

// themed root shared by ThemeContextDecorator, ContentPageDecorator, PageLayoutDecorator
export function AppThemeRoot({ theme, children }: AppThemeRootProps) {
  return <div data-theme={theme}>{children}</div>;
}
