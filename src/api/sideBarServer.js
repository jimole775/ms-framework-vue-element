import request from '@/utils/request'

export default {
  post(menuItem) {
    const param = {
      dataSet: {
        name: 'datas',
        params: {
          menuName: menuItem.name, // 菜单名称
          fq: menuItem.fq
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/menuClickRate/saveMenuClickInfo',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/menuClickRate/saveMenuClickInfo',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/menuClickRate/saveMenuClickInfo',
      method: 'delete'
    })
  }
}
