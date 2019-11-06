import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/bank-infoes',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.department) {
          item.departmentId = item.department.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/bank-infoes/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.departmentId = data.department ? data.department.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.department = data.departmentId ? {
      id: data.departmentId
    } : null
    delete param.departmentId
    return request({
      url: '/api/bank-infoes',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.department = data.departmentId ? {
      id: data.departmentId
    } : null
    delete param.departmentId
    return request({
      url: '/api/bank-infoes',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/bank-infoes/${id}`,
      method: 'delete'
    })
  }
}
