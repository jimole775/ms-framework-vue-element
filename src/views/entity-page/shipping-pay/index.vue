<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单据号">
            <el-input v-model="keyword.code" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年份月份起始">
            <el-date-picker
              v-model="keyword.yearMonthStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年份月份结束">
            <el-date-picker
              v-model="keyword.yearMonthEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <FreightPayStatusEnumSelect v-model="keyword.status" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申请日期起始">
            <el-date-picker
              v-model="keyword.applyDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申请日期结束">
            <el-date-picker
              v-model="keyword.applyDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单人">
            <el-input v-model="keyword.createOrderMan" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="应付总额">
            <el-input v-model="keyword.amount" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="财务复核总额">
            <el-input v-model="keyword.verifyAmount" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="凭证号">
            <el-input v-model="keyword.credentials" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="供应商">
            <el-input v-model="keyword.supplier" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="银行码">
            <el-input v-model="keyword.bankCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="帐号">
            <el-input v-model="keyword.account" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="持有人">
            <el-input v-model="keyword.bankAccountMan" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开户银行">
            <el-input v-model="keyword.createAccountBank" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="费用类型">
            <el-input v-model="keyword.costType" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="付款方式">
            <ShippingPayPaymentMethodEnumSelect v-model="keyword.paymentMethod" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同编号">
            <el-input v-model="keyword.contractCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="支付公司">
            <ShippingPayPayCompanyEnumSelect v-model="keyword.payCompany" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="协议货代">
            <ShippingCompanySelect v-model="keyword.shippingCompanyIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="币种">
            <CurrencySelect v-model="keyword.currencyIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="经营单位">
            <OperateUnitSelect v-model="keyword.operateUnitIds" type="multiple" />
          </el-form-item>
        </el-col>
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
      >
        <el-table-column
          type="selection"
          width="55" />
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          label="单据号" />
        <el-table-column
          v-if="eye.yearMonth"
          show-overflow-tooltip
          prop="yearMonth"
          sortable
          label="年份月份">
          <template slot-scope="scope">
            {{ scope.row.yearMonth | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          sortable
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | FreightPayStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.applyDate"
          show-overflow-tooltip
          prop="applyDate"
          sortable
          label="申请日期">
          <template slot-scope="scope">
            {{ scope.row.applyDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.createOrderMan"
          show-overflow-tooltip
          prop="createOrderMan"
          sortable
          label="制单人" />
        <el-table-column
          v-if="eye.amount"
          show-overflow-tooltip
          prop="amount"
          sortable
          label="应付总额" />
        <el-table-column
          v-if="eye.verifyAmount"
          show-overflow-tooltip
          prop="verifyAmount"
          sortable
          label="财务复核总额" />
        <el-table-column
          v-if="eye.credentials"
          show-overflow-tooltip
          prop="credentials"
          sortable
          label="凭证号" />
        <el-table-column
          v-if="eye.supplier"
          show-overflow-tooltip
          prop="supplier"
          sortable
          label="供应商" />
        <el-table-column
          v-if="eye.bankCode"
          show-overflow-tooltip
          prop="bankCode"
          sortable
          label="银行码" />
        <el-table-column
          v-if="eye.account"
          show-overflow-tooltip
          prop="account"
          sortable
          label="帐号" />
        <el-table-column
          v-if="eye.bankAccountMan"
          show-overflow-tooltip
          prop="bankAccountMan"
          sortable
          label="持有人" />
        <el-table-column
          v-if="eye.createAccountBank"
          show-overflow-tooltip
          prop="createAccountBank"
          sortable
          label="开户银行" />
        <el-table-column
          v-if="eye.costType"
          show-overflow-tooltip
          prop="costType"
          sortable
          label="费用类型" />
        <el-table-column
          v-if="eye.paymentMethod"
          show-overflow-tooltip
          prop="paymentMethod"
          sortable
          label="付款方式">
          <template slot-scope="scope">
            {{ scope.row.paymentMethod | ShippingPayPaymentMethodFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.budget"
          show-overflow-tooltip
          prop="budget"
          sortable
          label="是否预算内付款">
          <template slot-scope="scope">
            <el-tag :type="scope.row.budget === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.budget }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.contractCode"
          show-overflow-tooltip
          prop="contractCode"
          sortable
          label="合同编号" />
        <el-table-column
          v-if="eye.payCompany"
          show-overflow-tooltip
          prop="payCompany"
          sortable
          label="支付公司">
          <template slot-scope="scope">
            {{ scope.row.payCompany | ShippingPayPayCompanyFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          sortable
          label="备注" />
        <el-table-column
          v-if="eye.isDelete"
          show-overflow-tooltip
          prop="isDelete"
          sortable
          label="是否删除">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDelete === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isDelete }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.shippingCompanyId"
          show-overflow-tooltip
          prop="shippingCompanyId"
          sortable
          label="协议货代">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openShippingCompanyViewPopup(scope.row.shippingCompanyId)">{{ scope.row.shippingCompany ? scope.row.shippingCompany.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.currencyId"
          show-overflow-tooltip
          prop="currencyId"
          sortable
          label="币种">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openCurrencyViewPopup(scope.row.currencyId)">{{ scope.row.currency ? scope.row.currency.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.operateUnitId"
          show-overflow-tooltip
          prop="operateUnitId"
          sortable
          label="经营单位">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openOperateUnitViewPopup(scope.row.operateUnitId)">{{ scope.row.operateUnit ? scope.row.operateUnit.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="clickViewBtn(scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="clickEditBtn(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
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
            <el-checkbox v-model="eye.yearMonth">年份月份</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.applyDate">申请日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createOrderMan">制单人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.amount">应付总额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.verifyAmount">财务复核总额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.credentials">凭证号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.supplier">供应商</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bankCode">银行码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.account">帐号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bankAccountMan">持有人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createAccountBank">开户银行</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.costType">费用类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.paymentMethod">付款方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.budget">是否预算内付款</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractCode">合同编号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payCompany">支付公司</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shippingCompanyId">shippingCompanyId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currencyId">currencyId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.operateUnitId">operateUnitId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'ShippingPayViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'ShippingPayEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'ShippingPayDeletePopup'"
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
      v-if="showShippingCompanyViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="shippingCompanyId"
      @close="showShippingCompanyViewPopup = false"
    />
    <component
      v-if="showCurrencyViewPopup"
      :is="'CurrencyViewPopup'"
      :id="currencyId"
      @close="showCurrencyViewPopup = false"
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
import Validate from './../../../utils/validate.js'
import Datetime from './../../../utils/datetime'
import ShippingCompanySelect from './../../../components/entity/shipping-company/ShippingCompanySelect'
import CurrencySelect from './../../../components/entity/currency/CurrencySelect'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import FreightPayStatusEnumSelect from './../../../components/entity/shipping-pay/FreightPayStatusEnumSelect'
import FreightPayStatusEnumUtil from './../../../components/enum/shipping-pay/FreightPayStatusEnumUtil'
import ShippingPayPaymentMethodEnumSelect from './../../../components/entity/shipping-pay/ShippingPayPaymentMethodEnumSelect'
import ShippingPayPaymentMethodEnumUtil from './../../../components/enum/shipping-pay/ShippingPayPaymentMethodEnumUtil'
import ShippingPayPayCompanyEnumSelect from './../../../components/entity/shipping-pay/ShippingPayPayCompanyEnumSelect'
import ShippingPayPayCompanyEnumUtil from './../../../components/enum/shipping-pay/ShippingPayPayCompanyEnumUtil'
import shippingPayServer from './../../../api/shippingPayServer'
const initSearchParams = {
  code: null,
  yearMonthStart: null,
  yearMonthEnd: null,
  status: null,
  applyDateStart: null,
  applyDateEnd: null,
  createOrderMan: null,
  amount: null,
  verifyAmount: null,
  credentials: null,
  supplier: null,
  bankCode: null,
  account: null,
  bankAccountMan: null,
  createAccountBank: null,
  costType: null,
  paymentMethod: null,
  budget: null,
  contractCode: null,
  payCompany: null,
  remark: null,
  isDelete: null,
  shippingCompanyIds: [],
  currencyIds: [],
  operateUnitIds: [],
}
const initExport = {
  code: '单据号',
  yearMonth: '年份月份',
  status: '状态',
  applyDate: '申请日期',
  createOrderMan: '制单人',
  amount: '应付总额',
  verifyAmount: '财务复核总额',
  credentials: '凭证号',
  supplier: '供应商',
  bankCode: '银行码',
  account: '帐号',
  bankAccountMan: '持有人',
  createAccountBank: '开户银行',
  costType: '费用类型',
  paymentMethod: '付款方式',
  budget: '是否预算内付款',
  contractCode: '合同编号',
  payCompany: '支付公司',
  remark: '备注',
  isDelete: '是否删除',
  shippingCompany: '协议货代',
  currency: '币种',
  operateUnit: '经营单位',
}
export default {
  name: 'ShippingPayManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    ShippingCompanySelect,
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    CurrencySelect,
    CurrencyViewPopup: () => import('./../currency/currencyViewPopup'),
    OperateUnitSelect,
    OperateUnitViewPopup: () => import('./../operate-unit/operateUnitViewPopup'),
    FreightPayStatusEnumSelect,
    ShippingPayPaymentMethodEnumSelect,
    ShippingPayPayCompanyEnumSelect,
    ShippingPayViewPopup: () => import('./shippingPayViewPopup.vue'),
    ShippingPayEditPopup: () => import('./shippingPayEditPopup.vue'),
    ShippingPayDeletePopup: () => import('./shippingPayDeletePopup.vue')
  },
  filters: {
    FreightPayStatusFilter: FreightPayStatusEnumUtil.toTitleFilter,
    ShippingPayPaymentMethodFilter: ShippingPayPaymentMethodEnumUtil.toTitleFilter,
    ShippingPayPayCompanyFilter: ShippingPayPayCompanyEnumUtil.toTitleFilter,
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
      showShippingCompanyViewPopup: false,
      shippingCompanyId: null,
      showCurrencyViewPopup: false,
      currencyId: null,
      showOperateUnitViewPopup: false,
      operateUnitId: null,
      more: false,
      eye: {
        code: true,
        yearMonth: true,
        status: true,
        applyDate: true,
        createOrderMan: true,
        amount: true,
        verifyAmount: true,
        credentials: true,
        supplier: true,
        bankCode: true,
        account: true,
        bankAccountMan: true,
        createAccountBank: true,
        costType: true,
        paymentMethod: true,
        budget: true,
        contractCode: true,
        payCompany: true,
        remark: true,
        isDelete: true,
        shippingCompanyId: true,
        currencyId: true,
        operateUnitId: true,
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
      const keyword = this.keyword
      let query = '*:*'
      if (Validate.isNotEmpty(keyword.code)) {
        query += ` AND code:${keyword.code}`
      }
      if (keyword.yearMonthStart) {
        query += ` AND yearMonth:[${Datetime.dateToDateStr(keyword.yearMonthStart)} TO *]`
      }
      if (keyword.yearMonthEnd) {
        query += ` AND yearMonth:[* TO ${Datetime.dateToDateStr(keyword.yearMonthEnd)}]`
      }
      if (keyword.status && keyword.status.length > 0) {
        query += ' AND ('
        keyword.status.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `status:${str}`
        })
        query += ')'
      }
      if (keyword.applyDateStart) {
        query += ` AND applyDate:[${Datetime.dateToDateStr(keyword.applyDateStart)} TO *]`
      }
      if (keyword.applyDateEnd) {
        query += ` AND applyDate:[* TO ${Datetime.dateToDateStr(keyword.applyDateEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.createOrderMan)) {
        query += ` AND createOrderMan:${keyword.createOrderMan}`
      }
      if (Validate.isNotEmpty(keyword.amount)) {
        query += ` AND amount:${keyword.amount}`
      }
      if (Validate.isNotEmpty(keyword.verifyAmount)) {
        query += ` AND verifyAmount:${keyword.verifyAmount}`
      }
      if (Validate.isNotEmpty(keyword.credentials)) {
        query += ` AND credentials:${keyword.credentials}`
      }
      if (Validate.isNotEmpty(keyword.supplier)) {
        query += ` AND supplier:${keyword.supplier}`
      }
      if (Validate.isNotEmpty(keyword.bankCode)) {
        query += ` AND bankCode:${keyword.bankCode}`
      }
      if (Validate.isNotEmpty(keyword.account)) {
        query += ` AND account:${keyword.account}`
      }
      if (Validate.isNotEmpty(keyword.bankAccountMan)) {
        query += ` AND bankAccountMan:${keyword.bankAccountMan}`
      }
      if (Validate.isNotEmpty(keyword.createAccountBank)) {
        query += ` AND createAccountBank:${keyword.createAccountBank}`
      }
      if (Validate.isNotEmpty(keyword.costType)) {
        query += ` AND costType:${keyword.costType}`
      }
      if (keyword.paymentMethod && keyword.paymentMethod.length > 0) {
        query += ' AND ('
        keyword.paymentMethod.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `paymentMethod:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.contractCode)) {
        query += ` AND contractCode:${keyword.contractCode}`
      }
      if (keyword.payCompany && keyword.payCompany.length > 0) {
        query += ' AND ('
        keyword.payCompany.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `payCompany:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.remark)) {
        query += ` AND remark:${keyword.remark}`
      }
      if (keyword.shippingCompanyIds && keyword.shippingCompanyIds.length > 0) {
        query += ' AND ('
        keyword.shippingCompanyIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `shippingCompany.id:${id}`
        })
        query += ')'
      }
      if (keyword.currencyIds && keyword.currencyIds.length > 0) {
        query += ' AND ('
        keyword.currencyIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `currency.id:${id}`
        })
        query += ')'
      }
      if (keyword.operateUnitIds && keyword.operateUnitIds.length > 0) {
        query += ' AND ('
        keyword.operateUnitIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `operateUnit.id:${id}`
        })
        query += ')'
      }
      const res = await shippingPayServer.search({
        query,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
      this.count = res.pagination.count
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
      // this.currentClickRow = row
      // this.showEditPopup = true
      this.$router.push({
        path: './shipping-pay/edit-sublist',
        query: { id: row.id }
      })
    },
    clickAddBtn() {
      // this.currentClickRow = {}
      // this.showEditPopup = true
      this.$router.push({
        path: './shipping-pay/edit-sublist'
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
    openShippingCompanyViewPopup(id) {
      this.shippingCompanyId = id
      this.showShippingCompanyViewPopup = true
    },
    openCurrencyViewPopup(id) {
      this.currencyId = id
      this.showCurrencyViewPopup = true
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
    margin-bottom: 10px;
    /deep/ .el-form-item__label {
      width: 90px;
    }
    /deep/ .el-form-item__content {
      width: calc(100% - 90px);
    }
  }
  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
</style>
