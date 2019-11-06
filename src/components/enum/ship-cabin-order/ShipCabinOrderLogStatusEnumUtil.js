
function toTitle(val) {
  switch (val) {
    case 1:
      return '订舱'
    case 2:
      return '船期'
    case 3:
      return '放舱'
    case 4:
      return '排柜'
    case 5:
      return '装柜'
    case 6:
      return '进港'
    case 7:
      return '截单'
    case 8:
      return '预配'
    case 9:
      return '报关'
    case 10:
      return '查验'
    case 11:
      return '海关放行'
    case 12:
      return '码头放行'
    case 13:
      return '开船'
    case 14:
      return '指代费用已付'
    case 15:
      return '费用确认'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '订舱':
      return 1
    case '船期':
      return 2
    case '放舱':
      return 3
    case '排柜':
      return 4
    case '装柜':
      return 5
    case '进港':
      return 6
    case '截单':
      return 7
    case '预配':
      return 8
    case '报关':
      return 9
    case '查验':
      return 10
    case '海关放行':
      return 11
    case '码头放行':
      return 12
    case '开船':
      return 13
    case '指代费用已付':
      return 14
    case '费用确认':
      return 15
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
