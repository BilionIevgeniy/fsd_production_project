export enum Theme {
  NORMAL = 'normal',
  DARK = 'dark',
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
