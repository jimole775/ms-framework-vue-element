<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="keyword"
      class="demo-form-inline"
      @keyup.enter.native="commitSearch"
    >
      <el-row>
        <!-- 单据状态，发票流水号，商业发票号，发货通知单号，PI号，合同号，部门名称，客户名称，客户编码，制单人 -->
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票流水号">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="销售部门">
            <!-- @changeData="changeSaleDepartment" -->
            <DepartmentSelect v-model="keyword.saleDepartment" @changeData="changeSaleDepartment"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="业务员">
            <el-input v-model="keyword.salesman" size="mini"/>
            <!-- <TradeDocumenterSelect v-model="keyword.salesman" /> -->
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单据状态">
            <CommercialInvoiceStatusEnumSelect v-model="keyword.status" type="clearable"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="通知单号">
            <el-input v-model="keyword.noticeCode" size="mini"/>
            <!-- <CommercialInvoiceOrderNoSelect v-model="keyword.noticeCode" type="clearable" /> -->
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="PI号">
            <el-input v-model="keyword.piCode" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.contractCode" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="商业发票号">
            <el-input v-model="keyword.commercialInvoiceCode" size="mini"/>
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户">
            <CustomerSelect v-model="keyword.customer" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="提单号">
            <el-input v-model="keyword.submitOrderCode" size="mini" />
          </el-form-item>
        </el-col>-->

        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <el-button type="text" size="mini" @click="more = !more">{{ more ? '收起' : '更多' }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="clickAddBtn"
      >新增</el-button>
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
      show-icon
    />
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
        <el-table-column type="selection" width="55"/>

        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          sortable
          min-width="110"
          label="单据状态"
        >
          <template slot-scope="scope">{{ scope.row.status | CommercialInvoiceStatusFilter }}</template>
        </el-table-column>
        <!-- 新增 -->
        <el-table-column
          v-if="eye.isRed"
          show-overflow-tooltip
          prop="isRed"
          sortable
          min-width="100"
          label="是否红冲"
        >
          <template slot-scope="scope">{{ scope.row.isRed === 1 ? '否' : '是' }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          min-width="170"
          label="发票流水号"
        />
        <el-table-column
          v-if="eye.commercialInvoiceCode"
          show-overflow-tooltip
          prop="commercialInvoiceCode"
          sortable
          min-width="160"
          label="商业发票号"
        />

        <el-table-column
          v-if="eye.noticeCode"
          show-overflow-tooltip
          prop="noticeCode"
          sortable
          min-width="160"
          label="通知单号"
        />
        <el-table-column
          v-if="eye.piCode"
          show-overflow-tooltip
          prop="piCode"
          sortable
          min-width="120"
          label="PI号"
        />
        <el-table-column
          v-if="eye.contractCode"
          show-overflow-tooltip
          prop="contractCode"
          sortable
          min-width="140"
          label="合同号"
        />
        <!-- 新增 -->
        <el-table-column
          v-if="eye.lcNo"
          show-overflow-tooltip
          prop="lcNo"
          sortable
          min-width="160"
          label="信用证号"
        />

        <el-table-column
          v-if="eye.saleDepartment"
          show-overflow-tooltip
          prop="saleDepartment"
          sortable
          min-width="120"
          label="销售部门"
        />
        <el-table-column
          v-if="eye.salesman"
          show-overflow-tooltip
          prop="salesman"
          sortable
          min-width="100"
          label="业务员"
        />

        <el-table-column
          v-if="eye.typeTrade"
          show-overflow-tooltip
          prop="typeTrade"
          sortable
          min-width="120"
          label="贸易类型"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.typeTrade | CommercialInvoiceSplitTradeTypeFilter }}</template>
        </el-table-column>

        <el-table-column
          v-if="eye.shippingMethod"
          show-overflow-tooltip
          prop="shippingMethod"
          sortable
          min-width="120"
          label="发运方式"
        >
          <template slot-scope="scope">{{ scope.row.shippingMethod | ShipTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.customer"
          show-overflow-tooltip
          prop="customer"
          sortable
          min-width="120"
          label="客户"
        />
        <el-table-column
          v-if="eye.currency"
          show-overflow-tooltip
          prop="currency"
          sortable
          min-width="100"
          label="币种"
        />
        <el-table-column
          v-if="eye.paymentMethod"
          show-overflow-tooltip
          prop="paymentMethod"
          sortable
          min-width="120"
          label="付款方式"
        />
        <el-table-column
          v-if="eye.priceAgreement"
          show-overflow-tooltip
          prop="priceAgreement"
          sortable
          min-width="120"
          label="价格条款"
        />
        <el-table-column
          v-if="eye.goodsAmount"
          show-overflow-tooltip
          prop="goodsAmount"
          sortable
          min-width="140"
          label="发货金额"
        />
        <el-table-column
          v-if="eye.invoiceAmount"
          show-overflow-tooltip
          prop="invoiceAmount"
          sortable
          min-width="130"
          label="本次开票总额"
        />
        <el-table-column
          v-if="eye.returnAmount"
          show-overflow-tooltip
          prop="returnAmount"
          sortable
          min-width="120"
          label="回款金额"
        />
        <el-table-column
          v-if="eye.notTtPrice"
          show-overflow-tooltip
          prop="notTtPrice"
          sortable
          min-width="120"
          label="非TT金额"
        />
        <el-table-column
          v-if="eye.untreatedAmount"
          show-overflow-tooltip
          prop="untreatedAmount"
          sortable
          min-width="120"
          label="未核销总额"
        />
        <el-table-column
          v-if="eye.verificationAmount"
          show-overflow-tooltip
          prop="verificationAmount"
          sortable
          min-width="120"
          label="未核销总额"
        />
        <el-table-column
          v-if="eye.verificationComplete"
          show-overflow-tooltip
          prop="verificationComplete"
          sortable
          min-width="120"
          label="已核销完成"
        >
          <template slot-scope="scope">
            {{ scope.row.verificationComplete === 1 ? '否' : '是' }}
            <!-- <el-tag :type="scope.row.verificationComplete === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.verificationComplete }}
            </el-tag>-->
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.orderAmount"
          show-overflow-tooltip
          prop="orderAmount"
          sortable
          min-width="120"
          label="交单总额"
        />
        <el-table-column
          v-if="eye.invoiceValidityTime"
          show-overflow-tooltip
          prop="invoiceValidityTime"
          sortable
          min-width="130"
          label="发票到期日"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.invoiceValidityTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.invoiceRegistrationTime"
          show-overflow-tooltip
          prop="invoiceRegistrationTime"
          sortable
          min-width="140"
          label="发票记账日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.invoiceRegistrationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.deliverTime"
          show-overflow-tooltip
          prop="deliverTime"
          sortable
          min-width="140"
          label="实际出货日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.deliverTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.accountant"
          show-overflow-tooltip
          prop="accountant"
          sortable
          min-width="130"
          label="会计期间"
        />
        <el-table-column
          v-if="eye.toPortTime"
          show-overflow-tooltip
          prop="toPortTime"
          sortable
          min-width="140"
          label="到港日期"
        >
          <template slot-scope="scope">{{ scope.row.toPortTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.submitOrderTime"
          show-overflow-tooltip
          prop="submitOrderTime"
          sortable
          min-width="140"
          label="提单日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.submitOrderTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.predictReturnMoneyTime"
          show-overflow-tooltip
          prop="predictReturnMoneyTime"
          sortable
          min-width="140"
          label="预计回款日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.predictReturnMoneyTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.expressCode"
          show-overflow-tooltip
          prop="expressCode"
          sortable
          min-width="140"
          label="快递单号"
        />
        <el-table-column
          v-if="eye.submitOrderCode"
          show-overflow-tooltip
          prop="submitOrderCode"
          sortable
          min-width="130"
          label="提单号"
        />
        <el-table-column
          v-if="eye.deliveryOrderTime"
          show-overflow-tooltip
          prop="deliveryOrderTime"
          sortable
          min-width="140"
          label="交单日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.deliveryOrderTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.collectMoneyTime"
          show-overflow-tooltip
          prop="collectMoneyTime"
          sortable
          min-width="140"
          label="实际收款日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.collectMoneyTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.deliveryOrderNotConform"
          show-overflow-tooltip
          prop="deliveryOrderNotConform"
          sortable
          min-width="140"
          label="交单不符点"
        />
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          sortable
          min-width="140"
          label="备注"
        />
        <!-- <el-table-column
          v-if="eye.isDelete"
          show-overflow-tooltip
          prop="isDelete"
          sortable
          min-width="120"
          label="是否删除">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDelete === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isDelete }}
            </el-tag>
          </template>
        </el-table-column>-->
        <el-table-column
          v-if="eye.entid"
          show-overflow-tooltip
          prop="entid"
          sortable
          min-width="120"
          label="经营单位"
        >
          <template slot-scope="scope">{{ scope.row.entid | OperaUnitFilter }}</template>
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="clickViewBtn(scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="clickEditBtn(scope.row)">编辑</el-button>
          </template>
        </el-table-column>-->
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
    <el-dialog :visible="showEye" width="360px" title="过滤" top="10vh" @close="showEye = false">
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.code">发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.saleDepartment">销售部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.salesman">业务员</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">单据状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.noticeCode">通知单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.piCode">PI号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractCode">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.typeTrade">贸易类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.commercialInvoiceCode">商业发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shippingMethod">发运方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customer">客户</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currency">币种</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.paymentMethod">付款方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.priceAgreement">价格条款</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.goodsAmount">发货金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceAmount">本次开票总额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.returnAmount">回款金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.notTtPrice">非TT金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.untreatedAmount">未核销总额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.verificationAmount">未核销总额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.verificationComplete">已核销完成</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orderAmount">交单总额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceValidityTime">发票到期日</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceRegistrationTime">发票记账日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.deliverTime">实际出货日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.accountant">会计期间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.toPortTime">到港日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.submitOrderTime">提单日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.predictReturnMoneyTime">预计回款日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.expressCode">快递单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.submitOrderCode">提单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.deliveryOrderTime">交单日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.collectMoneyTime">实际收款日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.deliveryOrderNotConform">交单不符点</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <!-- <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>-->
          <el-col :span="24">
            <el-checkbox v-model="eye.operateUnitId">operateUnitId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'CommercialInvoiceViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'CommercialInvoiceEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'CommercialInvoiceDeletePopup'"
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
      v-if="showOperateUnitViewPopup"
      :is="'OperateUnitViewPopup'"
      :id="operateUnitId"
      @close="showOperateUnitViewPopup = false"
    />
  </div>
</template>

<script>
// import Validate from './../../../utils/validate.js'
// import Datetime from './../../../utils/datetime'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
// import TradeDocumenterSelect from './../../../components/entity/trade-documenter/TradeDocumenterSelect'
import CommercialInvoiceStatusEnumSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceStatusEnumSelect'
import CommercialInvoiceStatusEnumUtil from './../../../components/enum/commercial-invoice/CommercialInvoiceStatusEnumUtil'
import CommercialInvoiceSplitTradeTypeEnumUtil from './../../../components/enum/commercial-invoice-split/CommercialInvoiceSplitTradeTypeEnumUtil.js'
import ShipTypeEnumUtil from './../../../components/enum/customs-bill/ShipTypeEnumUtil.js'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import commercialInvoiceServer from './../../../api/commercialInvoiceServer'
import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
// import CommercialInvoiceOrderNoSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceOrderNoSelect'
const initSearchParams = {
  code: null,
  saleDepartment: null,
  saleDepartmentName: null,
  salesman: null,
  status: null,
  noticeCode: null,
  piCode: null,
  contractCode: null,
  commercialInvoiceCode: null,
  customer: null,
  submitOrderCode: null,
  isRed: null,
  billType: null // 单据类型 1:正常单据 2：红冲单据
}
const initExport = {
  isRed: '是否红冲',
  lcNo: '信用证号',
  code: '发票号', // 商业发票号
  saleDepartment: '销售部门',
  salesman: '业务员',
  status: '单据状态',
  noticeCode: '通知单号',
  piCode: 'PI号',
  contractCode: '合同号',
  typeTrade: '贸易类型',
  commercialInvoiceCode: '商业发票号', // 实际发票号
  shippingMethod: '发运方式',
  customer: '客户',
  currency: '币种',
  paymentMethod: '付款方式',
  priceAgreement: '价格条款',
  goodsAmount: '发货金额',
  invoiceAmount: '本次开票总额',
  returnAmount: '回款金额',
  notTtPrice: '非TT金额',
  untreatedAmount: '未核销总额',
  verificationAmount: '待核销总额',
  ttCheckAmt: '已核销金额', // new
  verificationComplete: '已核销完成',
  orderAmount: '交单总额',
  invoiceValidityTime: '发票到期日',
  invoiceRegistrationTime: '发票记账日期',
  deliverTime: '实际出货日期',
  accountant: '会计期间',
  toPortTime: '到港日期',
  submitOrderTime: '提单日期',
  predictReturnMoneyTime: '预计回款日期',
  expressCode: '快递单号',
  submitOrderCode: '提单号',
  deliveryOrderTime: '交单日期',
  collectMoneyTime: '实际收款日期',
  deliveryOrderNotConform: '交单不符点',
  remark: '备注',
  entid: '经营单位'
}
export default {
  name: 'CommercialInvoiceNeutralizeManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    OperateUnitSelect,
    DepartmentSelect,
    // TradeDocumenterSelect,
    CommercialInvoiceStatusEnumSelect,
    CustomerSelect,
    // CommercialInvoiceOrderNoSelect,
    OperateUnitViewPopup: () =>
      import('./../operate-unit/operateUnitViewPopup'),
    CommercialInvoiceViewPopup: () =>
      import('./../commercial-invoice/commercialInvoiceViewPopup.vue'),
    CommercialInvoiceEditPopup: () =>
      import('./../commercial-invoice/commercialInvoiceEditPopup.vue'),
    CommercialInvoiceDeletePopup: () =>
      import('./../commercial-invoice/commercialInvoiceDeletePopup.vue')
  },
  filters: {
    CommercialInvoiceStatusFilter:
      CommercialInvoiceStatusEnumUtil.toTitleFilter,
    CommercialInvoiceSplitTradeTypeFilter:
      CommercialInvoiceSplitTradeTypeEnumUtil.toTitleFilter,
    ShipTypeFilter: ShipTypeEnumUtil.toTitleFilter,
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter
  },
  inject: ['reload'],
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
      showOperateUnitViewPopup: false,
      operateUnitId: null,
      more: false,
      eye: {
        isRed: true,
        lcNo: true,
        code: true,
        saleDepartment: true,
        salesman: true,
        status: true,
        noticeCode: true,
        piCode: true,
        contractCode: true,
        typeTrade: true,
        commercialInvoiceCode: true,
        shippingMethod: true,
        customer: true,
        currency: true,
        paymentMethod: true,
        priceAgreement: true,
        goodsAmount: true,
        invoiceAmount: true,
        returnAmount: true,
        notTtPrice: true,
        untreatedAmount: true,
        verificationAmount: true,
        verificationComplete: true,
        orderAmount: true,
        invoiceValidityTime: true,
        invoiceRegistrationTime: true,
        deliverTime: true,
        accountant: true,
        toPortTime: true,
        submitOrderTime: true,
        predictReturnMoneyTime: true,
        expressCode: true,
        submitOrderCode: true,
        deliveryOrderTime: true,
        collectMoneyTime: true,
        deliveryOrderNotConform: true,
        remark: true,
        isDelete: true,
        entid: true
      },
      showEye: false
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.search()
    })
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
    handleRowDb(val) {
      const code = val.invoiceId
      this.$router.push({
        path: './commercial-invoice-neutralize/edit/' + code
      })
    },
    changeSaleDepartment(name, code) {
      this.keyword.saleDepartmentName = name
    },
    async search() {
      this.loading = true
      this.multipleSelection = []
      this.keyword.departmentId = this.$store.getters.entid
      this.keyword.billType = 2
      const keyword = this.keyword
      const res = await commercialInvoiceServer.search({
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
    clickViewBtn(row) {
      this.currentClickRow = row
      this.showViewPopup = true
    },
    clickEditBtn(row) {
      this.currentClickRow = row
      this.showEditPopup = true
    },
    clickAddBtn() {
      const code = 'new'
      this.$router.push({
        path: './commercial-invoice-neutralize/edit/' + code
      })
      this.reload()
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
        this.dataExport = JSON.parse(JSON.stringify(this.multipleSelection))
      } else if (this.tableData.length > 0) {
        this.dataExport = JSON.parse(JSON.stringify(this.tableData))
      }
      this.dataExport.forEach(item => {
        item.isRed = item.isRed === 2 ? '是' : '否'
        item.status = CommercialInvoiceStatusEnumUtil.toTitleFilter(item.status)
        item.typeTrade = CommercialInvoiceSplitTradeTypeEnumUtil.toTitleFilter(
          item.typeTrade
        )
        item.shippingMethod = ShipTypeEnumUtil.toTitleFilter(
          item.shippingMethod
        )
        item.verificationComplete =
          item.verificationComplete === 1 ? '否' : '是'
        item.entid = OperaUnitEnumUtil.toTitleFilter(item.entid)
      })
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
    openOperateUnitViewPopup(id) {
      this.operateUnitId = id
      this.showOperateUnitViewPopup = true
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
  margin-bottom: 2px;
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
</style>
