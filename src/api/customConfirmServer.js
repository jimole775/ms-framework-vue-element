import request from '@/utils/request'
import Validate from '@/utils/validate.js'
export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.code)) {
      query['billNo'] = params.keyword.code
    }
    if (Validate.isNotEmpty(params.keyword.createOrderMan)) {
      query['createUser'] = params.keyword.createOrderMan
    }
    if (Validate.isNotEmpty(params.keyword.createOrderTimeStart)) {
      query['startDate'] = params.keyword.createOrderTimeStart
    }
    if (Validate.isNotEmpty(params.keyword.createOrderTimeEnd)) {
      query['endDate'] = params.keyword.createOrderTimeEnd
    }
    if (Validate.isNotEmpty(params.keyword.status)) {
      query['stat'] = params.keyword.status.join(',')
    }
    if (Validate.isNotEmpty(params.keyword.commercialInvoiceCode)) {
      query['factInvoiceNo'] = params.keyword.commercialInvoiceCode
    }
    if (Validate.isNotEmpty(params.keyword.contractCode)) {
      query['pinoNew'] = params.keyword.contractCode
    }
    if (Validate.isNotEmpty(params.keyword.salesMan)) {
      query['bisalesUserIdllNo'] = params.keyword.salesMan
    }
    if (Validate.isNotEmpty(params.keyword.salesDepartment)) {
      query['orgName'] = params.keyword.salesDepartment
    }
    if (Validate.isNotEmpty(params.keyword.customer)) {
      query['custName'] = params.keyword.customer
    }
    if (Validate.isNotEmpty(params.keyword.custCode)) {
      query['custCode'] = params.keyword.custCode
    }
    if (Validate.isNotEmpty(params.keyword.remark)) {
      query['note'] = params.keyword.remark
    }
    if (Validate.isNotEmpty(params.keyword.commercialInvoiceIds)) {
      query['invoiceNo'] = params.keyword.commercialInvoiceIds
    }
    query['warnStat'] = params.keyword.confirm ? 1 : 0
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BILL_INVOICE_CONFIRM_001',
        params: query,
        page: {
          startRow: params.page * params.size, // 起始行
          endRow: params.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: dataTo
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        item.code = item.billNo
        item.createOrderTime = item.createDate
        item.createOrderMan = item.createUser
        if (item.stat != null) {
          item.status = item.stat
        }
        item.commercialInvoiceCode = item.factInvoiceNo
        item.contractCode = item.pinoNew
        item.salesMan = item.salesUserId
        item.salesDepartment = item.orgName
        item.customer = item.custName
        item.custCode = item.custCode
        item.commercialInvoiceId = item.invoiceNo
        item.remark = item.note
        item.operateUnitId = item.entId
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['billId'] = id
    }
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BILL_INVOICE_CONFIRM_001',
        params: query,
        page: {
          startRow: 0, // 起始行
          endRow: 1 // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: dataTo
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        item.code = item.billNo
        item.createOrderTime = item.createDate
        item.createOrderMan = item.createUser
        if (item.stat != null) {
          item.status = item.stat
        }
        item.commercialInvoiceCode = item.factInvoiceNo
        item.contractCode = item.pinoNew
        item.salesMan = item.salesUserId
        item.salesDepartment = item.orgName
        item.salesDepartmentCode = item.orgCode
        item.customer = item.custName
        item.customerCode = item.custCode
        item.commercialInvoiceId = item.invoiceNo
        item.remark = item.note
        item.operateUnitId = item.entId
        item.isXiugai = item.isXiugai === 2
      })
      return res.data.data.dataSet.rows[0]
    })
  },
  post(data) {
    const query = {}
    query['entId'] = data.entid
    query['factInvoiceNo'] = data.commercialInvoiceCode
    query['pinoNew'] = data.contractCode
    query['invoiceNo'] = data.commercialInvoiceId
    query['invoiceId'] = data.invoiceId
    query['salesUserId'] = data.salesMan
    query['orgName'] = data.salesDepartment
    query['orgCode'] = data.salesDepartmentCode
    query['custName'] = data.customer
    query['custCode'] = data.customerCode
    query['shipType'] = data.shipType
    query['origin'] = data.origin
    query['originCertificate'] = data.originCertificate
    query['note'] = data.remark
    query['$state'] = 1
    query['deleted'] = 0
    query['isXiugai'] = data.isXiugai ? 2 : 1
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BILL_INVOICE_CONFIRM_002',
        keyField: 'billId',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBillInvoiceConfirm/addBillConfirm',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data.data
    })
  },
  put(data) {
    const query = {}
    query['factInvoiceNo'] = data.commercialInvoiceCode
    query['pinoNew'] = data.contractCode
    query['invoiceNo'] = data.commercialInvoiceId
    query['invoiceId'] = data.invoiceId
    query['salesUserId'] = data.salesMan
    query['orgName'] = data.salesDepartment
    query['orgCode'] = data.salesDepartmentCode
    query['custName'] = data.customer
    query['custCode'] = data.customerCode
    query['shipType'] = data.shipType
    query['origin'] = data.origin
    query['originCertificate'] = data.originCertificate
    query['note'] = data.remark
    query['billId'] = data.billId
    query['$state'] = 2
    query['deleted'] = 0
    query['isXiugai'] = data.isXiugai ? 2 : 1
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BILL_INVOICE_CONFIRM_003',
        keyField: 'billId',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBillInvoiceConfirm/updateBillConfirm',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data.data
    })
  },
  delete(data) {
    const query = {}
    query['billId'] = data.billId
    query['$state'] = 3
    query['deleted'] = 1
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BILL_INVOICE_CONFIRM_003',
        keyField: 'billId',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBillInvoiceConfirm/updateBillConfirm',
      method: 'post',
      data: dataTo
    }).then(res => {
    })
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
}
