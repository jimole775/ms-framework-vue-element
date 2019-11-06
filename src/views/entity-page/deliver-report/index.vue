<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="keyword"
      class="demo-form-inline"
      @keyup.enter.native="commitSearch"
    >
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单据号">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="买方">
            <CustomerSelect v-model="keyword.buyCustomerIds" type="clearable"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="实际发票号">
            <el-input v-model="keyword.factInvoiceNo" size="mini"/>
            <!-- <CommercialInvoiceSelect v-model="keyword.commercialInvoiceIds" type="clearable" /> -->
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <DeliverReportStatusEnumSelect v-model="keyword.status" type="clearable"/>
          </el-form-item>
        </el-col>
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
          min-width="115"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.status | DeliverReportStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.shipmentDate"
          show-overflow-tooltip
          prop="shipmentDate"
          sortable
          min-width="135"
          label="实际出运日期"
        />
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          min-width="160"
          label="单据号"
        />
        <el-table-column
          v-if="eye.orgName"
          show-overflow-tooltip
          prop="orgName"
          sortable
          min-width="160"
          label="业务部门"
        />
        <el-table-column
          v-if="eye.custCode"
          show-overflow-tooltip
          prop="custCode"
          sortable
          min-width="160"
          label="客户编码"
        />
        <el-table-column
          v-if="eye.custName"
          show-overflow-tooltip
          prop="custName"
          sortable
          min-width="160"
          label="客户名称"
        />

        <el-table-column
          v-if="eye.invoiceAmount"
          show-overflow-tooltip
          prop="invoiceAmount"
          sortable
          min-width="140"
          label="发票金额"
        />
        <el-table-column
          v-if="eye.insuranceAmount"
          show-overflow-tooltip
          prop="insuranceAmount"
          sortable
          min-width="140"
          label="投保金额"
        />
        <el-table-column
          v-if="eye.customGoodsCode"
          show-overflow-tooltip
          prop="customGoodsCode"
          sortable
          min-width="130"
          label="海关商品代码"
        />
        <el-table-column
          v-if="eye.customGoodsName"
          show-overflow-tooltip
          prop="customGoodsName"
          sortable
          min-width="130"
          label="海关商品名称"
        />
        <el-table-column
          v-if="eye.goodsName"
          show-overflow-tooltip
          prop="goodsName"
          sortable
          min-width="160"
          label="商品名称"
        />
        <el-table-column
          v-if="eye.trafficcode"
          show-overflow-tooltip
          prop="trafficcode"
          sortable
          min-width="115"
          label="运输方式"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.trafficcode | DeliverReportTransportationModeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.contractPaymentMethod"
          show-overflow-tooltip
          prop="contractPaymentMethod"
          sortable
          min-width="130"
          label="合同支付方式"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.contractPaymentMethod | DeliverReportContractPaymentMethodFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.contractPaymentDeadline"
          show-overflow-tooltip
          prop="contractPaymentDeadline"
          sortable
          min-width="130"
          label="合同支付期限"
        />
        <el-table-column
          v-if="eye.feepaymode"
          show-overflow-tooltip
          prop="feepaymode"
          sortable
          min-width="140"
          label="缴费支付方式"
        >
          <template slot-scope="scope">{{ scope.row.feepaymode | DeliverReportPaymentMethodFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.contractCode"
          show-overflow-tooltip
          prop="contractCode"
          sortable
          min-width="160"
          label="合同号"
        />
        <el-table-column
          v-if="eye.clearanceGoodsCode"
          show-overflow-tooltip
          prop="clearanceGoodsCode"
          sortable
          min-width="160"
          label="报关单号"
        />
        <el-table-column
          v-if="eye.billLadingCode"
          show-overflow-tooltip
          prop="billLadingCode"
          sortable
          min-width="160"
          label="提单号"
        />
        <el-table-column
          v-if="eye.salesman"
          show-overflow-tooltip
          prop="salesman"
          sortable
          min-width="120"
          label="业务员"
        />
        <el-table-column
          v-if="eye.payer"
          show-overflow-tooltip
          prop="payer"
          sortable
          min-width="120"
          label="付款人"
        />
        <el-table-column
          v-if="eye.securityAmount"
          show-overflow-tooltip
          prop="securityAmount"
          sortable
          min-width="130"
          label="保费"
        />
        <el-table-column
          v-if="eye.expenseRatio"
          show-overflow-tooltip
          prop="expenseRatio"
          sortable
          min-width="115"
          label="费率"
        />
        <el-table-column
          v-if="eye.notTtAmount"
          show-overflow-tooltip
          prop="notTtAmount"
          sortable
          min-width="120"
          label="非TT金额"
        />
        <el-table-column
          v-if="eye.specialRemark"
          show-overflow-tooltip
          prop="specialRemark"
          sortable
          min-width="140"
          label="保户特别说明"
        />
        <el-table-column
          v-if="eye.returnReason"
          show-overflow-tooltip
          prop="returnReason"
          sortable
          min-width="140"
          label="退回原因"
        />
        <el-table-column
          v-if="eye.uncertainAmountReason"
          show-overflow-tooltip
          prop="uncertainAmountReason"
          sortable
          min-width="200"
          label="投保金额不一致原因"
        />
        <el-table-column
          v-if="eye.buyerno"
          show-overflow-tooltip
          prop="buyerno"
          sortable
          min-width="160"
          label="买方"
        />
        <el-table-column
          v-if="eye.entid"
          show-overflow-tooltip
          prop="entid"
          sortable
          min-width="160"
          label="经营单位"
        >
          <template slot-scope="scope">{{ scope.row.entid | OperaUnitEnumUtilFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.openAccountBankId"
          show-overflow-tooltip
          prop="openAccountBankId"
          sortable
          min-width="120"
          label="开户银行"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="openOpenAccountBankViewPopup(scope.row.openAccountBankId)"
            >{{ scope.row.openAccountBank ? scope.row.openAccountBank.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.commercialInvoiceId"
          show-overflow-tooltip
          prop="commercialInvoiceId"
          sortable
          min-width="160"
          label="发票号"
        />
        <el-table-column
          v-if="eye.moneyid"
          show-overflow-tooltip
          prop="moneyid"
          sortable
          min-width="140"
          label="出运货币代码"
        />
        <!-- <template slot-scope="scope">
            {{ scope.row.moneyid |  }}
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
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shipmentDate">实际出运日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.code">单据号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orgName">业务部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custCode">客户编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custName">客户名称</el-checkbox>
          </el-col>

          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceAmount">发票金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.insuranceAmount">投保金额</el-checkbox>
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
            <el-checkbox v-model="eye.trafficcode">运输方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractPaymentMethod">合同支付方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractPaymentDeadline">合同支付期限</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.feepaymode">缴费支付方式</el-checkbox>
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
          </el-col>-->
          <el-col :span="24">
            <el-checkbox v-model="eye.buyerno">买方</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entid">经营单位</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.openAccountBankId">开户银行</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.commercialInvoiceId">发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.moneyid">出运货币代码</el-checkbox>
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
      :id="entid"
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
      :id="moneyid"
      @close="showCurrencyViewPopup = false"
    />
  </div>
</template>

<script>
// import Validate from './../../../utils/validate.js'
// import Datetime from './../../../utils/datetime'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import BankArchiveSelect from './../../../components/entity/bank-archive/BankArchiveSelect'
// import CommercialInvoiceSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceSelect'
import CurrencySelect from './../../../components/entity/currency/CurrencySelect'
import DeliverReportStatusEnumSelect from './../../../components/entity/deliver-report/DeliverReportStatusEnumSelect'
import DeliverReportStatusEnumUtil from './../../../components/enum/deliver-report/DeliverReportStatusEnumUtil'
import DeliverReportTransportationModeEnumSelect from './../../../components/entity/deliver-report/DeliverReportTransportationModeEnumSelect'
import DeliverReportTransportationModeEnumUtil from './../../../components/enum/deliver-report/DeliverReportTransportationModeEnumUtil'
import DeliverReportContractPaymentMethodEnumSelect from './../../../components/entity/deliver-report/DeliverReportContractPaymentMethodEnumSelect'
import DeliverReportContractPaymentMethodEnumUtil from './../../../components/enum/deliver-report/DeliverReportContractPaymentMethodEnumUtil'
import DeliverReportPaymentMethodEnumSelect from './../../../components/entity/deliver-report/DeliverReportPaymentMethodEnumSelect'
import DeliverReportPaymentMethodEnumUtil from './../../../components/enum/deliver-report/DeliverReportPaymentMethodEnumUtil'
// import DamageNoticeDamageReasonEnumUtil from './../../../components/enum/damage-notice/DamageNoticeDamageReasonEnumUtil'
import deliverReportServer from './../../../api/deliverReportServer'
const initSearchParams = {
  custCode: null,
  custName: null,
  orgName: null,
  code: null,
  status: null,
  invoiceAmount: null,
  insuranceAmount: null,
  shipmentDateStart: null,
  shipmentDateEnd: null,
  customGoodsCode: null,
  // customGoodsName: '独立窗式或壁式空气调节器',
  goodsName: null,
  trafficcode: null,
  contractPaymentMethod: null,
  contractPaymentDeadlineStart: null,
  contractPaymentDeadlineEnd: null,
  feepaymode: null,
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
  entid: null,
  openAccountBankIds: [],
  factInvoiceNo: null,
  currencyIds: []
}
const initExport = {
  status: '状态',
  code: '单据号',
  shipmentDate: '实际出运日期',
  orgName: '业务部门',
  custCode: '客户编码',
  custName: '客户名称',

  invoiceAmount: '发票金额',
  insuranceAmount: '投保金额',
  customGoodsCode: '海关商品代码',
  customGoodsName: '海关商品名称',
  goodsName: '商品名称',
  trafficcode: '运输方式',
  contractPaymentMethod: '合同支付方式',
  contractPaymentDeadline: '合同支付期限',
  feepaymode: '缴费支付方式',
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
  buyerno: '买方',
  entid: '经营单位',
  openAccountBank: '开户银行',
  commercialInvoice: '发票号',
  currency: '出运货币代码'
}
export default {
  name: 'DeliverReportManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CustomerSelect,
    CustomerViewPopup: () => import('./../customer/customerViewPopup'),
    DepartmentSelect,
    DepartmentViewPopup: () => import('./../department/departmentViewPopup'),
    BankArchiveSelect,
    BankArchiveViewPopup: () =>
      import('./../bank-archive/bankArchiveViewPopup'),
    // CommercialInvoiceSelect,
    CommercialInvoiceViewPopup: () =>
      import('./../commercial-invoice/commercialInvoiceViewPopup'),
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
    DeliverReportTransportationModeFilter:
      DeliverReportTransportationModeEnumUtil.toTitleFilter,
    DeliverReportContractPaymentMethodFilter:
      DeliverReportContractPaymentMethodEnumUtil.toTitleFilter,
    DeliverReportPaymentMethodFilter:
      DeliverReportPaymentMethodEnumUtil.toTitleFilter,
    OperaUnitEnumUtilFilter: OperaUnitEnumUtil.toTitleFilter
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
      showBuyCustomerViewPopup: false,
      customerId: null,
      showDepartmentViewPopup: false,
      entid: null,
      showOpenAccountBankViewPopup: false,
      bankArchiveId: null,
      showCommercialInvoiceViewPopup: false,
      commercialInvoiceId: null,
      showCurrencyViewPopup: false,
      moneyid: null,
      more: false,
      eye: {
        orgName: true,
        custCode: true,
        custName: true,
        code: true,
        status: true,
        invoiceAmount: true,
        insuranceAmount: true,
        shipmentDate: true,
        customGoodsCode: true,
        customGoodsName: true,
        goodsName: true,
        trafficcode: true,
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
        buyerno: true,
        entid: true,
        openAccountBankId: true,
        commercialInvoiceId: true,
        moneyid: true
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
      this.keyword.entid = this.$store.getters.entid
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
      const code = val.corpserialid
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
      const code = row.corpserialid
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
        item.status = DeliverReportStatusEnumUtil.toTitleFilter(item.status)
        item.trafficcode = DeliverReportTransportationModeEnumUtil.toTitleFilter(item.trafficcode)
        item.entid = OperaUnitEnumUtil.toTitleFilter(item.entid)
        // item.damageReason = DamageNoticeDamageReasonEnumUtil.toTitleFilter(item.damageReason)
        // item.entid = OperaUnitEnumUtil.toTitleFilter(item.entid)
        // item.troverflag = item.troverflag ? '是' : '否'
        // item.financeflag = item.financeflag ? '是' : '否'
        // item.ifinsuranturge = item.ifinsuranturge ? '是' : '否'
        // item.detainflag = item.detainflag ? '是' : '否'
        // item.ifbankurge = item.ifbankurge ? '是' : '否'
        // item.ifarf = item.ifarf ? '是' : '否'
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
    openBuyCustomerViewPopup(id) {
      this.customerId = id
      this.showBuyCustomerViewPopup = true
    },
    openDepartmentViewPopup(id) {
      this.entid = id
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
      this.moneyid = id
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
