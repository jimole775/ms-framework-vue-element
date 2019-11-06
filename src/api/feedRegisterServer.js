import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.werks)) {
      query['werks'] = params.keyword.werks
    }
    if (Validate.isNotEmpty(params.keyword.bktxt)) {
      query['bktxt'] = params.keyword.bktxt
    }
    if (Validate.isNotEmpty(params.keyword.matnr)) {
      query['matnr'] = params.keyword.matnr
    }
    if (Validate.isNotEmpty(params.keyword.handbookCk)) {
      query['handbookCk'] = params.keyword.handbookCk
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    const data = {
      params: {
        ...query
      },
      page: {
        startRow: params.page * params.size,
        endRow: params.size
      }
      // dataSet: {
      //   name: 'data',
      //   config: 'ACT_SPD_CUSTOMS_MANUAL_001',
      //   params: {
      //     ...query
      //   },
      // page: {
      //   startRow: params.page * params.size,
      //   endRow: params.size
      // }
      // }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpProImpMaterial/querySdpEtProcessMaterial',
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
    data.entid = parseInt(localStorage.getItem('entid'))
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
