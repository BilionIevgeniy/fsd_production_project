export function classNames(
  cls: string,
  mods: Record<string, boolean | string> = {},
  addition: Array<string | undefined> = [],
) {
  return [
    cls,
    ...addition,
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}
