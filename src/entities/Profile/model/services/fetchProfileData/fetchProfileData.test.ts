import { Country, Currency } from 'shared/const/common';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Profile } from '../../types/profile';
import { fetchProfileData } from './fetchProfileData';

jest.mock('axios');

const profile: Profile = {
  first: 'Ievgen',
  lastname: 'Bilion',
  age: 22,
  currency: Currency.EUR,
  country: Country.Ukraine,
  city: 'Bonn',
  username: 'admin',
  avatar: '',
};

describe('fetchProfileData.test', () => {
  test('success fetch', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockResolvedValue({ data: profile });

    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalledWith('/profile');
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(profile);
  });

  test('error on network failure', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockRejectedValue(new Error('Network Error'));

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
    consoleError.mockRestore();
  });
});
