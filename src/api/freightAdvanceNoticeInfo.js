import request from '@/utils/request'
// import { dateToDateStr } from '@/utils/datetime'
import Validate from '@/utils/validate.js'
export default {
  search(params) {
    console.log(params)
    const query = {}
    if (Validate.isNotEmpty(params.keyword.warnId)) {
      query['warnId'] = params.keyword.warnId
    }
    // 设置传参格式
    const dataTo = {
      dataSet: {
        config: 'ACT_SPD_SALE_SHIP_WARN_LOCAL_FEE2_002',  
        params: { ...query },
        page: {
          startRow: params.page * params.size, // 起始行
          endRow: params.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: dataTo 
    }).then(res => {
      return res.data.data.dataSet
    })
  }
}
