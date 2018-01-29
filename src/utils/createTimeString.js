export default function createTimeString (date) {
  date = new Date(date)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}
