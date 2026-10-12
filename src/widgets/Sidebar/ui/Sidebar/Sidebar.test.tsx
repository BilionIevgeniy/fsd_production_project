import { fireEvent, screen } from '@testing-library/react';
import { componentRenderOptions, renderWithStore } from 'shared/lib/tests';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';

function renderSidebar(options?: componentRenderOptions) {
  return renderWithStore(<Sidebar />, options);
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

  test('hides authOnly items for unauthorized user', () => {
    renderSidebar();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  test('shows authOnly items for authorized user', () => {
    renderSidebar({ initialState: { user: { authData: { id: '1', username: 'admin' } } } });
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
