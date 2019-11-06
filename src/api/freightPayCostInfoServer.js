import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    // 设置传参格式
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['name'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.currencycode)) {
      query['currencyCode'] = param.keyword.currencycode
    }
    if (Validate.isNotEmpty(param.keyword.entid)) {
      query['entId'] = param.keyword.entid
    }
    if (Validate.isNotEmpty(param.keyword.warnId)) {
      query['warnIds'] = param.keyword.warnId
    }
    // query['warnIds'] = '3133'
    const data = {
      dataSet: {
        name: 'finFeeOcfPayInfo',
        config: 'ACT_SDP_FINFEE_OCFPAY_SELECT_003', 
        keyField: 'pay_id', 
        params: { ...query },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeOcfPay/finFeeOcfPay',
      method: 'post',
      data
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        // item.ytedAmt = item.ytAmt
        // item.isYt = false
        // item.isTs = false
        // item.payAmt = 0
        item.checkAmt = item.amt
      })
      return res.data.data.dataSet
    })
  }
}
