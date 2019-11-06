<template>
  <div class="max-w">
    <el-form
      :model="formData"
      :ref="'formData'"
      :rules="rules"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <el-tabs v-loading="loading" :tab-position="'top'">
        <el-tab-pane label="基础信息">
          <el-row>
            <el-col v-if="id" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="水单编号" required prop="code">
                <el-input v-model="formData.code" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信用证日期" prop="creditCertificateDate">
                <el-date-picker
                  v-model="formData.creditCertificateDate"
                  size="mini"
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
                <el-input v-model="formData.creditCertificateCode" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证申请人" prop="lcReqMan">
                <el-input v-model="formData.lcReqMan" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col v-if="id" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="创建人" prop="proposer">
                <el-input v-model="formData.proposer" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="最迟装运日" prop="lastLoadDate">
                <el-date-picker
                  v-model="formData.lastLoadDate"
                  size="mini"
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
                  class="max-w"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="通知银行" prop="noticeBankId">
                <BankSelect v-model="formData.noticeBankId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="议付银行" prop="paymentBankId">
                <BankSelect v-model="formData.paymentBankId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证银行" prop="proveBankId">
                <BankSelectCertificate v-model="formData.proveBankId" :bank-type="formData.existCreditFile" :show-field="'bankName'" :get-field="'bankId'" @changeData="changeBankInfo"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证行SWIFT" prop="swift">
                <BankSelectSwift v-model="formData.swift" :bank-type="formData.existCreditFile" :show-field="'swiftCode'" :get-field="'swiftCode'" @changeData="exchangeBankInfo"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="中信保银行档案" prop="existCreditFile">
                <el-switch v-model="formData.existCreditFile" size="mini" @change="existCreditFileChange"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="币种" prop="currencyId">
                <CurrencySelect v-model="formData.currencyId" @changeData="changeCurrency"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="付款方式" prop="payWay">
                <CreditCertificatePayWayEnumSelect v-model="formData.payWay"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否新版本" prop="isNewVersion">
                <el-switch v-model="formData.isNewVersion" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="金额" prop="amount">
                <el-input-number
                  v-model="formData.amount"
                  :step="0.01"
                  :min="0"
                  size="mini"
                  @change="changePrice"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="上浮比率(%)" prop="upFloatRate">
                <el-input-number
                  v-model="formData.upFloatRate"
                  :step="0.01"
                  :min="0"
                  :max="10"
                  size="mini"
                  @change="changeUpFloated"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="上浮后金额" prop="upFloatedAmount">
                <el-input-number
                  v-model="formData.upFloatedAmount"
                  :step="0.01"
                  :min="0"
                  disabled
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="实际金额" prop="actualAmount">
                <el-input-number v-model="formData.actualAmount" :step="0.01" :min="0" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="金额是否用完" prop="amountUsedUp">
                <el-switch v-model="formData.amountUsedUp" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已分配金额" prop="allocatedAmount">
                <el-input-number
                  v-model="formData.allocatedAmount"
                  :step="0.01"
                  :min="0"
                  disabled
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="未分配金额" prop="distributableAmount">
                <el-input-number
                  v-model="formData.distributableAmount"
                  :step="0.01"
                  :min="0"
                  disabled
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已发货金额" prop="deliveredAmount">
                <el-input-number
                  v-model="formData.deliveredAmount"
                  :step="0.01"
                  :min="0"
                  disabled
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出货港" prop="sendPortId">
                <PortSelect v-model="formData.sendPortId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="到货港" prop="targetPortId">
                <PortSelect v-model="formData.targetPortId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="所在国家" prop="areaId">
                <AreaSelect v-model="formData.areaId" @change="searchPort"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已交单金额" prop="closeBillAmount">
                <el-input-number
                  v-model="formData.closeBillAmount"
                  :step="0.01"
                  :min="0"
                  disabled
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="分批装运" prop="inBatches">
                <el-switch v-model="formData.inBatches" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="转运" prop="transfer">
                <el-switch v-model="formData.transfer" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="到期地点" prop="expireAddress">
                <el-input v-model="formData.expireAddress" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="交单期限" prop="closeBillDeadline">
                <el-input-number
                  v-model="formData.closeBillDeadline"
                  :step="1"
                  :min="0"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="产地证" prop="placeOfOriginCertificateId">
                <CreditCertificatePlaceOfOriginCertificateEnumSelect
                  v-model="formData.placeOfOriginCertificateId"
                  @changeData="changeOrign"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="回款期限" prop="returnedMoneyDeadline">
                <el-input-number v-model="formData.returnedMoneyDeadline" :min="0" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="回款时点" prop="pointTime">
                <CreditCertificatePointTimeEnumSelect v-model="formData.pointTime"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="销售部门" prop="saleDepartmentId">
                <DepartmentSelect
                  v-model="formData.saleDepartmentId"
                  :disabled="editSaleDepartment"
                  @changeDataRes="changeDepartment"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务员" prop="salesUserId">
                <PersonSelect 
                  v-model="formData.salesUserId" 
                  :disabled="editSalesUser || !formData.saleDepartmentId"
                  :custom-id="formData.saleDepartmentId" 
                  @changeData="getBusiMan"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" prop="customerId">
                <CustomerSelect v-model="formData.customerId" :disabled="editCustomer || !formData.saleDepartmentId" @changeData="customChanged"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户编码">
                <el-input v-model="sap_code" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="单证人员" prop="tradeDocumenterId">
                <TradeDocumenterSelect
                  v-model="formData.tradeDocumenterId"
                  @changeData="changeTrade"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-form-item label="改证信息" prop="alterCertificateInformation">
                <el-input v-model="formData.alterCertificateInformation" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-form-item label="建议修改信息" prop="suggestedModificationInformation">
                <el-input v-model="formData.suggestedModificationInformation" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-form-item label="业务反馈信息" prop="businessFeedback">
                <el-input v-model="formData.businessFeedback" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="需业务提供单据" prop="businessDocuments">
                <BusinessDocumentsSelect v-model="formData.businessDocuments" type="multiple"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="提供其他单据" prop="businessDocumentsOther">
                <el-input v-model="formData.businessDocumentsOther" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-form-item label="品名">
                <div :lg="24" :md="24" :sm="24" :xs="24" class="item-box-name">
                  <el-tag
                    v-for="tag in formData.itemList"
                    :key="tag.finLcItemName"
                    :disable-transitions="false"
                    closable
                    @close="handleClose(tag.finLcItemName)"
                  >{{ tag.finLcItemName }}</el-tag>
                  <el-input
                    v-if="inputVisible"
                    ref="saveTagInput"
                    v-model="inputValue"
                    class="input-new-tag"
                    size="mini"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  />
                  <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 品名</el-button>
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
                  <el-input
                    v-model="formData.consignorName"
                    :disabled="!editConsignor"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人地址" prop="consignorAddress">
                  <el-input
                    v-model="formData.consignorAddress"
                    :disabled="!editConsignor"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人电话" prop="consignorTel">
                  <el-input v-model="formData.consignorTel" :disabled="!editMessage" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人传真" prop="consignorFax">
                  <el-input v-model="formData.consignorFax" :disabled="!editMessage" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人邮箱" prop="consignorEmail">
                  <el-input v-model="formData.consignorEmail" :disabled="!editMessage" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人企业代码" prop="consignorEnterpriseCode">
                  <el-input
                    v-model="formData.consignorEnterpriseCode"
                    :disabled="!editMessage"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人国家代码" prop="consignorCountryCode">
                  <el-input
                    v-model="formData.consignorCountryCode"
                    :disabled="!editMessage"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人AEO编码" prop="consignorAeoCode">
                  <el-input
                    v-model="formData.consignorAeoCode"
                    :disabled="!editMessage"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
            </div>
            <div class="item-box">
              <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <div class="item-box-title">收货人资料</div>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人" prop="consigneeName">
                  <el-input
                    v-model="formData.consigneeName"
                    :disabled="!editConsignor"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人地址" prop="consigneeAddress">
                  <el-input
                    v-model="formData.consigneeAddress"
                    :disabled="!editConsignor"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人电话" prop="consigneeTel">
                  <el-input v-model="formData.consigneeTel" :disabled="!editMessage" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人传真" prop="consigneeFax">
                  <el-input v-model="formData.consigneeFax" :disabled="!editMessage" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人邮箱" prop="consigneeEmail">
                  <el-input v-model="formData.consigneeEmail" :disabled="!editMessage" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人企业代码" prop="consigneeEnterpriseCode">
                  <el-input
                    v-model="formData.consigneeEnterpriseCode"
                    :disabled="!editMessage"
                    size="mini"
                    @focus="showCompanyInfo"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人国家代码" prop="consigneeCountryCode">
                  <el-input
                    v-model="formData.consigneeCountryCode"
                    disabled
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人AEO编码" prop="consigneeAeoCode">
                  <el-input
                    v-model="formData.consigneeAeoCode"
                    :disabled="!editMessage"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="具体联系人名称" prop="particularConsigneeName">
                  <el-input v-model="formData.particularConsigneeName" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="具体联系人电话" prop="particularConsigneePhone">
                  <el-input v-model="formData.particularConsigneePhone" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="具体联系人传真" prop="particularConsigneeFax">
                  <el-input v-model="formData.particularConsigneeFax" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="具体联系人邮箱" prop="particularConsigneeEMail">
                  <el-input v-model="formData.particularConsigneeEMail" size="mini"/>
                </el-form-item>
              </el-col>
            </div>
            <div class="item-box">
              <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <div class="item-box-title">通知人资料</div>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人" prop="notifyName">
                  <el-input v-model="formData.notifyName" :disabled="!editConsignor" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人地址" prop="notifyAddress">
                  <el-input
                    v-model="formData.notifyAddress"
                    :disabled="!editConsignor"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人电话" prop="notifyTel">
                  <el-input v-model="formData.notifyTel" :disabled="!editMessage" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人传真" prop="notifyFax">
                  <el-input v-model="formData.notifyFax" :disabled="!editMessage" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人邮箱" prop="notifyEmail">
                  <el-input v-model="formData.notifyEmail" :disabled="!editMessage" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人企业代码" prop="notifyEnterpriseCode">
                  <el-input
                    v-model="formData.notifyEnterpriseCode"
                    :disabled="!editMessage"
                    size="mini"
                    @focus="showNotifyCompanyInfo"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人国家代码" prop="notifyCountryCode">
                  <el-input
                    v-model="formData.notifyCountryCode"
                    disabled
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人AEO编码" prop="notifyAeoCode">
                  <el-input v-model="formData.notifyAeoCode" :disabled="!editMessage" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="其它通知人" prop="otherNotifyMan">
                  <el-input v-model="formData.otherNotifyMan" size="mini"/>
                </el-form-item>
              </el-col>
            </div>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="LC受益人" required prop="lc">
                <LCSelect v-model="formData.lc"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="船证明" prop="shipCertificate">
                <el-input v-model="formData.shipCertificate" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="加注信息" prop="supplementInfo">
                <el-input v-model="formData.supplementInfo" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="其他" prop="other">
                <el-input v-model="formData.other" size="mini"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="其他信息">
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="福费廷银行" prop="forfaitingBankId">
                <BankNameSelect v-model="formData.forfaitingBankId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="保兑银行" prop="confirmingBankId">
                <BankSelect v-model="formData.confirmingBankId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务方式" prop="businessWay">
                <BusinessWaySelect v-model="formData.businessWay"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信用证类型" prop="creditCertificateType">
                <CreditCertificateTypeEnumSelect v-model="formData.creditCertificateType"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="正本通知费" prop="noticeCost">
                <el-input-number v-model="formData.noticeCost" :step="0.01" :min="0" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="不符点费" prop="pointTimeNotMatchCost">
                <el-input-number
                  v-model="formData.pointTimeNotMatchCost"
                  :step="0.01"
                  :min="0"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="确认人" prop="confirmMan">
                <el-input v-model="formData.confirmMan" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="确认时间" disabled prop="confirmTime">
                <el-date-picker
                  v-model="formData.confirmTime"
                  size="mini"
                  class="max-w"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否确认" prop="isConfirm">
                <el-switch v-model="formData.isConfirm" size="mini"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <FileUpload ref="FileUploadBox" :id="id" :bill-name="'信用证维护'"/>
    </el-form>
    <component
      v-if="showAddCreditViewPopup"
      :is="'CreditViewPopup'"
      @updateInfo="updateCreditInfo"
      @close="showAddCreditViewPopup = false"
    />
    <component
      v-if="showCompanyInfoViewPopup"
      :is="'CompanyInfoViewPopup'"
      :code="codeType"
      @updateInfo="chooseCompanyCode"
      @editInfo="chooseNotifyCompanyCode"
      @close="showCompanyInfoViewPopup = false"
    />
  </div>
</template>

<script>
import portServer from './../../../api/portServer'
import creditCertificateServer from './../../../api/creditCertificateServer'
import BankSelect from './../bank/BankSelect'
import BankSelectCertificate from './../bank/BankSelectCertificate'
import BankSelectSwift from './../bank/BankSelectSwift'
import BankNameSelect from './../bank/BankNameSelect'
import LCSelect from './LCSelect'
import CurrencySelect from './../currency/CurrencySelect'
import PortSelect from './../port/PortSelect'
import AreaSelect from './../area/AreaSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import CustomerSelect from './../customer/CustomerSelect'
import TradeDocumenterSelect from './../trade-documenter/TradeDocumenterSelect'
import PersonSelect from './../person/PersonSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import BusinessDocumentsSelect from './BusinessDocumentsSelect'
import CreditCertificatePlaceOfOriginCertificateEnumUtil from './../../../components/enum/credit-certificate/CreditCertificatePlaceOfOriginCertificateEnumUtil'
import CreditCertificateStatusEnumSelect from './../../../components/entity/credit-certificate/CreditCertificateStatusEnumSelect'
import CreditCertificatePayWayEnumSelect from './../../../components/entity/credit-certificate/CreditCertificatePayWayEnumSelect'
import CreditCertificatePlaceOfOriginCertificateEnumSelect from './../../../components/entity/credit-certificate/CreditCertificatePlaceOfOriginCertificateEnumSelect'
import CreditCertificatePointTimeEnumSelect from './../../../components/entity/credit-certificate/CreditCertificatePointTimeEnumSelect'
import CreditCertificateBusinessWayEnumSelect from './../../../components/entity/credit-certificate/CreditCertificateBusinessWayEnumSelect'
import BusinessWaySelect from './../../../components/entity/credit-certificate/BusinessWaySelect'
import CreditCertificateTypeEnumSelect from './../../../components/entity/credit-certificate/CreditCertificateTypeEnumSelect'

const dateFormat = () => {
  const date = new Date()
  const year = date.getFullYear()
  /* 在日期格式中，月份是从0开始的，因此要加0
   * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
   * */
  const month =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  // 拼接
  return (
    year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  )
}
const emptyFormData = {
  code: null,
  creditCertificateDate: dateFormat(),
  receivedCreditCertificateDate: null,
  status: 1,
  creditCertificateCode: null,
  lcReqMan: null,
  proposer: null,
  lastLoadDate: null,
  periodValidity: null,
  existCreditFile: true,
  payWay: null,
  isNewVersion: false,
  amount: null,
  upFloatRate: null,
  upFloatedAmount: null,
  actualAmount: null,
  amountUsedUp: false,
  allocatedAmount: null,
  distributableAmount: null,
  deliveredAmount: null,
  closeBillAmount: null,
  inBatches: false,
  transfer: false,
  expireAddress: null,
  closeBillDeadline: null,
  placeOfOriginCertificateId: null,
  placeOfOriginCertificate: null,
  returnedMoneyDeadline: null,
  pointTime: null,
  alterCertificateInformation: null,
  suggestedModificationInformation: null,
  businessFeedback: null,
  businessDocuments: [],
  itemList: [],
  businessDocumentsOther: null,
  consignorName: null,
  consignorAddress: null,
  consignorTel: null,
  consignorFax: null,
  consignorEmail: null,
  consignorEnterpriseCode: null,
  consignorCountryCode: null,
  consignorAeoCode: null,
  consigneeName: null,
  consigneeAddress: null,
  consigneeTel: null,
  consigneeFax: null,
  consigneeEmail: null,
  consigneeEnterpriseCode: null,
  consigneeCountryCode: null,
  consigneeAeoCode: null,
  particularConsigneeEMail: null,
  particularConsigneeName: null,
  particularConsigneePhone: null,
  particularConsigneeFax: null,
  swift: null,
  consigneeContactName: null,
  consigneeContactTel: null,
  consigneeContactFax: null,
  consigneeContactEmail: null,
  notifyName: null,
  notifyAddress: null,
  notifyTel: null,
  notifyFax: null,
  notifyEmail: null,
  notifyEnterpriseCode: null,
  notifyCountryCode: null,
  notifyAeoCode: null,
  otherNotifyMan: null,
  lc: null,
  shipCertificate: null,
  supplementInfo: null,
  other: null,
  businessWay: null,
  creditCertificateType: null,
  noticeCost: null,
  pointTimeNotMatchCost: null,
  confirmMan: null,
  confirmTime: null,
  isConfirm: null,
  noticeBankId: null,
  paymentBankId: null,
  proveBankId: null,
  currencyId: 'USD',
  currencyName: null,
  sendPortId: 771,
  targetPortId: null,
  areaId: null,
  saleDepartmentId: null,
  idpath: null,
  customerId: null,
  tradeDocumenterId: null,
  salesUserId: null,
  tradeDocumenter: null,
  forfaitingBankId: null,
  confirmingBankId: null,
}
let initFormData = {
  ...emptyFormData
}
const rules = {
  code: [
    { required: true, message: '不能为空', trigger: 'blur' },
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  creditCertificateDate: [],
  receivedCreditCertificateDate: [
    { required: true, message: '不能为空', trigger: 'change' }
  ],
  status: [],
  creditCertificateCode: [
    { required: true, message: '不能为空', trigger: 'blur' },
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  lcReqMan: [{ required: true, message: '不能为空', trigger: 'blur' }],
  proposer: [],
  lastLoadDate: [{ required: true, message: '不能为空', trigger: 'change' }],
  periodValidity: [{ required: true, message: '不能为空', trigger: 'change' }],
  existCreditFile: [],
  payWay: [{ required: true, message: '不能为空', trigger: 'blur' }],
  isNewVersion: [],
  amount: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { type: 'number', message: '必须为数字', trigger: 'blur' }
  ],
  upFloatRate: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  upFloatedAmount: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  actualAmount: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { type: 'number', message: '必须为数字', trigger: 'blur' }
  ],
  amountUsedUp: [],
  allocatedAmount: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  distributableAmount: [
    { type: 'number', message: '必须为数字', trigger: 'blur' }
  ],
  deliveredAmount: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  closeBillAmount: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  inBatches: [],
  transfer: [],
  expireAddress: [
    // {
    //   min: 0,
    //   max: 512,
    //   message: '长度在 0 到 512 个字符',
    //   trigger: 'blur'
    // }
  ],
  closeBillDeadline: [
    { type: 'number', message: '必须为数字', trigger: 'blur' }
  ],
  placeOfOriginCertificateId: [],
  returnedMoneyDeadline: [
    { type: 'number', message: '必须为数字', trigger: 'blur' }
  ],
  pointTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
  alterCertificateInformation: [
    // {
    //   min: 0,
    //   max: 1024,
    //   message: '长度在 0 到 1024 个字符',
    //   trigger: 'blur'
    // }
  ],
  suggestedModificationInformation: [
    // {
    //   min: 0,
    //   max: 1024,
    //   message: '长度在 0 到 1024 个字符',
    //   trigger: 'blur'
    // }
  ],
  businessFeedback: [
    // {
    //   min: 0,
    //   max: 1024,
    //   message: '长度在 0 到 1024 个字符',
    //   trigger: 'blur'
    // }
  ],
  businessDocumentsOther: [
    // {
    //   min: 0,
    //   max: 1024,
    //   message: '长度在 0 到 1024 个字符',
    //   trigger: 'blur'
    // }
  ],
  consignorName: [
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  consignorAddress: [
    // {
    //   min: 0,
    //   max: 512,
    //   message: '长度在 0 到 512 个字符',
    //   trigger: 'blur'
    // }
  ],
  consignorTel: [
    // { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
  ],
  consignorFax: [
    // { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
  ],
  consignorEmail: [
    // {
    //   min: 0,
    //   max: 128,
    //   message: '长度在 0 到 128 个字符',
    //   trigger: 'blur'
    // }
  ],
  consignorEnterpriseCode: [
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  consignorCountryCode: [
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  consignorAeoCode: [
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  consigneeName: [
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  consigneeAddress: [
    // {
    //   min: 0,
    //   max: 512,
    //   message: '长度在 0 到 512 个字符',
    //   trigger: 'blur'
    // }
  ],
  consigneeTel: [
    // { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
  ],
  consigneeFax: [
    // { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
  ],
  consigneeEmail: [
    // {
    //   min: 0,
    //   max: 128,
    //   message: '长度在 0 到 128 个字符',
    //   trigger: 'blur'
    // }
  ],
  consigneeEnterpriseCode: [
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  consigneeCountryCode: [
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  consigneeAeoCode: [
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  consigneeContactName: [
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  consigneeContactTel: [
    // { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
  ],
  consigneeContactFax: [
    // { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
  ],
  consigneeContactEmail: [
    // {
    //   min: 0,
    //   max: 128,
    //   message: '长度在 0 到 128 个字符',
    //   trigger: 'blur'
    // }
  ],
  particularConsigneeName: [
    // { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
  ],
  particularConsigneePhone: [
    // { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
  ],
  particularConsigneeEMail: [
    // { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
  ],
  particularConsigneeFax: [
    // { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
  ],
  notifyName: [
    // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  notifyAddress: [
    // {
    //   min: 0,
    //   max: 512,
    //   message: '长度在 0 到 512 个字符',
    //   trigger: 'blur'
    // }
  ],
  notifyTel: [
    // { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' }
  ],
  notifyFax: [
    // { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' }
  ],
  notifyEmail: [
    // {
    //   min: 0,
    //   max: 128,
    //   message: '长度在 0 到 128 个字符',
    //   trigger: 'blur'
    // }
  ],
  notifyEnterpriseCode: [
    // { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' }
  ],
  notifyCountryCode: [
    // { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' }
  ],
  notifyAeoCode: [
    // { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' }
  ],
  otherNotifyMan: [
    // {
    //   min: 0,
    //   max: 1024,
    //   message: '长度在 0 到 1024 个字符',
    //   trigger: 'blur'
    // }
  ],
  lc: [{ required: true, message: '不能为空', trigger: 'blur' }],
  shipCertificate: [
    // {
    //   min: 0,
    //   max: 1024,
    //   message: '长度在 0 到 1024 个字符',
    //   trigger: 'blur'
    // }
  ],
  supplementInfo: [
    // {
    //   min: 0,
    //   max: 1024,
    //   message: '长度在 0 到 1024 个字符',
    //   trigger: 'blur'
    // }
  ],
  other: [
    // {
    //   min: 0,
    //   max: 1024,
    //   message: '长度在 0 到 1024 个字符',
    //   trigger: 'blur'
    // }
  ],
  businessWay: [],
  creditCertificateType: [],
  noticeCost: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  pointTimeNotMatchCost: [
    { type: 'number', message: '必须为数字', trigger: 'blur' }
  ],
  confirmMan: [],
  confirmTime: [],
  isConfirm: [],
  noticeBankId: [{ required: true, message: '不能为空', trigger: 'change' }],
  paymentBankId: [],
  proveBankId: [{ required: true, message: '不能为空', trigger: 'change' }],
  swift: [{ required: true, message: '不能为空', trigger: 'change' }],
  currencyId: [{ required: true, message: '不能为空', trigger: 'change' }],
  sendPortId: [],
  targetPortId: [],
  areaId: [],
  saleDepartmentId: [],
  customerId: [],
  tradeDocumenterId: [
    { required: true, message: '不能为空', trigger: 'change' }
  ],
  salesUserId: [],
  forfaitingBankId: [],
  confirmingBankId: []
}

export default {
  name: 'CreditCertificateEdit',
  components: {
    BankSelect,
    BankSelectCertificate,
    BankSelectSwift,
    BankNameSelect,
    LCSelect,
    CurrencySelect,
    PortSelect,
    AreaSelect,
    DepartmentSelect,
    BusinessDocumentsSelect,
    CustomerSelect,
    TradeDocumenterSelect,
    PersonSelect,
    OperateUnitSelect,
    CreditCertificateStatusEnumSelect,
    CreditCertificatePayWayEnumSelect,
    CreditCertificatePlaceOfOriginCertificateEnumSelect,
    CreditCertificatePointTimeEnumSelect,
    CreditCertificateBusinessWayEnumSelect,
    BusinessWaySelect,
    CreditViewPopup: () => import('./CreditViewPopup.vue'),
    CompanyInfoViewPopup: () => import('./CompanyInfoViewPopup.vue'),
    CreditCertificateTypeEnumSelect
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  inject: ['reload'],
  data() {
    return {
      sap_code: null, // 客户编码
      busiMan: {}, // 业务员
      codeType: null,
      status: null,
      inputVisible: false,
      showCompanyInfoViewPopup: false,
      inputValue: '',
      editConsignor: false,
      editMessage: false,
      deletedList: [],
      loading: false,
      editSaleDepartment: true,
      editSalesUser: true,
      editCustomer: true,
      showAddCreditViewPopup: false,
      formData: {
        ...initFormData
      },
      rules: rules
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
    status(val) {
      if (val === 1) {
        this.rules.consignorName = this.rules.consignorAddress = this.rules.notifyName = this.rules.notifyAddress = this.rules.consigneeName = this.rules.consigneeAddress = []
        this.rules.saleDepartmentId = this.rules.salesUserId = this.rules.customerId = this.rules.consignorTel = this.rules.consignorFax = this.rules.consignorEmail = this.rules.consignorEnterpriseCode = this.rules.consignorCountryCode = this.rules.consignorAeoCode = this.rules.consigneeTel = this.rules.consigneeFax = this.rules.consigneeEmail = this.rules.consigneeEnterpriseCode = this.rules.consigneeCountryCode = this.rules.consigneeAeoCode = this.rules.notifyTel = this.rules.notifyFax = this.rules.notifyEmail = this.rules.notifyEnterpriseCode = this.rules.notifyCountryCode = this.rules.notifyAeoCode = []
      }

      if (val === 5) {
        this.$emit('hideSubmitBtn')
      }
    },
    loading(val) {
      this.$emit('loadingChange', val)
    }
  },
  created() {
    if (this.id) {
      this.formData.id = this.id
      this.getData()
    } else {
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }
      this.formData.creditCertificateDate = dateFormat()
      this.status = this.formData.status
    }
  },
  methods: {
    customChanged(name, code, item) {
      if (item) this.sap_code = item.sap_code
      else {
        this.sap_code = ''
      }
    },
    existCreditFileChange(val) {
      if (val) {
        this.formData.proveBankId = this.formData.swift = ''
      }
    },
    changeDepartment(res) {
      // 重选了部门，后面的两个联级数据就置空
      this.formData.salesUserId = ''
      this.formData.customerId = ''
      this.formData.idpath = res.idPath
    },
    getBusiMan(busiMan) {
      this.busiMan = busiMan
    },
    showCompanyInfo() {
      this.codeType = 1
      this.showCompanyInfoViewPopup = true
    },
    showNotifyCompanyInfo() {
      this.codeType = 2
      this.showCompanyInfoViewPopup = true
    },
    chooseCompanyCode(data) {
      this.showCompanyInfoViewPopup = false
      this.formData.consigneeEnterpriseCode = data.companyCode
      this.formData.consigneeCountryCode = data.countryCode
    },
    chooseNotifyCompanyCode(data) {
      this.showCompanyInfoViewPopup = false
      this.formData.notifyEnterpriseCode = data.companyCode
      this.formData.notifyCountryCode = data.countryCode
    },
    async searchPort(name) {
      this.loading = true
      const data = {
        keyword: {},
        page: 0,
        size: 99999
      }
      this.formData.areaName = name
      const res = await portServer.search(data)
      res.rows.forEach((item, index) => {
        if (item.areaName === this.formData.areaName) {
          this.formData.targetPortId = item.seaportId
          return
        }
      })
      if (!this.formData.areaName) {
        this.formData.targetPortId = null
      }
      this.loading = false
    },
    changePrice() {
      this.formData.actualAmount = this.formData.amount
      this.changeUpFloated()
    },
    changeUpFloated() {
      this.formData.upFloatedAmount = (
        this.formData.amount *
        (1 + this.formData.upFloatRate / 100)
      ).toFixed(2)
    },
    changeCurrency(res) {
      this.formData.currencyName = res.name
    },
    changeOrign(res) {
      this.formData.placeOfOriginCertificate = res.title
    },
    changeTrade(name) {
      this.formData.tradeDocumenter = name
    },
    changeBankInfo(res) {
      this.formData.swift = res.swiftCode
    },
    exchangeBankInfo(res) {
      // 服务端需要 swift 字段的值是 swiftCode 的值
      this.formData.proveBankId = res.bankId
    },
    importCredit() {
      this.showAddCreditViewPopup = true
    },
    addCredit() {
      this.$router.push({
        path: './new'
      })
      this.reload()
    },
    updateCreditInfo(data) {
      data.id = null
      data.businessFeedback = null
      data.code = null
      data.creditCertificateDate = dateFormat()
      data.receivedCreditCertificateDate = null
      data.alterCertificateInformation = null
      data.suggestedModificationInformation = null
      data.businessDocuments = []
      data.businessDocumentsOther = null
      data.creditCertificateCode = null
      data.status = 1
      data.saleDepartmentId = null
      data.salesUserId = null
      data.customerId = null
      this.showAddCreditViewPopup = false
      delete data.closeBillAmount 
      delete data.deliveredAmount    
      delete data.distributableAmount 
      delete data.allocatedAmount
      delete data.amountUsedUp 
      this.formData = { ...data }
    },
    handleClose(name) {
      let index = null
      const deletedList = []
      this.formData.itemList.forEach((item, i) => {
        if (item.finLcItemName === name) {
          index = i
          if (item.finLcItemId) {
            deletedList.push(item)
          }
        }
      })
      this.deletedList = deletedList
      if (index !== null) {
        this.formData.itemList.splice(index, 1)
      }
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      const list = this.formData.itemList.filter(
        item => item.finLcItemName === inputValue
      )
      if (inputValue && list.length === 0) {
        this.formData.itemList.push({ finLcItemName: inputValue })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      try {
        const res = await creditCertificateServer.get(this.id)
        res.placeOfOriginCertificateId = CreditCertificatePlaceOfOriginCertificateEnumUtil.toValueFilter(
          res.placeOfOriginCertificate
        )
        initFormData = res
        this.formData = {
          ...res
        }
        this.formData.id = this.formData.lcBillId
        this.status = this.formData.status
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.id) {
              this.formData.deletedList = this.deletedList
              const res = await creditCertificateServer.put(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
              } else {
                this.$message.error(res.data.msg)
              }
              this.formData.id = res.data.id
            } else {
              this.formData.entid = this.$store.getters.entid
              this.formData.proposer = this.$store.getters.userCode
              const res = await creditCertificateServer.post(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                // 新增保存成功后清空表单数据
                this.formData = { ...emptyFormData }
              }
              this.formData.id = res.data.data.lcBillId
              this.$router.push({
                path: './' + res.data.data.lcBillId
              })
            }
            initFormData = {
              ...this.formData
            }
            this.$emit('emitEvent', {
              key: 'update',
              params: {
                id: this.formData.id
              }
            })
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            resolve({
              ...this.formData
            })
          } else {
            if (!this.formData.lc) {
              this.$message({
                message: 'LC受益人不能为空',
                type: 'warning'
              })
            } else {
              this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            }
            reject('error submit!!')
          }
        })
      })
    },
    resetData() {
      this.formData = {
        ...initFormData
      }
    },
    shareProcessInfo(info) {
      this.processInfo = info
      if (
        this.processInfo &&
        this.processInfo.nodeInfo &&
        this.processInfo.nodeInfo.length
      ) {
        this.processInfo.nodeInfo.forEach(processNode => {
          if (processNode.status && processNode.status === 'awaiting_check') {
            this.curProcessOrder = processNode.nodeOrder
            const eventName = 'processStep' + this.curProcessOrder
            this[eventName] && this[eventName]()
          }
        })
      }
    },
    processStep2() {
     this.editConsignor = true
      this.rules.consignorName = this.rules.consignorAddress = this.rules.notifyName = this.rules.notifyAddress = this.rules.consigneeName = this.rules.consigneeAddress = [
        { required: true, message: '不能为空', trigger: 'change' }
      ]
    },
    processStep3() {
      // 显示 认领 按钮
      this.$emit('claimState', true)
      this.editMessage = true
      this.editSaleDepartment = false
      this.editSalesUser = false
      this.editCustomer = false
      this.rules.saleDepartmentId = this.rules.salesUserId = this.rules.customerId = this.rules.consignorTel = this.rules.consignorFax = this.rules.consignorEmail = this.rules.consignorEnterpriseCode = this.rules.consignorCountryCode = this.rules.consignorAeoCode = this.rules.consigneeTel = this.rules.consigneeFax = this.rules.consigneeEmail = this.rules.consigneeEnterpriseCode = this.rules.consigneeCountryCode = this.rules.consigneeAeoCode = this.rules.notifyTel = this.rules.notifyFax = this.rules.notifyEmail = this.rules.notifyEnterpriseCode = this.rules.notifyCountryCode = this.rules.notifyAeoCode = [
        { required: true, message: '不能为空', trigger: 'change' }
      ]
    },    
    processStep4() {      
      // 过了【业务员】节点，就隐藏认领按钮
      this.$emit('claimState', false)
    },    
    async newStartProcess() {
      return new Promise(async(resolve, reject) => {
        if (JSON.stringify(initFormData) !== JSON.stringify(this.formData)) {
          // 如果当前表单数据与初始化数据不同，提示要先保存
          this.$confirm('是否确认提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async() => {
              // 同意保存，执行保存动作
              try {
                resolve(await this.saveBeforeStart())
              } catch (e) {
                reject(e)
              }
            })
            .catch(() => {
              // 不同意保存，断开流程
              reject()
            })
        } else {
          // 如果当前表单数据与初始化数据相同
          resolve()
        }
      })
    },
    async saveBeforeStart() {
      return new Promise(async(resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            try {
              this.formData.deletedList = this.deletedList
              const res = await creditCertificateServer.put(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                initFormData = {
                  ...this.formData
                }
              } else {
                reject()
                return
              }
            } catch (e) {
              this.$message({
                message: '保存失败 ' + e.message,
                type: 'error',
                duration: 5000
              })
              reject()
              return
            }
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            resolve()
          } else {
            if (this.editConsignor || this.editMessage) {
              this.$message({
                message: '请将单据信息中的资料填写完全',
                type: 'warning'
              })
            } else {
              this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            }
            reject()
          }
        })
      })
    },
    async newAgreeProcess() {
      return new Promise(async(resolve, reject) => {
        if (JSON.stringify(initFormData) !== JSON.stringify(this.formData)) {
          // 如果当前表单数据与初始化数据不同，提示要先保存
          this.$confirm('是否确认提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async() => {
              // 同意保存，执行保存动作
              try {
                resolve(await this.saveBeforeStart())
              } catch (e) {
                reject(e)
              }
            })
            .catch(() => {
              // 不同意保存，断开流程
              reject()
            })
        } else {
          // 如果当前表单数据与初始化数据相同
          if (this.$refs.FileUploadBox.tableData.length === 0 && Number.parseInt(this.curProcessOrder) > 1) {
            this.$message({
              message: '请先上传附件',
              type: 'warning'
            })
            reject()
            return
          } else {
            resolve()
          }
        }
      })
    },
    async claimUnit() {
      await this.save()
      if (this.busiMan && this.busiMan.userid) {   
        // 如果有选择 “业务员”，直接进行 “转办”
        await creditCertificateServer.claim({
          action: 'turn',
          billId: this.id,
          billTypeId: 40075,
          opinion: '业务认领',
          userCode: this.busiMan.userid
        })
        this.$message({
          message: '转办成功',
          type: 'success'
        })
        this.$emit('emitEvent', { key: 'update' })
      }
    },
    async emitEvent(event) {
      switch (event.key) {
        case 'saveFormData':
          this.save()
          break
        case 'claimUnit':
          this.claimUnit()
          break  
        case 'resetData':
          this.resetData()
          break
        case 'update':
          this.getData()
          break
        case 'importCredit':
          this.importCredit()
          break
        case 'addCredit':
          this.addCredit()
          break
        case 'shareProcessInfo':
          this.shareProcessInfo(event.params.info)
          break  
        case 'startProcess':
          return this.newStartProcess()
        case 'agreeProcess':
          return this.newAgreeProcess()
        default:
          break
      }
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.el-form-item {
  width: 100%;
  margin-right: 0;
}
/deep/ .el-form-item .el-form-item__label {
  padding: 0 10px 0 0;
}
/deep/.el-form-item__error {
  padding-top: 0;
}
.item-box,
.item-box-name {
  display: inline-block;
  border: 1px solid #ececec;
  padding: 5px;
  .item-box-title {
    font-size: 14px;
    padding: 5px 0 0 5px;
    color: #606266;
  }
}
.item-box-name {
  display: block;
  padding: 5px;
  margin-bottom: 10px;
  .item-box-title {
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
