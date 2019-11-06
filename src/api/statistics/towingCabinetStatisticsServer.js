import request from '@/utils/request'
import Validate from './../../utils/validate.js'

export default {
  search(params) {
    // 查询时增加组织id条件
    params.query.entid = parseInt(localStorage.getItem('entid'))
    const query = {}
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
        config: 'ACT_SALE_DRAG_CONT_PACK_RPT_SELECT',
        params: {
          ...query
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
          ...item
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
  updateDragContWarn() {
    return request({
      url: '/auxhome/rpt/api/1.0.0/shipReportData/updateDragContWarn',
      method: 'get'
    })
  }
}
