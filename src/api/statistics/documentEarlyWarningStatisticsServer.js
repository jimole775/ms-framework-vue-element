import request from '@/utils/request'
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
        dataSet: {
          name: 'condition',
          params: {
            ...query
          },
          page: {
            startRow: page * size,
            endRow: (page + 1) * size
          }
        }
      }
    }).then(res => {
      if (res.data.code !== 200) {
        throw new Error(res.data.msg)
      }
      const data = res.data.data
      const list = []
      if (data) {
        data.data.forEach(item => {
          list.push({
            ...item,
            checkTime: item['checkTime'] ? new Date(item['checkTime']) : null,
            jdDate: item['jdDate'] ? new Date(item['jdDate']) : null,
            cdDate: item['cdDate'] ? new Date(item['cdDate']) : null,
            orderDate: item['orderDate'] ? new Date(item['orderDate']) : null,
            remindBeginDate: item['remindBeginDate'] ? new Date(item['remindBeginDate']) : null,
          })
        })
        const sdpPage = data.page
        const size = sdpPage.endRow - sdpPage.startRow
        return {
          data: list,
          pagination: {
            page: sdpPage.endRow / size,
            size: size || 10,
            count: data.page.total
          }
        }
      } else {
        return 0
      } 
    })
  }
}
