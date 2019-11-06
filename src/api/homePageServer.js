import request from '@/utils/request'

export default {
  search(param) {
    // 设置传参格式
    const data = {
      page: {
        startRow: param.page * param.size, // 起始行
        endRow: param.size// 每页条数
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/getReminderOfWork',
      method: 'post',
      data
    })
  },
  searchBook(param) {
    // 设置传参格式
    const data = {
      dataSet: {
        config: 'ACT_SDP_OMS_SEND_INFO_SELECT',
        params: {},
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
    })
  },
  noticeRead(id) {
    // 设置传参格式
    const data = {
      config: 'ACT_SDP_OMS_SEND_INFO_UPDATE',
      params: {
        id,
        isRead: 2
      },
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/update',
      method: 'post',
      data
    })
  },
  getSystemNotice({ params, paging }) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',  
        params: { 
          noticeStatus: 2,
        },
        page: {
          startRow: paging.page * paging.size, // 起始索引
          endRow: paging.size // 每页条数
        }
      }
    }
    return request({
      url: '/superback/api/1.0.0/systemNotice/doSearch',
      method: 'post',
      data
    })
  }
}
