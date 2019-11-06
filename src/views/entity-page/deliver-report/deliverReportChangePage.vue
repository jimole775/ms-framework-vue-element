<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单据号">
            <el-input v-model="keyword.code" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="买方">
            <CustomerSelect v-model="keyword.buyCustomerIds" type="clearable" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <CommercialInvoiceSelect v-model="keyword.commercialInvoiceIds" type="clearable" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <DeliverReportStatusEnumSelect v-model="keyword.status" type="clearable" />            
          </el-form-item>
        </el-col>

        <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票金额">
            <el-input v-model="keyword.invoiceAmount" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="投保金额">
            <el-input v-model="keyword.insuranceAmount" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item class="date-area" label="出运日期">
            <el-date-picker
              v-model="keyword.shipmentDateStart"
              size="mini"
              class="max-w"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出运日期结束">
            <el-date-picker
              v-model="keyword.shipmentDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="海关商品代码">
            <el-input v-model="keyword.customGoodsCode" size="mini" />
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="海关商品名称">
            <el-input v-model="keyword.customGoodsName" :disabled="true" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="商品名称">
            <el-input v-model="keyword.goodsName" :disabled="true" size="mini" />
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="运输方式">
            <DeliverReportTransportationModeEnumSelect v-model="keyword.transportationMode" type="clearable" />            
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同支付方式">
            <DeliverReportContractPaymentMethodEnumSelect v-model="keyword.contractPaymentMethod" type="clearable" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item class="date-area" label="合同支付期限">
            <el-date-picker
              v-model="keyword.contractPaymentDeadlineStart"
              size="mini"
              class="max-w"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同支付期限结束">
            <el-date-picker
              v-model="keyword.contractPaymentDeadlineEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="缴费支付方式">
            <DeliverReportPaymentMethodEnumSelect v-model="keyword.paymentMethod" type="clearable" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.contractCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="报关单号">
            <el-input v-model="keyword.clearanceGoodsCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="提单号">
            <el-input v-model="keyword.billLadingCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="业务员">
            <el-input v-model="keyword.salesman" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="付款人">
            <el-input v-model="keyword.payer" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="保费">
            <el-input v-model="keyword.securityAmount" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="费率">
            <el-input v-model="keyword.expenseRatio" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="非TT金额">
            <el-input v-model="keyword.notTtAmount" size="mini" />
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="保户特别说明">
            <el-input v-model="keyword.specialRemark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="退回原因">
            <el-input v-model="keyword.returnReason" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="投保金额不一致原因">
            <el-input v-model="keyword.uncertainAmountReason" size="mini" />
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="买方">
            <CustomerSelect v-model="keyword.buyCustomerIds" type="clearable" />
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="经营单位">
            <DepartmentSelect v-model="keyword.departmentIds" type="clearable" />
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开户银行">
            <BankArchiveSelect v-model="keyword.openAccountBankIds" type="clearable" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <CommercialInvoiceSelect v-model="keyword.commercialInvoiceIds" type="clearable" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出运货币代码">
            <CurrencySelect v-model="keyword.currencyIds" type="clearable" />
          </el-form-item>
        </el-col> -->
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <el-button type="text" size="mini" @click="more = !more">
              {{ more ? '收起' : '更多' }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button-group>
      <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="clickAddBtn">新增</el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini" @click="clickBatchDeleteBtn">删除</el-button>
    </el-button-group>
    <el-button-group>
      <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
      <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
    </el-button-group>
    <el-alert
      :closable="false"
      :title="`已选中 ${multipleSelection.length} 行数据`"
      class="m-t-12"
      type="info"
      show-icon />
    <template>
      <el-table
        :data="tableData"
        :loading="loading"
        border
        class="m-t-12"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-dblclick="handleRowDb"
      >
        <el-table-column
          type="selection"
          width="55" />
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          min-width="160"
          label="单据号" />
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          sortable
          min-width="115"
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | DeliverReportStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.invoiceAmount"
          show-overflow-tooltip
          prop="invoiceAmount"
          sortable
          min-width="140"
          label="发票金额" />
        <el-table-column
          v-if="eye.insuranceAmount"
          show-overflow-tooltip
          prop="insuranceAmount"
          sortable
          min-width="140"
          label="投保金额" />
        <el-table-column
          v-if="eye.shipmentDate"
          show-overflow-tooltip
          prop="shipmentDate"
          sortable
          min-width="120"
          label="出运日期">
          <template slot-scope="scope">
            {{ scope.row.shipmentDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.customGoodsCode"
          show-overflow-tooltip
          prop="customGoodsCode"
          sortable
          min-width="130"
          label="海关商品代码" />
        <el-table-column
          v-if="eye.customGoodsName"
          show-overflow-tooltip
          prop="customGoodsName"
          sortable
          min-width="130"
          label="海关商品名称" />
        <el-table-column
          v-if="eye.goodsName"
          show-overflow-tooltip
          prop="goodsName"
          sortable
          min-width="160"
          label="商品名称" />
        <el-table-column
          v-if="eye.transportationMode"
          show-overflow-tooltip
          prop="transportationMode"
          sortable
          min-width="115"
          label="运输方式">
          <template slot-scope="scope">
            {{ scope.row.transportationMode | DeliverReportTransportationModeFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.contractPaymentMethod"
          show-overflow-tooltip
          prop="contractPaymentMethod"
          sortable
          min-width="130"
          label="合同支付方式">
          <template slot-scope="scope">
            {{ scope.row.contractPaymentMethod | DeliverReportContractPaymentMethodFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.contractPaymentDeadline"
          show-overflow-tooltip
          prop="contractPaymentDeadline"
          sortable
          min-width="130"
          label="合同支付期限">
          <template slot-scope="scope">
            {{ scope.row.contractPaymentDeadline | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.paymentMethod"
          show-overflow-tooltip
          prop="paymentMethod"
          sortable
          min-width="140"
          label="缴费支付方式">
          <template slot-scope="scope">
            {{ scope.row.paymentMethod | DeliverReportPaymentMethodFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.contractCode"
          show-overflow-tooltip
          prop="contractCode"
          sortable
          min-width="160"
          label="合同号" />
        <el-table-column
          v-if="eye.clearanceGoodsCode"
          show-overflow-tooltip
          prop="clearanceGoodsCode"
          sortable
          min-width="160"
          label="报关单号" />
        <el-table-column
          v-if="eye.billLadingCode"
          show-overflow-tooltip
          prop="billLadingCode"
          sortable
          min-width="160"
          label="提单号" />
        <el-table-column
          v-if="eye.salesman"
          show-overflow-tooltip
          prop="salesman"
          sortable
          min-width="120"
          label="业务员" />
        <el-table-column
          v-if="eye.payer"
          show-overflow-tooltip
          prop="payer"
          sortable
          min-width="120"
          label="付款人" />
        <el-table-column
          v-if="eye.securityAmount"
          show-overflow-tooltip
          prop="securityAmount"
          sortable
          min-width="130"
          label="保费" />
        <el-table-column
          v-if="eye.expenseRatio"
          show-overflow-tooltip
          prop="expenseRatio"
          sortable
          min-width="115"
          label="费率" />
        <el-table-column
          v-if="eye.notTtAmount"
          show-overflow-tooltip
          prop="notTtAmount"
          sortable
          min-width="120"
          label="非TT金额" />
        <el-table-column
          v-if="eye.specialRemark"
          show-overflow-tooltip
          prop="specialRemark"
          sortable
          min-width="140"
          label="保户特别说明" />
        <el-table-column
          v-if="eye.returnReason"
          show-overflow-tooltip
          prop="returnReason"
          sortable
          min-width="140"
          label="退回原因" />
        <el-table-column
          v-if="eye.uncertainAmountReason"
          show-overflow-tooltip
          prop="uncertainAmountReason"
          sortable
          min-width="200"
          label="投保金额不一致原因" />
        <!-- <el-table-column
          v-if="eye.isDelete"
          show-overflow-tooltip
          prop="isDelete"
          sortable
          min-width="115"
          label="是否删除">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDelete === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isDelete }}
            </el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          v-if="eye.buyCustomerId"
          show-overflow-tooltip
          prop="buyCustomerId"
          sortable
          min-width="160"
          label="买方">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openBuyCustomerViewPopup(scope.row.buyCustomerId)">{{ scope.row.buyCustomer ? scope.row.buyCustomer.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.departmentId"
          show-overflow-tooltip
          prop="departmentId"
          sortable
          min-width="160"
          label="经营单位">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openDepartmentViewPopup(scope.row.departmentId)">{{ scope.row.department ? scope.row.department.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.openAccountBankId"
          show-overflow-tooltip
          prop="openAccountBankId"
          sortable
          min-width="120"
          label="开户银行">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openOpenAccountBankViewPopup(scope.row.openAccountBankId)">{{ scope.row.openAccountBank ? scope.row.openAccountBank.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.commercialInvoiceId"
          show-overflow-tooltip
          prop="commercialInvoiceId"
          sortable
          min-width="160"
          label="发票号">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openCommercialInvoiceViewPopup(scope.row.commercialInvoiceId)">{{ scope.row.commercialInvoice ? scope.row.commercialInvoice.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.currencyId"
          show-overflow-tooltip
          prop="currencyId"
          sortable
          min-width="140"
          label="出运货币代码">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openCurrencyViewPopup(scope.row.currencyId)">{{ scope.row.currency ? scope.row.currency.id : '' }}</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="clickViewBtn(scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="clickEditBtn(scope.row)">编辑</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </template>
    <div class="m-w cen-box m-t-12">
      <el-pagination
        :current-page="page"
        :page-sizes="pageSize"
        :page-size="size"
        :total="count"
        :layout="windowWidth < 768 ? 'total, jumper' : 'total, sizes, prev, pager, next, jumper'"
        @size-change="pageSizeChange"
        @current-change="pageNumberChange"
      />
    </div>
    <el-dialog
      :visible="showEye"
      width="360px"
      title="过滤"
      top="10vh"
      @close="showEye = false"
    >
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.code">单据号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceAmount">发票金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.insuranceAmount">投保金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shipmentDate">出运日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customGoodsCode">海关商品代码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customGoodsName">海关商品名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.goodsName">商品名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.transportationMode">运输方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractPaymentMethod">合同支付方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractPaymentDeadline">合同支付期限</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.paymentMethod">缴费支付方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractCode">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.clearanceGoodsCode">报关单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.billLadingCode">提单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.salesman">业务员</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payer">付款人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.securityAmount">保费</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.expenseRatio">费率</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.notTtAmount">非TT金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.specialRemark">保户特别说明</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.returnReason">退回原因</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.uncertainAmountReason">投保金额不一致原因</el-checkbox>
          </el-col>
          <!-- <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col> -->
          <el-col :span="24">
            <el-checkbox v-model="eye.buyCustomerId">buyCustomerId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.departmentId">departmentId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.openAccountBankId">openAccountBankId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.commercialInvoiceId">commercialInvoiceId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currencyId">currencyId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'DeliverReportViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'DeliverReportEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'DeliverReportDeletePopup'"
      :list="multipleSelection"
      @close="showDeletePopup = false"
      @update="update"
    />
    <component
      v-if="showExportPopup"
      :is="'ExportPopup'"
      :list="dataExport"
      :t-header="tHeader"
      :filter-val="filterVal"
      @close="showExportPopup = false"
    />
    <component
      v-if="showBuyCustomerViewPopup"
      :is="'CustomerViewPopup'"
      :id="customerId"
      @close="showBuyCustomerViewPopup = false"
    />
    <component
      v-if="showDepartmentViewPopup"
      :is="'DepartmentViewPopup'"
      :id="departmentId"
      @close="showDepartmentViewPopup = false"
    />
    <component
      v-if="showOpenAccountBankViewPopup"
      :is="'BankArchiveViewPopup'"
      :id="bankArchiveId"
      @close="showOpenAccountBankViewPopup = false"
    />
    <component
      v-if="showCommercialInvoiceViewPopup"
      :is="'CommercialInvoiceViewPopup'"
      :id="commercialInvoiceId"
      @close="showCommercialInvoiceViewPopup = false"
    />
    <component
      v-if="showCurrencyViewPopup"
      :is="'CurrencyViewPopup'"
      :id="currencyId"
      @close="showCurrencyViewPopup = false"
    />
  </div>
</template>

<script>
// import Validate from './../../../utils/validate.js'
// import Datetime from './../../../utils/datetime'
import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import BankArchiveSelect from './../../../components/entity/bank-archive/BankArchiveSelect'
import CommercialInvoiceSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceSelect'
import CurrencySelect from './../../../components/entity/currency/CurrencySelect'
import DeliverReportStatusEnumSelect from './../../../components/entity/deliver-report/DeliverReportStatusEnumSelect'
import DeliverReportStatusEnumUtil from './../../../components/enum/deliver-report/DeliverReportStatusEnumUtil'
import DeliverReportTransportationModeEnumSelect from './../../../components/entity/deliver-report/DeliverReportTransportationModeEnumSelect'
import DeliverReportTransportationModeEnumUtil from './../../../components/enum/deliver-report/DeliverReportTransportationModeEnumUtil'
import DeliverReportContractPaymentMethodEnumSelect from './../../../components/entity/deliver-report/DeliverReportContractPaymentMethodEnumSelect'
import DeliverReportContractPaymentMethodEnumUtil from './../../../components/enum/deliver-report/DeliverReportContractPaymentMethodEnumUtil'
import DeliverReportPaymentMethodEnumSelect from './../../../components/entity/deliver-report/DeliverReportPaymentMethodEnumSelect'
import DeliverReportPaymentMethodEnumUtil from './../../../components/enum/deliver-report/DeliverReportPaymentMethodEnumUtil'
import deliverReportServer from './../../../api/deliverReportServer'
const initSearchParams = {
  code: null,
  status: null,
  invoiceAmount: null,
  insuranceAmount: null,
  shipmentDateStart: null,
  shipmentDateEnd: null,
  customGoodsCode: null,
  // customGoodsName: '独立窗式或壁式空气调节器',
  goodsName: null,
  transportationMode: null,
  contractPaymentMethod: null,
  contractPaymentDeadlineStart: null,
  contractPaymentDeadlineEnd: null,
  paymentMethod: null,
  contractCode: null,
  clearanceGoodsCode: null,
  billLadingCode: null,
  salesman: null,
  payer: null,
  securityAmount: null,
  expenseRatio: null,
  notTtAmount: null,
  specialRemark: null,
  returnReason: null,
  uncertainAmountReason: null,
  // isDelete: null,
  buyCustomerIds: null,
  departmentIds: [],
  departmentId: null,
  openAccountBankIds: [],
  commercialInvoiceIds: null,
  currencyIds: [],
}
const initExport = {
  code: '单据号',
  status: '状态',
  invoiceAmount: '发票金额',
  insuranceAmount: '投保金额',
  shipmentDate: '出运日期',
  customGoodsCode: '海关商品代码',
  customGoodsName: '海关商品名称',
  goodsName: '商品名称',
  transportationMode: '运输方式',
  contractPaymentMethod: '合同支付方式',
  contractPaymentDeadline: '合同支付期限',
  paymentMethod: '缴费支付方式',
  contractCode: '合同号',
  clearanceGoodsCode: '报关单号',
  billLadingCode: '提单号',
  salesman: '业务员',
  payer: '付款人',
  securityAmount: '保费',
  expenseRatio: '费率',
  notTtAmount: '非TT金额',
  specialRemark: '保户特别说明',
  returnReason: '退回原因',
  uncertainAmountReason: '投保金额不一致原因',
  // isDelete: '是否删除',
  buyCustomer: '买方',
  department: '经营单位',
  openAccountBank: '开户银行',
  commercialInvoice: '发票号',
  currency: '出运货币代码',
}
export default {
  name: 'DeclareChangeManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CustomerSelect,
    CustomerViewPopup: () => import('./../customer/customerViewPopup'),
    DepartmentSelect,
    DepartmentViewPopup: () => import('./../department/departmentViewPopup'),
    BankArchiveSelect,
    BankArchiveViewPopup: () => import('./../bank-archive/bankArchiveViewPopup'),
    CommercialInvoiceSelect,
    CommercialInvoiceViewPopup: () => import('./../commercial-invoice/commercialInvoiceViewPopup'),
    CurrencySelect,
    CurrencyViewPopup: () => import('./../currency/currencyViewPopup'),
    DeliverReportStatusEnumSelect,
    DeliverReportTransportationModeEnumSelect,
    DeliverReportContractPaymentMethodEnumSelect,
    DeliverReportPaymentMethodEnumSelect,
    DeliverReportViewPopup: () => import('./deliverReportViewPopup.vue'),
    DeliverReportEditPopup: () => import('./deliverReportEditPopup.vue'),
    DeliverReportDeletePopup: () => import('./deliverReportDeletePopup.vue')
  },
  filters: {
    DeliverReportStatusFilter: DeliverReportStatusEnumUtil.toTitleFilter,
    DeliverReportTransportationModeFilter: DeliverReportTransportationModeEnumUtil.toTitleFilter,
    DeliverReportContractPaymentMethodFilter: DeliverReportContractPaymentMethodEnumUtil.toTitleFilter,
    DeliverReportPaymentMethodFilter: DeliverReportPaymentMethodEnumUtil.toTitleFilter,
  },
  data() {
    return {
      loading: false,
      keyword: {
        ...initSearchParams
      },
      page: 1,
      size: 10,
      count: 0,
      pageSize: [10, 20, 30, 40, 50],
      sort: null,
      tableData: [],
      currentClickRow: {},
      multipleSelection: [],
      showViewPopup: false,
      showEditPopup: false,
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      showBuyCustomerViewPopup: false,
      customerId: null,
      showDepartmentViewPopup: false,
      departmentId: null,
      showOpenAccountBankViewPopup: false,
      bankArchiveId: null,
      showCommercialInvoiceViewPopup: false,
      commercialInvoiceId: null,
      showCurrencyViewPopup: false,
      currencyId: null,
      more: false,
      eye: {
        code: true,
        status: true,
        invoiceAmount: true,
        insuranceAmount: true,
        shipmentDate: true,
        customGoodsCode: true,
        customGoodsName: true,
        goodsName: true,
        transportationMode: true,
        contractPaymentMethod: true,
        contractPaymentDeadline: true,
        paymentMethod: true,
        contractCode: true,
        clearanceGoodsCode: true,
        billLadingCode: true,
        salesman: true,
        payer: true,
        securityAmount: true,
        expenseRatio: true,
        notTtAmount: true,
        specialRemark: true,
        returnReason: true,
        uncertainAmountReason: true,
        // isDelete: true,
        buyCustomerId: true,
        departmentId: true,
        openAccountBankId: true,
        commercialInvoiceId: true,
        currencyId: true,
      },
      showEye: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    this.search()
  },
  methods: {
    async search() {
      this.loading = true
      this.multipleSelection = []
      this.keyword.departmentId = this.$store.getters.entid
      const keyword = this.keyword
      const res = await deliverReportServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data.data.data
      res.data.data.data.forEach((item, index) => {
        this.$set(this.tableData, index, item)
      })
      this.count = res.data.data.page.total
      this.$nextTick(() => {
        this.setPageSize()
      })
      this.loading = false
    },
    setPageSize() {
      // 重新设定分页条件
      this.pageSize = []
      for (let i = 1; i < 6; i++) {
        if (this.count > 10 * i) {
          this.pageSize.push(10 * i)
        }
      }
      this.pageSize.push(this.count)
    },
    pageSizeChange(val) {
      this.size = val
      this.page = 1
      this.search()
    },
    pageNumberChange(val) {
      this.page = val
      this.search()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleRowDb(val) {
      const code = val.corpserialno
      this.$router.push({
        path: './deliver-report/edit/' + code
      })
    },
    clickViewBtn(row) {
      this.currentClickRow = row
      this.showViewPopup = true
    },
    clickEditBtn(row) {
      // this.currentClickRow = row
      // this.showEditPopup = true
      const code = row.corpserialno
      this.$router.push({
        path: './deliver-report/edit/' + code
      })
    },
    clickAddBtn() {
      // this.currentClickRow = {}
      // this.showEditPopup = true
      const code = 'new'
      this.$router.push({
        path: './deliver-report/edit/' + code
      })
    },
    clickBatchDeleteBtn() {
      if (this.multipleSelection.length > 0) {
        this.showDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    clickExportBtn() {
      if (this.multipleSelection.length === 0 && this.tableData.length === 0) {
        this.$message({
            message: '请选择要导出的数据',
            showClose: true,
            type: 'warning'
          })
        return false
      }
      if (this.multipleSelection.length > 0) {
        this.dataExport = this.multipleSelection
      } else if (this.tableData.length > 0) {
        this.dataExport = this.tableData
      }
      this.setExportData()
      this.showExportPopup = true
    },
    setExportData() {
      // 设置要导出数据的表头和对应的字段
      // 清空已有表头和对应的字段
      this.tHeader = []
      this.filterVal = []
      // 遍历初始化的导出字段数据
      for (const key in initExport) {
        // 如果这个字段还在展示，就添加到要导出的字段里
        if (this.eye[key]) {
          this.filterVal.push(key)
          this.tHeader.push(initExport[key])
        }
      }
    },
    commitSearch() {
      this.page = 1
      this.search()
    },
    resetSearch() {
      this.keyword = {
        ...initSearchParams
      }
      this.page = 1
      this.search()
    },
    openBuyCustomerViewPopup(id) {
      this.customerId = id
      this.showBuyCustomerViewPopup = true
    },
    openDepartmentViewPopup(id) {
      this.departmentId = id
      this.showDepartmentViewPopup = true
    },
    openOpenAccountBankViewPopup(id) {
      this.bankArchiveId = id
      this.showOpenAccountBankViewPopup = true
    },
    openCommercialInvoiceViewPopup(id) {
      this.commercialInvoiceId = id
      this.showCommercialInvoiceViewPopup = true
    },
    openCurrencyViewPopup(id) {
      this.currencyId = id
      this.showCurrencyViewPopup = true
    },
    update() {
      // 关闭弹窗
      this.showDeletePopup = false
      this.showEditPopup = false
      setTimeout(() => {
        this.search()
      }, 1000)
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
    /deep/ .el-form-item__label {
      width: 100px;
      font-size: 13px;
    }
    /deep/ .el-form-item__content {
      width: calc(100% - 100px);
    }
  }
  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
  .date-area {
    /deep/ .el-range-editor.el-input__inner {
      padding: 3px 4px;
    }
    /deep/ .el-date-editor .el-range-input {
      width: 45%;
    }
    /deep/ .el-date-editor .el-range-separator {
      width: 10%;
    }
    /deep/ .el-date-editor .el-range__close-icon {
      width: 19px;
    }
  }
</style>
