import axios from 'axios';
import { userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername.test', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('success login', async () => {
    const userData = { id: '1', username: 'admin' };
    mockedAxios.post.mockResolvedValue({ data: userData });

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ username: 'admin', password: '123' });

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData));
    expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toEqual(JSON.stringify(userData));
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userData);
  });

  test('login error on empty response data', async () => {
    mockedAxios.post.mockResolvedValue({ data: undefined });

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ username: 'admin', password: '123' });

    expect(result.meta.requestStatus).toBe('rejected');
  });

  test('login error on network failure', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network Error'));

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ username: 'admin', password: '123' });

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
