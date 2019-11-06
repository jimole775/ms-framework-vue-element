<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col v-show="isShow=== true" :lg="6" :md="8" :sm="12" :xs="24">
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
        <el-col v-show="isShow=== true" :lg="6" :md="8" :sm="12" :xs="24">
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
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="指定货代">
            <el-input v-model="keyword.logisticsName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <!--<el-button type="text" size="mini" @click="more = !more">-->
            <!--{{ more ? '收起' : '更多' }}-->
            <!--</el-button>-->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
    <!-- <el-button-group>
      <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
    </el-button-group> -->
    <template>
      <el-tabs v-model="tabName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="收费管理" name="first">
          <el-table
            v-loading="loading"
            :data="tableData1"
            border
            class="m-t-12"
            style="width: 100%">
            <el-table-column
              show-overflow-tooltip
              prop="logisticsName"
              sortable
              label="指定货代"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="stat"
              sortable
              label="状态"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="total"
              sortable
              label="合计"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="booking"
              sortable
              label="订舱费"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="operation"
              sortable
              label="操作费"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="thc"
              sortable
              label="THC"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="caseCharge"
              sortable
              label="箱单费"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="file"
              sortable
              label="文件费"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="vgmlss"
              sortable
              label="VGM/LSS"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="other"
              sortable
              label="其它"
              min-width="150"
            />
          </el-table>
          <div class="m-w cen-box m-t-12">
            <el-pagination
              :current-page="page1"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="size1"
              :total="count1"
              :layout="windowWidth < 768 ? 'total, jumper' : 'total, sizes, prev, pager, next, jumper'"
              @size-change="pageSizeChange1"
              @current-change="pageNumberChange1"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="出货量统计" name="second">
          <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
          <el-table
            v-loading="loading"
            :data="tableData2"
            border
            class="m-t-12"
            style="width: 100%">
            <el-table-column
              show-overflow-tooltip
              prop="logisticsName"
              sortable
              label="指定货代名称"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="stat"
              sortable
              label="状态"
              min-width="150"
            />
            <el-table-column
              v-if="eye.cust"
              show-overflow-tooltip
              prop="custName"
              sortable
              label="客户名称"
              min-width="150"
            />
            <el-table-column
              v-if="eye.port"
              show-overflow-tooltip
              prop="toportName"
              sortable
              label="目的港"
              min-width="150"
            />
            <el-table-column
              v-if="eye.port"
              show-overflow-tooltip
              prop="toAreaName"
              sortable
              label="目的国"
              min-width="150"
            />
            <el-table-column
              v-if="eye.count"
              show-overflow-tooltip
              prop="shipment"
              sortable
              label="出货量"
              min-width="150"
            />
          </el-table>
          <div class="m-w cen-box m-t-12">
            <el-pagination
              :current-page="page2"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="size2"
              :total="count2"
              :layout="windowWidth < 768 ? 'total, jumper' : 'total, sizes, prev, pager, next, jumper'"
              @size-change="pageSizeChange2"
              @current-change="pageNumberChange2"
            />
          </div>
          <el-dialog :visible="showEye" width="360px" title="过滤" top="10vh" @close="showEye = false">
            <div>
              <el-row>
                <el-col :span="24">
                  <el-checkbox v-model="eye.count">总出货量</el-checkbox>
                </el-col>
                <el-col :span="24">
                  <el-checkbox v-model="eye.cust">客户</el-checkbox>
                </el-col>
                <el-col :span="24">
                  <el-checkbox v-model="eye.port">港口</el-checkbox>
                </el-col>
              </el-row>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="放舱管理" name="third">
          <el-table
            v-loading="loading"
            :data="tableData3"
            border
            class="m-t-12"
            style="width: 100%">
            <el-table-column
              show-overflow-tooltip
              prop="logisticsName"
              sortable
              label="指定货代名称"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="stat"
              sortable
              label="状态"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="confirmShipDate"
              sortable
              label="船期确认周期"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="fcDate"
              sortable
              label="放舱周期"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="lightColor"
              sortable
              min-width="115"
              label="亮灯">
              <template slot-scope="scope">
                <div :style="'background-color:' + scope.row.lightColor" class="circle"/>
              </template>
            </el-table-column>
          </el-table>
          <div class="m-w cen-box m-t-12">
            <el-pagination
              :current-page="page3"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="size3"
              :total="count3"
              :layout="windowWidth < 768 ? 'total, jumper' : 'total, sizes, prev, pager, next, jumper'"
              @size-change="pageSizeChange3"
              @current-change="pageNumberChange3"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
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
import FreightForwardSMonthStatEnumSelect from './../../../components/entity/statistics/designated-freight-forward/FreightForwardSMonthStatEnumSelect'
import FreightForwardSMonthStatEnumUtil from './../../../components/enum/statistics/designated-freight-forward/FreightForwardSMonthStatEnumUtil'
import designatedFreightForwardStatisticsServer from './../../../api/statistics/designatedFreightForwardStatisticsServer'
const initSearchParams = {
  startDate: null,
  endDate: null,
  sMonth: null,
  logisticsName: null,
}
const initExport1 = [
  '指定货代', '状态', '合计', '订舱费', '操作费', 'THC', '箱单费', '文件费',
  'VGM/LSS', '其它'
]
const filterVal1 = [
  'logisticsName', 'stat', 'total', 'booking', 'operation', 'thc',
  'caseCharge', 'file', 'vgmlss', 'other'
]
const initExport2 = [
  '指定货代名称', '状态', '客户名称', '目的港', '目的国', '出货量'
]
const filterVal2 = [
  'logisticsName', 'stat', 'custName', 'toportName', 'toAreaName', 'shipment'
]
const initExport3 = [
  '指定货代名称', '状态', '船期确认周期', '放舱周期', '亮灯'
]
const filterVal3 = [
  'logisticsName', 'stat', 'confirmShipDate', 'fcDate', 'lightColor'
]
export default {
  name: 'DesignatedFreightForwardStatistics',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    FreightForwardSMonthStatEnumSelect,
  },
  filters: {
    FreightForwardSMonthStatFilter: FreightForwardSMonthStatEnumUtil.toTitleFilter,
  },
  data() {
    return {
      loading: true,
      keyword: {
        ...initSearchParams
      },
      isShow: false,
      page1: 1,
      size1: 10,
      count1: 0,
      tableData1: [],
      page2: 1,
      size2: 10,
      count2: 0,
      tableData2: [],
      page3: 1,
      size3: 10,
      count3: 0,
      tableData3: [],
      sort: null,
      tabName: 'first',
      currentClickRow: {},
      multipleSelection: [],
      showViewPopup: false,
      showEditPopup: false,
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      eye: {
        count: true,
        cust: true,
        port: true,
      },
      showEye: false,
      more: true,
      type: 1
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
      this.isShow = false
      this.multipleSelection = []
      let page = this.page1 - 1
      let size = this.size1
      let config = 'ACT_RPT_CHARGE_MANAGE'
      if (this.tabName === 'second') {
        this.isShow = true
        page = this.page2 - 1
        size = this.size2
        config = 'ACT_RPT_SHIPMENT_STATISTICS'
      } else if (this.tabName === 'third') {
        page = this.page3 - 1
        size = this.size3
        config = 'ACT_RPT_FC_MANAGE'
      }
      const keyword = {
        ...this.keyword
      }
      const res = await designatedFreightForwardStatisticsServer.search({
        config,
        query: keyword,
        page: page,
        size: size
      })
      if (this.tabName === 'second') {
        this.tableData2 = res.data
        res.data.forEach((item, index) => {
          this.$set(this.tableData2, index, item)
        })
        this.count2 = res.pagination.count
      } else if (this.tabName === 'third') {
        this.tableData3 = res.data
        res.data.forEach((item, index) => {
          this.$set(this.tableData2, index, item)
        })
        this.count3 = res.pagination.count
      } else {
        this.tableData1 = res.data
        res.data.forEach((item, index) => {
          this.$set(this.tableData1, index, item)
        })
        this.count1 = res.pagination.count
      }
      this.loading = false
    },
    handleClick(tab, event) {
      this.tabName = tab.name
      this.search()
       if (tab.label === '收费管理') {
        this.type = 1
      } else this.type = tab.label === '出货量统计' ? 2 : 3
    },
    clickExportBtn() {
      this.tHeader = []
      this.filterVal = []
      this.dataExport = []
       if (this.type !== 1) {
        if (this.type === 2) {
          this.dataExport = JSON.parse(JSON.stringify(this.tableData2))
          this.tHeader = initExport2
          this.filterVal = filterVal2
        } else {
          this.dataExport = JSON.parse(JSON.stringify(this.tableData3))
          this.dataExport.forEach(item => {
            if (item.lightColor === 'green') {
                item.lightColor = '绿灯'
              } else {
                item.lightColor = '红灯'
              }
          })
          this.tHeader = initExport3
          this.filterVal = filterVal3
        }
      } else {
        this.dataExport = JSON.parse(JSON.stringify(this.tableData1))
        this.tHeader = initExport1
        this.filterVal = filterVal1
      }
      if (this.dataExport.length === 0) {
        return this.$message({
          message: '无导出数据',
          showClose: true,
          type: 'warning'
        })
      }
      this.showExportPopup = true
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
    pageSizeChange1(val) {
      this.size1 = val
      this.page1 = 1
      this.search()
    },
    pageNumberChange1(val) {
      this.page1 = val
      this.search()
    },
    pageSizeChange2(val) {
      this.size2 = val
      this.page2 = 1
      this.search()
    },
    pageNumberChange2(val) {
      this.page2 = val
      this.search()
    },
    pageSizeChange3(val) {
      this.size3 = val
      this.page3 = 1
      this.search()
    },
    pageNumberChange3(val) {
      this.page3 = val
      this.search()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    border-radius: 10px;
  }
</style>
