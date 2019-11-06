import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    // query['orgtype'] = 5
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['orgName'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['orgId'] = param.keyword.id
    }
    if (Validate.isNotEmpty(param.keyword.ids)) {
      query['orgIds'] = param.keyword.ids
    }
    if (Validate.isNotEmpty(param.keyword.orgIdList)) {
      query['orgIdList'] = param.keyword.orgIdList
    }
    if (Validate.isNotEmpty(param.keyword.stat)) {
      query['stat'] = param.keyword.stat
    }
    // 设置传参格式
    const data = {
      dataSet: {
        config: 'ACT_SPD_CPCORG_001',  
        name: 'data',
        params: { ...query },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data.dataSet) {
        res.data.data.dataSet = []
        return res.data
      }
      res.data.data.dataSet.rows.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.id = item.orgId
        item.name = item.orgName
        item.entid = item.entId
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    return request({
      url: `/api/departments/${id}`,
      method: 'get'
    })
  },
  post(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/departments',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    return request({
      url: '/api/departments',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/departments/${id}`,
      method: 'delete'
    })
  }
}
