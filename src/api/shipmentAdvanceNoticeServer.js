import request from '@/utils/request'
import Validate from '@/utils/validate.js'
export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.currencyCode)) {
      query['currencyCode'] = params.keyword.currencyCode
    }
    if (Validate.isNotEmpty(params.keyword.warnNo)) {
      query['warnNo'] = params.keyword.warnNo
    }
    if (Validate.isNotEmpty(params.keyword.piNo)) {
      query['piNo'] = params.keyword.piNo
    }
    if (Validate.isNotEmpty(params.keyword.invoiceNo)) {
      query['invoiceNo'] = params.keyword.invoiceNo
    }
    query['entid'] = params.keyword.entid
    // 设置传参格式
    const data = {
      dataSet: {
        config: 'ACT_SDP_FINFEE_LINE_004',  
        params: { ...query },
        page: {
          startRow: params.page * params.size, // 起始行
          endRow: params.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data: data 
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        item.isYt = true
        item.boxQty10 = item.box_qty10 === null ? 0 : item.boxQty10
        item.warnNo = item.warn_no
        item.warnId = parseInt(item.warn_id)
        item.piNo = item.pi_no
        item.invoiceNo = item.invoice_no
        item.superOrgName = item.super_org_name
        item.custName = item.cust_name
        item.custCode = item.cust_code
        item.preShipDate = item.pre_ship_date
        item.transitName = item.transit_name
        item.transitId = item.transit_id
        item.transitCode = item.transit_code
        item.orgName = item.org_name
        item.deleted = 0
        item.hyfAmt = parseFloat(item.hyf_amt)
      })
      return res.data.data.dataSet
    })
  }
}
