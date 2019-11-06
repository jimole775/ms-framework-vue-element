import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/shipping-company-extras',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.shippingCompany) {
          item.shippingCompanyId = item.shippingCompany.id
        }
        if (item.containerType) {
          item.containerTypeId = item.containerType.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/shipping-company-extras/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.shippingCompanyId = data.shippingCompany ? data.shippingCompany.id : null
      data.containerTypeId = data.containerType ? data.containerType.id : null
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
    param.containerType = data.containerTypeId ? {
      id: data.containerTypeId
    } : null
    delete param.containerTypeId
    return request({
      url: '/api/shipping-company-extras',
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
    param.containerType = data.containerTypeId ? {
      id: data.containerTypeId
    } : null
    delete param.containerTypeId
    return request({
      url: '/api/shipping-company-extras',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/shipping-company-extras/${id}`,
      method: 'delete'
    })
  }
}
