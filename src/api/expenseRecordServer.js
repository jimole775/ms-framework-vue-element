import request from '@/utils/request'
import Validate from '@/utils/validate.js'
export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.code)) {
      query['regNo'] = params.keyword.code
    }
    if (Validate.isNotEmpty(params.keyword.shipmentNotice)) {
      query['warnNo'] = params.keyword.shipmentNotice
    }
    if (Validate.isNotEmpty(params.keyword.contractCode)) {
      query['piNo'] = params.keyword.contractCode
    }
    if (Validate.isNotEmpty(params.keyword.status)) {
      query['stat'] = params.keyword.status
    }
    if (Validate.isNotEmpty(params.keyword.paymentMethod)) {
      query['payStyle'] = parseInt(params.keyword.paymentMethod)
    }
    if (Validate.isNotEmpty(params.keyword.invoiceCode)) {
      query['invoiceNos'] = params.keyword.invoiceCode
    }
    if (Validate.isNotEmpty(params.keyword.userType)) {
      query['userType'] = params.keyword.userType
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'salePayregInfo',
        config: 'ACT_SPD_SALEPAYREG_HEADERS_001', 
        keyField: 'reg_id', 
        params: { ...query },
        page: {
          startRow: params.page * params.size, // 起始行
          endRow: params.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/salePayreg',
      method: 'post',
      data: dataTo 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        if (item.stat !== null) {
          item.status = item.stat.toString()
        }
        item.code = item.regNo
        item.shipmentNotice = item.warnNo
        item.contractCode = item.piNo
        if (item.payStyle) {
          item.paymentMethod = item.payStyle.toString()
        }
        item.departmentId = item.orgName
        item.customerId = item.custCode
        item.createMan = item.createUser
        item.createTime = item.createDate
        item.remark = item.note
        item.amount = item.totalAmt
        item.invoiceCode = item.invoiceNos
        if (item.transitNames) {
          item.transitNames = item.transitNames.replace(/'/g, '')
        }
        item.operateUnitId = item.entid
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['regId'] = id
    }
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'salePayregInfo',
        config: 'ACT_SPD_SALEPAYREG_HEADER_001', 
        keyField: 'reg_id', 
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/salePayreg',
      method: 'post',
      data: dataTo 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        if (item.stat) {
          item.stat = item.stat.toString()
        }
        item.isLogisticsPayed = item.isLogisticsPayed === 1
        item.courierNumber = item.expressNo
        item.operateUnitId = item.entid
        item.remark = item.note
        if (item.payStyle) {
          item.payStyle = item.payStyle.toString()
        }
        item.code = item.regNo
        for (let i = 0; i < item.lines.length; i++) {
          item.lines[i].isDocumentsCost = item.lines[i].isDocumentsCost === 1
          item.lines[i].isEwfee = item.lines[i].isEwfee === 2
          item.lines[i].isPay = item.lines[i].isPay === 2
        }
      })
      return res.data.data.dataSet.rows[0]
    })
  },
  findHadRecord(id) {
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['warnId'] = id
    }
    // 设置传参格式
    const dataTo = {
      params: { ...query }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/getRegisteredSalePayreg',
      method: 'post',
      data: dataTo 
    }).then(res => {
      if (res.data.data) {
        res.data.data.forEach(item => {
          item.isDocumentsCost = item.isDocumentsCost === 1
          item.isEwfee = item.isEwfee === 2
          item.isPay = item.isPay === 2
        })
      } 
      return res
    })
  },
  post(data1, data2, id) {
    const line = [...data2]
    let invoiceNos = ''
    const query = {}
    if (Validate.isNotEmpty(data1.warnNo)) {
      query['warnNo'] = data1.warnNo
    }
    if (Validate.isNotEmpty(id)) {
      query['warnId'] = parseInt(id)
    }
    if (Validate.isNotEmpty(data1.payStyle)) {
      query['payStyle'] = parseInt(data1.payStyle)
    }
    if (Validate.isNotEmpty(data1.piNo)) {
      query['piNo'] = data1.piNo
    }
    if (Validate.isNotEmpty(data1.courierNumber)) {
      query['expressNo'] = data1.courierNumber
    }
    if (Validate.isNotEmpty(data1.orgCode)) {
      query['orgCode'] = data1.orgCode
    }
    if (Validate.isNotEmpty(data1.orgName)) {
      query['orgName'] = data1.orgName
    }
    if (Validate.isNotEmpty(data1.orgId)) {
      query['orgId'] = data1.orgId
    }
    if (Validate.isNotEmpty(data1.custId)) {
      query['custId'] = data1.custId
    }
    if (Validate.isNotEmpty(data1.custCode)) {
      query['custCode'] = data1.custCode
    }
    if (Validate.isNotEmpty(data1.custName)) {
      query['custName'] = data1.custName
    }
    if (Validate.isNotEmpty(data1.invoiceContact)) {
      query['invoiceContact'] = data1.invoiceContact
    }
    if (Validate.isNotEmpty(data1.isLogisticsPayed)) {
      data1.isLogisticsPayed = data1.isLogisticsPayed ? 1 : 0
      query['isLogisticsPayed'] = data1.isLogisticsPayed
    }
    if (Validate.isNotEmpty(data1.remark)) {
      query['note'] = data1.remark
    }
    if (Validate.isNotEmpty(data1.areaName)) {
      query['areaName'] = data1.areaName
    }
    query['entid'] = parseInt(localStorage.getItem('entid'))
    query['$state'] = 1
    query['deleted'] = 0
    let amtCny = 0
    let amtUsd = 0
    let amt1Cny = 0
    let amt1Usd = 0
    let amt2Cny = 0
    let amt2Usd = 0
    for (let i = 0; i < line.length; i++) {
      if (line[i].currencyCode === 'CNY') {
        amtCny += line[i].amt
        if (line[i].payObject === 1) {
          amt1Cny += line[i].amt
        }
        if (line[i].payObject === 2) {
          amt2Cny += line[i].amt
        }
      }
      if (line[i].invoiceNo !== '' && line[i].invoiceNo !== null) {
        invoiceNos += line[i].invoiceNo + ','
      }
      if (i > 0 && i === (line.length - 1)) {
        if (line[i].invoiceNo !== '' && line[i].invoiceNo !== null) {
          invoiceNos += line[i].invoiceNo
        }
      }
      line[i].seq	 = i + 1
      if (line[i].currencyCode === 'USD') {
        amtUsd += line[i].amt
        if (line[i].payObject === 1) {
          amt1Usd += line[i].amt
        }
        if (line[i].payObject === 2) {
          amt2Usd += line[i].amt
        }
      }
      if (typeof line[i].isDocumentsCost === 'boolean') {
        line[i].isDocumentsCost = line[i].isDocumentsCost ? 1 : 2
      }
      if (typeof line[i].isEwfee === 'boolean') {
        line[i].isEwfee = line[i].isEwfee ? 2 : 1
      }
      if (typeof line[i].isPay === 'boolean') {
        line[i].isPay = line[i].isPay ? 2 : 1
      }
    }
    query['invoiceNos'] = invoiceNos
    // 总金额
    query['totalAmt'] = 'CNY :' + amtCny + '、' + 'USD :' + amtUsd 
    // 协代金额
    query['dealAmt'] = 'CNY :' + amt1Cny + '、' + 'USD :' + amt1Usd
    // 指代金额
    query['assignAmt'] = 'CNY :' + amt2Cny + '、' + 'USD :' + amt2Usd
    query['lines'] = line
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'salePayregInfo',
        config: 'ACT_SPD_SALEPAYREG_HEADER_001',
        keyField: 'reg_id',
        rows: [query],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/salePayreg',
      method: 'post',
      data: dataTo 
    }).then(res => {
      console.log('post:', res)
      return res.data.data.dataSet
    })
  },
  put(data1, data2, data3, id) {
    const line1Add = []
    const line = [...data2]
    const oldline = [...data3]
    let invoiceNos = ''
    const query = {}
    if (Validate.isNotEmpty(data1.warnNo)) {
      query['warnNo'] = data1.warnNo
    }
    if (Validate.isNotEmpty(id)) {
      query['warnId'] = parseInt(id)
    }
    if (Validate.isNotEmpty(data1.payStyle)) {
      query['payStyle'] = parseInt(data1.payStyle)
    }
    if (Validate.isNotEmpty(data1.piNo)) {
      query['piNo'] = data1.piNo
    }
    if (Validate.isNotEmpty(data1.courierNumber)) {
      query['expressNo'] = data1.courierNumber
    }
    if (Validate.isNotEmpty(data1.orgCode)) {
      query['orgCode'] = data1.orgCode
    }
    if (Validate.isNotEmpty(data1.orgName)) {
      query['orgName'] = data1.orgName
    }
    if (Validate.isNotEmpty(data1.orgId)) {
      query['orgId'] = data1.orgId
    }
    if (Validate.isNotEmpty(data1.custId)) {
      query['custId'] = data1.custId
    }
    if (Validate.isNotEmpty(data1.custCode)) {
      query['custCode'] = data1.custCode
    }
    if (Validate.isNotEmpty(data1.custName)) {
      query['custName'] = data1.custName
    }
    if (Validate.isNotEmpty(data1.invoiceContact)) {
      query['invoiceContact'] = data1.invoiceContact
    }
    if (Validate.isNotEmpty(data1.isLogisticsPayed)) {
      data1.isLogisticsPayed = data1.isLogisticsPayed ? 1 : 0
      query['isLogisticsPayed'] = data1.isLogisticsPayed
    }
    if (Validate.isNotEmpty(data1.remark)) {
      query['note'] = data1.remark
    }
    if (Validate.isNotEmpty(data1.areaName)) {
      query['areaName'] = data1.areaName
    }
    // query['entid'] = data1.entid
    query['$state'] = 2
    query['deleted'] = 0
    query['regId'] = data1.regId
    query['reg_id'] = data1.regId
    let amtCny = 0
    let amtUsd = 0
    let amt1Cny = 0
    let amt1Usd = 0
    let amt2Cny = 0
    let amt2Usd = 0
    for (let i = 0; i < line.length; i++) {
      if (line[i].currencyCode === 'CNY') {
        amtCny += line[i].amt
        if (line[i].payObject === 1) {
          amt1Cny += line[i].amt
        }
        if (line[i].payObject === 2) {
          amt2Cny += line[i].amt
        }
      }
      if (line[i].invoiceNo !== '' && line[i].invoiceNo !== null) {
        invoiceNos += line[i].invoiceNo + ','
      }
      if (i > 0 && i === (line.length - 1)) {
        if (line[i].invoiceNo !== '' && line[i].invoiceNo !== null) {
          invoiceNos += line[i].invoiceNo
        }
      }
      line[i].seq	 = i + 1
      if (line[i].currencyCode === 'USD') {
        amtUsd += line[i].amt
        if (line[i].payObject === 1) {
          amt1Usd += line[i].amt
        }
        if (line[i].payObject === 2) {
          amt2Usd += line[i].amt
        }
      }
      if (typeof line[i].isDocumentsCost === 'boolean') {
        line[i].isDocumentsCost = line[i].isDocumentsCost ? 1 : 2
      }
      if (typeof line[i].isEwfee === 'boolean') {
        line[i].isEwfee = line[i].isEwfee ? 2 : 1
      }
      if (typeof line[i].isPay === 'boolean') {
        line[i].isPay = line[i].isPay ? 2 : 1
      }
    }
    for (let i = 0; i < line.length; i++) {
      if (!line[i].lineId) {
        line1Add.push(line[i])
      } 
    }
    for (let i = 0; i < oldline.length; i++) {
      oldline[i].deleted = 1
      if (typeof oldline[i].isDocumentsCost === 'boolean') {
        oldline[i].isDocumentsCost = oldline[i].isDocumentsCost ? 1 : 2
      }
      if (typeof oldline[i].isEwfee === 'boolean') {
        oldline[i].isEwfee = oldline[i].isEwfee ? 2 : 1
      }
      if (typeof oldline[i].isPay === 'boolean') {
        oldline[i].isPay = oldline[i].isPay ? 2 : 1
      }
      for (let j = 0; j < line.length; j++) {
        if (oldline[i].lineId === line[j].lineId) {
          oldline[i] = line[j]
          oldline[i].deleted = 0
          break
        }
      }
    }
    query['invoiceNos'] = invoiceNos
    // 总金额
    query['totalAmt'] = 'CNY :' + amtCny + '、' + 'USD :' + amtUsd 
    // 协代金额
    query['dealAmt'] = 'CNY :' + amt1Cny + '、' + 'USD :' + amt1Usd
    // 指代金额
    query['assignAmt'] = 'CNY :' + amt2Cny + '、' + 'USD :' + amt2Usd
    query['lines'] = line1Add
    query['linesUpD'] = oldline
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'salePayregInfo',
        config: 'ACT_SPD_SALEPAYREG_HEADER_001',
        keyField: 'reg_id',
        rows: [query],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/salePayreg',
      method: 'post',
      data: dataTo 
    }).then(res => {
      return res.data.data.dataSet
    })
  },
  delete(data) {
    const query = {}
    query['regId'] = data.regId
    query['$state'] = 2
    query['deleted'] = 1
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'salePayregInfo',
        config: 'ACT_SPD_SALEPAYREG_HEADER_001',
        keyField: 'reg_id',
        rows: [query],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/salePayreg',
      method: 'post',
      data: dataTo 
    }).then(res => {
    })
  },
  findCompany(data1, data2) { 
    const query = {}
    if (Validate.isNotEmpty(data1)) {
      query['warnId'] = data1
    }
    // query['warnId'] = 528888 
    if (Validate.isNotEmpty(data2)) {
      query['payStyle'] = data2
    }
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'condition',
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/querySupplierName',
      method: 'post',
      data: dataTo 
    }).then(res => {
      return res
    })
  },
  appontedIsPay(val) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSendMsg/sendHasPayedMsgToWeChat',
      method: 'post',
      data: {
        params: {
          regId: val
        }
      } 
    }).then(res => {
      return res.data
    })
  },
  getFreightId(companyName) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/getMaxStdIdByTransitName',
      method: 'post',
      data: {
        params: {
          transitName: companyName // 货代船公司名称
        }
      } 
    }).then(res => {
      return res.data.data
    })
  },
  valid(piNo) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/getBookingNote',
      method: 'post',
      data: {
        params: {
          piNo: piNo // 合同号
        }
      }
    }).then(res => {
      return res.data
    })
  },
}
