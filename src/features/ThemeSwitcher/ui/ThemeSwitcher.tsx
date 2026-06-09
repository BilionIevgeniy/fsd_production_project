import { useTranslation } from 'react-i18next';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { useTheme } from 'shared/config/theme/useTheme';
import { Theme } from 'shared/config/theme/types';

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className = '' }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <button onClick={toggleTheme}>
      {theme !== Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </button>
  );
}
