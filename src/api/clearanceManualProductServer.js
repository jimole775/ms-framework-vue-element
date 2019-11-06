import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/clearance-manual-products',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.proMarkingCountry) {
          item.proMarkingCountryId = item.proMarkingCountry.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/clearance-manual-products/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.proMarkingCountryId = data.proMarkingCountry ? data.proMarkingCountry.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.proMarkingCountry = data.proMarkingCountryId ? {
      id: data.proMarkingCountryId
    } : null
    delete param.proMarkingCountryId
    return request({
      url: '/api/clearance-manual-products',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.proMarkingCountry = data.proMarkingCountryId ? {
      id: data.proMarkingCountryId
    } : null
    delete param.proMarkingCountryId
    return request({
      url: '/api/clearance-manual-products',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    const data = {
      dataSet: {
        name: 'data',
        params: {
          manualHLineId: id
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsManual/deletedHeaderAndLines',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  }
}
