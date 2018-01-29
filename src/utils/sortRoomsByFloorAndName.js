export default function sortRoomsByFloorAndName (rooms, isReverseFloorsOrder) {
  const sortedByFloor = []
  rooms.map((room) => {
    if (sortedByFloor[room.floor]) {
      sortedByFloor[room.floor].push(room)
    } else {
      sortedByFloor[room.floor] = [room]
    }
  })
  sortedByFloor.map((groupOfRooms) => {
    groupOfRooms.sort((a, b) => {
      return a.title > b.title
    })
  })
  return isReverseFloorsOrder ? sortedByFloor.reverse() : sortedByFloor
}
