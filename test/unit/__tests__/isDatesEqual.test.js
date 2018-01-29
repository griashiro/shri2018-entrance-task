import isDatesEqual from 'src/utils/isDatesEqual'
describe('Validate Date', () => {
  const date1 = '2018-01-29T07:27:58.923Z'
  const date2 = new Date(2018, 0, 29)
  const date3 = new Date(2018, 0, 28)
  it('should dates equal', () => {
    expect(isDatesEqual(date1, date2)).toEqual(true)
  })
  it('should dates not equal', () => {
    expect(isDatesEqual(date1, date3)).toEqual(false)
  })
})
