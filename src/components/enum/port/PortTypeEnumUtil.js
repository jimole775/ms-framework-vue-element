
function toTitle(val) {
  switch (val) {
    case 2:
      return '入货港'
    case 1:
      return '出货港'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '入货港':
      return 2
    case '出货港':
      return 1
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
