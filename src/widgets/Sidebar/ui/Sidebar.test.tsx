import { screen, fireEvent, waitFor } from '@testing-library/react';
import i18next from 'i18next';
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from './Sidebar';

// i18nForTests is a shared singleton, so reset the language after each test
// to avoid leaking state between tests in this file.
afterEach(() => {
  i18next.changeLanguage('en');
});

describe('Sidebar', () => {
  test('renders the toggle button', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByRole('button', { name: 'toggle' })).toBeInTheDocument();
  });

  test('renders the theme switcher and lang switcher', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  test('is not collapsed by default', () => {
    const { container } = renderWithTranslation(<Sidebar />);
    expect(container.firstChild).not.toHaveClass('collapsed');
  });

  test('collapses when the toggle button is clicked', () => {
    const { container } = renderWithTranslation(<Sidebar />);
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(container.firstChild).toHaveClass('collapsed');
  });

  test('expands again on a second click', () => {
    const { container } = renderWithTranslation(<Sidebar />);
    const toggleButton = screen.getByRole('button', { name: 'toggle' });
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);
    expect(container.firstChild).not.toHaveClass('collapsed');
  });

  test('applies a custom className', () => {
    const { container } = renderWithTranslation(<Sidebar className="customClass" />);
    expect(container.firstChild).toHaveClass('customClass');
  });

  test('changes language when a new option is selected', async () => {
    renderWithTranslation(<Sidebar />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'ru' } });
    await waitFor(() => expect(select).toHaveValue('ru'));
  });
});
