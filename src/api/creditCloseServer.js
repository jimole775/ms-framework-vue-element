import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    // 将查询关键词转换为接口对应的字段
    const query = {}
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['lcBillId'] = param.keyword.id
    }
    if (Validate.isNotEmpty(param.keyword.proposer)) {
      query['lcReqMan'] = param.keyword.proposer
    }
    if (Validate.isNotEmpty(param.keyword.code)) {
      query['lcBillNo'] = param.keyword.code
    }
    if (Validate.isNotEmpty(param.keyword.creditCertificateCode)) {
      query['lcNo'] = param.keyword.creditCertificateCode
    }
    if (Validate.isNotEmpty(param.keyword.tradeDocumenterId)) {
      query['proverId'] = param.keyword.tradeDocumenterId
    }
    if (Validate.isNotEmpty(param.keyword.saleDepartmentId)) {
      query['orgId'] = param.keyword.saleDepartmentId
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      params: { ...query },
      page: {
        startRow: param.page * param.size, // 起始行
        endRow: param.size // 每页条数
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBill/querySdpFinLcBill',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        res.data.data = []
        return res.data
      }
      res.data.data.data.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.id = item.lcBillId
        item.itemList = item.itemList ? item.itemList : [] /* 品名 */
        item.code = item.lcBillNo/* 编码 */
        item.creditCertificateDate = item.lcBillDate /* 信用证日期 */
        item.receivedCreditCertificateDate = item.recLcDate /* 收证日期 */
        item.status = item.stat /* 状态 */
        item.creditCertificateCode = item.lcNo /* 信用证号 */
        item.proposer = item.lcReqMan /* 申请人 */
        item.lastLoadDate = item.latestShipmentDate /* 最迟装运日 */
        item.periodValidity = item.lcActiveDate /* 有效期 */
        item.existCreditFile = item.usable === 2 /* 中信保银行档案... */
        item.payWay = item.fkfsType /* 付款方式 */
        item.isNewVersion = item.isNewVersion === 2 /* 是新版本 */
        item.amount = item.incAmt /* 金额 */
        item.upFloatRate = item.incRate /* 上浮比率(%) */
        item.upFloatedAmount = item.amt /* 上浮后金额 */
        item.actualAmount = item.factAmt /* 实际金额 */
        item.amountUsedUp = item.isMoneyOver === 2 /* 金额是否用完 */
        item.allocatedAmount = item.amtDist /* 已分配金额 */
        item.distributableAmount = item.wfpje /* 未分配金额 */
        item.deliveredAmount = item.confirmAmt /* 已发货金额 */
        item.closeBillAmount = item.deliverAmt /* 已交单金额 */
        item.inBatches = item.isPartShipment === 2 /* 分批装运 */
        item.transfer = item.sfzyType === 2 /* 是否转运 */
        item.expireAddress = item.lcArrLocation /* 到期地点 */
        item.closeBillDeadline = item.limitGiveBill /* 交单期限 */
        item.placeOfOriginCertificate = item.origin /* 产地证 */
        item.returnedMoneyDeadline = item.days /* 回款期限 */
        item.pointTime = item.fksd /* 回款时点... */
        item.alterCertificateInformation = item.modifyInfo /* 改证信息 */
        item.suggestedModificationInformation = item.suggestInfo /* 建议修改信息 */
        item.businessFeedback = item.feedbackInfo /* 业务反馈信息 */
        item.businessDocuments = item.consultBillNote ? item.consultBillNote.split(',').map(item => +item) : [] /* 需业务提供单据... */
        item.businessDocumentsOther = item.otherProvideBill /* 提供其他单据... */
        item.consignorName = item.sendMan /* 发货人 */
        item.consignorAddress = item.consignorAddress /* 发货人地址... */
        item.consignorTel = item.consignorPhone /* 发货人电话... */
        item.consignorFax = item.consignorFax /* 发货人传真... */
        item.consignorEmail = item.consignorEMail /* 发货人邮箱... */
        item.consignorEnterpriseCode = item.consignorCompanyCode /* 发货人企业代码... */
        item.consignorCountryCode = item.consignorCountryCode /* 发货人国家代码... */
        item.consignorAeoCode = item.consignorAeoCode /* 发货人AEO编码... */
        item.consigneeName = item.receiveMan /* 收货人 */
        item.consigneeAddress = item.consigneeAddress /* 收货人地址... */
        item.consigneeTel = item.consigneePhone /* 收货人电话... */
        item.consigneeFax = item.consigneeFax /* 收货人传真... */
        item.consigneeEmail = item.consigneeEMail /* 收货人邮箱... */
        item.consigneeEnterpriseCode = item.consigneeCompanyCode /* 收货人企业代码... */
        item.consigneeCountryCode = item.consigneeCountryCode /* 收货人国家代码... */
        item.consigneeAeoCode = item.consigneeAeoCode /* 收货人AEO编码... */
        item.consigneeContactName = item.particularConsigneeName /* 具体联系人名称 */
        item.consigneeContactTel = item.particularConsigneePhone /* 具体联系人电话... */
        item.consigneeContactFax = item.particularConsigneeFax /* 具体联系人传真... */
        item.consigneeContactEmail = item.particularConsigneeEMail /* 具体联系人邮箱...*/
        item.notifyName = item.noticeManName /* 通知人 */
        item.notifyAddress = item.noticeManAddress /* 通知人地址... */
        item.notifyTel = item.noticeManPhone /* 通知人电话... */
        item.notifyFax = item.noticeManFax /* 通知人传真... */
        item.notifyEmail = item.noticeManEMail /* 通知人邮箱... */
        item.notifyEnterpriseCode = item.noticeManCompanyCode /* 通知人企业代码... */
        item.notifyCountryCode = item.noticeManCountryCode /* 通知人国家代码... */
        item.notifyAeoCode = item.noticeManAeoCode /* 通知人AEO编码... */
        item.otherNotifyMan = item.noticeMan /* 其它通知人... */
        item.lc = item.returnEntType /* LC受益人 */
        item.shipCertificate = item.vesselCertificate /* 船证明 */
        item.supplementInfo = item.billRemark /* 加注信息... */
        item.other = item.otherNote /* 其他 */
        item.businessWay = item.fftType /* 业务方式 */
        item.creditCertificateType = item.lcType /* 信用证类型... */
        item.noticeCost = item.zbTzFee /* 正本通知费 */
        item.pointTimeNotMatchCost = item.bfdFee /* 不符点费 */
        item.confirmMan = item.confirmMan /* 确认人 */
        item.confirmTime = item.confirmDate /* 确认时间 */
        item.isConfirm = item.confirmStat === 2 /* 已确认 */
        item.noticeBankId = item.lcInformBankId /* 通知银行 */
        item.noticeBankName = item.lcInformBankName /* 通知银行 */
        item.paymentBankId = item.lcConsultBankId /* 议付银行 */
        item.paymentBankName = item.lcConsultBankName /* 议付银行 */
        item.proveBankId = item.lcOpenBankId /* 开证银行 */
        item.proveBankName = item.lcOpenBankName /* 开证银行 */
        item.swift = item.swift /* 开证行SWIFT */
        item.currencyId = item.currencyCode /* 货币 */
        item.sendPortId = item.seaportOutId /* 出货港 */
        item.sendPortName = item.seaportOutName /* 出货港 */
        item.targetPortId = item.seaportInId /* 到货港 */
        item.targetPortName = item.seaportInName /* 到货港 */
        item.areaId = item.areaId /* 所在国家 */
        item.areaName = item.areaName /* 所在国家 */
        item.saleDepartmentId = item.orgId /* 业务部门 */
        item.saleDepartmentName = item.orgName /* 业务部门 */
        item.customerId = item.custId /* 客户 */
        item.tradeDocumenterId = item.proverId /* 单证人员 */
        item.tradeDocumenter = item.prover /* 单证人员 */
        item.entid = item.entid /* 经营单位... */
        item.forfaitingBankId = item.fftBank /* 福费廷银行... */
        item.confirmingBankId = item.lcExchangeBankId /* 保兑银行 */
        item.confirmingBankName = item.lcExchangeBankName /* 保兑银行 */
      })
      return res.data.data
    })
  },
  toVoid(id) {
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'sdpFinLcBill', // 必填
        config: 'ACT_SDP_SDPFINLCBILL_BUSNO_001', // 必填
        rows: [{
          lcBillId: id // 唯一 必填
        }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBill/cancelSdpFinLcBill',
      method: 'post',
      data
    })
  }
}
