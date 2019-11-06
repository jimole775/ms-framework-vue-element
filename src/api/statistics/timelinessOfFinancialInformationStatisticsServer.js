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
      url: params.url,
      method: 'post',
      data: {
        params: {
          ...query,
          startCustomsDate: datetime.dateToDateStr(query.startCustomsDate),
          endCustomsDate: datetime.dateToDateStr(query.endCustomsDate),
          customsDate: datetime.dateToDateStr(query.customsDate),
          customsDueDate: datetime.dateToDateStr(query.customsDueDate),
          customsActualDate: datetime.dateToDateStr(query.customsActualDate),
        },
        page: {
          startRow: page * size,
          endRow: (page + 1) * size
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
          startCustomsDate: item['startCustomsDate'] ? new Date(item['startCustomsDate']) : null,
          endCustomsDate: item['endCustomsDate'] ? new Date(item['endCustomsDate']) : null,
          customsDate: item['customsDate'] ? new Date(item['customsDate']) : null,
          customsDueDate: item['customsDueDate'] ? new Date(item['customsDueDate']) : null,
          customsActualDate: item['customsActualDate'] ? new Date(item['customsActualDate']) : null,
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
