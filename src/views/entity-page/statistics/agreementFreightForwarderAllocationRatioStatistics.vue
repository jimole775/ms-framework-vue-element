<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="查询日期">
            <el-date-picker v-model="keyword.towingDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" size="mini" @change="commitSearch"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <!-- <el-button size="mini" @click="resetSearch">重置</el-button> -->
            <!-- <el-button type="text" size="mini" @click="more = !more">
              {{ more ? '收起' : '更多' }}
            </el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
    <!-- <el-button-group>
      <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
    </el-button-group> -->
    <template>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        class="m-t-12"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          show-overflow-tooltip
          prop="supplierName"
          sortable
          label="协议货代"
          min-width="180"
        />
        <el-table-column
          show-overflow-tooltip
          prop="stat"
          sortable
          label="状态"
          min-width="80"
        />
        <el-table-column
          show-overflow-tooltip
          prop="allocation"
          sortable
          label="已分配量"
          min-width="100"
        />
        <el-table-column
          show-overflow-tooltip
          prop="towingCabinet"
          sortable
          label="已拖柜"
          min-width="90"
        />
        <el-table-column label="拖柜日期" align="center">
          <el-table-column
            :label="toUTCtime(nextDate(0))"
            show-overflow-tooltip
            prop="towingDate1"
            sortable
            min-width="110"
          />
          <el-table-column
            :label="toUTCtime(nextDate(1))"
            show-overflow-tooltip
            prop="towingDate2"
            sortable
            min-width="110"
          />
          <el-table-column
            :label="toUTCtime(nextDate(2))"
            show-overflow-tooltip
            prop="towingDate3"
            sortable
            min-width="110"
          />
          <el-table-column
            :label="toUTCtime(nextDate(3))"
            show-overflow-tooltip
            prop="towingDate4"
            sortable
            min-width="110"
          />
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="totalCabinet"
          sortable
          label="四天合计排柜"
          min-width="130"
        />
        <el-table-column
          show-overflow-tooltip
          prop="totalTowingCabinet"
          sortable
          label="合计待拖柜"
          min-width="110"
        />
        <el-table-column
          show-overflow-tooltip
          prop="noSailingDate"
          sortable
          label="无船期"
          min-width="90"
        />
        <el-table-column
          show-overflow-tooltip
          prop="sailingDate"
          sortable
          label="有船期"
          min-width="90"
        />
        <el-table-column label="截关日期" align="center">
          <el-table-column
            :label="toUTCtime(nextDate(2)) + '~' + toUTCtime(nextDate(6))"
            show-overflow-tooltip
            prop="cutDate1"
            sortable
            min-width="180"
          />
          <el-table-column
            :label="toUTCtime(nextDate(7)) + '~' + toUTCtime(nextDate(11))"
            show-overflow-tooltip
            prop="cutDate2"
            sortable
            min-width="180"
          />
          <el-table-column
            :label="toUTCtime(nextDate(12)) + '~' + toUTCtime(nextDate(16))"
            show-overflow-tooltip
            prop="cutDate3"
            sortable
            min-width="180"
          />
          <el-table-column
            :label="toUTCtime(nextDate(17)) + '~' + toUTCtime(nextDate(21))"
            show-overflow-tooltip
            prop="cutDate4"
            sortable
            min-width="180"
          />
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
import agreementFreightForwarderAllocationRatioStatisticsServer from './../../../api/statistics/agreementFreightForwarderAllocationRatioStatisticsServer'
const initSearchParams = {
  supplierName: null,
  stat: null,
  allocation: null,
  towingCabinet: null,
  towingDate: new Date(),
  towingDate1: null,
  towingDate2: null,
  towingDate3: null,
  towingDate4: null,
  totalCabinet: null,
  totalTowingCabinet: null,
  noSailingDate: null,
  sailingDate: null,
  cutDate1: null,
  cutDate2: null,
  cutDate3: null,
  cutDate4: null,
}
const initExport_head1 = [
   '协议货代', '状态', '已分配量', '已拖柜',
  '拖柜日期', '拖柜日期', '拖柜日期', '拖柜日期',
   '四天合计排柜', '合计待拖柜', '无船期', '有船期',
  '截关日期', '截关日期', '截关日期', '截关日期'
]
// 截关日期区间为【day+2天到day+6天】，【day+7到day+11】,【day+12到day+16】，【day+17到day+21】。
const initExport_head2 = [
   '协议货代', '状态', '已分配量', '已拖柜',
   0, 1, 2, 3,
   '四天合计排柜', '合计待拖柜', '无船期', '有船期',
   '2-6', '7-11', '12-16', '17-21'
]
const filterVal = [
  'supplierName', 'stat', 'allocation', 'towingCabinet',
  'towingDate1', 'towingDate2', 'towingDate3', 'towingDate4',
  'totalCabinet', 'totalTowingCabinet', 'noSailingDate', 'sailingDate',
  'cutDate1', 'cutDate2', 'cutDate3', 'cutDate4'
]
export default {
  name: 'AgreementFreightForwarderAllocationRatioStatistics',
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
      more: true
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
      const res = await agreementFreightForwarderAllocationRatioStatisticsServer.search({
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
      this.dataExport = JSON.parse(JSON.stringify(this.tableData))
      this.tHeader[0] = initExport_head1
      this.tHeader[1] = ((head) => {
        var res = []
        head.forEach((item) => {
          if (typeof item === 'number') {
            res.push(this.toUTCtime(this.nextDate(item)))
          } else if (/\-/.test(item)) {
            const start = Number.parseInt(item.split('-')[0])
            const end = Number.parseInt(item.split('-')[1])
            res.push(this.toUTCtime(this.nextDate(start)) + '~' + this.toUTCtime(this.nextDate(end)))
          } else {
            res.push(item)
          }
        })
        return res
      })(initExport_head2)
      this.filterVal = filterVal
      if (this.dataExport.length === 0) {
        return this.$message({
          message: '无导出数据',
          showClose: true,
          type: 'warning'
        })
      }
      this.showExportPopup = true
    },
    nextDate(times) {
      return new Date(this.keyword.towingDate).getTime() + (60 * 60 * 24 * 1000 * times)
    },
    toUTCtime(date) {
      const objDate = new Date(date)
      return (objDate.getMonth() + 1) + '月' + objDate.getDate() + '日'
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
