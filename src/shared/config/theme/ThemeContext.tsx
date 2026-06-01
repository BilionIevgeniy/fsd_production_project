import { Theme, ThemeContextProps } from '@/shared/config/theme/types';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.NORMAL,
  setTheme: (theme) => {},
});
