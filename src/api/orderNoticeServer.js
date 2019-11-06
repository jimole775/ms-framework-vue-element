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
      url: '/auxhome/sdp/api/1.0.0/tddf/tddfManagement',
      method: 'post',
      data: {
        dataSet: {
          name: 'tddfInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_TDFD',
          // 查询条件,选传
          params: {
            tddfId: query.id,
            tddfNo: query.code,
            entid: query.entid,
            pinoNew: query.contractCode,
            invoiceNo: query.invoiceNo,
            factInvoiceNo: query.commercialInvoiceCode,
            noticeNo: query.noticeCode,
            createUser: query.createOrderMan,
            stat: query.status
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
          id: item['tddfId'],
          code: item['tddfNo'],
          createOrderMan: item['createUser'],
          status: item.stat,
          createOrderTime: item['createDate'],
          commercialInvoiceCode: item['factInvoiceNo'],
          invoiceNo: item.invoiceNo,
          contractCode: item['pinoNew'],
          invoiceAmount: item['invoiceAmt'],
          salesDepartment: item['salesDepartment'],
          salesDepartmentId: item['orgId'],
          paymentMethod: item['paymentTypeName'],
          ttAmount: item['ttAmt'],
          presentOrderCode: item['tdOrder'],
          loadDate: item['shipDate'] ? new Date(item['shipDate']) : null,
          buyerCode: item['ciCode'],
          insureInvoiceCode: item['ciInvoiceno'],
          insureAmount: item['ciAmt'],
          insureDate: item['ciDate'],
          noticeCode: item['noticeNo'],
          voicePlayAmount: item['dfAmt'],
          distributionAmount: item['distributionAmount'],
          salesman: item['salesUserId'],
          salesmanId: item['salesUserId'],
          predictArriveDate: item['preDgDate'] ? new Date(item['preDgDate']) : null,
          freeStorageTime: item['freeDay'],
          remark: item['note'],
          noticeType: item['dischargedType'],
          applyThoseResponsible: item['applyMan'],
          applyPhone: item['applyCall'],
          regionalManager: item['qyUser'],
          consigneeInfo: item['receivMan'],
          recipient: item['receiveCom'],
          recipientAddress: item['receiveAddress'],
          postcode: item['email'],
          recipientContact: item['contact'],
          recipientPhone: item['receivePhone'],
          recipientCountry: item['country'],
          recipientCity: item['city'],
          courierCompanyName: item['expressName'],
          courierCode: item['expressCode'],
          commercialInvoiceId: item['invoiceId'],
          customerId: item['custId'],
          custCode: item['custCode'],
          custName: item['custName'],
          operateUnitId: item['entid'],
          orderRecivedDate: item['orderRecivedDate'] ? new Date(item['orderRecivedDate']) : null
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
  searchRecient(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/getConsignee',
      method: 'post',
      data: {
        dataSet: {
          name: 'queryCondition',
          // 查询条件,选传
          params: params.keyword,
          // 分页信息
          page: {
            startRow: params.page * params.size,
            endRow: (params.page + 1) * params.size
          }
        }
      }
    }).then(res => {
      res.data.data.forEach(item => {
        item.address = item.consignee_address // 地址
        item.cust_name = item.consignee_name // 名称 
        item.customs_id = item.consignee_id // ID
        item.tel = item.consignee_phone // 电话
        item.country = item.consignee_country_code // 国家
        item.link_man = item.particular_consignee_name // 联系人
      })

      return res
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
      url: '/auxhome/sdp/api/1.0.0/tddf/tddfManagement',
      method: 'post',
      data: {
        dataSet: {
          name: 'tddfInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_TDFD',
          keyField: 'tddf_id',
          rows: [{
            $state: 1,
            tddfNo: param.code,
            createUser: param.createOrderMan,
            stat: param.status,
            createDate: param.createOrderTime,
            factInvoiceNo: param.commercialInvoiceCode,
            invoiceNo: param.invoiceNo,
            piNo: param.contractCode,
            invoiceAmt: param.invoiceAmount,
            salesDepartment: param.salesDepartment,
            orgName: param.salesDepartment,
            orgId: param.salesDepartmentId,
            paymentTypeName: param.paymentMethod,
            ttAmt: param.ttAmount,
            tdOrder: param.presentOrderCode,
            shipDate: datetime.dateToDateStr(param.loadDate),
            ciCode: param.buyerCode,
            ciInvoiceno: param.insureInvoiceCode,
            ciAmt: param.insureAmount,
            ciDate: param.insureDate,
            noticeNo: param.noticeCode,
            dfAmt: param.voicePlayAmount,
            distributionAmount: param.distributionAmount,
            salesman: param.salesman,
            salesUserId: param.salesman,
            preDgDate: datetime.dateToDateStr(param.predictArriveDate),
            freeDay: param.freeStorageTime,
            note: param.remark,
            dischargedType: param.noticeType,
            applyMan: param.applyThoseResponsible,
            applyCall: param.applyPhone,
            qyUser: param.regionalManager,
            receivMan: param.consigneeInfo,
            receiveCom: param.recipient,
            receiveAddress: param.recipientAddress,
            email: param.postcode,
            contact: param.recipientContact,
            receivePhone: param.recipientPhone,
            country: param.recipientCountry,
            city: param.recipientCity,
            expressName: param.courierCompanyName,
            expressCode: param.courierCode,
            invoiceId: param.commercialInvoiceId,
            custId: param.customerId,
            custCode: param.custCode,
            custName: param.custName,
            entid: parseInt(localStorage.getItem('entid')),
            orderRecivedDate: datetime.dateToDateStr(param.orderRecivedDate),
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
      url: '/auxhome/sdp/api/1.0.0/tddf/tddfManagement',
      method: 'post',
      data: {
        dataSet: {
          name: 'tddfInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_TDFD',
          keyField: 'tddf_id',
          rows: [{
            $state: 2,
            tddfId: param.id,
            tddfNo: param.code,
            createUser: param.createOrderMan,
            stat: param.status,
            createDate: param.createOrderTime,
            factInvoiceNo: param.commercialInvoiceCode,
            invoiceNo: param.invoiceNo,
            piNo: param.contractCode,
            invoiceAmt: param.invoiceAmount,
            salesDepartment: param.salesDepartment,
            orgName: param.salesDepartment,
            orgId: param.salesDepartmentId,
            paymentTypeName: param.paymentMethod,
            ttAmt: param.ttAmount,
            tdOrder: param.presentOrderCode,
            shipDate: datetime.dateToDateStr(param.loadDate),
            ciCode: param.buyerCode,
            ciInvoiceno: param.insureInvoiceCode,
            ciAmt: param.insureAmount,
            ciDate: param.insureDate,
            noticeNo: param.noticeCode,
            dfAmt: param.voicePlayAmount,
            distributionAmount: param.distributionAmount,
            salesman: param.salesman,
            salesUserId: param.salesman,
            preDgDate: datetime.dateToDateStr(param.predictArriveDate),
            freeDay: param.freeStorageTime,
            note: param.remark,
            dischargedType: param.noticeType,
            applyMan: param.applyThoseResponsible,
            applyCall: param.applyPhone,
            qyUser: param.regionalManager,
            receivMan: param.consigneeInfo,
            receiveCom: param.recipient,
            receiveAddress: param.recipientAddress,
            email: param.postcode,
            contact: param.recipientContact,
            receivePhone: param.recipientPhone,
            country: param.recipientCountry,
            city: param.recipientCity,
            expressName: param.courierCompanyName,
            expressCode: param.courierCode,
            invoiceId: param.commercialInvoiceId,
            custId: param.customerId,
            custCode: param.custCode,
            custName: param.custName,
            entid: param.operateUnitId,
            orderRecivedDate: datetime.dateToDateStr(param.orderRecivedDate),
            deleted: 0
          }]
        }
      }
    })
  },
  delete(id) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/tddf/tddfManagement',
      method: 'post',
      data: {
        dataSet: {
          name: 'tddfInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_TDFD',
          keyField: 'tddf_id',
          rows: [{
            $state: 2,
            tddfId: id,
            // 删除标识 必传
            deleted: 1
          }]
        }
      }
    })
  },
  getInvoice(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/tddf/getTddfFpDetail',
      method: 'post',
      data: {
        dataSet: {
          name: 'invoiceInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_TDFD',
          params
        }
      }
    }).then(res => {
      return res.data
    })
  },
  getAnnotate(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/tddf/getTddfPzDetail',
      method: 'post',
      data: {
        dataSet: {
          name: 'invoiceInfo',
          params
        }
      }
    }).then(res => {
      return res.data
    })
  },
  getBuyerCode(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiShipmentapplyinfo/queryEdiInfo',
      method: 'post',
      data: {
        params
      }
    }).then(res => {
      return res.data.data
    })
  }
}
