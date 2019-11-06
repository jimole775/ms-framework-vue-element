<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开始日期">
            <el-date-picker
              v-model="keyword.startCustomsDate"
              :disabled="true"
              size="mini"
              class="max-w"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="结束日期">
            <el-date-picker
              v-model="keyword.endCustomsDate"
              :disabled="true"
              size="mini"
              class="max-w"
              type="date"
            />
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
        <el-tab-pane label="财务资料及时性通报" name="first">
          <el-table
            :data="tableData1"
            :loading="loading"
            border
            class="m-t-12"
            style="width: 100%">
            <el-table-column type="index" label="序号"/>
            <el-table-column
              show-overflow-tooltip
              prop="prover"
              sortable
              label="单证员"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="totalAmount"
              sortable
              label="报关"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="commitAmount"
              sortable
              label="提交"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="overDueAmount"
              sortable
              label="逾期"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="timelyRate"
              sortable
              label="及时率"
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
              sortable
              label="亮灯"
              min-width="150">
              <template slot-scope="scope">
                <div :style="'background-color:' + scope.row.lightColor" class="circle"/>
              </template>
            </el-table-column>
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
        <el-tab-pane label="进出口报关财务资料日交接清单" name="second">
          <el-table
            :data="tableData2"
            :loading="loading"
            border
            class="m-t-12"
            style="width: 100%">
            <el-table-column type="index" label="序号"/>
            <el-table-column
              show-overflow-tooltip
              prop="customsPort"
              sortable
              label="进出口口岸"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="currencyName"
              sortable
              label="币制"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="totalAmt"
              sortable
              label="申报总价"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="contractNo"
              sortable
              label="合同号"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="customsNo"
              sortable
              label="报关单号"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="prover"
              sortable
              label="单证员"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="customsDate"
              sortable
              label="报关日期"
              min-width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.customsDate | parseTime('{y}-{m}-{d}') }}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="customsDueDate"
              sortable
              label="应提交日期"
              min-width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.customsDueDate | parseTime('{y}-{m}-{d}') }}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="customsActualDate"
              sortable
              label="实际提交日期"
              min-width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.customsActualDate | parseTime('{y}-{m}-{d}') }}
              </template>
            </el-table-column>
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
        </el-tab-pane>
      </el-tabs>
    </template>
    <component
      v-if="showExportPopup"
      :is="'ExportPopup'"
      :list="dataExport"
      :t-header="tHeader"
      :filter-val="filterVal"
      @close="showExportPopup = false"/>
  </div>
</template>

<script>
  import timelinessOfFinancialInformationStatisticsServer
    from './../../../api/statistics/timelinessOfFinancialInformationStatisticsServer'

  const initSearchParams = {
    startCustomsDate: null,
    endCustomsDate: null,
    prover: null,
  }
  // const initExport = {
  //   startCustomsDate: '报关开始日期',
  //   endCustomsDate: '报关结束日期',
  //   prover: '单证员',
  //   totalAmount: '报关',
  //   commitAmount: '提交',
  //   overDueAmount: '逾期',
  //   timelyRate: '及时率',
  //   ranking: '排名',
  //   lightColor: '亮灯',
  //   customsPort: '进出口口岸',
  //   currencyName: '币制',
  //   totalAmt: '申报总价',
  //   contractNo: '合同号',
  //   customsNo: '报关单号',
  //   customsDate: '报关日期',
  //   customsDueDate: '应提交日期',
  //   customsActualDate: '实际提交日期',
  //   totalScore: '是否逾期',
  // }
  export default {
    name: 'TimelinessOfFinancialInformationStatistics',
    components: {
      ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    },
    filters: {},
    data() {
      return {
        loading: false,
        keyword: {
          ...initSearchParams
        },
        page1: 1,
        size1: 99999, // 第一个表单不需要分页
        count1: 0,
        tableData1: [],
        page2: 1,
        size2: 10,
        count2: 0,
        tableData2: [],
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
      clickExportBtn() {
        const headMap = {
          'head_first': [['单证员', '报关', '提交', '逾期', '及时率', '排名', '亮灯']],
          'field_first': ['prover', 'totalAmount', 'commitAmount', 'overDueAmount', 'timelyRate', 'ranking', 'lightColor'],
          'head_second': [['进出口口岸', '币制', '申报总价', '合同号', '报关单号', '单证员', '报关日期', '应提交日期', '实际提交日期']],
          'field_second': ['customsPort', 'currencyName', 'totalAmt', 'contractNo', 'customsNo', 'prover', 'customsDate', 'customsDueDate', 'customsActualDate']
        }
        switch (this.tabName) {
          case 'first':
            this.dataExport = JSON.parse(JSON.stringify(this.tableData1))
            break
          case 'second':
            this.dataExport = JSON.parse(JSON.stringify(this.tableData2))
            break

          default:
            this.dataExport = []
            break
        }
        if (this.dataExport.length === 0) {
          return this.$message({
            message: '没有数据可导出',
            type: 'warning'
          })
        }
        this.tHeader = headMap['head_' + this.tabName]
        this.filterVal = headMap['field_' + this.tabName]
        this.setExportData()
        this.showExportPopup = true
      },
      setExportData() {
      },
      async search() {
        this.loading = true
        this.multipleSelection = []
        let url = '/auxhome/rpt/api/1.0.0/financialRpt/financialTimelinessRpt'
        let page = this.page1 - 1
        let size = this.size1
        if (this.tabName === 'second') {
          page = this.page2 - 1
          size = this.size2
          url = '/auxhome/rpt/api/1.0.0/financialRpt/financialDetailRpt'
        }
        const endDate = new Date()
        const beginDate = new Date(new Date().getTime() - (24 * 60 * 60 * 1000) * 30)
        this.keyword.startCustomsDate = beginDate
        this.keyword.endCustomsDate = endDate
        const res = await timelinessOfFinancialInformationStatisticsServer.search({
          query: this.keyword,
          url,
          page,
          size
        })
        if (this.tabName === 'second') {
          this.tableData2 = res.data
          res.data.forEach((item, index) => {
            this.$set(this.tableData2, index, item)
          })
          this.count2 = res.pagination.count
        } else {
          this.tableData1 = res.data
          for (let i = 0; i < this.tableData1.length; i++) {
            if (this.tableData1[i].timelyRate !== 0) {
              this.tableData1[i].timelyRate = (this.tableData1[i].timelyRate * 100).toFixed(2)
            }
            this.tableData1[i].timelyRate += '%'
          }
          res.data.forEach((item, index) => {
            this.$set(this.tableData1, index, item)
          })
          this.count1 = res.pagination.count

          // 手动拼接一个合计项
          const sums = {
            totalAmount: 0,
            commitAmount: 0,
            overDueAmount: 0,
            timelyRate: 0,
            prover: '合计',
            ranking: '-',
          }
          this.tableData1.forEach((tableItem) => {
            if (tableItem.totalAmount) sums.totalAmount += tableItem.totalAmount
            if (tableItem.commitAmount) sums.commitAmount += tableItem.commitAmount
            if (tableItem.overDueAmount) sums.overDueAmount += tableItem.overDueAmount
          })
          sums.timelyRate = Math.round((1 - sums.overDueAmount / sums.totalAmount) * 100) + '%'
          this.tableData1.push(sums)
        }
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
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleClick(tab, event) {
        this.tabName = tab.name
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

  .circle {
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }
</style>

