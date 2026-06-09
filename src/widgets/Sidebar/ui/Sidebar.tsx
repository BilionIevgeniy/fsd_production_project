import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.Sidebar, {}, [className])}>
      {' '}
      {t('Sidebar')}
    </div>
  );
};
