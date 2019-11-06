import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.manualNo)) {
      query['manualNo'] = params.keyword.manualNo
    }
    if (Validate.isNotEmpty(params.keyword.ktSpec)) {
      query['ktSpec'] = params.keyword.ktSpec
    }
    if (Validate.isNotEmpty(params.keyword.ysjSpec)) {
      query['ysjSpec'] = params.keyword.ysjSpec
    }
    if (Validate.isNotEmpty(params.keyword.materielCode)) {
      query['materielCode'] = params.keyword.materielCode
    }
    if (Validate.isNotEmpty(params.keyword.productCode)) {
      query['productCode'] = params.keyword.productCode
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))

    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_MANUAL_LEDGER_001',
        params: {
          ...query
        },
        page: {
          startRow: params.page * params.size,
          endRow: params.size
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsManual/selectManualLedger',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  },
  get(id) {
    return request({
      url: `/api/feed-registers/${id}`,
      method: 'get'
    })
  },
  post(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/feed-registers',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/feed-registers',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/feed-registers/${id}`,
      method: 'delete'
    })
  }
}
