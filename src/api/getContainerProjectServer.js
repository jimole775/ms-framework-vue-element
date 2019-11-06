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
          name: 'data',
          // 触发数据层配置编码,必传
          config: 'ACT_SPD_SALE_TOWINGTANK_PLAN_HEADER_001',
          // 查询条件,选传
          params: {
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
          id: item.sdpBillId,
          createDate: item['createDate'] ? new Date(item['createDate']) : null
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
  search_without_entid(params) {
    const query = params.query || {}
    const page = params.page || 0
    const size = params.size || 10
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          // 触发数据层配置编码,必传
          config: 'ACT_SPD_SALE_TOWINGTANK_PLAN_HEADER_001',
          // 查询条件,选传
          params: {
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
          id: item.sdpBillId,
          createDate: item['createDate'] ? new Date(item['createDate']) : null
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
  get(id, userType) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpTowingTankPlanHeader/selectHeaderAndLines',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          config: 'ACT_SPD_SALE_TOWINGTANK_PLAN_HEADER_001',
          // 查询条件,选传
          params: {
            sdpBillId: id,
            userType: userType
          },
        }
      }
    }).then(res => {
      res.data.data.id = res.data.data.sdpBillId
      return {
        data: res.data.data
      }
    })
  },
  post(data) {
    if (data.yearAndMonth) {
      data.pYear = parseInt(data.yearAndMonth.substring(0, 4))
      data.pMonth = parseInt(data.yearAndMonth.substring(4))
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpTowingTankPlanHeader/addHeaderAndLines',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          config: 'ACT_SPD_SALE_TOWINGTANK_PLAN_HEADER_003',
          keyField: 'sdpBillId',
          rows: [
            {
              ...data,
              $state: 1,
              entid: parseInt(localStorage.getItem('entid')),
              // 删除标识 必传
              deleted: 0
            }
          ]
        }
      }
    })
  },
  put(data) {
    if (data.yearAndMonth) {
      data.pYear = parseInt(data.yearAndMonth.substring(0, 4))
      data.pMonth = parseInt(data.yearAndMonth.substring(4))
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpTowingTankPlanHeader/updateHeaderAndLines',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          config: 'ACT_SPD_SALE_TOWINGTANK_PLAN_HEADER_004',
          rows: [
            {
              ...data,
              $state: 2,
              // 删除标识 必传
              deleted: 0
            }
          ]
        }
      }
    })
  },
  delete(id) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpTowingTankPlanHeader/deleteHeaderAndLines',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          params:
          {
            sdpBillId: id,
            // $state: 2,
            // // 删除标识 必传
            // deleted: 1
          }
        }
      }
    })
  },
  // 拖柜计划按日期汇总查询
  getDateCountTable(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpTowingTankPlanHeader/SelectDateSummary',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          // 查询条件,选传
          params
        }
      }
    }).then(res => {
      return {
        data: res.data.data
      }
    })
  },
  // 拖柜计划区域分布汇总查询
  getAreaCountTable(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpTowingTankPlanHeader/SelectByTransitName',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          // 查询条件,选传
          params: {
            ...params,
            startDate: params.date && params.date.length > 0 ? datetime.dateToDateStr(params.date[0]) : null,
            endDate: params.date && params.date.length > 1 ? datetime.dateToDateStr(params.date[1]) : null,
          }
        }
      }
    }).then(res => {
      return {
        data: res.data.data
      }
    })
  },
  // 拖柜计划内部大区汇总
  getInternalCountTable(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpTowingTankPlanHeader/SelectByOrgName',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          // 查询条件,选传
          params: {
            ...params,
            startDate: params.date && params.date.length > 0 ? datetime.dateToDateStr(params.date[0]) : null,
            endDate: params.date && params.date.length > 1 ? datetime.dateToDateStr(params.date[1]) : null,
          }
        }
      }
    }).then(res => {
      return {
        data: res.data.data
      }
    })
  },
  findPushMan() {
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: {
        config: 'ACT_SPD_SALE_TOWINGTANK_PLAN_HEADER_005'
      }
    }).then(res => {
      return {
        data: res.data
      }
    })
  },
  updatePushMan(man) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: {
        config: 'ACT_SPD_SALE_TOWINGTANK_PLAN_HEADER_006',
        params: {
          pushMan: man 
        }
      }
    }).then(res => {
      return {
        data: res.data
      }
    })
  },
  weChatPush(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpTowingTankPlanHeader/sendMsgToWeChat',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          params: {
            pushMan: params.pushMan,
            startDate: params.date && params.date.length > 0 ? datetime.dateToDateStr(params.date[0]) : null,
            endDate: params.date && params.date.length > 0 ? datetime.dateToDateStr(params.date[1]) : null,
            type: params.type,
            entId: params.entId
          }
        }
      }
    }).then(res => {
      return {
        data: res.data
      }
    })
  },
  searchDateOfRemove(params) { // 拖柜日期汇总的查询
    params.isShowAllData = params.isShowAllData ? 1 : 2
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: {
        config: 'ACT_SPD_SALE_TOWING_TANK_PLAN_SUMLINE_001',
        params
      }
    }).then(res => {
      return {
        data: res.data
      }
    })
  },
  searchPlanDetails(params) { // 拖柜计划数据的查询
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: {
        config: 'ACT_SPD_SALE_TOWINGTANK_PLAN_LINE_001',
        params
      }
    }).then(res => {
      if (res.data.data) {
        return {
          data: res.data
        }
      } else {
        return {
          data: null
        }
      } 
    })
  }
}
