import { render } from '@testing-library/react';
import { Portal } from './Portal';

describe('Portal', () => {
  test('renders children into document.body by default', () => {
    render(
      <Portal>
        <div data-testid="portal-content">content</div>
      </Portal>,
    );

    expect(document.body.querySelector('[data-testid="portal-content"]')).toBeInTheDocument();
  });

  test('renders children into a custom element', () => {
    const customRoot = document.createElement('div');
    document.body.appendChild(customRoot);

    render(
      <Portal element={customRoot}>
        <span data-testid="portal-content">content</span>
      </Portal>,
    );

    expect(customRoot.querySelector('[data-testid="portal-content"]')).toBeInTheDocument();

    document.body.removeChild(customRoot);
  });

  test('removes its content from the DOM on unmount', () => {
    const { unmount } = render(
      <Portal>
        <div data-testid="portal-content">content</div>
      </Portal>,
    );
    expect(document.body.querySelector('[data-testid="portal-content"]')).toBeInTheDocument();

    unmount();

    expect(document.body.querySelector('[data-testid="portal-content"]')).not.toBeInTheDocument();
  });
});
