import { screen, fireEvent, waitFor } from '@testing-library/react';
import i18next from 'i18next';
import { renderWithRouterAndTranslation } from 'shared/lib/tests/renderWithRouterAndTranslation/renderWithRouterAndTranslation';
import { Sidebar } from './Sidebar';

// i18nForTests is a shared singleton, so reset the language after each test
// to avoid leaking state between tests in this file.
afterEach(() => {
  i18next.changeLanguage('en');
});

// Sidebar renders AppLink (react-router-dom's Link) and uses translated labels,
// so it needs both a Router and i18n in the tree.
function renderSidebar(props?: { className?: string }) {
  return renderWithRouterAndTranslation(<Sidebar {...props} />);
}

describe('Sidebar', () => {
  test('renders the toggle button', () => {
    renderSidebar();
    expect(screen.getByTestId('sidebar-toggle')).toBeInTheDocument();
  });

  test('renders the theme switcher and lang switcher', () => {
    renderSidebar();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  test('is not collapsed by default', () => {
    const { container } = renderSidebar();
    expect(container.firstChild).not.toHaveClass('collapsed');
  });

  test('collapses when the toggle button is clicked', () => {
    const { container } = renderSidebar();
    fireEvent.click(screen.getByTestId('sidebar-toggle'));
    expect(container.firstChild).toHaveClass('collapsed');
  });

  test('expands again on a second click', () => {
    const { container } = renderSidebar();
    const toggleButton = screen.getByTestId('sidebar-toggle');
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);
    expect(container.firstChild).not.toHaveClass('collapsed');
  });

  test('applies a custom className', () => {
    const { container } = renderSidebar({ className: 'customClass' });
    expect(container.firstChild).toHaveClass('customClass');
  });

  test('changes language when a new option is selected', async () => {
    renderSidebar();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'ru' } });
    await waitFor(() => expect(select).toHaveValue('ru'));
  });
});
