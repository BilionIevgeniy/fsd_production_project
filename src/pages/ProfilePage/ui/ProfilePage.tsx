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

  const toggleReadOnly = useCallback(() => {
    if (!readonly) {
      dispatch(profileActions.cancelEdit());
    } else {
      dispatch(profileActions.setReadOnly(false));
    }
  }, [dispatch, readonly]);

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

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader toggleReadOnly={toggleReadOnly} readonly={readonly} />
        <ProfileCard
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
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
