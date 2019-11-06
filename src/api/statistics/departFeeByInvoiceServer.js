import request from '@/utils/request'
import Validate from './../../utils/validate.js'
import datetime from '../../utils/datetime'

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
          if (!params.query.entId) {
            query['entId'] = parseInt(localStorage.getItem('entId'))
          }
        }
      })
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          config: 'ACT_AAA_QUERY01',
          params: {
            ...query,
            isOrNoInvoice: query.isInvoice,
            createDateStart: datetime.dateToDateStr(query.createDateStart),
            createDateEnd: datetime.dateToDateStr(query.createDateEnd),
            cutDateStart: datetime.dateToDateStr(query.cutDateStart),
            cutDateEnd: datetime.dateToDateStr(query.cutDateEnd),
            departDateStart: datetime.dateToDateStr(query.departDateStart),
            departDateEnd: datetime.dateToDateStr(query.departDateEnd),
            recivDateStart: datetime.dateToDateStr(query.recivDateStart),
            recivDateEnd: datetime.dateToDateStr(query.recivDateEnd),
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
          ...item
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
