import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    query['orgtype'] = 5
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['custName'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['custId'] = param.keyword.id
    }
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'queryCondition',
        config: 'ACT_SDP_CPC_ORG_001',  
        params: { ...query }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/getCustoms',
      method: 'post',
      data
    }).then(res => {
      if (res.data.data) {
        res.data.data.forEach(item => {
          // 将接口返回参数转换为页面对应的字段
          item.id = item.cust_id
          item.name = item.cust_name
          item.code = item.area_code
        })
        return res.data
      } else {
        return []
      }
    })
  },
  get(id) {
    return request({
      url: `/api/customers/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.currencyId = data.currency ? data.currency.id : null
      data.bankInfoId = data.bankInfo ? data.bankInfo.id : null
      data.areaId = data.area ? data.area.id : null
      data.departmentId = data.department ? data.department.id : null
      data.operateUnitId = data.operateUnit ? data.operateUnit.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.currency = data.currencyId ? {
      id: data.currencyId
    } : null
    delete param.currencyId
    param.bankInfo = data.bankInfoId ? {
      id: data.bankInfoId
    } : null
    delete param.bankInfoId
    param.area = data.areaId ? {
      id: data.areaId
    } : null
    delete param.areaId
    param.department = data.departmentId ? {
      id: data.departmentId
    } : null
    delete param.departmentId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/customers',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.currency = data.currencyId ? {
      id: data.currencyId
    } : null
    delete param.currencyId
    param.bankInfo = data.bankInfoId ? {
      id: data.bankInfoId
    } : null
    delete param.bankInfoId
    param.area = data.areaId ? {
      id: data.areaId
    } : null
    delete param.areaId
    param.department = data.departmentId ? {
      id: data.departmentId
    } : null
    delete param.departmentId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/customers',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/customers/${id}`,
      method: 'delete'
    })
  }
}
