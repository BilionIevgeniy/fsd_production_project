import { classNames } from 'shared/lib/classNames';
import { ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
  const { className = '', value, onChange, type = 'text', placeholder, autofocus, ...otherProps } = props;
  const ref = useRef<HTMLInputElement>(null);
  const measureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  const getTextWidth = (text: string) => {
    if (!ref.current) return 0;
    if (!measureCanvasRef.current) {
      measureCanvasRef.current = document.createElement('canvas');
    }
    const context = measureCanvasRef.current.getContext('2d');
    if (!context) return 0;
    context.font = getComputedStyle(ref.current).font;
    return context.measureText(text).width;
  };

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  useEffect(() => {
    setCaretPosition(getTextWidth(value ?? ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    const width = getTextWidth(e.target.value.slice(0, e.target.selectionStart ?? e.target.value.length));
    setCaretPosition(width);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const width = getTextWidth(e.target.value.slice(0, e.target.selectionStart ?? 0));
    setCaretPosition(width);
  };

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {placeholder && <div className={cls.placeholder}>{`${placeholder}>`}</div>}
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          {...otherProps}
        />
        {isFocused && <span className={cls.caret} style={{ left: `${caretPosition}px` }} />}
      </div>
    </div>
  );
});
