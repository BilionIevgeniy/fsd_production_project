import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  test('renders a Login button', () => {
    renderWithTranslation(<Navbar />);
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('the auth modal is not in the DOM before the Login button is clicked', () => {
    renderWithTranslation(<Navbar />);
    expect(screen.queryByText('Login form')).not.toBeInTheDocument();
  });

  test('clicking Login opens the auth modal', () => {
    renderWithTranslation(<Navbar />);

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Login form')).toBeInTheDocument();
  });

  test('closing the auth modal (overlay click) removes it from view', () => {
    jest.useFakeTimers();
    renderWithTranslation(<Navbar />);

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Login form')).toBeInTheDocument();

    fireEvent.click(document.querySelector('.overlay') as HTMLElement);
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(document.querySelector('.opened')).not.toBeInTheDocument();

    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });
});
