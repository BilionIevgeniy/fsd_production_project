import { ThemeContext } from '@/shared/config/theme/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY, Theme } from '@/shared/config/theme/types';
import { FC, useMemo, useState } from 'react';

export const ThemeProvider: FC = ({ children }) => {
  const defaultTheme =
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.NORMAL;
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const defaultValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};
