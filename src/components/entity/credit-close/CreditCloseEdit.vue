<template>
  <div class="container m-t-not">
    <el-form
      :model="formData"
      :ref="'formData'"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <el-tabs v-loading="loading" :tab-position="'top'">
        <el-tab-pane label="基础信息">
          <el-row>            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="水单编号" prop="code">
                <el-input v-model="formData.code" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信用证日期" prop="creditCertificateDate">
                <el-date-picker
                  v-model="formData.creditCertificateDate"
                  size="mini"
                  disabled
                  class="max-w"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="收证日期" prop="receivedCreditCertificateDate">
                <el-date-picker
                  v-model="formData.receivedCreditCertificateDate"
                  size="mini"
                  disabled
                  class="max-w"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="status">
                <CreditCertificateStatusEnumSelect v-model="formData.status" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信用证号" prop="creditCertificateCode">
                <el-input v-model="formData.creditCertificateCode" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证申请人" prop="lcReqMan">
                <el-input v-model="formData.lcReqMan" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="最迟装运日" prop="lastLoadDate">
                <el-date-picker
                  v-model="formData.lastLoadDate"
                  size="mini"
                  disabled
                  class="max-w"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="有效期" prop="periodValidity">
                <el-date-picker
                  v-model="formData.periodValidity"
                  size="mini"
                  disabled
                  class="max-w"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="通知银行" prop="noticeBankId">
                <BankSelect v-model="formData.noticeBankId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="议付银行" prop="paymentBankId">
                <BankSelect v-model="formData.paymentBankId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证银行" prop="proveBankId">
                <BankSelect v-model="formData.proveBankId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证行SWIFT" prop="swift">
                <el-input v-model="formData.swift" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="中信保银行档案" prop="existCreditFile">
                <el-switch v-model="formData.existCreditFile" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="货币" prop="currencyId">
                <CurrencySelect v-model="formData.currencyId" :disabled="true" @changeData="changeCurrency"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="付款方式" prop="payWay">
                <CreditCertificatePayWayEnumSelect v-model="formData.payWay" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否新版本" prop="isNewVersion">
                <el-switch v-model="formData.isNewVersion" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="金额" prop="amount">
                <el-input-number v-model="formData.amount" :step="0.01" :min="0" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="上浮比率(%)" prop="upFloatRate">
                <el-input-number v-model="formData.upFloatRate" :step="0.01" :min="0" :max="10" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="上浮后金额" prop="upFloatedAmount">
                <el-input-number v-model="formData.upFloatedAmount" :step="0.01" :min="0" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="实际金额" prop="actualAmount">
                <el-input-number v-model="formData.actualAmount" :step="0.01" :min="0" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="金额是否用完" prop="amountUsedUp">
                <el-switch v-model="formData.amountUsedUp" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已分配金额" prop="allocatedAmount">
                <el-input-number v-model="formData.allocatedAmount" :step="0.01" :min="0" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="未分配金额" prop="distributableAmount">
                <el-input-number v-model="formData.distributableAmount" :step="0.01" :min="0" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已发货金额" prop="deliveredAmount">
                <el-input-number v-model="formData.deliveredAmount" :step="0.01" :min="0" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出货港" prop="sendPortId">
                <PortSelect v-model="formData.sendPortId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="到货港" prop="targetPortId">
                <PortSelect v-model="formData.targetPortId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="所在国家" prop="areaId">
                <AreaSelect v-model="formData.areaId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已交单金额" prop="closeBillAmount">
                <el-input-number v-model="formData.closeBillAmount" :step="0.01" :min="0" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="分批装运" prop="inBatches">
                <el-switch v-model="formData.inBatches" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="转运" prop="transfer">
                <el-switch v-model="formData.transfer" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="到期地点" prop="expireAddress">
                <el-input v-model="formData.expireAddress" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="交单期限" prop="closeBillDeadline">
                <el-input-number v-model="formData.closeBillDeadline" :step="1" :min="0" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="产地证" prop="placeOfOriginCertificateId">
                <CreditCertificatePlaceOfOriginCertificateEnumSelect v-model="formData.placeOfOriginCertificateId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="回款期限" prop="returnedMoneyDeadline">
                <el-input-number v-model="formData.returnedMoneyDeadline" :min="0" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="回款时点" prop="pointTime">
                <CreditCertificatePointTimeEnumSelect v-model="formData.pointTime" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="销售部门" prop="saleDepartmentId">
                <DepartmentSelect v-model="formData.saleDepartmentId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务员" prop="salesUserId">
                <el-input v-model="formData.salesUserId" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" prop="customerId">
                <CustomerSelect v-model="formData.customerId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="单证人员" prop="tradeDocumenterId">
                <TradeDocumenterSelect v-model="formData.tradeDocumenterId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-form-item label="改证信息" prop="alterCertificateInformation">
                <el-input v-model="formData.alterCertificateInformation" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-form-item label="建议修改信息" prop="suggestedModificationInformation">
                <el-input v-model="formData.suggestedModificationInformation" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-form-item label="业务反馈信息" prop="businessFeedback">
                <el-input v-model="formData.businessFeedback" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="需业务提供单据" prop="businessDocuments">
                <BusinessDocumentsSelect v-model="formData.businessDocuments" :disabled="true" type="multiple"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="提供其他单据" prop="businessDocumentsOther">
                <el-input v-model="formData.businessDocumentsOther" disabled size="mini" />
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="具体联系人名称" prop="consigneeContactName">
                <el-input v-model="formData.consigneeContactName" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="具体联系人电话" prop="consigneeContactTel">
                <el-input v-model="formData.consigneeContactTel" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="具体联系人传真" prop="consigneeContactFax">
                <el-input v-model="formData.consigneeContactFax" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="具体联系人邮箱" prop="consigneeContactEmail">
                <el-input v-model="formData.consigneeContactEmail" disabled size="mini" />
              </el-form-item>
            </el-col> -->
            
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-form-item label="品名">
                <div :lg="24" :md="24" :sm="24" :xs="24" class="item-box-name">
                  <el-tag
                    v-for="tag in formData.itemList"
                    :key="tag.finLcItemName"
                    :disable-transitions="false">
                    {{ tag.finLcItemName }}
                  </el-tag>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="单据信息">
          <el-row>
            <div class="item-box">
              <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <div class="item-box-title">发货人资料</div>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人" prop="consignorName">
                  <el-input v-model="formData.consignorName" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人地址" prop="consignorAddress">
                  <el-input v-model="formData.consignorAddress" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人电话" prop="consignorTel">
                  <el-input v-model="formData.consignorTel" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人传真" prop="consignorFax">
                  <el-input v-model="formData.consignorFax" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人邮箱" prop="consignorEmail">
                  <el-input v-model="formData.consignorEmail" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人企业代码" prop="consignorEnterpriseCode">
                  <el-input v-model="formData.consignorEnterpriseCode" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人国家代码" prop="consignorCountryCode">
                  <el-input v-model="formData.consignorCountryCode" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人AEO编码" prop="consignorAeoCode">
                  <el-input v-model="formData.consignorAeoCode" disabled size="mini" />
                </el-form-item>
              </el-col>
            </div>
            <div class="item-box">
              <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <div class="item-box-title">收货人资料</div>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人" prop="consigneeName">
                  <el-input v-model="formData.consigneeName" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人地址" prop="consigneeAddress">
                  <el-input v-model="formData.consigneeAddress" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人电话" prop="consigneeTel">
                  <el-input v-model="formData.consigneeTel" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人传真" prop="consigneeFax">
                  <el-input v-model="formData.consigneeFax" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人邮箱" prop="consigneeEmail">
                  <el-input v-model="formData.consigneeEmail" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人企业代码" prop="consigneeEnterpriseCode">
                  <el-input v-model="formData.consigneeEnterpriseCode" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人国家代码" prop="consigneeCountryCode">
                  <el-input v-model="formData.consigneeCountryCode" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人AEO编码" prop="consigneeAeoCode">
                  <el-input v-model="formData.consigneeAeoCode" disabled size="mini" />
                </el-form-item>
              </el-col>
            </div>
            <div class="item-box">
              <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <div class="item-box-title">通知人资料</div>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人" prop="notifyName">
                  <el-input v-model="formData.notifyName" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人地址" prop="notifyAddress">
                  <el-input v-model="formData.notifyAddress" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人电话" prop="notifyTel">
                  <el-input v-model="formData.notifyTel" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人传真" prop="notifyFax">
                  <el-input v-model="formData.notifyFax" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人邮箱" prop="notifyEmail">
                  <el-input v-model="formData.notifyEmail" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人企业代码" prop="notifyEnterpriseCode">
                  <el-input v-model="formData.notifyEnterpriseCode" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人国家代码" prop="notifyCountryCode">
                  <el-input v-model="formData.notifyCountryCode" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人AEO编码" prop="notifyAeoCode">
                  <el-input v-model="formData.notifyAeoCode" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="其它通知人" prop="otherNotifyMan">
                  <el-input v-model="formData.otherNotifyMan" disabled size="mini" />
                </el-form-item>
              </el-col>
            </div>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="LC受益人" prop="lc">
                <el-input v-model="formData.lc" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="船证明" prop="shipCertificate">
                <el-input v-model="formData.shipCertificate" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="加注信息" prop="supplementInfo">
                <el-input v-model="formData.supplementInfo" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="其他" prop="other">
                <el-input v-model="formData.other" disabled size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="其他信息">
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="福费廷银行" prop="forfaitingBankId">
                <BankNameSelect v-model="formData.forfaitingBankId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="保兑银行" prop="confirmingBankId">
                <BankSelect v-model="formData.confirmingBankId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务方式" prop="businessWay">
                <BusinessWaySelect v-model="formData.businessWay" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信用证类型" prop="creditCertificateType">
                <CreditCertificateTypeEnumSelect v-model="formData.creditCertificateType" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="正本通知费" prop="noticeCost">
                <el-input-number v-model="formData.noticeCost" :step="0.01" :min="0" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="不符点费" prop="pointTimeNotMatchCost">
                <el-input-number v-model="formData.pointTimeNotMatchCost" :step="0.01" :min="0" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="确认人" prop="confirmMan">
                <el-input v-model="formData.confirmMan" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="确认时间" prop="confirmTime">
                <el-date-picker
                  v-model="formData.confirmTime"
                  size="mini"
                  disabled
                  class="max-w"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否确认" prop="isConfirm">
                <el-switch v-model="formData.isConfirm" disabled size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <FileUpload
        :id="id"
        :bill-name="'信用证维护'"/>
    </el-form>
  </div>
</template>

<script>
import creditCertificateServer from './../../../api/creditCertificateServer'
import creditCloseServer from './../../../api/creditCloseServer'
import BankSelect from './../bank/BankSelect'
import BankNameSelect from './../bank/BankNameSelect'
import CurrencySelect from './../currency/CurrencySelect'
import PortSelect from './../port/PortSelect'
import AreaSelect from './../area/AreaSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import CustomerSelect from './../customer/CustomerSelect'
import TradeDocumenterSelect from './../trade-documenter/TradeDocumenterSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import BusinessDocumentsSelect from './../credit-certificate/BusinessDocumentsSelect'
import CreditCertificatePlaceOfOriginCertificateEnumUtil from './../../../components/enum/credit-certificate/CreditCertificatePlaceOfOriginCertificateEnumUtil'
import CreditCertificateStatusEnumSelect from './../../../components/entity/credit-certificate/CreditCertificateStatusEnumSelect'
import CreditCertificatePayWayEnumSelect from './../../../components/entity/credit-certificate/CreditCertificatePayWayEnumSelect'
import CreditCertificatePlaceOfOriginCertificateEnumSelect from './../../../components/entity/credit-certificate/CreditCertificatePlaceOfOriginCertificateEnumSelect'
import CreditCertificatePointTimeEnumSelect from './../../../components/entity/credit-certificate/CreditCertificatePointTimeEnumSelect'
import CreditCertificateBusinessWayEnumSelect from './../../../components/entity/credit-certificate/CreditCertificateBusinessWayEnumSelect'
import BusinessWaySelect from './../../../components/entity/credit-certificate/BusinessWaySelect'
import CreditCertificateTypeEnumSelect from './../../../components/entity/credit-certificate/CreditCertificateTypeEnumSelect'

export default {
  name: 'CreditCloseEdit',
  components: {
    BankSelect,
    BankNameSelect,
    CurrencySelect,
    PortSelect,
    AreaSelect,
    DepartmentSelect,
    BusinessDocumentsSelect,
    CustomerSelect,
    TradeDocumenterSelect,
    OperateUnitSelect,
    CreditCertificateStatusEnumSelect,
    CreditCertificatePayWayEnumSelect,
    CreditCertificatePlaceOfOriginCertificateEnumSelect,
    CreditCertificatePointTimeEnumSelect,
    CreditCertificateBusinessWayEnumSelect,
    BusinessWaySelect,
    CreditCertificateTypeEnumSelect
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      formData: {},
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    },
    status() {
      return this.formData.status
    }
  },
  watch: {
    id(val) {
      if (val !== this.initFormData.id) {
        this.getData()
      }
    },
    loading(val) {
      this.$emit('loadingChange', val)
    },    
    status(val) {
      if (val === 5) {
        this.$emit('hideSubmitBtn')
      }      
    } 
  },
  created() {
    if (this.id) {
      this.getData()
    } else {
      this.$router.push({
        path: './credit-close'
      })
      window.eventBus.$emit('closePage', 'CreditCloseEditPage')
    }
  },
  methods: {
    changeCurrency(res) {
      this.formData.currencyName = res.name
    },
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      try {
        const res = await creditCertificateServer.get(this.id)
        res.placeOfOriginCertificateId = CreditCertificatePlaceOfOriginCertificateEnumUtil.toValueFilter(res.placeOfOriginCertificate)
        this.formData = {
          ...res
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    toVoid() {
      if (this.formData.status === 99) {
        this.$message({
          message: '该信用证已被关闭',
          type: 'warning'
        })
        return false
      }
      this.$confirm('你将作废该信用证,请确认是否继续操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doVoid()
      })
    },
    emitEvent({ key }) {
      switch (key) {
        case 'saveFormData':
          this.save()
          break
        case 'resetData':
          this.resetData()
          break
        case 'update':
          this.getData()
          break
        case 'toVoid':
          this.toVoid()
          break
        default:
          break
      }
    },
    async doVoid() {
      await creditCloseServer.toVoid(this.id)
      this.$router.push({
        path: './credit-close'
      })
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.el-form-item {
  width: 100%;
  margin-right: 0;
}
/deep/.el-form-item__error{
  padding-top: 0;
}
.item-box,.item-box-name{
  display: inline-block;
  border: 1px solid #ececec;
  padding: 5px;
  .item-box-title{
    font-size: 14px;
    padding: 5px 0 0 5px;
    color: #606266;
  }
}
.item-box-name{
  display: block;
  min-height: 28px;
  padding: 5px;
  .item-box-title{
    padding: 5px 0 5px 5px;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  display: inline-block;
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
