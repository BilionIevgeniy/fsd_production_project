import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';

export enum AppLinkTheme {
  PRIMARY= "primary",
  INVERTED= "inverted"

}
interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme
}

export const AppLink: React.FC<AppLinkProps> = (props) => {
  const { t } = useTranslation();
  const {
  className = '',
  to,
  children,
  theme = AppLinkTheme.PRIMARY,
  ...otherProps
} = props

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...otherProps}
    >{children}</Link>
  );
};
