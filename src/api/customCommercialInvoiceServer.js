import request from '@/utils/request'
export default {
  // 模糊查询
  doSearch(data) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  }
}

