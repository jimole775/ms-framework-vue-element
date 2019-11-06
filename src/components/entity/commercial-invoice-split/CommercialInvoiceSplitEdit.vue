<template>
  <div class="max-w back">
    <div class="btn-group">
      <el-button
        v-if="formData.stat !== 5"
        :loading="loading" 
        type="primary"
        icon="el-icon-check"
        size="mini"
        @click="save"
      >保存</el-button>
      <el-button
        v-if="formData.invoiceNo"
        v-show="formData.stat !== 5"
        icon="el-icon-refresh"
        size="mini"
        @click="refresh"
      >重置</el-button>
      <el-button
        v-if="formData.invoiceNo"
        v-show="formData.stat !== 5"
        :loading="loading"
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="del"
      >删除</el-button>
      <el-button
        v-if="formData.stat !== 5"
        :loading="loading"
        type="primary"
        size="mini"
        icon="el-icon-check"
        @click="submit"
      >提交</el-button>

      <el-select v-model="downExcel" class="down-excel" placeholder="导出" size="mini" style="max-width:4rem" @change="doExport">
        <el-option :key="'本地'" :value="1" :label="'按单打印'"/>
        <el-option :key="'异地'" :value="2" :label="'按柜打印'"/>
      </el-select>

      <template>
        <el-radio v-model="radio" label="cbx1" @change="change">非中转</el-radio>
        <el-radio v-model="radio" label="cbx2" @change="change">中转</el-radio>
      </template>

      <template>
        <el-radio v-model="radio1" label="cbx4" @change="change1">按分体机</el-radio>
        <el-radio v-model="radio1" label="cbx3" @change="change1">按整机</el-radio>
      </template>

      <template>
        <el-checkbox-group v-model="checkList" size="mini" @change="changeCheckbox">
          <el-checkbox label="cbx5">TT</el-checkbox>
          <el-checkbox label="cbx6">LC,OA,DA,DP</el-checkbox>
          <el-checkbox label="chk1">按收货人</el-checkbox>
        </el-checkbox-group>
      </template>
    </div>

    <el-form
      :model="formData"
      :ref="'formData'"
      :rules="rules"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="整体信息" name="first">
          <div class="container m-t-not">
            <el-row>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发票流水号" prop="invoiceNo">
                  <el-input v-model="formData.invoiceNo" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="销售部门" prop="orgName">
                  <el-input v-model="formData.orgName" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="制单人" prop="createUser">
                  <el-input v-model="formData.createUser" disabled size="mini"/>
                </el-form-item>
              </el-col>

              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="单据状态" prop="statName">
                  <CommercialInvoiceStatusEnumSelect
                    v-model="formData.stat"
                    :disabled="true"
                    type="clearable"
                  />
                </el-form-item>
              </el-col>

              <el-col :lg="18" :md="24" :sm="24" :xs="24">
                <el-form-item label="拆分流水号" prop="oldInvoiceNos">
                  <el-input :clear="true" v-model="formData.oldInvoiceNos" :disabled="formData.stat === 5" size="mini" @focus="oldInvoiceNoShow = true"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="制单时间" prop="createDate">
                  <el-input v-model="formData.createDate" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="18" :md="24" :sm="24" :xs="24">
                <el-form-item label="拆分发票号" prop="oldFactNos">
                  <el-input v-model="formData.oldFactNos" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="业务员" prop="salesUserId">
                  <el-input v-model="formData.salesUserId" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="18" :md="24" :sm="24" :xs="24">
                <el-form-item label="通知单号" prop="noticeNos">
                  <el-input v-model="formData.noticeNos" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="PI号" prop="piNo">
                  <el-input v-model="formData.piNo" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="会计期间" prop="dname">
                  <el-input v-model="formData.dname" disabled size="mini"/>
                </el-form-item>
              </el-col>

              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="合同号" prop="pinoNew">
                  <el-input v-model="formData.pinoNew" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="贸易类型" prop="saleEntType">
                  <CommercialInvoiceSplitTradeTypeEnumSelect
                    v-model="formData.saleEntType"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发运方式" prop="shipType">
                  <ShipTypeEnumSelect v-model="formData.shipType" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="客户" prop="custCode">
                  <el-input v-model="formData.custCode" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="信用证号" prop="lcNo">
                  <el-input v-model="formData.lcNo" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="币种" prop="currencyCode">
                  <el-input v-model="formData.currencyCode" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="付款方式" prop="paymentTypeName">
                  <el-input v-model="formData.paymentTypeName" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="价格条款" prop="priceTypeName">
                  <el-input v-model="formData.priceTypeName" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货金额" prop="sendAmt">
                  <el-input-number v-model="formData.sendAmt" disabled size="mini"/>
                </el-form-item>
              </el-col>-->
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="本次开票总额" prop="invoiceAmt">
                  <el-input-number v-model="formData.invoiceAmt" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="回款金额" prop="hkAmt">
                  <el-input-number v-model="formData.hkAmt" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="非TT金额" prop="noTtAmt">
                  <!-- 后台暂缺 -->
                  <el-input-number v-model="formData.noTtAmt" disabled size="mini"/>
                </el-form-item>
              </el-col>

              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="已核销总额" prop="ttAmt">
                  <el-input-number v-model="formData.yhxAmount" disabled size="mini"/>
                </el-form-item>
              </el-col>-->
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="待核销总额" prop="ttAmt">
                  <el-input-number v-model="formData.ttAmt" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="已核销完成" prop="isCheckOver">
                  <el-switch v-model="formData.isCheckOver" disabled size="mini" />
                </el-form-item>
              </el-col>-->
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="交单总额" prop="jdTotalamt">
                  <el-input-number v-model="formData.jdTotalamt" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发票到期日" prop="lastInvoiceDate">
                  <el-date-picker
                    v-model="formData.lastInvoiceDate"
                    disabled
                    size="mini"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发票记账日期" prop="fpjzDate">
                  <el-date-picker
                    v-model="formData.fpjzDate"
                    disabled
                    size="mini"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="实际出货日期" prop="actualShipDate">
                  <el-date-picker
                    v-model="formData.actualShipDate"
                    disabled
                    size="mini"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>

              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="到港日期" prop="arrivalDate">
                  <el-date-picker
                    v-model="formData.arrivalDate"
                    disabled
                    size="mini"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="提单日期" prop="tdDate">
                  <el-date-picker
                    v-model="formData.tdDate"
                    disabled
                    size="mini"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="预计回款日期" prop="preReturnDate">
                  <el-date-picker
                    v-model="formData.preReturnDate"
                    size="mini"
                    class="max-w"
                    type="date"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="汇率" prop="exchangeRate">
                  <el-input-number v-model="formData.exchangeRate" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="产品大类" prop="itemTypeName">
                  <el-input v-model="formData.itemTypeName" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="承兑日期" prop="cdDate">
                  <el-date-picker v-model="formData.cdDate" :disabled="formData.stat === 5" size="mini" class="max-w" type="date"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="回款日期" prop="hkDate">
                  <el-date-picker v-model="formData.hkDate" :disabled="formData.stat === 5" size="mini" class="max-w" type="date"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="提单收到日期" prop="tdReciveDate">
                  <el-date-picker
                    v-model="formData.tdReciveDate"
                    :disabled="formData.stat === 5"
                    size="mini"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="商业发票号" prop="factInvoiceNo">
                  <el-input v-model="formData.factInvoiceNo" :disabled="formData.stat === 5" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="条款" prop="clause">
                  <el-input v-model="formData.clause" :disabled="formData.stat === 5" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="开证行不符点" prop="kzhBfd">
                  <el-input v-model="formData.kzhBfd" :disabled="formData.stat === 5" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="文件归档信息" prop="filePlace">
                  <el-input v-model="formData.filePlace" :disabled="formData.stat === 5" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="国内扣款" prop="guoneiFee">
                  <el-input-number
                    v-model="formData.guoneiFee"
                    :disabled="formData.stat === 5"
                    :min="0"
                    :max="999999999.99"
                    :precision="2"
                    :step="0.1"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="国外扣款" prop="guowaiFee">
                  <el-input-number
                    v-model="formData.guowaiFee"
                    :disabled="formData.stat === 5"
                    :min="0"
                    :max="999999999.99"
                    :precision="2"
                    :step="0.1"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="已开票金额" prop="alreadyInvoiceAmt">
                  <el-input-number
                    v-model="formData.alreadyInvoiceAmt"
                    :disabled="true"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="可开票金额" prop="canInvoiceAmt">
                  <el-input-number v-model="formData.canInvoiceAmt" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="已核销金额" prop="ttCheckAmt">
                  <el-input-number v-model="formData.ttCheckAmt" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发票总金额" prop="fxzje">
                  <el-input-number v-model="formData.fxzje" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="快递单号" prop="ktOrder">
                  <el-input v-model="formData.ktOrder" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="提单号" prop="tdOrder">
                  <el-input v-model="formData.tdOrder" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="交单日期" prop="jdDate">
                  <el-date-picker
                    v-model="formData.jdDate"
                    disabled
                    size="mini"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="实际收款日期" prop="actualReturnDate">
                  <el-date-picker
                    v-model="formData.actualReturnDate"
                    disabled
                    size="mini"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="18" :md="16" :sm="24" :xs="24">
                <el-form-item label="交单不符点" prop="jdNote">
                  <el-input v-model="formData.jdNote" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="经营单位" prop="entid">
                  <!-- <el-input v-model="formData.entName" disabled size="mini" /> -->
                  <OperateUnitSelect v-model="formData.entid" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <el-form-item class="note-textarea" label="备注" prop="note">
                  <el-input v-model="formData.note" disabled type="textarea" rows="2" size="mini"/>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>

        <el-tab-pane label="整机信息" name="second">
          <el-table :data="hLineList" :loading="loading" class="m-t-12" border>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="itemHCode" sortable min-width="140" label="整机编码"/>
            <el-table-column prop="itemHName" sortable min-width="220" label="整机名称"/>
            <el-table-column prop="custItemName" sortable min-width="140" label="客户机型"/>
            <el-table-column prop="qty" sortable min-width="130" label="发货通知数量"/>
            <el-table-column prop="price" sortable min-width="110" label="单价"/>
            <el-table-column prop="lineAmt" sortable min-width="110" label="金额"/>
            <el-table-column prop="actualOutQty" sortable min-width="140" label="已发货确认数量"/>
            <el-table-column prop="otherPrice" sortable min-width="110" label="开票单价"/>
            <el-table-column prop="invoiceQty" sortable min-width="110" label="开票数量"/>
            <el-table-column prop="otherAmt" sortable min-width="110" label="开票金额"/>
            <el-table-column prop="invoiceAmt" sortable min-width="110" label="实际金额"/>
            <el-table-column prop="nw" sortable min-width="80" label="净重"/>
            <el-table-column prop="gw" sortable min-width="80" label="毛重"/>
            <el-table-column prop="volume" sortable min-width="80" label="体积"/>
            <!-- 品牌 后端字段暂缺 -->
            <el-table-column prop="abc" sortable min-width="80" label="品牌"/>
            <el-table-column prop="piNo" sortable min-width="120" label="PI号"/>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="产品信息" name="third">
          <el-table :data="lineList" :loading="loading" class="m-t-12" border>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="itemHCode" sortable min-width="130" label="整机编码"/>
            <el-table-column prop="itemHName" sortable min-width="220" label="整机名称"/>
            <el-table-column prop="noticeHId" sortable min-width="100" label="费用项目"/>
            <el-table-column prop="itemCode" sortable min-width="130" label="工厂型号编码"/>
            <el-table-column prop="spec" sortable min-width="220" label="工厂型号"/>
            <el-table-column prop="custItemName" sortable min-width="140" label="客户型号"/>
            <el-table-column prop="custSpec" sortable min-width="230" label="客户产品名称"/>
            <el-table-column prop="qty" sortable min-width="100" label="装柜数量"/>
            <el-table-column prop="price" sortable min-width="100" label="销售价"/>
            <el-table-column prop="lineAmt" sortable min-width="100" label="金额"/>
            <el-table-column prop="actualOutQty" sortable min-width="140" label="已发货确认数量"/>
            <el-table-column prop="otherPrice" sortable min-width="100" label="开票单价"/>
            <el-table-column prop="invoiceQty" sortable min-width="100" label="开票数量"/>
            <el-table-column prop="otherAmt" sortable min-width="100" label="开票金额"/>
            <el-table-column prop="invoiceAmt" sortable min-width="100" label="实际金额"/>
            <el-table-column prop="jdQty" sortable min-width="100" label="交单数量"/>
            <el-table-column prop="jdAmt" sortable min-width="100" label="交单金额"/>
            <el-table-column prop="packStyle" sortable min-width="100" label="箱数"/>
            <el-table-column prop="volume" sortable min-width="100" label="体积"/>
            <el-table-column prop="noticeHId" sortable min-width="100" label="毛重"/>
            <el-table-column prop="gw" sortable min-width="100" label="净重"/>
            <el-table-column prop="noticeNo" sortable min-width="140" label="通知单号"/>
            <el-table-column prop="lcNo" sortable min-width="130" label="信用证号"/>
            <el-table-column prop="piNo" sortable min-width="130" label="PI号"/>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="核销明细" name="fourth">
          <el-table :data="funds" :loading="loading" class="m-t-12" border>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="invoice_no" sortable min-width="130" label="商业发票号"/>
            <el-table-column prop="notice_no" sortable min-width="130" label="发货通知单号"/>
            <el-table-column prop="tt_rate" sortable min-width="130" label="TT比例"/>
            <el-table-column prop="lc_rate" sortable min-width="130" label="LC比例"/>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <FileUpload :id="formData.invoiceId" :bill-name="'信用证维护'"/>
    </el-form>
    <InvoiceModal 
      v-if="oldInvoiceNoShow"
      :request-stat="formData.stat"
      type="multiple"
      @close="oldInvoiceNoShow = false"
      @changeData="changeOldInvoiceNo"
    />
  </div>
</template>

<script>
import * as auth from '@/utils/auth'
import CommercialInvoiceNoSelect from './../commercial-invoice/CommercialInvoiceNoSelect'
import commercialInvoiceServer from './../../../api/commercialInvoiceServer'
import commercialInvoiceSplitServer from './../../../api/commercialInvoiceSplitServer'
import commercialInvoiceNeutralizeServer from './../../../api/commercialInvoiceNeutralizeServer'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import ShipTypeEnumSelect from './../../entity/customs-bill/ShipTypeEnumSelect'
import FreightStandardSelect from './../freight-standard/FreightStandardSelect'
import CommercialInvoiceToTypeEnumUtil from './../../../components/enum/commercial-invoice/CommercialInvoiceToTypeEnumUtil'
// import FreightStandardStatusEnumUtil from './../../../components/enum/freight-standard/FreightStandardStatusEnumUtil'
import CostProjectSelect from './../cost-project/CostProjectSelect'
import FreightStandardStatusEnumSelect from './../../../components/entity/freight-standard/FreightStandardStatusEnumSelect'
import ShippingCompanyProxyTypeEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyProxyTypeEnumSelect'
import CommercialInvoiceStatusEnumUtil from './../../../components/enum/commercial-invoice/CommercialInvoiceStatusEnumUtil'
import CommercialInvoiceSplitTradeTypeEnumSelect from './../../../components/entity/commercial-invoice-split/CommercialInvoiceSplitTradeTypeEnumSelect'
import CommercialInvoiceSplitTradeTypeEnumUtil from './../../../components/enum/commercial-invoice-split/CommercialInvoiceSplitTradeTypeEnumUtil.js'
import CommercialInvoiceStatusEnumSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceStatusEnumSelect'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil.js'
import deliverReportServer from './../../../api/deliverReportServer'
// import CommercialInvoiceOrderNoSelect from './../commercial-invoice/CommercialInvoiceOrderNoSelect'
// import ShipmentNoticeSelectPopup from './../../../components/entity/shipment-notice/ShipmentNoticeSelectPopup'
// 头部信息
import InvoiceModal from './InvoiceModal'
const headerObj = {
  poPriceProcessTime: null,
  jdTotalamt: null,
  notaxAmt: null,
  isCheckOver: null,
  soPriceStat: null,
  boxNote: null,
  selStat: null,
  returnAmt2: null,
  lcRate: null,
  $state: null, // 新增1，编辑2，删除3
  poNo: null,
  jdBank: null,
  isShipment: null,
  tbYy: null,
  currencyId: null,
  wfid: null,
  poRcvProcessTime: null,
  idpath: null,
  sendAmt: null,
  jdStat: null,
  preReturnDate: null,
  itemStat: null,
  isEcicOver: null,
  jdAmt: null,
  feeType: null,
  hkDate: null, // 回款日期
  hkAmt: null,
  salesUserId: null,
  yrAmt: null,
  canInErp: null,
  checkTime: null,
  oldInvoiceId: null,
  tdOrder: null,
  itemTypeName: null,
  cdDate: null, // 承兑日期
  shortmobil: null,
  sendConfirmStat: null,
  piNos: null,
  updateDate: null,
  fpjzDate: null,
  sendConfirmDate: null,
  tbDate: null,
  canInvoiceAmt: null,
  orgId: null,
  sapHrxiao: null,
  tdReciveDate: null, // 提单收到日期
  soStat: null,
  returnDate: null,
  outBillDate: null,
  custId: null,
  dname: null,
  poPriceStat: null,
  filePlace: null,
  createDate: null,
  clause: null,
  periodId: null,
  stat: null,
  statNmae: null,
  yfDate: null,
  priceTypeName: null,
  wfflag: null,
  cxDate: null,
  isFlYt: null,
  updateUser: null,
  itemKind: null,
  custName: null,
  priceTypeId: null,
  noticeId: null,
  isErpProcess: null,
  deleted: null,
  periodYear: null,
  guowaiFee: null,
  reportMan: null,
  kzhBfd: null,
  invoiceId: null,
  warnNo: null,
  createUser: null, // 创建人
  lcBillId: null,
  currencyCode: null,
  erpTime: null,
  isSapHexiao: null,
  entid: null,
  entName: null,
  glClosed: null,
  versionNum: null,
  itemProcessTime: null,
  poProcessTime: null,
  custDesc: null,
  paymentTypeCode: null,
  jdDate: null,
  erpPoNo: null,
  flPayAmt: null,
  poStat: null,
  oldInvoiceNo: null,
  oldInvoiceNos: null, // 合并拆分 发票流水号 集合
  oldInvoiceIds: null,
  oldFactNos: null, // 合并拆分 发票号 集合
  noticeNos: null, // 合并拆分 发票通知单号 集合
  isPremiumOver: null,
  outBillNo: null,
  exchangeRate: null, // 汇率
  priceTypeCode: null,
  invoiceType: null,
  saleOrderType: null,
  sapChongzhi: null,
  kaipDate: null,
  isFlPayed: null,
  invoiceNo: null,
  tbStat: null,
  orgName: null,
  piIds: null,
  redNote: null,
  periodLineId: null,
  flYtAmt: null,
  lcNo: null,
  jdNo: null,
  tdDate: null,
  piNo: null,
  guoneiFee: null,
  tixing: null,
  invoiceAmt: null,
  arrivalDate: null, // 到港时间
  ttAmt: null,
  poRcvStat: null,
  shDate: null,
  splitFlag: null,
  reportStat: null,
  shipType: null,
  qsDate: null,
  itemTypeNo: null,
  returnAmt: null,
  soProcessTime: null,
  lcJtAmt: null,
  piId: null,
  note: null,
  factInvoiceNo: null,
  noticeNo: null,
  jdNote: null,
  jdMan: null,
  paymentTypeId: null,
  engName: null,
  currencyName: null,
  isRebateOver: null,
  checkor: null,
  actualShipDate: null,
  orgCode: null,
  alreadyInvoiceAmt: null,
  rzStat: null,
  itemTypeId: null,
  warnId: null,
  lcBillNo: null,
  ktOrder: null,
  soPriceProcessTime: null,
  selProcessTime: null,
  actualReturnDate: null,
  paymentTypeName: null,
  billType: null,
  tbAmt: null,
  noticeIds: null,
  saleEntType: null,
  custCode: null,
  lastOutDate: null,
  flAmt: null,
  pinoNew: null,
  erpSoNo: null,
  fundsFlag: null,
  entorgid: null,
  inbillNo: null,
  lastInvoiceDate: null,
  outBillStat: null,
  // noticeNos: null,
  fxzje: null,
  invFeeType: null,
  isRed: null,
  ttRate: null,
  rzBank: null,
  flAmtUsd: null,
  ttCheckAmt: null,
  yhxAmount: null,
  whxAmount: null,
  dhxAmount: null,
}

const emptyFormData = {
  code: null,
  status: null,
  remark: null,
  isDelete: null,
  operateUnitId: null,
}

let initFormData = {
  ...headerObj
}

export default {
  name: 'CommercialInvoiceSplitEdit',
  components: {
    CommercialInvoiceNoSelect,
    OperateUnitSelect,
    ShippingCompanySelect,
    FreightStandardSelect,
    CostProjectSelect,
    FreightStandardStatusEnumSelect,
    ShippingCompanyProxyTypeEnumSelect,
    CommercialInvoiceStatusEnumSelect,
    CommercialInvoiceSplitTradeTypeEnumSelect,
    ShipTypeEnumSelect,
    InvoiceModal,
    // CommercialInvoiceOrderNoSelect,
    FreightStandardContainerDeletePopup: () => import('./../../../views/entity-page/freight-standard-container/freightStandardContainerDeletePopup.vue'),
    FreightStandardTicketDeletePopup: () => import('./../../../views/entity-page/freight-standard-ticket/freightStandardTicketDeletePopup.vue'),
  },
  filters: {
    // FreightStandardStatusFilter: FreightStandardStatusEnumUtil.toTitleFilter,
    // CommercialInvoiceStatusFilter: CommercialInvoiceStatusEnumUtil.toTitleFilter,
    CommercialInvoiceToTypeFilter: CommercialInvoiceToTypeEnumUtil.toTitleFilter,
    CommercialInvoiceSplitTradeTypeFilter: CommercialInvoiceSplitTradeTypeEnumUtil.toTitleFilter
  },
  props: {
    id: {
      type: String | Number,
      default: null
    },
    no: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      oldInvoiceNoShow: false,
      downExcel: null,
      token: null,
      radio: 'cbx1',
      radio1: 'cbx4',
      checkList: ['cbx5', 'cbx6', 'chk1'],
      note: 'cbx1cbx4cbx5cbx6chk1',
      comeIn: false, // 已审核商业发票详情页面 点击 红冲 进入
      selectedInvoiceIds: [],
      isSwitchTab: false,
      isSelectedNo: false,
      activeName: 'first',
      loading: false,
      formData: {
        ...initFormData
      },
      freightStandardTicketsSelection: [],
      funds: [], // 核销信息
      fee: [], // 费用信息
      hLineList: [], // 整机信息
      lineList: [], // 产品信息
      splitList: [], // 按柜拆分
      isEdit: false,
      isInputEdit: true,
      rules: {
        oldInvoiceNos: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        code: [
          // { required: true, message: '不能为空', trigger: 'blur' },
          // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        status: [
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        operateUnitId: [
        ],
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    },
  },
  watch: {
    // id(val) {
    //   if (val !== this.initFormData.id) {
    //     this.getData()
    //   }
    // },
    loading(val) {
      this.$emit('loadingChange', val)
    }
  },
  created() {
    this.token = auth.getToken()

    if (this.id) {
      this.formData.invoiceId = this.id
      this.getData()
    } else {
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }
      this.formData.entid = this.$store.getters.entid
      this.formData.createUser = this.$store.getters.userCode
      // formData.stat 1 代表制单，4 代表以审核
      this.formData.stat = 1
      this.isEdit = true
      if (this.no) {
        this.formData.oldInvoiceNo = this.no
        this.comeIn = true
      }
    }
  },
  methods: {
    // changeDown(val) {
    //   this.$refs.commercialInvoiceEdit.doExport_plus(val, this.note)
    // },
    
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
    async doExport(val) {
      this.loading = true
      if (val === 1) {
        let returnUrl = null
        const res = await commercialInvoiceServer.supportList({
          type: 3,
          invoiceNo: this.formData.invoiceNo,
          note: this.note,
        })
        returnUrl = res.data.data.downUrl
        this.loading = false
        window.open(returnUrl, '_blank')
      } else if (val === 2) {
        let returnUrl = null
        const res = await commercialInvoiceServer.supportList({
          type: 4,
          invoiceNo: this.formData.invoiceNo,
          note: this.note,
        })
        returnUrl = res.data.data.downUrl
        this.loading = false
        window.open(returnUrl, '_blank')
      } 
      setTimeout(() => {
        this.downExcel = '导出'
      }, 35)
    },
    change() {
      this.dealWithNote()
    },
    change1() {
      this.dealWithNote()
    },
    changeCheckbox() {
      this.dealWithNote()
    },
    dealWithNote() {
      let str = null
      str = this.radio + this.radio1 + this.checkList.join()
      this.note = str
    },
    handleClick(tab, event) {
      if (tab.name !== 'first') {
        if (this.isSelectedNo) {
          if (!this.isSwitchTab) {
            this.getLineData()
          }
        } else {
          this.isSwitchTab = false
        }
      }
    },
    close() {
      this.$emit('close')
    },
    // 获取相关行信息
    getLineData() {
      this.isSwitchTab = true
      this.hLineList = []
      this.funds = []
      this.lineList = []
      for (let i = 0; i < this.selectedInvoiceIds.length; i++) {
        this.getLine(this.selectedInvoiceIds[i])
      }
    },
    async getLine(id) {
      const res = await commercialInvoiceServer.get(id)
      this.hLineList = this.hLineList.concat(res.data.hLineList)
      // this.funds = this.funds.concat(res.data.funds || [])
      this.lineList = this.lineList.concat(res.data.lineList)

      let yhx = 0
      if (this.funds) {
        this.funds.forEach(item => {
          if (item.fundsType === '1') {
            yhx += parseFloat(item.alloAmt)
          }
        })
      }
      this.formData.invoiceAmt = this.formData.yhxAmount - this.formData.jdAmount
      this.formData.yhxAmount = yhx
      this.formData.whxAmount = parseFloat(this.formData.invoiceAmt) - yhx
      this.formData.dhxAmount = this.formData.invoiceAmt
      // invoiceAmt
    },

    async getData() {
      this.loading = true
      const res = await commercialInvoiceSplitServer.get(this.formData.invoiceId, this.$route.params.mergingSplitType)
      this.funds = res.data.rateList || []
      // this.fee = res.data.fee
      this.hLineList = res.data.hLineList
      this.lineList = res.data.lineList
      // this.splitList = res.data.splitList

      res.data.header.statNmae = CommercialInvoiceStatusEnumUtil.toTitleFilter(res.data.header.stat)
      res.data.header.entName = OperaUnitEnumUtil.toTitleFilter(res.data.header.entid)
      // res.data.header.oldInvoiceNos = res.data.header.oldInvoiceNos.split(',')
      // res.data.header.oldFactNos = res.data.header.oldFactNos && res.data.header.oldFactNos.split(',')
      initFormData = res.data.header
      this.formData = {
        ...initFormData
      }
      // console.log(this.formData.oldInvoiceNo)
      let yhx = 0
      if (this.funds) {
        this.funds.forEach(item => {
          if (item.fundsType === '1') {
            yhx += parseFloat(item.alloAmt)
          }
        })
      }
      this.formData.yhxAmount = yhx
      this.formData.whxAmount = parseFloat(this.formData.invoiceAmt) - yhx
      this.formData.dhxAmount = this.formData.invoiceAmt
      this.formData.invoiceAmt = this.fixedNumber(this.formData.invoiceAmt)(2)
      this.formData.hkAmt = this.fixedNumber(this.formData.hkAmt)(2)
      this.formData.noTtAmt = this.fixedNumber(this.formData.noTtAmt)(2)
      this.formData.ttAmt = this.fixedNumber(this.formData.ttAmt)(2)
      this.formData.jdTotalamt = this.fixedNumber(this.formData.jdTotalamt)(2)
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          this.loading = true
          if (valid) {
            if (this.formData.invoiceId) {
              // 保存
              this.formData.$state = 2
            } else {
              // 新增
              this.formData.entid = this.$store.getters.entid
              this.formData.$state = 1
            }

            const list = JSON.parse(JSON.stringify(this.formData))
            const res = await commercialInvoiceSplitServer.add(list)
            if (Number.parseInt(res.data.code) === 200) {
              // // 新增保存成功后清除表单数据
              // if (!this.isCreateMode) {
              //   this.formData = { ...emptyFormData }
              // }
              if (/不能重复/.test(res.data.msg)) {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
                this.loading = false
                return reject()
              } else {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
              }
              
              if (this.formData.invoiceId) {
                this.formData.invoiceId = res.data.data
                this.getData()
              } else {
                this.formData.invoiceId = res.data.data
                this.getData()
              }            
              this.loading = false
              resolve()
            } else {
              this.$message({
                message: '保存失败',
                type: 'warning'
              })
              this.loading = false
              return reject()
            }
          } else {
            this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            this.loading = false
            reject('error submit!!')
          }
        })
      })
    },
    refresh() {
      this.getData()
    },
    async del() {
      this.loading = true
      // this.formData.$state = 3
      // this.formData.deleted = 1
      // const res = await commercialInvoiceNeutralizeServer.dodelete(this.formData.invoiceId)
      /** 删除的时候，改为调用新增的接口，设置$state为3，deleted为1*/
      const res = await commercialInvoiceNeutralizeServer.delete_plus({
        invoiceId: this.formData.invoiceId,
        $state: 3,
        deleted: 1,
      })
      if (Number.parseInt(res.data.code) === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.loading = false
        window.eventBus.$emit('closePage', 'CommercialInvoiceSplitEditPage')
      } else {
        this.$message({
          message: '删除失败',
          type: 'warning'
        })
        this.loading = false
      }
    },
    async submit() {
      // 先确定这个票能正常保存
      await this.save()

      // 然后再修改状态再进行提交
      this.formData.stat = 5
      await this.save()
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    },
    sumNotTTamt(obj) {
      let sum = 0
      async function loopCount(i) {
        const objItem = obj[i]
        if (!objItem) return sum
        const data = {
          params: {
            invoiceId: objItem.invoiceId,
            lcNo: objItem.lcNo
          }
        }
        const res = await deliverReportServer.queryEdiInfo(data)
        if (Number.parseInt(res.data.code) === 200) {        
          if (res.data.data.invoiceInfo) {
            sum += Number.parseFloat(res.data.data.invoiceInfo.invNottamt)
          }
        }
        return loopCount(++i)
      }
      return loopCount(0)
    },
    async changeOldInvoiceNo(obj) {
      this.isSwitchTab = false     
      this.loading = true 
      await this.$refs['formData'].resetFields()
      if (obj.length) {
        // 直接从服务器接口来统计所有发票的 【非TT金额】
        this.formData.noTtAmt = await this.sumNotTTamt(obj)
        this.isSelectedNo = true
        this.selectedInvoiceIds = []
        const item = obj[0]
        item.statNmae = CommercialInvoiceStatusEnumUtil.toTitleFilter(item.stat)
        item.entName = CommercialInvoiceStatusEnumUtil.toTitleFilter(item.entid)
        this.formData.poPriceProcessTime = item.poPriceProcessTime
        // this.formData.jdTotalamt = item.jdTotalamt
        this.formData.notaxAmt = item.notaxAmt
        this.formData.isCheckOver = item.isCheckOver
        this.formData.soPriceStat = item.soPriceStat
        this.formData.boxNote = item.boxNote
        this.formData.selStat = item.selStat
        this.formData.returnAmt2 = item.returnAmt2
        this.formData.lcRate = item.lcRate
        // this.formData.$state = item.$state
        this.formData.poNo = item.poNo
        this.formData.jdBank = item.jdBank
        this.formData.isShipment = item.isShipment
        this.formData.tbYy = item.tbYy
        this.formData.currencyId = item.currencyId
        this.formData.wfid = item.wfid
        this.formData.poRcvProcessTime = item.poRcvProcessTime
        this.formData.idpath = item.idpath
        // this.formData.sendAmt = item.sendAmt
        this.formData.jdStat = item.jdStat
        this.formData.preReturnDate = item.preReturnDate
        this.formData.itemStat = item.itemStat
        this.formData.isEcicOver = item.isEcicOver
        this.formData.jdAmt = item.jdAmt
        this.formData.feeType = item.feeType
        this.formData.hkDate = item.hkDate
        this.formData.hkAmt = item.hkAmt
        this.formData.salesUserId = item.salesUserId
        this.formData.yrAmt = item.yrAmt
        this.formData.canInErp = item.canInErp
        this.formData.checkTime = item.checkTime
        this.formData.oldInvoiceId = item.oldInvoiceId
        this.formData.tdOrder = item.tdOrder
        this.formData.itemTypeName = item.itemTypeName
        this.formData.cdDate = item.cdDate
        this.formData.shortmobil = item.shortmobil
        this.formData.sendConfirmStat = item.sendConfirmStat
        this.formData.piNos = item.piNos
        this.formData.updateDate = item.updateDate
        this.formData.fpjzDate = item.fpjzDate
        this.formData.sendConfirmDate = item.sendConfirmDate
        this.formData.tbDate = item.tbDate
        this.formData.canInvoiceAmt = item.canInvoiceAmt
        this.formData.orgId = item.orgId
        this.formData.sapHrxiao = item.sapHrxiao
        this.formData.tdReciveDate = item.tdReciveDate
        this.formData.soStat = item.soStat
        this.formData.returnDate = item.returnDate
        this.formData.outBillDate = item.outBillDate
        this.formData.custId = item.custId
        this.formData.dname = item.dname
        this.formData.poPriceStat = item.poPriceStat
        this.formData.filePlace = item.filePlace
        this.formData.createDate = item.createDate
        this.formData.clause = item.clause
        this.formData.periodId = item.periodId
        // this.formData.stat = item.stat
        this.formData.statNmae = item.statNmae
        this.formData.yfDate = item.yfDate
        this.formData.priceTypeName = item.priceTypeName
        this.formData.wfflag = item.wfflag
        // this.formData.cxDate = item.cxDate === null ? '' : item.cxDate
        this.formData.isFlYt = item.isFlYt
        this.formData.updateUser = item.updateUser
        this.formData.itemKind = item.itemKind
        this.formData.custName = item.custName
        this.formData.priceTypeId = item.priceTypeId
        this.formData.noticeId = item.noticeId
        this.formData.isErpProcess = item.isErpProcess
        this.formData.deleted = item.deleted
        this.formData.periodYear = item.periodYear
        this.formData.guowaiFee = item.guowaiFee
        this.formData.reportMan = item.reportMan
        this.formData.kzhBfd = item.kzhBfd
        // this.formData.invoiceId = item.invoiceId
        this.formData.warnNo = item.warnNo
        // this.formData.createUser = item.createUser
        this.formData.lcBillId = item.lcBillId
        this.formData.currencyCode = item.currencyCode
        this.formData.erpTime = item.erpTime
        this.formData.isSapHexiao = item.isSapHexiao
        this.formData.entid = item.entid
        this.formData.entName = item.entName
        this.formData.glClosed = item.glClosed
        this.formData.versionNum = item.versionNum
        this.formData.itemProcessTime = item.itemProcessTime
        this.formData.poProcessTime = item.poProcessTime
        this.formData.custDesc = item.custDesc
        this.formData.paymentTypeCode = item.paymentTypeCode
        this.formData.jdDate = item.jdDate
        this.formData.erpPoNo = item.erpPoNo
        this.formData.flPayAmt = item.flPayAmt
        this.formData.poStat = item.poStat
        this.formData.oldInvoiceNo = item.invoiceNo
        this.formData.oldInvoiceId = item.invoiceId
        this.formData.isPremiumOver = item.isPremiumOver
        this.formData.outBillNo = item.outBillNo
        this.formData.exchangeRate = item.exchangeRate
        this.formData.priceTypeCode = item.priceTypeCode
        this.formData.invoiceType = item.invoiceType
        this.formData.saleOrderType = item.saleOrderType
        this.formData.sapChongzhi = item.sapChongzhi
        this.formData.kaipDate = item.kaipDate
        this.formData.isFlPayed = item.isFlPayed
        // this.formData.invoiceNo = item.invoiceNo
        this.formData.tbStat = item.tbStat
        this.formData.orgName = item.orgName
        this.formData.piIds = item.piIds
        // this.formData.redNote = item.redNote
        this.formData.periodLineId = item.periodLineId
        this.formData.flYtAmt = item.flYtAmt
        this.formData.lcNo = item.lcNo
        this.formData.jdNo = item.jdNo
        this.formData.tdDate = item.tdDate
        this.formData.piNo = item.piNo
        this.formData.guoneiFee = item.guoneiFee
        this.formData.tixing = item.tixing
        this.formData.invoiceAmt = item.invoiceAmt
        this.formData.arrivalDate = item.arrivalDate
        this.formData.ttAmt = item.ttAmt
        this.formData.poRcvStat = item.poRcvStat
        this.formData.shDate = item.shDate
        this.formData.splitFlag = item.splitFlag
        this.formData.reportStat = item.reportStat
        this.formData.shipType = item.shipType
        this.formData.qsDate = item.qsDate
        this.formData.itemTypeNo = item.itemTypeNo
        this.formData.returnAmt = item.returnAmt
        this.formData.soProcessTime = item.soProcessTime
        this.formData.lcJtAmt = item.lcJtAmt
        this.formData.piId = item.piId
        this.formData.note = item.note
        this.formData.factInvoiceNo = item.factInvoiceNo
        this.formData.noticeNo = item.noticeNo
        this.formData.jdNote = item.jdNote
        this.formData.jdMan = item.jdMan
        this.formData.paymentTypeId = item.paymentTypeId
        this.formData.engName = item.engName
        this.formData.currencyName = item.currencyName
        this.formData.isRebateOver = item.isRebateOver
        this.formData.checkor = item.checkor
        this.formData.actualShipDate = item.actualShipDate
        this.formData.orgCode = item.orgCode
        this.formData.alreadyInvoiceAmt = item.alreadyInvoiceAmt
        this.formData.rzStat = item.rzStat
        this.formData.itemTypeId = item.itemTypeId
        this.formData.warnId = item.warnId
        this.formData.lcBillNo = item.lcBillNo
        this.formData.ktOrder = item.ktOrder
        this.formData.soPriceProcessTime = item.soPriceProcessTime
        this.formData.selProcessTime = item.selProcessTime
        this.formData.actualReturnDate = item.actualReturnDate
        this.formData.paymentTypeName = item.paymentTypeName
        this.formData.billType = item.billType
        this.formData.tbAmt = item.tbAmt
        // this.formData.noticeIds = item.noticeIds
        this.formData.saleEntType = item.saleEntType
        this.formData.custCode = item.custCode
        this.formData.lastOutDate = item.lastOutDate
        this.formData.flAmt = item.flAmt
        this.formData.pinoNew = item.pinoNew
        this.formData.erpSoNo = item.erpSoNo
        this.formData.fundsFlag = item.fundsFlag
        this.formData.entorgid = item.entorgid
        this.formData.inbillNo = item.inbillNo
        this.formData.lastInvoiceDate = item.lastInvoiceDate
        this.formData.outBillStat = item.outBillStat
        this.formData.noticeNos = item.noticeNos
        this.formData.fxzje = item.fxzje
        this.formData.invFeeType = item.invFeeType
        this.formData.isRed = item.isRed
        this.formData.ttRate = item.ttRate
        this.formData.rzBank = item.rzBank
        this.formData.flAmtUsd = item.flAmtUsd
        this.formData.ttCheckAmt = item.ttCheckAmt
        this.formData.oldFactNos = item.factInvoiceNo
        // this.formData.oldInvoiceNos = item.oldInvoiceNos
        const oldFactNos = []
        const noticeNos = []
        const noticeIds = []
        const oldInvoiceIds = []
        const oldInvoiceNos = []

        // const yhxAmount = 0
        // const fhAmount = 0
        // const dhxAmount = 0
        // const kpAmount = 0
        // const kkpAmount = 0
        // const jdAmount = 0
        if (obj.length > 1) {
          // let notTtPrice = 0
          let ttAmt = 0
          let jdTotalamt = 0
          let canInvoiceAmt = 0
          let ttCheckAmt = 0
          let fxzje = 0
          let invoiceAmt = 0
          let alreadyInvoiceAmt = 0
          obj.forEach(element => {
            if (element.factInvoiceNo && oldFactNos.indexOf(element.factInvoiceNo) === -1) {
              oldFactNos.push(element.factInvoiceNo)
            }
            if (element.invoiceNo && oldInvoiceNos.indexOf(element.invoiceNo) === -1) {
              oldInvoiceNos.push(element.invoiceNo)
            }
            if (element.noticeNo && noticeNos.indexOf(element.noticeNo) === -1) {
              noticeNos.push(element.noticeNo)
            }
            if (element.noticeId && noticeIds.indexOf(element.noticeId) === -1) {
              noticeIds.push(element.noticeId)
            }
            if (element.invoiceId && oldInvoiceIds.indexOf(element.invoiceId) === -1) {
              oldInvoiceIds.push(element.invoiceId)
            }
            if (this.selectedInvoiceIds.indexOf(element.invoiceId) === -1) {
              this.selectedInvoiceIds.push(element.invoiceId)
            }
            // this.formData.sendAmt = item.sendAmt
            // fhAmount += item.sendAmt
            // jdAmount += item.jdTotalamt
            // this.formData.jdTotalamt = item.jdTotalamt
            
            /** 非TT金额重新从其他接口获取计算 */
            // notTtPrice += element.notTtPrice
            ttAmt += element.ttAmt
            jdTotalamt += element.jdTotalamt
            invoiceAmt += element.invoiceAmt
            canInvoiceAmt += element.canInvoiceAmt
            ttCheckAmt += element.ttCheckAmt
            fxzje += element.fxzje
            alreadyInvoiceAmt += element.alreadyInvoiceAmt
          })
          // this.formData.sendAmt = fhAmount
          // this.formData.jdTotalamt = jdAmount
          
          /** 非TT金额重新从其他接口获取计算 */
          // this.formData.notTtPrice = notTtPrice
          this.formData.ttAmt = ttAmt
          this.formData.jdTotalamt = jdTotalamt
          this.formData.invoiceAmt = invoiceAmt
          this.formData.canInvoiceAmt = canInvoiceAmt
          this.formData.ttCheckAmt = ttCheckAmt
          this.formData.fxzje = fxzje
          this.formData.alreadyInvoiceAmt = alreadyInvoiceAmt
          this.formData.oldFactNos = oldFactNos.join(',')
          this.formData.noticeNos = noticeNos.join(',')
          this.formData.noticeIds = noticeIds.join(',')
          this.formData.oldInvoiceIds = oldInvoiceIds.join(',')
          this.formData.oldInvoiceNos = oldInvoiceNos.join(',')
        } else {
          if (this.formData.invoiceId) {
            const invoiceNo = this.formData.invoiceNo
            const createUser = this.formData.createUser
            const stat = this.formData.stat
            // await this.$refs['formData'].resetFields()
            // this.formData.oldInvoiceNos = new Array(0)
            // console.log(this.formData.oldInvoiceNos)
            this.isSelectedNo = false
            this.formData.invoiceNo = invoiceNo
            this.formData.createUser = createUser
            this.formData.stat = stat
          } else {
            let invoiceNo = null
            let createUser = null
            const stat = this.formData.stat
            if (this.formData.invoiceNo !== '' && this.formData.invoiceNo !== null) {
              invoiceNo = this.formData.invoiceNo
            }
            if (this.formData.createUser !== '' && this.formData.createUser !== null) {
              createUser = this.formData.createUser
            }
            this.isSelectedNo = false
            this.formData.invoiceNo = invoiceNo
            this.formData.createUser = createUser
            this.formData.stat = stat
            this.formData.createUser = this.$store.getters.userCode
            this.formData.entid = this.$store.getters.entid
          }
          this.selectedInvoiceIds = []
          this.lineList = []
          this.funds = []
          this.formData.oldInvoiceNos = item.invoiceNo
        }
        // 手动刷新视图
        this.formData = JSON.parse(JSON.stringify(this.formData))
      }
      
      this.loading = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.max-w {
  /deep/ .el-radio + .el-radio {
    margin-left: 0;
  }
  /deep/ .el-checkbox {
    margin-left: 8px;
  }
  /deep/ .el-checkbox-group {
    display: inline;
  }
  /deep/ .el-checkbox + .el-checkbox {
    margin-left: 5px;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
    padding-left: 5px;
  }
  /deep/ .el-checkbox__label {
    padding-left: 5px;
    font-size: 12px;
  }
  /deep/ .el-select {
    width: 80px;
  }
}
.btn-group {
  padding: 8px;
  border-bottom: 3px solid #f0f1f5;
}
.el-form-item {
  width: 100%;
  margin-right: 0;
  margin-bottom: 1px;
  /deep/ .el-form-item__error {
    display: none;
  }
  /deep/ .el-input-number {
    width: 100%;
  }
}
.el-table__body {
  padding-bottom: 12px;
}
.note-textarea {
  margin-top: 5px;
  margin-bottom: 8px;
}
.container {
  /deep/ .el-table .cell {
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.ark-break-up {
  /deep/ .el-input__inner::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  /deep/ .el-input__inner::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
}
</style>
