import validateTime from 'src/utils/validateTime'
describe('Validate Time', () => {
  it('should correctly validate time', () => {
    let hours = '10:'

    const allowableMinutes = ['0', '3']
    for (const value of allowableMinutes) {
      expect(validateTime(hours + value)).toEqual(hours + value + '0')
    }

    const invalidMinutes = ['1', '2', '4', '5', '6', '7', '8', '9']
    for (const value of invalidMinutes) {
      expect(validateTime(hours + value)).toEqual(hours)
    }
  })
})
