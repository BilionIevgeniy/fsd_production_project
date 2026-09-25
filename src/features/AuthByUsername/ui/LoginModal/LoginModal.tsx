import { classNames } from 'shared/lib/classNames';
import { Loader, Modal } from 'shared/ui';
import { Suspense } from 'react';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import cls from './LoginModal.module.scss';

interface LoginModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function LoginModal({ className = '', isOpen, onClose }: LoginModalProps) {
  return (
    <Modal
      lazy
      isOpen={isOpen}
      onClose={onClose}
      className={classNames(cls.LoginModal, {}, [className])}
    >
      {isOpen && (
        <Suspense fallback={<Loader />}>
          <LoginFormAsync />
        </Suspense>
      )}
    </Modal>
  );
}
