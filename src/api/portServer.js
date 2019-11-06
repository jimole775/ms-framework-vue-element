import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    // 将查询关键词转换为接口对应的字段
    const query = {}
    if (Validate.isNotEmpty(param.keyword.code)) {
      query['seaportCode'] = param.keyword.code
    }
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['seaportName'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['seaportId'] = param.keyword.id
    }
    if (Validate.isNotEmpty(param.keyword.englishName)) {
      query['englishName'] = param.keyword.englishName
    }
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['seaportName'] = param.keyword.name
    }
    if (param.keyword.portType && param.keyword.portType.length > 0) {
      query['seaportType'] = param.keyword.portType.join(',')
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'seaPortInfo',
        config: 'ACT_SDP_SEAPORT_BUSNO_001',  
        params: { ...query },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/seaportManagment',
      method: 'post',
      data: data 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.id = item.seaportId
        item.code = item.seaportCode
        item.name = item.seaportName
        item.englishName = item.englishName
        item.portType = parseInt(item.seaportType)
        item.enable = item.usable === 2
        item.remark = item.note
        item.isDelete = false
        item.areaId = item.areaId
        // item.areaName = item.areaName
      })
      return res.data.data.dataSet
    })
  },
  get(param) {
    const query = {}
    // 设置传参格式
    
    query['seaportId'] = param
    const data = {
      dataSet: {
        name: 'seaPortInfo',
        config: 'ACT_SDP_SEAPORT_BUSNO_001',  
        params: { ...query },
        page: {
          startRow: 0, // 起始行
          endRow: 10 // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: data
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.code = item.seaportCode
        item.name = item.seaportName
        item.englishName = item.englishName
        item.portType = parseInt(item.seaportType)
        item.enable = item.usable === 2
        item.remark = item.note
        item.isDelete = false
        item.areaId = item.areaId
        // item.areaName = item.areaName
      })
      return res.data.data.dataSet.rows[0]
    })
  },
  post(data) {
    const query = {}
    if (data.enable === true) {
      data.enable = 2
    }
    if (data.enable === false) {
      data.enable = 1
    }
    query['entid'] = data.entid
    query['areaCode'] = data.areaCode
    query['areaId'] = data.areaId
    query['$state'] = 1
    query['areaName'] = data.areaName
    query['seaportCode'] = data.code
    query['usable'] = data.enable
    query['englishName'] = data.englishName
    query['seaportName'] = data.name
    query['seaportType'] = parseInt(data.portType)
    query['note'] = data.remark
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'seaPortInfo',
        config: 'ACT_SDP_SEAPORT_BUSNO_001',
        keyField: 'seaport_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/seaportManagment',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data
    })
  },
  put(data) {
    const query = {}
    if (data.enable === true) {
      data.enable = 2
    }
    if (data.enable === false) {
      data.enable = 1
    }
    query['areaCode'] = data.areaCode
    query['areaId'] = data.areaId
    query['seaportId'] = data.seaportId
    query['$state'] = 2
    query['areaName'] = data.areaName
    if (data.code !== data.oldSeaportCode) {
      query['seaportCode'] = data.code
    } else {
      query['seaportCode'] = null
    }
    query['usable'] = data.enable
    query['englishName'] = data.englishName
    query['seaportName'] = data.name
    query['seaportType'] = parseInt(data.portType)
    query['note'] = data.remark
    query['oldSeaportCode'] = data.oldSeaportCode
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'seaPortInfo',
        config: 'ACT_SDP_SEAPORT_BUSNO_001',
        keyField: 'seaport_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/seaportManagment',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data
    })
  },
  delete(data) {
    const query = {}
    query['oldSeaportCode'] = data.seaportCode
    query['seaportId'] = data.seaportId
    query['$state'] = 3
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'seaPortInfo',
        config: 'ACT_SDP_SEAPORT_BUSNO_001',
        keyField: 'seaport_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/seaportManagment',
      method: 'post',
      data: dataTo
    }).then(res => {
    })
  }
}
