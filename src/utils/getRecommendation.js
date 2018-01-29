import isDatesEqual from './isDatesEqual'
import sortRoomsByFloorAndName from './sortRoomsByFloorAndName'

export default function (dataDB, users, dateStart, dateEnd) {
  const requiredCapacity = users.length

  let suitableRooms = dataDB.rooms.filter((room) => {
    return room.capacity >= requiredCapacity
  })

  if (suitableRooms.length === 0) {
    return []
  }

  const isDateHasEvents = Object.keys(dataDB.arrengedEvents).some((eventDate) => {
    return isDatesEqual(dateStart, eventDate)
  })

  if (isDateHasEvents) {
    const tmp = new Date(dateStart)
    tmp.setHours(0, 0, 0, 0)
    const roomsWithEvents = dataDB.arrengedEvents[tmp.toString()]
    suitableRooms = suitableRooms.filter((room) => {
      const meetingRoom = roomsWithEvents[room.id]
      if (meetingRoom) {
        return !Object.keys(meetingRoom).some((date) => {
          const existingEvent = new Date(date)
          const startTime = new Date(dateStart)
          const endTime = new Date(dateEnd)
          return !((startTime < existingEvent && endTime <= existingEvent) || (startTime > existingEvent && endTime > existingEvent))
        })
      }

      return true
    })
  }

  suitableRooms = sortRoomsByFloorAndName(suitableRooms)
  const maxFloor = suitableRooms.length - 1

  if (maxFloor < 0) {
    return []
  }

  console.log('Подходящие переговорки', suitableRooms, maxFloor)

  let distributionUsersByFloors = Array(maxFloor).fill(0)
  users.map((user) => {
    ++distributionUsersByFloors[dataDB.usersById[user.id].homeFloor - 1]
  })

  console.log('Распределение по этажам', distributionUsersByFloors)

  distributionUsersByFloors = distributionUsersByFloors.filter(value => value || value === 0)

  console.log('Распределение по этажам', distributionUsersByFloors)

  const countFloors = (userByFloors) => {
    let steps = 0
    let num = 0
    return userByFloors.map((value) => {
      const result = steps
      num += value
      steps += num
      return result
    })
  }

  const floorsUp = countFloors(distributionUsersByFloors)
  const floorsDown = countFloors([...distributionUsersByFloors].reverse()).reverse()

  const sumOfArrays = (arr1, arr2) => {
    return arr1.map((value, index) => {
      return value + arr2[index]
    })
  }

  let result = sumOfArrays(floorsUp, floorsDown)

  const recommendations = []

  do {
    const min = Math.min(...result)
    if (min === Infinity || isNaN(min)) {
      break
    }

    const bestMatchFloor = result.indexOf(min) + 1
    const room = suitableRooms && suitableRooms[bestMatchFloor] && suitableRooms[bestMatchFloor].pop()

    if (room) {
      recommendations.push(room)
    } else {
      result[result.indexOf(min)] = Infinity
    }
  } while (recommendations.length < 3)

  return recommendations
}
