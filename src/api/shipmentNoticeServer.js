import request from '@/utils/request'

export default {
  search(params = {}) {
    const query = params.query || {}
    const queryData = {}
    if (query.warnNo) {
      queryData['warnNo'] = query.warnNo
    }
    if (query.id) {
      queryData['warnId'] = query.id
    }
    if (query.piNo) {
      queryData['piNo'] = query.piNo
    }
    if (query.entid) {
      queryData['entid'] = query.entid
    } else {
      queryData['entid'] = parseInt(localStorage.getItem('entid'))
    }
    if (query.seaportInName) {
      queryData['seaportInName'] = query.seaportInName
    }
    if (query.seaportOutName) {
      queryData['seaportOutName'] = query.seaportOutName
    }
    return this.search_request_handle(params, queryData)
  },
  search_without_entid(params = {}) {
    const query = params.query || {}
    const queryData = {}
    if (query.warnNo) {
      queryData['warnNo'] = query.warnNo
    }
    if (query.id) {
      queryData['warnId'] = query.id
    }
    if (query.piNo) {
      queryData['piNo'] = query.piNo
    }
    if (query.seaportInName) {
      queryData['seaportInName'] = query.seaportInName
    }
    if (query.seaportOutName) {
      queryData['seaportOutName'] = query.seaportOutName
    }
    return this.search_request_handle(params, queryData)
  },
  search_request_handle(params, queryData) {
    const page = params.page || 1
    const size = params.size || 10
    const data = {
      dataSet: {
        name: 'data',
        // 查询条件,选传
        params: {
          methodCode: 'oms_001',
          ...queryData
        },
        // 分页信息
        page: {
          startRow: (page - 1) * size,
          endRow: size
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/getBaseDataPage',
      method: 'post',
      data
    }).then(res => {
      const list = []
      if (res.data.data) {
        res.data.data.data.forEach(item => {
          list.push({
            ...item,
            id: item.warnid != null ? parseInt(item.warnid, 10) : item.warnid,
            shiptype: item.shiptype != null ? parseInt(item.shiptype, 10) : item.shiptype
          })
        })
        const sdpPage = res.data.data.page
        const size = sdpPage.endRow - sdpPage.startRow
        return {
          data: list,
          pagination: {
            page: sdpPage.endRow / size,
            size: size || 10,
            count: sdpPage.total
          }
        }
      } else {
        return {
          data: list,
          pagination: {
            page: 0,
            size: size || 10,
            count: 0
          }
        }
      }
    })  
  }
}
