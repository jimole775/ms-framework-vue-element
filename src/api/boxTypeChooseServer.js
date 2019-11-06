import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(params) {
    const query = {}
    // 设置传参格式
    if (Validate.isNotEmpty(params.keyword.id)) {
      query['warnId'] = parseInt(params.keyword.id) 
    }
    if (Validate.isNotEmpty(params.keyword.boxName)) {
      query['boxName'] = parseInt(params.keyword.boxName) 
    }
    // query['warnId'] = 777524540 
    const data = {
      dataSet: {
        name: 'condition',
        params: { ...query },
        page: {
          startRow: 0,
          endRow: 10
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/queryBoxList',
      method: 'post',
      data
    }).then(res => {
      if (res.data.data) {
        res.data.data.forEach(item => {
          // 将接口返回参数转换为页面对应的字段
          item.id = item.boxName
        })
      }
      return res.data
    })
  }
}

