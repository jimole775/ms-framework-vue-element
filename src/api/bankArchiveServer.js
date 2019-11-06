import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/bank-archives',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.area) {
          item.areaId = item.area.id
        }
        if (item.department) {
          item.departmentId = item.department.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/bank-archives/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.areaId = data.area ? data.area.id : null
      data.departmentId = data.department ? data.department.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.area = data.areaId ? {
      id: data.areaId
    } : null
    delete param.areaId
    param.department = data.departmentId ? {
      id: data.departmentId
    } : null
    delete param.departmentId
    return request({
      url: '/api/bank-archives',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.area = data.areaId ? {
      id: data.areaId
    } : null
    delete param.areaId
    param.department = data.departmentId ? {
      id: data.departmentId
    } : null
    delete param.departmentId
    return request({
      url: '/api/bank-archives',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/bank-archives/${id}`,
      method: 'delete'
    })
  }
}
