import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/api/_search/marine-price-consultation-items',
      method: 'get',
      params
    }).then(res => {
      res.data.forEach(item => {
        if (item.marinePriceConsultation) {
          item.marinePriceConsultationId = item.marinePriceConsultation.id
        }
        if (item.recommendShippingCompany) {
          item.recommendShippingCompanyId = item.recommendShippingCompany.id
        }
        if (item.shippingCompany) {
          item.shippingCompanyId = item.shippingCompany.id
        }
        if (item.currency) {
          item.currencyId = item.currency.id
        }
        if (item.unitMeasurement) {
          item.unitMeasurementId = item.unitMeasurement.id
        }
      })
      return res
    })
  },
  get(id) {
    return request({
      url: `/api/marine-price-consultation-items/${id}`,
      method: 'get'
    }).then(res => {
      const data = res.data
      data.marinePriceConsultationId = data.marinePriceConsultation ? data.marinePriceConsultation.id : null
      data.recommendShippingCompanyId = data.recommendShippingCompany ? data.recommendShippingCompany.id : null
      data.shippingCompanyId = data.shippingCompany ? data.shippingCompany.id : null
      data.currencyId = data.currency ? data.currency.id : null
      data.unitMeasurementId = data.unitMeasurement ? data.unitMeasurement.id : null
      return res
    })
  },
  post(data) {
    const param = {
      ...data
    }
    param.marinePriceConsultation = data.marinePriceConsultationId ? {
      id: data.marinePriceConsultationId
    } : null
    delete param.marinePriceConsultationId
    param.recommendShippingCompany = data.recommendShippingCompanyId ? {
      id: data.recommendShippingCompanyId
    } : null
    delete param.recommendShippingCompanyId
    param.shippingCompany = data.shippingCompanyId ? {
      id: data.shippingCompanyId
    } : null
    delete param.shippingCompanyId
    param.currency = data.currencyId ? {
      id: data.currencyId
    } : null
    delete param.currencyId
    param.unitMeasurement = data.unitMeasurementId ? {
      id: data.unitMeasurementId
    } : null
    delete param.unitMeasurementId
    return request({
      url: '/api/marine-price-consultation-items',
      method: 'post',
      data: param
    })
  },
  put(data) {
    const param = {
      ...data
    }
    param.marinePriceConsultation = data.marinePriceConsultationId ? {
      id: data.marinePriceConsultationId
    } : null
    delete param.marinePriceConsultationId
    param.recommendShippingCompany = data.recommendShippingCompanyId ? {
      id: data.recommendShippingCompanyId
    } : null
    delete param.recommendShippingCompanyId
    param.shippingCompany = data.shippingCompanyId ? {
      id: data.shippingCompanyId
    } : null
    delete param.shippingCompanyId
    param.currency = data.currencyId ? {
      id: data.currencyId
    } : null
    delete param.currencyId
    param.unitMeasurement = data.unitMeasurementId ? {
      id: data.unitMeasurementId
    } : null
    delete param.unitMeasurementId
    return request({
      url: '/api/marine-price-consultation-items',
      method: 'put',
      data: param
    })
  },
  delete(idList) {
    // 设置传参格式
    const data = {
      dataSets: {
        deleteLine: {
          name: 'deleteLine',
          params: {
            enquirylistLineIdes: idList
          }
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/saleEnquiry/updateEnquiry',
      method: 'post',
      data
    })
  }
}
