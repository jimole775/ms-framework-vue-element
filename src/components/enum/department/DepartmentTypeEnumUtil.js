
function toTitle(val) {
  switch (val) {
    case 'ALL':
      return '全部'
    case 'BUSINESS':
      return '业务部门'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '全部':
      return 'ALL'
    case '业务部门':
      return 'BUSINESS'
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
