import request from '@/utils/request'

export default {
  search(id) {
    console.log('baseData/getDeliveryNotice request:', id)
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/getDeliveryNotice',
      method: 'post',
      data: {
        dataSet: {
          name: 'warnId',
          // 查询条件,选传
          params: {
            warnId: id,
          },
        }
      }
    }).then(res => {
      const list = []
      if (res.data.data) {
        res.data.data.forEach(item => {
          list.push({ ...item })
        })
      }
      return {
        data: list
      }
    })
  },
}
