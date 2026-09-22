import { classNames } from 'shared/lib/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_INVERTED = 'outlineInverted',
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
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  onClick,
  square = false,
  disabled = false,
  theme = ButtonTheme.CLEAR,
  size = ButtonSize.M,
  ...props
}) => {
  const mods: Record<string, boolean> = {
    [cls.square]: square,
    [cls.disabled]: disabled,
  };

  return (
    <button
      onClick={onClick}
      className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
