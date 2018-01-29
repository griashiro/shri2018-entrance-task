import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Arrow from './Arrow'
import Pencil from './Pencil'
import Cross from './Cross'

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['rect', 'round']).isRequired,
    text: PropTypes.string,
    isEmphasis: PropTypes.bool,
    isRotated: PropTypes.bool,
    isMarginRight: PropTypes.bool,
    icon: PropTypes.oneOf(['arrow', 'pencil', 'cross', null]),
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  }

  _getClasses () {
    const { type, isEmphasis, isRotated, isMarginRight } = this.props
    return [
      'button',
      'button_' + type,
      (isEmphasis ? 'button_emphasis' : ''),
      (isRotated ? 'button_rotated' : ''),
      (isMarginRight ? 'button_right-margin' : '')
    ].join(' ')
  }

  _renderIcon () {
    switch (this.props.icon) {
      case 'arrow': {
        return <div className='button__arrow'>
          <Arrow />
        </div>
      }
      case 'pencil': {
        return <div className='button__pencil'>
          <Pencil />
        </div>
      }
      case 'cross': {
        return <div className='button__close-icon'>
          <Cross />
        </div>
      }
    }
  }

  render () {
    const { onClick, disabled } = this.props
    return (
      <button
        className={this._getClasses()}
        onClick={onClick}
        disabled={disabled}>
        {this.props.text || ''}
        {this._renderIcon()}
      </button>
    )
  }
}
