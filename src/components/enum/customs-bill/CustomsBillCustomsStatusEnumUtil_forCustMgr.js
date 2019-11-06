
function toTitle(val) {
  switch (val) {
    case '-1':
      return '未报关'
    case '00':
      return '暂存'
    case '01':
      return '发送成功'
    case '02':
      return '发送失败'
    case '03':
      return '申报'
    case '04':
      return '放行前删单'
    case '05':
      return '申报失败/退单'
    case '06':
      return '改单'
    case '07':
      return '放行'
    case '08':
      return '查验'
    case '09':
      return '货主关闭'
    case '10':
      return '放行后删单'
    case '11':
      return '海关退单/不受理'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '未报关':
      return '-1'
    case '暂存':
      return '00'
    case '发送成功':
      return '01'
    case '发送失败':
      return '02'
    case '申报':
      return '03'
    case '放行前删单':
      return '04'
    case '申报失败/退单':
      return '05'
    case '改单':
      return '06'
    case '放行':
      return '07'
    case '查验':
      return '08'
    case '货主关闭':
      return '09'
    case '放行后删单':
      return '10'
    case '海关退单/不受理':
      return '11'
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
