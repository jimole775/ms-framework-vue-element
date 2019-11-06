<template>
  <div class="max-w back">
    <!-- <div class="btn-group">
      <el-button icon="el-icon-position" size="mini">跳转特殊申请单数据</el-button>
      <el-button v-show="formData.stat === 1 || formData.stat === 4" type="primary" icon="el-icon-check" size="mini" @click="save">保存</el-button>
      <el-button v-if="isEdit" icon="el-icon-refresh" size="mini" @click="refresh">重置</el-button>
      <el-button v-if="isEdit" v-show="formData.stat === 1 || formData.stat === 4" type="danger" icon="el-icon-delete" size="mini" @click="del">删除</el-button>
      <el-button :disabled="isEdit" type="primary" size="mini" icon="el-icon-check" @click="submit">提交</el-button>
    </div>-->

    <el-form
      :model="formData"
      :ref="'formData'"
      :rules="rules"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <div class="container m-t-not">
            <el-row>
              <el-col :lg="12" :md="8" :sm="12" :xs="24">
                <el-form-item label="发票流水号" prop="invoiceNo">
                  <el-input v-model="formData.invoiceNo" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="老单号" prop="factInvoiceNo">
                  <CommercialInvoiceNoSelect
                    v-model="formData.factInvoiceNo"
                    :disabled="comeIn"
                    @changeData="changeOldInvoiceNo"
                  />
                </el-form-item>
                <!-- <el-form-item v-else label="老单号" required prop="oldInvoiceNo">
                  <el-input v-model="formData.oldInvoiceNo" disabled size="mini" />
                </el-form-item>-->
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

              <el-col :lg="12" :md="12" :sm="24" :xs="24">
                <el-form-item label="通知单号" prop="noticeNo">
                  <el-input v-model="formData.noticeNo" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="PI号" prop="piNos">
                  <el-input v-model="formData.piNos" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="制单时间" prop="createDate">
                  <el-input v-model="formData.createDate" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="商业发票号" prop="factInvoiceNo">
                  <el-input v-model="formData.factInvoiceNo" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="会计期间" prop="dname">
                  <el-input v-model="formData.dname" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="销售部门" prop="orgName">
                  <el-input v-model="formData.orgName" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="业务员" prop="salesUserId">
                  <el-input v-model="formData.salesUserId" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="合同号" prop="pinoNew">
                  <el-input v-model="formData.pinoNew" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="贸易类型" prop="saleEntType">
                  <CommercialInvoiceSplitTradeTypeEnumSelect v-model="formData.saleEntType" :disabled="true" />
                </el-form-item>
              </el-col>

              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发运方式" prop="shipType">
                  <ShipTypeEnumSelect v-model="formData.shipType" :disabled="true" />
                </el-form-item>
              </el-col>-->
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="客户" prop="custCode">
                  <el-input v-model="formData.custCode" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label prop="custName">
                  <el-input v-model="formData.custName" disabled size="mini"/>
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
                <el-form-item label="汇率" prop="exchangeRate">
                  <el-input v-model="formData.exchangeRate" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="产品大类" prop="itemTypeName">
                  <el-input v-model="formData.itemTypeName" disabled size="mini"/>
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
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货金额" prop="sendAmt">
                  <el-input-number v-model="formData.sendAmt" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="本次开票总额" prop="invoiceAmt">
                  <el-input-number v-model="formData.invoiceAmt" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="回款金额" prop="hkAmt">
                  <el-input-number v-model="formData.hkAmt" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="非TT金额" prop="notTtPrice">
                  <el-input-number v-model="formData.notTtPrice" disabled size="mini" />
                </el-form-item>
              </el-col>-->
              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="未核销总额" prop="untreatedAmount">
                  <el-input-number v-model="formData.untreatedAmount" disabled size="mini" />
                </el-form-item>
              </el-col>-->
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="待核销总额" prop="whxAmount">
                  <el-input-number
                    v-model="formData.dhxAmount"
                    :precision="2"
                    disabled
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="已核销总额" prop="dhxAmount">
                  <el-input-number
                    v-model="formData.yhxAmount"
                    :precision="2"
                    disabled
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="已核销完成" prop="isCheckOver">
                  <el-switch v-model="formData.isCheckOver" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="可开票金额" prop="canInvoiceAmt">
                  <el-input-number v-model="formData.canInvoiceAmt" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="已开票金额" prop="alreadyInvoiceAmt">
                  <el-input-number v-model="formData.alreadyInvoiceAmt" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发票到期日" prop="lastInvoiceDate">
                  <el-date-picker
                    v-model="formData.lastInvoiceDate"
                    disabled
                    size="mini"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>-->
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发票记账日期" prop="fpjzDate">
                  <el-date-picker
                    v-model="formData.fpjzDate"
                    disabled
                    value-format="yyyy-MM-dd"
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
                    value-format="yyyy-MM-dd"
                    size="mini"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>

              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="到港日期" prop="arrivalDate">
                  <el-date-picker
                    v-model="formData.arrivalDate"
                    disabled
                    size="mini"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>-->
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="提单日期" prop="tdDate">
                  <el-date-picker
                    v-model="formData.tdDate"
                    disabled
                    size="mini"
                    value-format="yyyy-MM-dd"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="议付日期" prop="yfDate">
                  <el-date-picker
                    v-model="formData.yfDate"
                    disabled
                    size="mini"
                    value-format="yyyy-MM-dd"
                    class="max-w"
                    type="date"
                  />
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="预计回款日期" prop="preReturnDate">
                  <el-date-picker
                    v-model="formData.preReturnDate"
                    size="mini"
                    class="max-w"
                    type="date"
                    disabled
                  />
                </el-form-item>
              </el-col>-->
              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="快递单号" prop="ktOrder">
                  <el-input v-model="formData.ktOrder" disabled size="mini" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="提单号" prop="tdOrder">
                  <el-input v-model="formData.tdOrder" disabled size="mini" />
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
              </el-col>-->
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

              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="经营单位" prop="entid">
                  <!-- <el-input v-model="formData.entName" disabled size="mini" /> -->
                  <OperateUnitSelect v-model="formData.entid" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="审核人" prop="checkor">
                  <el-input v-model="formData.checkor" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="审核时间" prop="checkTime">
                  <el-input v-model="formData.checkTime" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="最迟装柜日期" prop="lastOutDate">
                  <el-input v-model="formData.lastOutDate" disabled size="mini"/>
                </el-form-item>
              </el-col>

              <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <el-form-item class="note-textarea" label="备注" prop="note">
                  <el-input v-model="formData.note" disabled type="textarea" rows="2" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="18" :md="16" :sm="24" :xs="24">
                <el-form-item label="交单不符点" prop="jdNote">
                  <el-input v-model="formData.jdNote" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="冲销时间" prop="cxDate">
                  <el-date-picker
                    :disabled="isHide === true"
                    v-model="formData.cxDate"
                    size="mini"
                    class="max-w"
                    type="date"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="18" :md="16" :sm="24" :xs="24">
                <el-form-item class="note-textarea" label="红冲理由" prop="redNote">
                  <el-input 
                    :disabled="isHide === true"
                    v-model="formData.redNote" 
                    type="textarea" 
                    rows="2" 
                    size="mini"/>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="产品信息" name="second">
          <el-table :data="lineList" :loading="loading" class="m-t-12" border>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="itemHCode" sortable min-width="130" label="整机编码"/>
            <el-table-column prop="itemHName" sortable min-width="220" label="整机名称"/>
            <el-table-column prop="feeType" sortable min-width="100" label="费用项目">
              <template
                slot-scope="scope"
              >{{ scope.row.feeType | CommercialInvoiceCostProjectEnumUtilFilter }}</template>
            </el-table-column>
            <el-table-column prop="itemCode" sortable min-width="130" label="工厂型号编码"/>
            <el-table-column prop="spec" sortable min-width="220" label="工厂型号"/>
            <el-table-column prop="custItemName" sortable min-width="140" label="客户型号"/>
            <el-table-column prop="custSpec" sortable min-width="230" label="客户产品名称"/>
            <el-table-column prop="qty" sortable min-width="100" label="装柜数量"/>
            <el-table-column prop="price" sortable min-width="100" label="销售价"/>
            <el-table-column prop="lineAmt" sortable min-width="100" label="金额"/>
            <el-table-column prop="actualOutQty" sortable min-width="140" label="已发货确认数量"/>
            <el-table-column prop="otherPrice" sortable min-width="100" label="开票单价"/>
            <el-table-column prop="invoiceQty" sortable min-width="100" label="开票数量">
              <template
                slot-scope="scope"
              >{{ scope.row.invoiceQty>0 ?-scope.row.invoiceQty:scope.row.invoiceQty }}</template>
            </el-table-column>
            <el-table-column prop="otherAmt" sortable min-width="100" label="开票金额">
              <template
                slot-scope="scope"
              >{{ scope.row.otherAmt>0?-scope.row.otherAmt:scope.row.otherAmt }}</template>
            </el-table-column>
            <el-table-column prop="invoiceAmt" sortable min-width="100" label="实际金额">
              <template
                slot-scope="scope"
              >{{ scope.row.invoiceAmt>0?-scope.row.invoiceAmt:scope.row.invoiceAmt }}</template>
            </el-table-column>
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

        <el-tab-pane label="核销明细" name="third">
          <el-table :data="funds" :loading="loading" class="m-t-12" border>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="alloNo" sortable min-width="130" label="发货通知单号"/>
            <el-table-column prop="alloId" sortable min-width="130" label="分配单号"/>
            <el-table-column prop="otherNo" sortable min-width="130" label="资金系统单号"/>
            <el-table-column prop="alloAmt" sortable min-width="130" label="本次分配金额"/>
            <el-table-column prop="createTime" sortable min-width="150" label="制单时间"/>
            <!-- <el-table-column prop="fundsType" sortable min-width="130" label="到款类型"/> -->
            <el-table-column prop="fundsType" sortable min-width="130" label="到款类型">
              <template slot-scope="scope">
                <!-- 过滤器 -->
                {{ scope.row.fundsType | CommercialInvoiceToTypeFilter }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <FileUpload
        :id="formData.id"
        :title="'附件'"
        :tab="1"
        :btn-text="'添加附件'"
        :bill-name="'商业发票红冲'"
      />
    </el-form>
  </div>
</template>

<script>
import CommercialInvoiceNoSelect from './../commercial-invoice/CommercialInvoiceNoSelect'
import commercialInvoiceServer from './../../../api/commercialInvoiceServer'
import commercialInvoiceNeutralizeServer from './../../../api/commercialInvoiceNeutralizeServer'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import ShipTypeEnumSelect from './../../entity/customs-bill/ShipTypeEnumSelect'
import FreightStandardSelect from './../freight-standard/FreightStandardSelect'
// import FreightStandardStatusEnumUtil from './../../../components/enum/freight-standard/FreightStandardStatusEnumUtil'
import CostProjectSelect from './../cost-project/CostProjectSelect'
import FreightStandardStatusEnumSelect from './../../../components/entity/freight-standard/FreightStandardStatusEnumSelect'
import ShippingCompanyProxyTypeEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyProxyTypeEnumSelect'
import CommercialInvoiceStatusEnumUtil from './../../../components/enum/commercial-invoice/CommercialInvoiceStatusEnumUtil'
import CommercialInvoiceCostProjectEnumUtil from './../../../components/enum/commercial-invoice/CommercialInvoiceCostProjectEnumUtil'
import CommercialInvoiceSplitTradeTypeEnumSelect from './../../../components/entity/commercial-invoice-split/CommercialInvoiceSplitTradeTypeEnumSelect'
import CommercialInvoiceSplitTradeTypeEnumUtil from './../../../components/enum/commercial-invoice-split/CommercialInvoiceSplitTradeTypeEnumUtil.js'
import CommercialInvoiceStatusEnumSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceStatusEnumSelect'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil.js'
import CommercialInvoiceToTypeEnumUtil from './../../../components/enum/commercial-invoice/CommercialInvoiceToTypeEnumUtil'
// import CommercialInvoiceOrderNoSelect from './../commercial-invoice/CommercialInvoiceOrderNoSelect'
// import ShipmentNoticeSelectPopup from './../../../components/entity/shipment-notice/ShipmentNoticeSelectPopup'
// 头部信息
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
  hkDate: null,
  hkAmt: null,
  salesUserId: null,
  yrAmt: null,
  canInErp: null,
  checkTime: null,
  oldInvoiceId: null,
  tdOrder: null,
  itemTypeName: null,
  cdDate: null,
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
  tdReciveDate: null,
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
  cxDate: '',
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
  isPremiumOver: null,
  outBillNo: null,
  exchangeRate: null,
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
  arrivalDate: null,
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
  noticeNos: null,
  fxzje: null,
  invFeeType: null,
  isRed: null,
  ttRate: null,
  rzBank: null,
  flAmtUsd: null,
  ttCheckAmt: null,
  yhxAmount: null,
  whxAmount: null,
  dhxAmount: null
}

const emptyFormData = {
  code: null,
  status: null,
  remark: null,
  isDelete: null,
  operateUnitId: null
}

let initFormData = {
  ...headerObj
}

export default {
  name: 'CommercialInvoiceNeutralizeEdit',
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
    // CommercialInvoiceOrderNoSelect,
    FreightStandardContainerDeletePopup: () =>
      import('./../../../views/entity-page/freight-standard-container/freightStandardContainerDeletePopup.vue'),
    FreightStandardTicketDeletePopup: () =>
      import('./../../../views/entity-page/freight-standard-ticket/freightStandardTicketDeletePopup.vue')
  },
  filters: {
    // FreightStandardStatusFilter: FreightStandardStatusEnumUtil.toTitleFilter,
    // CommercialInvoiceStatusFilter: CommercialInvoiceStatusEnumUtil.toTitleFilter,
    CommercialInvoiceSplitTradeTypeFilter:
      CommercialInvoiceSplitTradeTypeEnumUtil.toTitleFilter,
    CommercialInvoiceCostProjectEnumUtilFilter:
      CommercialInvoiceCostProjectEnumUtil.toTitleFilter,
    CommercialInvoiceToTypeFilter: CommercialInvoiceToTypeEnumUtil.toTitleFilter
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
      isHide: false, // 隐藏项
      comeIn: false, // 已审核商业发票详情页面 点击 红冲 进入
      whxAmount: null, // 未核销总额
      dhxAmount: null, // 待核销总额
      yhxAmount: null, // 已核销金额
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
      isEdit: true,
      isInputEdit: true,
      rules: {
        redNote: [{ required: true, message: '不能为空', trigger: 'blur' }],
        // jdNote: [
        //   { required: true, message: '不能为空', trigger: 'blur' },
        // ],
        cxDate: [{ required: true, message: '不能为空', trigger: 'blur' }],
        factInvoiceNo: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        code: [
          // { required: true, message: '不能为空', trigger: 'blur' },
          // { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        status: [],
        remark: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        isDelete: [],
        operateUnitId: []
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    },
    stat() {
      return this.formData.stat
    }
  },
  watch: {
    // id(val) {
    //   if (val !== this.initFormData.id) {
    //     this.getData()
    //   }
    // },
    stat(val) {
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
      // this.formData.id = this.id
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
      // console.log(this.formData.createUser)
      this.formData.stat = 1
      this.isEdit = false
      if (this.no) {
        this.formData.factInvoiceNo = this.no
        this.comeIn = true
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      const res = await commercialInvoiceNeutralizeServer.get(
        this.formData.invoiceId
      )
      if (Number.parseInt(res.code) === 200) {
        this.funds = [...res.data.funds]
        // this.fee = res.data.fee
        // this.hLineList = res.data.hLineList
        this.lineList = res.data.lineList
        // this.splitList = res.data.splitList

        res.data.header.statNmae = CommercialInvoiceStatusEnumUtil.toTitleFilter(
          res.data.header.stat
        )
        res.data.header.entName = OperaUnitEnumUtil.toTitleFilter(
          res.data.header.entid
        )
        this.initFormData = res.data.header
        this.formData = {
          ...res.data.header
        }
        if (this.formData.stat !== 1) {
          this.comeIn = true
          this.isHide = true
        }
        let yhx = 0
        // for (let i = 0; i < this.funds.length; i++) {
        //   if (this.funds[i].funds_type === '1') {
        //     yhx += parseFloat(this.funds[i].allo_amt)
        //   }
        // }
        this.funds.forEach(item => {
          if (item.funds_type === '1') {
            yhx += parseFloat(item.allo_amt)
          }
        })
        this.formData.yhxAmount = yhx > 0 ? -yhx : yhx
        this.formData.whxAmount = parseFloat(this.formData.invoiceAmt) - yhx
        this.formData.dhxAmount = this.formData.invoiceAmt
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
      this.loading = false
    },
    getNowFormatDate() {
      var date = new Date()
      var seperator1 = '-'
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        ' ' +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds()
      return currentdate
    },
    async save(type) {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            this.loading = true
            this.formData.lineList = this.lineList
            this.formData.funds = this.funds
            this.formData.checkTime = null
            this.formData.checkor = null
            if (type === 'startProcess') {
              this.formData.checkTime = this.getNowFormatDate()
              this.formData.checkor = this.$store.getters.userCode
            }
            if (this.formData.invoiceId) {
              // 保存
              this.formData.$state = 2
            } else {
              // 新增
              this.formData.$state = 1
              this.formData.entid = this.$store.getters.entid
            }
            const res = await commercialInvoiceNeutralizeServer.add(
              this.formData
            )
            if (Number.parseInt(res.data.code) === 200) {
              if (this.formData.invoiceId) {
                // 新增保存完成后清空表单
                this.formData = { ...emptyFormData }
              }
              if (type !== 'startProcess') {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
              }
              // initFormData = {
              //   ...this.formData
              // }
              this.formData.invoiceId = res.data.data
              this.$emit('emitEvent', {
                key: 'update',
                params: {
                  id: this.formData.invoiceId
                }
              })
              if (this.id) {
                this.$emit('insertClick', true)
              }
              this.loading = false
              // this.getData()
            } else {
              this.$message({
                message: '保存失败',
                type: 'warning'
              })
              this.loading = false
            }
            resolve({
              ...this.formData
            })
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
    refresh() {
      this.getData()
    },
    // 跳转特殊单据
    async goToSpecialDocuments() {
      if (this.formData.factInvoiceNo) {
        const data = {
          invoiceNo: this.formData.factInvoiceNo
        }
        const res = await commercialInvoiceServer.getBillsId(data)
        if (Number.parseInt(res.data.code) === 200) {
          if (res.data.data !== undefined || res.data.data != null) {
            this.$router.push({
              path:
                '/DZ-manage/invoice-manage/irregular-invoice/edit/' +
                res.data.data
            })
          } else {
            this.$message({
              message: '没找到对应的特殊申请单数据，无法跳转！',
              type: 'warning'
            })
          }
        } else {
          this.$message.error(res.data.msg)
        }
      }
    },
    emitEvent({ key }) {
      switch (key) {
        case 'startProcess':
          this.save('startProcess')
          break
        case 'saveFormData':
          this.save()
          break
        case 'resetData':
          this.resetData()
          break
        case 'update':
          this.getData()
          break
        case 'goToSpecialDocuments':
          // 跳转特殊单据
          this.goToSpecialDocuments()
          break
        default:
          break
      }
    },
    resetData() {
      if (this.id) {
        this.formData = { ...emptyFormData }
        this.funds = [] // 核销信息
        this.fee = [] // 费用信息
        this.hLineList = [] // 整机信息
        this.lineList = [] // 产品信息
        this.splitList = [] // 按柜拆分
        this.formData.invoiceId = this.id
        this.getData()
      } else {       
        this.formData = { ...emptyFormData }
        this.funds = [] // 核销信息
        this.fee = [] // 费用信息
        this.hLineList = [] // 整机信息
        this.lineList = [] // 产品信息
        this.splitList = [] // 按柜拆分
      }
    },
    async del() {
      this.loading = true
      this.formData.$state = 3
      const res = await commercialInvoiceNeutralizeServer.add(
        this.formData.invoiceId
      )
      if (Number.parseInt(res.data.code) === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.loading = false
        if (this.id) {
          window.eventBus.$emit(
            'closePagePath',
            '/DZ-manage/invoice-manage/commercial-invoice-neutralize/edit/' +
              this.id
          )
        } else {
          window.eventBus.$emit(
            'closePagePath',
            '/DZ-manage/invoice-manage/commercial-invoice-neutralize/edit/new'
          )
        }
      } else {
        this.$message({
          message: '删除失败',
          type: 'warning'
        })
        this.loading = false
      }
    },
    async changeOldInvoiceNo(obj) {
      if (obj) {
        this.loading = true
        const res = await commercialInvoiceServer.get(obj.invoiceId)
        this.funds = res.data.funds
        this.lineList = res.data.lineList
        res.data.header.statNmae = CommercialInvoiceStatusEnumUtil.toTitleFilter(
          res.data.header.stat
        )
        res.data.header.entName = OperaUnitEnumUtil.toTitleFilter(
          res.data.header.entid
        )
        // this.initFormData = res.data.header
        // this.formData = {
        //   ...res.data.header
        // }
        this.formData.poPriceProcessTime = res.data.header.poPriceProcessTime
        this.formData.jdTotalamt = res.data.header.jdTotalamt
        this.formData.notaxAmt = res.data.header.notaxAmt
        this.formData.isCheckOver = res.data.header.isCheckOver
        this.formData.soPriceStat = res.data.header.soPriceStat
        this.formData.boxNote = res.data.header.boxNote
        this.formData.selStat = res.data.header.selStat
        this.formData.returnAmt2 = res.data.header.returnAmt2
        this.formData.lcRate = res.data.header.lcRate
        this.formData.checkTime = null
        // this.formData.$state = res.data.header.$state
        this.formData.poNo = res.data.header.poNo
        this.formData.jdBank = res.data.header.jdBank
        this.formData.isShipment = res.data.header.isShipment
        this.formData.tbYy = res.data.header.tbYy
        this.formData.currencyId = res.data.header.currencyId
        this.formData.wfid = res.data.header.wfid
        this.formData.poRcvProcessTime = res.data.header.poRcvProcessTime
        this.formData.idpath = res.data.header.idpath
        this.formData.sendAmt = res.data.header.sendAmt
        this.formData.jdStat = res.data.header.jdStat
        this.formData.preReturnDate = res.data.header.preReturnDate
        this.formData.itemStat = res.data.header.itemStat
        this.formData.isEcicOver = res.data.header.isEcicOver
        this.formData.jdAmt = res.data.header.jdAmt
        this.formData.feeType = res.data.header.feeType
        this.formData.hkDate = res.data.header.hkDate
        this.formData.hkAmt = res.data.header.hkAmt
        this.formData.salesUserId = res.data.header.salesUserId
        this.formData.yrAmt = res.data.header.yrAmt
        this.formData.canInErp = res.data.header.canInErp
        this.formData.oldInvoiceId = res.data.header.invoiceId
        this.formData.tdOrder = res.data.header.tdOrder
        this.formData.itemTypeName = res.data.header.itemTypeName
        this.formData.cdDate = res.data.header.cdDate
        this.formData.shortmobil = res.data.header.shortmobil
        this.formData.sendConfirmStat = res.data.header.sendConfirmStat
        this.formData.piNos = res.data.header.piNos
        this.formData.updateDate = res.data.header.updateDate
        this.formData.fpjzDate = res.data.header.fpjzDate
        this.formData.sendConfirmDate = res.data.header.sendConfirmDate
        this.formData.tbDate = res.data.header.tbDate
        this.formData.canInvoiceAmt =
          res.data.header.canInvoiceAmt > 0
            ? -res.data.header.canInvoiceAmt
            : res.data.header.canInvoiceAmt
        this.formData.orgId = res.data.header.orgId
        this.formData.sapHrxiao = res.data.header.sapHrxiao
        this.formData.tdReciveDate = res.data.header.tdReciveDate
        this.formData.soStat = res.data.header.soStat
        this.formData.returnDate = res.data.header.returnDate
        this.formData.outBillDate = res.data.header.outBillDate
        this.formData.custId = res.data.header.custId
        this.formData.dname = res.data.header.dname
        this.formData.poPriceStat = res.data.header.poPriceStat
        this.formData.filePlace = res.data.header.filePlace
        this.formData.createDate = res.data.header.createDate
        this.formData.clause = res.data.header.clause
        this.formData.periodId = res.data.header.periodId
        // this.formData.stat = res.data.header.stat
        this.formData.statNmae = res.data.header.statNmae
        this.formData.yfDate = res.data.header.yfDate
        this.formData.priceTypeName = res.data.header.priceTypeName
        this.formData.wfflag = res.data.header.wfflag
        // this.formData.cxDate = res.data.header.cxDate === null ? '' : res.data.header.cxDate
        this.formData.isFlYt = res.data.header.isFlYt
        this.formData.updateUser = res.data.header.updateUser
        this.formData.itemKind = res.data.header.itemKind
        this.formData.custName = res.data.header.custName
        this.formData.priceTypeId = res.data.header.priceTypeId
        this.formData.noticeId = res.data.header.noticeId
        this.formData.isErpProcess = res.data.header.isErpProcess
        this.formData.deleted = res.data.header.deleted
        this.formData.periodYear = res.data.header.periodYear
        this.formData.guowaiFee = res.data.header.guowaiFee
        this.formData.reportMan = res.data.header.reportMan
        this.formData.kzhBfd = res.data.header.kzhBfd
        // this.formData.invoiceId = res.data.header.invoiceId
        this.formData.warnNo = res.data.header.warnNo
        // this.formData.createUser = res.data.header.createUser
        this.formData.lcBillId = res.data.header.lcBillId
        this.formData.currencyCode = res.data.header.currencyCode
        this.formData.erpTime = res.data.header.erpTime
        this.formData.isSapHexiao = res.data.header.isSapHexiao
        this.formData.entid = res.data.header.entid
        this.formData.entName = res.data.header.entName
        this.formData.glClosed = res.data.header.glClosed
        this.formData.versionNum = res.data.header.versionNum
        this.formData.itemProcessTime = res.data.header.itemProcessTime
        this.formData.poProcessTime = res.data.header.poProcessTime
        this.formData.custDesc = res.data.header.custDesc
        this.formData.paymentTypeCode = res.data.header.paymentTypeCode
        this.formData.jdDate = res.data.header.jdDate
        this.formData.erpPoNo = res.data.header.erpPoNo
        this.formData.flPayAmt = res.data.header.flPayAmt
        this.formData.poStat = res.data.header.poStat
        this.formData.oldInvoiceNo = res.data.header.invoiceNo
        this.formData.isPremiumOver = res.data.header.isPremiumOver
        this.formData.outBillNo = res.data.header.outBillNo
        this.formData.exchangeRate = res.data.header.exchangeRate
        this.formData.priceTypeCode = res.data.header.priceTypeCode
        this.formData.invoiceType = res.data.header.invoiceType
        this.formData.saleOrderType = res.data.header.saleOrderType
        this.formData.sapChongzhi = res.data.header.sapChongzhi
        this.formData.kaipDate = res.data.header.kaipDate
        this.formData.isFlPayed = res.data.header.isFlPayed
        // this.formData.invoiceNo = res.data.header.invoiceNo
        this.formData.tbStat = res.data.header.tbStat
        this.formData.orgName = res.data.header.orgName
        this.formData.piIds = res.data.header.piIds
        // this.formData.redNote = res.data.header.redNote
        this.formData.periodLineId = res.data.header.periodLineId
        this.formData.flYtAmt = res.data.header.flYtAmt
        this.formData.lcNo = res.data.header.lcNo
        this.formData.jdNo = res.data.header.jdNo
        this.formData.tdDate = res.data.header.tdDate
        this.formData.piNo = res.data.header.piNo
        this.formData.guoneiFee = res.data.header.guoneiFee
        this.formData.tixing = res.data.header.tixing
        this.formData.invoiceAmt =
          res.data.header.invoiceAmt > 0
            ? -res.data.header.invoiceAmt
            : res.data.header.invoiceAmt
        this.formData.arrivalDate = res.data.header.arrivalDate
        this.formData.ttAmt =
          res.data.header.ttAmt > 0
            ? -res.data.header.ttAmt
            : res.data.header.ttAmt
        this.formData.poRcvStat = res.data.header.poRcvStat
        this.formData.shDate = res.data.header.shDate
        this.formData.splitFlag = res.data.header.splitFlag
        this.formData.reportStat = res.data.header.reportStat
        this.formData.shipType = res.data.header.shipType
        this.formData.qsDate = res.data.header.qsDate
        this.formData.itemTypeNo = res.data.header.itemTypeNo
        this.formData.returnAmt = res.data.header.returnAmt
        this.formData.soProcessTime = res.data.header.soProcessTime
        this.formData.lcJtAmt = res.data.header.lcJtAmt
        this.formData.piId = res.data.header.piId
        this.formData.note = res.data.header.note
        this.formData.factInvoiceNo = res.data.header.factInvoiceNo
        this.formData.noticeNo = res.data.header.noticeNo
        this.formData.jdNote = res.data.header.jdNote
        this.formData.jdMan = res.data.header.jdMan
        this.formData.paymentTypeId = res.data.header.paymentTypeId
        this.formData.engName = res.data.header.engName
        this.formData.currencyName = res.data.header.currencyName
        this.formData.isRebateOver = res.data.header.isRebateOver
        this.formData.checkor = null
        this.formData.actualShipDate = res.data.header.actualShipDate
        this.formData.orgCode = res.data.header.orgCode
        this.formData.alreadyInvoiceAmt =
          res.data.header.alreadyInvoiceAmt > 0
            ? -res.data.header.alreadyInvoiceAmt
            : res.data.header.alreadyInvoiceAmt
        this.formData.rzStat = res.data.header.rzStat
        this.formData.itemTypeId = res.data.header.itemTypeId
        this.formData.warnId = res.data.header.warnId
        this.formData.lcBillNo = res.data.header.lcBillNo
        this.formData.ktOrder = res.data.header.ktOrder
        this.formData.soPriceProcessTime = res.data.header.soPriceProcessTime
        this.formData.selProcessTime = res.data.header.selProcessTime
        this.formData.actualReturnDate = res.data.header.actualReturnDate
        this.formData.paymentTypeName = res.data.header.paymentTypeName
        this.formData.billType = 2
        this.formData.tbAmt = res.data.header.tbAmt
        this.formData.noticeIds = res.data.header.noticeIds
        this.formData.saleEntType = res.data.header.saleEntType
        this.formData.custCode = res.data.header.custCode
        this.formData.lastOutDate = res.data.header.lastOutDate
        this.formData.flAmt = res.data.header.flAmt
        this.formData.pinoNew = res.data.header.pinoNew
        this.formData.erpSoNo = res.data.header.erpSoNo
        this.formData.fundsFlag = res.data.header.fundsFlag
        this.formData.entorgid = res.data.header.entorgid
        this.formData.inbillNo = res.data.header.inbillNo
        this.formData.lastInvoiceDate = res.data.header.lastInvoiceDate
        this.formData.outBillStat = res.data.header.outBillStat
        this.formData.noticeNos = res.data.header.noticeNos
        this.formData.fxzje = res.data.header.fxzje
        this.formData.invFeeType = res.data.header.invFeeType
        this.formData.isRed = res.data.header.isRed
        this.formData.ttRate = res.data.header.ttRate
        this.formData.rzBank = res.data.header.rzBank
        this.formData.flAmtUsd = res.data.header.flAmtUsd
        this.formData.ttCheckAmt =
          res.data.header.ttCheckAmt > 0
            ? -res.data.header.ttCheckAmt
            : res.data.header.ttCheckAmt
        this.loading = false
      }
      // } else {
      //   this.formData = {
      //     ...initFormData
      //   }
      //   this.formData.createUser = this.$store.getters.userCode
      //   this.formData.entid = this.$store.getters.entid
      //   this.lineList = []
      //   this.funds = []
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.btn-group {
  padding: 8px;
  border-bottom: 3px solid #f0f1f5;
}
.max-w {
  /deep/ .el-table .cell {
    white-space: nowrap;
  }
}
.el-form-item {
  width: 100%;
  margin-right: 0;
  // margin-bottom: 1px;
  // /deep/ .el-form-item__error {
  //   display: nonegin
  // }
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

