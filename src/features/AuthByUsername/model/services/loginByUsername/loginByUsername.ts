import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkApiConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import i18next from 'i18next';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkApiConfig<string>>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    const { dispatch, rejectWithValue, extra } = thunkAPI;
    const { api } = extra;
    try {
      const response = await api.post<User>(`/login`, authData);

      if (!response.data) {
        throw new Error();
      }
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (e) {
      console.error(e);
      return rejectWithValue(i18next.t('error_LoginByUsername'));
    }
  },
);
