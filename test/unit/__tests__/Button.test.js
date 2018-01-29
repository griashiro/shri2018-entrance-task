import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button from '../../../src/components/Button'
import Arrow from '../../../src/components/Arrow'

Enzyme.configure({ adapter: new Adapter() })

describe('<Button />', () => {
  it('should pass "type", "text" and "onClick" props correctly', () => {
    const type = 'rect'
    const text = 'Нажми меня'
    const callback = () => 42
    const wrapper = shallow(
      <Button type={type} text={text} onClick={callback} />
    )
    expect(wrapper.containsMatchingElement(
      <button>{text}</button>
    )).toEqual(true)
    expect(wrapper.prop('onClick')).toEqual(callback)
  })
  it('should pass "type" and "icon" props correctly', () => {
    const type = 'round'
    const arrow = 'arrow'
    const wrapper = shallow(
      <Button type={type} icon={arrow} />
    )
    expect(wrapper.containsMatchingElement(
      <Arrow />
    )).toEqual(true)
  })
  it('should contains passed classes', () => {
    const buttonClass = 'button'
    const type = 'rect'
    const typeClass = buttonClass + '_' + type
    const emphasisClass = buttonClass + '_emphasis'
    const rotatedClass = buttonClass + '_rotated'
    const wrapper = shallow(
      <Button type={type} isEmphasis isRotated />
    )
    expect(wrapper.hasClass(buttonClass)).toEqual(true)
    expect(wrapper.hasClass(typeClass)).toEqual(true)
    expect(wrapper.hasClass(emphasisClass)).toEqual(true)
    expect(wrapper.hasClass(rotatedClass)).toEqual(true)
  })
})
