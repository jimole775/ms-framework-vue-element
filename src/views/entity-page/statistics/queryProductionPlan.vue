<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="keyword.startDate"
              value-format="yyyy-MM-dd"
              size="mini"
              class="max-w"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="keyword.endDate"
              value-format="yyyy-MM-dd"
              size="mini"
              class="max-w"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="商检批号">
            <el-input v-model="keyword.batchNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="物料号">
            <el-input v-model="keyword.itemCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户">
            <el-input v-model="keyword.custName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="部门">
            <el-input v-model="keyword.orgName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button v-loading="loading" type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button v-loading="loading" size="mini" @click="resetSearch">重置</el-button>
            <!-- <el-button type="text" size="mini" @click="more = !more">
              {{ more ? '收起' : '更多' }}
            </el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
    <template>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        class="m-t-12"
        style="width: 100%"
      >
        <el-table-column
          show-overflow-tooltip
          prop="sapCodeLine"
          label="销售凭证项目"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="deliveryLine"
          label="交货计划行号"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="itemCode"
          label="物料号"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="shortText"
          label="销售订单项目短文本"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="planlineDate"
          label="计划行日期"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="qty"
          label="已销售单位计的订单数量"
          min-width="180" />
        <el-table-column
          show-overflow-tooltip
          prop="unit"
          label="销售单位"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="orderCode"
          label="订单号"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="planOrder"
          label="计划订单号"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="orderDate"
          label="订单开始日期"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="compDate"
          label="基本完成日期"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="lineQty"
          label="订单项数量"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="receivedQty"
          label="此订单项的收货数量"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="orderPriority"
          label="优先级"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="fevor"
          label="线体"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="werks"
          label="工厂"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="paart"
          label="订单类型"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="dispo"
          label="对订单的MRP控制者"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="inspectionBatchno"
          label="商检批次"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="custCode"
          label="客户编码"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="custName"
          label="客户名称"
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
import PayObjectSelectUtil from './../../../components/enum/expense-record/PayObjectSelectUtil'
import queryProductionPlanServer from './../../../api/statistics/queryProductionPlanServer'
const initSearchParams = {
  startDate: null, 
  endDate: null, 
  batchNo: null, 
  itemCode: null, 
  custName: null,
  orgName: null
}
const initExport = [
  '销售凭证项目',
  '交货计划行号',
  '物料号',
  '销售订单项目短文本',
  '计划行日期',
  '已销售单位计的订单数量',
  '销售单位',
  '订单号',
  '计划订单号',
  '订单开始日期',
  '基本完成日期',
  '订单项数量',
  '此订单项的收获数量',
  '优先级',
  '线体',
  '工厂',
  '订单类型',
  '对订单的MRP控制者',
  '商检批次',
  '客户编码',
  '客户名称'
]
const filterVal = [
  'sapCodeLine',
  'deliveryLine',
  'itemCode',
  'shortText',
  'planlineDate',
  'qty',
  'unit',
  'orderCode',
  'planOrder',
  'orderDate',
  'compDate',
  'lineQty',
  'receivedQty',
  'orderPriority',
  'fevor',
  'werks',
  'paart',
  'dispo',
  'inspectionBatchno',
  'custCode',
  'custName'
]
export default {
  name: 'QueryProductionPlan',
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
      more: false,
      tHeader: [],
      filterVal: [],
      showExportPopup: false
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
      const keyword = {
        ...this.keyword
      }
      const res = await queryProductionPlanServer.search({
        keyword: keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.rows
      this.count = res.page.total
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
    },
    clickExportBtn() {
      this.tHeader = initExport
      this.filterVal = filterVal
      this.dataExport = JSON.parse(JSON.stringify(this.tableData))
      this.showExportPopup = true
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
