import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    if (Validate.isNotEmpty(param.keyword.startDate)) {
      query['startDate'] = param.keyword.startDate
    }
    if (Validate.isNotEmpty(param.keyword.endDate)) {
      query['endDate'] = param.keyword.endDate
    }
    if (Validate.isNotEmpty(param.keyword.warnNo)) {
      query['warnNo'] = param.keyword.warnNo
    }
    if (Validate.isNotEmpty(param.keyword.prover)) {
      query['prover'] = param.keyword.prover
    }
    if (Validate.isNotEmpty(param.keyword.orderBy)) {
      query['orderBy'] = param.keyword.orderBy
    }
    // 设置传参格式
    const data = {
      params: { ...query },
      page: {
        startRow: param.page * param.size, // 起始行
        endRow: param.size // 每页条数
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/documentVisualization/visualizationDisplay',
      method: 'post',
      data
    }).then(res => {
      return res.data.data
    })
  },
}
