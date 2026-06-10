import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher: React.FC<LangSwitcherProps> = ({
  className = '',
}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={classNames(cls.LangSwitcher, {}, [className])}>
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="en">EN</option>
        <option value="ru">RU</option>
        <option value="de">DE</option>
      </select>
    </div>
  );
};
