<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年份">
            <el-date-picker
              v-model="keyword.year"
              :clearable="false"
              size="mini"
              class="max-w"
              type="year"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="起始月份">
            <ShippingCapacitySMonthStatEnumSelect v-model="keyword.sMonth" :clearable="false"/>            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="结束月份">
            <ShippingCapacityEMonthStatEnumSelect v-model="keyword.eMonth" :clearable="false"/>            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="统计维度">
            <ShippingCapacityFlagEnumSelect v-model="keyword.flag" :clearable="false"/>            
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
      <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
      <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
    </el-button-group> -->
    <template>
      <el-table
        :data="tableData"
        :loading="loading"
        border
        class="m-t-12"
        style="width: 100%">
        <el-table-column
          show-overflow-tooltip
          prop="sName"
          sortable
          label="协议货代"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="totalqty"
          sortable
          label="合计"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="qty1"
          sortable
          label="预付货代"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="qty2"
          sortable
          label="预付船司"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="qty3"
          sortable
          label="到付指定货代"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="qty4"
          sortable
          label="到付指定船司"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="qty2pro"
          sortable
          label="船司比例"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="qty1pro"
          sortable
          label="货代比例"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="totalprop"
          sortable
          label="预付总占比例"
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
import ShippingCapacitySMonthStatEnumSelect from './../../../components/entity/statistics/shipping-capacity/ShippingCapacitySMonthStatEnumSelect'
import ShippingCapacitySMonthStatEnumUtil from './../../../components/enum/statistics/shipping-capacity/ShippingCapacitySMonthStatEnumUtil'
import ShippingCapacityEMonthStatEnumSelect from './../../../components/entity/statistics/shipping-capacity/ShippingCapacityEMonthStatEnumSelect'
import ShippingCapacityEMonthStatEnumUtil from './../../../components/enum/statistics/shipping-capacity/ShippingCapacityEMonthStatEnumUtil'
import ShippingCapacityFlagEnumSelect from './../../../components/entity/statistics/shipping-capacity/ShippingCapacityFlagEnumSelect'
import ShippingCapacityFlagEnumUtil from './../../../components/enum/statistics/shipping-capacity/ShippingCapacityFlagEnumUtil'
import shippingCapacityStatisticsServer from './../../../api/statistics/shippingCapacityStatisticsServer'
const initSearchParams = {
  year: (new Date()).getFullYear().toString(),
  sMonth: 1,
  eMonth: 12,
  flag: 1,
  sName: null,
  totalqty: null,
  qty1: null,
  qty2: null,
  qty3: null,
  qty4: null,
  qty2pro: null,
  qty1pro: null,
  totalprop: null,
}
const initExport = {
  /* year: '年份',
  sMonth: '起始月份',
  eMonth: '结束月份',
  flag: '统计维度',*/
  sName: '协议货代',
  totalqty: '合计',
  qty1: '预付货代',
  qty2: '预付船司',
  qty3: '到付指定货代',
  qty4: '到付指定船司',
  qty2pro: '船司比例',
  qty1pro: '货代比例',
  totalprop: '预付总占比例',
}
export default {
  name: 'ShippingCapacityStatistics',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    ShippingCapacitySMonthStatEnumSelect,
    ShippingCapacityEMonthStatEnumSelect,
    ShippingCapacityFlagEnumSelect,
  },
  filters: {
    ShippingCapacitySMonthStatFilter: ShippingCapacitySMonthStatEnumUtil.toTitleFilter,
    ShippingCapacityEMonthStatFilter: ShippingCapacityEMonthStatEnumUtil.toTitleFilter,
    ShippingCapacityFlagFilter: ShippingCapacityFlagEnumUtil.toTitleFilter,
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
      const res = await shippingCapacityStatisticsServer.search({
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
        // 如果这个字段还在展示，就添加到要导出的字段里
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
