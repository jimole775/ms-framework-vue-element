
function toTitle(val) {
  switch (val) {
    case 'WAIT_AUDIT':
      return '待审核'
    case 'APPROVED':
      return '已审核'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '待审核':
      return 'WAIT_AUDIT'
    case '已审核':
      return 'APPROVED'
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
