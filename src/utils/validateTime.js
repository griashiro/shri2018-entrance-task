export default function validateTime (value, isDateEnd) {
  value = value.replace(/[^\d:]/, '')

  if (value.length === 1 && /[89]/.test(value)) {
    value = '0' + value
  }

  if (value.length === 1 && /[^012]/.test(value)) {
    value = ''
  }

  if (isDateEnd) {
    if (value.length === 2 && (value === '00')) {
      value += ':00'
    }
  }

  if (value.length === 2 && (value[0] === '0' && /[^89]/.test(value[1]))) {
    value = value[0]
  }

  if (value.length === 2 && (value[0] === '2' && /[^0123]/.test(value[1]))) {
    value = value[0]
  }

  if (value.length === 2) {
    value += ':'
  }

  if (isDateEnd) {
    if (value.length === 4 && value[1] === '8' && value[0] !== '1' && /[^3]/.test(value[3])) {
      value = value.slice(0, 3)
    }
  }

  if (value.length === 4 && /[^03]/.test(value[3])) {
    value = value.slice(0, 3)
  }

  if (value.length === 4) {
    value += '0'
  }

  return value
}
