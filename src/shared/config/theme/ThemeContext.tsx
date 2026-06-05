import { Theme, ThemeContextValue } from 'shared/config/theme/types';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeContextValue>({
  theme: Theme.NORMAL,
  toggleTheme: () => {},
});
