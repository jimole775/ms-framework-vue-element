import request from '@/utils/request'

export default {
  search(params) {
    // 查询时增加组织id条件
    params['query'].entid = parseInt(localStorage.getItem('entid'))
    return request({
      url: '/api/_search/commercial-invoice-splits',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.splitInvoice) {
          item.splitInvoiceId = item.splitInvoice.id
        }
        if (item.operateUnit) {
          item.operateUnitId = item.operateUnit.id
        }
      })
      return res
    })
  },
  get(id, mergingSplitType) {
    const query = {}
    query['invoiceId'] = parseInt(id)
    query['mergingSplitType'] = parseInt(mergingSplitType)
    const data = {
      dataSet: {
        name: 'invoiceMergeInfo',
        config: 'BILL_INVOICE_MERGE',
        params: {
          ...query
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBillInvoice/invoiceMerge',
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
    param.splitInvoice = data.splitInvoiceId ? {
      id: data.splitInvoiceId
    } : null
    delete param.splitInvoiceId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/commercial-invoice-splits',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.splitInvoice = data.splitInvoiceId ? {
      id: data.splitInvoiceId
    } : null
    delete param.splitInvoiceId
    param.operateUnit = data.operateUnitId ? {
      id: data.operateUnitId
    } : null
    delete param.operateUnitId
    return request({
      url: '/api/commercial-invoice-splits',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/commercial-invoice-splits/${id}`,
      method: 'delete'
    })
  },
  // 新增
  add(params) {
    if (params.oldInvoiceNos instanceof Array) {
      params.oldInvoiceNos = params.oldInvoiceNos.join(',')
    }
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
  } 
}
