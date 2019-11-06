import request from '@/utils/request'
import datetime from './../../utils/datetime'
import Validate from './../../utils/validate.js'

export default {
  search(params) {
    // 查询时增加组织id条件
    const query = params.query || {}
    const page = params.page || 0
    const size = params.size || 10
    if (params.query) {
      Object.keys(params.query).forEach(key => {
        if (Validate.isNotEmpty(params.query[key])) {
          query[key] = params.query[key]
          if (!params.query.entid) {
            query['entid'] = parseInt(localStorage.getItem('entid'))
          }
        }
      })
    }
    return request({
      url: '/auxhome/rpt/api/1.0.0/base/selectList',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          config: 'ACT_SALE_BOOKING_DELIVERY_REPORT_SELECT_001',
          params: {
            ...query,
            cutDate: datetime.dateToDateStr(query.cutDate),
            preShipDate: datetime.dateToDateStr(query.preShipDate),
            createDate: datetime.dateToDateStr(query.createDate),
            startDate: datetime.dateToDateStr(query.createDateStart),
            endDate: datetime.dateToDateStr(query.createDateEnd),
          },
          page: {
            startRow: page * size,
            endRow: size
          }
        }
      }
    }).then(res => {
      if (res.data.code !== 200) {
        throw new Error(res.data.msg)
      }
      const data = res.data.data
      const list = []
      data.dataSet.rows.forEach(item => {
        list.push({
          ...item,
          cutDate: item['cutDate'] ? new Date(item['cutDate']) : null,
          preShipDate: item['preShipDate'] ? new Date(item['preShipDate']) : null,
          createDate: item['createDate'] ? new Date(item['createDate']) : null,
        })
      })
      const sdpPage = data.dataSet.page
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
