import { ThemeContext } from 'shared/config/theme/ThemeContext';
import { ThemeContextValue } from 'shared/config/theme/types';
import { useContext } from 'react';

export const useTheme = (): ThemeContextValue => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return { theme, toggleTheme };
};
