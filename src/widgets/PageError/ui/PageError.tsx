import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import cls from './PageError.module.scss';

interface PageErrorProps {
  className?: string;
}

export const PageError: React.FC<PageErrorProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      {t('Something went wrong')}
      <button onClick={() => window.location.reload()}>{t('Reload')}</button>
    </div>
  );
};
