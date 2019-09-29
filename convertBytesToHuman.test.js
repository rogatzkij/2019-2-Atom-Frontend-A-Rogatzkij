/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== 1,
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === 5
 */

 import convertBytesToHuman from './convertBytesToHuman.js'

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
  expect(convertBytesToHuman('string')).toBe(false)
  expect(convertBytesToHuman([5])).toBe(false)
  expect(convertBytesToHuman(5.5)).toBe(false)
  expect(convertBytesToHuman(256)).toBe(false)
})

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(5)).toBe(5)
  expect(convertBytesToHuman(0)).toBe(0)
  expect(convertBytesToHuman(255)).toBe(255)
})

// другая группа проверок
test('Другая группа проверок', () => {
  expect(convertBytesToHuman()).toBe(false)
})
