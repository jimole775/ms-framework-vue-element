import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/customer-bank-accounts',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.customer) {
          item.customerId = item.customer.id
        }
        if (item.bankInfo) {
          item.bankInfoId = item.bankInfo.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/customer-bank-accounts/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.customerId = data.customer ? data.customer.id : null
      data.bankInfoId = data.bankInfo ? data.bankInfo.id : null
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
    param.bankInfo = data.bankInfoId ? {
      id: data.bankInfoId
    } : null
    delete param.bankInfoId
    return request({
      url: '/api/customer-bank-accounts',
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
    param.bankInfo = data.bankInfoId ? {
      id: data.bankInfoId
    } : null
    delete param.bankInfoId
    return request({
      url: '/api/customer-bank-accounts',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/customer-bank-accounts/${id}`,
      method: 'delete'
    })
  }
}
