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
          <el-form-item label="交单登记号">
            <el-input v-model="keyword.billNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="商业发票号">
            <el-input v-model="keyword.factInvoiceNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票流水号">
            <el-input v-model="keyword.invoiceNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.pinoNew" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="交单人">
            <el-input v-model="keyword.jdMan" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单状态">
            <SubmitOrderStatusEnumSelect v-model="keyword.jdStat"/>
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
          v-if="eye.stat"
          show-overflow-tooltip
          prop="stat"
          sortable
          min-width="120"
          label="单据状态"
        >
          <template slot-scope="scope">{{ scope.row.stat | SubmitOrderOrderStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.jdStat"
          show-overflow-tooltip
          prop="jdStat"
          sortable
          min-width="120"
          label="制单状态"
        >
          <template slot-scope="scope">{{ scope.row.jdStat | SubmitOrderStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.billNo"
          show-overflow-tooltip
          prop="billNo"
          sortable
          min-width="145"
          label="交单登记号"
        />
        <el-table-column
          v-if="eye.orgName"
          show-overflow-tooltip
          prop="orgName"
          sortable
          min-width="120"
          label="部门"
        />
        <el-table-column
          v-if="eye.jdInvoiceNo"
          show-overflow-tooltip
          prop="jdInvoiceNo"
          sortable
          min-width="120"
          label="交单发票号"
        />
        <el-table-column
          v-if="eye.pinoNew"
          show-overflow-tooltip
          prop="pinoNew"
          sortable
          min-width="120"
          label="合同号"
        />
        <el-table-column
          v-if="eye.custName"
          show-overflow-tooltip
          prop="custName"
          sortable
          min-width="120"
          label="客户"
        />
        <el-table-column
          v-if="eye.filePlace"
          show-overflow-tooltip
          prop="filePlace"
          sortable
          min-width="140"
          label="文件归档信息"
        />
        <el-table-column
          v-if="eye.paymentTypeId"
          show-overflow-tooltip
          prop="paymentTypeName"
          sortable
          min-width="120"
          label="付款方式"
        />
        <el-table-column
          v-if="eye.kcDate"
          show-overflow-tooltip
          prop="kcDate"
          sortable
          min-width="120"
          label="开船日期"
        >
          <template slot-scope="scope">{{ scope.row.kcDate | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.jdDate"
          show-overflow-tooltip
          prop="jdDate"
          sortable
          min-width="120"
          label="交单时间"
        >
          <template slot-scope="scope">{{ scope.row.jdDate | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.jdBank"
          show-overflow-tooltip
          prop="jdBank"
          sortable
          min-width="120"
          label="交单行"
        />
        <el-table-column
          v-if="eye.lcBillId"
          show-overflow-tooltip
          prop="lcNo"
          sortable
          min-width="120"
          label="信用证号"
        />
        <el-table-column
          v-if="eye.jdTotalamt"
          show-overflow-tooltip
          prop="jdTotalamt"
          sortable
          min-width="120"
          label="交单金额"
        />
        <el-table-column
          v-if="eye.bankOrder"
          show-overflow-tooltip
          prop="bankOrder"
          sortable
          min-width="130"
          label="银行通知编号"
        />
        <el-table-column
          v-if="eye.cdDate"
          show-overflow-tooltip
          prop="cdDate"
          sortable
          min-width="120"
          label="承兑日期"
        >
          <template slot-scope="scope">{{ scope.row.cdDate | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.returnDate"
          show-overflow-tooltip
          prop="returnDate"
          sortable
          min-width="120"
          label="收汇日期"
        >
          <template slot-scope="scope">{{ scope.row.returnDate | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.returnAmt"
          show-overflow-tooltip
          prop="returnAmt"
          sortable
          min-width="120"
          label="收汇金额"
        />
        <el-table-column
          v-if="eye.jdMan"
          show-overflow-tooltip
          prop="jdMan"
          sortable
          min-width="120"
          label="交单人"
        />
        <el-table-column
          v-if="eye.rongziTypeName"
          show-overflow-tooltip
          prop="rongziTypeName"
          sortable
          min-width="120"
          label="融资类型"
        />
        <el-table-column
          v-if="eye.rongziBank"
          show-overflow-tooltip
          prop="rongziBank"
          sortable
          min-width="120"
          label="融资银行"
        />
        <el-table-column
          v-if="eye.rongziAmt"
          show-overflow-tooltip
          prop="rongziAmt"
          sortable
          min-width="120"
          label="融资金额"
        />
        <el-table-column
          v-if="eye.rongziLl"
          show-overflow-tooltip
          prop="rongziLl"
          sortable
          min-width="120"
          label="融资利率"
        />
        <el-table-column
          v-if="eye.rongziDate"
          show-overflow-tooltip
          prop="rongziDate"
          sortable
          min-width="120"
          label="融资日期"
        >
          <template slot-scope="scope">{{ scope.row.rongziDate | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.rongziLx"
          show-overflow-tooltip
          prop="rongziLx"
          sortable
          min-width="120"
          label="融资利息"
        />
        <el-table-column
          v-if="eye.invoiceNo"
          show-overflow-tooltip
          prop="invoiceNo"
          sortable
          min-width="120"
          label="发票流水号"
        />
        <el-table-column
          v-if="eye.factInvoiceNo"
          show-overflow-tooltip
          prop="factInvoiceNo"
          sortable
          min-width="120"
          label="商业发票号"
        />
        <el-table-column
          v-if="eye.invoiceAmt"
          show-overflow-tooltip
          prop="invoiceAmt"
          sortable
          min-width="120"
          label="发票金额"
        />
        <el-table-column
          v-if="eye.preReturnDate"
          show-overflow-tooltip
          prop="preReturnDate"
          sortable
          min-width="140"
          label="预计收汇日期"
        >
          <template slot-scope="scope">{{ scope.row.preReturnDate | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.rongziDays"
          show-overflow-tooltip
          prop="rongziDays"
          sortable
          min-width="120"
          label="融资天数"
        />
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
            <el-checkbox v-model="eye.stat">单据状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jdStat">制单状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.billNo">交单登记号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orgName">部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jdInvoiceNo">交单发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.pinoNew">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custName">客户</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.filePlace">文件归档信息</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.paymentTypeName">付款方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.kcDate">开船日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jdDate">交单时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jdBank">交单行</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.lcBillId">信用证号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jdTotalamt">交单金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bankOrder">银行通知编号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cdDate">承兑日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.returnDate">收汇日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.returnAmt">收汇金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jdMan">交单人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.rongziType">融资类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.rongziBank">融资银行</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.rongziAmt">融资金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.rongziLl">融资利率</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.rongziDate">融资日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.rongziLx">融资利息</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceNo">发票流水号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.factInvoiceNo">商业发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceAmt">发票金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.preReturnDate">预计收汇日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.rongziDays">融资天数</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entid">经营单位</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showDeletePopup"
      :is="'SubmitOrderDeletePopup'"
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
  </div>
</template>

<script>
import CommercialInvoiceSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceSelect'
import PersonSelect from './../../../components/entity/person/PersonSelect'
import CreditCertificateSelect from './../../../components/entity/credit-certificate/CreditCertificateSelect'
import BankSelect from './../../../components/entity/bank/BankSelect'
import SubmitOrderOrderStatusEnumSelect from './../../../components/entity/submit-order/SubmitOrderOrderStatusEnumSelect'
import SubmitOrderOrderStatusEnumUtil from './../../../components/enum/submit-order/SubmitOrderOrderStatusEnumUtil'
import SubmitOrderStatusEnumSelect from './../../../components/entity/submit-order/SubmitOrderStatusEnumSelect'
import SubmitOrderStatusEnumUtil from './../../../components/enum/submit-order/SubmitOrderStatusEnumUtil'
import SubmitOrderFinancingTypeEnumSelect from './../../../components/entity/submit-order/SubmitOrderFinancingTypeEnumSelect'
import submitOrderServer from './../../../api/submitOrderServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import Validate from './../../../utils/validate.js'
const initSearchParams = {
  billNo: null,
  factInvoiceNo: null,
  invoiceNo: null,
  pinoNew: null,
  jdMan: null,
  jdStat: null
}
const initExport = {
  stat: '单据状态',
  jdStat: '制单状态',
  billNo: '交单登记号',
  orgName: '部门',
  jdInvoiceNo: '交单发票号',
  pinoNew: '合同号',
  custName: '客户',
  filePlace: '文件归档信息',
  paymentTypeName: '付款方式',
  kcDate: '开船日期',
  jdDate: '交单时间',
  jdBank: '交单行',
  lcBill: '信用证号',
  jdTotalamt: '交单金额',
  bankOrder: '银行通知编号',
  cdDate: '承兑日期',
  returnDate: '收汇日期',
  returnAmt: '收汇金额',
  jdMan: '交单人',
  rongziTypeName: '融资类型',
  rongziBank: '融资银行',
  rongziAmt: '融资金额',
  rongziLl: '融资利率',
  rongziDate: '融资日期',
  rongziLx: '融资利息',
  invoiceNo: '发票流水号',
  factInvoiceNo: '商业发票号',
  preReturnDate: '预计收汇日期',
  rongziDays: '融资天数',
  entid: '经营单位'
}
export default {
  name: 'SubmitOrderManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CommercialInvoiceSelect,
    PersonSelect,
    CreditCertificateSelect,
    BankSelect,
    SubmitOrderOrderStatusEnumSelect,
    SubmitOrderStatusEnumSelect,
    SubmitOrderFinancingTypeEnumSelect,
    SubmitOrderDeletePopup: () => import('./submitOrderDeletePopup.vue')
  },
  filters: {
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
    SubmitOrderOrderStatusFilter: SubmitOrderOrderStatusEnumUtil.toTitleFilter,
    SubmitOrderStatusFilter: SubmitOrderStatusEnumUtil.toTitleFilter
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
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      more: false,
      eye: {
        billNo: true,
        createUser: true,
        createDate: true,
        stat: true,
        factInvoiceNo: true,
        invoiceAmt: true,
        paymentTypeId: true,
        paymentTypeCode: true,
        paymentTypeName: true,
        orgName: true,
        custName: true,
        pinoNew: true,
        qty1: true,
        jdMan: true,
        jdDate: true,
        jdTotalamt: true,
        jdInvoiceNo: true,
        kcDate: true,
        qty2: true,
        ktOrder: true,
        jdStat: true,
        note: true,
        dgDate: true,
        preReturnDate: true,
        jdNote: true,
        filePlace: true,
        tdOrder: true,
        tdDate: true,
        tdReciveDate: true,
        returnDate: true,
        returnAmt: true,
        tbDate: true,
        tbAmt: true,
        notNote: true,
        jdCheck: true,
        kzhBfd: true,
        cdOrder: true,
        kdReciveDate: true,
        qty3: true,
        bankOrder: true,
        cdDate: true,
        rongziType: true,
        rongziTypeName: true,
        rongziBank: true,
        rongziAmt: true,
        rongziLl: true,
        rongziDate: true,
        rongziDays: true,
        rongziLx: true,
        invoiceNo: true,
        lcBillId: true,
        jdBank: true,
        entid: true
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
      const query = {}
      Object.keys(keyword).forEach(key => {
        if (Validate.isNotEmpty(keyword[key])) {
          query[key] = keyword[key]
        }
      })
      const res = await submitOrderServer.search({
        keyword: query,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
      res.data.forEach((item, index) => {
        this.$set(this.tableData, index, item)
      })
      this.count = res.count
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
    handleRowDb(row) {
      this.$router.push({
        path: './submit-order/edit/' + row.billId
      })
    },
    clickAddBtn() {
      this.$router.push({
        path: './submit-order/edit/new'
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
        item.stat = SubmitOrderOrderStatusEnumUtil.toTitleFilter(item.stat)
        item.entid = OperaUnitEnumUtil.toTitleFilter(item.entid)
        item.jdStat = SubmitOrderStatusEnumUtil.toTitleFilter(item.jdStat)
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
