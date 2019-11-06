import request from '@/utils/request'

export default {
  search(param) {
    // 查询时增加组织id条件
    param['keyword'].entid = parseInt(localStorage.getItem('entid'))
    const data = {
      dataSet: {
        name: 'customsReport',
        config: 'ACT_SDP_CUSTOMS_REPORT',  
        params: { ...param.keyword },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsReport/customsReportManagement',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return {
          sdpSaleCustomsVos: []
        }
      }
      return res.data.data
    })
  },
  get(id) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'customsReport',
        config: 'ACT_SDP_CUSTOMS_REPORT',  
        params: {
          fk_id: id
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsReport/customsReportManagement',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return null
      }
      return res.data.data
    })
  },
  getCustoms(id) {
    const query = {}
    // 设置传参格式
    query['customs_id'] = id
    const data = {
      dataSet: {
        name: 'saleCustoms',
        config: 'SALE_CUSTOMS_PUSH',  
        params: { ...query }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleCustoms/saleCustomsManagment',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return null
      }
      res.data.data.is_check = res.data.data.is_check === 1
      res.data.data.is_imp = res.data.data.is_imp === 1
      res.data.data.is_new = res.data.data.is_new === 1
      res.data.data.is_repeat_customs = res.data.data.is_repeat_customs === 1
      if (res.data.data.sale_customs_h_lineofsale_customs_header) {
        res.data.data.sale_customs_h_lineofsale_customs_header.forEach(item => {
          item.sale_customs_lineofsale_customs_h_lines = {
            // 使用 JSON.parse 防止循环引用
            relationData: JSON.parse(JSON.stringify(res.data.data.sale_customs_h_lineofsale_customs_header))
          }
        })
      }
      return res.data.data
    })
  },
  noticeDetail(params) {
    const data = {
      dataSet: {
        name: 'noticeInfo',
        params
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/getNoticeDetail',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        res.data.data = []
        return res.data
      }
      res.data.data.forEach(item => {
        item.customs_amt = parseInt(item.customs_amt)
        item.customs_h_id = parseInt(item.customs_h_id)
        item.customs_price = parseFloat(item.customs_price)
        item.customs_qty = parseInt(item.customs_qty)
        item.x_qty = parseInt(item.customs_qty)
        item.customs_uom = item.customs_uom
        item.customs_id = parseInt(item.customsid)
        item.gw = parseInt(item.gw)
        item.line_amt = parseInt(item.line_amt)
        item.line_type = parseInt(item.line_type)
        item.nw = parseInt(item.nw)
        item.pi_h_id = parseInt(item.pi_h_id)
        item.pi_id = parseInt(item.pi_id)
        item.price = parseFloat(item.price)
        item.prod_h_id = parseInt(item.prod_h_id)
        item.qty = parseInt(item.qty)
        item.seq = parseInt(item.seq)
        item.tj = parseFloat(item.tj)
        item.unit_gw = parseInt(item.unit_gw)
        item.unit_nw = parseInt(item.unit_nw)
        item.unit_tj = parseFloat(item.unit_tj)
        if (item.sale_customs_lineofsale_customs_h_lines &&
          item.sale_customs_lineofsale_customs_h_lines.relationData) {
          item.sale_customs_lineofsale_customs_h_lines.relationData.forEach(element => {
            element.customs_amt = parseInt(element.customs_amt)
            element.customs_h_id = parseInt(element.customs_h_id)
            element.customs_price = parseFloat(element.customs_price)
            element.customs_qty = parseInt(element.customs_qty)
            element.customs_uom = element.customs_uom
            element.customs_id = parseInt(element.customsid)
            element.line_amt = parseInt(element.line_amt)
            element.out_qty = parseInt(element.out_qty)
            element.pi_h_id = parseInt(element.pi_h_id)
            element.pi_id = parseInt(element.pi_id)
            element.pi_line_id = parseInt(element.pi_line_id)
            element.price = parseFloat(element.price)
            element.pro_type = parseInt(element.pro_type)
            element.prod_h_id = parseInt(element.prod_h_id)
            element.unit_gw = parseInt(element.unit_gw)
            element.unit_nw = parseInt(element.unit_nw)
            element.unit_tj = parseFloat(element.unit_tj)
          })
        }
      })
      return res.data
    })
  },
  post(param) {
    const data = {
      dataSet: {
        name: 'customsReport',
        config: 'ACT_SDP_CUSTOMS_REPORT',
        keyField: 'fk_id',
        rows: [{
          ...param,
          $state: 1,
          entid: parseInt(localStorage.getItem('entid'))
        }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsReport/customsReportManagement',
      method: 'post',
      data
    })
  },
  put(param) {
    const data = {
      dataSet: {
        name: 'customsReport',
        config: 'ACT_SDP_CUSTOMS_REPORT',
        keyField: 'fk_id',
        rows: [{
          ...param,
          deleted: 0,
          $state: 2,
        }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsReport/customsReportManagement',
      method: 'post',
      data
    })
  },
  delete(id) {
    const data = {
      dataSet: {
        name: 'customsReport',
        config: 'ACT_SDP_CUSTOMS_REPORT',
        keyField: 'fk_id',
        rows: [{
          fk_id: id,
          deleted: 1,
          $state: 3,
        }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpCustomsReport/customsReportManagement',
      method: 'post',
      data
    })
  }
}
