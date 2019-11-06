import request from '@/utils/request'
import Validate from '@/utils/validate.js'
import { dateToDateStr } from '@/utils/datetime'
export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.payNo)) {
      query['payNo'] = params.keyword.payNo
    }
    if (Validate.isNotEmpty(params.keyword.payYear)) {
      query['payYear'] = params.keyword.payYear
    }
    if (Validate.isNotEmpty(params.keyword.stat)) {
      query['stat'] = params.keyword.stat.join(',')
    }
    if (Validate.isNotEmpty(params.keyword.payMonth)) {
      query['payMonth'] = params.keyword.payMonth
    }
    if (Validate.isNotEmpty(params.keyword.createUser)) {
      query['createUser'] = params.keyword.createUser
    }
    if (Validate.isNotEmpty(params.keyword.createDateStart)) {
      query['createDateStart'] = params.keyword.createDateStart
    }
    if (Validate.isNotEmpty(params.keyword.createDateEnd)) {
      query['createDateEnd'] = params.keyword.createDateEnd
    }
    if (Validate.isNotEmpty(params.keyword.totalAmtRmb)) {
      query['totalAmtRmb'] = parseFloat(params.keyword.totalAmtRmb)
    }
    if (Validate.isNotEmpty(params.keyword.totalAmt)) {
      query['totalAmt'] = parseFloat(params.keyword.totalAmt)
    }
    if (Validate.isNotEmpty(params.keyword.totalCheckAmt)) {
      query['totalCheckAmt'] = parseFloat(params.keyword.totalCheckAmt)
    }
    if (Validate.isNotEmpty(params.keyword.sapNo)) {
      query['sapNo'] = params.keyword.sapNo
    }
    if (Validate.isNotEmpty(params.keyword.note)) {
      query['note'] = params.keyword.note
    }
    if (Validate.isNotEmpty(params.keyword.transitName)) {
      query['transitName'] = params.keyword.transitName
    }
    if (Validate.isNotEmpty(params.keyword.supplierName)) {
      query['supplierName'] = params.keyword.supplierName
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLocalPayInfo',
        config: 'ACT_SDP_FIN_FEE_LOCAL_PAY_002',
        keyField: 'pay_id',
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
      data: dataTo
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        if (item.stat !== null) {
          item.stat = item.stat.toString()
          item.supplierName = item.venderName
        }
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['payId'] = id
    }
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLocalPayInfo',
        config: 'ACT_SDP_FIN_FEE_LOCAL_PAY_001',
        keyField: 'pay_id',
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeLocalPay/finFeeLocalPay',
      method: 'post',
      data: dataTo
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        if (item.stat !== null) {
          item.stat = item.stat.toString()
        }
        item.isYs = item.isYs === 2
        item.payYear = (item.payYear).toString()
        item.payMonth = (item.payMonth).toString()
        for (let i = 0; i < item.localPayLineAdd.length; i++) {
          item.localPayLineAdd[i].isYt = item.localPayLineAdd[i].isYt === 2
          item.localPayLineAdd[i].isTs = item.localPayLineAdd[i].isTs === 2
        }
      })
      return res.data.data.dataSet
    })
  },
  post(data1, data2, data3) {
    const line1 = [...data2]
    let needPayAmt = 0
    let needPayAmtRmb = 0
    let checkAgainAmt = 0
    for (let i = 0; i < line1.length; i++) {
      line1[i].seq = i + 1
      line1[i].payregCreateDate = dateToDateStr(line1[i].payregCreateDate)
      line1[i].deleted = 0
      needPayAmt += line1[i].amt
      needPayAmtRmb += line1[i].amtRmb
      checkAgainAmt += line1[i].checkAmt
    }
    const line2 = [...data3]
    for (let i = 0; i < line2.length; i++) {
      line2[i].seq = i + 1
      line2[i].preShipDate = dateToDateStr(line2[i].preShipDate)
      line2[i].isYt = line2[i].isYt ? 2 : 1
      line2[i].isTs = line2[i].isTs ? 2 : 1
      delete line2[i].lineId
      line2[i].deleted = 0
    }
    const query = {}
    query['totalAmt'] = needPayAmt
    query['totalAmtRmb'] = needPayAmtRmb
    query['totalCheckAmt'] = checkAgainAmt
    query['entid'] = parseInt(localStorage.getItem('entid'))
    query['stat'] = 1
    query['$state'] = 1
    query['deleted'] = 0
    if (Validate.isNotEmpty(data1.payYear)) {
      query['payYear'] = parseInt(data1.payYear)
    }
    if (Validate.isNotEmpty(data1.payMonth)) {
      query['payMonth'] = parseInt(data1.payMonth)
    }
    if (Validate.isNotEmpty(data1.bankCode)) {
      query['bankCode'] = data1.bankCode
    }
    if (Validate.isNotEmpty(data1.bankAccountOwer)) {
      query['bankAccountOwer'] = data1.bankAccountOwer
    }
    if (Validate.isNotEmpty(data1.bankAccountNum)) {
      query['bankAccountNum'] = data1.bankAccountNum
    }
    if (Validate.isNotEmpty(data1.bankName)) {
      query['bankName'] = data1.bankName
    }
    if (Validate.isNotEmpty(data1.currencyCode)) {
      query['currencyCode'] = data1.currencyCode
    }
    if (Validate.isNotEmpty(data1.feeType)) {
      query['feeType'] = data1.feeType
    }
    if (Validate.isNotEmpty(data1.payType)) {
      query['payType'] = data1.payType
    }
    if (Validate.isNotEmpty(data1.isYs)) {
      query['isYs'] = data1.isYs ? 2 : 1
    }
    if (Validate.isNotEmpty(data1.piNos)) {
      query['piNos'] = data1.piNos
    }
    if (Validate.isNotEmpty(data1.note)) {
      query['note'] = data1.note
    }
    if (Validate.isNotEmpty(data1.transitId)) {
      query['transitId'] = data1.transitId
    }
    if (Validate.isNotEmpty(data1.transitName)) {
      query['transitName'] = data1.transitName
    }
    if (Validate.isNotEmpty(data1.transitCode)) {
      query['transitCode'] = data1.transitCode
    }
    if (Validate.isNotEmpty(data1.venderId)) {
      query['venderId'] = data1.venderId
    }
    if (Validate.isNotEmpty(data1.applyDate)) {
      query['applyDate'] = data1.applyDate
    }
    query['localPayFpLineAdd'] = line1
    query['localPayLineAdd'] = line2
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLocalPayInfo',
        config: 'ACT_SDP_FIN_FEE_LOCAL_PAY_001',
        keyField: 'pay_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeLocalPay/finFeeLocalPay',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data
    })
  },
  put(data1, data2, data3, data4, data5) {
    const Oldline1 = [...data4]
    const Oldline2 = [...data5]
    const line1Add = []
    const line2Add = []
    const line1 = [...data2]
    let needPayAmt = 0
    let needPayAmtRmb = 0
    let checkAgainAmt = 0
    for (let i = 0; i < line1.length; i++) {
      line1[i].seq = i + 1
      line1[i].payregCreateDate = dateToDateStr(line1[i].payregCreateDate)
      line1[i].deleted = 0
      needPayAmt += line1[i].amt
      needPayAmtRmb += line1[i].amtRmb
      checkAgainAmt += line1[i].checkAmt
    }
    const line2 = [...data3]
    for (let i = 0; i < line2.length; i++) {
      line2[i].seq = i + 1
      line2[i].preShipDate = dateToDateStr(line2[i].preShipDate)
      line2[i].isYt = line2[i].isYt ? 2 : 1
      line2[i].isTs = line2[i].isTs ? 2 : 1
      line2[i].deleted = 0
    }
    for (let i = 0; i < line1.length; i++) {
      if (line1[i].payFpId == null) {
        line1Add.push(line1[i])
      }
    }
    for (let i = 0; i < line2.length; i++) {
      if (line2[i].payLineId == null) {
        line2Add.push(line2[i])
      }
    }
    for (let i = 0; i < Oldline1.length; i++) {
      Oldline1[i].deleted = 1
      delete Oldline1[i].payId
      for (let j = 0; j < line1.length; j++) {
        if (Oldline1[i].payFpId === line1[j].payFpId) {
          Oldline1[i] = line1[j]
          Oldline1[i].deleted = 0
          break
        }
      }
    }
    for (let i = 0; i < Oldline2.length; i++) {
      Oldline2[i].deleted = 1
      delete Oldline2[i].payId
      for (let j = 0; j < line2.length; j++) {
        if (Oldline2[i].payLineId === line2[j].payLineId) {
          Oldline2[i] = line2[j]
          Oldline2[i].deleted = 0
          break
        }
      }
    }
    const query = {}
    query['totalAmt'] = needPayAmt
    query['totalAmtRmb'] = needPayAmtRmb
    query['totalCheckAmt'] = checkAgainAmt
    query['payId'] = data1.payId
    query['payNo'] = data1.payNo
    // query['stat'] = 1
    query['$state'] = 2
    query['deleted'] = 0
    if (Validate.isNotEmpty(data1.payYear)) {
      query['payYear'] = parseInt(data1.payYear)
    }
    if (Validate.isNotEmpty(data1.payMonth)) {
      query['payMonth'] = parseInt(data1.payMonth)
    }
    if (Validate.isNotEmpty(data1.bankCode)) {
      query['bankCode'] = data1.bankCode
    }
    if (Validate.isNotEmpty(data1.bankAccountOwer)) {
      query['bankAccountOwer'] = data1.bankAccountOwer
    }
    if (Validate.isNotEmpty(data1.bankAccountNum)) {
      query['bankAccountNum'] = data1.bankAccountNum
    }
    if (Validate.isNotEmpty(data1.bankName)) {
      query['bankName'] = data1.bankName
    }
    if (Validate.isNotEmpty(data1.currencyCode)) {
      query['currencyCode'] = data1.currencyCode
    }
    if (Validate.isNotEmpty(data1.feeType)) {
      query['feeType'] = data1.feeType
    }
    if (Validate.isNotEmpty(data1.payType)) {
      query['payType'] = data1.payType
    }
    if (Validate.isNotEmpty(data1.isYs)) {
      query['isYs'] = data1.isYs ? 2 : 1
    }
    if (Validate.isNotEmpty(data1.piNos)) {
      query['piNos'] = data1.piNos
    }
    if (Validate.isNotEmpty(data1.note)) {
      query['note'] = data1.note
    }
    if (Validate.isNotEmpty(data1.transitId)) {
      query['transitId'] = data1.transitId
    }
    if (Validate.isNotEmpty(data1.transitName)) {
      query['transitName'] = data1.transitName
    }
    if (Validate.isNotEmpty(data1.transitCode)) {
      query['transitCode'] = data1.transitCode
    }
    if (Validate.isNotEmpty(data1.venderId)) {
      query['venderId'] = data1.venderId
    }
    if (Validate.isNotEmpty(data1.applyDate)) {
      query['applyDate'] = data1.applyDate
    }
    query['localPayFpLineAdd'] = line1Add
    query['localPayLineAdd'] = line2Add
    query['localPayFpLineUpD'] = Oldline1
    query['localPayLineUpD'] = Oldline2
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLocalPayInfo',
        config: 'ACT_SDP_FIN_FEE_LOCAL_PAY_001',
        keyField: 'pay_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeLocalPay/finFeeLocalPay',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data
    })
  },
  delete(id) {
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['payId'] = id
    }
    query['$state'] = 2
    query['deleted'] = 1
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLocalPayInfo',
        config: 'ACT_SDP_FIN_FEE_LOCAL_PAY_001',
        keyField: 'pay_id',
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeLocalPay/finFeeLocalPay',
      method: 'post',
      data: dataTo
    }).then(res => {
    })
  }
}
