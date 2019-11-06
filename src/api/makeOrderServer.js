import request from '@/utils/request'

export default {
  search(param) {
    // 查询时增加组织id条件
    param['keyword'].entid = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        params: { ...param.keyword },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpMakingOrder/doSearch',
      method: 'post',
      data
    }).then(res => {
      if (Number.parseInt(res.data.code) === 200) {
        return res.data.data
      } else {
        return {
          data: [],
          page: {
            total: 0
          }
        }
      }
    })
  },
  get(id) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        params: { id: id }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpMakingOrder/doSelectOne',
      method: 'post',
      data
    })
  },
  post(param) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        params: { ...param }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpMakingOrder/doUpdate',
      method: 'post',
      data
    })
  },
  put(param) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        params: { ...param }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpMakingOrder/doUpdate',
      method: 'post',
      data
    })
  },
  delete(id) {
    const data = {
      dataSet: {
        name: 'data',
        params: { id: id }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpMakingOrder/doDelete',
      method: 'post',
      data
    })
  }
}
