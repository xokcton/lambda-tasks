const { advanceBy, advanceTo } = require('jest-date-mock')
const { costCalculation, deadlineCalculation } = require('./correctarium.js')

// testing price
test('expecting price with 20 percent on top to be equal 60.24', () => {
  expect(costCalculation('test.txt', 'ru', 1004)).toBe(60.24)
})

test('expecting price to be equal 50', () => {
  expect(costCalculation('test.rtf', 'ua', 1000)).toBe(50)
})

test('expecting price with 20 percent on top to be equal 177.70', () => {
  expect(costCalculation('test.none', 'eng', 1234)).toBe(177.70)
})

test('expecting price to be equal 6518.52', () => {
  expect(costCalculation('test.rtf', 'eng', 54321)).toBe(6518.52)
})

// testing deadline
test('testing first deadline', () => {
  advanceTo(new Date(2021, 11, 7, 0, 0, 0, 0));
  const now = Date.now();
  const secs = deadlineCalculation('test.txt', 'ru', 50000).date.getSeconds()
  advanceBy(secs);
  expect(+new Date() - now).toBe(secs);
});

test('testing second deadline', () => {
  advanceTo(new Date(2021, 11, 8, 7, 0, 0, 0));
  const now = Date.now();
  const secs = deadlineCalculation('test.txt', 'ru', 20000).date.getSeconds()
  advanceBy(secs);
  expect(+new Date() - now).toBe(secs);
});

test('testing third deadline', () => {
  advanceTo(new Date(2021, 11, 12, 10, 45, 0, 0));
  const now = Date.now();
  const secs = deadlineCalculation('test.txt', 'ru', 25000).date.getSeconds()
  advanceBy(secs);
  expect(+new Date() - now).toBe(secs);
});