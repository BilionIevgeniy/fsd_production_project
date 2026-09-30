import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndTranslation } from 'shared/lib/tests';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';

function renderSidebar(props?: { className?: string }) {
  return renderWithRouterAndTranslation(<Sidebar {...props} />);
}

describe('Sidebar', () => {
  test('with only first param', () => {
    renderSidebar();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('test toggle', () => {
    renderSidebar();
    const toggleBtn = screen.getByTestId('sidebar-toggle');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
