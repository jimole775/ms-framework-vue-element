
function toTitle(val) {
  switch (val) {
    case 40074:
      return '费用标准维护'
    case 40075:
      return '信用证维护'
    case 40076:
      return '海运费预提单据号'
    case 40077:
      return '内陆包干费预提单据号'
    case 40078:
      return '海运费询价单据号'
    case 40079:
      return '信用证变更单号'
    case 40080:
      return '信用证合并流水号'
    case 40081:
      return '出运申报流水号'
    case 40082:
      return '出运申报变更流水号'
    case 40083:
      return '可损通知流水号'
    case 40084:
      return '客户箱单发票案例库'
    case 40085:
      return '报关单流水号'
    case 40086:
      return '可损通知结案处理流水号'
    case 40087:
      return '交单登记单号'
    case 40088:
      return '海运费支付单据号'
    case 40089:
      return '费用登记流水号'      
    case 40090:
      return '拖柜计划流水号'
    case 40091:
      return '内陆包干费支付单据号'
    case 40092:
      return '订舱单流水号'
    case 40093:
      return '提单放单流水号'
    case 40094:
      return '改单申请单据号'
    case 40095:
      return '清关单流水号'
    case 40096:
      return '融资登记单号'
    case 40097:
      return '商业发票流水号'
    case 40098:
      return '商业发票发票号'
    case 40099:
      return '特殊单据申请'
    case 40100:
      return 'EDI_ShipmentApplyInfo 出运申报'
    case 40101:
      return 'EDI_Plnotice 可损通知'
    case 40102:
      return '报关单反馈号'
    case 40103:
      return '船公司及货代公司'
    case 40104:
      return '额外费用登记'  
    case 40106:
      return '制作提单'
    case 40105:
      return '商业发票红冲'
    case 40107:
      return '订舱单变更'
    case 50000:
      return '通知公告'
    default:
      return val
  }
}

function toValue(val) {
  switch (val) {
    case '费用标准维护':
      return 40074
    case '信用证维护':
      return 40075
    case '海运费预提单据号':
      return 40076
    case '内陆包干费预提单据号':
      return 40077
    case '海运费询价单据号':
      return 40078
    case '信用证变更单号':
      return 40079
    case '信用证合并流水号':
      return 40080
    case '出运申报流水号':
      return 40081
    case '出运申报变更流水号':
      return 40082
    case '可损通知流水号':
      return 40083
    case '客户箱单发票案例库':
      return 40084
    case '报关单流水号':
      return 40085
    case '可损通知结案处理流水号':
      return 40086
    case '交单登记单号':
      return 40087
    case '海运费支付单据号':
      return 40088
    case '费用登记流水号':
      return 40089
    case '拖柜计划流水号':
      return 40090
    case '内陆包干费支付单据号':
      return 40091
    case '订舱单流水号':
      return 40092
    case '提单放单流水号':
      return 40093
    case '改单申请单据号':
      return 40094
    case '清关单流水号':
      return 40095
    case '融资登记单号':
      return 40096
    case '商业发票流水号':
      return 40097
    case '商业发票发票号':
      return 40098
    case '特殊单据申请':
      return 40099
    case 'EDI_ShipmentApplyInfo 出运申报':
      return 40100
    case 'EDI_Plnotice 可损通知':
      return 40101
    case '报关单反馈号':
      return 40102
    case '船公司及货代公司':
      return 40103
    case '额外费用登记':
      return 40104   
    case '制作提单':
      return 40106
    case '商业发票红冲':
      return 40105
    case '订舱单变更':
      return 40107
    case '通知公告':
      return 50000
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
