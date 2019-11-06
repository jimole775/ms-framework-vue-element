import request from '@/utils/request'
import Validate from '@/utils/validate.js'
export default {
  search(param) {
    const query = {}
    if (Validate.isNotEmpty(param.keyword.year)) {
      query['year'] = parseInt(param.keyword.year)
    }
    if (Validate.isNotEmpty(param.keyword.month)) {
      query['month'] = parseInt(param.keyword.month)
    }
    // 设置传参格式
    const data = {
      config: 'ACT_SALE_BOOKING_DELIVERY_REPORT_SELECT',
      params: { ...query },
      page: {
        startRow: 0, // 起始行
        endRow: 10000 // 每页条数
      }
    }
    return request({
      url: '/auxhome/rpt/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      return res.data.data
    })
  }
}
