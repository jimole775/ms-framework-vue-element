<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="交单发票号">
            <el-input v-model="keyword.jdInvoiceNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="交单金额">
            <el-input v-model="keyword.jdAmt" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="币种">
            <CurrencyNameEnumSelect v-model="keyword.currencyName" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="信用证号">
            <el-input v-model="keyword.lcNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="提单号">
            <el-input v-model="keyword.tdOrder" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="提单日期起始">
            <el-date-picker
              v-model="keyword.tdDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="提单日期结束">
            <el-date-picker
              v-model="keyword.tdDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="交单不符点">
            <el-input v-model="keyword.jdNote" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="交单前检查">
            <el-input v-model="keyword.jdCheck" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开证行不符点">
            <el-input v-model="keyword.kzhBfd" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="承兑日期起始">
            <el-date-picker
              v-model="keyword.cdDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="承兑日期结束">
            <el-date-picker
              v-model="keyword.cdDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="银行通知编码">
            <el-input v-model="keyword.bankOrder" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出单单号">
            <el-input v-model="keyword.cdOrder" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="快递签收日期起始">
            <el-date-picker
              v-model="keyword.kdReciveDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="快递签收日期结束">
            <el-date-picker
              v-model="keyword.kdReciveDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.note" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="交单行">
            <BankSelect v-model="keyword.jdBankIds" type="multiple" />
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
          v-if="eye.jdInvoiceNo"
          show-overflow-tooltip
          prop="jdInvoiceNo"
          sortable
          label="交单发票号" />
        <el-table-column
          v-if="eye.jdAmt"
          show-overflow-tooltip
          prop="jdAmt"
          sortable
          label="交单金额" />
        <el-table-column
          v-if="eye.currencyName"
          show-overflow-tooltip
          prop="currencyName"
          sortable
          label="币种">
          <template slot-scope="scope">
            {{ scope.row.currencyName | CurrencyNameFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.lcNo"
          show-overflow-tooltip
          prop="lcNo"
          sortable
          label="信用证号" />
        <el-table-column
          v-if="eye.tdOrder"
          show-overflow-tooltip
          prop="tdOrder"
          sortable
          label="提单号" />
        <el-table-column
          v-if="eye.tdDate"
          show-overflow-tooltip
          prop="tdDate"
          sortable
          label="提单日期">
          <template slot-scope="scope">
            {{ scope.row.tdDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.jdNote"
          show-overflow-tooltip
          prop="jdNote"
          sortable
          label="交单不符点" />
        <el-table-column
          v-if="eye.jdCheck"
          show-overflow-tooltip
          prop="jdCheck"
          sortable
          label="交单前检查" />
        <el-table-column
          v-if="eye.kzhBfd"
          show-overflow-tooltip
          prop="kzhBfd"
          sortable
          label="开证行不符点" />
        <el-table-column
          v-if="eye.cdDate"
          show-overflow-tooltip
          prop="cdDate"
          sortable
          label="承兑日期">
          <template slot-scope="scope">
            {{ scope.row.cdDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.bankOrder"
          show-overflow-tooltip
          prop="bankOrder"
          sortable
          label="银行通知编码" />
        <el-table-column
          v-if="eye.cdOrder"
          show-overflow-tooltip
          prop="cdOrder"
          sortable
          label="出单单号" />
        <el-table-column
          v-if="eye.kdReciveDate"
          show-overflow-tooltip
          prop="kdReciveDate"
          sortable
          label="快递签收日期">
          <template slot-scope="scope">
            {{ scope.row.kdReciveDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.note"
          show-overflow-tooltip
          prop="note"
          sortable
          label="备注" />
        <el-table-column
          v-if="eye.jdBankId"
          show-overflow-tooltip
          prop="jdBankId"
          sortable
          label="交单行">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openJdBankViewPopup(scope.row.jdBankId)">{{ scope.row.jdBank ? scope.row.jdBank.id : '' }}</el-button>
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
            <el-checkbox v-model="eye.jdInvoiceNo">交单发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jdAmt">交单金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currencyName">币种</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.lcNo">信用证号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.tdOrder">提单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.tdDate">提单日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jdNote">交单不符点</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jdCheck">交单前检查</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.kzhBfd">开证行不符点</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cdDate">承兑日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bankOrder">银行通知编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cdOrder">出单单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.kdReciveDate">快递签收日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.note">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jdBankId">jdBankId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'SubmitOrderItemViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'SubmitOrderItemEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'SubmitOrderItemDeletePopup'"
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
      v-if="showJdBankViewPopup"
      :is="'BankViewPopup'"
      :id="jdBankId"
      @close="showJdBankViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import Datetime from './../../../utils/datetime'
import BankSelect from './../../../components/entity/bank/BankSelect'
import CurrencyNameEnumSelect from './../../../components/entity/submit-order-item/CurrencyNameEnumSelect'
import CurrencyNameEnumUtil from './../../../components/enum/submit-order-item/CurrencyNameEnumUtil'
import submitOrderItemServer from './../../../api/submitOrderItemServer'
const initSearchParams = {
  jdInvoiceNo: null,
  jdAmt: null,
  currencyName: null,
  lcNo: null,
  tdOrder: null,
  tdDateStart: null,
  tdDateEnd: null,
  jdNote: null,
  jdCheck: null,
  kzhBfd: null,
  cdDateStart: null,
  cdDateEnd: null,
  bankOrder: null,
  cdOrder: null,
  kdReciveDateStart: null,
  kdReciveDateEnd: null,
  note: null,
  jdBankIds: [],
}
const initExport = {
  jdInvoiceNo: '交单发票号',
  jdAmt: '交单金额',
  currencyName: '币种',
  lcNo: '信用证号',
  tdOrder: '提单号',
  tdDate: '提单日期',
  jdNote: '交单不符点',
  jdCheck: '交单前检查',
  kzhBfd: '开证行不符点',
  cdDate: '承兑日期',
  bankOrder: '银行通知编码',
  cdOrder: '出单单号',
  kdReciveDate: '快递签收日期',
  note: '备注',
  jdBank: '交单行',
}
export default {
  name: 'SubmitOrderItemManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    BankSelect,
    BankViewPopup: () => import('./../bank/bankViewPopup'),
    CurrencyNameEnumSelect,
    SubmitOrderItemViewPopup: () => import('./submitOrderItemViewPopup.vue'),
    SubmitOrderItemEditPopup: () => import('./submitOrderItemEditPopup.vue'),
    SubmitOrderItemDeletePopup: () => import('./submitOrderItemDeletePopup.vue')
  },
  filters: {
    CurrencyNameFilter: CurrencyNameEnumUtil.toTitleFilter,
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
      showJdBankViewPopup: false,
      jdBankId: null,
      more: false,
      eye: {
        jdInvoiceNo: true,
        jdAmt: true,
        currencyName: true,
        lcNo: true,
        tdOrder: true,
        tdDate: true,
        jdNote: true,
        jdCheck: true,
        kzhBfd: true,
        cdDate: true,
        bankOrder: true,
        cdOrder: true,
        kdReciveDate: true,
        note: true,
        jdBankId: true,
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
      if (Validate.isNotEmpty(keyword.jdInvoiceNo)) {
        query += ` AND jdInvoiceNo:${keyword.jdInvoiceNo}`
      }
      if (Validate.isNotEmpty(keyword.jdAmt)) {
        query += ` AND jdAmt:${keyword.jdAmt}`
      }
      if (keyword.currencyName && keyword.currencyName.length > 0) {
        query += ' AND ('
        keyword.currencyName.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `currencyName:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.lcNo)) {
        query += ` AND lcNo:${keyword.lcNo}`
      }
      if (Validate.isNotEmpty(keyword.tdOrder)) {
        query += ` AND tdOrder:${keyword.tdOrder}`
      }
      if (keyword.tdDateStart) {
        query += ` AND tdDate:[${Datetime.dateToDateStr(keyword.tdDateStart)} TO *]`
      }
      if (keyword.tdDateEnd) {
        query += ` AND tdDate:[* TO ${Datetime.dateToDateStr(keyword.tdDateEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.jdNote)) {
        query += ` AND jdNote:${keyword.jdNote}`
      }
      if (Validate.isNotEmpty(keyword.jdCheck)) {
        query += ` AND jdCheck:${keyword.jdCheck}`
      }
      if (Validate.isNotEmpty(keyword.kzhBfd)) {
        query += ` AND kzhBfd:${keyword.kzhBfd}`
      }
      if (keyword.cdDateStart) {
        query += ` AND cdDate:[${Datetime.dateToDateStr(keyword.cdDateStart)} TO *]`
      }
      if (keyword.cdDateEnd) {
        query += ` AND cdDate:[* TO ${Datetime.dateToDateStr(keyword.cdDateEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.bankOrder)) {
        query += ` AND bankOrder:${keyword.bankOrder}`
      }
      if (Validate.isNotEmpty(keyword.cdOrder)) {
        query += ` AND cdOrder:${keyword.cdOrder}`
      }
      if (keyword.kdReciveDateStart) {
        query += ` AND kdReciveDate:[${Datetime.dateToDateStr(keyword.kdReciveDateStart)} TO *]`
      }
      if (keyword.kdReciveDateEnd) {
        query += ` AND kdReciveDate:[* TO ${Datetime.dateToDateStr(keyword.kdReciveDateEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.note)) {
        query += ` AND note:${keyword.note}`
      }
      if (keyword.jdBankIds && keyword.jdBankIds.length > 0) {
        query += ' AND ('
        keyword.jdBankIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `jdBank.id:${id}`
        })
        query += ')'
      }
      const res = await submitOrderItemServer.search({
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
    openJdBankViewPopup(id) {
      this.jdBankId = id
      this.showJdBankViewPopup = true
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
