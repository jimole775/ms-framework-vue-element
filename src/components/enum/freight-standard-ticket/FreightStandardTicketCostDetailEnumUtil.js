
function toTitle(val) {
  switch (val) {
    case '1':
      return '分单费'
    case '2':
      return '空运'
    case '3':
      return '大客户三星指定货代费用汇总'
    case '4':
      return '欧盟舱单费'
    case '5':
      return '报关费'
    case '6':
      return 'VGM'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '分单费':
      return '1'
    case '空运':
      return '2'
    case '大客户三星指定货代费用汇总':
      return '3'
    case '欧盟舱单费':
      return '4'
    case '报关费':
      return '5'
    case 'VGM':
      return '6'
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
