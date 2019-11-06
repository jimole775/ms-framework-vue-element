import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/submit-order-items',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.jdBank) {
          item.jdBankId = item.jdBank.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/submit-order-items/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.jdBankId = data.jdBank ? data.jdBank.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.jdBank = data.jdBankId ? {
      id: data.jdBankId
    } : null
    delete param.jdBankId
    return request({
      url: '/api/submit-order-items',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.jdBank = data.jdBankId ? {
      id: data.jdBankId
    } : null
    delete param.jdBankId
    return request({
      url: '/api/submit-order-items',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/submit-order-items/${id}`,
      method: 'delete'
    })
  }
}
