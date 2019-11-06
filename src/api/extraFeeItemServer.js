import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/extra-fee-items',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.area) {
          item.areaId = item.area.id
        }
        if (item.org) {
          item.orgId = item.org.id
        }
        if (item.transit) {
          item.transitId = item.transit.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/extra-fee-items/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.areaId = data.area ? data.area.id : null
      data.orgId = data.org ? data.org.id : null
      data.transitId = data.transit ? data.transit.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.area = data.areaId ? {
      id: data.areaId
    } : null
    delete param.areaId
    param.org = data.orgId ? {
      id: data.orgId
    } : null
    delete param.orgId
    param.transit = data.transitId ? {
      id: data.transitId
    } : null
    delete param.transitId
    return request({
      url: '/api/extra-fee-items',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.area = data.areaId ? {
      id: data.areaId
    } : null
    delete param.areaId
    param.org = data.orgId ? {
      id: data.orgId
    } : null
    delete param.orgId
    param.transit = data.transitId ? {
      id: data.transitId
    } : null
    delete param.transitId
    return request({
      url: '/api/extra-fee-items',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/extra-fee-items/${id}`,
      method: 'delete'
    })
  }
}
