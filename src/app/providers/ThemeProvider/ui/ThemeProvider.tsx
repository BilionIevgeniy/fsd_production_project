import { ThemeContext } from 'shared/config/theme/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY, Theme } from 'shared/config/theme/types';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

interface ThemeProviderProps {
  // Pins the starting theme instead of reading localStorage — used by
  // Storybook's ThemeContextDecorator so a dark-theme story doesn't depend
  // on whatever the browser's localStorage happens to hold.
  initialTheme?: Theme;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(
    () => initialTheme ?? ((localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.NORMAL),
  );

  // The theme's CSS custom properties (--bg-color, etc. — see
  // src/app/styles/themes/*.scss) are declared on [data-theme='...'] and
  // consumed on body (src/app/styles/index.scss). <html> (document.
  // documentElement), not <body>, carries the attribute: it's the one true
  // root of the document — an ancestor of body, of anything portaled into
  // body, and of anything else that might ever render outside body — so
  // nothing can end up "outside" its scope the way a div nested inside body
  // could. A single dataset assignment (rather than a class list) needs no
  // "remove the old value first" step and no list of every Theme value to
  // strip — setting it just replaces whatever was there.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Theme.NORMAL ? Theme.DARK : Theme.NORMAL;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }, [theme]);

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
