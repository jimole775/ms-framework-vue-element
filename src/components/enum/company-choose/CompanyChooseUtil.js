
function toTitle(val) {
  switch (val) {
    case 1:
      return '制单'
    case 2:
      return '提交'
    case 3:
      return '启动'
    case 4:
      return '驳回'
    case 5:
      return '已审核'
    case 10:
      return '红冲'
    case 99:
      return '关闭'  
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '制单':
      return 1
    case '提交':
      return 2
    case '启动':
      return 3
    case '驳回':
      return 4
    case '已审核':
      return 5
    case '红冲':
      return 10
    case '关闭':
      return 99  
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
