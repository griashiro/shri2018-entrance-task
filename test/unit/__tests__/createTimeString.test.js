import createTimeString from 'src/utils/createTimeString'
describe('Create Time String', () => {
  it('should correctly create time string', () => {
    const date = new Date()
    date.setHours(8)
    date.setMinutes(30)
    expect(createTimeString(date)).toEqual('08:30')
    date.setHours(12)
    expect(createTimeString(date)).toEqual('12:30')
  })
})
