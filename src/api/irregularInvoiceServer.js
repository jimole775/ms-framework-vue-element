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
          config: 'ACT_SPD_SPECIAL_BILLS_HEADER_001',
          // 查询条件,选传
          params: {
            billsId: query.id,
            billsNo: query.code,
            createUser: query.createMan,
            stat: query.orderStatus,
            invoiceNo: query.invoiceCode,
            custId: query.customerIds,
            appType: query.applyType,
            entid: query.entid,
            beginDate: query.createOrderTime && query.createOrderTime.length > 0 ? datetime.dateToDateStr(query.createOrderTime[0]) : null,
            endDate: query.createOrderTime && query.createOrderTime.length > 1 ? datetime.dateToDateStr(query.createOrderTime[1]) : null,
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
          id: item['billsId'],
          code: item['billsNo'],
          createMan: item['createUser'],
          orderStatus: item.stat,
          invoiceCode: item['invoiceNos'],
          createTime: item['createDate'],
          applyType: item['appType'],
          remark: item['note'],
          customerId: item['custId']
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
    // return this.search({
    //   id
    // }).then(res => {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSpecialBillsHeader/selectHeaderAndLines',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          // 触发数据层配置编码,必传
          config: 'ACT_SPD_SPECIAL_BILLS_HEADER_001',
          // 查询条件,选传
          params: {
            billsId: id
          }
        }
      }
    }).then(res => {
      const data = res.data.data
      data.id = data['billsId']
      data.code = data['billsNo']
      data.createMan = data['createUser']
      data.orderStatus = data.stat
      data.invoiceCode = data['invoiceNos']
      data.createTime = data['createDate']
      data.applyType = data['appType']
      data.remark = data['note']
      data.customerId = data['custId']
      return {
        data
      } || {
        data: {}
      }
    })
    // })
  },
  post(data) {
    const param = {
      ...data
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSpecialBillsHeader/insertHeaderAndLines',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          // 触发数据层配置编码,必传
          config: 'ACT_SPD_SPECIAL_BILLS_HEADER_002',
          keyField: 'bills_id',
          rows: [{
            $state: 1,
            billsNo: param.code,
            createUser: param.createMan,
            stat: param.orderStatus,
            invoiceNos: param.invoiceCode,
            createDate: param.createTime,
            appType: param.applyType,
            entid: parseInt(localStorage.getItem('entid')),
            custId: param.customerId,
            custName: param.customerName,
            lineEntities: param.lineEntities,
            note: param.remark,
            // 删除标识 必传
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
      url: '/auxhome/sdp/api/1.0.0/sdpSpecialBillsHeader/updateHeaderAndLines',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          // 触发数据层配置编码,必传
          config: 'ACT_SPD_SPECIAL_BILLS_HEADER_003',
          rows: [{
            $state: 2,
            billsId: param.id,
            billsNo: param.code,
            createUser: param.createMan,
            stat: param.orderStatus,
            invoiceNos: param.invoiceCode,
            createDate: param.createTime,
            appType: param.applyType,
            custId: param.customerId,
            custName: param.customerName,
            lineEntities: param.lineEntities,
            note: param.remark,
            // 删除标识 必传
            deleted: 0
          }]
        }
      }
    })
  },
  delete(id) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSpecialBillsHeader/deleteHeaderAndLines',
      method: 'post',
      data: {
        dataSet: {
          name: 'data',
          params: {
            billsId: id
          }
        }
      }
    })
  }
}
