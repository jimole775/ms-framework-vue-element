import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/fee-pay-warns',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/fee-pay-warns/${id}`,
      method: 'get'
    })
  },
  post(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/fee-pay-warns',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/fee-pay-warns',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/fee-pay-warns/${id}`,
      method: 'delete'
    })
  }
}
