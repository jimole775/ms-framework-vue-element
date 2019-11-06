import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    // 设置传参格式
    if (Validate.isNotEmpty(param.keyword.code)) {
      query['corpserialno'] = param.keyword.code
    }
    if (Validate.isNotEmpty(param.keyword.status)) {
      query['stat'] = param.keyword.status
    }
    if (Validate.isNotEmpty(param.keyword.buyCustomerIds)) {
      query['corpbuyerno'] = param.keyword.buyCustomerIds
    }
    if (Validate.isNotEmpty(param.keyword.commercialInvoiceIds)) {
      query['invoiceno'] = param.keyword.commercialInvoiceIds
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    const data = {
      params: { ...query },
      page: {
        startRow: param.page * param.size, // 起始行
        endRow: param.size // 每页条数
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiShipmentalterapplyinfo/queryEdiShipmentalterapplyinfo',
      method: 'post',
      data
    }).then(res => {
      res.data.data.data.forEach(item => {
        item.code = item.corpserialno
        item.status = item.stat
        item.invoiceAmount = item.invoicesum
        item.insuranceAmount = item.insuresum
        item.shipmentDate = item.transportdate
        item.customGoodsCode = item.code10
        item.customGoodsName = item.goodsname
        item.goodsName = item.goodsname
        item.transportationMode = item.trafficcode
        item.contractPaymentMethod = item.paymode
        item.contractPaymentDeadline = item.payterm + '天'
        item.paymentMethod = item.feepaymode
        item.contractCode = item.contractno
        item.clearanceGoodsCode = item.customsbillno
        item.billLadingCode = item.transportbillno
        item.salesman = item.employeename
        item.payer = item.payername
        item.securityAmount = item.premium
        item.expenseRatio = item.premiumrate
        item.notTtAmount = item.inv_nottamt
        item.specialRemark = item.remark
        item.returnReason = item.unacceptreason
        item.uncertainAmountReason = item.not_note
        item.buyCustomerId = item.corpbuyerno
        item.departmentId = item.corpbuyerno
        item.openAccountBankId = item.corpbankno
        item.commercialInvoiceId = item.invoiceno
        item.currencyId = item.moneyid
      })
      return res
    })
  },
  get(id) {
    const query = {}
    query['corpserialid'] = id
    const data = {
      params: { ...query }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiShipmentalterapplyinfo/queryEdiShipmentalterapplyinfo',
      method: 'post',
      data
    }).then(res => {
      res.data.data.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.code = item.corpserialno
        item.status = item.stat
        item.invoiceAmount = item.invoicesum
        item.insuranceAmount = item.insuresum
        item.shipmentDate = item.transportdate
        item.customGoodsCode = item.code10
        item.customGoodsName = item.goodsname
        item.goodsName = item.goodsname
        item.transportationMode = item.trafficcode
        item.contractPaymentMethod = item.paymode
        item.contractPaymentDeadline = item.payterm
        item.paymentMethod = item.feepaymode
        item.contractCode = item.contractno
        item.clearanceGoodsCode = item.customsbillno
        item.billLadingCode = item.transportbillno
        item.salesman = item.employeename
        item.payer = item.payername
        item.securityAmount = item.premium
        item.expenseRatio = item.premiumrate
        item.notTtAmount = item.inv_nottamt
        item.specialRemark = item.remark
        item.returnReason = item.unacceptreason
        item.uncertainAmountReason = item.not_note
        item.buyCustomerId = item.corpbuyerno
        item.departmentId = item.corpbuyerno
        item.openAccountBankId = item.corpbankno
        item.commercialInvoiceId = item.invoiceno
        item.currencyId = item.moneyid
      })
      return res.data.data[0]
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.buyCustomer = data.buyCustomerId ? {
      id: data.buyCustomerId
    } : null
    delete param.buyCustomerId
    param.department = data.departmentId ? {
      id: data.departmentId
    } : null
    delete param.departmentId
    param.openAccountBank = data.openAccountBankId ? {
      id: data.openAccountBankId
    } : null
    delete param.openAccountBankId
    param.commercialInvoice = data.commercialInvoiceId ? {
      id: data.commercialInvoiceId
    } : null
    delete param.commercialInvoiceId
    param.currency = data.currencyId ? {
      id: data.currencyId
    } : null
    delete param.currencyId
    return request({
      url: '/api/deliver-reports',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.buyCustomer = data.buyCustomerId ? {
      id: data.buyCustomerId
    } : null
    delete param.buyCustomerId
    param.department = data.departmentId ? {
      id: data.departmentId
    } : null
    delete param.departmentId
    param.openAccountBank = data.openAccountBankId ? {
      id: data.openAccountBankId
    } : null
    delete param.openAccountBankId
    param.commercialInvoice = data.commercialInvoiceId ? {
      id: data.commercialInvoiceId
    } : null
    delete param.commercialInvoiceId
    param.currency = data.currencyId ? {
      id: data.currencyId
    } : null
    delete param.currencyId
    return request({
      url: '/api/deliver-reports',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    const query = {
      corpserialid: id,
    }
    const data = {
      params: {
        ...query
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiShipmentalterapplyinfo/deleteEdiShipmentalterapplyinfo',
      method: 'post',
      data
    })
  },
  // 新增
  add(param) {
    param['entid'] = parseInt(localStorage.getItem('entid'))
    const data = {
      dataSet: {
        name: 'dataSet',
        config: 'ACT_SDP_EDI_SHIPMENTALTERAPPLYINFO_ADD',
        rows: [{
          ...param
        }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiShipmentalterapplyinfo/addEdiShipmentalterapplyinfo',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  },
  // 修改/编辑
  update(param) {
    const data = {
      dataSet: {
        name: 'dataSet',
        config: 'ACT_SDP_EDI_SHIPMENTALTERAPPLYINFO_UPDATE',
        rows: [{
          ...param
        }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiShipmentalterapplyinfo/updateEdiShipmentalterapplyinfo',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  }
}
