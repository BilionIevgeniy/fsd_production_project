import { classNames } from 'shared/lib/classNames/classNames';

describe('classNames', () => {
  test('only base class', () => {
    expect(classNames('btn')).toBe('btn');
  });

  test('with additional classes', () => {
    expect(classNames('btn', {}, ['extra', 'more'])).toBe('btn extra more');
  });

  test('with truthy mods', () => {
    expect(classNames('btn', { active: true, disabled: false })).toBe('btn active');
  });

  test('with falsy mods excluded', () => {
    expect(classNames('btn', { active: false, disabled: false })).toBe('btn');
  });

  test('with mods and additional classes', () => {
    expect(classNames('btn', { active: true }, ['extra'])).toBe('btn extra active');
  });

  test('empty string mod value is excluded', () => {
    expect(classNames('btn', { active: '' as unknown as boolean })).toBe('btn');
  });

  test('non-empty string mod value is included', () => {
    expect(classNames('btn', { size: 'large' as unknown as boolean })).toBe('btn size');
  });

  test('empty additional classes array', () => {
    expect(classNames('btn', {}, [])).toBe('btn');
  });
});
