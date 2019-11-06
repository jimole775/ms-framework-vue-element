import request from '@/utils/request'

export default {
  search(param) {
    // 查询时增加组织id条件
    param.keyword['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      params: { ...param.keyword },
      page: {
        startRow: param.page * param.size, // 起始行
        endRow: param.size // 每页条数
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBillMerge/querySdpFinLcBillMerge',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        res.data.data = []
        return res.data
      }
      return res.data.data
    })
  },
  searchCredit(param) {
    param.keyword.entid = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      params: { ...param.keyword },
      page: {
        startRow: param.page * param.size, // 起始行
        endRow: param.size // 每页条数
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBill/querySdpFinLcBillForMerge',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        res.data.data = []
        return res.data
      }
      return res.data.data
    })
  },
  get(id) {
    // 设置传参格式
    const data = {
      params: { mergeId: id },
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBillMerge/querySdpFinLcBillMergeInfo',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return {}
      }
      return res.data.data
    })
  },
  post(param) {
    param.entid = parseInt(localStorage.getItem('entid'))
    const query = { ...param }
    query['mergeState'] = '1'
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'dataSet',
        config: 'ACT_SDP_FIN_LC_BILL_MERGE_ADD',
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBillMerge/addSdpFinLcBillMerge',
      method: 'post',
      data
    })
  },
  put(param) {
    param.hisList.forEach(item => {
      item.itemList = [
        ...item.itemList,
        ...item.deletedList,
      ]
    })
    const query = { ...param }
    query['mergeState'] = '1'
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'dataSet',
        config: 'ACT_SDP_FIN_LC_BILL_MERGE_UPDATE',
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBillMerge/updateSdpFinLcBillMerge',
      method: 'post',
      data
    })
  },
  delete(id) {
    const data = {
      params: {
        mergeId: id
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBillMerge/deleteSdpFinLcBillMerge',
      method: 'post',
      data
    })
  }
}
