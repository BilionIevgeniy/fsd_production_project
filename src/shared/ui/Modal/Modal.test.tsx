import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    document.body.style.overflow = '';
  });

  test('renders children when open', () => {
    render(
      <Modal isOpen>
        <div>modal content</div>
      </Modal>,
    );
    expect(screen.getByText('modal content')).toBeInTheDocument();
  });

  test('does not mount its content when closed (lazy by default)', () => {
    render(
      <Modal isOpen={false}>
        <div>modal content</div>
      </Modal>,
    );
    expect(screen.queryByText('modal content')).not.toBeInTheDocument();
  });

  test('mounts (hidden) content when closed and lazy=false', () => {
    render(
      <Modal isOpen={false} lazy={false}>
        <div>modal content</div>
      </Modal>,
    );
    expect(screen.getByText('modal content')).toBeInTheDocument();
  });

  test('stays mounted after being closed once opened, instead of unmounting immediately', () => {
    const { rerender } = render(
      <Modal isOpen>
        <div>modal content</div>
      </Modal>,
    );
    rerender(
      <Modal isOpen={false}>
        <div>modal content</div>
      </Modal>,
    );
    expect(screen.getByText('modal content')).toBeInTheDocument();
  });

  test('calls onClose after the closing animation when the overlay is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <div>modal content</div>
      </Modal>,
    );

    fireEvent.click(document.querySelector('.overlay') as HTMLElement);
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when the content itself is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <div>modal content</div>
      </Modal>,
    );

    fireEvent.click(screen.getByText('modal content'));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  test('calls onClose on Escape', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <div>modal content</div>
      </Modal>,
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose on other keys', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <div>modal content</div>
      </Modal>,
    );

    fireEvent.keyDown(window, { key: 'Enter' });
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  test('does not listen for Escape once closed', () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <Modal isOpen onClose={onClose}>
        <div>modal content</div>
      </Modal>,
    );
    rerender(
      <Modal isOpen={false} onClose={onClose}>
        <div>modal content</div>
      </Modal>,
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  test('locks body scroll while open and unlocks once closed', () => {
    const { rerender } = render(
      <Modal isOpen>
        <div>modal content</div>
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal isOpen={false}>
        <div>modal content</div>
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('');
  });

  test('unlocks body scroll on unmount', () => {
    const { unmount } = render(
      <Modal isOpen>
        <div>modal content</div>
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
