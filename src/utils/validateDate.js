export default function validateDate (value) {
  value = value.replace(/[^\d.]/, '')

  if (value.length === 2 && value[1] === '.') {
    value = '0' + value[0]
  }
  if (value.length === 2 && (Number(value) > 31 || Number(value) < 1)) {
    value = ''
  }
  if (value.length === 2) {
    value += '.'
  }

  if (value.length === 5 && value[4] === '.') {
    value = value.slice(0, 3) + '0' + value[3]
  }
  if (value.length === 5 && (Number(value.slice(3, 5)) > 12 || Number(value.slice(3, 5)) < 1)) {
    value = value.slice(0, 3)
  }
  if (value.length === 5) {
    value += '.'
  }

  if (value.length === 8 && (Number(value.slice(6)) < 18)) {
    value = value.slice(0, 6)
  }

  return value
}
