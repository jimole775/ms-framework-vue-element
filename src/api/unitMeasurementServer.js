import request from '@/utils/request'

export default {
  search(type) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        params: type,
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseIformation/selectBaseInformation',
      method: 'post',
      data
    })
  },
  get(id) {
    return request({
      url: `/api/unit-measurements/${id}`,
      method: 'get'
    })
  },
  post(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/unit-measurements',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/unit-measurements',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/unit-measurements/${id}`,
      method: 'delete'
    })
  }
}
