import validateDate from 'src/utils/validateDate'
describe('Validate Date', () => {
  it('should correctly validate date', () => {
    for (let i = 1; i < 10; ++i) {
      expect(validateDate(String(i))).toEqual(String(i))
    }
    for (let i = 1; i < 10; ++i) {
      expect(validateDate(String(i + '.'))).toEqual(String('0' + i + '.'))
    }
    for (let i = 10; i < 32; ++i) {
      expect(validateDate(String(i))).toEqual(String(i + '.'))
    }

    const badValues = ['-', 32, 'a', 'A', '#']
    for (const value of badValues) {
      expect(validateDate(String(value))).toEqual(String(''))
    }
  })
})
