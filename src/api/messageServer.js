import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/message',
      method: 'get',
      params
    })
  },
  get(id) {
    return request({
      url: `/api/message/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.userId = data.user ? data.user.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.user = {
      id: data.userId
    }
    delete param.userId
    return request({
      url: '/api/message',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.user = {
      id: data.userId
    }
    delete data.userId
    return request({
      url: '/api/message',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/message/${id}`,
      method: 'delete'
    })
  }
}
