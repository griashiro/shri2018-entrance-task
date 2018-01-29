import createDateString from 'src/utils/createDateString'
describe('Create Date String', () => {
  it('should correctly create date string', () => {
    const date = new Date()
    date.setFullYear(2018, 1, 23)
    expect(createDateString(date)).toEqual('23 февраля')
    date.setFullYear(2018, 2, 8)
    expect(createDateString(date, true)).toEqual('8 марта, 2018')
  })
})
