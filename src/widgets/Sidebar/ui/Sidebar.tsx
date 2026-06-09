import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { useTheme } from 'shared/config/theme/useTheme';

export function Sidebar({ children = '' }) {
  //t('toggle_btn')

  return (
    <div>
      <ThemeSwitcher />
    </div>
  );
}
