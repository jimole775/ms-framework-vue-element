<template>
  <div class="container">
    <el-form v-show="isShow === true" :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="订舱单号">
            <el-input v-model="keyword.bookingNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="截关日期">
            <el-date-picker
              v-model="keyword.cutDate"
              size="mini"
              class="max-w"
              type="datetime"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.piNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="大区名称">
            <el-input v-model="keyword.areaName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开船日期">
            <el-date-picker
              v-model="keyword.departDate"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="预告单号">
            <el-input v-model="keyword.warnNo" size="mini" />
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
      <el-tabs type="border-card" style="margin-top:20px" @tab-click="tabClick">
        <el-tab-pane 
          label="按大区统计">
          <el-table
            :data="tableData2"
            :loading="loading"
            border
            class="m-t-12"
            style="width: 100%"
          >
            <el-table-column
              show-overflow-tooltip
              prop="areaName"
              sortable
              label="大区"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="cycleTotal"
              sortable
              label="订舱周期"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="ranking"
              sortable
              label="排名"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="lightColor"
              label="亮灯">
              <template slot-scope="scope">
                <div :style="'background-color:' + scope.row.lightColor" class="circle"/>
              </template>
            </el-table-column>
          </el-table>  
        </el-tab-pane>  
        <el-tab-pane 
          label="按部门统计">
          <el-table
            :data="tableData3"
            :loading="loading"
            border
            class="m-t-12"
            style="width: 100%"
          >
            <el-table-column
              show-overflow-tooltip
              prop="orgName"
              sortable
              label="部门"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="cycleTotal"
              sortable
              label="订舱周期"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="ranking"
              sortable
              label="排名"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="lightColor"
              label="亮灯">
              <template slot-scope="scope">
                <div :style="'background-color:' + scope.row.lightColor" class="circle"/>
              </template>
            </el-table-column>
          </el-table>  
        </el-tab-pane>  
        <el-tab-pane 
          label="明细" >
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
              v-if="eye.bookingNo"
              show-overflow-tooltip
              prop="bookingNo"
              sortable
              label="订舱单号"
              min-width="150"
            />
            <el-table-column
              v-if="eye.cutDate"
              show-overflow-tooltip
              prop="cutDate"
              sortable
              label="截关日"
              min-width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.cutDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
              </template>
            </el-table-column>
            <el-table-column
              v-if="eye.orgName"
              show-overflow-tooltip
              prop="orgName"
              sortable
              label="部门名称"
              min-width="150"
            />
            <el-table-column
              v-if="eye.piNo"
              show-overflow-tooltip
              prop="piNo"
              sortable
              label="合同号"
              min-width="150"
            />
            <el-table-column
              v-if="eye.salesUserId"
              show-overflow-tooltip
              prop="salesUserId"
              sortable
              label="业务员"
              min-width="150"
            />
            <el-table-column
              v-if="eye.areaName"
              show-overflow-tooltip
              prop="areaName"
              sortable
              label="大区名称"
              min-width="150"
            />
            <el-table-column
              v-if="eye.departDate"
              show-overflow-tooltip
              prop="departDate"
              sortable
              label="开船日"
              min-width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.departDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
              </template>
            </el-table-column>
            <!-- <el-table-column
              v-if="eye.ranking"
              show-overflow-tooltip
              prop="ranking"
              sortable
              label="排名"
              min-width="150"
            /> -->
            <el-table-column
              v-if="eye.bookingDate"
              show-overflow-tooltip
              prop="bookingDate"
              sortable
              label="订舱日期"
              min-width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.bookingDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
              </template>
            </el-table-column>
            <el-table-column
              v-if="eye.warnNo"
              show-overflow-tooltip
              prop="warnNo"
              sortable
              label="预告单号"
              min-width="150"
            />
            <el-table-column
              v-if="eye.bookingCycle"
              show-overflow-tooltip
              prop="bookingCycle"
              sortable
              label="订舱周期"
              min-width="150"
            />
            <el-table-column
              v-if="eye.cycleTotal"
              show-overflow-tooltip
              prop="cycleTotal"
              sortable
              label="订舱周期总计"
              min-width="150"
            />
          </el-table>
        </el-tab-pane>
      </el-tabs>    
    </template>
    <div v-show="isShow === true" class="m-w cen-box m-t-12">
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
            <el-checkbox v-model="eye.bookingNo">订舱单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cutDate">截关日</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orgName">部门名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.piNo">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.salesUserId">业务员</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.areaName">大区名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.departDate">开船日</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.ranking">排名</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bookingDate">订舱日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnNo">预告单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bookingCycle">订舱周期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cycleTotal">订舱周期总计</el-checkbox>
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
import actRrtBookingDetailedStatisticsServer from './../../../api/statistics/actRrtBookingDetailedStatisticsServer'
const initSearchParams = {
  bookingNo: null,
  cutDate: null,
  orgName: null,
  piNo: null,
  salesUserId: null,
  areaName: null,
  departDate: null,
  ranking: null,
  bookingDateStart: null,
  bookingDateEnd: null,
  warnNo: null,
  bookingCycle: null,
  cycleTotal: null,
}
const initExport = {
  bookingNo: '订舱单号',
  cutDate: '截关日',
  orgName: '部门名称',
  piNo: '合同号',
  salesUserId: '业务员',
  areaName: '大区名称',
  departDate: '开船日',
  ranking: '排名',
  bookingDate: '订舱日期',
  warnNo: '预告单号',
  bookingCycle: '订舱周期',
  cycleTotal: '订舱周期总计',
}
export default {
  name: 'ActRrtBookingDetailedStatistics',
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
      isShow: false,
      size: 10,
      count: 0,
      pageSize: [10, 20, 30, 40, 50],
      sort: null,
      tableData: [],
      tableData2: [],
      tableData3: [],
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
        bookingNo: true,
        cutDate: true,
        orgName: true,
        piNo: true,
        salesUserId: true,
        areaName: true,
        departDate: true,
        ranking: true,
        bookingDate: true,
        warnNo: true,
        bookingCycle: true,
        cycleTotal: true,
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
    this.search2()
  },
  methods: {
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = {
        ...this.keyword
      }
      const res = await actRrtBookingDetailedStatisticsServer.search({
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
    async search2() {
      const res = await actRrtBookingDetailedStatisticsServer.search2()
      this.tableData2 = res.data
    },
    async search3() {
      const res = await actRrtBookingDetailedStatisticsServer.search3()
      this.tableData3 = res.data
    },
    async tabClick(info) {
      this.isShow = false
      if (info.label === '按大区统计') {
        this.search2()
      }
      if (info.label === '按部门统计') {
        this.search3()
      }
      if (info.label === '明细') {
        this.isShow = true
        this.resetSearch()
      }
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
  .circle{
    width: 20px;
    height: 20px;
    margin:0 auto;
    border-radius: 10px;
  }
</style>
