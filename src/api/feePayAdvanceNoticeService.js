import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    // 设置传参格式
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['name'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.transitId)) {
      query['transitId'] = param.keyword.transitId
    }
    if (Validate.isNotEmpty(param.keyword.type)) {
      query['type'] = param.keyword.type ? 1 : 2
    }
    if (Validate.isNotEmpty(param.keyword.entid)) {
      query['entid'] = param.keyword.entid
    }
    
    // query['transitId'] = 1231
    const data = {
      dataSet: {
        name: 'finFeeLocalPayInfo',
        config: 'ACT_SPD_FIN_FEE_LOCAL_YT_LINE_006', 
        keyField: 'pay_id', 
        params: { ...query },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeLocalPay/finFeeLocalPay',
      method: 'post',
      data
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.ytedAmt = item.ytAmt
        item.payedAmt = item.payAmt
        item.amt = item.boxAmt
        item.otherAmt = item.docAmt
        item.isYt = false
        item.isTs = false
        item.payAmt = 0
        delete item.lineId
      })
      return res.data.data.dataSet
    })
  }
}
