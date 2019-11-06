import request from '@/utils/request'
import Validate from '@/utils/validate.js'
export default {
  search(param) {
    const query = {}
    if (Validate.isNotEmpty(param.keyword.volume)) {
      query['maxRule'] = param.keyword.volume
    }
    if (param.keyword.containerType && param.keyword.containerType.length > 0) {
      query['boxTypes'] = param.keyword.containerType.join(',')
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      dataSet: {
        config: 'ACT_SPD_BASE_BOXRULE_001',  
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
      data: data 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        item.containerTypeName = item.boxTypeName
        item.containerType = item.boxType
        item.volume = item.maxRule
        item.maxRoughWeight = item.maxGw
        item.maxSuttle = item.maxNw
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    const query = {}
    query['ruleId'] = id
    // 设置传参格式
    const data = {
      dataSet: {
        config: 'ACT_SPD_BASE_BOXRULE_001',  
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
        item.containerType = item.boxType.toString()
        item.containerTypeName = item.boxTypeName
        item.volume = item.maxRule
        item.maxRoughWeight = item.maxGw
        item.maxSuttle = item.maxNw
        item.remark = item.note
        item.operateUnitId = item.entid.toString()
      })
      return res.data.data.dataSet.rows[0]
    })
  },
  post(data) {
    const query = {}
    query['entid'] = data.entid
    query['boxTypeName'] = data.containerTypeName
    query['boxType'] = parseInt(data.containerType)
    query['$state'] = 1
    query['maxRule'] = data.volume.toString()
    query['maxGw'] = data.maxRoughWeight.toString()
    query['maxNw'] = data.maxSuttle.toString()
    query['deleted'] = 0
    query['note'] = data.remark
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BASE_BOXRULE_002',
        keyField: 'rule_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBaseBoxRule/insertBaseBoxRule',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data
    })
  },
  put(data) {
    const query = {}
    query['boxTypeName'] = data.containerTypeName
    query['boxType'] = parseInt(data.containerType)
    query['$state'] = 2
    query['maxRule'] = data.volume.toString()
    query['maxGw'] = data.maxRoughWeight.toString()
    query['maxNw'] = data.maxSuttle.toString()
    query['deleted'] = 0
    query['ruleId'] = data.id
    query['note'] = data.remark
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BASE_BOXRULE_003',
        keyField: 'rule_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBaseBoxRule/updateBaseBoxRule',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data
    })
  },
  delete(data) {
    const query = {}
    query['$statee'] = 2
    query['ruleId'] = data.ruleId
    query['deleted'] = 1
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BASE_BOXRULE_003',
        keyField: 'rule_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBaseBoxRule/updateBaseBoxRule',
      method: 'post',
      data: dataTo
    }).then(res => {
    })
  }
}
