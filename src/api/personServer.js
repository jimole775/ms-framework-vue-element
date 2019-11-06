import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    // 设置传参格式
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['userName'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.userType)) {
      query['userType'] = param.keyword.userType
    }
    if (Validate.isNotEmpty(param.keyword.userCodes)) {
      query['userCodes'] = param.keyword.userCodes
    }
    if (Validate.isNotEmpty(param.keyword.userCode)) {
      query['userCode'] = param.keyword.userCode
    }
    const data = {
      config: 'ACT_AUX_USER_023',  
      params: { ...query },
      page: {
        startRow: param.page * param.size, // 起始行
        endRow: param.size // 每页条数
      }
    }
    return request({
      url: '/superback/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      if (res.data && res.data.data && res.data.data.data) {
        res.data.data.data.forEach(item => {
          // 将接口返回参数转换为页面对应的字段
          item.name = item.userName
        })
      } else {
        // 处理无数据返回的情况
        res.data.data.data = []
      }
      return res.data.data
    })
  },
  customSearch(id) {
    const data = {
      dataSet: {
        name: 'queryCondition',
        params: {
          entid: localStorage.getItem('entid'),
          orgId: id // 部门id
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/getCpcUser',
      method: 'post',
      data
    }).then(res => {
      if (res.data && res.data.data) {
        res.data.data.forEach(item => {
          // 将接口返回参数转换为页面对应的字段
          item.name = item.userid
        }) 
      } else {
        // 处理无数据返回的情况
        res.data.data = []
      }
      return res.data
    })
  }
}
