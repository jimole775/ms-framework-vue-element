
function toTitle(val) {
  switch (val) {
    case 1:
      return 'AT SIGHT'
    case 2:
      return 'AFTER/FROM BILL OF LADING DATE(SHIPMENT DATE)'
    case 3:
      return 'AFTER/FROM DATE OF RECEIVING DOC'
    case 4:
      return 'AFTER/FROM DATE OF PRESENTATION'
    case 5:
      return 'FROM NEGOTIATION'
    case 6:
      return 'AFTER SIGHT'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case 'AT SIGHT':
      return 1
    case 'AFTER/FROM BILL OF LADING DATE(SHIPMENT DATE)':
      return 2
    case 'AFTER/FROM DATE OF RECEIVING DOC':
      return 3
    case 'AFTER/FROM DATE OF PRESENTATION':
      return 4
    case 'FROM NEGOTIATION':
      return 5
    case 'AFTER SIGHT':
      return 6
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
