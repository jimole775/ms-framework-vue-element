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
      url: '/auxhome/rpt/api/1.0.0/sellReport/customsBillList',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          params: {
            ...query,
            cutDate: datetime.dateToDateStr(query.cutDate),
            createDate: datetime.dateToDateStr(query.createDate),
            checkTime: datetime.dateToDateStr(query.checkTime),
            kcDate: datetime.dateToDateStr(query.kcDate),
            jdDate: datetime.dateToDateStr(query.jdDate),
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
      data.data.forEach(item => {
        list.push({
          ...item,
          cutDate: item['cutDate'] ? new Date(item['cutDate']) : null,
          createDate: item['createDate'] ? new Date(item['createDate']) : null,
          checkTime: item['checkTime'] ? new Date(item['checkTime']) : null,
          kcDate: item['kcDate'] ? new Date(item['kcDate']) : null,
          jdDate: item['jdDate'] ? new Date(item['jdDate']) : null,
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
