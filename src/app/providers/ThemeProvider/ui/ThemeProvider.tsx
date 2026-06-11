import { ThemeContext } from 'shared/config/theme/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY, Theme } from 'shared/config/theme/types';
import { FC, useCallback, useMemo, useState } from 'react';

export const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.NORMAL,
  );

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Theme.NORMAL ? Theme.DARK : Theme.NORMAL;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }, [theme]);

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
