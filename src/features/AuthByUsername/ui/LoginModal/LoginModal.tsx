import { classNames } from 'shared/lib/classNames';
import { Modal } from 'shared/ui';
import { LoginForm } from '../LoginForm/LoginForm';
import cls from './LoginModal.module.scss';

interface LoginModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function LoginModal({ className = '', isOpen, onClose }: LoginModalProps) {
  return (
    <Modal lazy isOpen={isOpen} onClose={onClose} className={classNames(cls.LoginModal, {}, [className])}>
      {isOpen && <LoginForm />}
    </Modal>
  );
}
