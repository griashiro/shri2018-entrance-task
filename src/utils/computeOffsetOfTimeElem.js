export default function computeOffsetOfTimeElem (hours, minutes, currentHoursLineWidth) {
  const minHoursLineWidth = 1100
  const leftAndRightMargin = 12
  const leftMargin = 6
  const numOfElems = 17
  const numOfMarginsBetweenBlocks = 15
  const halfWidthElem = 24

  if (currentHoursLineWidth < minHoursLineWidth) {
    const oneHourOffset = (minHoursLineWidth - leftAndRightMargin) / numOfElems
    const oneMinuteOffset = oneHourOffset / 60
    return leftMargin + oneHourOffset * hours + oneMinuteOffset * minutes
  } else {
    const oneHourOffset = (currentHoursLineWidth - leftAndRightMargin - (numOfElems - 1) * numOfMarginsBetweenBlocks) / numOfElems
    const oneMinuteOffset = (oneHourOffset + numOfMarginsBetweenBlocks) / 60
    return leftMargin + oneHourOffset / 2 - halfWidthElem + (oneHourOffset * hours) + (numOfMarginsBetweenBlocks * hours) + minutes * oneMinuteOffset
  }
}
