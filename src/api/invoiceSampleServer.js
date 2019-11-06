import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    // 将查询关键词转换为接口对应的字段
    const query = {}
    if (Validate.isNotEmpty(param.keyword.code)) {
      query['caseNo'] = param.keyword.code
    }
    if (Validate.isNotEmpty(param.keyword.createOrderTimeStart)) {
      query['beginDate'] = param.keyword.createOrderTimeStart
    }
    if (Validate.isNotEmpty(param.keyword.createOrderTimeEnd)) {
      query['endDate'] = param.keyword.createOrderTimeEnd
    }
    if (Validate.isNotEmpty(param.keyword.createOrderMan)) {
      query['createUser'] = param.keyword.createOrderMan
    }
    if (Validate.isNotEmpty(param.keyword.remark)) {
      query['note'] = param.keyword.remark
    }
    if (Validate.isNotEmpty(param.keyword.operateUnitId)) {
      query['entid'] = param.keyword.operateUnitId
    } else {
      // 查询时增加组织id条件
      query['entid'] = parseInt(localStorage.getItem('entid'))
    }
    if (Validate.isNotEmpty(param.keyword.departmentCode)) {
      query['orgCode'] = param.keyword.departmentCode
    }
    if (Validate.isNotEmpty(param.keyword.customerCode)) {
      query['custCode'] = param.keyword.customerCode
    }
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_Sdp_Customer_Case_001',  
        rows: [{ ...query }],
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomerCase/doSearch',
      method: 'post',
      data
    }).then(res => {
      res.data.data.data.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.id = item.caseId
        item.code = item.caseNo
        item.createOrderTime = item.createDate
        item.createOrderMan = item.createUser
        item.remark = item.note
        item.operateUnitId = item.entid
        item.departmentCode = item.orgCode
        item.departmentName = item.orgName
        item.customerCode = item.custCode
        item.customerName = item.custName
      })
      return res.data.data
    })
  },
  get(param) {
    const query = {}
    // 设置传参格式
    query['caseId'] = param
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_Sdp_Customer_Case_005',  
        rows: [{ ...query }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomerCase/doSelectOne',
      method: 'post',
      data
    }).then(res => {
      const ob = res.data.data
      res.data.data.id = ob.caseId
      res.data.data.code = ob.caseNo
      res.data.data.createOrderTime = ob.createDate
      res.data.data.createOrderMan = ob.createUser
      res.data.data.remark = ob.note
      res.data.data.operateUnitId = ob.entid
      res.data.data.departmentId = parseInt(ob.orgId)
      res.data.data.departmentCode = ob.orgCode
      res.data.data.departmentName = ob.orgName
      res.data.data.customerId = ob.custId
      res.data.data.customerCode = ob.custCode
      res.data.data.customerName = ob.custName
      return res.data
    })
  },
  post(param) {
    const query = {}
    query['entid'] = param.entid
    if (Validate.isNotEmpty(param.code)) {
      query['caseNo'] = param.code
    }
    if (Validate.isNotEmpty(param.createOrderMan)) {
      query['createUser'] = param.createOrderMan
    }
    if (Validate.isNotEmpty(param.remark)) {
      query['note'] = param.remark
    }
    if (Validate.isNotEmpty(param.operateUnitId)) {
      query['entid'] = param.operateUnitId
    }
    if (Validate.isNotEmpty(param.departmentId)) {
      query['orgId'] = param.departmentId
    }
    if (Validate.isNotEmpty(param.departmentCode)) {
      query['orgCode'] = param.departmentCode
    }
    if (Validate.isNotEmpty(param.departmentName)) {
      query['orgName'] = param.departmentName
    }
    if (Validate.isNotEmpty(param.customerId)) {
      query['custId'] = param.customerId
    }
    if (Validate.isNotEmpty(param.customerCode)) {
      query['custCode'] = param.customerCode
    }
    if (Validate.isNotEmpty(param.customerName)) {
      query['custName'] = param.customerName
    }
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_Sdp_Customer_Case_002',  
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomerCase/doInsert',
      method: 'post',
      data
    })
  },
  put(param) {
    const query = {}
    if (Validate.isNotEmpty(param.code)) {
      query['caseId'] = param.id
    }
    if (Validate.isNotEmpty(param.code)) {
      query['caseNo'] = param.code
    }
    if (Validate.isNotEmpty(param.createOrderMan)) {
      query['createUser'] = param.createOrderMan
    }
    if (Validate.isNotEmpty(param.remark)) {
      query['note'] = param.remark
    }
    if (Validate.isNotEmpty(param.operateUnitId)) {
      query['entid'] = param.operateUnitId
    }
    if (Validate.isNotEmpty(param.departmentId)) {
      query['orgId'] = param.departmentId
    }
    if (Validate.isNotEmpty(param.departmentCode)) {
      query['orgCode'] = param.departmentCode
    }
    if (Validate.isNotEmpty(param.departmentName)) {
      query['orgName'] = param.departmentName
    }
    if (Validate.isNotEmpty(param.customerId)) {
      query['custId'] = param.customerId
    }
    if (Validate.isNotEmpty(param.customerCode)) {
      query['custCode'] = param.customerCode
    }
    if (Validate.isNotEmpty(param.customerName)) {
      query['custName'] = param.customerName
    }
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_Sdp_Customer_Case_003',  
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomerCase/doUpdate',
      method: 'post',
      data
    })
  },
  delete(id) {
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_Sdp_Customer_Case_004',  
        rows: [{ caseId: id }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomerCase/doDelete',
      method: 'post',
      data
    })
  }
}
