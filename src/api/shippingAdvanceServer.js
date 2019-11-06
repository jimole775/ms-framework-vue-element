import request from '@/utils/request'
import Validate from '@/utils/validate.js'
// import { dateToDateStr } from '@/utils/datetime'
export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.code)) {
      query['ytNo'] = params.keyword.code
    }
    if (Validate.isNotEmpty(params.keyword.applyDateStart)) {
      query['beginDate'] = params.keyword.applyDateStart
    }
    if (Validate.isNotEmpty(params.keyword.applyDateEnd)) {
      query['endDate'] = params.keyword.applyDateEnd
    }
    if (Validate.isNotEmpty(params.keyword.ytYear)) {
      query['ytYear'] = parseInt(params.keyword.ytYear)
    }
    if (Validate.isNotEmpty(params.keyword.ytMonth)) {
      query['ytMonth'] = parseInt(params.keyword.ytMonth)
    }
    if (Validate.isNotEmpty(params.keyword.createMan)) {
      query['createUser'] = params.keyword.createMan
    }
    if (Validate.isNotEmpty(params.keyword.status)) {
      if (params.keyword.status.length > 0) {
        query['stats'] = params.keyword.status.join(',')
      } 
    }
    if (Validate.isNotEmpty(params.keyword.remark)) {
      query['note'] = params.keyword.remark
    }
    if (Validate.isNotEmpty(params.keyword.credentials)) {
      query['sapNo'] = params.keyword.credentials
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeOcfPayInfo',
        config: 'ACT_SPD_FINFEE_HEADER_001',  
        keyField: 'pay_id',
        params: { ...query },
        page: {
          startRow: params.page * params.size, // 起始行
          endRow: params.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeOcfPay/finFeeOcfPay',
      method: 'post',
      data: dataTo 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        item.code = item.ytNo
        if (item.stat != null && item.stat !== '') {
          item.status = item.stat
        } 
        item.credentials = item.sapNo
        item.remark = item.note
        item.yearMonth = item.ytYear + '年' + item.ytMonth + '月'
        item.amount = item.totalAmt
        item.advanceAmount = item.ytAmt
        item.createMan = item.createUser
        item.applyDate = item.createDate
        item.operateUnitId = item.entid
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['ytId'] = id
    }
    query['entid'] = localStorage.getItem('entid') || 101
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFinFeeOcfYtInfo',
        config: 'ACT_SPD_FIN_FEE_HEADERLINE_001',
        keyField: 'yt_id',  
        params: { ...query },
        page: {
          startRow: 0, // 起始行
          endRow: 10 // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeOcfYt/finFinFeeOcfYt',
      method: 'post',
      data: dataTo 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        item.code = item.ytNo
        if (item.stat != null && item.stat !== '') {
          item.status = item.stat
        }
        for (let i = 0; i < item.lineEntities.length; i++) {
          item.lineEntities[i].advanceAmount = item.lineEntities[i].ytAmt
          item.lineEntities[i].remark = item.lineEntities[i].note
          item.lineEntities[i].advanceAmount = item.lineEntities[i].ytAmt
          if (item.lineEntities[i].isYt === 2) {
            item.lineEntities[i].isYt = true
          }
          if (item.lineEntities[i].isYt === 1) {
            item.lineEntities[i].isYt = false
          }
        }
        item.credentials = item.sapNo
        item.remark = item.note
        item.year = item.ytYear.toString()
        item.month = item.ytMonth.toString()
        item.amount = item.totalAmt
        item.advanceAmount = item.ytAmt
        item.createMan = item.createUser
        item.applyDate = item.createDate
        item.operateUnitId = item.entid
      })
      return res.data.data.dataSet.rows[0]
    })
  },
  post(data1, data2) {
    const query = {}
    const line = [...data2]
    // if (Validate.isNotEmpty(data1.entid)) {
    //   query['entid'] = parseInt(data1.entid)
    // }
    query['entid'] = parseInt(localStorage.getItem('entid')) || 101
    if (Validate.isNotEmpty(data1.year)) {
      query['ytYear'] = parseInt(data1.year)
    }
    if (Validate.isNotEmpty(data1.boxQty10)) {
      query['boxQty10'] = parseFloat(data1.boxQty10)
    }  
    if (Validate.isNotEmpty(data1.month)) {
      query['ytMonth'] = parseInt(data1.month)
    }
    if (Validate.isNotEmpty(data1.amount)) {
      query['totalAmt'] = parseFloat(data1.amount)
    }
    if (Validate.isNotEmpty(data1.advanceAmount)) {
      query['ytAmt'] = parseFloat(data1.advanceAmount)
    }
    if (Validate.isNotEmpty(data1.currencyCode)) {
      query['currencyCode'] = data1.currencyCode
    }
    if (Validate.isNotEmpty(data1.remark)) {
      query['note'] = data1.remark
    }
    query['$state'] = 1
    query['stat'] = '1'
    query['deleted'] = 0
    for (let i = 0; i < line.length; i++) {
      // if (line[i].isYt === true) {
      //   line[i].isYt = 2
      // }
      // if (line[i].isYt === false) {
      //   line[i].isYt = 1
      // }
      line[i].isYt = line[i].isYt ? 2 : 1 
      line[i].seq	 = i + 1
      line[i].hyfAmt	 = line[i].hyfAmt
      line[i].ytAmt	= line[i].advanceAmount
      line[i].note = line[i].remark
      if (line[i].preShipDate === '') {
        line[i].preShipDate = null
      }
      line[i].deleted = 0
    }
    query['lineEntities'] = line
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFinFeeOcfYtInfo',
        config: 'ACT_SPD_FIN_FEE_HEADERLINE_001',
        keyField: 'yt_id',
        rows: [query],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeOcfYt/finFinFeeOcfYt',
      method: 'post',
      data: dataTo 
    }).then(res => {
      // console.log(res.data)
      return res.data
    })
  },
  put(data1, data2, data3) {
    const line1Add = []
    const query = {}
    const line1 = [...data2]
    const oldLine1 = [...data3]
    for (let i = 0; i < oldLine1.length; i++) {
      if (oldLine1[i].isYt === true) {
        oldLine1[i].isYt = 2
      }
      if (oldLine1[i].isYt === false) {
        oldLine1[i].isYt = 1
      }
    }
    for (let i = 0; i < line1.length; i++) {
      if (line1[i].isYt === true) {
        line1[i].isYt = 2
      }
      if (line1[i].isYt === false) {
        line1[i].isYt = 1
      }
      if (line1[i].preShipDate === '') {
        line1[i].preShipDate = null
      }
      line1[i].seq	 = i + 1
      line1[i].ytAmt	= line1[i].advanceAmount
      line1[i].note = line1[i].remark
    }
    for (let i = 0; i < line1.length; i++) {
      if (line1[i].ytId == null) {
        line1Add.push(line1[i])
      } 
    }
    for (let i = 0; i < oldLine1.length; i++) {
      oldLine1[i].deleted = 1
      for (let j = 0; j < line1.length; j++) {
        if (oldLine1[i].lineId === line1[j].lineId) {
          oldLine1[i] = line1[j]
          oldLine1[i].deleted = 0
          break
        }
      }
    }
    if (Validate.isNotEmpty(data1.year)) {
      query['ytYear'] = parseInt(data1.year)
    }
    if (Validate.isNotEmpty(data1.month)) {
      query['ytMonth'] = parseInt(data1.month)
    }
    if (Validate.isNotEmpty(data1.amount)) {
      query['totalAmt'] = parseFloat(data1.amount)
    }
    if (Validate.isNotEmpty(data1.advanceAmount)) {
      query['ytAmt'] = parseFloat(data1.advanceAmount)
    }
    if (Validate.isNotEmpty(data1.remark)) {
      query['note'] = data1.remark
    }
    query['$state'] = 2
    query['deleted'] = 0
    query['yt_id'] = data1.ytId
    query['updateLine'] = oldLine1
    query['lineEntities'] = line1Add    
    query['entid'] = parseInt(localStorage.getItem('entid')) || 101
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFinFeeOcfYtInfo',
        config: 'ACT_SPD_FIN_FEE_HEADERLINE_001',
        keyField: 'yt_id',
        rows: [query],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeOcfYt/finFinFeeOcfYt',
      method: 'post',
      data: dataTo 
    }).then(res => {
      return res.data
    })
  },
  delete(data) {
    const query = {}
    query['yt_id'] = data.ytId
    query['$state'] = 2
    query['deleted'] = 1
    query['entid'] = parseInt(localStorage.getItem('entid')) || 101
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFinFeeOcfYtInfo',
        config: 'ACT_SPD_FIN_FEE_HEADERLINE_001',
        keyField: 'yt_id',
        rows: [query],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeOcfYt/finFinFeeOcfYt',
      method: 'post',
      data: dataTo 
    }).then(res => {
    })
  }
}
