import isDatesEqual from './isDatesEqual'

export default function arrangeEventsByDateAndFloor (events) {
  const arrangedEvents = {}

  for (const event of events) {
    const date = getDate(event.dateStart)
    if (!arrangedEvents[date]) {
      arrangedEvents[date] = {}
    }

    const roomId = event.room.id
    if (!arrangedEvents[date][roomId]) {
      arrangedEvents[date][roomId] = {}
    }

    const times = getTimeIntervals(new Date(event.dateStart), new Date(event.dateEnd))
    for (const elem of times) {
      arrangedEvents[date][roomId][elem] = event.id
    }
  }

  return arrangedEvents

  function getDate (date) {
    const tmp = new Date(date)
    tmp.setHours(0, 0, 0, 0)
    return tmp.toString()
  }

  function getTimeIntervals (dateStart, dateEnd) {
    if (!isDatesEqual(dateStart, dateEnd - 1)) {
      console.log(dateStart.toString(), dateEnd.toString())
      throw Error('Встреча должна начинаться и заканчиваться один и тот же день')
    }
    if (dateStart > dateEnd) {
      console.log(dateStart.toString(), dateEnd.toString())
      throw Error('Встреча должна начинаться раньше, чем заканчиваться')
    }
    if (dateStart.getMinutes() % 30 !== 0 || dateEnd.getMinutes() % 30 !== 0) {
      throw Error('Время начала встречи должно быть кратным 30-ти минутам')
    }

    const startDate = new Date(dateStart)
    const endDate = new Date(dateEnd)

    startDate.setHours(startDate.getHours(), startDate.getMinutes(), 0, 0)
    endDate.setHours(endDate.getHours(), endDate.getMinutes(), 0, 0)

    const intervals = []

    do {
      intervals.push(startDate.toString())
      startDate.setMinutes(startDate.getMinutes() + 30)
      // eslint-disable-next-line no-unmodified-loop-condition
    } while (startDate < endDate)

    return intervals
  }
}
