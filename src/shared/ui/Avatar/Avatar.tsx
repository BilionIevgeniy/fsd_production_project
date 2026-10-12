import { classNames } from 'shared/lib/classNames';
import { CSSProperties } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  alt?: string;
  src?: string;
  size?: number;
}

export function Avatar({ className = '', alt, src, size = 100 }: AvatarProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
  };
  return (
    <img style={style} className={classNames(cls.Avatar, {}, [className])} alt={alt} src={src} />
  );
}
