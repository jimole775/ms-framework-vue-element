<template>
  <div class="max-w back">
    <!-- <div class="btn-group">
      <el-button icon="el-icon-position" size="mini">跳转特殊申请单数据</el-button>
      <el-button :disabled="isEdit" type="primary" icon="el-icon-check" size="mini" @click="save">保存</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="refresh">刷新</el-button>
      <el-button v-show="formData.stat === 5" type="danger" size="mini" @click="redDashed">红冲</el-button>
      <el-button :disabled="isEdit" type="primary" size="mini" icon="el-icon-check" @click="submit">提交</el-button>
    </div>-->

    <el-form
      :model="formData"
      :ref="'formData'"
      :rules="rules"
      :loading="loading"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <div class="container m-t-not">
            <el-row>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发票流水号" prop="invoiceNo">
                  <el-input v-model="formData.invoiceNo" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发票流水号" prop="invoiceNo">
                  <ShipmentNoticeSelectPopup v-model="formData.invoiceNo" size="mini" />
                </el-form-item>
              </el-col>-->
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="销售部门" prop="orgName">
                  <el-input v-model="formData.orgName" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="业务员" prop="salesUserId">
                  <el-input v-model="formData.salesUserId" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="单据状态" prop="statName">
                  <CommercialInvoiceStatusEnumSelect
                    v-model="formData.stat"
                    :disabled="true"
                    type="clearable"
                  />
                  <!-- <el-input v-model="formData.stat" disabled size="mini" /> -->
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="通知单号" prop="noticeNo">
                  <!-- <CommercialInvoiceOrderNoSelect v-model="formData.noticeNos" type="clearable" /> -->
                  <!-- <CommercialInvoiceOrderNoSelect v-model="formData.noticeNo" :disabled="true" type="clearable" /> -->
                  <el-input v-model="formData.noticeNo" :disabled="true" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="PI号" prop="piNo">
                  <el-input v-model="formData.piNo" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="合同号" prop="pinoNew">
                  <el-input v-model="formData.pinoNew" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="贸易类型" prop="saleEntType">
                  <!-- <el-input v-model="formData.saleEntType" disabled size="mini" /> -->
                  <CommercialInvoiceSplitTradeTypeEnumSelect
                    v-model="formData.saleEntType"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="商业发票号" required prop="factInvoiceNo">
                  <el-input v-model="formData.factInvoiceNo" :disabled="isEdit" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发运方式" prop="shipType">
                  <!-- <el-input v-model="formData.shipType" disabled size="mini" /> -->
                  <ShipTypeEnumSelect v-model="formData.shipType" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="客户编码" prop="custCode">
                  <el-input v-model="formData.custCode" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="客户名称" prop="custName">
                  <el-input v-model="formData.custName" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="信用证号" prop="lcNo">
                  <!-- 后台暂缺 -->
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
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发货金额" prop="sendAmt">
                  <el-input-number v-model="formData.sendAmt" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="本次开票总额" prop="invoiceAmt">
                  <el-input-number
                    v-model="formData.invoiceAmt"
                    :precision="2"
                    disabled
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="回款金额" prop="yhxAmount">
                  <el-input-number
                    v-model="formData.yhxAmount"
                    :precision="2"
                    disabled
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="非TT金额" prop="noTtAmt">
                  <el-input-number v-model="formData.noTtAmt" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="未核销总额" prop="noTtAmt">
                  <el-input-number v-model="formData.noTtAmt" :precision="2" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="待核销总额" prop="dhxAmount">
                  <el-input-number
                    v-model="formData.dhxAmount"
                    :precision="2"
                    disabled
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="待核销总额" prop="ttAmt">
                  <el-input-number v-model="formData.ttAmt" disabled size="mini" />
                </el-form-item>
              </el-col>-->
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="已核销金额" prop="yhxAmount">
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
                <el-form-item label="交单总额" prop="jdTotalamt">
                  <el-input-number v-model="formData.jdTotalamt" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发票到期日" prop="lastInvoiceDate">
                  <el-date-picker
                    v-model="formData.lastInvoiceDate"
                    :disabled="isEdit"
                    size="mini"
                    class="max-w"
                    type="date"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="发票记账日期" prop="fpjzDate">
                  <el-date-picker
                    v-model="formData.fpjzDate"
                    :disabled="isEdit"
                    size="mini"
                    class="max-w"
                    type="date"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="实际出货日期" prop="actualShipDate">
                  <el-date-picker
                    v-model="formData.actualShipDate"
                    :disabled="isEdit"
                    size="mini"
                    class="max-w"
                    type="date"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="会计期间" required prop="dname">
                  <!-- <el-input v-model="formData.dname" :disabled="isEdit" size="mini" /> -->
                  <CommercialInvoiceAccountingIntervalSelect v-model="formData.dname"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="到港日期" prop="arrivalDate">
                  <el-date-picker
                    v-model="formData.arrivalDate"
                    :disabled="isEdit"
                    size="mini"
                    class="max-w"
                    type="date"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="提单日期" prop="tdDate">
                  <el-date-picker
                    v-model="formData.tdDate"
                    :disabled="isEdit"
                    size="mini"
                    class="max-w"
                    type="date"
                    value-format="yyyy-MM-dd"
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
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="快递单号" prop="ktOrder">
                  <el-input v-model="formData.ktOrder" :disabled="isEdit" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="提单号" prop="tdOrder">
                  <el-input v-model="formData.tdOrder" :disabled="isEdit" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="交单日期" prop="jdDate">
                  <el-date-picker
                    v-model="formData.jdDate"
                    :disabled="isEdit"
                    size="mini"
                    class="max-w"
                    type="date"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="实际收款日期" prop="actualReturnDate">
                  <el-date-picker
                    v-model="formData.actualReturnDate"
                    :disabled="isEdit"
                    size="mini"
                    class="max-w"
                    type="date"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :lg="18" :md="16" :sm="24" :xs="24">
                <el-form-item label="交单不符点" prop="jdNote">
                  <el-input v-model="formData.jdNote" :disabled="isEdit" size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :sm="12" :xs="24">
                <el-form-item label="经营单位" prop="entName">
                  <el-input v-model="formData.entName" disabled size="mini"/>
                </el-form-item>
              </el-col>
              <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <el-form-item class="note-textarea" label="备注" prop="note">
                  <el-input
                    v-model="formData.note"
                    :disabled="isEdit"
                    type="textarea"
                    rows="2"
                    size="mini"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-tabs type="border-card">
              <el-tab-pane label="整机信息">
                <el-table :data="hLineList" class="m-t-12" border>
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

              <el-tab-pane label="产品信息">
                <el-table :data="lineList" class="m-t-12" border>
                  <el-table-column type="index" label="序号" width="50"/>
                  <el-table-column prop="itemHCode" sortable min-width="130" label="整机编码"/>
                  <el-table-column prop="itemHName" sortable min-width="220" label="整机名称"/>
                  <el-table-column prop="feeType" sortable min-width="100" label="费用项目">
                    <template
                      slot-scope="scope"
                    >{{ scope.row.feeType | CommercialInvoiceCostProjectEnumUtilFilter(formData.entid) }}</template>
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
                  <el-table-column prop="invoiceQty" sortable min-width="100" label="开票数量"/>
                  <el-table-column prop="otherAmt" sortable min-width="100" label="开票金额"/>
                  <el-table-column prop="invoiceAmt" sortable min-width="100" label="实际金额"/>
                  <el-table-column prop="jdQty" sortable min-width="100" label="交单数量"/>
                  <el-table-column prop="jdAmt" sortable min-width="100" label="交单金额"/>
                  <el-table-column prop="packStyle" sortable min-width="100" label="箱数"/>
                  <el-table-column prop="volume" sortable min-width="100" label="体积"/>
                  <el-table-column prop="unitGw" sortable min-width="100" label="毛重"/>
                  <el-table-column prop="nw" sortable min-width="100" label="净重"/>
                  <el-table-column prop="noticeNo" sortable min-width="140" label="通知单号"/>
                  <el-table-column prop="lcNo" sortable min-width="130" label="信用证号"/>
                  <el-table-column prop="piNo" sortable min-width="130" label="PI号"/>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="核销明细">
                <el-table :data="funds" class="m-t-12" border>
                  <el-table-column type="index" label="序号" width="50"/>
                  <el-table-column prop="alloNo" sortable min-width="130" label="发货通知单号"/>
                  <el-table-column prop="alloId" sortable min-width="130" label="分配单号"/>
                  <el-table-column prop="otherNo" sortable min-width="130" label="资金系统单号"/>
                  <el-table-column prop="alloAmt" sortable min-width="130" label="本次分配金额"/>
                  <el-table-column prop="createTime" sortable min-width="150" label="制单时间"/>
                  <el-table-column prop="fundsType" sortable min-width="130" label="到款类型">
                    <template slot-scope="scope">
                      <!-- 过滤器 -->
                      {{ scope.row.fundsType | CommercialInvoiceToTypeFilter }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="费用明细">
                <el-table :data="fee" class="m-t-12" border>
                  <el-table-column type="index" label="序号" width="50"/>
                  <el-table-column prop="orderFeeCode" sortable min-width="130" label="订单费用编码"/>
                  <el-table-column prop="orderFeeName" sortable min-width="130" label="订单费用名称"/>
                  <el-table-column prop="noticeFee" sortable min-width="130" label="费用"/>
                  <el-table-column prop="amtFee" sortable min-width="130" label="PI费用"/>
                  <el-table-column prop="noticeNo" sortable min-width="130" label="发货通知单号"/>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="按柜拆分">
                <el-button :disabled="isInputEdit" size="mini" @click="confirmSplit">确认拆分</el-button>
                <el-table :data="splitList" class="m-t-12 ark-break-up" border>
                  <el-table-column type="index" label="序号" width="50"/>
                  <el-table-column prop="orderFeeCode" sortable min-width="150" label="拆分序号">
                    <template slot-scope="scope">
                      <el-input-number
                        v-model="scope.row.splitSeqNo"
                        :disabled="isInputEdit"
                        size="mini"
                      />
                    </template>
                  </el-table-column>

                  <el-table-column prop="itemHCode" sortable min-width="130" label="整机编码"/>
                  <el-table-column prop="itemHName" sortable min-width="130" label="整机名称"/>
                  <el-table-column prop="erpCode" sortable min-width="130" label="Erp产品编号"/>
                  <el-table-column prop="inspectionBatchno" sortable min-width="130" label="商检批次号"/>
                  <el-table-column prop="qty" sortable min-width="130" label="装柜数量"/>
                  <el-table-column prop="seq" sortable min-width="130" label="排柜序号"/>
                  <el-table-column prop="refBoxNo" sortable min-width="130" label="参考柜号"/>
                  <el-table-column prop="actualBoxNo" sortable min-width="130" label="实际柜号"/>
                  <el-table-column prop="factWeight" sortable min-width="130" label="实际重量"/>
                  <el-table-column prop="tdCode" sortable min-width="130" label="提单号"/>
                  <el-table-column prop="packStyle" sortable min-width="130" label="件数"/>
                  <!-- <el-table-column
                    prop="proType"
                    sortable
                    min-width="130"
                  label="机型类别" />-->
                  <el-table-column prop="proType" sortable min-width="130" label="机型类别">
                    <template slot-scope="scope">{{ scope.row.proType | proType }}</template>
                  </el-table-column>
                  <!-- <el-table-column prop="boxType" sortable min-width="130" label="柜型"/> -->
                  <el-table-column prop="boxType" sortable min-width="130" label="柜型">
                    <template slot-scope="scope">{{ scope.row.boxType | boxTypeFilter }}</template>
                  </el-table-column>
                  <el-table-column prop="custItemName" sortable min-width="130" label="客户机型"/>
                  <el-table-column prop="itemName" sortable min-width="130" label="产品名称"/>
                  <el-table-column prop="price" sortable min-width="130" label="单价"/>
                  <el-table-column prop="lineAmt" sortable min-width="130" label="金额"/>
                  <el-table-column prop="totalGw" sortable min-width="130" label="总毛重"/>
                  <el-table-column prop="totalNw" sortable min-width="130" label="总净重"/>
                  <!-- <el-table-column
                    prop="totalTj"
                    sortable
                    min-width="130"
                  label="总体积" />-->
                  <el-table-column prop="lcNo" sortable min-width="130" label="信用证号"/>
                  <el-table-column prop="invoiceNo" sortable min-width="130" label="发票流水号"/>
                  <el-table-column prop="factInvoiceNo" sortable min-width="130" label="发票号"/>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="second">
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="承兑日期" prop="cdDate">
                <el-date-picker
                  v-model="formData.cdDate"
                  :disabled="isEdit"
                  size="mini"
                  class="max-w"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证行不符点" prop="kzhBfd">
                <el-input v-model="formData.kzhBfd" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="国内扣费" prop="guoneiFee">
                <el-input v-model="formData.guoneiFee" size="mini" type="number"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="国外扣费" prop="guowaiFee">
                <el-input v-model="formData.guowaiFee" size="mini" type="number"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="文件归档信息" prop="filePlace">
                <el-input v-model="formData.filePlace" size="mini"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <FileUpload :id="id" :bill-name="'信用证维护'"/>
    </el-form>
  </div>
</template>

<script>
import commercialInvoiceServer from './../../../api/commercialInvoiceServer'
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
import CommercialInvoiceToTypeEnumUtil from './../../../components/enum/commercial-invoice/CommercialInvoiceToTypeEnumUtil'
import CommercialInvoiceSplitTradeTypeEnumSelect from './../../../components/entity/commercial-invoice-split/CommercialInvoiceSplitTradeTypeEnumSelect'
import CommercialInvoiceSplitTradeTypeEnumUtil from './../../../components/enum/commercial-invoice-split/CommercialInvoiceSplitTradeTypeEnumUtil.js'
import CommercialInvoiceStatusEnumSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceStatusEnumSelect'
// import CommercialInvoiceAccountingIntervalSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceAccountingIntervalSelect'
import CommercialInvoiceAccountingIntervalSelect from './ CommercialInvoiceAccountingIntervalSelect'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil.js'
import boxTypeUtil from './../../../components/enum/freight-standard/boxTypeUtil'
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
  noTtAmt: null,
  returnAmt2: null,
  lcRate: null,
  $state: null,
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
  createUser: null,
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
  whxAmount: null, // 未核销总额
  dhxAmount: null, // 待核销总额
  yhxAmount: null, // 已核销金额
}

const emptyFormData = {
  code: null,
  status: null,
  remark: null,
  isDelete: null,
  entid: null,
}

let initFormData = {
  ...headerObj
}

export default {
  name: 'FreightStandardSublistEdit',
  components: {
    OperateUnitSelect,
    ShippingCompanySelect,
    FreightStandardSelect,
    CostProjectSelect,
    FreightStandardStatusEnumSelect,
    ShippingCompanyProxyTypeEnumSelect,
    CommercialInvoiceStatusEnumSelect,
    CommercialInvoiceSplitTradeTypeEnumSelect,
    ShipTypeEnumSelect,
    CommercialInvoiceAccountingIntervalSelect,
    // CommercialInvoiceOrderNoSelect,
    FreightStandardContainerDeletePopup: () => import('./../../../views/entity-page/freight-standard-container/freightStandardContainerDeletePopup.vue'),
    FreightStandardTicketDeletePopup: () => import('./../../../views/entity-page/freight-standard-ticket/freightStandardTicketDeletePopup.vue'),
  },
  filters: {
    // FreightStandardStatusFilter: FreightStandardStatusEnumUtil.toTitleFilter,
    // CommercialInvoiceStatusFilter: CommercialInvoiceStatusEnumUtil.toTitleFilter,
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
    boxTypeFilter: boxTypeUtil.toTitleFilter,
    CommercialInvoiceSplitTradeTypeFilter: CommercialInvoiceSplitTradeTypeEnumUtil.toTitleFilter,
    CommercialInvoiceToTypeFilter: CommercialInvoiceToTypeEnumUtil.toTitleFilter,
    CommercialInvoiceCostProjectEnumUtilFilter: CommercialInvoiceCostProjectEnumUtil.toTitleFilter,
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      activeName: 'first',
      loading: false,
      formData: {
        ...initFormData
      },
      freightStandardTicketsSelection: [],
      thisProjTbStat: 0,
      funds: [], // 核销信息
      fee: [], // 费用信息
      hLineList: [], // 整机信息
      lineList: [], // 产品信息
      splitList: [], // 按柜拆分
      isEdit: true,
      isInputEdit: true,
      rules: {
        dname: [
          // { required: true, message: '不能为空', trigger: 'blur' },
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        factInvoiceNo: [
          // { required: true, message: '不能为空', trigger: 'blur' },
          { required: true, message: '不能为空', trigger: 'change' }
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
        entid: [
        ],
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
    id(val) {
      if (val !== this.initFormData.id) {
        this.getData()
      }
    },
    loading(val) {
      this.$emit('loadingChange', val)
    },
    stat(val) {
      if (val === 5) {
        this.$emit('hideSubmitBtn')
      }
    }
  },
  created() {
    if (this.id) {
      // this.formData.id = this.id
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
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      const res = await commercialInvoiceServer.get(this.id)
      this.thisProjTbStat = res.data.header.tbStat
      this.funds = res.data.funds
      this.fee = res.data.fee
      this.hLineList = res.data.hLineList
      this.lineList = res.data.lineList
      this.splitList = res.data.splitList
      if (res.data.header.stat === 1) {
        this.isEdit = false
        // if (this.splitList.length === 1) {
        //   this.isInputEdit = true
        // } else {
        //   this.isInputEdit = false
        // }
      } else {
        this.isEdit = true
        // this.isInputEdit = true
      }
      if (res.data.header.splitFlag === 2) {
        this.isInputEdit = true
      } else {
        this.isInputEdit = false
      }
      if (res.data.header.stat === 5) {
        this.$emit('isShowHcBtn', true)
      } else {
        this.$emit('isShowHcBtn', false)
      }
      res.data.header.statNmae = CommercialInvoiceStatusEnumUtil.toTitleFilter(res.data.header.stat)
      res.data.header.entName = OperaUnitEnumUtil.toTitleFilter(res.data.header.entid)
      initFormData = res.data.header
      this.formData = {
        ...res.data.header
      }

      let yhx = 0
      if (this.funds) {
        this.funds.forEach(item => {
          if (item.fundsType === '1') {
            yhx += parseFloat(item.alloAmt)
          }
        })
      }
      this.formData.yhxAmount = yhx
      // this.formData.whxAmount = parseFloat(this.formData.invoiceAmt) - yhx
      this.formData.dhxAmount = this.formData.invoiceAmt

      this.loading = false
    },
    async confirmSplit() {
      // 确认拆分
      this.loading = true
      this.splitList.forEach((listItem) => {
        listItem.tbStat = this.thisProjTbStat
      })
      const { data: { code, msg }} = await commercialInvoiceServer.doSplitBox({
        invoiceId: this.formData.invoiceId,
        boxSplitList: this.splitList
      })
      this.isInputEdit = true

      if (Number.parseInt(code) === 200) {
        this.getData()
        this.$message({
          message: msg,
          type: 'success'
        })
      } else {
        this.$message({
          message: msg,
          type: 'warning'
        })
      }
    },
    async save(isSplit) {
      this.loading = true
      const updateSplitList = []
      const insertSplitList = []
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (isSplit) {
              this.splitList.forEach(item => {
                if (item.id) {
                  updateSplitList.push(item)
                } else {
                  insertSplitList.push(item)
                }
              })
            }
            if (this.formData) {
              this.formData.guoneiFee = Number.parseFloat(this.formData.guoneiFee)
              this.formData.guowaiFee = Number.parseFloat(this.formData.guowaiFee)
            }
            const data = {
              dataSet: {
                name: 'data',
                params: {
                  header: {
                    ...this.formData
                  },
                  updateSplitList,
                  insertSplitList
                }
              }
            }
            const res = await commercialInvoiceServer.save(data)
            if (Number.parseInt(res.data.code) === 200) {
              if (/不能重复/.test(res.data.msg)) {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
                this.loading = false
                return reject()
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
              }              
            } else {
              this.$message.error(res.data.msg)
            }

            initFormData = {
              ...this.formData
            }
            if (!isSplit) {
              this.$emit('emitEvent', {
                key: 'update',
                params: {
                  id: this.id
                }
              })
            }
            // this.$message({
            //   message: res.data.msg,
            //   type: 'success'
            // })
            resolve({
              ...this.formData
            })
            this.loading = false
          } else {
            this.loading = false
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
    async del() {
      this.loading = true
      const res = await commercialInvoiceServer.delete(this.formData.invoiceId)
      this.$message({
        message: res.msg,
        type: 'success'
      })
      this.loading = false
      window.eventBus.$emit('closePagePath', '/DZ-manage/invoice-manage/commercial-invoice/edit/' + this.formData.invoiceId)
    },
    submit() {
      alert('submit')
    },
    async redDashed() {
      const keyword = {
        mergingSplitType: 1,
        factInvoiceNo: this.formData.factInvoiceNo
      }
      const res = await commercialInvoiceServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      if (res.data.data.data.length) {
        const code = 'new'
        this.$router.push({
          path: '/DZ-manage/invoice-manage/commercial-invoice-neutralize/edit/' + code,
          query: { no: this.formData.factInvoiceNo }
        })
      } else {
        this.$message({
          message: '此发票已有红冲单据',
          type: 'warning'
        })
      }
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
              path: '/DZ-manage/invoice-manage/irregular-invoice/edit/' + res.data.data,
            })
          } else {
            this.$message({
              message: '没找到对应的特殊申请单数据，无法跳转！',
              type: 'warning'
            })
          }
        }
      }
    },
    async doExport(val, note) {
      if (val === 1) {
        if (this.formData.custCode === '501309' || this.formData.custCode === '502097') {
          window.open(
            encodeURI(
              '/auxhome/sdp/api/1.0.0/exportExcel/doExport?data=' +
                JSON.stringify({
                  methodName: 'invoiceByBillExcelExport',
                  invoiceId: this.formData.invoiceId,
                  note: note,
                  custCode: this.formData.custCode,
                  token: window.localStorage.token
                })
            )
          )
        } else {
          let returnUrl = null
          const res = await commercialInvoiceServer.supportList({
            type: 1,
            invoiceId: this.formData.invoiceId,
            note: note,
          })
          returnUrl = res.data.data.downUrl
          window.open(returnUrl, '_blank')
        }  
      } else if (val === 2) {
        let returnUrl = null
        const res = await commercialInvoiceServer.supportList({
          type: 2,
          invoiceId: this.formData.invoiceId,
          note: note,
        })
        returnUrl = res.data.data.downUrl
        window.open(returnUrl, '_blank')
      } 
    },
    resetData() {
      this.formData = { ...emptyFormData }
      this.funds = []
      this.fee = []
      this.hLineList = []
      this.lineList = []
      this.splitList = []
      this.getData()
    },
    emitEvent({ key }) {
      switch (key) {
        case 'saveFormData':
          this.save()
          break
        case 'startProcess':
          return this.save()
        case 'resetData':
          this.resetData()
          break
        case 'update':
          this.getData()
          break
        case 'hcInvoice':
          // 红冲
          this.redDashed()
          break
        case 'goToSpecialDocuments':
          // 跳转特殊单据
          this.goToSpecialDocuments()
          break
        default:
          break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.btn-group {
  padding: 8px;
  border-bottom: 3px solid #f0f1f5;
}
.el-form-item {
  width: 100%;
  margin-right: 0;
  // margin-bottom: 1px;
  // /deep/ .el-form-item__error {
  // display: none
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
