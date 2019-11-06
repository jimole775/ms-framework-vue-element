function toTitle(val) {
  switch (val) {
    case 1:
      return '系统发货免费，报关收费'
    case 2:
      return '低报'
    case 3:
      return '配件系统分配差异'
    case 4:
      return '高报：涨价，认证费'
    case 5:
      return '散件订单'
    case 6:
      return '手工添加行：外购件，研发样机，研发物料'
    case 7:
      return '短装；多装'
    case 8:
      return '币种差异'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '系统发货免费，报关收费':
      return 1
    case '低报':
      return 2
    case '配件系统分配差异':
      return 3
    case '高报：涨价，认证费':
      return 4
    case '散件订单':
      return 5
    case '手工添加行：外购件，研发样机，研发物料':
      return 6
    case '短装；多装':
      return 7
    case '币种差异':
      return 8
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
