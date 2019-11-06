import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/freight-standard-tickets',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.shippingCompany) {
          item.shippingCompanyId = item.shippingCompany.id
        }
        if (item.freightStandard) {
          item.freightStandardId = item.freightStandard.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/freight-standard-tickets/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.shippingCompanyId = data.shippingCompany ? data.shippingCompany.id : null
      data.freightStandardId = data.freightStandard ? data.freightStandard.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.shippingCompany = data.shippingCompanyId ? {
      id: data.shippingCompanyId
    } : null
    delete param.shippingCompanyId
    param.freightStandard = data.freightStandardId ? {
      id: data.freightStandardId
    } : null
    delete param.freightStandardId
    return request({
      url: '/api/freight-standard-tickets',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.shippingCompany = data.shippingCompanyId ? {
      id: data.shippingCompanyId
    } : null
    delete param.shippingCompanyId
    param.freightStandard = data.freightStandardId ? {
      id: data.freightStandardId
    } : null
    delete param.freightStandardId
    return request({
      url: '/api/freight-standard-tickets',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/freight-standard-tickets/${id}`,
      method: 'delete'
    })
  }
}
