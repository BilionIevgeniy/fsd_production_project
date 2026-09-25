import { loginReducer, loginActions } from './loginSlice';
import { LoginSchema } from '../types/loginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

describe('loginSlice.test', () => {
  test('setUsername', () => {
    const state: LoginSchema = { username: '', password: '', isLoading: false };
    expect(loginReducer(state, loginActions.setUsername('admin'))).toEqual({
      username: 'admin',
      password: '',
      isLoading: false,
    });
  });

  test('setPassword', () => {
    const state: LoginSchema = { username: '', password: '', isLoading: false };
    expect(loginReducer(state, loginActions.setPassword('123'))).toEqual({
      username: '',
      password: '123',
      isLoading: false,
    });
  });

  test('loginByUsername.pending resets error and sets isLoading', () => {
    const state: LoginSchema = {
      username: '',
      password: '',
      isLoading: false,
      error: 'some error',
    };
    expect(loginReducer(state, loginByUsername.pending('', { username: '', password: '' }))).toEqual({
      username: '',
      password: '',
      isLoading: true,
      error: undefined,
    });
  });

  test('loginByUsername.fulfilled sets isLoading to false', () => {
    const state: LoginSchema = { username: '', password: '', isLoading: true };
    expect(
      loginReducer(
        state,
        loginByUsername.fulfilled(
          { id: '1', username: 'admin' },
          '',
          { username: '', password: '' },
        ),
      ),
    ).toEqual({ username: '', password: '', isLoading: false });
  });

  test('loginByUsername.rejected sets error and isLoading to false', () => {
    const state: LoginSchema = { username: '', password: '', isLoading: true };
    expect(
      loginReducer(
        state,
        loginByUsername.rejected(
          null,
          '',
          { username: '', password: '' },
          'error text',
        ),
      ),
    ).toEqual({ username: '', password: '', isLoading: false, error: 'error text' });
  });
});
