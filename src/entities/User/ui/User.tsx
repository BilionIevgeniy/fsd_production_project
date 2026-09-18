import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import cls from './User.module.scss';

interface UserProps {
  className?: string;
}

export function User({ className = '' }: UserProps) {
  const { t } = useTranslation();
  return (
    <div data-testid="value-title" className={classNames(cls.User, {}, [className])}>
      {t('User')}
    </div>
  );
}
