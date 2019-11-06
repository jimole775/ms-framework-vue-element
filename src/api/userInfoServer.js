import request from '@/utils/request'
import Validate from '@/utils/validate.js'
export default {
  put(param) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'user',
        params: { ...param },
      }
    }
    return request({
      url: '/superback/api/1.0.0/auxUser/updateUserPwd',
      method: 'post',
      data
    })
  },
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.userName)) {
      query['userName'] = params.keyword.userName
    }
    if (Validate.isNotEmpty(params.keyword.userCode)) {
      query['userCode'] = params.keyword.userCode
    }
    // 设置传参格式
    const dataTo = {
      config: 'ACT_AUX_USER_023',  
      params: { ...query },
      page: {
        startRow: params.page * params.size, // 起始行
        endRow: params.size // 每页条数
      }
    }
    return request({
      url: '/superback/api/1.0.0/base/selectList',
      method: 'post',
      data: dataTo 
    }).then(res => {
      return res.data
    })
  }
}
