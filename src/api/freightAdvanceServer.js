import request from '@/utils/request'
import { dateToDateStr } from '@/utils/datetime'
import Validate from '@/utils/validate.js'
export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.code)) {
      query['ytNo'] = params.keyword.code
    }
    if (Validate.isNotEmpty(params.keyword.status)) {
      query['stat'] = params.keyword.status.join(',')
    }
    if (Validate.isNotEmpty(params.keyword.ytYear)) {
      query['ytYear'] = parseInt(params.keyword.ytYear)
    }
    if (Validate.isNotEmpty(params.keyword.ytMonth)) {
      query['ytMonth'] = parseInt(params.keyword.ytMonth)
    }
    if (Validate.isNotEmpty(params.keyword.credentials)) {
      query['sapNo'] = parseInt(params.keyword.credentials)
    }
    if (Validate.isNotEmpty(params.keyword.createUser)) {
      query['createUser'] = params.keyword.createUser
    }
    if (Validate.isNotEmpty(params.keyword.startCreateDate)) {
      query['startCreateDate'] = params.keyword.startCreateDate
    }
    if (Validate.isNotEmpty(params.keyword.endCreateDate)) {
      query['endCreateDate'] = params.keyword.endCreateDate
    }
    if (Validate.isNotEmpty(params.keyword.remark)) {
      query['note'] = params.keyword.remark
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const dataTo = {
      dataSet: {
        config: 'ACT_SDP_FIN_FEE_LOCAL_YT_LIST',  
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
        item.code = item.ytNo
        item.status = item.stat.toString()
        item.credentials = item.sapNo
        item.remark = item.note
        item.yearMonth = item.ytYear + '年' + item.ytMonth + '月'
        item.amount = item.totalAmt
        item.advanceAmount = item.ytAmt
        item.createMan = item.createUser
        item.applyDate = item.createDate
        item.departmentId = item.entid
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    // 设置传参格式
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['ytId'] = id
    }
    const dataTo = {
      dataSet: {
        name: 'finFeeLocalYtInfo',
        config: 'ACT_SDP_FIN_FEE_LOCAL_YT',   
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: dataTo 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        item.code = item.ytNo
        item.status = item.stat.toString()
        item.credentials = item.sapNo
        item.remark = item.note
        item.year = item.ytYear.toString()
        item.month = item.ytMonth.toString()
        item.amount = item.totalAmt
        item.advanceAmount = item.ytAmt
        item.createMan = item.createUser
        item.applyDate = item.createDate
        item.operateUnitId = item.entid
        for (let i = 0; i < item.lines.length; i++) {
          item.lines[i].advanceAmount = item.lines[i].ytAmt
          item.lines[i].remark = item.lines[i].note
          item.lines[i].boxAmt = item.lines[i].amt
          item.lines[i].docAmt = item.lines[i].otherAmt
          if (item.lines[i].isYt === 2) {
            item.lines[i].isYt = true
          }
          if (item.lines[i].isYt === 1) {
            item.lines[i].isYt = false
          }
        }
      })
      return res.data.data.dataSet.rows[0]
    })
  },
  post(data1, data2) {
    const query = {}
    const line = [...data2]
    if (Validate.isNotEmpty(data1.year)) {
      query['ytYear'] = parseInt(data1.year)
    }
    query.entid = parseInt(localStorage.getItem('entid'))
    // if (Validate.isNotEmpty(data1.entid)) {
    //   query['entid'] = parseInt(data1.entid)
    // }
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
    query['$state'] = 1
    query['deleted'] = 0
    if (Validate.isNotEmpty(data1.remark)) {
      query['note'] = data1.remark
    }
    for (let i = 0; i < line.length; i++) {
      line[i].isYt = line[i].isYt ? 2 : 1
      line[i].seq	 = i + 1
      line[i].amt	 = line[i].boxAmt
      line[i].otherAmt = line[i].docAmt
      line[i].preShipDate = dateToDateStr(line[i].preShipDate)
      line[i].ytAmt	= line[i].advanceAmount
      line[i].note = line[i].remark
    }
    query['linesAdd'] = line
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLocalYtInfo',
        config: 'ACT_SDP_FIN_FEE_LOCAL_YT',
        keyField: 'yt_id',
        rows: [query],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/finFee/finFeeLocalYtdManagment',
      method: 'post',
      data: dataTo 
    }).then(res => {
      return res.data
    })
  },
  put(data1, data2, data3) {
    const line1Add = []
    const query = {}
    const line1 = [...data2]
    const oldLine1 = [...data3]
    for (let i = 0; i < line1.length; i++) {
      line1[i].isYt = line1[i].isYt ? 2 : 1
      line1[i].seq	 = i + 1
      line1[i].amt	 = line1[i].boxAmt
      line1[i].otherAmt = line1[i].docAmt
      line1[i].ytAmt	= line1[i].advanceAmount
      line1[i].note = line1[i].remark
      line1[i].preShipDate = dateToDateStr(line1[i].preShipDate)
    }
    for (let i = 0; i < line1.length; i++) {
      if (line1[i].lineId == null) {
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
    query['ytId'] = data1.ytId
    query['lines'] = oldLine1
    query['linesAdd'] = line1Add
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLocalYtInfo',
        config: 'ACT_SDP_FIN_FEE_LOCAL_YT',
        keyField: 'yt_id',
        rows: [query],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/finFee/finFeeLocalYtdManagment',
      method: 'post',
      data: dataTo 
    }).then(res => {
      return res.data
    })
  },
  delete(data) {
    const query = {}
    query['yt_id'] = data.ytId
    query['ytId'] = data.ytId
    query['$state'] = 3
    query['deleted'] = 1
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLocalYtInfo',
        config: 'ACT_SDP_FIN_FEE_LOCAL_YT',
        keyField: 'yt_id',
        rows: [query],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/finFee/finFeeLocalYtdManagment',
      method: 'post',
      data: dataTo 
    }).then(res => {
    })
  }
}
