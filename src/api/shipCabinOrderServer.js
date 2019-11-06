import request from '@/utils/request'
import datetime from '../utils/datetime'

export default {
  search(params) {
    // 查询时增加组织id条件
    params['query'].entid = parseInt(localStorage.getItem('entid'))
    const query = params.query || {}
    const page = params.page || 0
    const size = params.size || 10
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: {
        dataSet: {
          // 触发数据层配置编码,必传
          config: 'ACT_SPD_BOOKING_001',
          // 查询条件,选传
          params: {
            piNo: query.contractNo,
            ...query
          },
          // 分页信息
          page: {
            startRow: page * size,
            endRow: size
          }
        }
      }
    }).then(res => {
      const list = []
      res.data.data.dataSet.rows.forEach(item => {
        list.push({
          ...item,
          id: item.bookingId,
          preShipDate: item['preShipDate'] ? new Date(item['preShipDate']) : null,
          departDate: item['departDate'] ? new Date(item['departDate']) : null,
          cutDate: item['cutDate'] ? new Date(item['cutDate']) : null,
          contractNo: item['piNo'],
          priceTypeNameStr: item.priceTypeName,
          priceTypeName: item['priceTerms']
        })
      })
      const sdpPage = res.data.data.dataSet.page
      const size = sdpPage.endRow - sdpPage.startRow
      return {
        data: list,
        pagination: {
          page: sdpPage.endRow / size,
          size: size || 10,
          count: sdpPage.total
        }
      }
    })
  },
  get(id) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBookingNoteHeader/selectBookingInfo',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          // 查询条件,选传
          params: {
            bookingId: id
          },
        }
      }
    }).then(res => {
      const data = res.data.data
      data.warnInfo.id = data.warnInfo.bookingId
      data.warnInfo.preShipDate = data.warnInfo['preShipDate'] ? new Date(data.warnInfo['preShipDate']) : null
      data.warnInfo.departDate = data.warnInfo['departDate'] ? new Date(data.warnInfo['departDate']) : null
      data.warnInfo.contractNo = data.warnInfo.piNo
      return {
        data: res.data.data
      }
    })
  },
  post(data) {
    data.preShipDate = datetime.dateToDateStr(data.preShipDate)
    data.departDate = datetime.dateToDateStr(data.departDate)
    data.cutDate = datetime.dateToDateStr(data.cutDate)
    data.piNo = data.contractNo
    data.isFc = data.isFc ? 2 : 1
    data.isBg = data.isBg ? 2 : 1
    data.isExce = data.isExce ? 2 : 1
    data.isAccident = data.isAccident ? 2 : 1
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBookingNoteHeader/insertBookingInfo',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          // 触发数据层配置编码,必传
          keyField: 'bookingId',
          params: {
            $state: 1,
            ...data,
            // 删除标识 必传
            deleted: 0
          }
        }
      }
    })
  },
  put(data) {
    data.preShipDate = datetime.dateToDateStr(data.preShipDate)
    data.departDate = datetime.dateToDateStr(data.departDate)
    data.cutDate = datetime.dateToDateStr(data.cutDate)
    data.piNo = data.contractNo
    data.isFc = data.isFc ? 2 : 1
    data.isBg = data.isBg ? 2 : 1
    data.isExce = data.isExce ? 2 : 1
    data.isAccident = data.isAccident ? 2 : 1
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBookingNoteHeader/updateBookingInfo',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          keyField: 'bookingId',
          params: {
            $state: 2,
            ...data,
            // 删除标识 必传
            deleted: 0
          }
        }
      }
    })
  },
  delete(id) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/update',
      method: 'post',
      data: {
        config: 'ACT_SPD_BOOKING_001',
        params: {
          bookingId: id
        }
      }
    })
  },
  supportList(param) {
    const data = {
      dataSet: {
        name: 'datas',
        params: {
          ...param,
          methodCode: 'oms_009'
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/getDocIdUrl',
      method: 'post',
      data
    })
  },
  supportList2(param) {
    const data = {
      dataSet: {
        name: 'data',
        params: {
          ...param,
          methodCode: 'oms_010'
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBoxExport/bookingExcelExport',
      method: 'post',
      data
    })
  },
  getContainerProject(id, userType) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBookingNoteHeader/selectTowingtankPlanLineList',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          // 查询条件,选传
          params: {
            warnNo: id,
            userType: userType
          },
        }
      }
    }).then(res => {
      return {
        data: res.data.data || []
      }
    })
  },
  changeOrder(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBookingNoteHeader/bookingChange',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          // 查询条件,选传
          params
        }
      }
    })
  },
  cancelChange(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBookingNoteHeader/cancelChange',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          // 查询条件,选传
          params
        }
      }
    })
  },
  confirmShipDate(params) {
    params.preShipDate = datetime.dateToDateStr(params.preShipDate)
    params.departDate = datetime.dateToDateStr(params.departDate)
    params.cutDate = datetime.dateToDateStr(params.cutDate)
    params.cutoffDate = datetime.dateToDateStr(params.cutoffDate)
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBookingNoteHeader/shipmentProcess',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          // 查询条件,选传
          params
        }
      }
    })
  },
  createBillOfLayding(id) {
    const query = {}
    // 设置传参格式
    query['bookingId'] = id
    const dataTo = {
      dataSet: {
        name: 'data',
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpMakingOrder/doInsert',
      method: 'post',
      data: dataTo
    }).then(res => {
      return res
    })
  },
  doExport(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/exportExcel/doExport',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          // 查询条件,选传
          params
        }
      }
    })
  },
  updateWalkthroughArk(id) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBookingNoteHeader/getOmsUpdateBookingInfo',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          // 查询条件,选传
          params: {
            warnId: id
          },
        }
      }
    }).then(res => {
      return res.data
    })
  },
  synchronizeLogisticsStatus(billNo) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBookingNoteLogistics/bookingLogistics',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          // 查询条件,选传
          params: {
            billNo: billNo
          },
        }
      }
    }).then(res => {
      return res.data
    })
  },
  saveCollectFees(bookingId, entid, warnId) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/feeLocalYtLine2/insertInfo',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          // 查询条件,选传
          params: {
            bookingId: bookingId,
            entid: entid,
            warnId: warnId
          },
        }
      }
    }).then(res => {
      return res.data
    })
  },
  changeStatus(params) {
    const query = {}
    query['bookingId'] = params.bookingId
    query['status'] = 7
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBookingNoteHeader/shipmentProcess',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          // 查询条件,选传
          params: query
        }
      }
    })
  },
  queryWarnNoAttahment(params) {
    const query = {}
    query['bookingId'] = params.keyWord.bookingId

    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: {
        dataSet: {
          config: 'ACT_SPD_BOOKING_ATTACHMENT_SELECT',
          params: {
            ...query
          },
          page: params.page
        }
      }
    }).then(res => {
      return res.data
    })
  }
}
