import request from '@/utils/request'

export default {
  search(param) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',  
        params: { ...param.keyword },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsMenu/doSearch',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return {}
      }
      return res.data.data
    })
  },
}
