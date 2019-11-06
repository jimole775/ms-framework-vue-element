import request from '@/utils/request'

export default {
  search({
    keyword: {
      noticeNo = '',
      customsNo = '',
      actualShipDateStart = '',
      actualShipDateEnd = ''
    },
    page: startRow = 0,
    size: endRow = 10
  }) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'condition',    
        params: {
          noticeNo, // 发货通知单号
          customsNo, // 报关单号
          isCustoms: 0, // 是否报关 0-全部 1-否 2-是
          actualShipDateStart, // 时间出货时间开始
          actualShipDateEnd // 实际出货时间结束
        },
        page: {
          startRow, // 起始行
          endRow // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/rpt/api/1.0.0/customsNoticeRpt/customsNoticeRpt',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  }
}
