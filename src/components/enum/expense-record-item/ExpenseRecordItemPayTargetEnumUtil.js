
function toTitle(val) {
  switch (val) {
    case 'AGREEMENT':
      return '协议货代'
    case 'APPOINT':
      return '指定货代'
    case 'CAR_TEAM':
      return '车队'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '协议货代':
      return 'AGREEMENT'
    case '指定货代':
      return 'APPOINT'
    case '车队':
      return 'CAR_TEAM'
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
