import request from '@/utils/request'
import Validate from '@/utils/validate.js'
export default {
  search(param) {
    const query = {}
    if (Validate.isNotEmpty(param.keyword.startDate)) {
      query['startDate'] = param.keyword.startDate
    } else {
      // query['startDate'] = '2019-07-12'
      query['startDate'] = ''
    }
    if (Validate.isNotEmpty(param.keyword.endDate)) {
      query['endDate'] = param.keyword.endDate
    } else {
      // query['endDate'] = '2019-07-15'
      query['endDate'] = ''
    }
    query.piNo = param.keyword.piNo || ''
    query.isTodo = param.keyword.isTodo || ''
    query.warnNo = param.keyword.warnNo || ''
    query.orgName = param.keyword.orgName || ''
    query.entid = param.keyword.entid || localStorage.entid
    query.executor = param.keyword.executor || ''
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'sdpToDo',
        params: { ...query },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpToDo/querySdpTodo',
      method: 'post',
      data
    }).then(res => {
      // 把 options 转成 字符串，让select可以正确匹配
      res.data.data.data.queryList.forEach((item) => {
        item.options = item.options !== null ? item.options + '' : item.options
      })
      return res.data.data
    })
  },
  post(singleRow) {
    const data = {
      dataSet: {
        name: 'sdpToDo',    
        params: {
          options: Number.parseInt(singleRow.options), // 必填选项
          disposeTime: singleRow.disposeTime, // 必填处理时间
          id: singleRow.id // 必填id             
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpToDo/updateSdpTodo',
      method: 'post',
      data: data
    })
  },
}
