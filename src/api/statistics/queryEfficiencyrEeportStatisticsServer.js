import request from '@/utils/request'
import datetime from './../../utils/datetime'
import Validate from './../../utils/validate.js'

export default {
  search(params) {
    // 查询时增加组织id条件
    params.query.entid = parseInt(localStorage.getItem('entid'))
    const query = params.query || {}
    const page = params.page || 0
    const size = params.size || 10
    if (params.query) {
      Object.keys(params.query).forEach(key => {
        if (Validate.isNotEmpty(params.query[key])) {
          query[key] = params.query[key]
        }
      })
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiShipmentapplyinfo/queryEfficiencyrEeport',
      method: 'post',
      data: {
        params: {
          ...query,
          searchDate: datetime.dateToDateStr(query.searchDate),
          recLcDate: datetime.dateToDateStr(query.recLcDate),
          lcActiveDate: datetime.dateToDateStr(query.lcActiveDate),
          lcDate: datetime.dateToDateStr(query.lcDate),
          tbDate: datetime.dateToDateStr(query.tbDate),
          transportdate: datetime.dateToDateStr(query.transportdate),
          beginDate: datetime.dateToDateStr(query.searchDateStart),
          endDate: datetime.dateToDateStr(query.searchDateEnd),
        },
        page: {
          startRow: page * size,
          endRow: size
        }
      }
    }).then(res => {
      if (res.data.code !== 200) {
        throw new Error(res.data.msg)
      }
      const data = res.data.data
      const list = []
      data.data.forEach(item => {
        list.push({
          ...item,
          searchDate: item['searchDate'] ? new Date(item['searchDate']) : null,
          recLcDate: item['recLcDate'] ? new Date(item['recLcDate']) : null,
          lcActiveDate: item['lcActiveDate'] ? new Date(item['lcActiveDate']) : null,
          lcDate: item['lcDate'] ? new Date(item['lcDate']) : null,
          tbDate: item['tbDate'] ? new Date(item['tbDate']) : null,
          transportdate: item['transportdate'] ? new Date(item['transportdate']) : null,
        })
      })
      const sdpPage = data.page
      const size = sdpPage.endRow - sdpPage.startRow
      return {
        data: list,
        pagination: {
          page: sdpPage.endRow / size,
          size: size || 10,
          count: sdpPage.total
        }
      }
    })
  }
}
