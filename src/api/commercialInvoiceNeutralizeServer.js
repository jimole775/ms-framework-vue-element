import request from '@/utils/request'

export default {
  search(params) {
    // 查询时增加组织id条件
    params['query'].entid = parseInt(localStorage.getItem('entid'))
    return request({
      url: '/api/_search/commercial-invoice-neutralizes',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.oldInvoice) {
          item.oldInvoiceId = item.oldInvoice.id
        }
        if (item.operateUnit) {
          item.operateUnitId = item.operateUnit.id
        }
      })
      return res
    })
  },
  get(id) {
    const query = {}
    query['invoiceId'] = parseInt(id)
    const data = {
      dataSet: {
        name: 'invoiceRedInfo',
        config: 'BILL_INVOICE_MERGE',
        params: {
          ...query
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBillInvoice/invoiceRed',
      method: 'post',
      data
    }).then(res => {
      return res.data
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.oldInvoice = data.oldInvoiceId ? {
      id: data.oldInvoiceId
    } : null
    delete param.oldInvoiceId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/commercial-invoice-neutralizes',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.oldInvoice = data.oldInvoiceId ? {
      id: data.oldInvoiceId
    } : null
    delete param.oldInvoiceId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/commercial-invoice-neutralizes',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    const data = {
      dataSet: {
        name: 'invoiceRedInfo',
        config: 'BILL_INVOICE_MERGE',
        rows: [
          {
            delete: id,
            $state: 3
          }
        ]
      }
    }
    
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBillInvoice/invoiceRed',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  },

  // 新增
  add(params) {
    const data = {
      dataSet: {
        name: 'invoiceRedInfo',
        config: 'BILL_INVOICE_MERGE',
        rows: [
          {
            ...params
          }
        ]
      }
    }
    
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBillInvoice/invoiceRed',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  },

  // 根据后端反馈的删除接口为：http://10.88.30.35:8080/auxhome/sdp/api/1.0.0/sdpBillInvoice/invoiceMerge
  delete_plus(params) {
    const data = {
      dataSet: {
        name: 'invoiceMergeInfo',
        config: 'BILL_INVOICE_MERGE',
        rows: [
          {
            ...params
          }
        ]
      }
    }
    
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBillInvoice/invoiceMerge',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  },
  dodelete(id) {
    const data = {
      dataSet: {
        name: 'data',
        params: {
          invoiceId: id
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBill/doDelete',
      method: 'post',
      data
    }).then(res => {
      return res
    })
  }
}
