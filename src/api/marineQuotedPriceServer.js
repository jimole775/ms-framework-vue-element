import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    // 将查询关键词转换为接口对应的字段
    const query = {}
    if (Validate.isNotEmpty(param.keyword.code)) {
      query['enquirylistNo'] = param.keyword.code
    }
    if (Validate.isNotEmpty(param.keyword.pi)) {
      query['piNo'] = param.keyword.pi
    }
    if (Validate.isNotEmpty(param.keyword.shipmentPortId)) {
      query['seaportOutId'] = param.keyword.shipmentPortId
    }
    if (Validate.isNotEmpty(param.keyword.targetPortId)) {
      query['seaportInId'] = param.keyword.targetPortId
    }
    if (Validate.isNotEmpty(param.keyword.recommendShippingCompanyId)) {
      query['towCopId'] = param.keyword.recommendShippingCompanyId
    }
    if (param.keyword.portType && param.keyword.targetAreaIds.length > 0) {
      query['areaId'] = param.keyword.targetAreaIds.join(',')
    }
    if (Validate.isNotEmpty(param.keyword.loadDate)) {
      query['preShipDate'] = param.keyword.loadDate
    }
    if (Validate.isNotEmpty(param.keyword.targetAreaId)) {
      query['areaId'] = param.keyword.targetAreaId
    }
    if (Validate.isNotEmpty(param.keyword.warnNo)) {
      query['warnNo'] = param.keyword.warnNo
    }
    if (Validate.isNotEmpty(param.keyword.status)) {
      query['stat'] = param.keyword.status
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    query.isQuote = 1
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'datas',
        config: 'ACT_SDP_ENQUIRY_001',  
        params: { ...query },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.id = item.enquirylistId
        item.code = item.enquirylistNo
        item.status = item.stat
        item.freeBox = item.protFreeBox
        item.freeStorageTime = item.protFreeDate
        item.loadDate = item.preShipDate
        item.pi = item.piId
        item.boxNames = item.boxNames
        item.boxIds = item.boxIds
        item.piNo = item.piNo
        item.airRoute = item.route
        item.paymentDate = item.preShipFeeDate
        item.enquiryUptoDate = item.enquiryUptoDate
        item.isShippingCompanyPrice = item.isShippingPrice === 2
        item.otherCommitRequirements = item.ladask
        item.containerNumber = item.biTian
        item.remark = item.note
        item.otherRequest = item.lineNote
        item.isDelete = item.deleted
        item.saleDepartmentId = item.orgId
        item.saleDepartment = item.orgName
        item.targetAreaId = item.areaId
        item.targetArea = item.areaName
        item.shipmentPortId = item.seaportOutId
        item.shipmentPort = item.seaportOutName
        item.targetPortId = item.seaportInId
        item.targetPort = item.seaportInName
        item.recommendShippingCompanyId = item.towCopId
        item.recommendShippingCompany = item.towCopName
        const boxNamesNum = item.boxNamesNum ? JSON.parse(item.boxNamesNum.replace(/!/g, '"')) : {}
        const boxCounts = []
        Object.keys(boxNamesNum).forEach(key => { boxCounts.push(boxNamesNum[key]) })
        item.boxCounts = boxCounts.join(',')
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'enquirylistId', 
        params: {
          isQuote: 1,
          enquirylistId: id
        }
      }
    }
    return request({
      url: 'auxhome/sdp/api/1.0.0/saleEnquiry/selectOneEnquiry',
      method: 'post',
      data
    }).then(res => {
      const ob = res.data.data
      res.data.data.id = ob.enquirylistId
      res.data.data.code = ob.enquirylistNo
      res.data.data.status = ob.stat
      res.data.data.boxNames = ob.boxNames
      res.data.data.boxIds = ob.boxIds
      res.data.data.freeBox = ob.protFreeBox
      res.data.data.freeStorageTime = ob.protFreeDate
      res.data.data.loadDate = ob.preShipDate
      res.data.data.pi = ob.piId
      res.data.data.piNo = ob.piNo
      res.data.data.airRoute = ob.route
      res.data.data.paymentDate = ob.preShipFeeDate
      res.data.data.enquiryUptoDate = ob.enquiryUptoDate
      res.data.data.isShippingCompanyPrice = ob.isShippingPrice === 2
      res.data.data.otherCommitRequirements = ob.ladask
      res.data.data.containerNumber = ob.biTian
      res.data.data.remark = ob.note
      res.data.data.isSave = ob.isSave
      res.data.data.otherRequest = ob.lineNote
      res.data.data.isDelete = ob.deleted
      res.data.data.saleDepartmentId = ob.orgId
      res.data.data.saleDepartment = { name: ob.orgName, id: ob.orgId }
      res.data.data.targetAreaId = ob.areaId
      res.data.data.targetArea = { name: ob.areaName, id: ob.areaId }
      res.data.data.shipmentPortId = ob.seaportOutId
      res.data.data.shipmentPort = { name: ob.seaportOutName, id: ob.seaportOutId }
      res.data.data.targetPortId = ob.seaportInId
      res.data.data.targetPort = { name: ob.seaportInName, id: ob.seaportInId }
      res.data.data.recommendShippingCompanyId = ob.towCopId
      res.data.data.recommendShippingCompany = { name: ob.towCopName, id: ob.towCopId }
      res.data.data.containerTypeId = ob.boxIds ? ob.boxIds.split(',') : ob.boxIds
      const boxNamesNum = ob.boxNamesNum ? JSON.parse(ob.boxNamesNum.replace(/!/g, '"')) : {}
      res.data.data.boxNamesObject = boxNamesNum
      const boxCounts = []
      Object.keys(boxNamesNum).forEach(key => { boxCounts.push(boxNamesNum[key]) })
      res.data.data.boxCounts = boxCounts.join(',')
      res.data.data.containerType = { name: ob.boxNames, id: ob.boxIds }
      res.data.data.operateUnit = { name: ob.entid, id: ob.entid }
      if (ob.sdpSaleEnquiryLineList && ob.sdpSaleEnquiryLineList.length > 0) {
        const sdpSaleEnquiryLineList = []
        ob.sdpSaleEnquiryLineList.forEach(item => {
          let designate = false
          if (item.usable === 2) {
            designate = true
          }
          sdpSaleEnquiryLineList.push({
            id: item.enquirylistLineId,
            isCommit: item.isCommit,
            enquirylistLineId: item.enquirylistLineId,
            shippingCompanyId: item.towCopId,
            airRoute: item.route,
            freeBox: item.protFreeBox,
            shippingCompanyCode: item.towCopCode,
            shippingCompanyName: item.towCopName,
            shippingCompanyShortName: item.towShortname,
            recommendShippingCompanyId: item.logisticsId,
            recommendShippingCompanyCode: item.logisticsCode,
            recommendShippingCompanyName: item.logisticsName,
            recommendShippingCompanyShortName: item.logisticsShortname,
            lastScheduledDate: item.lastDcDate,
            currencyCode: item.currencyCode,
            currencyName: item.currencyName,
            unitMeasurementCode: item.uomCode,
            unitMeasurementName: item.uomName,
            totalAmount: item.totalAmt,
            lowestPrice: item.addToTotalAmt,
            remark: item.note,
            designate: designate,
            transportTime: item.hangChen,
            expirationDate: item.preJiegDate,
            pricePeriodValidity: item.startJiagDate,
            boxPrice1: item.boxPrice1,
            boxQty1: item.boxQty1,
            boxPrice2: item.boxPrice2,
            boxQty2: item.boxQty2,
            boxPrice3: item.boxPrice3,
            boxQty3: item.boxQty3,
            boxPrice4: item.boxPrice4,
            boxQty4: item.boxQty4,
            boxPrice5: item.boxPrice5,
            boxQty5: item.boxQty5,
            boxPrice6: item.boxPrice6,
            boxQty6: item.boxQty6,
            boxPrice7: item.boxPrice7,
            boxQty7: item.boxQty7,
            boxPrice8: item.boxPrice8,
            boxQty8: item.boxQty8,
            boxPrice9: item.boxPrice9,
            boxQty9: item.boxQty9,
            boxPrice10: item.boxPrice10,
            boxQty10: item.boxQty10,
          })
        })
        res.data.data.sdpSaleEnquiryLineList = sdpSaleEnquiryLineList
      }
      return res.data
    })
  },
  put(param) {
    // 设置传参格式
    const header = {}
    header['stat'] = param.header.status
    header['enquirylistId'] = param.header.id
    header['enquirylistNo'] = param.header.code
    header['protFreeBox'] = param.header.freeBox
    header['protFreeDate'] = param.header.freeStorageTime
    header['preShipDate'] = param.header.loadDate
    header['piId'] = param.header.pi
    header['route'] = param.header.airRoute
    header['preShipFeeDate'] = param.header.paymentDate
    header['enquiryUptoDate'] = param.header.enquiryUptoDate
    header['isShippingPrice'] = param.header.isShippingCompanyPrice ? 2 : 1
    header['ladask'] = param.header.otherCommitRequirements
    header['biTian'] = param.header.containerNumber
    header['note'] = param.header.remark
    header['lineNote'] = param.header.otherRequest
    header['towCopId'] = param.header.recommendShippingCompanyId
    header['towCopName'] = param.header.recommendShippingCompany.name
    header['boxIds'] = param.headerboxIds
    header['boxNames'] = param.header.boxNames
    header['seaportInName'] = param.header.targetPort.name
    header['seaportInId'] = param.header.targetPortId
    header['seaportOutName'] = param.header.shipmentPort.name
    header['seaportOutId'] = param.header.shipmentPortId
    header['areaName'] = param.header.targetArea.name
    header['areaId'] = param.header.targetAreaId
    header['orgId'] = param.header.saleDepartmentId
    header['orgName'] = param.header.saleDepartment.name
    const lineArr = []
    if (param.line.length > 0) {
      param.line.forEach(item => {
        lineArr.push({
          isQuote: 1,
          enquirylistId: param.header.id,
          enquirylistNo: param.header.code,
          id: item.enquirylistLineId,
          isCommit: item.isCommit,
          route: item.airRoute,
          protFreeBox: item.freeBox,
          enquirylistLineId: item.enquirylistLineId,
          towCopId: item.shippingCompanyId,
          towCopCode: item.shippingCompanyCode,
          towCopName: item.shippingCompanyName,
          towShortname: item.shippingCompanyShortName,
          logisticsId: item.recommendShippingCompanyId,
          logisticsCode: item.recommendShippingCompanyCode,
          logisticsName: item.recommendShippingCompanyName,
          logisticsShortname: item.recommendShippingCompanyShortName,
          lastDcDate: item.lastScheduledDate,
          currencyCode: item.currencyCode,
          currencyName: item.currencyName,
          uomCode: item.unitMeasurementCode,
          uomName: item.unitMeasurementName,
          totalAmt: item.totalAmount,
          addToTotalAmt: item.lowestPrice,
          note: item.remark,
          usable: (item.designate ? 2 : 1),
          hangChen: item.transportTime,
          preJiegDate: item.expirationDate,
          startJiagDate: item.pricePeriodValidity,
          boxPrice1: item.boxPrice1,
          boxQty1: item.boxQty1,
          boxPrice2: item.boxPrice2,
          boxQty2: item.boxQty2,
          boxPrice3: item.boxPrice3,
          boxQty3: item.boxQty3,
          boxPrice4: item.boxPrice4,
          boxQty4: item.boxQty4,
          boxPrice5: item.boxPrice5,
          boxQty5: item.boxQty5,
          boxPrice6: item.boxPrice6,
          boxQty6: item.boxQty6,
          boxPrice7: item.boxPrice7,
          boxQty7: item.boxQty7,
          boxPrice8: item.boxPrice8,
          boxQty8: item.boxQty8,
          boxPrice9: item.boxPrice9,
          boxQty9: item.boxQty9,
          boxPrice10: item.boxPrice10,
          boxQty10: item.boxQty10,
        })
      })
    }
    const line = {
      enquiryLineInfoes: lineArr
    }
    const data = {
      dataSets: {
        enquiryLineInfo: {
          name: 'enquiryLineInfo',
          params: line
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleEnquiry/updateEnquiry',
      method: 'post',
      data
    })
  },
  delete(id) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'enquiryHeaderId',
        config: 'ACT_SDP_ENQUIRY_003',
        rows: [
          {
            $state: 3,
            enquirylistId: id
          }
        ]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleEnquiry/deleteEnquiry',
      method: 'post',
      data
    })
  }
}
