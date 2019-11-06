import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  searchOne(param) {
    const query = {}
    if (Validate.isNotEmpty(param.keyword.beginDate)) {
      query['startDate'] = param.keyword.beginDate
    }
    if (Validate.isNotEmpty(param.keyword.endDate)) {
      query['endDate'] = param.keyword.endDate
    }
    query['type'] = param.type
    // 设置传参格式
    const data = {
      config: 'ACT_SALE_SUPPLIER_COLLECT_REPORT_SELECT',
      params: { ...query },
      page: {
        startRow: param.page * param.size, // 起始行
        endRow: param.size // 每页条数
      }
    }
    return request({
      url: '/auxhome/rpt/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      return res.data.data
    })
  },
  searchTwo(param) {
    const query = {}
    if (Validate.isNotEmpty(param.keyword.year)) {
      query['year'] = parseInt(param.keyword.year)
    }
    if (Validate.isNotEmpty(param.keyword.supplierId)) {
      query['supplierId'] = param.keyword.supplierId
    }
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'datas',
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/rpt/api/1.0.0/shipReportData/selectSupplierDetailReport',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  }
}
