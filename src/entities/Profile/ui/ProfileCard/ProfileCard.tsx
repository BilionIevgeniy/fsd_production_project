import { classNames } from 'shared/lib/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
  className?: string;
  error?: string;
  isLoading?: boolean;
  data?: Profile;
  readonly?: boolean;
  onChangeFirstName: () => void;
  onChangeLastName: () => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { t } = useTranslation();
  const { className, error, isLoading, data, readonly, onChangeFirstName, onChangeLastName } =
    props;
  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          align={TextAlign.RIGHT}
          theme={TextTheme.ERROR}
          text={t('profile_loading_error_text')}
          title={t('profile_loading_error_title')}
        />
      </div>
    );
  }
  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <Input
        onChange={onChangeFirstName}
        readonly={readonly}
        value={data?.first ?? ''}
        placeholder={t('Ваше имя')}
        className={cls.input}
      />
      <Input
        onChange={onChangeLastName}
        readonly={readonly}
        value={data?.lastname ?? ''}
        placeholder={t('Ваша фамилия')}
        className={cls.input}
      />
    </div>
  );
};
