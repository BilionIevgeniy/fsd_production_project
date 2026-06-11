import { useTranslation } from 'react-i18next';

function AboutPage() {
  const { t } = useTranslation();
  return <div>{t('about_page')}</div>;
}

export default AboutPage;
