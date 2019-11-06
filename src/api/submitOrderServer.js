import request from '@/utils/request'

export default {
  search(param) {
    // 查询时增加组织id条件
    param['keyword'].entid = parseInt(localStorage.getItem('entid'))
    const data = {
      dataSet: {
        name: 'invoiceHeaderJdInfo',
        config: 'ACT_SDP_BILL_INVOICE_HEADER_JD_001', // 触发数据层配置编码,必传
        keyField: 'bill_id',
        params: { ...param.keyword },
        page: { // 分页信息
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeOcfPay/billInvoiceHeaderJd',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return {
          data: [],
          count: 0
        }
      }
      return {
        data: res.data.data.dataSet.rows,
        count: res.data.data.dataSet.page.total
      }
    })
  },
  get(id) {
    const data = {
      dataSet: {
        name: 'invoiceHeaderJdInfo',
        config: 'ACT_SDP_BILL_INVOICE_HEADER_JD_001', // 触发数据层配置编码,必传
        keyField: 'bill_id',
        params: {
          billId: id
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeOcfPay/billInvoiceHeaderJd',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data.dataSet.rows.length > 0) {
        return {}
      }
      res.data.data.dataSet.rows[0].isWrong = res.data.data.dataSet.rows[0].isWrong === 1 /* 是否出错 */
      return res.data.data.dataSet.rows[0]
    })
  },
  getBillsNo(factInvoiceNo) {
    const data = {
      dataSet: {
        name: 'data',
        params: {
          invoiceNo: factInvoiceNo
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBill/doSelectOneByInvoiceNo',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return null
      }
      return res.data.data
    })
  },
  getTdfdByFactInvoiceNo(factInvoiceNo) {
    const data = {
      dataSet: {
        name: 'data',
        params: {
          factInvoiceNo: factInvoiceNo
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/tddf/getTdfdByFactInvoiceNo',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return null
      }
      return res.data.data
    })
  },
  post(param) {
    param.isWrong = param.isWrong ? 1 : 0
    param.$state = 1
    // 查询时增加组织id条件
    param.entid = parseInt(localStorage.getItem('entid'))
    param.createUser = 
    param.jdMan = localStorage.getItem('user') || '未知人员'
    const data = {
      dataSet: {
        name: 'invoiceHeaderJdInfo',
        config: 'ACT_SDP_BILL_INVOICE_HEADER_JD_001',
        keyField: 'bill_id',
        rows: [{ ...param }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeOcfPay/billInvoiceHeaderJd',
      method: 'post',
      data
    })
  },
  put(param) {
    param.isWrong = param.isWrong ? 1 : 0
    param.$state = 2
    param.createUser = 
    param.jdMan = localStorage.getItem('user') || '未知人员'
    const data = {
      dataSet: {
        name: 'invoiceHeaderJdInfo',
        config: 'ACT_SDP_BILL_INVOICE_HEADER_JD_001',
        keyField: 'bill_id',
        rows: [{ ...param }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeOcfPay/billInvoiceHeaderJd',
      method: 'post',
      data
    })
  },
  delete(id) {
    const data = {
      dataSet: {
        name: 'invoiceHeaderJdInfo',
        config: 'ACT_SDP_BILL_INVOICE_HEADER_JD_001', // 触发数据层配置编码,必传
        keyField: 'bill_id',
        rows: [{
          $state: 2,
          billId: id, // 单据ID 必传
          deleted: 1, // 删除标识 必传
          lineUpd: [{
            billId: id, // 单据ID 必传
            deleted: 1 // 删除标识 必传
          }]
        }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinFeeOcfPay/billInvoiceHeaderJd',
      method: 'post',
      data
    })
  }
}
