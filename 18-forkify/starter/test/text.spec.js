import { abs } from '../src/js/helper';

test('abs', () => {
  expect(abs(1)).toBe(1);
  expect(abs(0)).toBe(0);
  expect(abs(-1)).toBe(1);
  expect(() => abs('abc')).toThrow(TypeError); // 类型错误
});
