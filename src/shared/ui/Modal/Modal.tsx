import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

// Kept in sync with the transition duration in Modal.module.scss.
const ANIMATION_DELAY = 300;

export const Modal = ({ className = '', children, isOpen = false, onClose }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>();

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

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
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
