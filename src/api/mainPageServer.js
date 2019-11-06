import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['bankName'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['bankId'] = param.keyword.id
    }
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BANK_NAME_003',
        params: { ...query },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        item.Swift_Code = item.swiftCode
        item.name = item.bankName
        item.id = item.bankId
        item.address = item.adress
        item.remark = item.note
        item.isDelete = item.deleted
        item.departmentId = item.entid
        if (item.usable === 2) {
          item.usable = true
        }
        if (item.usable === 1) {
          item.usable = false
        }
        item.enable = item.usable
      })
      return res.data.data.dataSet
    })
  }
}
