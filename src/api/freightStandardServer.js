import request from '@/utils/request' 
import { dateToDateStr, dateTimeToDateTimeToStr } from '@/utils/datetime'
import Validate from '@/utils/validate.js'
export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.code)) {
      query['stdNo'] = params.keyword.code
    }
    if (Validate.isNotEmpty(params.keyword.startDate)) {
      query['startDate'] = dateToDateStr(params.keyword.startDate)
    }
    if (Validate.isNotEmpty(params.keyword.status)) {
      query['stat'] = params.keyword.status.join(',')
    }
    if (Validate.isNotEmpty(params.keyword.endDate)) {
      query['endDate'] = dateToDateStr(params.keyword.endDate)
    }
    if (Validate.isNotEmpty(params.keyword.createUser)) {
      query['createUser'] = params.keyword.createUser
    }
    if (Validate.isNotEmpty(params.keyword.updateName)) {
      query['updateName'] = params.keyword.updateName
    }
    if (Validate.isNotEmpty(params.keyword.startCreateDate)) {
      query['startCreateDate'] = dateToDateStr(params.keyword.startCreateDate)
    }
    if (Validate.isNotEmpty(params.keyword.endCreateDate)) {
      query['endCreateDate'] = dateToDateStr(params.keyword.endCreateDate)
    }
    if (Validate.isNotEmpty(params.keyword.startUpdateDate)) {
      query['startUpdateDate'] = dateToDateStr(params.keyword.startUpdateDate)
    }
    if (Validate.isNotEmpty(params.keyword.endUpdateDate)) {
      query['endUpdateDate'] = dateToDateStr(params.keyword.endUpdateDate)
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLcstInfo',
        config: 'ACT_SDP_FIN_FEE_LCSTD_LIST',  
        params: { ...query },
        page: {
          startRow: params.page * params.size, // 起始行
          endRow: params.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/finFee/finFeeLcstdManagment',
      method: 'post',
      data: dataTo 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        item.code = item.stdNo
        item.remark = item.note
        item.operateUnitId = item.entid
        item.status = item.stat
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['stdId'] = id
    }
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLcstInfo',
        config: 'ACT_SDP_FIN_FEE_LCSTD',  
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/finFee/finFeeLcstdManagment',
      method: 'post',
      data: dataTo 
    }).then(res => {
      const resData = res.data.data.dataSet.rows[0]
      resData.code = resData.stdNo
      resData.status = resData.stat
      resData.operateUnitId = resData.entid
      resData.remark = resData.note
      if (resData.boxLine != null) {
        const line1 = resData.boxLine
        for (let i = 0; i < line1.length; i++) {
          line1[i].freightStandardContainerCostDetail = line1[i].feeType
          line1[i].startTime = line1[i].startDate
          line1[i].endTime = line1[i].endDate
          line1[i].specGp20 = line1[i].boxPrice1
          line1[i].specGp40 = line1[i].boxPrice2
          line1[i].specHq40 = line1[i].boxPrice3
          line1[i].specHq45 = line1[i].boxPrice4
          line1[i].specRh40 = line1[i].boxPrice5
          line1[i].mergeContainer = line1[i].boxPrice6
          line1[i].airTransportation = line1[i].boxPrice7
          line1[i].shippingCompanyProxyType = line1[i].transitType
          line1[i].shippingCompanyId = line1[i].transitId
          if (i === (line1.length - 1)) {
            resData.boxLine = line1
          }  
        } 
      }
      if (resData.docLine != null) {
        const line2 = resData.docLine
        for (let i = 0; i < line2.length; i++) {
          line2[i].freightStandardTicketCostDetail = line2[i].feeType
          line2[i].startTime = line2[i].startDate
          line2[i].endTime = line2[i].endDate
          line2[i].price = line2[i].amt
          line2[i].shippingCompanyProxyType = line2[i].transitType
          line2[i].shippingCompanyId = line2[i].transitId
          if (i === (line2.length - 1)) {
            resData.docLine = line2
          }  
        }
        resData.docLine = line2
      }
      return resData
    })
  },
  post(data1, data2, data3) {
    const line1 = [...data2]
    const line2 = [...data3]
    const timePicker = [...data2].concat([...data3])
    // const timePicker2 = [...data3]
    let startDate = null
    let endDate = null
    for (let i = 0; i < timePicker.length; i++) {
      if (i === 0) {
        startDate = timePicker[i].startTime
        endDate = timePicker[i].endTime
      } else {
        if (startDate.getTime() > timePicker[i].startTime.getTime()) {
          startDate = timePicker[i].startTime
        }
        if (endDate.getTime() < timePicker[i].endTime.getTime()) {
          endDate = timePicker[i].endTime
        }
      }
    }
    for (let i = 0; i < line1.length; i++) {
      line1[i].seq = i + 1
      line1[i].feeType = parseInt(line1[i].freightStandardContainerCostDetail)
      line1[i].transitId = line1[i].shippingCompanyId
      line1[i].transitCode = line1[i].shippingCompanyCode
      line1[i].transitName = line1[i].shippingCompanyName
      line1[i].boxPrice1 = line1[i].specGp20
      line1[i].boxPrice2 = line1[i].specGp40
      line1[i].boxPrice3 = line1[i].specHq40
      line1[i].boxPrice4 = line1[i].specHq45
      line1[i].boxPrice5 = line1[i].specRh40
      line1[i].boxPrice6 = line1[i].mergeContainer
      line1[i].boxPrice7 = line1[i].airTransportation
      line1[i].startDate = dateToDateStr(line1[i].startTime)
      line1[i].endDate = dateToDateStr(line1[i].endTime)
      line1[i].transitType = line1[i].shippingCompanyProxyType  
    }
    
    for (let i = 0; i < line2.length; i++) {
      line2[i].seq = i + 1
      line2[i].feeType = parseInt(line2[i].freightStandardTicketCostDetail)
      line2[i].transitId = line2[i].shippingCompanyId
      line2[i].transitCode = line2[i].shippingCompanyCode
      line2[i].transitName = line2[i].shippingCompanyName
      line2[i].startDate = dateToDateStr(line2[i].startTime)
      line2[i].endDate = dateToDateStr(line2[i].endTime)
      line2[i].amt = line2[i].price
      line2[i].transitType = line2[i].shippingCompanyProxyType  
    }
    const query = {}
    query['note'] = data1.remark
    query['entid'] = data1.entid
    if (startDate !== null) {
      query['startDate'] = dateToDateStr(startDate)
    }
    if (endDate !== null) {
      query['endDate'] = dateToDateStr(endDate)
    }
    query['$state'] = 1
    query['deleted'] = 0
    query['boxLineAdd'] = line1
    query['docLineAdd'] = line2 
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLcstInfo',
        config: 'ACT_SDP_FIN_FEE_LCSTD',
        keyField: 'std_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/finFee/finFeeLcstdManagment',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data
    })
  },
  put(data1, data2, data3, data4, data5) {
    const timePicker = [...data2].concat([...data3])
    const line1 = [...data2]
    const line2 = [...data3]
    const Oldline1 = [...data4]
    const Oldline2 = [...data5]
    const line1Add = []
    const line2Add = []
    let startDate = null
    let endDate = null
    for (let i = 0; i < timePicker.length; i++) {
      timePicker[i].startTime = new Date(timePicker[i].startTime)
      timePicker[i].endTime = new Date(timePicker[i].endTime)
      if (i === 0) {
        startDate = timePicker[i].startTime
        endDate = timePicker[i].endTime
      } else {
        if (startDate.getTime() > timePicker[i].startTime.getTime()) {
          startDate = timePicker[i].startTime
        }
        if (endDate.getTime() < timePicker[i].endTime.getTime()) {
          endDate = timePicker[i].endTime
        }
      }
    }
    for (let i = 0; i < line1.length; i++) {
      line1[i].seq = i + 1
      line1[i].feeType = parseInt(line1[i].freightStandardContainerCostDetail)
      line1[i].transitId = line1[i].shippingCompanyId
      line1[i].transitCode = line1[i].shippingCompanyCode
      line1[i].transitName = line1[i].shippingCompanyName
      line1[i].boxPrice1 = line1[i].specGp20
      line1[i].boxPrice2 = line1[i].specGp40
      line1[i].boxPrice3 = line1[i].specHq40
      line1[i].boxPrice4 = line1[i].specHq45
      line1[i].boxPrice5 = line1[i].specRh40
      line1[i].boxPrice6 = line1[i].mergeContainer
      line1[i].boxPrice7 = line1[i].airTransportation
      line1[i].startDate = dateToDateStr(line1[i].startTime)
      line1[i].endDate = dateToDateStr(line1[i].endTime)
      line1[i].transitType = line1[i].shippingCompanyProxyType  
    }
    for (let i = 0; i < line2.length; i++) {
      line2[i].seq = i + 1
      line2[i].feeType = parseInt(line2[i].freightStandardTicketCostDetail)
      line2[i].transitId = line2[i].shippingCompanyId
      line2[i].transitCode = line2[i].shippingCompanyCode
      line2[i].transitName = line2[i].shippingCompanyName
      line2[i].startDate = dateToDateStr(line2[i].startTime)
      line2[i].endDate = dateToDateStr(line2[i].endTime)
      line2[i].amt = line2[i].price
      line2[i].transitType = line2[i].shippingCompanyProxyType  
    }
    for (let i = 0; i < line1.length; i++) {
      if (line1[i].boxLineId == null) {
        line1Add.push(line1[i])
      } 
    }
    for (let i = 0; i < line2.length; i++) {
      if (line2[i].docLineId == null) {
        line2Add.push(line2[i])
      } 
    }
    for (let i = 0; i < Oldline1.length; i++) {
      Oldline1[i].deleted = 1
      for (let j = 0; j < line1.length; j++) {
        if (Oldline1[i].boxLineId === line1[j].boxLineId) {
          Oldline1[i] = line1[j]
          Oldline1[i].deleted = 0
          break
        }
      }
    }
    for (let i = 0; i < Oldline2.length; i++) {
      Oldline2[i].deleted = 1
      for (let j = 0; j < line2.length; j++) {
        if (Oldline2[i].docLineId === line2[j].docLineId) {
          Oldline2[i] = line2[j]
          Oldline2[i].deleted = 0
          break
        } 
      }
    }
    const query = {}
    if (startDate !== null) {
      query['startDate'] = dateTimeToDateTimeToStr(startDate)
    }
    if (endDate !== null) {
      query['endDate'] = dateTimeToDateTimeToStr(endDate)
    }
    query['note'] = data1.remark
    query['stdNo'] = data1.stdNo
    query['$state'] = 2
    query['deleted'] = 0
    query['stdId'] = data1.stdId
    query['std_id'] = data1.stdId
    query['boxLineAdd'] = line1Add
    query['docLineAdd'] = line2Add
    query['boxLine'] = Oldline1
    query['docLine'] = Oldline2
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLcstInfo',
        config: 'ACT_SDP_FIN_FEE_LCSTD',
        keyField: 'std_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/finFee/finFeeLcstdManagment',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res.data
    })
  },
  delete(data) {
    const query = {}
    query['stdId'] = data.stdId
    query['std_id'] = data.stdId
    query['deleted'] = 1
    query['stdNo'] = data.code
    query['$state'] = 3
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'finFeeLcstInfo',
        config: 'ACT_SDP_FIN_FEE_LCSTD',
        keyField: 'std_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/finFee/finFeeLcstdManagment',
      method: 'post',
      data: dataTo
    }).then(res => {
    })
  }
}
