<template>
  <div class="container m-t-not">
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
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="水单编号" prop="code">
                <el-input v-model="formData.code" size="mini" @focus="showCreditView"/>
                <!-- <CreditChangeSelect v-model="formData.code" @changeData="chooseCredit"/> -->
              </el-form-item>
            </el-col>
            <el-col v-if="formData.id" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="变更单号" prop="changeNo">
                <el-input v-model="formData.changeNo" disabled size="mini"/>
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
              <el-form-item label="信用证申请人" prop="lcReqMan">
                <el-input v-model="formData.lcReqMan" size="mini"/>
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
              <el-form-item label="业务部门" prop="saleDepartmentId">
                <DepartmentSelect v-model="formData.saleDepartmentId" @changeDataRes="deparmentChange"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信用证号" prop="creditCertificateCode">
                <el-input v-model="formData.creditCertificateCode" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信用证类型" prop="creditCertificateType">
                <CreditCertificateTypeEnumSelect v-model="formData.creditCertificateType"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务员" prop="salesUserId">
                <PersonSelect v-model="formData.salesUserId"/>
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
              <el-form-item label="LC受益人" prop="lc">
                <LCSelect v-model="formData.lc"/>
              </el-form-item>
            </el-col>
            <el-col v-if="formData.id" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="版本号" prop="version">
                <el-input v-model="formData.version" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="变更类型" prop="changeType">
                <CreditChangeTypeSelect v-model="formData.changeType" @change="changeType"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="议付银行" prop="paymentBankId">
                <BankSelect v-model="formData.paymentBankId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="通知银行" prop="noticeBankId">
                <BankSelect v-model="formData.noticeBankId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证银行" prop="proveBankId">
                <BankSelect v-model="formData.proveBankId" @changeData="changeBankInfo"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="保兑银行" prop="confirmingBankId">
                <BankSelect v-model="formData.confirmingBankId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="status">
                <CreditCertificateStatusEnumSelect v-model="formData.status" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出货港" prop="sendPortId">
                <PortSelect v-model="formData.sendPortId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="分批装运" prop="inBatches">
                <el-switch v-model="formData.inBatches" size="mini"/>
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
              <el-form-item label="到货港" prop="targetPortId">
                <PortSelect v-model="formData.targetPortId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="转运" prop="transfer">
                <el-switch v-model="formData.transfer" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="确认人" prop="confirmMan">
                <el-input v-model="formData.confirmMan" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="所在国家" prop="areaId">
                <AreaSelect v-model="formData.areaId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="到期地点" prop="expireAddress">
                <el-input v-model="formData.expireAddress" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已确认" prop="confirmStat">
                <el-switch v-model="formData.confirmStat" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" prop="customerId">
                <CustomerSelect v-model="formData.customerId"/>
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
              <el-form-item label="金额是否用完" prop="amountUsedUp">
                <el-switch v-model="formData.amountUsedUp" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="原金额" prop="yIncAmt">
                <el-input-number
                  v-model="formData.yIncAmt"
                  :step="0.01"
                  :min="0"
                  size="mini"
                  disabled
                  @change="changeYPrice"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="原上浮比率(%)" prop="yIncRate">
                <el-input-number
                  v-model="formData.yIncRate"
                  :step="0.01"
                  :min="0"
                  :max="10"
                  size="mini"
                  disabled
                  @change="changeYPrice"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="回款期限" prop="returnedMoneyDeadline">
                <el-input-number v-model="formData.returnedMoneyDeadline" :min="0" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发货人" prop="sendMan">
                <el-input v-model="formData.sendMan" size="mini"/>
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
              <el-form-item label="原上浮后金额" prop="yAmt">
                <el-input-number
                  v-model="formData.yAmt"
                  :step="0.01"
                  :min="0"
                  disabled
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="回款时点" prop="pointTime">
                <CreditCertificatePointTimeEnumSelect v-model="formData.pointTime"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="收货人" prop="receiveMan">
                <el-input v-model="formData.receiveMan" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="实际金额" prop="actualAmount">
                <el-input-number v-model="formData.actualAmount" :step="0.01" :min="0" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="改件通知费" prop="gjTzFee">
                <el-input-number v-model="formData.gjTzFee" :step="0.01" :min="0" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="通知人" prop="noticeMan">
                <el-input v-model="formData.noticeMan" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="货币" prop="currencyId">
                <CurrencySelect v-model="formData.currencyId" @changeData="changeCurrency"/>
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
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="上浮后金额" prop="upFloatedAmount">
                <el-input-number v-model="formData.upFloatedAmount" :step="0.01" :min="0" disabled size="mini"/>
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
              <el-form-item label="修改反馈" prop="businessFeedback">
                <el-input v-model="formData.businessFeedback" size="mini"/>
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-form-item label="议付单据" prop="consultBillNote">
                <el-input v-model="formData.consultBillNote" size="mini"/>
              </el-form-item>
            </el-col>-->
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-form-item label="备注" prop="note">
                <el-input v-model="formData.note" size="mini"/>
              </el-form-item>
            </el-col>
            <!-- 
            <el-col v-if="formData.id" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="申请人" prop="proposer">
                <el-input v-model="formData.proposer" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="付款方式" required prop="payWay">
                <CreditCertificatePayWayEnumSelect v-model="formData.payWay" />
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
              <el-form-item label="已交单金额" prop="closeBillAmount">
                <el-input-number v-model="formData.closeBillAmount" :step="0.01" :min="0" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="产地证" prop="placeOfOriginCertificate">
                <CreditCertificatePlaceOfOriginCertificateEnumSelect
                  v-model="formData.placeOfOriginCertificate"
                  @changeData="changeOrign"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="具体联系人名称" prop="consigneeContactName">
                <el-input v-model="formData.consigneeContactName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="具体联系人电话" prop="consigneeContactTel">
                <el-input v-model="formData.consigneeContactTel" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="具体联系人传真" prop="consigneeContactFax">
                <el-input v-model="formData.consigneeContactFax" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="具体联系人邮箱" prop="consigneeContactEmail">
                <el-input v-model="formData.consigneeContactEmail" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="中信保银行档案" prop="existCreditFile">
                <el-switch v-model="formData.existCreditFile" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否新版本" prop="isNewVersion">
                <el-switch v-model="formData.isNewVersion" disabled size="mini" />
              </el-form-item>
            </el-col>-->
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
                  <el-input v-model="formData.consignorName" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人地址" prop="consignorAddress">
                  <el-input v-model="formData.consignorAddress" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人电话" prop="consignorTel">
                  <el-input v-model="formData.consignorTel" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人传真" prop="consignorFax">
                  <el-input v-model="formData.consignorFax" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人邮箱" prop="consignorEmail">
                  <el-input v-model="formData.consignorEmail" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人企业代码" prop="consignorEnterpriseCode">
                  <el-input v-model="formData.consignorEnterpriseCode" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人国家代码" prop="consignorCountryCode">
                  <el-input v-model="formData.consignorCountryCode" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货人AEO编码" prop="consignorAeoCode">
                  <el-input v-model="formData.consignorAeoCode" size="mini"/>
                </el-form-item>
              </el-col>
            </div>
            <div class="item-box">
              <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <div class="item-box-title">收货人资料</div>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人" prop="consigneeName">
                  <el-input v-model="formData.consigneeName" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人地址" prop="consigneeAddress">
                  <el-input v-model="formData.consigneeAddress" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人电话" prop="consigneeTel">
                  <el-input v-model="formData.consigneeTel" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人传真" prop="consigneeFax">
                  <el-input v-model="formData.consigneeFax" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人邮箱" prop="consigneeEmail">
                  <el-input v-model="formData.consigneeEmail" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人企业代码" prop="consigneeEnterpriseCode">
                  <el-input v-model="formData.consigneeEnterpriseCode" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人国家代码" prop="consigneeCountryCode">
                  <el-input v-model="formData.consigneeCountryCode" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="收货人AEO编码" prop="consigneeAeoCode">
                  <el-input v-model="formData.consigneeAeoCode" size="mini"/>
                </el-form-item>
              </el-col>
            </div>
            <div class="item-box">
              <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <div class="item-box-title">通知人资料</div>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人" prop="notifyName">
                  <el-input v-model="formData.notifyName" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人地址" prop="notifyAddress">
                  <el-input v-model="formData.notifyAddress" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人电话" prop="notifyTel">
                  <el-input v-model="formData.notifyTel" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人传真" prop="notifyFax">
                  <el-input v-model="formData.notifyFax" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人邮箱" prop="notifyEmail">
                  <el-input v-model="formData.notifyEmail" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人企业代码" prop="notifyEnterpriseCode">
                  <el-input v-model="formData.notifyEnterpriseCode" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人国家代码" prop="notifyCountryCode">
                  <el-input v-model="formData.notifyCountryCode" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知人AEO编码" prop="notifyAeoCode">
                  <el-input v-model="formData.notifyAeoCode" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="其它通知人" prop="otherNotifyMan">
                  <el-input v-model="formData.otherNotifyMan" size="mini"/>
                </el-form-item>
              </el-col>
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <FileUpload ref="FileUploadBox" :id="id" :bill-name="'信用证变更单号'"/>
    </el-form>
    <component
      v-if="showCreditViewPopup"
      :is="'CreditViewPopup'"
      @updateInfo="chooseCredit"
      @close="showCreditViewPopup = false"
    />
  </div>
</template>

<script>
import creditChangeServer from './../../../api/creditChangeServer'
import BankSelect from './../bank/BankSelect'
import BankNameSelect from './../bank/BankNameSelect'
import CurrencySelect from './../currency/CurrencySelect'
import PortSelect from './../port/PortSelect'
import AreaSelect from './../area/AreaSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import CustomerSelect from './../customer/CustomerSelect'
import TradeDocumenterSelect from './../trade-documenter/TradeDocumenterSelect'
import PersonSelect from '../person/PersonSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import BusinessDocumentsSelect from './../credit-certificate/BusinessDocumentsSelect'
import CreditChangeSelect from './../credit-change/CreditChangeSelect'
import CreditChangeTypeSelect from './CreditChangeTypeSelect'
import LCSelect from './../credit-certificate/LCSelect'
import CreditCertificatePlaceOfOriginCertificateEnumUtil from './../../../components/enum/credit-certificate/CreditCertificatePlaceOfOriginCertificateEnumUtil'
import CreditCertificateStatusEnumSelect from './../credit-certificate/CreditCertificateStatusEnumSelect'
import CreditCertificatePayWayEnumSelect from './../credit-certificate/CreditCertificatePayWayEnumSelect'
import CreditCertificatePlaceOfOriginCertificateEnumSelect from './../credit-certificate/CreditCertificatePlaceOfOriginCertificateEnumSelect'
import CreditCertificatePointTimeEnumSelect from './../credit-certificate/CreditCertificatePointTimeEnumSelect'
import CreditCertificateBusinessWayEnumSelect from './../credit-certificate/CreditCertificateBusinessWayEnumSelect'
import BusinessWaySelect from './../credit-certificate/BusinessWaySelect'
import CreditCertificateTypeEnumSelect from './../credit-certificate/CreditCertificateTypeEnumSelect'

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
  changeNo: null,
  code: null,
  changeType: null,
  lcBillId: null,
  lcReqMan: null,
  creditCertificateDate: dateFormat(),
  receivedCreditCertificateDate: null,
  status: 1,
  creditCertificateType: null,
  salesUserId: null,
  yIncAmt: null,
  yAmt: null,
  gjTzFee: null,
  yIncRate: null,
  // consultBillNote: null,
  note: null,
  sendMan: null,
  receiveMan: null,
  noticeMan: null,
  confirmStat: false,
  creditCertificateCode: null,
  proposer: null,
  lastLoadDate: null,
  periodValidity: null,
  existCreditFile: null,
  payWay: null,
  isNewVersion: null,
  amount: null,
  upFloatRate: null,
  upFloatedAmount: null,
  actualAmount: null,
  amountUsedUp: null,
  allocatedAmount: null,
  distributableAmount: null,
  deliveredAmount: null,
  closeBillAmount: null,
  inBatches: null,
  transfer: null,
  expireAddress: null,
  closeBillDeadline: null,
  placeOfOriginCertificate: null,
  returnedMoneyDeadline: null,
  pointTime: null,
  alterCertificateInformation: null,
  suggestedModificationInformation: null,
  businessFeedback: null,
  businessDocuments: [],
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
  itemList: [],
  confirmMan: null,
  confirmTime: null,
  noticeBankId: null,
  paymentBankId: null,
  proveBankId: null,
  currencyId: null,
  sendPortId: null,
  targetPortId: null,
  areaId: null,
  saleDepartmentId: null,
  customerId: null,
  swift: null,
  tradeDocumenterId: null,
  tradeDocumenter: null,
  confirmingBankId: null
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'CreditChangeEdit',
  components: {
    BankSelect,
    BankNameSelect,
    CurrencySelect,
    PortSelect,
    AreaSelect,
    CreditChangeTypeSelect,
    DepartmentSelect,
    BusinessDocumentsSelect,
    CustomerSelect,
    PersonSelect,
    TradeDocumenterSelect,
    OperateUnitSelect,
    CreditChangeSelect,
    LCSelect,
    CreditCertificateStatusEnumSelect,
    CreditCertificatePayWayEnumSelect,
    CreditCertificatePlaceOfOriginCertificateEnumSelect,
    CreditCertificatePointTimeEnumSelect,
    CreditCertificateBusinessWayEnumSelect,
    BusinessWaySelect,
    CreditViewPopup: () =>
      import('./../credit-certificate/CreditViewPopup.vue'),
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
      inputVisible: false,
      showCreditViewPopup: false,
      inputValue: '',
      noChangeAmt: null,
      deletedList: [],
      loading: false,
      formData: {
        ...initFormData
      },
      rules: {
        code: [
          { required: true, message: '不能为空', trigger: 'change' }
          // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        changeType: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        creditCertificateDate: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        receivedCreditCertificateDate: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        status: [],
        creditCertificateType: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        salesUserId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        yIncAmt: [],
        yAmt: [],
        gjTzFee: [],
        yIncRate: [],
        // consultBillNote: [],
        note: [],
        sendMan: [],
        receiveMan: [],
        noticeMan: [],
        confirmStat: [],
        creditCertificateCode: [
          { required: true, message: '不能为空', trigger: 'change' }
          // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        proposer: [],
        lastLoadDate: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        periodValidity: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        existCreditFile: [],
        payWay: [{ required: true, message: '不能为空', trigger: 'blur' }],
        isNewVersion: [],
        amount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        upFloatRate: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        upFloatedAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        actualAmount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        amountUsedUp: [],
        allocatedAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        distributableAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        deliveredAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        closeBillAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        inBatches: [],
        transfer: [],
        expireAddress: [
          {
            min: 0,
            max: 512,
            message: '长度在 0 到 512 个字符',
            trigger: 'blur'
          }
        ],
        closeBillDeadline: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        placeOfOriginCertificate: [],
        returnedMoneyDeadline: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        pointTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
        alterCertificateInformation: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        suggestedModificationInformation: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        businessFeedback: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        businessDocumentsOther: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        consignorName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        consignorAddress: [
          {
            min: 0,
            max: 512,
            message: '长度在 0 到 512 个字符',
            trigger: 'blur'
          }
        ],
        consignorTel: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
        ],
        consignorFax: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
        ],
        consignorEmail: [
          {
            min: 0,
            max: 128,
            message: '长度在 0 到 128 个字符',
            trigger: 'blur'
          }
        ],
        consignorEnterpriseCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        consignorCountryCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        consignorAeoCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        consigneeName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        consigneeAddress: [
          {
            min: 0,
            max: 512,
            message: '长度在 0 到 512 个字符',
            trigger: 'blur'
          }
        ],
        consigneeTel: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
        ],
        consigneeFax: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
        ],
        consigneeEmail: [
          {
            min: 0,
            max: 128,
            message: '长度在 0 到 128 个字符',
            trigger: 'blur'
          }
        ],
        consigneeEnterpriseCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        consigneeCountryCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        consigneeAeoCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        consigneeContactName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        consigneeContactTel: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
        ],
        consigneeContactFax: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
        ],
        consigneeContactEmail: [
          {
            min: 0,
            max: 128,
            message: '长度在 0 到 128 个字符',
            trigger: 'blur'
          }
        ],
        notifyName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        notifyAddress: [
          {
            min: 0,
            max: 512,
            message: '长度在 0 到 512 个字符',
            trigger: 'blur'
          }
        ],
        notifyTel: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
        ],
        notifyFax: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
        ],
        notifyEmail: [
          {
            min: 0,
            max: 128,
            message: '长度在 0 到 128 个字符',
            trigger: 'blur'
          }
        ],
        notifyEnterpriseCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        notifyCountryCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        notifyAeoCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        otherNotifyMan: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        lc: [{ required: true, message: '不能为空', trigger: 'blur' }],
        confirmMan: [],
        confirmTime: [],
        noticeBankId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        paymentBankId: [],
        proveBankId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        currencyId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        sendPortId: [],
        targetPortId: [],
        areaId: [],
        saleDepartmentId: [],
        customerId: [],
        tradeDocumenterId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        confirmingBankId: []
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    },
    upFloatedAmount() {
      return Math.floor(this.formData.amount * (1 + this.formData.upFloatRate * 0.01) * 100) / 100
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
    upFloatedAmount(newVal) {
      this.formData.upFloatedAmount = newVal
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
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }
    }
  },
  methods: {
    deparmentChange(info) {
      this.formData.idpath = info.idPath
    },
    showCreditView() {
      this.showCreditViewPopup = true
    },
    changePrice() {
      if (this.formData.changeType === 1) {
        // this.formData.actualAmount = this.noChangeAmt
      }
      if (this.formData.changeType === 2) {
        this.formData.actualAmount = this.formData.amount
      }
    },
    changeType() {
      if (this.formData.changeType === 2) {
        this.formData.actualAmount = this.formData.amount
        // this.changeUpFloated()
      }
    },
    // changeUpFloated() {
    //   this.formData.upFloatedAmount = (
    //     this.formData.amount * (1 + this.formData.upFloatRate * 0.01)
    //   ).toFixed(2)
    // },
    changeYPrice() {
      this.formData.yAmt = Math.floor(
        this.formData.yIncAmt *
        (1 + this.formData.yIncRate) * 100
      ) / 100
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
      this.formData.swift = res.Swift_Code
    },
    chooseCredit(data) {
      this.showCreditViewPopup = false
      data.changeType = this.formData.changeType
      data.status = this.formData.status
      data.itemList = data.itemList ? data.itemList : []
      data.businessDocuments = data.businessDocuments
        ? data.businessDocuments
        : []
      data.placeOfOriginCertificateId = CreditCertificatePlaceOfOriginCertificateEnumUtil.toValueFilter(
        data.placeOfOriginCertificate
      )
      // 选中的信用证信息
      this.formData = {
        ...data
      }
      this.noChangeAmt = this.formData.actualAmount
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
        const res = await creditChangeServer.get(this.id)
        res.placeOfOriginCertificateId = CreditCertificatePlaceOfOriginCertificateEnumUtil.toValueFilter(
          res.placeOfOriginCertificate
        )
        initFormData = res
        this.formData = {
          ...res
        }
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
              const res = await creditChangeServer.put(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
              } else {
                this.$message.error(res.data.msg)
              }
              // this.formData.id = res.data.changeId ? res.data.changeId : this.formData.id
            } else {
              this.formData.entid = this.$store.getters.entid
              this.formData.proposer = this.$store.getters.userCode
              const res = await creditChangeServer.post(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                // 新增保存成功后清空表单数据
                this.formData = { ...emptyFormData }
              }
              this.$router.push({
                path: './' + res.data.data.changeId
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
        case 'startProcess':
          return this.newStartProcess()
        default:
          break
      }
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
          if (this.formData.changeType === 2) {
            // 外部变更
            if (this.$refs.FileUploadBox.tableData.length === 0) {
              this.$message({
                message: '请先上传附件',
                type: 'warning'
              })
              reject()
              return
            } else {
              resolve()
            }
          } else {
            resolve()
          }
        }
      })
    },
    async saveBeforeStart() {
      return new Promise(async(resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            try {
              this.formData.deletedList = this.deletedList
              const res = await creditChangeServer.put(this.formData)
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
            this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            reject()
          }
        })
      })
    },
    resetData() {
      if (this.id) {
        this.formData = {
          ...initFormData
        }
        this.getData()
      } else {
        this.formData = {
          ...initFormData
        }
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
