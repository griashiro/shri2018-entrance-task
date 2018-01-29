import React from 'react'
import PropTypes from 'prop-types'

import ErrorImage from './ErrorImage'

const Error = ({errors}) => (
  <div className='error'>
    <ErrorImage />
    <span className='error__tip'>
      Что-то пошло не так. Попробуйте проверить подключение к серверу, обновить страницу или обратиться к ресурсу позднее.
    </span>
    {console.error(errors)}
  </div>
)

Error.prototype.propTypes = {
  errors: PropTypes.object
}

export default Error
