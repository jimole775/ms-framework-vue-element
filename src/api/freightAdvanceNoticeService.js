import request from '@/utils/request'
import Validate from '@/utils/validate.js'
export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.warnNo)) {
      query['warnNo'] = params.keyword.warnNo
    }
    if (Validate.isNotEmpty(params.keyword.piNo)) {
      query['piNo'] = params.keyword.piNo
    }
    if (Validate.isNotEmpty(params.keyword.invoiceNo)) {
      query['invoiceNo'] = params.keyword.invoiceNo
    }
    if (Validate.isNotEmpty(params.keyword.entid)) {
      query['entid'] = params.keyword.entid
    }
   
    // query['exception'] = 1
    // 设置传参格式
    const data = {
      dataSet: {
        config: 'ACT_FEE_LOCAL_YT_LINE2_002',  
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
      data: data 
    }).then(res => {
      return res.data.data.dataSet
    })
  },
}
