import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/material-processes',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.machineType) {
          item.machineTypeId = item.machineType.id
        }
        if (item.material) {
          item.materialId = item.material.id
        }
        if (item.operateUnit) {
          item.operateUnitId = item.operateUnit.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/material-processes/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.machineTypeId = data.machineType ? data.machineType.id : null
      data.materialId = data.material ? data.material.id : null
      data.operateUnitId = data.operateUnit ? data.operateUnit.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.machineType = data.machineTypeId ? {
      id: data.machineTypeId
    } : null
    delete param.machineTypeId
    param.material = data.materialId ? {
      id: data.materialId
    } : null
    delete param.materialId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/material-processes',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.machineType = data.machineTypeId ? {
      id: data.machineTypeId
    } : null
    delete param.machineTypeId
    param.material = data.materialId ? {
      id: data.materialId
    } : null
    delete param.materialId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/material-processes',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/material-processes/${id}`,
      method: 'delete'
    })
  }
}
