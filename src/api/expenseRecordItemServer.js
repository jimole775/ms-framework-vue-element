import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/expense-record-items',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.expenseRecord) {
          item.expenseRecordId = item.expenseRecord.id
        }
        if (item.container) {
          item.containerId = item.container.id
        }
        if (item.freightForwardingCompany) {
          item.freightForwardingCompanyId = item.freightForwardingCompany.id
        }
        if (item.currency) {
          item.currencyId = item.currency.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/expense-record-items/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.expenseRecordId = data.expenseRecord ? data.expenseRecord.id : null
      data.containerId = data.container ? data.container.id : null
      data.freightForwardingCompanyId = data.freightForwardingCompany ? data.freightForwardingCompany.id : null
      data.currencyId = data.currency ? data.currency.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.expenseRecord = data.expenseRecordId ? {
      id: data.expenseRecordId
    } : null
    delete param.expenseRecordId
    param.container = data.containerId ? {
      id: data.containerId
    } : null
    delete param.containerId
    param.freightForwardingCompany = data.freightForwardingCompanyId ? {
      id: data.freightForwardingCompanyId
    } : null
    delete param.freightForwardingCompanyId
    param.currency = data.currencyId ? {
      id: data.currencyId
    } : null
    delete param.currencyId
    return request({
      url: '/api/expense-record-items',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.expenseRecord = data.expenseRecordId ? {
      id: data.expenseRecordId
    } : null
    delete param.expenseRecordId
    param.container = data.containerId ? {
      id: data.containerId
    } : null
    delete param.containerId
    param.freightForwardingCompany = data.freightForwardingCompanyId ? {
      id: data.freightForwardingCompanyId
    } : null
    delete param.freightForwardingCompanyId
    param.currency = data.currencyId ? {
      id: data.currencyId
    } : null
    delete param.currencyId
    return request({
      url: '/api/expense-record-items',
      method: 'put',
      data: param
    })
  },
  delete(id) {
    return request({
      url: `/api/expense-record-items/${id}`,
      method: 'delete'
    })
  }
}
