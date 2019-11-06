import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/shipping-company-contacts',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.shippingCompany) {
          item.shippingCompanyId = item.shippingCompany.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/shipping-company-contacts/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.shippingCompanyId = data.shippingCompany ? data.shippingCompany.id : null
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
    return request({
      url: '/api/shipping-company-contacts',
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
    return request({
      url: '/api/shipping-company-contacts',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/shipping-company-contacts/${id}`,
      method: 'delete'
    })
  }
}
