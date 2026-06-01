export enum Theme {
  NORMAL = 'normal',
  DARK = 'dark',
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}
