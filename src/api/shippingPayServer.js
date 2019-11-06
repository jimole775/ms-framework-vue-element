import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/shipping-pays',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.shippingCompany) {
          item.shippingCompanyId = item.shippingCompany.id
        }
        if (item.currency) {
          item.currencyId = item.currency.id
        }
        if (item.operateUnit) {
          item.operateUnitId = item.operateUnit.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/shipping-pays/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.shippingCompanyId = data.shippingCompany ? data.shippingCompany.id : null
      data.currencyId = data.currency ? data.currency.id : null
      data.operateUnitId = data.operateUnit ? data.operateUnit.id : null
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
    param.currency = data.currencyId ? {
      id: data.currencyId
    } : null
    delete param.currencyId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/shipping-pays',
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
    param.currency = data.currencyId ? {
      id: data.currencyId
    } : null
    delete param.currencyId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/shipping-pays',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/shipping-pays/${id}`,
      method: 'delete'
    })
  }
}
