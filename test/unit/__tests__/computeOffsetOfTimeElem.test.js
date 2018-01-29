import computeOffsetOfTimeElem from 'src/utils/computeOffsetOfTimeElem'
describe('check computation offset time elem', () => {
  it('should compute correctly', () => {
    expect(computeOffsetOfTimeElem(0, 0, 1080)).toEqual(6)
    expect(computeOffsetOfTimeElem(6, 30, 1080)).toEqual(422)
    expect(computeOffsetOfTimeElem(10, 0, 1080)).toEqual(646)
    expect(computeOffsetOfTimeElem(12, 30, 1080)).toEqual(806)
  })
})
