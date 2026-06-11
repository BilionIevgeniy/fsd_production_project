import { classNames } from 'shared/lib/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  onClick,
  theme = ThemeButton.CLEAR,
  ...props
}) => {
  return (
    <button onClick={onClick} className={classNames(cls.Button, {}, [className, cls[theme]])} {...props}>
      {children}
    </button>
  );
};
