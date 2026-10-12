import { classNames } from 'shared/lib/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui';
import { Avatar } from 'shared/ui/Avatar';
import { CurrencySelect } from 'entities/Currency';
import { CountrySelect } from 'entities/Country';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
  className?: string;
  error?: string;
  isLoading?: boolean;
  data?: Profile;
  readonly?: boolean;
  onChangeFirstName?: () => void;
  onChangeLastName?: () => void;
  onChangeAge?: () => void;
  onChangeCountry?: () => void;
  onChangeCity?: () => void;
  onChangeAvatar?: () => void;
  onChangeUsername?: () => void;
  onChangeCurrency?: () => void;
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
    onChangeCurrency,
  } = props;
  const { first, lastname, age, country, city, avatar, username, currency } = data || {};
  const mods = {
    [cls.editing]: !readonly,
  };

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
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.avatarWrapper}>{avatar && <Avatar src={avatar} alt={t('avatar')} />}</div>
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
        placeholder={t('Add Avatar URL')}
        className={cls.input}
      />
      <Input
        onChange={onChangeUsername}
        readonly={readonly}
        value={username ?? ''}
        placeholder={t('Your Username')}
        className={cls.input}
      />
      <CurrencySelect
        className={cls.input}
        onChange={onChangeCurrency}
        value={currency}
        readonly={readonly}
      />
      <CountrySelect
        className={cls.input}
        onChange={onChangeCountry}
        value={country}
        readonly={readonly}
      />
    </div>
  );
};
