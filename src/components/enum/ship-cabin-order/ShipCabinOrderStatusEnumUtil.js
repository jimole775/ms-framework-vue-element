
function toTitle(val) {
  switch (val) {
    case 1:
      return '订舱'
    case 2:
      return '有船期'
    case 3:
      return '已放舱'
    case 4:
      return '已排柜'
    case 5:
      return '已装柜'
    case 6:
      return '已提箱'
    case 7:
      return '订舱完成'
    case 8:
      return '作废'
    case 10:
      return '制单'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '订舱':
      return 1
    case '有船期':
      return 2
    case '已放舱':
      return 3
    case '已排柜':
      return 4
    case '已装柜':
      return 5
    case '已提箱':
      return 6
    case '订舱完成':
      return 7
    case '作废':
      return 8
    case '制单':
      return 10
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
