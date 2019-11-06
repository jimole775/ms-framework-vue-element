import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    if (Validate.isNotEmpty(param.keyword.mblnr)) {
      query['mblnr'] = param.keyword.mblnr
    }
    // // 查询时增加组织id条件
    // query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      params: { ...query },
      page: {
        startRow: param.page * param.size, // 起始行
        endRow: param.size // 每页条数
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEtProcessMaterial/queryEtCredentialsMaterial',
      method: 'post',
      data
    }).then(res => {
      return res.data.data
    })
  },
}
