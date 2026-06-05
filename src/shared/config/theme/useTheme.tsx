import { ThemeContext } from '@/shared/config/theme/ThemeContext';
import { UseThemeResult } from '@/shared/config/theme/types';
import { useContext } from 'react';

export const useTheme = (): UseThemeResult => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return { theme, toggleTheme };
};
