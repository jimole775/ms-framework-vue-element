import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    // 将查询关键词转换为接口对应的字段
    const query = {}
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['supplierId'] = param.keyword.id
    }
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['supplierName'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.code)) {
      query['supplierCode'] = param.keyword.code
    }
    if (Validate.isNotEmpty(param.keyword.simplifyName)) {
      query['shortName'] = param.keyword.simplifyName
    }
    if (Validate.isNotEmpty(param.keyword.shippingCompanyStatus)) {
      query['stat'] = param.keyword.shippingCompanyStatus
    }
    if (Validate.isNotEmpty(param.keyword.shippingCompanyType)) {
      query['supplierType'] = param.keyword.shippingCompanyType
    }
    if (Validate.isNotEmpty(param.keyword.shippingCompanyProxyType)) {
      query['hdType'] = param.keyword.shippingCompanyProxyType
    }
    if (Validate.isNotEmpty(param.keyword.certificateCode)) {
      query['zzzsh'] = param.keyword.certificateCode
    }
    if (Validate.isNotEmpty(param.keyword.accountName)) {
      query['bankAcc'] = param.keyword.accountName
    }
    if (Validate.isNotEmpty(param.keyword.account)) {
      query['account1'] = param.keyword.account
    }
    if (Validate.isNotEmpty(param.keyword.certificateValidityTimeStart)) {
      query['zsLastDate'] = param.keyword.certificateValidityTimeStart
    }
    if (Validate.isNotEmpty(param.keyword.email)) {
      query['email'] = param.keyword.email
    }
    if (Validate.isNotEmpty(param.keyword.address)) {
      query['addr'] = param.keyword.address
    }
    if (Validate.isNotEmpty(param.keyword.remark)) {
      query['note'] = param.keyword.remark
    }
    if (Validate.isNotEmpty(param.keyword.usable)) {
      query['usable'] = param.keyword.usable
    }
    if (Validate.isNotEmpty(param.keyword.flag)) {
      query['flag'] = param.keyword.flag
    }

    // if (Validate.isNotEmpty(param.keyword.entid)) {
    //   query['entid'] = param.keyword.entid
    // }
    // // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_SUPPLIER_001',  
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
      if (!res.data.data) {
        res.data.data = []
        return res.data
      }
      res.data.data.dataSet.rows.forEach(item => {
        item.id = item.supplierId
        item.code = item.supplierCode
        item.name = item.supplierName
        item.entid = parseInt(item.entId)
        item.simplifyName = item.shortName
        item.shippingCompanyStatus = item.stat
        item.shippingCompanyType = item.supplierType
        item.shippingCompanyProxyType = item.hdType
        item.customsLine = item.customsLine
        item.certificateCode = item.zzzsh
        item.accountName = item.bankAcc
        item.account = item.account1
        item.certificateValidityTime = item.zsLastDate
        item.email = item.email
        item.address = item.addr
        item.remark = item.note
        item.blacklist = item.isBlacklist === 2
        item.usable = item.usable === 2
      })
      return res.data.data.dataSet
    })
  },
  search2(param) {
    // 将查询关键词转换为接口对应的字段
    const query = {}
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['supplierId'] = param.keyword.id
    }
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['supplierName'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.code)) {
      query['supplierCode'] = param.keyword.code
    }
    if (Validate.isNotEmpty(param.keyword.simplifyName)) {
      query['shortName'] = param.keyword.simplifyName
    }
    if (Validate.isNotEmpty(param.keyword.shippingCompanyStatus)) {
      query['stat'] = param.keyword.shippingCompanyStatus
    }
    if (Validate.isNotEmpty(param.keyword.shippingCompanyType)) {
      query['supplierType'] = param.keyword.shippingCompanyType
    }
    if (Validate.isNotEmpty(param.keyword.shippingCompanyProxyType)) {
      query['hdType'] = param.keyword.shippingCompanyProxyType
    }
    if (Validate.isNotEmpty(param.keyword.certificateCode)) {
      query['zzzsh'] = param.keyword.certificateCode
    }
    if (Validate.isNotEmpty(param.keyword.accountName)) {
      query['bankAcc'] = param.keyword.accountName
    }
    if (Validate.isNotEmpty(param.keyword.account)) {
      query['account1'] = param.keyword.account
    }
    if (Validate.isNotEmpty(param.keyword.certificateValidityTimeStart)) {
      query['zsLastDate'] = param.keyword.certificateValidityTimeStart
    }
    if (Validate.isNotEmpty(param.keyword.email)) {
      query['email'] = param.keyword.email
    }
    if (Validate.isNotEmpty(param.keyword.address)) {
      query['addr'] = param.keyword.address
    }
    if (Validate.isNotEmpty(param.keyword.remark)) {
      query['note'] = param.keyword.remark
    }
    if (Validate.isNotEmpty(param.keyword.usable)) {
      query['usable'] = param.keyword.usable
    }
    if (Validate.isNotEmpty(param.keyword.flag)) {
      query['flag'] = param.keyword.flag
    }
    // 查询时增加组织id条件
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_SUPPLIER_001',  
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
      if (!res.data.data) {
        res.data.data = []
        return res.data
      }
      res.data.data.dataSet.rows.forEach(item => {
        item.id = item.supplierId
        item.code = item.supplierCode
        item.name = item.supplierName
        item.entid = parseInt(item.entId)
        item.simplifyName = item.shortName
        item.shippingCompanyStatus = item.stat
        item.shippingCompanyType = item.supplierType
        item.shippingCompanyProxyType = item.hdType
        item.customsLine = item.customsLine
        item.certificateCode = item.zzzsh
        item.accountName = item.bankAcc
        item.account = item.account1
        item.certificateValidityTime = item.zsLastDate
        item.email = item.email
        item.address = item.addr
        item.remark = item.note
        item.blacklist = item.isBlacklist === 2
        item.usable = item.usable === 2
      })
      return res.data.data.dataSet
    })
  },
  // 6.20 后端张曙光要求更换船公司查询组件接口参数
  searchNew(param) {
    // 将查询关键词转换为接口对应的字段
    const query = {}
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['supplierId'] = param.keyword.id
    }
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['supplierName'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.code)) {
      query['supplierCode'] = param.keyword.code
    }
    if (Validate.isNotEmpty(param.keyword.simplifyName)) {
      query['shortName'] = param.keyword.simplifyName
    }
    if (Validate.isNotEmpty(param.keyword.shippingCompanyStatus)) {
      query['stat'] = param.keyword.shippingCompanyStatus
    }
    if (Validate.isNotEmpty(param.keyword.shippingCompanyType)) {
      query['supplierType'] = param.keyword.shippingCompanyType
    }
    if (Validate.isNotEmpty(param.keyword.shippingCompanyProxyType)) {
      query['hdType'] = param.keyword.shippingCompanyProxyType
    }
    if (Validate.isNotEmpty(param.keyword.isShippingPrice)) {
      query['isShippingPrice'] = param.keyword.isShippingPrice
    }
    if (Validate.isNotEmpty(param.keyword.certificateCode)) {
      query['zzzsh'] = param.keyword.certificateCode
    }
    if (Validate.isNotEmpty(param.keyword.accountName)) {
      query['bankAcc'] = param.keyword.accountName
    }
    if (Validate.isNotEmpty(param.keyword.account)) {
      query['account1'] = param.keyword.account
    }
    if (Validate.isNotEmpty(param.keyword.certificateValidityTimeStart)) {
      query['zsLastDate'] = param.keyword.certificateValidityTimeStart
    }
    if (Validate.isNotEmpty(param.keyword.email)) {
      query['email'] = param.keyword.email
    }
    if (Validate.isNotEmpty(param.keyword.address)) {
      query['addr'] = param.keyword.address
    }
    if (Validate.isNotEmpty(param.keyword.remark)) {
      query['note'] = param.keyword.remark
    }
    if (Validate.isNotEmpty(param.keyword.usable)) {
      query['usable'] = param.keyword.usable
    }
    if (Validate.isNotEmpty(param.keyword.flag)) {
      query['flag'] = param.keyword.flag
    } 
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SDP_SUPPLIER_009',  
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
      if (!res.data.data) {
        res.data.data = []
        return res.data
      }
      res.data.data.dataSet.rows.forEach(item => {
        item.id = item.supplierId
        item.code = item.supplierCode
        item.name = item.supplierName
        item.entid = parseInt(item.entId)
        item.simplifyName = item.shortName
        item.shippingCompanyStatus = item.stat
        item.shippingCompanyType = item.supplierType
        item.shippingCompanyProxyType = item.hdType
        item.customsLine = item.customsLine
        item.certificateCode = item.zzzsh
        item.accountName = item.bankAcc
        item.account = item.account1
        item.certificateValidityTime = item.zsLastDate
        item.email = item.email
        item.address = item.addr
        item.remark = item.note
        item.blacklist = item.isBlacklist === 2
        item.usable = item.usable === 2
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    const query = {}
    // 设置传参格式
    query['supplierId'] = id
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_SUPPLIER_001',  
        params: { ...query }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSupplier/selectHeaderAndLines',
      method: 'post',
      data
    }).then(res => {
      const ob = res.data.data
      res.data.data.id = ob.supplierId
      res.data.data.code = ob.supplierCode
      res.data.data.name = ob.supplierName
      res.data.data.entid = parseInt(ob.entId)
      res.data.data.simplifyName = ob.shortName
      res.data.data.shippingCompanyStatus = ob.stat
      res.data.data.shippingCompanyType = ob.supplierType
      res.data.data.shippingCompanyProxyType = ob.hdType
      res.data.data.customsLine = ob.customsLine
      res.data.data.certificateCode = ob.zzzsh
      res.data.data.accountName = ob.bankAcc
      res.data.data.account = ob.account1
      res.data.data.certificateValidityTime = ob.zsLastDate
      res.data.data.email = ob.email
      res.data.data.address = ob.addr
      res.data.data.remark = ob.note
      res.data.data.userSuplierList = ob.userSuplierList ? ob.userSuplierList : null
      res.data.data.blacklist = ob.isBlacklist === 2
      res.data.data.usable = ob.usable === 2
      // 联系人信息
      if (ob.supplierInis && ob.supplierInis.length > 0) {
        const supplierInis = []
        ob.supplierInis.forEach((item, index) => {
          item.isDefault = item.isDefault === 1
          supplierInis.push({
            $index: index,
            supplierLineId: item.supplierLineId,
            name: item.relaman,
            phone: item.phone,
            fax: item.fax,
            type: item.type,
            isDefault: item.isDefault,
            email: item.email,
          })
        })
        res.data.data.supplierInis = supplierInis
      }
      // 按柜查询
      if (ob.boxLine && ob.boxLine.length > 0) {
        const boxLine = []
        ob.boxLine.forEach((item, index) => {
          boxLine.push({
            $index: index,
            boxLineId: item.boxLineId,
            shippingCompanyProxyType: item.transitType,
            freightStandardTicketCostDetail: item.feeType,
            normFee: item.normFee,
            startTime: item.startDate,
            endTime: item.endDate,
            specGp20: item.boxPrice1,
            specGp40: item.boxPrice2,
            specHq40: item.boxPrice3,
            specHq45: item.boxPrice4,
            mergeContainer: item.boxPrice6,
            airTransportation: item.boxPrice7,
            oneContainer: item.boxPrice8,
            towContainer: item.boxPrice9,
            threeContainer: item.boxPrice10,
          })
        })
        res.data.data.boxLine = boxLine
      }
      // 按票查询
      if (ob.docLine && ob.docLine.length > 0) {
        const docLine = []
        ob.docLine.forEach((item, index) => {
          docLine.push({
            $index: index,
            docLineId: item.docLineId,
            shippingCompanyProxyType: item.transitType,
            freightStandardTicketCostDetail: item.feeType,
            normFee: item.normFee,
            startTime: item.startDate,
            endTime: item.endDate,
            price: item.amt,
          })
        })
        res.data.data.docLine = docLine
      }
      return res.data
    })
  },
  post(param) {
    // 设置传参格式
    const query = {}
    query['$state'] = 1
    query['supplierCode'] = param.code
    query['supplierName'] = param.name
    query['shortName'] = param.simplifyName
    query['stat'] = param.shippingCompanyStatus
    query['supplierType'] = param.shippingCompanyType
    query['hdType'] = param.shippingCompanyProxyType
    query['customsLine'] = param.customsLine
    query['zzzsh'] = param.certificateCode
    query['entId'] = param.entid.toString()
    query['bankAcc'] = param.accountName
    query['account1'] = param.account
    query['zsLastDate'] = param.certificateValidityTime
    query['email'] = param.email
    query['blackCause'] = param.blackCause
    query['addr'] = param.address
    query['note'] = param.remark
    query['userSuplierList'] = param.userSuplierList
    query['isBlacklist'] = param.blacklist ? 2 : 1
    query['usable'] = param.usable ? 2 : 1
    const supplierInis = []
    if (param.supplierInis && param.supplierInis.length > 0) {
      param.supplierInis.forEach((item, index) => {
        item.isDefault = item.isDefault ? 1 : 0
        supplierInis.push({
          seq: index + 1,
          relaman: item.name,
          phone: item.phone,
          fax: item.fax,
          email: item.email,
          type: item.type,
          isDefault: item.isDefault,
          deleted: 0,
        })
      })
    }
    const boxLine = []
    if (param.boxLine && param.boxLine.length > 0) {
      param.boxLine.forEach((item, index) => {
        boxLine.push({
          seq: index + 1,
          transitType: item.shippingCompanyProxyType,
          // feeType: item.freightStandardTicketCostDetail,
          feeType: item.orderFeeId,
          normFee: item.normFee,
          startDate: item.startTime,
          endDate: item.endTime,
          boxPrice1: item.specGp20,
          boxPrice2: item.specGp40,
          boxPrice3: item.specHq40,
          boxPrice4: item.specHq45,
          boxPrice6: item.mergeContainer,
          boxPrice7: item.airTransportation,
          boxPrice8: item.oneContainer,
          boxPrice9: item.towContainer,
          boxPrice10: item.threeContainer,
          deleted: 0,
        })
      })
    }
    const docLine = []
    if (param.docLine && param.docLine.length > 0) {
      param.docLine.forEach((item, index) => {
        docLine.push({
          seq: index + 1,
          transitType: item.shippingCompanyProxyType,
          // feeType: item.freightStandardTicketCostDetail,
          feeType: item.orderFeeId,
          normFee: item.normFee,
          startDate: item.startTime,
          endDate: item.endTime,
          amt: item.price,
          deleted: 0,
        })
      })
    }
    query['supplierInisAdd'] = supplierInis
    query['boxLineAdd'] = boxLine
    query['docLineAdd'] = docLine
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_SUPPLIER_002',
        keyField: 'supplier_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSupplier/insertHeaderAndLine',
      method: 'post',
      data
    })
  },
  put(param) {
    // 设置传参格式
    const query = {}
    query['$state'] = 2
    query['supplierCode'] = param.code
    query['supplierId'] = param.id
    query['supplierName'] = param.name
    query['shortName'] = param.simplifyName
    query['blackCause'] = param.blackCause
    query['stat'] = param.shippingCompanyStatus
    query['supplierType'] = param.shippingCompanyType
    query['hdType'] = param.shippingCompanyProxyType
    query['customsLine'] = param.customsLine
    query['entId'] = param.entid.toString()
    query['zzzsh'] = param.certificateCode
    query['bankAcc'] = param.accountName
    query['account1'] = param.account
    query['zsLastDate'] = param.certificateValidityTime
    query['email'] = param.email
    query['addr'] = param.address
    query['note'] = param.remark
    query['userSuplierList'] = param.userSuplierList
    query['isBlacklist'] = param.blacklist ? 2 : 1
    query['usable'] = param.usable ? 2 : 1
    const supplierInis = []
    if (param.supplierInis && param.supplierInis.length > 0) {
      param.supplierInis.forEach((item, index) => {
        item.isDefault = item.isDefault ? 1 : 0
        supplierInis.push({
          supplierLineId: item.supplierLineId,
          seq: index + 1,
          supplierId: param.id,
          relaman: item.name,
          phone: item.phone,
          fax: item.fax,
          email: item.email,
          type: item.type,
          isDefault: item.isDefault,
          deleted: 0,
        })
      })
    }
    const boxLine = []
    if (param.boxLine && param.boxLine.length > 0) {
      param.boxLine.forEach((item, index) => {
        boxLine.push({
          seq: index + 1,
          boxLineId: item.boxLineId,
          supplierId: param.id,
          transitType: item.shippingCompanyProxyType,
          // feeType: item.freightStandardTicketCostDetail,
          feeType: item.orderFeeId,
          normFee: item.normFee,
          startDate: item.startTime,
          endDate: item.endTime,
          boxPrice1: item.specGp20,
          boxPrice2: item.specGp40,
          boxPrice3: item.specHq40,
          boxPrice4: item.specHq45,
          boxPrice6: item.mergeContainer,
          boxPrice7: item.airTransportation,
          boxPrice8: item.oneContainer,
          boxPrice9: item.towContainer,
          boxPrice10: item.threeContainer,
          deleted: 0,
        })
      })
    }
    const docLine = []
    if (param.docLine && param.docLine.length > 0) {
      param.docLine.forEach((item, index) => {
        docLine.push({
          seq: index + 1,
          docLineId: item.docLineId,
          supplierId: param.id,
          transitType: item.shippingCompanyProxyType,
          feeType: item.orderFeeId,
          normFee: item.normFee,
          startDate: item.startTime,
          endDate: item.endTime,
          amt: item.price,
          deleted: 0,
        })
      })
    }
    query['supplierInis'] = supplierInis
    query['boxLine'] = boxLine
    query['docLine'] = docLine
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_SUPPLIER_003',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSupplier/updateHeaderAndLine',
      method: 'post',
      data
    })
  },
  deleteDetail(params) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        params
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSupplier/deleteHeaderAndLine',
      method: 'post',
      data
    })
  },
  delete(id) {
    const params = {
      supplierId: id
    }
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        params
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSupplier/deleteHeaderAndLine',
      method: 'post',
      data
    })
  }
}
