import { screen } from '@testing-library/react';
import { renderWithStore } from 'shared/lib/tests/renderWithStore/renderWithStore';
import { User } from './User';

describe('User', () => {
  test('test render', () => {
    renderWithStore(<User />, {
      initialState: { counter: { value: 10 } },
    });
    expect(screen.getByTestId('value-title')).toBeVisible();
  });
});
