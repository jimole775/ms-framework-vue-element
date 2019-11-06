import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/machine-types',
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
      url: `/api/machine-types/${id}`,
      method: 'get'
    })
  },
  post(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/machine-types',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/machine-types',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/machine-types/${id}`,
      method: 'delete'
    })
  }
}
