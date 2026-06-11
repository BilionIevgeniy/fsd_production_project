import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { useTheme, Theme } from 'shared/config/theme';
import { Button } from 'shared/ui';

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher(_: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  return <Button onClick={toggleTheme}>{theme !== Theme.DARK ? <DarkIcon /> : <LightIcon />}</Button>;
}
