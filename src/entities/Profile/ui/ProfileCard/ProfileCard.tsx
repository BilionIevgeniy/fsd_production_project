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
  onChangeAge: () => void;
  onChangeCountry: () => void;
  onChangeCity: () => void;
  onChangeAvatar: () => void;
  onChangeUsername: () => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { t } = useTranslation();
  const {
    className,
    error,
    isLoading,
    data,
    readonly,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCountry,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
  } = props;
  const { first, lastname, age, country, city, avatar } = data || {};

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
        value={first ?? ''}
        placeholder={t('Your Name')}
        className={cls.input}
      />
      <Input
        onChange={onChangeLastName}
        readonly={readonly}
        value={lastname ?? ''}
        placeholder={t('Your Last Name')}
        className={cls.input}
      />
      <Input
        onChange={onChangeAge}
        readonly={readonly}
        value={age ?? ''}
        placeholder={t('Your Age')}
        className={cls.input}
      />
      <Input
        onChange={onChangeCountry}
        readonly={readonly}
        value={country ?? ''}
        placeholder={t('Your Country')}
        className={cls.input}
      />
      <Input
        onChange={onChangeCity}
        readonly={readonly}
        value={city ?? ''}
        placeholder={t('Your City')}
        className={cls.input}
      />
      <Input
        onChange={onChangeAvatar}
        readonly={readonly}
        value={avatar ?? ''}
        placeholder={t('your Avatar')}
        className={cls.input}
      />
      <Input
        onChange={onChangeUsername}
        readonly={readonly}
        value={avatar ?? ''}
        placeholder={t('Your Username')}
        className={cls.input}
      />
    </div>
  );
};
