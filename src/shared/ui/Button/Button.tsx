import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  square?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  onClick,
  square = false,
  theme = ButtonTheme.CLEAR,
  size = ButtonSize.M,
  ...props
}) => {
  const mods: Record<string, boolean> = {
    [cls.square]: square,
  };

  return (
    <button onClick={onClick} className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])} {...props}>
      {children}
    </button>
  );
};
