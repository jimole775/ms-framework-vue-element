import request from '@/utils/request'

export default {
  get(query) {
    // 设置传参格式
    const data = {
      params: { ...query }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpWorkFlow/getWorkFlowData',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  },
  startProcess(query) {
    // 设置传参格式
    const data = {
      params: {
        ...query
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpWorkFlow/doInstanceAction',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  },
  getUserWorkFlowData(query) {
    // 设置传参格式
    const data = {
      params: { ...query }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpWorkFlow/getUserWorkFlowData',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  },
  // 查询分权
  getDecentralization(query) {
    const dataTo = {
      config: 'ACT_SDP_SEPARATE_POWER_SELECT',
      params: {
        billTypeId: query.billTypeId,
        billId: query.billId,
        entid: parseInt(localStorage.getItem('entid'))
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: dataTo
    }).then(res => {
      res.data.data && res.data.data.forEach(item => {
        item.isPower = item.isPower === 2 
      })
      return res.data
    })
  },
  // 提交分权
  postDecentralization(query) {
    query['isPower'] = query.isPower ? 2 : 1
    query['entid'] = parseInt(localStorage.getItem('entid'))
    const dataTo = {
      dataSet: {
        name: 'data',
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSeparatePower/insertPower',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data
    })
  }
}
