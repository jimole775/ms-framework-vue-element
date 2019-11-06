import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    // 设置传参格式
    if (Validate.isNotEmpty(param.keyword.key)) {
      query['key'] = param.keyword.key
    }
    const data = {
      dataSet: {
        name: 'data',
        params: { ...query },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinExtraPayreg/doSearchPayreg',
      method: 'post',
      data
    }).then(res => {
      // res.data.data.dataSet.rows.forEach(item => {
      //   // 将接口返回参数转换为页面对应的字段
      //   item.id = item.areaId
      //   item.name = item.areaName
      //   item.code = item.areaCode
      //   item.number = item.telZone
      //   item.areaType = item.areaType
      //   item.remark = item.note
      // })
      return res.data
    })
  },
}

