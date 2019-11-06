<template>
  <div class="max-w">
    <div class="container m-t-not">
      <el-form
        :model="formData"
        :ref="'formData'"
        :rules="rules"
        class="demo-form-inline"
        label-position="right"
        label-width="120px"
      >
        <el-tabs v-loading="loading" tab-position="top">
          <el-tab-pane label="基础信息">
            <el-row>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="订舱单号" prop="bookingNo">
                  <el-input v-model="formData.bookingNo" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="出货预告号" prop="warnNo">
                  <el-input v-model="formData.warnNo" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="合同号" prop="contractNo">
                  <el-input v-model="formData.contractNo" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="询价单号" prop="enquiryNo">
                  <el-input v-model="formData.enquiryNo" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="订舱状态" prop="status">
                  <ShipCabinOrderStatusEnumSelect v-model="formData.status" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="运费付款方式" prop="payStyle">
                  <ShipCabinOrderPayStyleEnumSelect v-model="formData.payStyle" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="价格条款" prop="priceTypeName">
                  <el-input v-model="formData.priceTypeName" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发运方式" prop="shipType">
                  <ShipCabinOrderShipTypeEnumSelect v-model="formData.shipType" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="销售部门" prop="orgName">
                  <el-input v-model="formData.orgName" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="业务员" prop="salesUserId">
                  <el-input v-model="formData.salesUserId" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="单证员" prop="prover">
                  <el-input v-model="formData.prover" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col
                v-if="!checkPermission(['ROLE_SUPER_FORWARDER'])"
                :lg="6"
                :md="8"
                :sm="12"
                :xs="24"
              >
                <el-form-item label="客户编码" prop="custCode">
                  <el-input v-model="formData.custCode" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col
                v-if="!checkPermission(['ROLE_SUPER_FORWARDER'])"
                :lg="6"
                :md="8"
                :sm="12"
                :xs="24"
              >
                <el-form-item label="客户名称" prop="custName">
                  <el-input v-model="formData.custName" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="版本号" prop="versionNum">
                  <el-input-number v-model="formData.versionNum" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="预告变更次数" prop="warnBc">
                  <el-input-number v-model="formData.warnBc" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="总柜数" prop="boxQty">
                  <el-input-number v-model="formData.boxQty" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="总件数" prop="totalXqty">
                  <el-input-number v-model="formData.totalXqty" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="总金额" prop="totalAmt">
                  <el-input-number v-model="formData.totalAmt" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="总数量" prop="totalQty">
                  <el-input-number v-model="formData.totalQty" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="目的港免用箱" prop="protFreeBox">
                  <el-input-number v-model="formData.protFreeBox" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="免堆期(天)" prop="protFreeDate">
                  <el-input-number v-model="formData.protFreeDate" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="经营单位" prop="entid">
                  <OperateUnitSelect v-model="formData.entid" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :xs="24">
                <el-form-item label="箱号" prop="actualBoxNos">
                  <el-input :disabled="isDisable3 === true" v-model="formData.actualBoxNos" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :xs="24">
                <el-form-item label="空箱重量" prop="emptyBoxWeight">
                  <el-input :disabled="isDisable3 === true" v-model="formData.emptyBoxWeight" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :xs="24">
                <el-form-item label="封号" prop="seals">
                  <el-input :disabled="isDisable3 === true" v-model="formData.seals" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="异常票数" prop="isExce">
                  <el-switch v-model="formData.isExce" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="事故票数" prop="isAccident">
                  <el-switch v-model="formData.isAccident" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="箱单" prop="chestbill">
                  <el-switch v-model="formData.chestbill" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="B/L" prop="bl">
                  <el-switch v-model="formData.bl" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="有无产地证" prop="origin">
                  <el-switch v-model="formData.origin" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="电放" prop="tddf">
                  <el-switch v-model="formData.tddf" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="有无免费配件" prop="haveFreePart">
                  <el-switch v-model="formData.haveFreePart" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="提单分单" prop="tdfd">
                  <el-switch v-model="formData.tdfd" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="信用证号">
                  <el-input v-model="LCNO" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="订舱单备注" prop="dcNote">
                  <el-input
                    v-model="formData.dcNote"
                    :disabled="true"
                    :rows="4"
                    type="textarea"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="异常事故原因" prop="ygNote">
                  <el-input :disabled="!hasMalfunction" v-model="formData.ygNote" :rows="4" type="textarea" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="出货预告备注" prop="note">
                  <el-input v-model="formData.note" :rows="6" disabled type="textarea" size="mini"/>
                </el-form-item>
              </el-col>
            </el-row>
            <FileUpload
              :id="formData.id"
              :title="'附件'"
              :tab="1"
              :btn-text="'添加附件'"
              :bill-name="'订舱单流水号'"
            />
            <ShipCabinOrderWarnNoAttachment :id="formData.id" :title="'出货预告附件'"/>
          </el-tab-pane>
          <el-tab-pane v-if="!checkPermission(['ROLE_SUPER_FORWARDER'])" label="单据需求">
            <el-collapse v-model="orderRequirementActiveNames">
              <el-collapse-item title="发货人资料" name="1">
                <el-row>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="名称" prop="consignorName">
                      <el-input v-model="formData.consignorName" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="详细地址" prop="consignorAddress">
                      <el-input v-model="formData.consignorAddress" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="手机号" prop="consignorPhone">
                      <el-input v-model="formData.consignorPhone" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="传真" prop="consignorFax">
                      <el-input v-model="formData.consignorFax" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="邮箱" prop="consignorEMail">
                      <el-input v-model="formData.consignorEMail" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="企业编码" prop="consignorCompanyCode">
                      <el-input
                        v-model="formData.consignorCompanyCode"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="国家代码" prop="consignorCountryCode">
                      <el-input
                        v-model="formData.consignorCountryCode"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="AEO企业编码" prop="consignorAeoCode">
                      <el-input v-model="formData.consignorAeoCode" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="收货人资料" name="2">
                <el-row>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="名称" prop="consigneeName">
                      <el-input v-model="formData.consigneeName" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="详细地址" prop="consigneeAddress">
                      <el-input v-model="formData.consigneeAddress" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="手机号" prop="consigneePhone">
                      <el-input v-model="formData.consigneePhone" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="传真" prop="consigneeFax">
                      <el-input v-model="formData.consigneeFax" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="邮箱" prop="consigneeEMail">
                      <el-input v-model="formData.consigneeEMail" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="企业编码" prop="consigneeCompanyCode">
                      <el-input
                        v-model="formData.consigneeCompanyCode"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="企业名称" prop="consigneeCompanyCodeName">
                      <el-input
                        v-model="formData.consigneeCompanyCodeName"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="国家代码" prop="consigneeCountryCode">
                      <el-input
                        v-model="formData.consigneeCountryCode"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="AEO企业编码" prop="consigneeAeoCode">
                      <el-input v-model="formData.consigneeAeoCode" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="具体联系人" prop="particularConsigneeName">
                      <el-input
                        v-model="formData.particularConsigneeName"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="具体联系电话" prop="particularConsigneePhone">
                      <el-input
                        v-model="formData.particularConsigneePhone"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="具体联系传真" prop="particularConsigneeFax">
                      <el-input
                        v-model="formData.particularConsigneeFax"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="具体联系邮箱" prop="particularConsigneeEMail">
                      <el-input
                        v-model="formData.particularConsigneeEMail"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="通知人资料" name="3">
                <el-row>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="名称" prop="noticeManName">
                      <el-input v-model="formData.noticeManName" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="详细地址" prop="noticeManAddress">
                      <el-input v-model="formData.noticeManAddress" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="手机号" prop="noticeManPhone">
                      <el-input v-model="formData.noticeManPhone" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="传真" prop="noticeManFax">
                      <el-input v-model="formData.noticeManFax" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="邮箱" prop="noticeManEMail">
                      <el-input v-model="formData.noticeManEMail" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="企业编码" prop="noticeManCompanyCode">
                      <el-input
                        v-model="formData.noticeManCompanyCode"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="企业名称" prop="noticeManCompanyCodeName">
                      <el-input
                        v-model="formData.noticeManCompanyCodeName"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="国家代码" prop="noticeManCountryCode">
                      <el-input
                        v-model="formData.noticeManCountryCode"
                        :disabled="true"
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="AEO企业编码" prop="noticeManAeoCode">
                      <el-input v-model="formData.noticeManAeoCode" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6" :md="8" :sm="12" :xs="24">
                    <el-form-item label="其他通知人" prop="noticeMan">
                      <el-input v-model="formData.noticeMan" :disabled="true" size="mini"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="船务信息">
            <el-row>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="预计货好日期" prop="preShipDate">
                  <el-date-picker
                    v-model="formData.preShipDate"
                    :disabled="true"
                    size="mini"
                    class="max-w"
                    type="date"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="到货港" prop="seaportInName">
                  <el-input v-model="formData.seaportInName" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="出货港" prop="seaportOutName">
                  <el-input v-model="formData.seaportOutName" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="目的国家" prop="toAreaName">
                  <el-input v-model="formData.toAreaName" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="最终目的地" prop="finalGoul">
                  <el-input v-model="formData.finalGoul" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="协议货代" prop="transitId">
                  <ShippingCompanySelect
                    :disabled="isDisabled_for_transit === true"
                    v-model="formData.transitId"
                    :form="1"
                    :hd-type="1"
                    @changeData="changeTransit"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="协议联系人" prop="transitRelaName">
                  <el-input v-model="formData.transitRelaName" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="协议联系电话" prop="transitPhone">
                  <el-input v-model="formData.transitPhone" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="协议联系邮箱" prop="transitEmail">
                  <el-input v-model="formData.transitEmail" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="指定货代" prop="logisticsId">
                  <ShippingCompanySelect
                    :disabled="isDisable === true"
                    v-model="formData.logisticsId"
                    :form="1"
                    :hd-type="2"
                    @changeData="changeLogistics"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="指贷联系人" prop="relaman">
                  <el-input v-model="formData.relaman" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="指贷联系电话" prop="phone">
                  <el-input v-model="formData.phone" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="指贷联系邮箱" prop="email">
                  <el-input v-model="formData.email" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="船公司" prop="towCopName">
                  <el-input v-model="formData.towCopName" :disabled="isShipCompany === true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="订舱品名" prop="pbrandName">
                  <el-input v-model="formData.pbrandName" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="船名" prop="shipName">
                  <el-input :disabled="isDisable2 === true" v-model="formData.shipName" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="船次" prop="saillings">
                  <el-input :disabled="isDisable2 === true" v-model="formData.saillings" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="提单号" prop="billNo">
                  <el-input :disabled="isDisable2 === true" v-model="formData.billNo" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="开船日期" prop="departDate">
                  <el-date-picker
                    v-model="formData.departDate"
                    :disabled="isDisable1 === true"
                    size="mini"
                    class="max-w"
                    type="date"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="截关日期" prop="cutDate">
                  <el-date-picker
                    v-model="formData.cutDate"
                    :disabled="isDisable1 === true"
                    size="mini"
                    class="max-w"
                    type="date"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="截单日期" prop="cutoffDate">
                  <!-- <el-input v-model="formData.cutoffDate" size="mini"/> -->
                  <el-date-picker
                    v-model="formData.cutoffDate"
                    :disabled="isJd === true"
                    size="mini"
                    class="max-w"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="进港码头" prop="place">
                  <el-input 
                    :disabled="isDisable === true"
                    v-model="formData.place" 
                    size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="报关行" prop="customsBroker">
                  <el-input 
                    :disabled="isDisable === true"
                    v-model="formData.customsBroker" 
                    size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="是否报关" prop="isBg">
                  <el-switch 
                    :disabled="isDisable === true"
                    v-model="formData.isBg" 
                    size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="是否放舱" prop="isFc">
                  <el-switch :disabled="disIsFc === true" v-model="formData.isFc" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="出境关别" prop="exitCustomsName">
                  <el-input 
                    :disabled="isDisable === true"
                    v-model="formData.exitCustomsName" 
                    size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="贸易方式" prop="tradePatterns">
                  <el-input v-model="formData.tradePatterns" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="报关口岸" prop="customerPort">
                  <el-input v-model="formData.customerPort" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="箱型箱量" prop="xxxl">
                  <el-input v-model="formData.xxxl" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="船务操作员" prop="cwUser">
                  <el-input v-model="formData.cwUser" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="操作员电话" prop="cwTel">
                  <el-input v-model="formData.cwTel" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="提单确认人" prop="dzUser">
                  <el-input v-model="formData.dzUser" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="提单人电话" prop="dzTel">
                  <el-input v-model="formData.dzTel" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="船证明" prop="vesselCertificate">
                  <el-input v-model="formData.vesselCertificate" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="PI" prop="piNos">
                  <el-input v-model="formData.piNos" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="预计到港时间" prop="expectInPortDate">
                  <el-date-picker
                    :disabled="isDisable3 === true"
                    v-model="formData.expectInPortDate"
                    size="mini"
                    class="max-w"
                    value-format="yyyy-MM-dd"
                    type="date"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="实际到港时间" prop="actualInPortDate">
                  <el-date-picker
                    :disabled="isDisable3 === true"
                    v-model="formData.actualInPortDate"
                    size="mini"
                    class="max-w"
                    value-format="yyyy-MM-dd"
                    type="date"
                  />
                </el-form-item>
              </el-col> -->
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="截港时间" prop="cutPortDate">
                  <el-date-picker
                    :disabled="isDisable3 === true"
                    v-model="formData.cutPortDate"
                    size="mini"
                    class="max-w"
                    value-format="yyyy-MM-dd"
                    type="date"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="进港时间" prop="inPortDate">
                  <el-date-picker
                    :disabled="true"
                    v-model="formData.inPortDate"
                    size="mini"
                    class="max-w"
                    value-format="yyyy-MM-dd"
                    type="date"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="排柜信息">
            <el-table :data="containerList" border>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <div>
                    <div>
                      总毛重:{{ fixedNumber(props.row.totalUnitGw)(3) }}
                      &nbsp;&nbsp;
                      总净重:{{ fixedNumber(props.row.totalUnitNw)(3) }}
                      &nbsp;&nbsp;
                      总体积:{{ fixedNumber(props.row.totalPackRule)(3) }}
                      &nbsp;&nbsp;
                      总件数:{{ props.row.totalXqty }}
                    </div>
                    <el-table :data="props.row.lineList" class="m-t-6" border>
                      <el-table-column type="index" width="50"/>
                      <el-table-column property="piNo" label="PI号" min-width="120"/>
                      <el-table-column property="date" label="机型类别" min-width="100">
                        <template slot-scope="scope">{{ scope.row.proType | proType }}</template>
                      </el-table-column>
                      <el-table-column property="refBoxNo" label="参考柜号" min-width="120"/>
                      <el-table-column property="qty" label="出货预告数量" min-width="110"/>
                      <el-table-column property="packStyle" label="件数" min-width="80"/>
                      <el-table-column property="abVotes" label="AB票" min-width="80"/>
                      <el-table-column property="custItemName" label="客户型号" min-width="120"/>
                      <el-table-column
                        :show-overflow-tooltip="true"
                        property="custSpec"
                        label="客户产品名称"
                        width="320"
                      />
                      <el-table-column property="erpCode" label="ERP产品编码" min-width="150"/>
                      <el-table-column property="inspectionBatchno" label="商检批号" min-width="120"/>
                      <el-table-column property="prodQty" label="排产单数量" min-width="120"/>
                      <!--<el-table-column-->
                      <!--property="date"-->
                      <!--label="托数"-->
                      <!--min-width="120"-->
                      <!--/>-->
                      <el-table-column property="packType" label="包装类型" min-width="120"/>
                      <el-table-column property="unitGw" label="单位毛重" min-width="120"/>
                      <el-table-column property="unitNw" label="单位净重" min-width="120"/>
                      <el-table-column property="packRule" label="单位体积" min-width="120"/>
                      <el-table-column property="ptotalGw" label="总毛重" min-width="120"/>
                      <el-table-column property="ptotalNw" label="总净重" min-width="120"/>
                      <el-table-column property="ptotalTj" label="总体积" min-width="120"/>
                      <el-table-column property="marks" label="唛头" min-width="120"/>
                      <!--<el-table-column-->
                      <!--property="date"-->
                      <!--label="导出数量"-->
                      <!--min-width="120"-->
                      <!--/>-->
                      <el-table-column property="printxqty" label="导出件数" min-width="120"/>
                      <el-table-column property="totalTj" label="导出总体积" min-width="120"/>
                      <el-table-column property="totalGw" label="导出总毛重" min-width="120"/>
                      <!--<el-table-column-->
                      <!--property="date"-->
                      <!--label="是否需要商检"-->
                      <!--min-width="120"-->
                      <!--/>-->
                      <!--<el-table-column-->
                      <!--property="date"-->
                      <!--label="排产单号"-->
                      <!--min-width="120"-->
                      <!--/>-->
                      <el-table-column
                        :show-overflow-tooltip="true"
                        property="itemHName"
                        label="整机名称"
                        min-width="320"
                      />
                      <!--<el-table-column-->
                      <!--property="date"-->
                      <!--label="机型编码"-->
                      <!--min-width="120"-->
                      <!--/>-->
                      <el-table-column property="bgName" label="型号" min-width="120"/>
                      <el-table-column property="bgPrice" label="报关价" min-width="120"/>
                      <!--<el-table-column-->
                      <!--property="date"-->
                      <!--label="销售价"-->
                      <!--min-width="120"-->
                      <!--/>-->
                      <el-table-column property="itemTypeName" label="产品大类名称" min-width="120"/>
                      <el-table-column property="brandName" label="品牌名" min-width="120"/>
                      <!-- <el-table-column property="tradeType" label="贸易类型" min-width="120">
                        <template slot-scope="scope">{{ scope.row.tradeType | tradeTypeFilter }}</template>
                      </el-table-column> -->
                      <el-table-column property="tradeType" label="贸易类型" min-width="120">
                        <template
                          slot-scope="scope"
                        >{{ scope.row.tradeType | CustomsTradeTypeFilter }}</template>
                      </el-table-column>
                      <el-table-column property="bgTradeType" label="报关贸易类型" min-width="120">
                        <template
                          slot-scope="scope"
                        >{{ scope.row.bgTradeType | CustomsTradeTypeFilter }}</template>
                      </el-table-column>
                      <el-table-column property="actualBoxNo" label="实际柜号" min-width="120"/>
                      <el-table-column property="actualBoxNo" label="箱号" min-width="120"/>
                      <el-table-column property="seal" label="封号" min-width="120"/>
                      <el-table-column property="boxType" label="箱型" min-width="120">
                        <template slot-scope="scope">{{ scope.row.boxType | ContainerLoadFilter }}</template>
                      </el-table-column>
                      <el-table-column property="unitGw" label="实际单位毛重" min-width="120"/>
                      <el-table-column property="unitNw" label="实际单位净重" min-width="120"/>
                      <el-table-column property="packRule" label="实际单位体积" min-width="120"/>
                      <el-table-column property="ptotalGw" label="实际总毛重" min-width="120"/>
                      <el-table-column property="ptotalNw" label="实际总净重" min-width="120"/>
                      <el-table-column property="ptotalTj" label="实际总体积" min-width="120"/>
                      <el-table-column property="outQty" label="实际件数" min-width="120"/>
                      <el-table-column property="wsQty" label="WMS总件数" min-width="120"/>
                    </el-table>
                  </div>
                </template>
              </el-table-column>
              <el-table-column type="index" width="50"/>
              <el-table-column property="boxType" label="柜型" min-width="120">
                <template slot-scope="scope">{{ scope.row.boxType | ContainerLoadFilter }}</template>
              </el-table-column>
              <el-table-column property="refBoxNo" label="参考柜号" min-width="120"/>
              <el-table-column property="totalPackRule" label="总体积" min-width="120">
                <template slot-scope="scope">{{ fixedNumber(scope.row.totalPackRule)(3) }}</template>
              </el-table-column>
              <el-table-column property="totalUnitGw" label="总毛重" min-width="120">
                <template slot-scope="scope">{{ fixedNumber(scope.row.totalUnitGw)(3) }}</template>
              </el-table-column>
              <el-table-column property="totalUnitNw" label="总净重" min-width="120">
                <template slot-scope="scope">{{ fixedNumber(scope.row.totalUnitNw)(3) }}</template>
              </el-table-column>
              <el-table-column property="totalXqty" label="总件数" min-width="120"/>
              <el-table-column property="boxPiNo" label="运费对应PI" min-width="120"/>
              <el-table-column property="amtFee1" label="海运费" min-width="120"/>
              <el-table-column property="amtFee2" label="保险费" min-width="120"/>
              <el-table-column property="boxRemark" label="排柜标识" min-width="120"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="拖柜计划">
            <el-table :data="getContainerProjectList">
              <el-table-column property="boxRemark" label="经营单位" min-width="100">
                <template slot-scope="scope">{{ scope.row.entId | OperaUnitFilter }}</template>
              </el-table-column>
              <el-table-column property="warnNo" label="出货预告" min-width="180"/>
              <el-table-column property="piNos" label="合同编号" min-width="120"/>
              <el-table-column property="transitName" label="货代协议" min-width="120"/>
              <el-table-column property="orgName" label="部门" min-width="120"/>
              <el-table-column property="salesUserId" label="业务员" min-width="120"/>
              <el-table-column property="singleDay" label="截单日" min-width="120"/>
              <el-table-column property="cutDate" label="截关日" min-width="120"/>
              <el-table-column property="towingDate" label="拖柜日期" min-width="120"/>
              <el-table-column property="dateAm" label="上午(08:00-12:00)" min-width="130">
                <template
                  slot-scope="scope"
                >{{ scope.row.dateAm === '1' ? '是' : scope.row.dateAm === '0' ? '否' : scope.row.dateAm }}</template>
              </el-table-column>
              <el-table-column property="datePm" label="下午(12:00-18:00)" min-width="130">
                <template
                  slot-scope="scope"
                >{{ scope.row.datePm === '1' ? '是' : scope.row.datePm === '0' ? '否' : scope.row.datePm }}</template>
              </el-table-column>
              <el-table-column property="dateEm" label="晚上(18:00-08:00)" min-width="130">
                <template
                  slot-scope="scope"
                >{{ scope.row.dateEm === '1' ? '是' : scope.row.dateEm === '0' ? '否' : scope.row.dateEm }}</template>
              </el-table-column>
              <el-table-column property="note" label="备注" min-width="200"/>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div style="margin:40px 0 0 10px">
          <el-steps style="margin-top:20px">
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step1">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step1">订舱</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step2">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step2">船期</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step3">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step3">放舱</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step4">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step4">排柜</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step5">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step5">装柜</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step6">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step6">进港</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step7">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step7">截单</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step8">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step8">预配</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step9">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step9">报关</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step10">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step10">查验</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step11">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step11">海关放行</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step12">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step12">码头放行</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step13">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step13">开船</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step14">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step14">指代费用已付</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
            <div
              data-v-4b28fce5
              class="el-step is-horizontal"
              style="flex-basis: 7.14286%; margin-right: 0px;"
            >
              <div :class="step15">
                <div class="el-step__line" style="margin-right: 0px;">
                  <i
                    class="el-step__line-inner"
                    style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                  />
                </div>
                <div class="el-step__icon is-icon">
                  <i class="el-step__icon-inner el-icon-circle-check"/>
                </div>
              </div>
              <div class="el-step__main">
                <div :class="step15">费用登记</div>
                <div class="el-step__description is-wait"/>
              </div>
            </div>
          </el-steps>
        </div>
      </el-form>
    </div>
    <el-dialog :visible.sync="rejectVisible" title="驳回">
      <el-input :rows="4" v-model="remark" type="textarea" placeholder="处理意见"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectVisible = false">取 消</el-button>
        <el-button type="primary" @click="rejectShipDate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import checkPermission from '@/utils/permission' // 权限判断函数
import shipCabinOrderServer from './../../../api/shipCabinOrderServer'
import processServer from './../../../api/processServer'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import OperaUnitEnumUtil from './../../enum/opera-unit/OperaUnitEnumUtil'
import TradeTypeUtil from './../../enum/ship-cabin-order/TradeTypeUtil'
import ContainerLoadUtil from './../../enum/container-load/ContainerLoadUtil'
import CustomsTradeTypeUtil from './../../enum/ship-cabin-order/CustomsTradeTypeUtil'
import ShipCabinOrderStatusEnumSelect from './../../../components/entity/ship-cabin-order/ShipCabinOrderStatusEnumSelect'
import ShipCabinOrderLogStatusEnumSelect from './../../../components/entity/ship-cabin-order/ShipCabinOrderLogStatusEnumSelect'
import ShipCabinOrderPayStyleEnumSelect from './../../../components/entity/ship-cabin-order/ShipCabinOrderPayStyleEnumSelect'
import ShipCabinOrderShipTypeEnumSelect from './../../../components/entity/ship-cabin-order/ShipCabinOrderShipTypeEnumSelect'
import ShipCabinOrderWarnNoAttachment from './../../../components/entity/ship-cabin-order/ShipCabinOrderWarnNoAttachment'
import { all } from 'q';
import { getAccount } from '@/api/login'
const emptyFormData = {
  bookingNo: null,
  warnNo: null,
  contractNo: null,
  enquiryNo: null,
  status: null,
  payStyle: null,
  priceTypeName: null,
  shipType: null,
  orgName: null,
  salesUserId: null,
  prover: null,
  custCode: null,
  custName: null,
  versionNum: null,
  warnBc: null,
  boxQty: null,
  totalXqty: null,
  totalAmt: null,
  totalQty: null,
  protFreeBox: null,
  protFreeDate: null,
  isExce: null,
  isAccident: null,
  dcNote: null,
  ygNote: null,
  note: null,
  consignorName: null,
  consignorAddress: null,
  consignorPhone: null,
  consignorFax: null,
  consignorEMail: null,
  consignorCompanyCode: null,
  consignorCountryCode: null,
  consignorAeoCode: null,
  consigneeName: null,
  consigneeAddress: null,
  consigneePhone: null,
  consigneeFax: null,
  consigneeEMail: null,
  consigneeCompanyCode: null,
  consigneeCompanyCodeName: null,
  consigneeCountryCode: null,
  consigneeAeoCode: null,
  particularConsigneeName: null,
  particularConsigneePhone: null,
  particularConsigneeFax: null,
  particularConsigneeEMail: null,
  noticeManName: null,
  noticeManAddress: null,
  noticeManPhone: null,
  noticeManFax: null,
  noticeManEMail: null,
  noticeManCompanyCode: null,
  noticeManCompanyCodeName: null,
  noticeManCountryCode: null,
  noticeManAeoCode: null,
  noticeMan: null,
  chestbill: null,
  bl: null,
  origin: null,
  tddf: null,
  haveFreePart: null,
  tdfd: null,
  preShipDate: null,
  seaportInName: null,
  seaportOutName: null,
  toAreaName: null,
  finalGoul: null,
  transitRelaName: null,
  transitPhone: null,
  transitEmail: null,
  relaman: null,
  phone: null,
  email: null,
  towCopName: null,
  pbrandName: null,
  shipName: null,
  saillings: null,
  billNo: null,
  departDate: null,
  cutDate: null,
  cutoffDate: null,
  customsBroker: null,
  isBg: null,
  isFc: null,
  exitCustomsName: null,
  tradePatterns: null,
  customerPort: null,
  xxxl: null,
  cwUser: null,
  cwTel: null,
  dzUser: null,
  dzTel: null,
  vesselCertificate: null,
  piNos: null,
  transitId: null,
  logisticsId: null,
  entId: null,
  actualBoxNos: null,
  emptyBoxWeight: null,
  seals: null
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'ShipCabinOrderEdit',
  components: {
    ShippingCompanySelect,
    OperateUnitSelect,
    ShipCabinOrderStatusEnumSelect,
    ShipCabinOrderLogStatusEnumSelect,
    ShipCabinOrderPayStyleEnumSelect,
    ShipCabinOrderShipTypeEnumSelect,
    ShipCabinOrderWarnNoAttachment
  },
  filters: {
    proType: val => {
      switch (val) {
        case 1:
          return '整机'
        case 2:
          return '内机'
        case 3:
          return '外机'
        case 4:
          return '配件'
        case 5:
          return '面板'
        case 6:
          return '外购件'
        default:
          return val
      }
    },
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
    tradeTypeFilter: TradeTypeUtil.toTitleFilter,
    CustomsTradeTypeFilter: CustomsTradeTypeUtil.toTitleFilter,
    ContainerLoadFilter: ContainerLoadUtil.toTitleFilter,
  },
  props: {
    id: {
      type: String | Number,
      default: null
    },
    processId: {
      type: String | Number
    }
  },

  data() {
    return {
      LCNO: '', // 明细行信用证号汇总，只显示，不用保存到服务器
      isDisabled_for_transit: false,
      loading: false,
      curProcessOrder: 0,
      isJudgeExport: false,
      isDisable: false,
      isFcJudge: false,
      isJd: true,
      disIsFc: true,
      isDisable1: false,
      isDisable2: false,
      isDisable3: false,
      isShipCompany: true, // 船公司是否为不可编辑
      orderRequirementActiveNames: ['1', '2', '3'],
      containerActiveNames: ['1', '2'],
      containerList: [],
      getContainerProjectList: [],
      remark: '',
      rejectVisible: false,
      formData: {
        ...initFormData
      },
      step1: 'el-step__head is-wait',
      step2: 'el-step__head is-wait',
      step3: 'el-step__head is-wait',
      step4: 'el-step__head is-wait',
      step5: 'el-step__head is-wait',
      step6: 'el-step__head is-wait',
      step7: 'el-step__head is-wait',
      step8: 'el-step__head is-wait',
      step9: 'el-step__head is-wait',
      step10: 'el-step__head is-wait',
      step11: 'el-step__head is-wait',
      step12: 'el-step__head is-wait',
      step13: 'el-step__head is-wait',
      step14: 'el-step__head is-wait',
      step15: 'el-step__head is-wait',
      rules: {
        bookingNo: [],
        warnNo: [],
        contractNo: [],
        enquiryNo: [],
        status: [],
        payStyle: [],
        priceTypeName: [],
        shipType: [],
        orgName: [],
        salesUserId: [],
        prover: [],
        custCode: [],
        custName: [],
        versionNum: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        warnBc: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
        boxQty: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
        totalXqty: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
        totalAmt: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
        totalQty: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
        protFreeBox: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        protFreeDate: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        // inPortDate: [
        //   { required: true, message: '不能为空', trigger: 'blur' }
        // ],
        // actualInPortDate: [
        //   { required: true, message: '不能为空', trigger: 'blur' }
        // ],
        // expectInPortDate: [
        //   { required: true, message: '不能为空', trigger: 'blur' }
        // ],
        // cutPortDate: [
        //   { required: true, message: '不能为空', trigger: 'blur' }
        // ],
        isExce: [],
        isAccident: [],
        dcNote: [],
        ygNote: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        note: [],
        consignorName: [],
        consignorAddress: [],
        consignorPhone: [],
        consignorFax: [],
        consignorEMail: [],
        consignorCompanyCode: [],
        consignorCountryCode: [],
        consignorAeoCode: [],
        consigneeName: [],
        consigneeAddress: [],
        consigneePhone: [],
        consigneeFax: [],
        consigneeEMail: [],
        consigneeCompanyCode: [],
        consigneeCompanyCodeName: [],
        consigneeCountryCode: [],
        consigneeAeoCode: [],
        particularConsigneeName: [],
        particularConsigneePhone: [],
        particularConsigneeFax: [],
        particularConsigneeEMail: [],
        noticeManName: [],
        noticeManAddress: [],
        noticeManPhone: [],
        noticeManFax: [],
        noticeManEMail: [],
        noticeManCompanyCode: [],
        noticeManCompanyCodeName: [],
        noticeManCountryCode: [],
        noticeManAeoCode: [],
        noticeMan: [],
        chestbill: [],
        bl: [],
        origin: [],
        tddf: [],
        haveFreePart: [],
        tdfd: [],
        preShipDate: [],
        seaportInName: [],
        seaportOutName: [],
        toAreaName: [],
        finalGoul: [],
        transitRelaName: [],
        transitPhone: [],
        transitEmail: [],
        relaman: [],
        phone: [],
        email: [],
        towCopName: [],
        pbrandName: [],
        actualBoxNos:[],
        emptyBoxWeight: [],
        seals:[],
        shipName: [],
        saillings: [],
        billNo: [],
        departDate: [],
        cutDate: [],
        cutoffDate: [],
        customsBroker: [],
        isBg: [],
        isFc: [],
        exitCustomsName: [],
        tradePatterns: [],
        customerPort: [],
        xxxl: [],
        cwUser: [],
        cwTel: [],
        dzUser: [],
        dzTel: [],
        vesselCertificate: [],
        piNos: [],
        transitId: [],
        logisticsId: [],
        entId: [],
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    },
    hasMalfunction() {
      return this.formData.isExce || this.formData.isAccident
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
    // hasMalfunction(val) {
    //   // 如果 异常票数 和 事故票数 全部关闭，那么“事故原因”就置空
    //   if (val === false) {
    //     this.formData.ygNote = ''
    //   }
    // }
  },
  async created() {
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
    fixedNumber(numberOrStr) {
      return function fixed(bit) {
        const baseTimes = Number.parseInt((1).toFixed(bit).replace(/\./, ''))
        const roundStringArr = Math.round(Number.parseFloat(numberOrStr) * baseTimes).toString().split('')

        // 补全类似 0.0001 这种小数类型，获取到的数列长度不正确引起的各种问题
        if (roundStringArr.length < bit) {
            let suffixTimes = bit - roundStringArr.length
            while (suffixTimes--) {
                roundStringArr.unshift(0)
            }
        }

        const res = []
        let loop = 0
        while (loop < roundStringArr.length) {
          if (loop === roundStringArr.length - bit) {
            res.push('.')
          }
          res.push(roundStringArr[loop])
          loop++
        }
        return Number.parseFloat(res.join(''))
      }
    },
    checkPermission,
    close() {
      this.$emit('close')
    },
    authController(input) {
      const ctrlMap = new Map()
      // ctrlMap.set('2_enquiryNo', true)
      ctrlMap.set('3_billNo', true)
      ctrlMap.set('3_departDate', true)
      ctrlMap.set('3_cutDate', true)
      ctrlMap.set('3_cutoffDate', true)

      ctrlMap.set('5_pbrandName', true)
      ctrlMap.set('5_shipName', true)
      ctrlMap.set('5_saillings', true)

      return !ctrlMap.get(this.curProcessOrder + '_' + input)
    },
    processStep0() {
      // this.isDisable = true
      // this.isDisable1 = true
      // this.isDisable2 = true
      // this.isDisable3 = true
      // console.log('流程开始')
      this.isDisabled_for_transit = false
    },
    processStep1() {
      // "确认货代"
      // this.isDisable = true
      // this.isDisable1 = true
      // this.isDisable2 = true
      // this.isDisable3 = true
      // console.log('确认货代')
      this.isDisabled_for_transit = false
    },
    processStep2() {
      // "船务操作员"
      this.isDisable = true
      this.isDisable1 = true
      this.isDisable2 = true
      this.isDisable3 = true
      this.isDisabled_for_transit = true
      // console.log('确认货代')
    },
    processStep3() {
      this.isDisable = true
      this.isJudgeExport = true
      this.isDisable1 = false
      this.isDisable2 = false
      this.isJd = false
      this.isDisable3 = true
      this.isDisabled_for_transit = true

      // isChange类型为4的时候，不需要做任何校验
      if (this.formData.isChange !== 4) {
        // "反馈船期"
        // 开船日期、截关日期、截单日期必填
        this.rules.departDate = [
          {
            trigger: 'blur',
            // message: '开船日期必须大于等于预计货好日期',
            validator: (rule, value, callback) => {
              if (
                (this.formData.departDate != null &&
                  this.formData.preShipDate != null) ||
                (this.formData.cutDate != null &&
                  this.formData.departDate != null)
              ) {
                if (
                  Date.parse(this.formData.departDate) <
                  Date.parse(this.formData.cutDate)
                ) {
                  return callback(new Error('"开船日期" 不能小于 "截关日期"'))
                }
              }
              callback()
            }
          }, {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
        this.rules.cutDate = [
          {
            trigger: 'blur',
            // message: '截关日期须小于开船日期',
            validator: (rule, value, callback) => {
              if (
                (this.formData.departDate != null &&
                this.formData.cutDate != null) || (
                this.formData.cutoffDate != null &&
                this.formData.cutDate != null
                )
              ) {
                if (
                  Date.parse(this.formData.departDate) <
                  Date.parse(this.formData.cutDate)
                ) {
                  return callback(new Error('截关日期须小于开船日期')) 
                  
                } else if ( 
                  Date.parse(this.formData.cutoffDate) > ((Date.parse(this.formData.cutDate) + (16 * 60 * 60 * 1000 - 1)))) {
                  return callback(new Error('截关日期须大于等于截单日期'))
                }
              }
              callback()
            }
          }, {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
        this.rules.cutoffDate = [
        {
          trigger: 'blur',
          message: '"截单日期" 不能大于 "截关日期"',
          validator: (rule, value, callback) => {
            if (
              this.formData.cutoffDate != null &&
              this.formData.cutDate != null
            ) {
              if (
                Date.parse(this.formData.cutoffDate) > ((Date.parse(this.formData.cutDate) + (16 * 60 * 60 * 1000 - 1)))
              ) {
                callback(new Error('"截单日期" 不能大于 "截关日期"'))
                return
              }
            }
            callback()
          }
        }]
      }
    },
    processStep4() {
      this.isDisable = true
      this.isJudgeExport = false
      this.isDisable1 = false
      this.isDisable2 = true
      this.isJd = true
      this.isDisable3 = true
      this.isDisabled_for_transit = true
      // isChange类型为4的时候，不需要做任何校验
      if (this.formData.isChange !== 4) {
        // "船期确认"
        this.rules.departDate=[
        {
          trigger: 'blur',
          // message: '开船日期必须大于等于预计货好日期',
          validator: (rule, value, callback) => {
            if (
              (this.formData.departDate != null &&
                this.formData.preShipDate != null) ||
              (this.formData.cutDate != null &&
                this.formData.departDate != null)
            ) {
              if (
                Date.parse(this.formData.departDate) <
                Date.parse(this.formData.cutDate)
              ) {
                return callback(new Error('"开船日期" 不能小于 "截关日期"'))
              }
            }
            callback()
          }
        }, {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }
      ]
        this.rules.cutDate = [
        {
          trigger: 'blur',
          // message: '截关日期须晚于开船日期',
          validator: (rule, value, callback) => {
            if (
              (this.formData.departDate != null &&
              this.formData.cutDate != null) || (
              this.formData.cutoffDate != null &&
              this.formData.cutDate != null
              )
            ) {
              if (
                Date.parse(this.formData.departDate) <
                Date.parse(this.formData.cutDate)
              ) {
                return callback(new Error('截关日期须小于开船日期')) 
                
              } else if ( 
                Date.parse(this.formData.cutoffDate) > ((Date.parse(this.formData.cutDate)) + (16 * 60 * 60 * 1000 - 1))) {
                return callback(new Error('截关日期须大于等于截单日期'))
              }
            }
            callback()
          }
        }, {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }
      ]
      }
    },
    processStep5() {
      this.isDisable = true
      this.isDisable1 = true
      this.isDisable2 = true
      this.isDisable3 = true
      this.isDisabled_for_transit = true
    },
    processStep6() {
      // "放舱"
      // 订舱品名、船名、船次必填      
      this.isJd = false
      this.disIsFc = false
      this.isDisable = true
      this.isDisable1 = true
      this.isDisable2 = false
      this.isDisable3 = true
      this.isShipCompany = false
      this.isDisabled_for_transit = true
      
      // isChange类型为4的时候，不需要做任何校验
      if (this.formData.isChange !== 4) {
        this.rules.cutoffDate = this.rules.shipName = this.rules.saillings = this.rules.billNo = this.rules.towCopName = {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
        this.rules.isFc = {
        required: true
      }
      }
      this.isFcJudge = true
    },
    processStep7() {
      this.disIsFc = true
      this.isFcJudge = false
      this.isDisable = true
      this.isDisable1 = true
      this.isDisable2 = true
      this.isDisable3 = false
      this.isShipCompany = true
      this.isDisabled_for_transit = true
      
      // isChange类型为4的时候，不需要做任何校验
      if (this.formData.isChange !== 4) {
        // "订舱完成（流程结束）"
        // "箱号" "formData.actualBoxNos"
        // "空箱重量" "formData.emptyBoxWeight"
        // "封号" "formData.seals"
        this.rules.actualBoxNos =
        this.rules.emptyBoxWeight =
        this.rules.seals = {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
      }
    },
    shareProcessInfo({ info }) {
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
            this[eventName] && this[eventName](info)
          }
        })
      }
    },
    async newStartProcess() {
      // await this.getData()
      return new Promise(async (resolve, reject) => { 
        // 如果 this.formData.isChange 类型为 4，就不需要任何校验
        if (this.formData.isChange !== 4) {
          if (Date.parse(this.formData.cutDate) <= Date.parse(this.formData.preShipDate)) {
            this.$message({
              message: '"截关日期" 不能小于 "预计货好日期"',
              type: 'warning'
            })  
            return reject()
          }
          if (this.curProcessOrder && this.curProcessOrder >= 1 && !this.formData.transitId) {
            if ([1, 3, 5, 6].indexOf(this.formData.shipType) === -1) {
              this.$message({
                message: '请先选择船务信息 - 协议货代',
                type: 'warning'
              })
              return reject()
            }
          } 
        }
        //发运方式为  1、BY TRAIN    5、BYTRUCK BY   3、出差专用   6、 BY EXPRESS 且不需要报关的, 直接不走流程，订舱状态变成 '订舱完成' 
        if (this.formData.shipType === 3 || this.formData.shipType === 6 || this.formData.shipType === 1 || this.formData.shipType === 5) {
          this.formData.status = 7
          await this.saveBeforeStart()
          this.$message({
            message: '订舱完成！',
            type: 'success',
            duration: 3000
          })
          await this.getData()
          this.$emit('emitEvent', {
            key: 'changeProcessButton',
            params: {
              buttons:
              {
                key: 'end',
                name: ''
              }
            }
          })
          reject()
        } else {
          await this.saveBeforeStart()
          await this.getData()
          resolve()
        }
      })
    },
    async saveBeforeStart() {
      return new Promise(async (resolve, reject) => {

        // 如果 this.formData.isChange 类型为 4，就不需要任何校验
        if (this.formData.isChange !== 4) {
          if (Date.parse(this.formData.cutDate) <= Date.parse(this.formData.preShipDate)) {
            this.$message({
              message: '"截关日期" 不能小于 "预计货好日期"',
              type: 'warning'
            })  
            return reject()
          }
          if (this.isFcJudge === true) {
            if (this.formData.isFc === false) {
              this.$message({
                message: '当前节点需放舱才可同意！',
                type: 'warning'
              })
              return reject()
            }
          }
        }
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            try {
              const listCopy = JSON.parse(JSON.stringify(this.formData))
              const res = await shipCabinOrderServer.put(listCopy)
              if (Number.parseInt(res.data.code) === 200) {
                initFormData = { ...this.formData }
                resolve()
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
    judgelogist(data) {
      // 物流状态的亮灯判断
      if (data.exportOrderDate !== '' && data.exportOrderDate !== null) {
        this.step1 = 'el-step__head is-success'
      }
      if (data.departDate !== '' && data.departDate !== null) {
        this.step2 = 'el-step__head is-success'
      }
      if (data.isFc === 2) {
        this.step3 = 'el-step__head is-success'
      }
      if (data.isRow === 2) {
        this.step4 = 'el-step__head is-success'
      }
      if (data.isQty === 2) {
        this.step5 = 'el-step__head is-success'
      }
      if (data.isInPort === 2) {
        this.step6 = 'el-step__head is-success'
      }
      if (data.isCutoffDate === 2) {
        this.step7 = 'el-step__head is-success'
      }
      if (data.premft === 2) {
        this.step8 = 'el-step__head is-success'
      }
      if (data.isCd === 2) {
        this.step9 = 'el-step__head is-success'
      }
      if (data.cusmov === 2) {
        this.step10 = 'el-step__head is-success'
      }
      if (data.cuspass === 2) {
        this.step11 = 'el-step__head is-success'
      }
      if (data.dockpass === 2) {
        this.step12 = 'el-step__head is-success'
      }
      if (data.berth === 2) {
        this.step13 = 'el-step__head is-success'
      }
      if (data.isPay1 === 2) {
        this.step14 = 'el-step__head is-success'
      }
      if (data.isPay === 2) {
        this.step15 = 'el-step__head is-success'
      }
    },
    async getData() {
      this.loading = true
      const res = await shipCabinOrderServer.get(this.id)
      initFormData = res.data
      const containerList = res.data.boxLineListJosn
      const lineListJson = res.data.lineListJson
      this.LCNO = this.spillLCNO(lineListJson)
      containerList.forEach(container => {
        container.countTotalGw = 0
        container.countTotalNw = 0
        container.countTotalTj = 0
        container.countPackStyle = 0
        container.lineList = []
        lineListJson.forEach(item => {
          if (item.refBoxNo === container.refBoxNo) {
            container.countTotalGw += (item.pTotalGw || 0) * 1
            container.countTotalNw += (item.pTotalNw || 0) * 1
            container.countTotalTj += (item.pTotalTj || 0) * 1
            container.countPackStyle += (item.packStyle || 0) * 1
            container.lineList.push(item)
          }
        })
      })
      this.formData = {
        ...res.data.warnInfo
      }
      if (this.formData.status === 7 || this.formData.status === 8) {
        this.isDisable = true
        this.isDisable1 = true
        this.isDisable2 = true
        this.isDisable3 = true
      }
      this.formData.isBg = this.formData.isBg === 2
      this.formData.isFc = this.formData.isFc === 2
      this.formData.isExce = this.formData.isExce === 2
      this.formData.isAccident = this.formData.isAccident === 2
      this.formData.haveFreePart = this.formData.haveFreePart === 2
      this.formData.chestbill = this.formData.chestbill === '2'
      this.formData.bl = this.formData.bl === '2'
      this.formData.origin = this.formData.origin === '2'
      this.formData.tddf = this.formData.tddf === '2'
      this.formData.tdfd = this.formData.tdfd === '2'
      const judgelogistList = {
        ...res.data.warnInfo
      }
      this.judgelogist(judgelogistList)
      this.containerList = containerList
      this.containerList.forEach((item, index) => {
        this.$set(this.containerList, index, item)
      })
      this.loading = false
      let userTypeTo = null
      await getAccount().then(response => {
        userTypeTo = response.data.data.userType
      })
      const getContainerProjectRes = await shipCabinOrderServer.getContainerProject(
        res.data.warnInfo.warnNo, userTypeTo
      )
      if (getContainerProjectRes.data) {
        this.getContainerProjectList = getContainerProjectRes.data
      } else {
        this.getContainerProjectList = []
      }
      this.getContainerProjectList.forEach((item, index) => {
        this.$set(this.getContainerProjectList, index, item)
      })
      //发运方式为  1、BY TRAIN    5、BYTRUCK BY   3、出差专用   6、 BY EXPRESS 且不需要报关的, 直接不走流程，订舱状态变成 '订舱完成' 
      if ((this.formData.shipType === 3 || this.formData.shipType === 6 || this.formData.shipType === 5 || this.formData.shipType === 1) && this.formData.status === 7) {
        this.$emit('emitEvent', {
          key: 'changeProcessButton',
          params: {
            buttons:
            {
              key: 'end',
              name: ''
            }
          }
        })
      }
      // 若订舱单作废则不显示顶部按钮
      if (this.formData.status === 8) {
        this.$emit('emitEvent', {
          key: 'changeProcessButton2',
          params: {
            buttons:
            {
              key: 'abort',
              name: ''
            }
          }
        })
        this.$emit('isDisableButton', true)
      }
      if (this.formData.status >= 2 && this.formData.status <= 7) {
        // 有船期
        this.$emit('changeManifestDisabled', false)
      } else {
        // 无船期
        this.$emit('changeManifestDisabled', true)
      }
      if (this.formData.status === 8) {
        this.isDisable = true
        this.isDisable1 = true
        this.isDisable2 = true
        this.isDisable3 = true
      }
    },
    // async saveForStep() {
    //   return new Promise((resolve, reject) => {
    //     if (Date.parse(this.formData.cutDate) <= Date.parse(this.formData.preShipDate)) {
    //       this.$message({
    //         message: '截关日期 必须大于 预计货好日期',
    //         type: 'warning'
    //       })  
    //       return reject()
    //     }
    //     if (this.isFcJudge === true) {
    //       if (this.formData.isFc === false) {
    //         this.$message({
    //           message: '当前节点需放舱才可同意！',
    //           type: 'warning'
    //         })
    //         return reject()
    //       }
    //     }
    //     const listCopy = JSON.parse(JSON.stringify(this.formData))
    //     this.$refs['formData'].validate(async valid => {
    //       if (valid) {
    //         this.loading = true
    //         try {
    //           if (this.formData.id) {
    //             await shipCabinOrderServer.put(listCopy)
    //           } else {
    //             const res = await shipCabinOrderServer.post(listCopy)
    //             this.formData.id = res.data.id
    //           }
    //           initFormData = {
    //             ...this.formData
    //           }
    //           resolve({
    //             ...this.formData
    //           })
    //         } catch (e) {
    //           this.loading = false
    //           reject(e)
    //         }
    //       } else {
    //         this.$message({
    //           message: '请确认所有必填字段',
    //           type: 'warning'
    //         })
    //         reject('error submit!!')
    //       }
    //     })
    //   })
    // },
    spillLCNO(lines) {
      const lcNos = []
      lines.forEach((line) => {
        if (lcNos.indexOf(line.lcNo) === -1) {
          lcNos.push(line.lcNo)
        }
      })
      return lcNos.join(',')
    },
    async save() {
      return new Promise((resolve, reject) => {
        const listCopy = JSON.parse(JSON.stringify(this.formData))
        // 如果 this.formData.isChange 类型为 4，就不需要任何校验
        if (this.formData.isChange !== 4) {
          if (this.isFcJudge === true) {
            if (this.formData.isFc === false) {
              this.$message({
                message: '当前节点需放舱才可保存！',
                type: 'warning'
              })
              return reject()
            }
          }
          if (Date.parse(this.formData.cutDate) <= Date.parse(this.formData.preShipDate)) {
            this.$message({
              message: '"截关日期" 必须大于 "预计货好日期"',
              type: 'warning'
            })  
            return reject()
          }
          
          if (this.formData.cutoffDate && this.formData.cutDate && Date.parse(this.formData.cutoffDate) > ((Date.parse(this.formData.cutDate) + (16 * 60 * 60 * 1000 - 1)))) {
            this.$message({
              message: '"截单日期" 不能大于 "截关日期"',
              type: 'warning'
            })  
            return reject()
          }
        }
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            this.loading = true
            try {
              if (this.formData.id) {
                await shipCabinOrderServer.put(listCopy)
              } else {
                const res = await shipCabinOrderServer.post(listCopy)
                this.formData.id = res.data.id
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
            } catch (e) {
              this.loading = false
              reject(e)
            }
          } else {
            this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            reject('error submit!!')
          }
        })
      })
    },
    resetData() {
      // this.formData = {
      //   ...initFormData
      // }
      this.containerList = []
      this.getContainerProjectList = []
      this.getData()
    },
    changeTransit(data) {
      if (data) {
        if (data.supplierCode) {
          this.formData.transitCode = data.supplierCode
        }
        this.formData.customsBroker = data.customsLine
        this.formData.transitName = data.supplierName
        this.formData.transitRelaName = data.relaman
        this.formData.transitPhone = data.phone
        this.formData.transitEmail = data.email
      } else {        
        this.formData.transitCode = ''
        this.formData.customsBroker = ''
        this.formData.transitName = ''
        this.formData.transitRelaName = ''
        this.formData.transitPhone = ''
        this.formData.transitEmail = ''
      }
    },
    changeLogistics(data) {
      if (data) {
        this.formData.logisticsCode = data.supplierCode
        this.formData.logisticsName = data.supplierName
        this.formData.relaman = data.relaman
        this.formData.phone = data.phone
        this.formData.email = data.email
      } else {
        this.formData.logisticsCode = ''
        this.formData.logisticsName = ''
        this.formData.relaman = ''
        this.formData.phone = ''
        this.formData.email = ''
      }
    },

    // 同意按钮功能的验证
    async valiAgreeProcess() {
      // await this.getData()
      return new Promise(async (s, j) => {
        // 如果 this.formData.isChange 类型为 4，就不需要任何校验
        if (this.formData.isChange !== 4) {
          if (Date.parse(this.formData.cutDate) <= Date.parse(this.formData.preShipDate)) {
            this.$message({
              message: '截关日期 必须大于 预计货好日期',
              type: 'warning'
            })  
            return j()
          } else if (this.formData.exportOrderDate === null || this.formData.exportOrderDate === '') {
            if (this.isJudgeExport === true) {
              this.$message({
                message: '当前节点需导出托单！',
                type: 'warning'
              })
              return j()
            }
            this.loading = false
          } 
          let markSign = ''
          let tips = ''
          const tipsMap = {
            billNo: '提单号',
            departDate: '开船日期',
            cutDate: '截关日期',
            cutoffDate: '截单日期',
            preShipDate: '预计货好日期',
            pbrandName: '订舱品名',
            shipName: '船名',
            saillings: '船次'
          }
          // 船期反馈
          // 提单号、开船日期、截关日期、截单日期必填
          if (this.curProcessOrder === 3) {
            // if (!this.formData.billNo) {
            //   markSign = tipsMap['billNo']
            // }
            // if (!this.formData.cutoffDate) {
            //   markSign = tipsMap['cutoffDate']
            // }
            if (
              this.formData.cutoffDate &&
              this.formData.cutDate &&
              Date.parse(this.formData.cutoffDate) > ((Date.parse(this.formData.cutDate) + (16 * 60 * 60 * 1000 - 1)))
            ) {
              markSign = '"截单日期"不能大于"截关日期"'
            }
            if (!this.formData.departDate) {
              markSign = tipsMap['departDate']
            }
            if (!this.formData.cutDate) {
              markSign = tipsMap['cutDate']
            }
          }

          // "放舱"
          // 截单日期必填
          if (this.curProcessOrder === 6) {
          //   if (!this.formData.pbrandName) {
          //     markSign = tipsMap['pbrandName']
          //   }
          //   if (!this.formData.billNo) {
          //     markSign = tipsMap['billNo']
          //   }
          //   if (!this.formData.shipName) {
          //     markSign = tipsMap['shipName']
          //   }
          //   if (!this.formData.saillings) {
          //     markSign = tipsMap['saillings']
          //   }
            if (!this.formData.cutoffDate) {
              markSign = tipsMap['cutoffDate']
            }
            if (Date.parse(this.formData.cutoffDate) > ((Date.parse(this.formData.cutDate) + (16 * 60 * 60 * 1000 - 1)))) {
              markSign = '"截单日期"不能大于"截关日期"'
            }
          }
          if (markSign.length) {
            this.$message({
              message: '请先选择 ' + markSign,
              type: 'warning'
            })
            return j()
          } else {
            return s(await this.saveBeforeStart())
          }
        
        } else {
          return s()
        }
      })
    },
    async emitEvent({ key, params }) {
      switch (key) {
        case 'saveFormData':
          this.save()
          break
        case 'update':
          this.getData()
          break
        case 'resetData':
          this.resetData()
          break
        case 'startProcess':
          return this.newStartProcess()
        case 'agreeProcess':
          return this.valiAgreeProcess()
        default:
          // resetData
          // cancelOrder
          // changeOrder
          // confirmShipDate
          // changeShipDate
          // returnShipDate
          // releaseShippingSpac
          // bookingComplete
          // createBillOfLayding
          // changeShipCabin
          // doExport
          this[key] && this[key](params)
          break
      }
    },
    async confirmShipDate() {
      this.loading = true
      if (this.formData.cutDate != null && this.formData.cutoffDate != null) {
        try {
          const res = await shipCabinOrderServer.confirmShipDate({
            bookingId: this.formData.id,
            status: 2,
            shipStatus: 2,
            preShipDate: this.formData.preShipDate,
            cutoffDate: this.formData.cutoffDate
          })
          if (res.data.code !== 200) {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
            return
          }
          this.$message({
            message: '确认船期成功',
            type: 'success'
          })
          this.getData()
        } finally {
          this.loading = false
        }
      } else {
        this.$message({
          message: '请完整填写截关日期和截单日期',
          type: 'warning'
        })
        this.loading = false
      }
    },
    async rejectShipDate() {
      this.loading = true
      try {
        if (!this.remark) {
          this.$message({
            message: '请填写驳回理由',
            type: 'warning'
          })
        } else {
          const res = await shipCabinOrderServer.confirmShipDate({
            bookingId: this.formData.id,
            status: 3,
            dismissReason: this.remark
          })
          if (res.data.code !== 200) {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
            return
          }
          this.$message({
            message: '成功驳回',
            type: 'success'
          })
          this.getData()
        }
      } finally {
        this.loading = false
      }
    },
    openRejectShipDateBox() {
      this.remark = ''
      this.rejectVisible = true
    },
    async submitOrder() {
      if (this.step3 === 'el-step__head is-success' && this.step4 === 'el-step__head is-success') {
        this.loading = true
        try {
          const res = await shipCabinOrderServer.confirmShipDate({
            bookingId: this.formData.id,
            status: 1
          })
          if (res.data.code !== 200) {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
            return
          }
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.getData()
        } finally {
          this.loading = false
        }
      } else {
        this.$message({
          message: '订舱状态已放舱或已排柜未完成',
          type: 'warning'
        })
      }

    },
    async changeOrder() {
      this.loading = true
      try {
        const res = await shipCabinOrderServer.confirmShipDate({
          bookingId: this.formData.id,
          status: 1
        })
        if (res.data.code !== 200) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
          return
        }
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.getData()
      } finally {
        this.loading = false
      }
    },
    async changeShipDate() {
      this.loading = true
      try {
        const res = await shipCabinOrderServer.confirmShipDate({
          bookingId: this.formData.id,
          status: 2,
          shipStatus: 4
        })
        if (res.data.code !== 200) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
          return
        }
        this.$message({
          message: '变更船期成功',
          type: 'success'
        })
        this.getData()
      } finally {
        this.loading = false
      }
    },
    async returnShipDate() {
      this.loading = true
      try {
        const res = await shipCabinOrderServer.confirmShipDate({
          bookingId: this.formData.id,
          shipStatus: 5,
          saillings: this.formData.saillings,
          shipName: this.formData.shipName,
          billNo: this.formData.billNo,
          preShipDate: this.formData.preShipDate,
          departDate: this.formData.departDate,
          cutDate: this.formData.cutDate,
          cutoffDate: this.formData.cutoffDate,
          pbrandName: this.formData.pbrandName
        })
        if (res.data.code !== 200) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
          return
        }
        this.$message({
          message: '船期反馈成功',
          type: 'success'
        })
        this.getData()
      } finally {
        this.loading = false
      }
    },
    async releaseShippingSpace() {
      this.loading = true
      try {
        const res = await shipCabinOrderServer.confirmShipDate({
          bookingId: this.formData.id,
          status: 3,
          shipStatus: 2,
          saillings: this.formData.saillings,
          shipName: this.formData.shipName,
          pbrandName: this.formData.pbrandName
        })
        if (res.data.code !== 200) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
          return
        }
        this.$message({
          message: '放舱成功',
          type: 'success'
        })
        this.getData()
      } finally {
        this.loading = false
      }
    },
    async bookingComplete() {
      this.loading = true
      try {
        const res = await shipCabinOrderServer.confirmShipDate({
          bookingId: this.formData.id,
          status: 7
        })
        if (res.data.code !== 200) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
          return
        }
        this.$message({
          message: '订舱完成',
          type: 'success'
        })
        this.getData()
      } finally {
        this.loading = false
      }
    },
    async changeShipCabin() {
      this.loading = true
      this.$confirm('订舱单是否变更？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(async() => {
          try {
            const res = await shipCabinOrderServer.changeOrder({
              bookingId: this.formData.id,
              warnId: this.formData.warnId,
              versionNum: this.formData.versionNum
            })
            this.$message({
              message: '变更成功',
              type: 'success'
            })
            this.$router.push({
              path:
                '../../ship-cabin-order-change/detail/' + res.data.data.bookingId
            })
          } finally {
            this.loading = false
          }
        })
         .catch(() => {
          // 不同意保存，断开流程
          this.loading = false
        }) 
    },
    async walkthroughArkUpdate() {
      this.loading = true
      try {
        const res = await shipCabinOrderServer.updateWalkthroughArk(
          this.formData.warnId
        )
        if (Number.parseInt(res.code) === 200) {
          this.$message({
            message: '订舱单预排柜部分数据更新成功',
            type: 'success'
          })
        }
      } finally {
        await this.getData()
        this.loading = false
      }
    },
    async synchronizeLogisticsStatus() {
      if (this.formData.billNo !== null && this.formData.billNo !== '') {
        this.loading = true
        try {
          const res = await shipCabinOrderServer.synchronizeLogisticsStatus(
            this.formData.billNo
          )
          if (Number.parseInt(res.code) === 200) {
            this.$message({
              message: '订舱单物流状态数据同步成功',
              type: 'success'
            })
          }
        } finally {
          this.getData()
          this.loading = false
        }
      } else {
        this.$message({
          message: '当前页面船务信息的提单号为空，无法同步物流状态',
          type: 'warning'
        })
      }
    },
    async saveCollectFees() {
      this.loading = true
      try {
        const entid = this.$store.getters.entid
        const res = await shipCabinOrderServer.saveCollectFees(
          this.formData.id,
          entid,
          this.formData.warnId
        )
        // const res = await shipCabinOrderServer.saveCollectFees(this.formData.id, entid)
        if (Number.parseInt(res.code) === 200) {
          this.$message({
            message: '订舱单预排柜部分数据更新成功',
            type: 'success'
          })
        }
      } finally {
        this.loading = false
      }
    },
    async createBillOfLayding() {
      // （1）订舱单的运费付款方式为FREIGHT COLLECT、THIRD-PARTY PAYMENT同时判断船务信息得“指代货代” “船公司”是否有值，满足条件，则可生成提单，不满足提示：指定货代无法生成提单！！！
      // （2）判断运费付款方式为FREIGHT PREPAID、APPOINTED FREIGHT PREPAID直接可生成提单
      // FREIGHT PREPAID   1
      // APPOINTED FREIGHT PREPAID   4
      // FREIGHT COLLECT   2
      // THIRD-PARTY PAYMENT  3
      if((Number.parseInt(this.formData.payStyle) === 2 || Number.parseInt(this.formData.payStyle) === 3) && 
      (!this.formData.towCopName || !this.formData.transitId)) {
        this.$message({
          message: '指代无法生成提单',
          type: 'warning'
        })
        return
      }

      this.loading = true
      try {
        const id = this.formData.id
        const res = await shipCabinOrderServer.createBillOfLayding(id)
        if (res.data.code !== 200) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          this.$message({
            message: '生成提单成功',
            type: 'success'
          })
        }
      } finally {
        this.loading = false
      }
    },
    async doExport(val) {
      if (val === 1) {
        let returnUrl = null
        const res = await shipCabinOrderServer.supportList({
          bookingId: this.formData.bookingId,
          bookingNo: this.formData.bookingNo,
          transitName: this.formData.transitName,
          warnId: this.formData.warnId,
        })
        if (this.isJudgeExport === true && (this.formData.exportOrderDate === null || this.formData.exportOrderDate === '')) {
          await this.getData() 
        }
        returnUrl = res.data.data.downUrl
        window.open(returnUrl, '_blank')
      }
      if (val === 2) {
        let returnUrl = null
        const res = await shipCabinOrderServer.supportList2({
          type: 2,
          warnId: this.formData.warnId,
        })
        returnUrl = res.data.data.downUrl
        window.open(returnUrl, '_blank')
      }
      if (val === 3) {
        let returnUrl = null
        const res = await shipCabinOrderServer.supportList2({
          type: 1,
          warnId: this.formData.warnId,
        })
        returnUrl = res.data.data.downUrl
        window.open(returnUrl, '_blank')
      }
      if (val === 4) {
        let returnUrl = null
        const res = await shipCabinOrderServer.supportList2({
          type: 3,
          warnId: this.formData.warnId,
        })
        returnUrl = res.data.data.downUrl
        window.open(returnUrl, '_blank')
      }
      if (val === 5) {
        if ([1, 3, 5, 6].indexOf(this.formData.shipType) !== -1) {
          this.$message({
            message: '订舱单发运方式为铁路、卡车、自提(出差专用)、快递，无法导出舱单！',
            type: 'warning'
          })
          return
        }
        window.open(
          encodeURI(
            '/auxhome/sdp/api/1.0.0/exportExcel/doExport?data=' +
            JSON.stringify({
              methodName: 'creatExcelOfNewCabinBill',
              bookingId: this.formData.bookingId,
              token: window.localStorage.token
            })
          )
        )
      }
      if (val === 6) {
        let returnUrl = null
        const res = await shipCabinOrderServer.supportList2({
          type: 4,
          warnId: this.formData.warnId,
        })
        returnUrl = res.data.data.downUrl
        
        window.open(returnUrl, '_blank')
        // window.open(
        //   encodeURI(
        //     '/auxhome/sdp/api/1.0.0/exportExcel/doExport?data=' +
        //     JSON.stringify({
        //       methodName: 'creatExcelOfGoodsNotification',
        //       type: 4,
        //       warnId: this.formData.warnId,
        //       token: window.localStorage.token
        //     })
        //   )
        // )
      }
      if (val === 7) {
        window.open(
          encodeURI(
            '/auxhome/sdp/api/1.0.0/exportExcel/doExport?data=' +
            JSON.stringify({
              methodName: 'costStandardExcelExport',
              logisticsId: this.formData.logisticsId,
              token: window.localStorage.token
            })
          )
        )
      }
      // async doExport() {
      //   window.open(
      //     encodeURI(
      //       '/auxhome/sdp/api/1.0.0/exportExcel/doExport?data=' +
      //         JSON.stringify({
      //           methodName: 'getExcelCellInfo',
      //           bookingId: this.formData.id,
      //           warnId: this.formData.warnId,
      //           token: window.localStorage.token
      //         })
      //     )
      //   )
      // this.loading = true
      // try {
      //   const res = await shipCabinOrderServer.doExport({
      //     methodName: 'getExcelCellInfo',
      //     bookingId: this.formData.bookingId,
      //     warnId: this.formData.warnId
      //   })
      //
      // } finally {
      //   this.loading = false
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item {
  width: 100%;
  margin-right: 0;
}
.el-input-number {
  width: 100%;
}
</style>
