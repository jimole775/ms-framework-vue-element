import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(params) {
    const query = {}
    // 设置传参格式
    if (Validate.isNotEmpty(params.keyword.code)) {
      query['corpserialno'] = params.keyword.code
    }
    if (Validate.isNotEmpty(params.keyword.invoiceno)) {
      query['invoiceno'] = params.keyword.invoiceno
    }
    if (Validate.isNotEmpty(params.keyword.status)) {
      query['stat'] = params.keyword.status
    }
    if (Validate.isNotEmpty(params.keyword.createTime)) {
      query['createDate'] = params.keyword.createTime
    }
    if (Validate.isNotEmpty(params.keyword.buyerName)) {
      query['buyerengname'] = params.keyword.buyerName
    }
    if (Validate.isNotEmpty(params.keyword.damageReason)) {
      query['plreasoncode'] = params.keyword.damageReason
    }
    if (Validate.isNotEmpty(params.keyword.corpserialno)) {
      query['corpserialno'] = params.keyword.corpserialno
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    const data = {
      params: {
        ...query
      },
      page: {
        startRow: params.page * params.size, // 起始行
        endRow: params.size // 每页条数
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiPlnotice/querySdpEdiPlnotice',
      method: 'post',
      data
    }).then(res => {
      res.data.data.data.forEach(item => {
        item.code = item.corpserialno
        item.status = item.stat
        item.createMan = item.createUser
        item.createTime = item.createDate
        item.creditCertificateShift = item.bizopenbankno
        item.openAccountBankName = item.openbankengname
        item.customer = item.custName
        item.openAccountBankAddress = item.openbankaddress
        item.buyerName = item.buyerengname
        item.confirmingBankShift = item.bizexbankno
        item.confirmingBankName = item.exbankengname
        item.confirmingBankAddress = item.exbankaddress
        item.buyerAddress = item.buyerengaddress
        item.damageReason = item.plreasoncode
        item.explain = item.plreasondesc
        item.measures = item.adoptmeasure
        item.commissionCollectionArrears = item.troverflag
        item.tradeFinance = item.financeflag
        item.transferAgreementClaimRight = item.ifinsuranturge
        item.indemnityTransferAgreement = item.detainflag
        item.demandPaymentFromConfirmingBank = item.ifbankurge
        item.billTransferAgreement = item.ifarf
        item.isDelete = item.deleted
        item.salesDepartment = item.shtname
        item.operateUnit = item.组织ID

        item.troverflag = item.troverflag === '1'
        item.financeflag = item.financeflag === '1'
        item.ifinsuranturge = item.ifinsuranturge === '1'
        item.detainflag = item.detainflag === '1'
        item.ifbankurge = item.ifbankurge === '1'
        item.ifarf = item.ifarf === '1'
      })
      return res
    })
  },
  get(id) {
    const query = {}
    query['corpserialid'] = parseInt(id)
    const data = {
      params: {
        ...query
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiPlnotice/querySdpEdiPlnoticeAndLine',
      method: 'post',
      data
    }).then(res => {
      if (Number.parseInt(res.data.code) === 200) {
        res.data.data.troverflag = res.data.data.troverflag === '1'
        res.data.data.financeflag = res.data.data.financeflag === '1'
        res.data.data.ifinsuranturge = res.data.data.ifinsuranturge === '1'
        res.data.data.detainflag = res.data.data.detainflag === '1'
        res.data.data.ifbankurge = res.data.data.ifbankurge === '1'
        res.data.data.ifarf = res.data.data.ifarf === '1'
      }
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.salesDepartment = data.salesDepartmentId ? {
      id: data.salesDepartmentId
    } : null
    delete param.salesDepartmentId
    param.buyer = data.buyerId ? {
      id: data.buyerId
    } : null
    delete param.buyerId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/damage-notices',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.salesDepartment = data.salesDepartmentId ? {
      id: data.salesDepartmentId
    } : null
    delete param.salesDepartmentId
    param.buyer = data.buyerId ? {
      id: data.buyerId
    } : null
    delete param.buyerId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/damage-notices',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    const data = {
      params: {
        corpserialid: id
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiPlnotice/deleteSdpEdiPlnoticeAndLine',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  },
  add(params) {
    params.troverflag = params.troverflag ? '1' : '0'
    params.financeflag = params.financeflag ? '1' : '0'
    params.ifinsuranturge = params.ifinsuranturge ? '1' : '0'
    params.detainflag = params.detainflag ? '1' : '0'
    params.ifbankurge = params.ifbankurge ? '1' : '0'
    params.ifarf = params.ifarf ? '1' : '0'
    params.entid = parseInt(localStorage.getItem('entid'))
    const data = {
      dataSet: {
        name: 'dataSet',
        config: 'ACT_SDP_EDI_PLNOTICE',
        rows: [
          {
            ...params
          }
        ]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiPlnotice/addSdpEdiPlnoticeAndLine',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  },
  edit(params) {
    params.troverflag = params.troverflag ? '1' : '0'
    params.financeflag = params.financeflag ? '1' : '0'
    params.ifinsuranturge = params.ifinsuranturge ? '1' : '0'
    params.detainflag = params.detainflag ? '1' : '0'
    params.ifbankurge = params.ifbankurge ? '1' : '0'
    params.ifarf = params.ifarf ? '1' : '0'

    const data = {
      dataSet: {
        name: 'dataSet',
        config: 'ACT_SDP_EDI_PLNOTICE',
        rows: [
          {
            ...params
          }
        ]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiPlnotice/updateSdpEdiPlnoticeAndLine',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  }
}
