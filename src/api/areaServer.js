import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    // 设置传参格式
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['areaName'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['areaId'] = param.keyword.id
    }
    if (Validate.isNotEmpty(param.keyword.code)) {
      query['areaCode'] = param.keyword.code
    }
    if (Validate.isNotEmpty(param.keyword.number)) {
      query['telZone'] = param.keyword.number
    }
    if (Validate.isNotEmpty(param.keyword.areaType)) {
      query['areaType'] = param.keyword.areaType
    }
    if (Validate.isNotEmpty(param.keyword.remark)) {
      query['note'] = param.keyword.remark
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_CPCAREA_003',  
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
      res.data.data.dataSet.rows.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.id = item.areaId
        item.name = item.areaName
        item.code = item.areaCode
        item.number = item.telZone
        item.areaType = item.areaType
        item.remark = item.note
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    const query = {}
    // 设置传参格式
    query['areaId'] = id
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_CPCAREA_003',  
        params: { ...query }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.id = item.areaId
        item.name = item.areaName
        item.code = item.areaCode
        item.number = item.telZone
        item.areaType = item.areaType
        item.remark = item.note
      })
      return res.data.data.dataSet.rows[0]
    })
  },
  post(param) {
    const query = {}
    query['$state'] = 1
    query['deleted'] = 0
    // 设置传参格式
    query['entid'] = param.entid
    if (Validate.isNotEmpty(param.name)) {
      query['areaName'] = param.name
    }
    if (Validate.isNotEmpty(param.id)) {
      query['areaId'] = param.id
    }
    if (Validate.isNotEmpty(param.code)) {
      query['areaCode'] = param.code
    }
    if (Validate.isNotEmpty(param.number)) {
      query['telZone'] = param.number
    }
    if (Validate.isNotEmpty(param.areaType)) {
      query['areaType'] = param.areaType
    }
    if (Validate.isNotEmpty(param.remark)) {
      query['note'] = param.remark
    }
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_CPCAREA_001',
        keyField: 'areaid',
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/cpcArea/addCpcArea',
      method: 'post',
      data
    })
  },
  put(param) {
    const query = {}
    query['$state'] = 3
    // 设置传参格式
    if (Validate.isNotEmpty(param.name)) {
      query['areaName'] = param.name
    }
    if (Validate.isNotEmpty(param.id)) {
      query['areaId'] = param.id
    }
    if (Validate.isNotEmpty(param.code)) {
      query['areaCode'] = param.code
    }
    if (Validate.isNotEmpty(param.number)) {
      query['telZone'] = param.number
    }
    if (Validate.isNotEmpty(param.areaType)) {
      query['areaType'] = param.areaType
    }
    if (Validate.isNotEmpty(param.remark)) {
      query['note'] = param.remark
    }
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_CPCAREA_002',
        keyField: 'areaid',
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/cpcArea/updateCpcArea',
      method: 'post',
      data
    })
  },
  delete(id) {
    const query = {
      $state: 3,
      areaId: id,
      deleted: 1
    }
    query['$state'] = 3
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_CPCAREA_002',
        keyField: 'areaid',
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/cpcArea/deleteCpcArea',
      method: 'post',
      data
    })
  }
}
