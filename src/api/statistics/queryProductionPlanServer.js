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
    if (Validate.isNotEmpty(param.keyword.batchNo)) {
      query['batchNo'] = param.keyword.batchNo
    }
    if (Validate.isNotEmpty(param.keyword.itemCode)) {
      query['itemCode'] = param.keyword.itemCode
    }
    if (Validate.isNotEmpty(param.keyword.custName)) {
      query['custName'] = param.keyword.custName
    }
    if (Validate.isNotEmpty(param.keyword.orgName)) {
      query['orgName'] = param.keyword.orgName
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SDP_PLAN_ROW_PRODUCTION_SELECT',
        params: { ...query },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      return res.data.data.dataSet
    })
  },
}
