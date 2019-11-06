import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/materials',
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
      url: `/api/materials/${id}`,
      method: 'get'
    })
  },
  post(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/materials',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/materials',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/materials/${id}`,
      method: 'delete'
    })
  }
}
