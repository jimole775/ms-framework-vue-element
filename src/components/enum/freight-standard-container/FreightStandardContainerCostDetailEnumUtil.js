
function toTitle(val) {
  switch (val) {
    case '0':
      return '燃油附加费'
    case '1':
      return '堆场条形码'
    case '2':
      return '指定货代包干费'
    case '3':
      return '操作费'
    case '4':
      return '箱体不平衡费'
    case '5':
      return '拖车费'
    case '6':
      return '码头操作费'
    case '7':
      return '低硫费'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '燃油附加费':
      return '0'
    case '堆场条形码':
      return '1'
    case '指定货代包干费':
      return '2'
    case '操作费':
      return '3'
    case '箱体不平衡费':
      return '4'
    case '拖车费':
      return '5'
    case '码头操作费':
      return '6'
    case '低硫费':
      return '7'
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
