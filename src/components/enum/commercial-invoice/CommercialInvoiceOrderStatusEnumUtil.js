
function toTitle(val) {
  // @EcpTitle("状态1制单 2提交 3启动 4驳回 5审核…10红冲…99关闭")
  switch (val) {
    case 1:
      return '未处理'
    case 2:
      return '处理中'
    case 3:
      return '已完成'
    case 4:
      return '处理失败'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '未处理':
      return 1
    case '处理中':
      return 2
    case '已完成':
      return 3
    case '处理失败':
      return 4
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
