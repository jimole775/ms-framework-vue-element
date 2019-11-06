<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="支付对象">
            <ExpenseRecordItemPayTargetEnumSelect v-model="keyword.payTarget" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <el-input v-model="keyword.invoiceCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票日期起始">
            <el-date-picker
              v-model="keyword.invoiceDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票日期结束">
            <el-date-picker
              v-model="keyword.invoiceDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="费用编码">
            <el-input v-model="keyword.costCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="费用名称">
            <el-input v-model="keyword.costName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="柜数">
            <el-input v-model="keyword.containerNumber" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单柜费用">
            <el-input v-model="keyword.containerCost" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="总费用">
            <el-input v-model="keyword.amount" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="其中税金">
            <el-input v-model="keyword.tax" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="总费用(RMB)">
            <el-input v-model="keyword.amountRmb" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="付款公司">
            <el-input v-model="keyword.paymentCompany" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="原因">
            <el-input v-model="keyword.causes" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="责任人">
            <el-input v-model="keyword.thoseResponsible" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="报告号">
            <el-input v-model="keyword.reportCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="费用登记">
            <ExpenseRecordSelect v-model="keyword.expenseRecordIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="柜型">
            <ContainerSelect v-model="keyword.containerIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="货代公司">
            <ShippingCompanySelect v-model="keyword.freightForwardingCompanyIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="货币">
            <CurrencySelect v-model="keyword.currencyIds" type="multiple" />
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
          v-if="eye.payTarget"
          show-overflow-tooltip
          prop="payTarget"
          sortable
          label="支付对象">
          <template slot-scope="scope">
            {{ scope.row.payTarget | ExpenseRecordItemPayTargetFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.invoiceCode"
          show-overflow-tooltip
          prop="invoiceCode"
          sortable
          label="发票号" />
        <el-table-column
          v-if="eye.invoiceDate"
          show-overflow-tooltip
          prop="invoiceDate"
          sortable
          label="发票日期">
          <template slot-scope="scope">
            {{ scope.row.invoiceDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.costCode"
          show-overflow-tooltip
          prop="costCode"
          sortable
          label="费用编码" />
        <el-table-column
          v-if="eye.costName"
          show-overflow-tooltip
          prop="costName"
          sortable
          label="费用名称" />
        <el-table-column
          v-if="eye.containerNumber"
          show-overflow-tooltip
          prop="containerNumber"
          sortable
          label="柜数" />
        <el-table-column
          v-if="eye.containerCost"
          show-overflow-tooltip
          prop="containerCost"
          sortable
          label="单柜费用" />
        <el-table-column
          v-if="eye.amount"
          show-overflow-tooltip
          prop="amount"
          sortable
          label="总费用" />
        <el-table-column
          v-if="eye.tax"
          show-overflow-tooltip
          prop="tax"
          sortable
          label="其中税金" />
        <el-table-column
          v-if="eye.amountRmb"
          show-overflow-tooltip
          prop="amountRmb"
          sortable
          label="总费用(RMB)" />
        <el-table-column
          v-if="eye.paymentCompany"
          show-overflow-tooltip
          prop="paymentCompany"
          sortable
          label="付款公司" />
        <el-table-column
          v-if="eye.causes"
          show-overflow-tooltip
          prop="causes"
          sortable
          label="原因" />
        <el-table-column
          v-if="eye.thoseResponsible"
          show-overflow-tooltip
          prop="thoseResponsible"
          sortable
          label="责任人" />
        <el-table-column
          v-if="eye.isAdditionalCharge"
          show-overflow-tooltip
          prop="isAdditionalCharge"
          sortable
          label="是否额外费用">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isAdditionalCharge === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isAdditionalCharge }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.reportCode"
          show-overflow-tooltip
          prop="reportCode"
          sortable
          label="报告号" />
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
          v-if="eye.expenseRecordId"
          show-overflow-tooltip
          prop="expenseRecordId"
          sortable
          label="费用登记">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openExpenseRecordViewPopup(scope.row.expenseRecordId)">{{ scope.row.expenseRecord ? scope.row.expenseRecord.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.containerId"
          show-overflow-tooltip
          prop="containerId"
          sortable
          label="柜型">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openContainerViewPopup(scope.row.containerId)">{{ scope.row.container ? scope.row.container.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.freightForwardingCompanyId"
          show-overflow-tooltip
          prop="freightForwardingCompanyId"
          sortable
          label="货代公司">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openFreightForwardingCompanyViewPopup(scope.row.freightForwardingCompanyId)">{{ scope.row.freightForwardingCompany ? scope.row.freightForwardingCompany.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.currencyId"
          show-overflow-tooltip
          prop="currencyId"
          sortable
          label="货币">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openCurrencyViewPopup(scope.row.currencyId)">{{ scope.row.currency ? scope.row.currency.id : '' }}</el-button>
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
            <el-checkbox v-model="eye.payTarget">支付对象</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceCode">发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceDate">发票日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.costCode">费用编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.costName">费用名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.containerNumber">柜数</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.containerCost">单柜费用</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.amount">总费用</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.tax">其中税金</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.amountRmb">总费用(RMB)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.paymentCompany">付款公司</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.causes">原因</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.thoseResponsible">责任人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isAdditionalCharge">是否额外费用</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.reportCode">报告号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.expenseRecordId">expenseRecordId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.containerId">containerId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.freightForwardingCompanyId">freightForwardingCompanyId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currencyId">currencyId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'ExpenseRecordItemViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'ExpenseRecordItemEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'ExpenseRecordItemDeletePopup'"
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
      v-if="showExpenseRecordViewPopup"
      :is="'ExpenseRecordViewPopup'"
      :id="expenseRecordId"
      @close="showExpenseRecordViewPopup = false"
    />
    <component
      v-if="showContainerViewPopup"
      :is="'ContainerViewPopup'"
      :id="containerId"
      @close="showContainerViewPopup = false"
    />
    <component
      v-if="showFreightForwardingCompanyViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="shippingCompanyId"
      @close="showFreightForwardingCompanyViewPopup = false"
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
import Validate from './../../../utils/validate.js'
import Datetime from './../../../utils/datetime'
import ExpenseRecordSelect from './../../../components/entity/expense-record/ExpenseRecordSelect'
import ContainerSelect from './../../../components/entity/container/ContainerSelect'
import ShippingCompanySelect from './../../../components/entity/shipping-company/ShippingCompanySelect'
import CurrencySelect from './../../../components/entity/currency/CurrencySelect'
import ExpenseRecordItemPayTargetEnumSelect from './../../../components/entity/expense-record-item/ExpenseRecordItemPayTargetEnumSelect'
import ExpenseRecordItemPayTargetEnumUtil from './../../../components/enum/expense-record-item/ExpenseRecordItemPayTargetEnumUtil'
import expenseRecordItemServer from './../../../api/expenseRecordItemServer'
const initSearchParams = {
  payTarget: null,
  invoiceCode: null,
  invoiceDateStart: null,
  invoiceDateEnd: null,
  costCode: null,
  costName: null,
  containerNumber: null,
  containerCost: null,
  amount: null,
  tax: null,
  amountRmb: null,
  paymentCompany: null,
  causes: null,
  thoseResponsible: null,
  isAdditionalCharge: null,
  reportCode: null,
  remark: null,
  isDelete: null,
  expenseRecordIds: [],
  containerIds: [],
  freightForwardingCompanyIds: [],
  currencyIds: [],
}
const initExport = {
  payTarget: '支付对象',
  invoiceCode: '发票号',
  invoiceDate: '发票日期',
  costCode: '费用编码',
  costName: '费用名称',
  containerNumber: '柜数',
  containerCost: '单柜费用',
  amount: '总费用',
  tax: '其中税金',
  amountRmb: '总费用(RMB)',
  paymentCompany: '付款公司',
  causes: '原因',
  thoseResponsible: '责任人',
  isAdditionalCharge: '是否额外费用',
  reportCode: '报告号',
  remark: '备注',
  isDelete: '是否删除',
  expenseRecord: '费用登记',
  container: '柜型',
  freightForwardingCompany: '货代公司',
  currency: '货币',
}
export default {
  name: 'ExpenseRecordItemManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    ExpenseRecordSelect,
    ExpenseRecordViewPopup: () => import('./../expense-record/expenseRecordViewPopup'),
    ContainerSelect,
    ContainerViewPopup: () => import('./../container/containerViewPopup'),
    ShippingCompanySelect,
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    CurrencySelect,
    CurrencyViewPopup: () => import('./../currency/currencyViewPopup'),
    ExpenseRecordItemPayTargetEnumSelect,
    ExpenseRecordItemViewPopup: () => import('./expenseRecordItemViewPopup.vue'),
    ExpenseRecordItemEditPopup: () => import('./expenseRecordItemEditPopup.vue'),
    ExpenseRecordItemDeletePopup: () => import('./expenseRecordItemDeletePopup.vue')
  },
  filters: {
    ExpenseRecordItemPayTargetFilter: ExpenseRecordItemPayTargetEnumUtil.toTitleFilter,
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
      showExpenseRecordViewPopup: false,
      expenseRecordId: null,
      showContainerViewPopup: false,
      containerId: null,
      showFreightForwardingCompanyViewPopup: false,
      shippingCompanyId: null,
      showCurrencyViewPopup: false,
      currencyId: null,
      more: false,
      eye: {
        payTarget: true,
        invoiceCode: true,
        invoiceDate: true,
        costCode: true,
        costName: true,
        containerNumber: true,
        containerCost: true,
        amount: true,
        tax: true,
        amountRmb: true,
        paymentCompany: true,
        causes: true,
        thoseResponsible: true,
        isAdditionalCharge: true,
        reportCode: true,
        remark: true,
        isDelete: true,
        expenseRecordId: true,
        containerId: true,
        freightForwardingCompanyId: true,
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
      const keyword = this.keyword
      let query = '*:*'
      if (keyword.payTarget && keyword.payTarget.length > 0) {
        query += ' AND ('
        keyword.payTarget.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `payTarget:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.invoiceCode)) {
        query += ` AND invoiceCode:${keyword.invoiceCode}`
      }
      if (keyword.invoiceDateStart) {
        query += ` AND invoiceDate:[${Datetime.dateToDateStr(keyword.invoiceDateStart)} TO *]`
      }
      if (keyword.invoiceDateEnd) {
        query += ` AND invoiceDate:[* TO ${Datetime.dateToDateStr(keyword.invoiceDateEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.costCode)) {
        query += ` AND costCode:${keyword.costCode}`
      }
      if (Validate.isNotEmpty(keyword.costName)) {
        query += ` AND costName:${keyword.costName}`
      }
      if (Validate.isNotEmpty(keyword.containerNumber)) {
        query += ` AND containerNumber:${keyword.containerNumber}`
      }
      if (Validate.isNotEmpty(keyword.containerCost)) {
        query += ` AND containerCost:${keyword.containerCost}`
      }
      if (Validate.isNotEmpty(keyword.amount)) {
        query += ` AND amount:${keyword.amount}`
      }
      if (Validate.isNotEmpty(keyword.tax)) {
        query += ` AND tax:${keyword.tax}`
      }
      if (Validate.isNotEmpty(keyword.amountRmb)) {
        query += ` AND amountRmb:${keyword.amountRmb}`
      }
      if (Validate.isNotEmpty(keyword.paymentCompany)) {
        query += ` AND paymentCompany:${keyword.paymentCompany}`
      }
      if (Validate.isNotEmpty(keyword.causes)) {
        query += ` AND causes:${keyword.causes}`
      }
      if (Validate.isNotEmpty(keyword.thoseResponsible)) {
        query += ` AND thoseResponsible:${keyword.thoseResponsible}`
      }
      if (Validate.isNotEmpty(keyword.reportCode)) {
        query += ` AND reportCode:${keyword.reportCode}`
      }
      if (Validate.isNotEmpty(keyword.remark)) {
        query += ` AND remark:${keyword.remark}`
      }
      if (keyword.expenseRecordIds && keyword.expenseRecordIds.length > 0) {
        query += ' AND ('
        keyword.expenseRecordIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `expenseRecord.id:${id}`
        })
        query += ')'
      }
      if (keyword.containerIds && keyword.containerIds.length > 0) {
        query += ' AND ('
        keyword.containerIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `container.id:${id}`
        })
        query += ')'
      }
      if (keyword.freightForwardingCompanyIds && keyword.freightForwardingCompanyIds.length > 0) {
        query += ' AND ('
        keyword.freightForwardingCompanyIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `freightForwardingCompany.id:${id}`
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
      const res = await expenseRecordItemServer.search({
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
      this.currentClickRow = row
      this.showEditPopup = true
    },
    clickAddBtn() {
      this.currentClickRow = {}
      this.showEditPopup = true
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
    openExpenseRecordViewPopup(id) {
      this.expenseRecordId = id
      this.showExpenseRecordViewPopup = true
    },
    openContainerViewPopup(id) {
      this.containerId = id
      this.showContainerViewPopup = true
    },
    openFreightForwardingCompanyViewPopup(id) {
      this.shippingCompanyId = id
      this.showFreightForwardingCompanyViewPopup = true
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
