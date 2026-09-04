import { ThemeContext } from 'shared/config/theme/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY, Theme } from 'shared/config/theme/types';
import { FC, useCallback, useMemo, useState } from 'react';

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

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Theme.NORMAL ? Theme.DARK : Theme.NORMAL;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }, [theme]);

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
