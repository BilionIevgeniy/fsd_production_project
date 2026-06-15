import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.NotFoundPage, {}, [className])}>
      <div>{t('error_404_title')}</div>
      <p>{t('error_404_description')}</p>
    </div>
  );
};
