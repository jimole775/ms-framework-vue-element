import request from '@/utils/request'
import Validate from '@/utils/validate.js'
export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.code)) {
      query['hsCode'] = params.keyword.code
    }
    if (Validate.isNotEmpty(params.keyword.name)) {
      query['nameZw'] = params.keyword.name
    }
    if (Validate.isNotEmpty(params.keyword.elementName)) {
      query['brandName'] = params.keyword.elementName
    }
    if (Validate.isNotEmpty(params.keyword.refrigeratingCapacity)) {
      query['itemCool'] = params.keyword.refrigeratingCapacity
    }
    if (Validate.isNotEmpty(params.keyword.refundTax)) {
      query['tsLv'] = params.keyword.refundTax
    }
    if (Validate.isNotEmpty(params.keyword.notRefundTax)) {
      query['btsLv'] = params.keyword.notRefundTax
    }
    if (Validate.isNotEmpty(params.keyword.remark)) {
      query['note'] = params.keyword.remark
    }
    if (Validate.isNotEmpty(params.keyword.modelsType)) {
      query['modelsType'] = params.keyword.modelsType
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_Customs_Name_001',  
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
        item.sortNumber = item.seqLine
        item.code = item.hsCode
        item.name = item.nameZw
        item.elementName = item.brandName
        item.refrigeratingCapacity = item.itemCool
        item.refundTax = item.tsLv
        item.notRefundTax = item.btsLv
        item.unit = item.uomName
        if (item.usable === 2) {
          item.usable = true
        }
        if (item.usable === 1) {
          item.usable = false
        }
        item.enable = item.usable
        item.remark = item.note
        item.enable = item.usable
        // 由于不确定返回的是 entid 还是 entId
        // 这里做一下兼容
        if (item.entId) item.entId = item.entId
        if (item.entid) item.entId = item.entid
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['nameId'] = id
    }
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_Customs_Name_001',  
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
        item.sortNumber = item.seqLine
        item.code = item.hsCode
        item.name = item.nameZw
        item.decalrElement = item.elementsName
        item.englishName = item.nameYw
        item.elementName = item.brandName
        item.refrigeratingCapacity = item.itemCool
        item.refundTax = item.tsLv
        item.notRefundTax = item.btsLv
        item.unit = item.uomName
        item.usable = item.usable === 2 
        item.enable = item.usable
        item.remark = item.note
        item.enable = item.usable
        item.companyId = item.entId   
      })
      return res.data.data.dataSet.rows[0]
    })
  },
  post(dataSend) {
    const data = { ... dataSend }
    const query = {}
    if (data.enable === true) {
      data.enable = 2
    }
    if (data.enable === false) {
      data.enable = 1
    }
    // query['entid'] = data.entid
    query['hsCode'] = data.code
    query['$state'] = 1
    query['seqLine'] = data.sortNumber
    query['nameZw'] = data.name
    query['nameYw'] = data.englishName
    query['brandName'] = data.elementName
    query['elementsName'] = data.decalrElement
    query['itemCool'] = data.refrigeratingCapacity
    query['tsLv'] = data.refundTax
    query['btsLv'] = data.notRefundTax
    query['uomName'] = data.unit
    query['usable'] = data.enable
    query['note'] = data.remark
    query['deleted'] = 0
    query['entId'] = data.entid
    query['secondUnit'] = data.secondUnit
    query['coldWarm'] = data.coldWarm
    query['bigClassName'] = data.bigClassName
    query['modelsType'] = data.modelsType
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_Customs_Name_002',
        keyField: 'name_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomosName/insertCustomsName',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data
    })
  },
  put(dataSend) {
    const data = { ... dataSend }
    const query = {}
    if (data.enable === true) {
      data.enable = 2
    }
    if (data.enable === false) {
      data.enable = 1
    }
    query['hsCode'] = data.code
    query['$state'] = 2
    query['seqLine'] = data.sortNumber
    query['nameZw'] = data.name
    query['nameYw'] = data.englishName
    query['brandName'] = data.elementName
    query['elementsName'] = data.decalrElement
    query['itemCool'] = data.refrigeratingCapacity
    query['tsLv'] = data.refundTax
    query['btsLv'] = data.notRefundTax
    query['uomName'] = data.unit
    query['usable'] = data.enable
    query['note'] = data.remark
    query['nameId'] = data.nameId
    query['entId'] = data.entid 
    query['secondUnit'] = data.secondUnit
    query['coldWarm'] = data.coldWarm
    query['bigClassName'] = data.bigClassName
    query['modelsType'] = data.modelsType
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_Customs_Name_003',
        keyField: 'name_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomosName/updateCustomsName',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data
    })
  },
  delete(data) {
    const query = {}
    query['$state'] = 3
    query['nameId'] = data.nameId
    query['deleted'] = 1
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_Customs_Name_003',
        keyField: 'bank_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomosName/deleteCustomsName',
      method: 'post',
      data: dataTo
    }).then(res => {
    })
  }
}
