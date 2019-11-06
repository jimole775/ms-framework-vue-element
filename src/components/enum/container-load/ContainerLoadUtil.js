
function toTitle(val) {
  switch (val) {
    case 1:
      return '20GP'
    case 2:
      return '40GP'
    case 3:
      return '40HQ'
    case 4:
      return '45HQ'
    case 5:
      return '40RH'
    case 6:
      return '拼箱'
    case 7:
      return '空运'  
    case 8:
      return '一卡一车'
    case 9:
      return '二卡一车'
    case 10:
      return '三卡一车'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '20GP':
      return 1
    case '40GP':
      return 2
    case '40HQ':
      return 3
    case '45HQ':
      return 4
    case '40RH':
      return 5
    case 6:
      return '拼箱'
    case 7:
      return '空运'  
    case 8:
      return '一卡一车'
    case 9:
      return '二卡一车'  
    case 10:
      return '三卡一车'
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
