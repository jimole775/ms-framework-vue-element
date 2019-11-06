
function toTitle(val) {
  switch (val) {
    case '1':
      return '美元'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '美元':
      return '1'
    default:
      return val
  }
}

function toTitleFilter(val) {
  return toTitle(val)
}

function toValueFilter(val) {
  return toValue(val)
}

export default {
  toTitle,
  toValue,
  toTitleFilter,
  toValueFilter
}
