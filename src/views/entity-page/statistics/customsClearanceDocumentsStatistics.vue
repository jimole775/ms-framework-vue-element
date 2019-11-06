<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <el-input v-model="keyword.factInvoiceNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.pinoNew" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
            <!--<el-button type="text" size="mini" @click="more = !more">-->
            <!--{{ more ? '收起' : '更多' }}-->
            <!--</el-button>-->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- <el-button-group>
    <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
    </el-button-group> -->
    <template>
      <el-table
        :data="tableData"
        :loading="loading"
        border
        class="m-t-12"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号"/>
        <el-table-column
          show-overflow-tooltip
          prop="factInvoiceNo"
          sortable
          label="发票号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="pinoNew"
          sortable
          label="合同号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="orgName"
          sortable
          label="业务部门"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="custName"
          sortable
          label="客户"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="paymentTypeName"
          sortable
          label="付款方式"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="cutDate"
          sortable
          label="截关日期"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.cutDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="createDate"
          sortable
          label="制单日期"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.createDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="checkTime"
          sortable
          label="业务确认单据日期"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.checkTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="factAmt"
          sortable
          label="非TT金额"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="sendAmt"
          sortable
          label="发货总金额"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="currencyCode"
          sortable
          label="货币单位"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="kcDate"
          sortable
          label="开船日期"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.kcDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="jdDate"
          sortable
          label="交单日期"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.jdDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="jdBank"
          sortable
          label="交单行"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="lcBillNo"
          sortable
          label="信用证号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="jdTotalamt"
          sortable
          label="议付金额"
          min-width="150"
        />
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
import customsClearanceDocumentsStatisticsServer from './../../../api/statistics/customsClearanceDocumentsStatisticsServer'
const initSearchParams = {
  factInvoiceNo: null,
  pinoNew: null,
}
const initExport = {
  factInvoiceNo: '发票号',
  pinoNew: '合同号',
  orgName: '业务部门',
  custName: '客户',
  paymentTypeName: '付款方式',
  cutDate: '截关日期',
  createDate: '制单日期',
  checkTime: '业务确认单据日期',
  factAmt: '非TT金额',
  sendAmt: '发货总金额',
  currencyCode: '货币单位',
  kcDate: '开船日期',
  jdDate: '交单日期',
  jdBank: '交单行',
  lcBillNo: '信用证号',
  jdTotalamt: '议付金额',
}
export default {
  name: 'CustomsClearanceDocumentsStatistics',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
  },
  filters: {
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
      more: true,
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
      const keyword = {
        entid: this.$store.getters.entid,
        ...this.keyword
      }
      const res = await customsClearanceDocumentsStatisticsServer.search({
        query: keyword,
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
          this.filterVal.push(key)
          this.tHeader.push(initExport[key])
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
