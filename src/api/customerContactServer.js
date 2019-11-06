import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/customer-contacts',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.customer) {
          item.customerId = item.customer.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/customer-contacts/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.customerId = data.customer ? data.customer.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.customer = data.customerId ? {
      id: data.customerId
    } : null
    delete param.customerId
    return request({
      url: '/api/customer-contacts',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.customer = data.customerId ? {
      id: data.customerId
    } : null
    delete param.customerId
    return request({
      url: '/api/customer-contacts',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/customer-contacts/${id}`,
      method: 'delete'
    })
  }
}
