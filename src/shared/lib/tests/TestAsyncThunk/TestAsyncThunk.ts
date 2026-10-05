import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';
import { DeepPartial, StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

// calls a createAsyncThunk action manually, without a real store, so its
// pending/fulfilled/rejected dispatches can be asserted directly
export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFunction<
    (action: AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>) => unknown
  >;

  getState: () => StateSchema;

  api: jest.MockedFunctionDeep<AxiosStatic>;

  actionCreator: (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

  constructor(
    actionCreator: (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>,
    state?: DeepPartial<StateSchema>,
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.api = jest.mocked(axios, true);
    this.getState = jest.fn(() => state as StateSchema);
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, { api: this.api });
    return result;
  }
}
