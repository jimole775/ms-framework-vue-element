
function toTitle(val) {
  switch (val) {
    case '姜山':
      return '姜山'
    // case '春晓':
    //   return '春晓'
    // case '北仑':
    //   return '北仑'
    case '茅山':
      return '茅山'
    // case '方桥':
    //   return '方桥'
    case '潘火': 
      return '潘火'
    case '小港':
      return '小港'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '姜山':
      return '姜山'
    // case '春晓':
    //   return '春晓'
    // case '北仑':
    //   return '北仑'
    case '茅山':
      return '茅山'
    // case '方桥':
    //   return '方桥'
    case '潘火': 
      return '潘火'
    case '小港':
      return '小港'
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
