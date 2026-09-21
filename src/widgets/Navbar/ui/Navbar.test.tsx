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

  test('the auth modal is not open before the Login button is clicked', () => {
    renderWithTranslation(<Navbar />);
    expect(document.querySelector('.opened')).not.toBeInTheDocument();
  });
});
