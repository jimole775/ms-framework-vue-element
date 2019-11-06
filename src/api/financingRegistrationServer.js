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
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/billFinacing',
      method: 'post',
      data: {
        dataSet: {
          name: 'billFinacingInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_BILL_FINACING_001',
          keyField: 'bill_id',
          // 查询条件,选传
          params: {
            billId: query.id,
            entid: query.entid,
            billNo: query.code,
            createUser: query.createOrderMan,
            stat: query.orderStatus,
            invoiceNo: query.commercialInvoiceCode,
            factInvoiceNo: query.factInvoiceNo,
            piNo: query.contractCode,
            rongziType: query.financingType,
            beginDate: query.createOrderTime && query.createOrderTime.length > 0 ? datetime.dateToDateStr(query.createOrderTime[0]) : null,
            endDate: query.createOrderTime && query.createOrderTime.length > 1 ? datetime.dateToDateStr(query.createOrderTime[1]) : null,
          },
          // 分页信息
          page: {
            startRow: page * size,
            endRow: page * size + size
          }
        }
      }
    }).then(res => {
      const list = []
      res.data.data.dataSet.rows.forEach(item => {
        list.push({
          ...item,
          id: item['bill_id'],
          code: item['bill_no'],
          createOrderMan: item['create_user'],
          orderStatus: item.stat,
          commercialInvoiceCode: item['invoice_no'],
          creditCertificateCode: item['lc_no'],
          paymentMethod: item['payment_type_name'],
          salesDepartment: item['org_name'],
          contractCode: item['pi_no'],
          estimatedReceivedRemittanceDate: item['funds_datetime'] ? new Date(item['funds_datetime']) : null,
          financingType: item['rongzi_type'],
          financingAmount: item['rongzi_amt'],
          financingInterestRate: item['rongzi_rate'],
          financingDate: item['rongzi_datetime'] ? new Date(item['rongzi_datetime']) : null,
          financingDay: item['rongzi_days'],
          financingInterest: item['rongzi_fx'],
          serviceChargeInterestRate: item['shoux_fl'],
          serviceCharge: item['shoux_fy'],
          invoiceAmount: item['invoice_amt'],
          remark: item['note'],
          commercialInvoiceId: item['invoice_id'],
          financingBankId: item['rongzi_bank_id'],
          costingRate: item['costing_rate'],
          alsoDatetime: item['also_datetime'] ? new Date(item['also_datetime']) : null,
          operateUnitId: item['entid'],
          factInvoiceNo: item['fact_invoice_no'],
          custName: item['cust_name'],
          createOrderTime: item['create_date'],
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
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/billFinacing',
      method: 'post',
      data: {
        dataSet: {
          name: 'billFinacingInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_BILL_FINACING_001',
          keyField: 'bill_id',
          rows: [{
            $state: 1,
            // 发票流水号ID 必传
            invoiceId: param.commercialInvoiceId,
            // 融资类型必传
            rongziType: param.financingType,
            // 预计收汇日期 必传
            fundsDatetime: datetime.dateToDateStr(param.estimatedReceivedRemittanceDate),
            // 融资日期 必传
            rongziDatetime: datetime.dateToDateStr(param.financingDate),
            // 融资金额 必传
            rongziAmt: param.financingAmount,
            // 手续费率 必传
            shouxFl: param.serviceChargeInterestRate.toString(),
            // 融资利率 必传
            rongziRate: param.financingInterestRate.toString(),
            libor: param.libor.toString(),
            alsoDatetime: datetime.dateToDateStr(param.alsoDatetime),
            costingRate: param.costingRate.toString(),
            note: param.remark,
            custName: param.custName,
            rongziBank: param.rongziBank,
            createDate: datetime.dateToDateStr(param.createOrderTime),
            createUser: param.createOrderMan,
            stat: param.orderStatus,
            lcNo: param.creditCertificateCode,
            rongziBankId: param.financingBankId,
            entid: parseInt(localStorage.getItem('entid')),
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
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/billFinacing',
      method: 'post',
      data: {
        dataSet: {
          name: 'billFinacingInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_BILL_FINACING_001',
          keyField: 'bill_id',
          rows: [{
            $state: 2,
            billId: param.id,
            // 发票流水号ID 必传
            invoiceId: param.commercialInvoiceId,
            // 融资类型必传
            rongziType: param.financingType,
            // 预计收汇日期 必传
            fundsDatetime: datetime.dateToDateStr(param.estimatedReceivedRemittanceDate),
            // 融资日期 必传
            rongziDatetime: datetime.dateToDateStr(param.financingDate),
            // 融资金额 必传
            rongziAmt: param.financingAmount,
            // 手续费率 必传
            shouxFl: param.serviceChargeInterestRate.toString(),
            // 融资利率 必传
            rongziRate: param.financingInterestRate.toString(),
            rongziBankId: param.financingBankId,
            note: param.remark,
            libor: param.libor.toString(),
            alsoDatetime: datetime.dateToDateStr(param.alsoDatetime),
            costingRate: param.costingRate.toString(),
            rongziBank: param.rongziBank,
            createDate: datetime.dateToDateStr(param.createOrderTime),
            createUser: param.createOrderMan,
            stat: param.orderStatus,
            lcNo: param.creditCertificateCode,
            custName: param.custName,
            // 删除标识 必传
            deleted: 0
          }]
        }
      }
    })
  },
  delete(id) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpSalePayreg/billFinacing',
      method: 'post',
      data: {
        dataSet: {
          name: 'billFinacingInfo',
          // 触发数据层配置编码,必传
          config: 'ACT_SDP_BILL_FINACING_001',
          keyField: 'bill_id',
          rows: [{
            $state: 2,
            billId: id,
            // 删除标识 必传
            deleted: 1
          }]
        }
      }
    })
  }
}
