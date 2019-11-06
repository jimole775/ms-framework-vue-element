
function toTitle(val) {
  switch (val) {
    case 1:
      return 'CO'
    case 2:
      return 'FROM A(普惠制原产地证)'
    case 3:
      return 'FROM B(亚太证书)'
    case 4:
      return 'FROM E(东盟证书)'
    case 5:
      return 'FORM F(中智证书)'
    case 6:
      return 'FORM P(中巴证书)'
    case 7:
      return '海峡两岸证书'
    case 8:
      return '中秘证书'
    case 9:
      return '中韩证书'
    case 10:
      return '其他'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case 'CO':
      return 1
    case 'FROM A(普惠制原产地证)':
      return 2
    case 'FROM B(亚太证书)':
      return 3
    case 'FROM E(东盟证书)':
      return 4
    case 'FORM F(中智证书)':
      return 5
    case 'FORM P(中巴证书)':
      return 6
    case '海峡两岸证书':
      return 7
    case '中秘证书':
      return 8
    case '中韩证书':
      return 9
    case '其他':
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
