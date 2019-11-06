import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.id)) {
      query['corpserialno'] = params.id
    }
    if (Validate.isNotEmpty(params.buyerno)) {
      query['buyerno'] = params.buyerno
    }
    if (Validate.isNotEmpty(params.custCode)) {
      query['custCode'] = params.custCode
    }
    if (Validate.isNotEmpty(params.custName)) {
      query['custName'] = params.custName
    }
    if (Validate.isNotEmpty(params.chnname)) {
      query['chnname'] = params.chnname
    }
    if (Validate.isNotEmpty(params.engname)) {
      query['engname'] = params.engname
    }
    if (Validate.isNotEmpty(params.name)) {
      query['orgId'] = params.name
    }

    const data = {
      dataSet: {
        name: 'sysncRecordInfos',
        config: 'ACT_SDP_BUYER_INFO_001',
        keyField: 'corpserialno',
        params: {
          ...query
        },
        page: {
          startRow: params.page * params.size,
          endRow: params.size
        }
      }
    }    
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpRecordInfo/selectRecordInfo',
      method: 'post',
      data
    }).then(res => {
      return res.data.data.dataSet
    })
  },
  get(id) {
    return request({
      url: `/api/buyers/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.salesDepartmentId = data.salesDepartment ? data.salesDepartment.id : null
      data.customerId = data.customer ? data.customer.id : null
      data.countryId = data.country ? data.country.id : null
      data.registerAreaId = data.registerArea ? data.registerArea.id : null
      data.departmentId = data.department ? data.department.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.salesDepartment = data.salesDepartmentId ? {
      id: data.salesDepartmentId
    } : null
    delete param.salesDepartmentId
    param.customer = data.customerId ? {
      id: data.customerId
    } : null
    delete param.customerId
    param.country = data.countryId ? {
      id: data.countryId
    } : null
    delete param.countryId
    param.registerArea = data.registerAreaId ? {
      id: data.registerAreaId
    } : null
    delete param.registerAreaId
    param.department = data.departmentId ? {
      id: data.departmentId
    } : null
    delete param.departmentId
    return request({
      url: '/api/buyers',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.salesDepartment = data.salesDepartmentId ? {
      id: data.salesDepartmentId
    } : null
    delete param.salesDepartmentId
    param.customer = data.customerId ? {
      id: data.customerId
    } : null
    delete param.customerId
    param.country = data.countryId ? {
      id: data.countryId
    } : null
    delete param.countryId
    param.registerArea = data.registerAreaId ? {
      id: data.registerAreaId
    } : null
    delete param.registerAreaId
    param.department = data.departmentId ? {
      id: data.departmentId
    } : null
    delete param.departmentId
    return request({
      url: '/api/buyers',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/buyers/${id}`,
      method: 'delete'
    })
  }
}
