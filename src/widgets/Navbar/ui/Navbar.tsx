import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, Modal } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = '' }: NavbarProps) {
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.navbarLinks}>
        <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={openAuthModal}>
          {t('Login')}
        </Button>
      </div>
      <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
        {t('Login form')}
      </Modal>
    </div>
  );
}
