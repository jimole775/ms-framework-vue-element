
const entMap = {
  101: [
    '',
    '出口商品销售收入',
    '主营业务收入-外销-海运费',
    '主营业务收入-外销-保险费',
    '主营业务收入-外销-配件',
    '主营业务收入-外销-成品',
    '主营业务收入-外销-配件',
    '制版费',
    '检验费',
    '产品认证费',
    '仓储费',
    '模具费',
    '财务费用-手续费',
    '其他商品销售成本（返包费等）',
    'TT金额调整',
    '邮件、快件费',
    '使馆费、产地认证费、签证费',
    'LC金额调整',
    '财务费用-押汇利息',
    '广告费-POP宣传资料费',
    '其他业务收入',
    '业务招待费-餐饮费',
    'OA金额调整',
    '内陆包干费（运杂费）',
    '汽车费-包干内车费',
    '网络费——信息费',
    '差旅费-国内',
    '广告费—其他费用',
    '广告费-物料费',
    '费用赔款',
    '应收款调整',
    '坏账损失',
    '海运费',
    '其他费用',
    '营业外收入',
    '主营业务收入-外销-其他',
    '主营业务收入-外销-折扣折让',
    '应收调整-尾差',
    '应收调整-费用抵应收',
    '客户外购',
    '应收款清缴',
    '应收调整-推广费抵货款',
    '应收调整-广告费抵货款',
    '', // 43为空
    '现金折扣',
    '使馆认证费'
  ],
  102: [
    '不可用',
    '主营业务收入-外销-海运费',
    '保险费',
    '佣金',
    '返利',
    '其他',
    '制版费',
    '检验费',
    '产品认证费',
    '仓储费',
    '模具费',
    '财务费用-手续费',
    '其他商品销售成本（返包费等）',
    '差额调整',
    '邮件、快件费',
    '使馆费',
    'LC调账',
    '财务费用-押汇利息',
    '广告费',
    '内陆包干费（运杂费）',
    '费用赔款',
    '应收款调整',
    '坏账损失',
    '海运费(费用类)',
    '其他费用',
    '营业外收入',
    '主营业务收入-外销-其他',
    '主营业务收入-外销-折扣折让',
    '应收调整-尾差',
    '应收调整-费用抵应收',
    '', // 39为空
    '应收款清缴',
    '', // 41为空
    '', // 42为空
    '', // 43为空
    '现金折扣',
    '使馆认证费',
  ] }
function toTitle(val, entid) {
  return entMap[entid][val] 
  // switch (val) {
  //   case 0:
  //     return ''
  //   case 1: 
  //     return '出口商品销售收入'
  //   case 2: 
  //     return '主营业务收入-外销-海运费'
  //   case 3: 
  //     return '主营业务收入-外销-保险费'
  //   case 4: 
  //     return '主营业务收入-外销-配件'
  //   case 5: 
  //     return '主营业务收入-内销-成品'
  //   case 6: 
  //     return '主营业务收入-内销-配件'
  //   case 7: 
  //     return '制版费'
  //   case 8: 
  //     return '检验费'
  //   case 9: 
  //     return '产品认证费'
  //   case 10: 
  //     return '仓储费'
  //   case 11: 
  //     return '模具费'
  //   case 12: 
  //     return '财务费用-手续费'
  //   case 13: 
  //     return '其他商品销售成本（返包费等）'
  //   case 14: 
  //     return 'TT金额调整'
  //   case 15: 
  //     return '邮件、快件费'
  //   case 16: 
  //     return '使馆费、产地认证费、签证费'
  //   case 17: 
  //     return 'LC金额调整'
  //   case 18: 
  //     return '财务费用-押汇利息'
  //   case 19: 
  //     return '广告费-POP宣传资料费'
  //   case 20: 
  //     return '其他业务收入'
  //   case 21: 
  //     return '业务招待费-餐饮费'
  //   case 22: 
  //     return 'OA金额调整'
  //   case 23: 
  //     return '内陆包干费（运杂费）'
  //   case 24: 
  //     return '汽车费-包干内车费'
  //   case 25: 
  //     return '网络费——信息费'
  //   case 26: 
  //     return '差旅费-国内'
  //   case 27: 
  //     return '广告费—其他费用'
  //   case 28: 
  //     return '广告费-物料费'
  //   case 29: 
  //     return '费用赔款'
  //   case 30: 
  //     return '应收款调整'
  //   case 31: 
  //     return '坏账损失'
  //   case 32: 
  //     return '海运费'
  //   case 33: 
  //     return '其他费用'
  //   case 34: 
  //     return '营业外收入'
  //   case 35: 
  //     return '主营业务收入-外销-其他'
  //   case 36: 
  //     return '主营业务收入-外销-折扣折让'
  //   case 37: 
  //     return '应收调整-尾差'
  //   case 38: 
  //     return '应收调整-费用抵应收'
  //   case 39: 
  //     return '客户外购'
  //   case 40: 
  //     return '应收款清缴'
  //   case 41: 
  //     return '应收调整-推广费抵货款'
  //   case 42: 
  //     return '应收调整-广告费抵货款'
  //   case 44: 
  //     return '现金折扣'
  //   case 45: 
  //     return '使馆认证费'
  //   default:
  //     return val
  // }
}

function toValue(val, entid) {
  return entMap[entid].indexOf(val)
  // switch (val) {
  //   case '':
  //     return 0
  //   case '出口商品销售收入': 
  //     return 1
  //   case '主营业务收入-外销-海运费': 
  //     return 2
  //   case '主营业务收入-外销-保险费': 
  //     return 3
  //   case '主营业务收入-外销-配件': 
  //     return 4
  //   case '主营业务收入-内销-成品': 
  //     return 5
  //   case '主营业务收入-内销-配件': 
  //     return 6
  //   case '制版费': 
  //     return 7
  //   case '检验费': 
  //     return 8
  //   case '产品认证费': 
  //     return 9
  //   case '仓储费': 
  //     return 10
  //   case '模具费': 
  //     return 11
  //   case '财务费用-手续费': 
  //     return 12
  //   case '其他商品销售成本（返包费等）': 
  //     return 13
  //   case 'TT金额调整': 
  //     return 14
  //   case '邮件、快件费': 
  //     return 15
  //   case '使馆费、产地认证费、签证费': 
  //     return 16
  //   case 'LC金额调整': 
  //     return 17
  //   case '财务费用-押汇利息': 
  //     return 18
  //   case '广告费-POP宣传资料费': 
  //     return 19
  //   case '其他业务收入': 
  //     return 20
  //   case '业务招待费-餐饮费': 
  //     return 21
  //   case 'OA金额调整': 
  //     return 22
  //   case '内陆包干费（运杂费）': 
  //     return 23
  //   case '汽车费-包干内车费': 
  //     return 24
  //   case '网络费——信息费': 
  //     return 25
  //   case '差旅费-国内': 
  //     return 26
  //   case '广告费—其他费用': 
  //     return 27
  //   case '广告费-物料费': 
  //     return 28
  //   case '费用赔款': 
  //     return 29
  //   case '应收款调整': 
  //     return 30
  //   case '坏账损失': 
  //     return 31
  //   case '海运费': 
  //     return 32
  //   case '其他费用': 
  //     return 33
  //   case '营业外收入': 
  //     return 34
  //   case '主营业务收入-外销-其他': 
  //     return 35
  //   case '主营业务收入-外销-折扣折让': 
  //     return 36
  //   case '应收调整-尾差': 
  //     return 37
  //   case '应收调整-费用抵应收': 
  //     return 38
  //   case '客户外购': 
  //     return 39
  //   case '应收款清缴': 
  //     return 40
  //   case '应收调整-推广费抵货款': 
  //     return 41
  //   case '应收调整-广告费抵货款': 
  //     return 42
  //   case '现金折扣': 
  //     return 44
  //   case '使馆认证费': 
  //     return 45
  //   default:
  //     return val
  // }
}

function toTitleFilter(val, entid = 101) {
  return toTitle(val, entid)
}

function toValueFilter(val, entid = 101) {
  return toValue(val, entid)
}

export default {
  toTitle,
  toValue,
  toTitleFilter,
  toValueFilter
}
