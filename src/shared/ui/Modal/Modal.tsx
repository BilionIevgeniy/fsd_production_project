import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  // When true (default), the content isn't mounted until the modal is opened
  // for the first time. Pass false to mount it upfront (kept hidden by CSS).
  lazy?: boolean;
}

// Kept in sync with the transition duration in Modal.module.scss.
const ANIMATION_DELAY = 300;

export const Modal = ({ className = '', children, isOpen = false, onClose, lazy = false }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Once opened, stays mounted (just visually hidden) so a later close can
  // still play its closing animation instead of being unmounted instantly.
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    if (!onClose) return;

    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, ANIMATION_DELAY);
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  // Safety net for the case where the whole Modal unmounts mid-animation
  // (e.g. the parent stops rendering it): don't fire a timeout callback
  // against an unmounted component.
  useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  if (lazy && !isMounted) {
    return null;
  }

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  // `.app` is where the theme's CSS custom properties (--bg-color, etc. — see
  // src/app/styles/themes/*.scss) are actually declared. Portal renders into
  // document.body by default, which would take this content outside `.app`'s
  // subtree and silently lose those variables — the same class of bug
  // ContentPageDecorator documents for Sidebar's height. Falling back to
  // document.body keeps a bare `render(<Modal isOpen />)` in tests working,
  // since it never mounts `.app` either.
  const portalElement = document.querySelector<HTMLElement>('.app') ?? document.body;

  return (
    <Portal element={portalElement}>
      <div className={classNames(cls.Modal, mods, [className])}>
        {/*
          Backdrop-click-to-close is a supplementary convenience, not the primary
          way to close the modal: keyboard users already have Escape (window
          listener above), and the backdrop itself carries no content a screen
          reader user would tab to. jsx-a11y's click-events-have-key-events /
          no-static-element-interactions assume a click handler implies a new
          interactive control, which isn't the case here.
        */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className={cls.overlay} onClick={closeHandler}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className={cls.content} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
