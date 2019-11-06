import request from '@/utils/request'

export default {
  search(param) {
    // 查询时增加组织id条件
    param['keyword'].entid = parseInt(localStorage.getItem('entid'))
    const data = {
      dataSet: {
        name: 'saleCustoms',
        config: 'SALE_CUSTOMS_HEADER_LIST',  
        params: { ...param.keyword },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleCustoms/saleCustomsManagment',
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
  searchQuote(param) {
    const data = {
      dataSet: {
        name: 'condition',
        params: { ...param.keyword },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleCustoms/getDisabledSaleCustoms',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return {
          data: []
        }
      }
      return res.data.data
    })
  },
  addDetailSearch(param) {
    const data = {
      dataSet: {
        name: 'condition', 
        params: { ...param.keyword },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/baseData/getHlineDetail',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return []
      }
      return res.data.data
    })
  },
  declare(id) {
    const params = {
      customsId: id
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSaleCustomsIems/uploadCustomsData',
      method: 'get',
      params
    })
  },
  downExcel(params) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/ecpFile/exportCustomsExcel',
      method: 'get',
      params
    })
  },
  checkProductType(param) {
    const data = {
      dataSet: {
        name: 'saleCustOmsHLineList', 
        params: {
          saleCustOmsHLineList: param
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleCustoms/getFacItemcode',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return []
      }
      return res.data
    })
  },
  get(id) {
    const query = {}
    // 设置传参格式
    query['customs_id'] = id
    const data = {
      dataSet: {
        name: 'saleCustoms',
        config: 'SALE_CUSTOMS_PUSH',
        keyField: 'customs_id',
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
      res.data.data.is_imp = res.data.data.is_imp === 2
      res.data.data.is_new = res.data.data.is_new === 1
      res.data.data.is_repeat_customs = res.data.data.is_repeat_customs === 1
      if (res.data.data.sale_customs_h_lineofsale_customs_header) {
        res.data.data.sale_customs_h_lineofsale_customs_header.forEach(item => {          
          item.sale_customs_lineofsale_customs_h_lines = {
            relationData: item.sale_customs_lineofsale_customs_h_lines
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
    param.is_check = param.is_check ? 1 : 0
    param.is_imp = param.is_imp ? 2 : 1
    param.is_new = param.is_new ? 1 : 0
    param.is_repeat_customs = param.is_repeat_customs ? 1 : 0
    param.sale_customs_h_lineofsale_customs_header.forEach(item => {
      item.sale_customs_lineofsale_customs_h_lines = 
      item.sale_customs_lineofsale_customs_h_lines.relationData ? item.sale_customs_lineofsale_customs_h_lines.relationData : []
    })
    const query = {
      ...param,
      entid: parseInt(localStorage.getItem('entid')),
      $state: 1,
    }
    const data = {
      dataSet: {
        name: 'saleCustoms',
        config: 'SALE_CUSTOMS_PUSH',
        keyField: 'customs_id',
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleCustoms/saleCustomsManagment',
      method: 'post',
      data
    })
  },
  put(param) {
    const changeList = []
    const newList = []
    param.is_check = param.is_check ? 1 : 0
    param.is_imp = param.is_imp ? 2 : 1
    param.is_new = param.is_new ? 1 : 0
    param.is_repeat_customs = param.is_repeat_customs ? 1 : 0

    // 合并删除列表，一起处理
    param.sale_customs_h_lineofsale_customs_header = param.sale_customs_h_lineofsale_customs_header.concat(param.deletedList)
    param.sale_customs_h_lineofsale_customs_header.forEach(item => {
      if (!item.sale_customs_lineofsale_customs_h_lines) {
        item.sale_customs_lineofsale_customs_h_lines = []
      } else {
        item.sale_customs_lineofsale_customs_h_lines =
        item.sale_customs_lineofsale_customs_h_lines.relationData ? item.sale_customs_lineofsale_customs_h_lines.relationData : []
      }
      if (item.customs_id) {
        changeList.push(item)
      } else {
        newList.push(item)
      }
    })

    // 删除服务器不需要的字段
    delete param.deletedList
    param.sale_customs_h_lineofsale_customs_header = newList
    param.saleCustomsHLine = changeList
    const query = {
      ...param,
      $state: 2,
    }
    const data = {
      dataSet: {
        name: 'saleCustoms',
        config: 'SALE_CUSTOMS_PUSH',
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleCustoms/saleCustomsManagment',
      method: 'post',
      data
    })
  },
  toVoid(id) {
    const query = {
      customs_id: id,
      stat: 99,
      $state: 2,
    }
    const data = {
      dataSet: {
        name: 'saleCustoms',
        config: 'SALE_CUSTOMS_PUSH',
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleCustoms/saleCustomsManagment',
      method: 'post',
      data
    })
  },
  checkInfo(id) {
    const params = {
      customsId: id,
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSaleCustomsHeader/validateSdpSaleCustomsData',
      method: 'get',
      params
    })
  },
  delete(id) {
    const query = {
      $state: 3,
      deleted: 1,
      customs_id: id
    }
    const data = {
      dataSet: {
        name: 'saleCustoms',
        config: 'SALE_CUSTOMS_PUSH',
        rows: [{ ...query }],
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleCustoms/saleCustomsManagment',
      method: 'post',
      data
    })
  },
  noticeForOMS(delItem) {
    // 删除的时候，通知oms    
    const data = {
      params: {
        warn_id: delItem.warn_id, // 出货预告id
        notice_id: delItem.notice_id,	// 发货通知单id
        ab_votes: delItem.ab_votes,	// ab票
        entid: localStorage.getItem('entid')
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleCustoms/delOmsCutsoms',
      method: 'post',
      data
    })
  }
}
