import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Button, Text } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
  readonly?: boolean;
  toggleReadOnly: () => void;
}

export function ProfilePageHeader({
  className = '',
  readonly,
  toggleReadOnly,
}: ProfilePageHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Profile')} />
      <Button onClick={toggleReadOnly} className={cls.editBtn} theme={ButtonTheme.OUTLINE}>
        {t(readonly ? 'Edit' : 'Cancel')}
      </Button>
    </div>
  );
}
