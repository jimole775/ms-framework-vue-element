
function toTitle(val) {
  switch (val) {
    case '1':
      return '股份公司'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '股份公司':
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
