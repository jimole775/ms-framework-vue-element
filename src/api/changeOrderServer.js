import request from '@/utils/request'
import datetime from '../utils/datetime'

export default {
  search(params) {
    // 查询时增加组织id条件
    // params['query'].entid = parseInt(localStorage.getItem('entid'))
    const query = params.query || {}
    const page = params.page || 0
    const userType = params.userType
    const size = params.size || 10
    params['query'].entid = localStorage.getItem('entid')
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeLocalPay/doSearch',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          // 查询条件,选传
          params: {
            // 改单申请id
            gdId: parseInt(query.id),
            // 状态
            stat: query.orderStatus,
            // 申请单号
            gdNo: query.code,
            userType: userType,
            // 出货预告号
            warnNo: query.shipmentNotice,
            entid: Number.parseInt(query.entid),
            // 合同号
            piNo: query.piNo,
            // 制单人
            createUser: query.createMan
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
      res.data.data.data.forEach(item => {
        list.push({
          ...item,
          id: item['gdId'],
          code: item['gdNo'],
          createMan: item['createUser'],
          createTime: item['createDate'] ? new Date(item['createDate']) : null,
          orderStatus: item['stat'],
          shipmentNotice: item['warnNo'],
          piCode: item['piNo'],
          customer: item['custName'],
          changeOrderCost: item['gdAmt'],
          paymentMan: item['bearers'],
          changeReason: item['gdAction'],
          changeContent: item['gdContent'],
          operateUnitId: item['operateUnitId'],
          shipmentNoticeId: item['warnId']
        })
      })
      const sdpPage = res.data.data.page
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
    return this.search({
      query: {
        id
      }
    }).then(res => {
      return res.data.length > 0 ? {
        data: res.data[0]
      } : {}
    })
  },
  post(data) {
    const param = {
      ...data
    }

    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeLocalPay/saleGdClHeader',
      method: 'post',
      data: {
        dataSet: {
          name: 'saleGdClHeaderInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_SALE_GD_CL_HEADER_002',
          keyField: 'gd_id',
          rows: [{
            $state: 1,
            // 出货预告号
            warnNo: param.warnNo,
            // 改单作用 必传
            gdAction: param.changeReason,
            // 改单费
            gdAmt: param.changeOrderCost.toString(),
            // 费用承担人
            bearers: param.paymentMan,
            // 改单内容
            gdContent: param.changeContent,
            warnId: param.warnId != null ? parseInt(param.warnId, 10) : null,
            piNo: param.piNo,
            custName: param.customer,
            entid: Number.parseInt(param.entid),
            createUser: param.createMan,
            createDate: datetime.dateToDateStr(param.createTime),
            // 删除标识
            deleted: 0
          }]
        }
      }
    })
  },
  put(data) {
    const param = {
      ...data
    }

    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeLocalPay/saleGdClHeader',
      method: 'post',
      data: {
        dataSet: {
          name: 'saleGdClHeaderInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_SALE_GD_CL_HEADER_002',
          keyField: 'gd_id',
          rows: [{
            $state: 2,
            gdId: param.id,
            // 出货预告号
            warnNo: param.warnNo,
            // 改单作用 必传
            gdAction: param.changeReason,
            // 改单费
            gdAmt: param.changeOrderCost.toString(),
            // 费用承担人
            bearers: param.paymentMan,
            // 改单内容
            gdContent: param.changeContent,
            warnId: param.warnId != null ? parseInt(param.warnId, 10) : null,
            piNo: param.piNo,
            custName: param.customer,
            // entid: Number.parseInt(param.entid),
            createUser: param.createMan,
            createDate: datetime.dateToDateStr(param.createTime),
            // 删除标识
            deleted: 0
          }]
        }
      }
    })
  },
  delete(id) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeLocalPay/saleGdClHeader',
      method: 'post',
      data: {
        dataSet: {
          name: 'saleGdClHeaderInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_SALE_GD_CL_HEADER_002',
          keyField: 'gd_id',
          rows: [{
            $state: 2,
            gdId: id,
            // 删除标识 必传
            deleted: 1
          }]
        }
      }
    })
  }
}
