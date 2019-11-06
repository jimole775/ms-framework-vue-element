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
    if (Validate.isNotEmpty(param.keyword.entid)) {
      query['entid'] = param.keyword.entid
    }
    // query['transitId'] = 1234
    query['type'] = 2
    const data = {
      dataSet: {
        name: 'finFeeOcfPayInfo',
        config: 'ACT_SDP_FINFEE_LINE_001',
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
        item.ytedAmt = item.ytAmt
        item.payedAmt = item.payAmt
        item.payAmt = item.hyfAmt
        item.isYt = false
        item.isTs = false
        item.note = ''
        delete item.lineId
      })
      return res.data.data.dataSet
    })
  }
}
