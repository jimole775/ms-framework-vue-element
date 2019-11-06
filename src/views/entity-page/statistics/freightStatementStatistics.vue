<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.warnNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="币种">
            <el-input v-model="keyword.currencyCode" size="mini" />
          </el-form-item>
        </el-col> -->
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="货代">
            <el-input v-model="keyword.transitName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.piNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <el-input v-model="keyword.invoiceNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="部门编码">
            <el-input v-model="keyword.orgCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <!-- <el-button type="text" size="mini" @click="more = !more">
              {{ more ? '收起' : '更多' }}
            </el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button-group>
      <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
      <!-- <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button> -->
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
          show-overflow-tooltip
          prop="warnNo"
          sortable
          label="出货预告号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="currencyCode"
          sortable
          label="币种"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="transitName"
          sortable
          label="货代"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="piNo"
          sortable
          label="合同号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="orgCode"
          sortable
          label="部门编码"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="orgName"
          sortable
          label="部门"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="actualShipDate"
          sortable
          label="开航日期"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="seaportInName"
          sortable
          label="目的港"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="invoiceNo"
          sortable
          label="发票号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="payObject"
          sortable
          label="支付对象"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.payObject | PayObjectSelectFilter }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="boxQty"
          sortable
          label="柜量"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="boxPrice"
          sortable
          label="单价"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="sbgAmt"
          sortable
          label="合计金额"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="note"
          sortable
          label="备注"
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
    <el-dialog
      :visible="showEye"
      width="360px"
      title="show-field"
      top="10vh"
      @close="showEye = false"
    >
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnNo">出货预告号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currencyCode">币种</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.transitName">货代</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.piNo">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orgName">部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.actualShipDate">开航日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.seaportInName">目的港</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceNo">发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payObject">支付对象</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.sbgAmt">合计金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.boxQty">柜量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.boxPrice">单价</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.note">备注</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
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
import PayObjectSelectUtil from './../../../components/enum/expense-record/PayObjectSelectUtil'
import freightStatementStatisticsServer from './../../../api/statistics/freightStatementStatisticsServer'
const initSearchParams = {
  transitName: null,
  piNo: null,
  invoiceNo: null,
  orgCode: null,
}
const initExport = {
  warnNo: '出货预告号',
  currencyCode: '币种',
  transitName: '货代',
  piNo: '合同号',
  orgName: '部门',
  actualShipDate: '开航日期',
  seaportInName: '目的港',
  invoiceNo: '发票号',
  payObject: '支付对象',
  sbgAmt: '合计金额',
  boxQty: '柜量',
  boxPrice: '单价',
  note: '备注',
}
export default {
  name: 'FreightStatementStatistics',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
  },
  filters: {
    PayObjectSelectFilter: PayObjectSelectUtil.toTitleFilter,
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
      more: false,
      eye: {
        warnNo: true,
        currencyCode: true,
        transitName: true,
        piNo: true,
        orgName: true,
        actualShipDate: true,
        seaportInName: true,
        invoiceNo: true,
        payObject: true,
        sbgAmt: true,
        boxQty: true,
        boxPrice: true,
        note: true,
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
      const keyword = {
        ...this.keyword
      }
      const res = await freightStatementStatisticsServer.search({
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
      this.dataExport.forEach((item) => {
        item.payObject = PayObjectSelectUtil.toTitleFilter(item.payObject)  
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
