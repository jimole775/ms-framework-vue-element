import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(params) {
    const query = {}
    // 设置传参格式
    if (Validate.isNotEmpty(params.keyword.code)) {
      query['invoiceNo'] = params.keyword.code
    }
    if (Validate.isNotEmpty(params.keyword.saleDepartmentName)) {
      query['orgName'] = params.keyword.saleDepartmentName
    }
    if (Validate.isNotEmpty(params.keyword.salesman)) {
      query['salesUserId'] = params.keyword.salesman
    }
    if (Validate.isNotEmpty(params.keyword.status)) {
      query['stat'] = params.keyword.status
    }
    if (Validate.isNotEmpty(params.keyword.noticeCode)) {
      query['noticeNo'] = params.keyword.noticeCode
    }
    if (Validate.isNotEmpty(params.keyword.piCode)) {
      query['piNo'] = params.keyword.piCode
    }
    if (Validate.isNotEmpty(params.keyword.contractCode)) {
      query['pinoNew'] = params.keyword.contractCode
    }
    if (Validate.isNotEmpty(params.keyword.commercialInvoiceCode)) {
      query['factInvoiceNo'] = params.keyword.commercialInvoiceCode
    }
    if (Validate.isNotEmpty(params.keyword.customer)) {
      query['custName'] = params.keyword.customer
    }
    if (Validate.isNotEmpty(params.keyword.submitOrderCode)) {
      query['tdOrder'] = params.keyword.submitOrderCode
    }
    if (Validate.isNotEmpty(params.keyword.createUser)) {
      query['createUser'] = params.keyword.createUser
    }
    if (Validate.isNotEmpty(params.keyword.billType)) {
      query['billType'] = params.keyword.billType
    }
    if (Validate.isNotEmpty(params.keyword.invoiceNo)) {
      query['invoiceNo'] = params.keyword.invoiceNo
    }
    if (Validate.isNotEmpty(params.keyword.stat)) {
      query['stat'] = params.keyword.stat
    }
    if (Validate.isNotEmpty(params.keyword.mergingSplitType)) {
      query['mergingSplitType'] = params.keyword.mergingSplitType
    }
    if (Validate.isNotEmpty(params.keyword.custId)) {
      query['custId'] = params.keyword.custId
    }
    // query['billType'] = 1
    if (Validate.isNotEmpty(params.keyword.tbStat)) {
      query['tbStat'] = params.keyword.tbStat
    }
    if (Validate.isNotEmpty(params.keyword.isRed)) {
      query['isRed'] = params.keyword.isRed
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    const data = {
      dataSet: {
        name: 'data',
        params: {
          ...query
        },
        page: {
          startRow: params.page * params.size, // 起始行
          endRow: params.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBill/doSearch',
      method: 'post',
      data
    }).then(res => {
      res.data.data.data.forEach(item => {
        item.code = item.invoiceNo
        item.saleDepartment = item.orgName
        item.salesman = item.salesUserId
        item.status = item.stat
        item.noticeCode = item.noticeNos
        item.piCode = item.piNo
        item.contractCode = item.pinoNew
        item.typeTrade = item.saleEntType // 贸易类型
        item.commercialInvoiceCode = item.factInvoiceNo
        item.shippingMethod = item.shipType
        item.currency = item.currencyCode
        item.paymentMethod = item.paymentTypeName
        item.customer = item.custName
        item.priceAgreement = item.priceTypeName
        item.goodsAmount = item.sendAmt
        item.invoiceAmount = item.invoiceAmt
        item.returnAmount = item.hkAmt
        item.lcNo = item.lcNo // 信用证号
        item.notTtPrice = item.noTtAmt // 非TT金额
        item.whxAmount = item.noTtAmt // 未核销总额 与非TT金额值相同
        item.verificationAmount = item.ttAmt
        item.ttCheckAmt = item.ttCheckAmt
        item.verificationComplete = item.isCheckOver
        item.orderAmount = item.jdTotalamt
        item.invoiceValidityTime = item.lastInvoiceDate
        item.invoiceRegistrationTime = item.fpjzDate
        item.deliverTime = item.actualShipDate
        item.accountant = item.dname
        item.toPortTime = item.arrivalDate
        item.submitOrderTime = item.tdDate
        item.predictReturnMoneyTime = item.preReturnDate
        item.expressCode = item.ktOrder
        item.submitOrderCode = item.tdOrder
        item.deliveryOrderTime = item.jdDate
        item.collectMoneyTime = item.actualReturnDate
        item.deliveryOrderNotConform = item.jdNote
        item.remark = item.note
        item.entid = item.entid // 经营单位 后台提供了 entid
      })
      return res
    })
  },
  get(id) {
    const query = {}
    query['invoiceId'] = parseInt(id)
    const data = {
      dataSet: {
        name: 'data',
        params: {
          ...query
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBill/doSelectOne',
      method: 'post',
      data
    }).then(res => {
      if (Number.parseInt(res.data.code) === 200) {
        res.data.data.header.isCheckOver = res.data.data.header.isCheckOver === 2
      }
      return res.data
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/commercial-invoices',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/commercial-invoices',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    const query = {}
    query['invoiceId'] = parseInt(id)
    const data = {
      dataSet: {
        name: 'data',
        params: {
          ...query
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBill/doDelete',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  },
  getOrderNo(id) {
    const query = {}
    query['warnNo'] = id
    const data = {
      dataSet: {
        name: 'sqlWhere',
        params: {
          ...query
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/getDeliveryNotice',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  },
  save(data) {
    data.dataSet.params.header.isCheckOver = data.dataSet.params.header.isCheckOver ? 2 : 1
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBill/doUpdate',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  },
  submit(params) {

  },
  // 模糊查询
  doSearch(data) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBill/doSearch',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  },
  // 会计区间
  getAccountingInterval(data) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinBudPeriod/doSearch',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  },
  // 根据商业发票号 查询是否存在 特殊单据
  getBillsId(params) {
    const data = {
      dataSet: {
        name: 'data',
        params: {
          ...params
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBill/doSelectOneByInvoiceNo',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  },
  // 跳转提单放单
  getTDFD(params) {
    const data = {
      dataSet: {
        name: 'data',
        params: {
          ...params
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBill/doSelectOneTDDF',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  },
  doSplitBox(data) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBillSplit/doSplitBox',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          params: data
        }
      }
    }).then(res => {
      return res
    })
  },
  supportList(param) {
    const data = {
      dataSet: {
        name: 'data',
        params: {
          ...param,
          methodCode: 'oms_011'
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBoxExport/invoiceExcelExport',
      method: 'post',
      data
    })
  },
}
