import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(params) {
    const query = {}
    // 设置传参格式
    // if (Validate.isNotEmpty(params.keyword.code)) {
    //   query['invoiceNo'] = params.keyword.code
    // }

    if (Validate.isNotEmpty(params.keyword.manualNo)) {
      query['manualNo'] = params.keyword.manualNo
    }
    if (Validate.isNotEmpty(params.keyword.recordDatabaseCode)) {
      query['recordDatabaseCode'] = params.keyword.recordDatabaseCode
    }
    if (Validate.isNotEmpty(params.keyword.manualType)) {
      query['manualType'] = params.keyword.manualType
    }
    if (Validate.isNotEmpty(params.keyword.CompetentCustoms)) {
      query['CompetentCustoms'] = params.keyword.CompetentCustoms
    }
    if (Validate.isNotEmpty(params.keyword.manageFTrad)) {
      query['manageFTrad'] = params.keyword.manageFTrad
    }
    if (Validate.isNotEmpty(params.keyword.managementName)) {
      query['managementName'] = params.keyword.managementName
    }
    if (Validate.isNotEmpty(params.keyword.processName)) {
      query['processName'] = params.keyword.processName
    }
    if (Validate.isNotEmpty(params.keyword.imsRatio)) {
      query['imsRatio'] = params.keyword.imsRatio
    }
    if (Validate.isNotEmpty(params.keyword.agreementCode)) {
      query['agreementCode'] = params.keyword.agreementCode
    }
    if (Validate.isNotEmpty(params.keyword.approvalNumber)) {
      query['approvalNumber'] = params.keyword.approvalNumber
    }
    if (Validate.isNotEmpty(params.keyword.importedPiNo)) {
      query['importedPiNo'] = params.keyword.importedPiNo
    }
    if (Validate.isNotEmpty(params.keyword.exportPiNo)) {
      query['exportPiNo'] = params.keyword.exportPiNo
    }
    if (Validate.isNotEmpty(params.keyword.recordImportValue)) {
      query['recordImportValue'] = params.keyword.recordImportValue
    }
    if (Validate.isNotEmpty(params.keyword.importCurrency)) {
      query['importCurrency'] = params.keyword.importCurrency
    }
    if (Validate.isNotEmpty(params.keyword.recordExportValue)) {
      query['recordExportValue'] = params.keyword.recordExportValue
    }
    if (Validate.isNotEmpty(params.keyword.exportCurrency)) {
      query['exportCurrency'] = params.keyword.exportCurrency
    }
    if (Validate.isNotEmpty(params.keyword.processType)) {
      query['processType'] = params.keyword.processType
    }
    if (Validate.isNotEmpty(params.keyword.bondedType)) {
      query['bondedType'] = params.keyword.bondedType
    }
    if (Validate.isNotEmpty(params.keyword.endDateStart)) {
      query['endDateStart'] = params.keyword.endDateStart
    }
    if (Validate.isNotEmpty(params.keyword.endDateEnd)) {
      query['endDateEnd'] = params.keyword.endDateEnd
    }
    if (Validate.isNotEmpty(params.keyword.dueType)) {
      query['dueType'] = params.keyword.dueType
    }
    if (Validate.isNotEmpty(params.keyword.manager)) {
      query['manager'] = params.keyword.manager
    }
    if (Validate.isNotEmpty(params.keyword.inputDateStart)) {
      query['inputDateStart'] = params.keyword.inputDateStart
    }
    if (Validate.isNotEmpty(params.keyword.inputDateEnd)) {
      query['inputDateEnd'] = params.keyword.inputDateEnd
    }
    if (Validate.isNotEmpty(params.keyword.declareDateStart)) {
      query['declareDateStart'] = params.keyword.declareDateStart
    }
    if (Validate.isNotEmpty(params.keyword.declareDateEnd)) {
      query['declareDateEnd'] = params.keyword.declareDateEnd
    }
    if (Validate.isNotEmpty(params.keyword.costDeclare)) {
      query['costDeclare'] = params.keyword.costDeclare
    }
    if (Validate.isNotEmpty(params.keyword.note)) {
      query['note'] = params.keyword.note
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // if (Validate.isNotEmpty(params.keyword.ledgerBankIds)) {
    //   query['ledgerBankIds'] = params.keyword.ledgerBankIds
    // }

    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_CUSTOMS_MANUAL_001',
        params: {
          ...query
        },
        page: {
          startRow: params.page * params.size,
          endRow: params.size
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  },
  get(id) {
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_CUSTOMS_MANUAL_001',
        params: {
          manualId: id
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsManual/selectHeaderAndLines',
      method: 'post',
      data
    }).then(res => {
      if (res.data && res.data.data && res.data.data.customsItem) {
        res.data.data.customsItem.forEach((innerItem) => {
          innerItem.isMainMaterial = Number.parseInt(innerItem.isMainMaterial) === 1
        })
      }
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.ledgerBank = data.ledgerBankId ? {
      id: data.ledgerBankId
    } : null
    delete param.ledgerBankId
    return request({
      url: '/api/clearance-manuals',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.ledgerBank = data.ledgerBankId ? {
      id: data.ledgerBankId
    } : null
    delete param.ledgerBankId
    return request({
      url: '/api/clearance-manuals',
      method: 'put',
      data: param
    })
  },
  // 头行一起删除
  delete(id) {
    const data = {
      dataSet: {
        name: 'data',
        params: {
          manualId: id
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsManual/deletedHeaderAndLines',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  },
  // 新增
  add(params) {
    params['entid'] = parseInt(localStorage.getItem('entid'))
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_CUSTOMS_MANUAL_002',
        keyField: 'manual_id',
        rows: [
          params
        ]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsManual/insertHeaderAndLines',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  },
  // 编辑
  edit(params) {
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_CUSTOMS_MANUAL_003',
        rows: [
          params
        ]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsManual/updateHeaderAndLines',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  }
}
