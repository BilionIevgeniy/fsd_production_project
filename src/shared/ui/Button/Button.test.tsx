import { render, screen, fireEvent } from '@testing-library/react';
import { Button, ButtonTheme } from './Button';

describe('Button', () => {
  test('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders as a button element', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('applies the default theme class', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass(ButtonTheme.CLEAR);
  });

  test('applies a custom className', () => {
    render(<Button className="customClass">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('customClass');
  });

  test('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Click me
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  test('forwards native button props', () => {
    render(
      <Button type="submit" data-testid="submit-btn">
        Submit
      </Button>,
    );
    expect(screen.getByTestId('submit-btn')).toHaveAttribute('type', 'submit');
  });
});
