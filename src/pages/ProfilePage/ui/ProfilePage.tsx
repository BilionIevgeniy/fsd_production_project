import { classNames } from 'shared/lib/classNames';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  fetchProfileData,
  getProfileForm,
  getProfileReadonly,
  getProfileError,
  getProfileIsLoading,
  ProfileCard,
  profileReducer,
  profileActions,
} from 'entities/Profile';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReducersList } from 'app/providers/StoreProvider/config/StateSchema';
import { useSelector } from 'react-redux';
import { updateProfileData } from 'entities/Profile/model/services/updateProfileData/updateProfileData';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className = '' }: ProfilePageProps) => {
  const dispatch = useAppDispatch();

  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  const editCard = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);

  const cancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const saveEdited = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  const onChangeFirstName = useCallback(
    (value = '') => {
      dispatch(profileActions.updateProfile({ first: value }));
    },
    [dispatch],
  );

  const onChangeLastName = useCallback(
    (value = '') => {
      dispatch(profileActions.updateProfile({ lastname: value }));
    },
    [dispatch],
  );

  const onChangeAge = useCallback(
    (value = '') => {
      // TODO: validate number
      dispatch(profileActions.updateProfile({ age: Number(value) }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    (value = '') => {
      dispatch(profileActions.updateProfile({ country: value }));
    },
    [dispatch],
  );

  const onChangeCity = useCallback(
    (value = '') => {
      dispatch(profileActions.updateProfile({ city: value }));
    },
    [dispatch],
  );

  const onChangeAvatar = useCallback(
    (value = '') => {
      dispatch(profileActions.updateProfile({ avatar: value }));
    },
    [dispatch],
  );

  const onChangeUsername = useCallback(
    (value = '') => {
      dispatch(profileActions.updateProfile({ username: value }));
    },
    [dispatch],
  );

  const onChangeCurrency = useCallback(
    (value = '') => {
      dispatch(profileActions.updateProfile({ currency: value }));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader
          editCard={editCard}
          cancelEdit={cancelEdit}
          saveEdited={saveEdited}
          readonly={readonly}
        />
        <ProfileCard
          onChangeAge={onChangeAge}
          onChangeCountry={onChangeCountry}
          onChangeCity={onChangeCity}
          onChangeAvatar={onChangeAvatar}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeUsername={onChangeUsername}
          onChangeCurrency={onChangeCurrency}
          readonly={readonly}
          data={formData}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
