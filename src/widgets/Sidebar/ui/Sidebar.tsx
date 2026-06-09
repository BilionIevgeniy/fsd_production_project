import { useTheme } from 'shared/config/theme/useTheme';

export function Sidebar({ children = '' }) {
  //t('toggle_btn')
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}> Switch Theme</button>
    </div>
  );
}
