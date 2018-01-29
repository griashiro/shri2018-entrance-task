import declOfNum from 'src/utils/declOfNum'
describe('Decline of Number', () => {
  const titles = ['пользователь', 'пользователя', 'пользователей']
  it('should equal nominative', () => {
    expect(declOfNum(1, titles)).toEqual(titles[0])
  })
  it('should equal genetive', () => {
    expect(declOfNum(4, titles)).toEqual(titles[1])
  })
  it('should equal genetive plural', () => {
    expect(declOfNum(12, titles)).toEqual(titles[2])
  })
})
