export function classNames(
  cls: string,
  mods: Record<string, boolean | string> = {},
  addition: string[] = [],
) {
  return [
    cls,
    ...addition,
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}
