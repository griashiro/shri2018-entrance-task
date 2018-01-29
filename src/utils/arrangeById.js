export default function arrangeById (values) {
  const arranged = {}

  values.map((value) => {
    arranged[value.id] = value
  })

  return arranged
}
