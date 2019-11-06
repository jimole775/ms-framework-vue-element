import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    // 将查询关键词转换为接口对应的字段
    const query = {}
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['changeId'] = param.keyword.id
    }
    if (Validate.isNotEmpty(param.keyword.lcReqMan)) {
      query['lcReqMan'] = param.keyword.lcReqMan
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
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBillChange/querySdpFinLcBillChange',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        res.data.data = []
        return res.data
      }
      res.data.data.data.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.id = item.changeId
        item.itemList = item.itemList ? item.itemList : [] /* 品名 */
        item.code = item.lcBillNo/* 编码 */
        item.version = item.versionNum /* 版本号 */
        item.changeType = item.changeType /* 变更类型 */
        item.creditCertificateDate = item.lcBillDate /* 信用证日期 */
        item.receivedCreditCertificateDate = item.recLcDate /* 收证日期 */
        item.status = item.stat /* 状态 */
        item.creditCertificateCode = item.lcNo /* 信用证号 */
        item.lcReqMan = item.lcReqMan /* 开证申请人 */
        item.proposer = item.createUser /* 申请人 */
        item.salesUserId = item.salesUserId /* 业务员 */
        item.yAmt = item.yAmt /* 原金额 */
        item.gjTzFee = item.gjTzFee /* 改件通知费 */
        item.yIncRate = item.yIncRate /* 原上浮比率 */
        item.yIncAmt = item.yIncAmt /* 原上浮后金额 */
        item.consultBillNote = item.consultBillNote /* 议付单据 */
        item.note = item.note /* 备注 */
        item.sendMan = item.sendMan /* 发货人 */
        item.receiveMan = item.receiveMan /* 收货人 */
        item.noticeMan = item.noticeMan /* 通知人 */
        item.confirmStat = item.confirmStat === 2 /* 已确认 */
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
        item.consignorName = item.consignorName /* 发货人 */
        item.consignorAddress = item.consignorAddress /* 发货人地址... */
        item.consignorTel = item.consignorPhone /* 发货人电话... */
        item.consignorFax = item.consignorFax /* 发货人传真... */
        item.consignorEmail = item.consignorEMail /* 发货人邮箱... */
        item.consignorEnterpriseCode = item.consignorCompanyCode /* 发货人企业代码... */
        item.consignorCountryCode = item.consignorCountryCode /* 发货人国家代码... */
        item.consignorAeoCode = item.consignorAeoCode /* 发货人AEO编码... */
        item.consigneeName = item.consigneeName /* 收货人 */
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
        item.confirmingBankId = item.lcExchangeBankId /* 保兑银行 */
        item.confirmingBankName = item.lcExchangeBankName /* 保兑银行 */
      })
      return res.data.data
    })
  },
  get(id) {
    // 设置传参格式
    const data = {
      params: {
        changeId: id
      },
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBillChange/querySdpFinLcBillChangeInfo',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return {}
      }
      const item = res.data.data
      // 将接口返回参数转换为页面对应的字段
      item.id = item.changeId
      item.itemList = item.itemList ? item.itemList : [] /* 品名 */
      item.code = item.lcBillNo/* 编码 */
      item.version = item.versionNum/* 版本号 */
      item.changeType = item.changeType /* 变更类型 */
      item.creditCertificateDate = item.lcBillDate /* 信用证日期 */
      item.receivedCreditCertificateDate = item.recLcDate /* 收证日期 */
      item.status = item.stat /* 状态 */
      item.creditCertificateCode = item.lcNo /* 信用证号 */
      item.lcReqMan = item.lcReqMan /* 开证申请人 */
      item.proposer = item.createUser /* 申请人 */
      item.salesUserId = item.salesUserId /* 业务员 */
      item.yAmt = item.yAmt /* 原金额 */
      item.gjTzFee = item.gjTzFee /* 改件通知费 */
      item.yIncRate = item.yIncRate /* 原上浮比率 */
      item.yIncAmt = item.yIncAmt /* 原上浮后金额 */
      item.consultBillNote = item.consultBillNote /* 议付单据 */
      item.note = item.note /* 备注 */
      item.sendMan = item.sendMan /* 发货人 */
      item.receiveMan = item.receiveMan /* 收货人 */
      item.noticeMan = item.noticeMan /* 通知人 */
      item.confirmStat = item.confirmStat === 2 /* 已确认 */
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
      item.consignorName = item.consignorName /* 发货人 */
      item.consignorAddress = item.consignorAddress /* 发货人地址... */
      item.consignorTel = item.consignorPhone /* 发货人电话... */
      item.consignorFax = item.consignorFax /* 发货人传真... */
      item.consignorEmail = item.consignorEMail /* 发货人邮箱... */
      item.consignorEnterpriseCode = item.consignorCompanyCode /* 发货人企业代码... */
      item.consignorCountryCode = item.consignorCountryCode /* 发货人国家代码... */
      item.consignorAeoCode = item.consignorAeoCode /* 发货人AEO编码... */
      item.consigneeName = item.consigneeName /* 收货人 */
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
      item.paymentBankId = item.lcConsultBankId /* 议付银行 */
      item.proveBankId = item.lcOpenBankId /* 开证银行 */
      item.swift = item.swift /* 开证行SWIFT */
      item.currencyId = item.currencyCode /* 货币 */
      item.sendPortId = item.seaportOutId /* 出货港 */
      item.targetPortId = item.seaportInId /* 到货港 */
      item.areaId = item.areaId /* 所在国家 */
      item.saleDepartmentId = item.orgId /* 业务部门 */
      item.customerId = item.custId /* 客户 */
      item.tradeDocumenterId = item.proverId /* 单证人员 */
      item.tradeDocumenter = item.prover /* 单证人员 */
      item.entid = item.entid /* 经营单位... */
      item.confirmingBankId = item.lcExchangeBankId /* 保兑银行 */
      return res.data.data
    })
  },
  searchUsable(param) {
    // 设置传参格式
    const query = {}
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['changeId'] = param.keyword.id
    }
    if (Validate.isNotEmpty(param.keyword.lcReqMan)) {
      query['lcReqMan'] = param.keyword.lcReqMan
    }
    if (Validate.isNotEmpty(param.keyword.code)) {
      query['lcBillNo'] = param.keyword.code
    }
    if (Validate.isNotEmpty(param.keyword.creditCertificateCode)) {
      query['lcNo'] = param.keyword.creditCertificateCode
    }
    if (Validate.isNotEmpty(param.keyword.tradeDocumenterId)) {
      query['prover'] = param.keyword.tradeDocumenterId
    }
    if (Validate.isNotEmpty(param.keyword.saleDepartmentId)) {
      query['orgId'] = param.keyword.saleDepartmentId
    }
    // 设置传参格式
    const data = {
      params: { ...query },
      page: {
        startRow: param.page * param.size, // 起始行
        endRow: param.size // 每页条数
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBillChange/querySdpFinLcBillCanChange',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        res.data.data = []
        return res.data
      }
      res.data.data.data.forEach(item => {
        // 将接口返回参数转换为页面对应的字段
        item.id = item.changeId
        item.code = item.lcBillNo /* 编码 */
        item.itemList = item.itemList ? item.itemList : [] /* 品名 */
        item.creditCertificateDate = item.lcBillDate /* 信用证日期 */
        item.receivedCreditCertificateDate = item.recLcDate /* 收证日期 */
        item.status = item.stat /* 状态 */
        item.creditCertificateCode = item.lcNo /* 信用证号 */
        item.lcReqMan = item.lcReqMan /* 开证申请人 */
        item.proposer = item.createUser /* 申请人 */
        item.salesUserId = item.salesUserId /* 业务员 */
        item.yAmt = item.yAmt /* 原金额 */
        item.gjTzFee = item.gjTzFee /* 改件通知费 */
        item.yIncRate = item.yIncRate /* 原上浮比率 */
        item.yIncAmt = item.yIncAmt /* 原上浮后金额 */
        item.consultBillNote = item.consultBillNote /* 议付单据 */
        item.note = item.note /* 备注 */
        item.sendMan = item.sendMan /* 发货人 */
        item.receiveMan = item.receiveMan /* 收货人 */
        item.noticeMan = item.noticeMan /* 通知人 */
        item.confirmStat = item.confirmStat === 2 /* 已确认 */
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
        item.consignorName = item.consignorName /* 发货人 */
        item.consignorAddress = item.consignorAddress /* 发货人地址... */
        item.consignorTel = item.consignorPhone /* 发货人电话... */
        item.consignorFax = item.consignorFax /* 发货人传真... */
        item.consignorEmail = item.consignorEMail /* 发货人邮箱... */
        item.consignorEnterpriseCode = item.consignorCompanyCode /* 发货人企业代码... */
        item.consignorCountryCode = item.consignorCountryCode /* 发货人国家代码... */
        item.consignorAeoCode = item.consignorAeoCode /* 发货人AEO编码... */
        item.consigneeName = item.consigneeName /* 收货人 */
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
        item.paymentBankId = item.lcConsultBankId /* 议付银行 */
        item.proveBankId = item.lcOpenBankId /* 开证银行 */
        item.swift = item.swift /* 开证行SWIFT */
        item.currencyId = item.currencyCode /* 货币 */
        item.sendPortId = item.seaportOutId /* 出货港 */
        item.targetPortId = item.seaportInId /* 到货港 */
        item.areaId = item.areaId /* 所在国家 */
        item.saleDepartmentId = item.orgId /* 业务部门 */
        item.customerId = item.custId /* 客户 */
        item.tradeDocumenterId = item.proverId /* 单证人员 */
        item.tradeDocumenter = item.prover /* 单证人员 */
        item.entid = item.entid /* 经营单位... */
        item.forfaitingBankId = item.fftBank /* 福费廷银行... */
        item.confirmingBankId = item.lcExchangeBankId /* 保兑银行 */
      })
      return res.data.data
    })
  },
  put(param) {
    const query = {}
    // 将接口返回参数转换为页面对应的字段
    const params = {
      newList: param.itemList.filter(item => !item.finLcItemId),
      deleteList: param.deletedList,
    }
    query.itemList = param.itemList.filter(item => item.finLcItemId) /* 品名 */
    query.lcBillNo = param.code/* 编码 */
    query.lcBillId = param.lcBillId /* 信用证id */
    query.lcBillDate = param.creditCertificateDate /* 信用证日期 */
    query.recLcDate = param.receivedCreditCertificateDate /* 收证日期 */
    query.stat = param.status /* 状态 */
    query.lcNo = param.creditCertificateCode /* 信用证号 */
    query.lcReqMan = param.lcReqMan /* 开证申请人 */
    query.createUser = param.proposer /* 申请人 */
    query.salesUserId = param.salesUserId /* 业务员 */
    query.yAmt = param.yAmt /* 原金额 */
    query.gjTzFee = param.gjTzFee /* 改件通知费 */
    query.yIncRate = param.yIncRate /* 原上浮比率 */
    query.yIncAmt = param.yIncAmt /* 原上浮后金额 */
    query.consultBillNote = param.consultBillNote /* 议付单据 */
    query.note = param.note /* 备注 */
    query.sendMan = param.sendMan /* 发货人 */
    query.receiveMan = param.receiveMan /* 收货人 */
    query.noticeMan = param.noticeMan /* 通知人 */
    query.confirmStat = param.confirmStat ? 2 : 1 /* 已确认 */
    query.versionNum = param.version/* 版本号 */
    query.changeType = param.changeType /* 变更类型 */
    query.latestShipmentDate = param.lastLoadDate /* 最迟装运日 */
    query.lcActiveDate = param.periodValidity /* 有效期 */
    query.usable = param.existCreditFile ? 2 : 1 /* 中信保银行档案... */
    query.fkfsType = param.payWay /* 付款方式 */
    query.isNewVersion = param.isNewVersion ? 2 : 1 /* 是新版本 */
    query.incAmt = param.amount /* 金额 */
    query.incRate = param.upFloatRate /* 上浮比率(%) */
    query.amt = param.upFloatedAmount /* 上浮后金额 */
    query.factAmt = param.actualAmount /* 实际金额 */
    query.isMoneyOver = param.amountUsedUp ? 2 : 1 /* 金额是否用完 */
    query.amtDist = param.allocatedAmount /* 已分配金额 */
    query.wfpje = param.distributableAmount /* 未分配金额 */
    query.confirmAmt = param.deliveredAmount /* 已发货金额 */
    query.deliverAmt = param.closeBillAmount /* 已交单金额 */
    query.isPartShipment = param.inBatches ? 2 : 1 /* 分批装运 */
    query.sfzyType = param.transfer ? 2 : 1 /* 是否转运 */
    query.lcArrLocation = param.expireAddress /* 到期地点 */
    query.limitGiveBill = param.closeBillDeadline /* 交单期限 */
    query.origin = param.placeOfOriginCertificate /* 产地证 */
    query.days = param.returnedMoneyDeadline /* 回款期限 */
    query.fksd = param.pointTime /* 回款时点... */
    query.modifyInfo = param.alterCertificateInformation /* 改证信息 */
    query.suggestInfo = param.suggestedModificationInformation /* 建议修改信息 */
    query.feedbackInfo = param.businessFeedback /* 业务反馈信息 */
    query.consultBillNote = param.businessDocuments.join(',') /* 需业务提供单据... */
    query.otherProvideBill = param.businessDocumentsOther /* 提供其他单据... */
    query.consignorName = param.consignorName /* 发货人 */
    query.consignorAddress = param.consignorAddress /* 发货人地址... */
    query.consignorPhone = param.consignorTel /* 发货人电话... */
    query.consignorFax = param.consignorFax /* 发货人传真... */
    query.consignorEMail = param.consignorEmail /* 发货人邮箱... */
    query.consignorCompanyCode = param.consignorEnterpriseCode /* 发货人企业代码... */
    query.consignorCountryCode = param.consignorCountryCode /* 发货人国家代码... */
    query.consignorAeoCode = param.consignorAeoCode /* 发货人AEO编码... */
    query.consigneeName = param.consigneeName /* 收货人 */
    query.consigneeAddress = param.consigneeAddress /* 收货人地址... */
    query.consigneePhone = param.consigneeTel /* 收货人电话... */
    query.consigneeFax = param.consigneeFax /* 收货人传真... */
    query.consigneeEMail = param.consigneeEmail /* 收货人邮箱... */
    query.consigneeCompanyCode = param.consigneeEnterpriseCode /* 收货人企业代码... */
    query.consigneeCountryCode = param.consigneeCountryCode /* 收货人国家代码... */
    query.consigneeAeoCode = param.consigneeAeoCode /* 收货人AEO编码... */
    query.particularConsigneeName = param.consigneeContactName /* 具体联系人名称 */
    query.particularConsigneePhone = param.consigneeContactTel /* 具体联系人电话... */
    query.particularConsigneeFax = param.consigneeContactFax /* 具体联系人传真... */
    query.particularConsigneeEMail = param.consigneeContactEmail /* 具体联系人邮箱...*/
    query.noticeManName = param.notifyName /* 通知人 */
    query.noticeManAddress = param.notifyAddress /* 通知人地址... */
    query.noticeManPhone = param.notifyTel /* 通知人电话... */
    query.noticeManFax = param.notifyFax /* 通知人传真... */
    query.noticeManEMail = param.notifyEmail /* 通知人邮箱... */
    query.noticeManCompanyCode = param.notifyEnterpriseCode /* 通知人企业代码... */
    query.noticeManCountryCode = param.notifyCountryCode /* 通知人国家代码... */
    query.noticeManAeoCode = param.notifyAeoCode /* 通知人AEO编码... */
    query.noticeMan = param.otherNotifyMan /* 其它通知人... */
    query.returnEntType = param.lc /* LC受益人 */
    query.vesselCertificate = param.shipCertificate /* 船证明 */
    query.billRemark = param.supplementInfo /* 加注信息... */
    query.otherNote = param.other /* 其他 */
    query.fftType = param.businessWay /* 业务方式 */
    query.lcType = param.creditCertificateType /* 信用证类型... */
    query.zbTzFee = param.noticeCost /* 正本通知费 */
    query.bfdFee = param.pointTimeNotMatchCost /* 不符点费 */
    query.confirmMan = param.confirmMan /* 确认人 */
    query.confirmDate = param.confirmTime /* 确认时间 */
    query.confirmStat = param.isConfirm ? 2 : 1 /* 已确认 */
    query.lcInformBankId = param.noticeBankId /* 通知银行 */
    query.lcConsultBankId = param.paymentBankId /* 议付银行 */
    query.lcOpenBankId = param.proveBankId /* 开证银行 */
    query.swift = param.swift /* 开证行SWIFT */
    query.currencyCode = param.currencyId /* 货币 */
    query.seaportOutId = param.sendPortId /* 出货港 */
    query.seaportInId = param.targetPortId /* 到货港 */
    query.areaId = param.areaId /* 所在国家 */
    query.orgId = param.saleDepartmentId /* 业务部门 */
    query.custId = param.customerId /* 客户 */
    query.proverId = param.tradeDocumenterId /* 单证人员 */
    query.prover = param.tradeDocumenter /* 单证人员 */
    // query.entid = param.entid /* 经营单位... */
    query.lcExchangeBankId = param.confirmingBankId /* 保兑银行 */
    query.changeId = param.id /* id */
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SDP_FIN_LC_BILL_CHANGE_UPDATESOME',
        params,
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBillChange/updateSdpFinLcBillChange',
      method: 'post',
      data
    })
  },
  post(param) {
    const query = {}
    // 将接口返回参数转换为页面对应的字段
    query.itemList = param.itemList /* 品名 */
    query.lcBillNo = param.code/* 编码 */
    query.lcBillId = param.lcBillId /* 信用证id */
    query.lcBillDate = param.creditCertificateDate /* 信用证日期 */
    query.recLcDate = param.receivedCreditCertificateDate /* 收证日期 */
    query.stat = param.status /* 状态 */
    query.lcNo = param.creditCertificateCode /* 信用证号 */
    query.lcReqMan = param.lcReqMan /* 开证申请人 */
    query.createUser = param.proposer /* 申请人 */
    query.lcReqMan = param.lcReqMan /* 开证申请人 */
    query.createUser = param.proposer /* 申请人 */
    query.salesUserId = param.salesUserId /* 业务员 */
    query.yAmt = param.yAmt /* 原金额 */
    query.gjTzFee = param.gjTzFee /* 改件通知费 */
    query.yIncRate = param.yIncRate /* 原上浮比率 */
    query.yIncAmt = param.yIncAmt /* 原上浮后金额 */
    query.consultBillNote = param.consultBillNote /* 议付单据 */
    query.note = param.note /* 备注 */
    query.sendMan = param.sendMan /* 发货人 */
    query.receiveMan = param.receiveMan /* 收货人 */
    query.noticeMan = param.noticeMan /* 通知人 */
    query.confirmStat = param.confirmStat ? 2 : 1 /* 已确认 */
    query.versionNum = param.version/* 版本号 */
    query.changeType = param.changeType /* 变更类型 */
    query.latestShipmentDate = param.lastLoadDate /* 最迟装运日 */
    query.lcActiveDate = param.periodValidity /* 有效期 */
    query.usable = param.existCreditFile ? 2 : 1 /* 中信保银行档案... */
    query.fkfsType = param.payWay /* 付款方式 */
    query.isNewVersion = param.isNewVersion ? 2 : 1 /* 是新版本 */
    query.incAmt = param.amount /* 金额 */
    query.incRate = param.upFloatRate /* 上浮比率(%) */
    query.amt = param.upFloatedAmount /* 上浮后金额 */
    query.factAmt = param.actualAmount /* 实际金额 */
    query.isMoneyOver = param.amountUsedUp ? 2 : 1 /* 金额是否用完 */
    query.amtDist = param.allocatedAmount /* 已分配金额 */
    query.wfpje = param.distributableAmount /* 未分配金额 */
    query.confirmAmt = param.deliveredAmount /* 已发货金额 */
    query.deliverAmt = param.closeBillAmount /* 已交单金额 */
    query.isPartShipment = param.inBatches ? 2 : 1 /* 分批装运 */
    query.sfzyType = param.transfer ? 2 : 1 /* 是否转运 */
    query.lcArrLocation = param.expireAddress /* 到期地点 */
    query.limitGiveBill = param.closeBillDeadline /* 交单期限 */
    query.origin = param.placeOfOriginCertificate /* 产地证 */
    query.days = param.returnedMoneyDeadline /* 回款期限 */
    query.fksd = param.pointTime /* 回款时点... */
    query.modifyInfo = param.alterCertificateInformation /* 改证信息 */
    query.suggestInfo = param.suggestedModificationInformation /* 建议修改信息 */
    query.feedbackInfo = param.businessFeedback /* 业务反馈信息 */
    query.consultBillNote = param.businessDocuments.join(',') /* 需业务提供单据... */
    query.otherProvideBill = param.businessDocumentsOther /* 提供其他单据... */
    query.consignorName = param.consignorName /* 发货人 */
    query.consignorAddress = param.consignorAddress /* 发货人地址... */
    query.consignorPhone = param.consignorTel /* 发货人电话... */
    query.consignorFax = param.consignorFax /* 发货人传真... */
    query.consignorEMail = param.consignorEmail /* 发货人邮箱... */
    query.consignorCompanyCode = param.consignorEnterpriseCode /* 发货人企业代码... */
    query.consignorCountryCode = param.consignorCountryCode /* 发货人国家代码... */
    query.consignorAeoCode = param.consignorAeoCode /* 发货人AEO编码... */
    query.consigneeName = param.consigneeName /* 收货人 */
    query.consigneeAddress = param.consigneeAddress /* 收货人地址... */
    query.consigneePhone = param.consigneeTel /* 收货人电话... */
    query.consigneeFax = param.consigneeFax /* 收货人传真... */
    query.consigneeEMail = param.consigneeEmail /* 收货人邮箱... */
    query.consigneeCompanyCode = param.consigneeEnterpriseCode /* 收货人企业代码... */
    query.consigneeCountryCode = param.consigneeCountryCode /* 收货人国家代码... */
    query.consigneeAeoCode = param.consigneeAeoCode /* 收货人AEO编码... */
    query.particularConsigneeName = param.consigneeContactName /* 具体联系人名称 */
    query.particularConsigneePhone = param.consigneeContactTel /* 具体联系人电话... */
    query.particularConsigneeFax = param.consigneeContactFax /* 具体联系人传真... */
    query.particularConsigneeEMail = param.consigneeContactEmail /* 具体联系人邮箱...*/
    query.noticeManName = param.notifyName /* 通知人 */
    query.noticeManAddress = param.notifyAddress /* 通知人地址... */
    query.noticeManPhone = param.notifyTel /* 通知人电话... */
    query.noticeManFax = param.notifyFax /* 通知人传真... */
    query.noticeManEMail = param.notifyEmail /* 通知人邮箱... */
    query.noticeManCompanyCode = param.notifyEnterpriseCode /* 通知人企业代码... */
    query.noticeManCountryCode = param.notifyCountryCode /* 通知人国家代码... */
    query.noticeManAeoCode = param.notifyAeoCode /* 通知人AEO编码... */
    query.noticeMan = param.otherNotifyMan /* 其它通知人... */
    query.returnEntType = param.lc /* LC受益人 */
    query.vesselCertificate = param.shipCertificate /* 船证明 */
    query.billRemark = param.supplementInfo /* 加注信息... */
    query.otherNote = param.other /* 其他 */
    query.fftType = param.businessWay /* 业务方式 */
    query.lcType = param.creditCertificateType /* 信用证类型... */
    query.zbTzFee = param.noticeCost /* 正本通知费 */
    query.bfdFee = param.pointTimeNotMatchCost /* 不符点费 */
    query.confirmMan = param.confirmMan /* 确认人 */
    query.confirmDate = param.confirmTime /* 确认时间 */
    query.confirmStat = param.isConfirm ? 2 : 1 /* 已确认 */
    query.lcInformBankId = param.noticeBankId /* 通知银行 */
    query.lcConsultBankId = param.paymentBankId /* 议付银行 */
    query.lcOpenBankId = param.proveBankId /* 开证银行 */
    query.swift = param.swift /* 开证行SWIFT */
    query.currencyCode = param.currencyId /* 货币 */
    query.seaportOutId = param.sendPortId /* 出货港 */
    query.seaportInId = param.targetPortId /* 到货港 */
    query.areaId = param.areaId /* 所在国家 */
    query.orgId = param.saleDepartmentId /* 业务部门 */
    query.custId = param.customerId /* 客户 */
    query.proverId = param.tradeDocumenterId /* 单证人员 */
    query.prover = param.tradeDocumenter /* 单证人员 */
    query.entid = param.entid /* 经营单位... */
    query.lcExchangeBankId = param.confirmingBankId /* 保兑银行 */
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SDP_FIN_LC_BILL_CHANGE_ADDSOME',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBillChange/addSdpFinLcBillChange',
      method: 'post',
      data
    })
  },
  delete(id) {
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SDP_FIN_LC_BILL_CHANGE_DELETE',
        rows: [{
          changeId: id
        }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinLcBillChange/deleteSdpFinLcBillChange',
      method: 'post',
      data
    })
  }
}
