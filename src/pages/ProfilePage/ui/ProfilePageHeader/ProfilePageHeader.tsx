import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Button, Text } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
  readonly?: boolean;
  editCard: () => void;
  cancelEdit: () => void;
  saveEdited: () => void;
}

export function ProfilePageHeader({
  className = '',
  readonly,
  editCard,
  cancelEdit,
  saveEdited,
}: ProfilePageHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Profile')} />
      <div>
        {readonly ? (
          <Button onClick={editCard} className={cls.editBtn} theme={ButtonTheme.OUTLINE}>
            {t('Edit')}
          </Button>
        ) : (
          <>
            <Button onClick={cancelEdit} className={cls.editBtn} theme={ButtonTheme.OUTLINE_RED}>
              {t('Cancel')}
            </Button>
            <Button onClick={saveEdited} className={cls.editBtn} theme={ButtonTheme.OUTLINE}>
              {t('Save')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
