import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    query['entid'] = param.keyword.entid
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['name'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['venderId'] = param.keyword.id
    }
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'finFeeLocalPayInfo',
        config: 'ACT_SPD_FIN_FEE_LOCAL_PAY_SALEVENDER_004',  
        keyField: 'pay_id',
        params: { ...query },
        page: {
          startRow: 0,
          endRow: 10
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeLocalPay/finFeeLocalPay',
      method: 'post',
      data
    }).then(res => {
      // console.log(res.data.data.dataSet)
      // res.data.data.forEach(item => {
      //   // 将接口返回参数转换为页面对应的字段
      //   item.id = item.cust_id
      //   item.name = item.cust_name
      // })
      return res.data.data.dataSet
    }) 
  }
}

