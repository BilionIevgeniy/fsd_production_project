import { ThemeContext } from '@/shared/config/theme/ThemeContext';
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  UseThemeResult,
} from '@/shared/config/theme/types';
import { useContext, useState } from 'react';

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.NORMAL ? Theme.DARK : Theme.NORMAL;

    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme, toggleTheme };
};
