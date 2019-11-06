<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开始日期">
            <el-date-picker
              v-model="keyword.startDate"
              size="mini"
              class="max-w"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="结束日期">
            <el-date-picker
              v-model="keyword.endDate"
              size="mini"
              class="max-w"
              type="date"
            />
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
        ref="test"
        :data="tableData"
        :loading="loading"
        border
        center
        class="m-t-12"
        @selection-change="handleSelectionChange"
      >
        <el-table-column width="50px" show-overflow-tooltip type="index" label="序号" fixed="left"/>
        <el-table-column
          width="66px" 
          show-overflow-tooltip
          prop="sName"
          label="姓名"
        />
        <el-table-column :width="cellWidth" label="准确率(60%)" align="center">
          <el-table-column
            :width="cellWidth"
            show-overflow-tooltip
            prop="completeBillNum"
            sortable
            label="交单数"
          />
          <el-table-column
            :width="cellWidth"
            show-overflow-tooltip
            prop="lcNum"
            sortable
            label="LC"
          />
          <el-table-column
            :width="cellWidth"
            show-overflow-tooltip
            prop="nolcNum"
            sortable
            label="非LC"
          />
          <el-table-column
            :width="cellWidth"
            show-overflow-tooltip
            prop="errorNum"
            sortable
            label="出错数"
          />
          <el-table-column
            :width="cellWidth"
            show-overflow-tooltip
            prop="correctProbability"
            sortable
            label="准确率"
          />
        </el-table-column>
        <el-table-column label="及时率(40%)" align="center">
          <el-table-column label="LC录" align="center">
            <el-table-column
              :width="cellWidth"
              show-overflow-tooltip
              prop="lcEntryTotal"
              sortable
              label="总数"
            />
            <el-table-column
              :width="cellWidth"
              show-overflow-tooltip
              prop="lcOverdue"
              sortable
              label="逾期数"
            />
          </el-table-column>
          <el-table-column label="制单" align="center">
            <el-table-column
              :width="cellWidth"
              show-overflow-tooltip
              prop="makeBillTotal"
              sortable
              label="总数"
            />
            <el-table-column
              :width="cellWidth"
              show-overflow-tooltip
              prop="makeBillOverdue"
              sortable
              label="逾期数"
            />
          </el-table-column>
          <el-table-column label="投保" align="center">
            <el-table-column
              :width="cellWidth"
              show-overflow-tooltip
              prop="insureTotal"
              sortable
              label="总数"
            />
            <el-table-column
              :width="cellWidth"
              show-overflow-tooltip
              prop="insureOverdue"
              sortable
              label="逾期数"
            />
          </el-table-column>
          <el-table-column label="报关" align="center">
            <el-table-column
              :width="cellWidth"
              show-overflow-tooltip
              prop="customsTotal"
              sortable
              label="总数"
            />
            <el-table-column
              :width="cellWidth"
              show-overflow-tooltip
              prop="customsOverdue"
              sortable
              label="逾期数"
            />
          </el-table-column>
          <el-table-column label="小计" align="center">
            <el-table-column
              :width="cellWidth"
              show-overflow-tooltip
              prop="promptness"
              sortable
              label="及时率"
            />
          </el-table-column>
        </el-table-column>
        <el-table-column
          :width="cellWidth"
          show-overflow-tooltip
          prop="totalScore"
          sortable
          label="总得分"
        />
        <el-table-column
          :width="cellWidth"
          show-overflow-tooltip
          prop="rank"
          sortable
          label="排名"
        />
        <el-table-column
          :width="cellWidth"
          show-overflow-tooltip
          prop="histroyCount"
          sortable
          label="前两月次数"
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
import documentWeekKanbanStatisticsServer from './../../../api/statistics/documentWeekKanbanStatisticsServer'
const initSearchParams = {
  startDate: null,
  endDate: null,
}
const initExport_head1 = [
  ' ',
  '准确率(60%)', '准确率(60%)', '准确率(60%)', '准确率(60%)', '准确率(60%)',
  '及时率(40%)', '及时率(40%)', '及时率(40%)', '及时率(40%)', '及时率(40%)',
  '及时率(40%)', '及时率(40%)', '及时率(40%)', '及时率(40%)',
  ' ', ' ', ' '
]
const initExport_head2 = [
   ' ',
  ' ', ' ', ' ', ' ', ' ',
  'LC录', 'LC录', '制单', '制单', '投保', '投保', '报关', '报关', '小计',
  ' ', ' ', ' '
]
const initExport_head3 = [
  '姓名', '交单数', 'LC', '非LC', '出错数', '准确率',
  '总数', '逾期数', '总数', '逾期数', '总数', '逾期数', '总数', '逾期数', '及时率',
  '总得分', '排名', '前两月次数'
]
const filterVal = [
  'sName', 'completeBillNum', 'lcNum', 'nolcNum', 'errorNum', 'correctProbability',
  'lcEntryTotal', 'lcOverdue', 'makeBillTotal', 'makeBillOverdue', 'insureTotal', 'insureOverdue', 'customsTotal', 'customsOverdue',
  'promptness',
  'totalScore', 'rank', 'histroyCount'
]
export default {
  name: 'DocumentWeekKanbanStatistics',
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
      size: 999,
      count: 0,
      pageSize: [999, 10, 20, 30, 40, 50],
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
    },
    cellWidth() {
      // this.$store.getters.width => 全屏幕宽度
      // 180 => 【左边栏】 宽度
      // 100 => 【序号】50px + 【姓名】66px
      // 18 => 总共【18列】需要动态设置宽度
      return ((this.$store.getters.width - 180 - 50 - 66) / 18) + 'px'
    }
  },
  created() {
    this.search()
  },
  mounted() {  
  },
  methods: {
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = {
        ...this.keyword
      }
      const res = await documentWeekKanbanStatisticsServer.search({
        query: keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
      this.count = res.pagination.count
      const sumLine = this.insertSum(this.tableData)
      const avgLine = this.insertAvg(sumLine, this.tableData.length)
      this.tableData.push(sumLine)
      this.tableData.push(avgLine)
      this.$nextTick(() => {
        this.setPageSize()
      })
      this.loading = false
    },
    insertSum(src) {
      const sumLine = {}
      src && src.forEach(element => {
        Object.keys(element).forEach((key) => {
          if (key === 'sName') {
            sumLine[key] = '小计'
          } else if (key === 'rank') {
            sumLine[key] = ' '
          } else {
            if (sumLine[key] || sumLine[key] === 0) sumLine[key] += element[key]
            else sumLine[key] = element[key]
          }
        })
      })
      return sumLine
    },
    insertAvg(sumLine, linesCount) {
      const avgLine = Object.assign({}, sumLine)
      Object.keys(avgLine).forEach((key) => {
        if (key === 'sName') {
          avgLine[key] = '平均'
        } else if (key === 'rank') {
            sumLine[key] = ' '
        } else avgLine[key] = avgLine[key] / linesCount        
      })
      return avgLine
    },
    setPageSize() {
      // 重新设定分页条件
      this.pageSize = []
      for (let i = 1; i < 6; i++) {
        if (this.count > 10 * i) {
          this.pageSize.push(10 * i)
        }
      }
      this.pageSize.unshift(999)
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
      this.tHeader[1] = initExport_head2
      this.tHeader[2] = initExport_head3
      this.filterVal = filterVal
      if (this.dataExport.length === 0) {
        return this.$message({
          message: '无导出数据',
          type: 'warning'
        })
      }
      this.showExportPopup = true
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

<style rel="stylesheet/scss" lang="scss">
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
