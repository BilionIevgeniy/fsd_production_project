import { AsyncThunkAction } from '@reduxjs/toolkit';
import { DeepPartial, StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

// calls a createAsyncThunk action manually, without a real store, so its
// pending/fulfilled/rejected dispatches can be asserted directly
export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFunction<
    (action: AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>) => unknown
  >;

  getState: () => StateSchema;

  actionCreator: (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

  constructor(
    actionCreator: (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>,
    state?: DeepPartial<StateSchema>,
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn(() => state as StateSchema);
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, undefined);
    return result;
  }
}
