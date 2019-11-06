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
      url: '/auxhome/rpt/api/1.0.0/base/selectList',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          config: params.config,
          params: {
            ...query,
            year: datetime.dateToDateStr(query.year),
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
          year: item['year'] ? new Date(item['year']) : null,
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
