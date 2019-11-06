import request from '@/utils/request'
import Validate from '@/utils/validate.js'
export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.companyCode)) {
      query['supplierCode'] = params.keyword.companyCode
    }
    if (Validate.isNotEmpty(params.keyword.companyName)) {
      query['supplierName'] = params.keyword.companyName
    }
    // 设置传参格式
    const data = {
      dataSet: {
        config: 'ACT_SDP_SUPPLIER',  
        params: { ...query },
        page: {
          startRow: params.page * params.size, // 起始行
          endRow: params.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: data 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    return request({
      url: `/api/companies/${id}`,
      method: 'get'
    })
  },
  post(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/companies',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/companies',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/companies/${id}`,
      method: 'delete'
    })
  }
}
