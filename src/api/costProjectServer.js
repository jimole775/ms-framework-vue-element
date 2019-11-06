import request from '@/utils/request'
import Validate from '@/utils/validate.js'
export default {
  search(data) {
    const query = {}
    if (Validate.isNotEmpty(data.keyword.id)) {
      query['orderFeeId'] = data.keyword.id
    }
    if (Validate.isNotEmpty(data.keyword.code)) {
      query['orderFeeCode'] = data.keyword.code
    }
    if (Validate.isNotEmpty(data.keyword.name)) {
      query['orderFeeName'] = data.keyword.name
    }
    if (Validate.isNotEmpty(data.keyword.costProjectProjectType)) {
      query['feeItem'] = data.keyword.costProjectProjectType
    }
    if (Validate.isNotEmpty(data.keyword.isDefault)) {
      query['isDefault'] = data.keyword.isDefault
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const dataTo = {
      dataSet: {
        config: 'ACT_SPD_SALE_ORDERFEE_001',  
        params: { ...query },
        page: {
          startRow: data.page * data.size, // 起始行
          endRow: data.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: dataTo 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.id = item.orderFeeId
        item.code = item.orderFeeCode
        item.name = item.orderFeeName
        item.costProjectType = item.orderFeeType
        item.costProjectProjectType = item.feeItem
        item.portType = item.seaportType
        if (item.usable === 2) {
          item.usable = true
        }
        if (item.usable === 1) {
          item.usable = false
        } 
        if (item.isExtra === 2) {
          item.isExtra = true
        }
        if (item.isExtra === 1) {
          item.isExtra = false
        } 
        item.enable = item.usable
        item.remark = item.note
        // item.areaName = item.areaName
      })
      return res.data.data.dataSet
    })
  },
  get(id) {
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['orderFeeId'] = id
    }
    // 设置传参格式
    const dataTo = {
      dataSet: {
        config: 'ACT_SPD_SALE_ORDERFEE_001',  
        params: { ...query },
        page: {
          startRow: 0, // 起始行
          endRow: 10 // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: dataTo 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.code = item.orderFeeCode
        item.name = item.orderFeeName
        item.costProjectType = item.orderFeeType
        item.enable = item.usable
        item.remark = item.note
        item.key = item.seq
        item.costProjectProjectType = item.feeItem
        item.id = item.orderFeeId
        // item.areaName = item.areaName
      })
      return res.data.data.dataSet.rows[0]
    })
  },
  post(data) {
    const query = {}
    query['entid'] = data.entid
    query['orderFeeCode'] = data.code
    query['orderFeeName'] = data.name
    query['orderFeeType'] = data.costProjectType
    query['feeItem'] = data.costProjectProjectType
    query['deleted'] = 0
    query['usable'] = data.enable
    query['isExtra'] = data.isExtra
    query['note'] = data.remark
    if (Validate.isNotEmpty(data.normFee)) {
      query['normFee'] = data.normFee
    }
    query['seq'] = parseInt(data.key)
    query['$state'] = 1
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_SALE_ORDERFEE_002',  
        keyField: 'ORDER_FEE_ID',
        rows: [query],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSaleOrderFee/insertSaleOrderFee',
      method: 'post',
      data: dataTo 
    }).then(res => {
      return res.data.data.orderFeeId
    })
  },
  put(data) {
    const query = {}
    query['orderFeeCode'] = data.code
    query['orderFeeName'] = data.name
    query['orderFeeType'] = data.costProjectType
    query['orderFeeId'] = data.id
    query['feeItem'] = data.costProjectProjectType
    query['deleted'] = 0
    if (Validate.isNotEmpty(data.normFee)) {
      query['normFee'] = data.normFee
    }
    query['usable'] = data.enable
    query['isExtra'] = data.isExtra
    query['isDefault'] = data.isDefault
    query['note'] = data.remark
    query['seq'] = parseInt(data.key)
    query['$state'] = 2
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_SALE_ORDERFEE_002',  
        keyField: 'ORDER_FEE_ID',
        rows: [query],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSaleOrderFee/updateSaleOrderFee',
      method: 'post',
      data: dataTo 
    }).then(res => {
      // return res.data.data.orderFeeId
    })
  },
  delete(data) {
    const query = {}
    query['orderFeeId'] = data.orderFeeId
    query['deleted'] = 1
    query['$state'] = 2
    const dataTo = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_SALE_ORDERFEE_003',
        keyField: 'ORDER_FEE_ID',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSaleOrderFee/updateSaleOrderFee',
      method: 'post',
      data: dataTo
    }).then(res => {
    })
  }
}
