import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/fee-pay-invoices',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.org) {
          item.orgId = item.org.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/fee-pay-invoices/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.orgId = data.org ? data.org.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.org = data.orgId ? {
      id: data.orgId
    } : null
    delete param.orgId
    return request({
      url: '/api/fee-pay-invoices',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.org = data.orgId ? {
      id: data.orgId
    } : null
    delete param.orgId
    return request({
      url: '/api/fee-pay-invoices',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/fee-pay-invoices/${id}`,
      method: 'delete'
    })
  }
}
