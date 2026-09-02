import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { LangSwitcher } from 'features/LangSwitcher';
import { AppLink, Button } from 'shared/ui';
import { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePaths } from 'app/providers/RouterProvider/config/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <div className={cls.linkItems}>
        <AppLink className={cls.link} to={RoutePaths.main}>
          <AboutIcon className={cls.icon} />
          <span className={cls.linkText}>{t('nav_home')}</span>
        </AppLink>
        <AppLink className={cls.link} to={RoutePaths.about}>
          <MainIcon className={cls.icon} />
          <span className={cls.linkText}>{t('nav_about')}</span>
        </AppLink>
      </div>
      <Button
        theme={ButtonTheme.BACKGROUND_INVERTED}
        className={cls.collapseBtn}
        data-testid="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  );
};
