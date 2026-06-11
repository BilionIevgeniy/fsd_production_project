import { useTranslation } from 'react-i18next';

export function Loader() {
  const { t } = useTranslation();
  return <div className="app-loading">{t('loading')}</div>;
}
