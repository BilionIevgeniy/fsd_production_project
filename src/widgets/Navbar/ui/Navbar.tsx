import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import cls from './Navbar.module.scss';
import { AppLink } from 'shared/ui/AppLink';
import { AppLinkTheme } from 'shared/ui/AppLink/AppLink';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = '' }: NavbarProps) {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.logo}>Logo</div>
      <div className={cls.navbarLinks}>
        <AppLink theme={AppLinkTheme.INVERTED} to="/">Home</AppLink>
        <AppLink theme={AppLinkTheme.PRIMARY} to="/about">About</AppLink>
      </div>
    </div>
  );
}
