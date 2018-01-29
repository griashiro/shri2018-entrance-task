import { namesGanitive } from '../constants/monts'
export default function createDateString (date, isShowYear = false) {
  date = new Date(date)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return `${day} ${namesGanitive[month]}${isShowYear ? `, ${year}` : ''}`
}
