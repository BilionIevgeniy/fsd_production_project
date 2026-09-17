export enum Theme {
  NORMAL = 'app_normal_theme',
  DARK = 'app_dark_theme',
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
