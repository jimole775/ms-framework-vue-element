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
      url: '/auxhome/rpt/api/1.0.0/bookingNoteRemind/queryBookingDetailed',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          config: 'ACT_RPT_BOOKING_DETAILED',
          params: {
            ...query,
            cutDate: datetime.dateToDateStr(query.cutDate),
            departDate: datetime.dateToDateStr(query.departDate),
            bookingDate: datetime.dateToDateStr(query.bookingDate),
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
      data.data.forEach(item => {
        list.push({
          ...item,
          cutDate: item['cutDate'] ? new Date(item['cutDate']) : null,
          departDate: item['departDate'] ? new Date(item['departDate']) : null,
          bookingDate: item['bookingDate'] ? new Date(item['bookingDate']) : null,
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
  },
  search2() {
    return request({
      url: '/auxhome/rpt/api/1.0.0/bookingNoteRemind/queryBookingByAreaName',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          config: 'ACT_RPT_BOOKING_AREANAME',
          params: {},
        }
      }
    }).then(res => {
      return res.data
    })
  },
  search3() {
    return request({
      url: '/auxhome/rpt/api/1.0.0/bookingNoteRemind/queryBookingByOrgName',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          config: 'ACT_RPT_BOOKING_ORGNAME',
          params: {},
        }
      }
    }).then(res => {
      return res.data
    })
  }
}
