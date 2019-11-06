
function toTitle(val) {
  switch (val) {
    case 'BANK_REMITTANCE':
      return '银行汇款'
    case 'BANK_ACCEPTANCE':
      return '银行承兑'
    case 'SUB_LOAN':
      return '转货款'
    case 'REPLACEMENT_PAY':
      return '置换支付'
    case 'CHECK':
      return '转账支票'
    case 'CASH':
      return '现金'
    case 'OTHER':
      return '其它'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '银行汇款':
      return 'BANK_REMITTANCE'
    case '银行承兑':
      return 'BANK_ACCEPTANCE'
    case '转货款':
      return 'SUB_LOAN'
    case '置换支付':
      return 'REPLACEMENT_PAY'
    case '转账支票':
      return 'CHECK'
    case '现金':
      return 'CASH'
    case '其它':
      return 'OTHER'
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
