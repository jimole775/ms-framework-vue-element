<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.piNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="付款方式">
            <el-select
              v-model="keyword.payStyleDesc"
              size="mini"
              class="max-w">
              <el-option
                v-for="item in payStyleList"
                :key="item"
                :label="item"
                :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="货代">
            <el-input v-model="keyword.forwarder" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="月份">
            <el-date-picker
              v-model="keyword.month"
              size="mini"
              class="max-w"
              type="month"
              value-format="yyyyMM"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">搜索</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <!-- <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template>
      <el-tabs v-model="tabName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="提单到单汇总" name="second">
          <el-table
            :data="tableData2"
            :loading="loading"
            border
            class="m-t-12"
            style="width: 100%"
          >
            <el-table-column
              :label="title1"
              min-width="140">
              <el-table-column
                type="index"
                label="序号" />
              <el-table-column
                show-overflow-tooltip
                prop="forwarder"
                min-width="140"
                label="货代" />
              <el-table-column
                show-overflow-tooltip
                prop="totalPoints"
                min-width="140"
                label="累计扣分(月度)" />  
              <el-table-column
                show-overflow-tooltip
                prop="totalAmount"
                min-width="140"
                label="总数" />  
              <el-table-column
                label="未到"
                align="center">  
                <el-table-column
                  show-overflow-tooltip
                  prop="unOverDueAmount"
                  min-width="140"
                  label="未逾期" />
                <el-table-column
                  show-overflow-tooltip
                  prop="overDueAmount"
                  min-width="140"
                  label="已逾期" />  
              </el-table-column>    
              <el-table-column
                show-overflow-tooltip
                prop="lightColor"
                min-width="115"
                label="亮灯">
                <template slot-scope="scope">
                  <div :style="'background-color:' + scope.row.lightColor" class="circle"/>
                </template>
              </el-table-column>  
              <el-table-column
                show-overflow-tooltip
                prop="singleProgress"
                min-width="140"
                label="到单进度">
                <template slot-scope="scope">
                  <span>
                    {{ fixedNumber(scope.row.singleProgress * 100)(0) + '%' }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="timelyRate"
                min-width="140"
                label="及时率">
                <template slot-scope="scope">
                  <span>
                    {{ fixedNumber(scope.row.timelyRate * 100)(0) + '%' }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="ranking"
                min-width="140"
                label="排名" />
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
        <el-tab-pane label="提单到单及时性" name="first">
          <el-table
            :data="tableData1"
            :loading="loading"
            border
            class="m-t-12"
            style="width: 100%"
          > 
            <el-table-column
              :label="title1"
              min-width="140">
              <el-table-column 
                show-overflow-tooltip
                prop="piNo"
                min-width="140"
                label="合同号"/>
              <el-table-column
                show-overflow-tooltip
                prop="payStyleDesc"
                min-width="140"
                label="付款方式" />
              <el-table-column
                show-overflow-tooltip
                prop="forwarder"
                min-width="140"
                label="货代" />  
              <el-table-column
                show-overflow-tooltip
                prop="sailedTime"
                min-width="140"
                label="已开船">
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.sailedTime + '天' }}
                  </span>
                </template>
              </el-table-column>    
              <el-table-column
                show-overflow-tooltip
                prop="sailDueArriveDate"
                min-width="140"
                label="应到日期">
                <template slot-scope="scope">
                  {{ scope.row.sailDueArriveDate | parseTime('{y}-{m}-{d}') }}
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="sailArrivedDate"
                min-width="160"
                label="实到日期">
                <template slot-scope="scope">
                  {{ scope.row.sailArrivedDate | parseTime('{y}-{m}-{d}') }}
                </template>
              </el-table-column>  
              <el-table-column
                show-overflow-tooltip
                prop="overDueTime"
                min-width="140"
                label="逾期天数">
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.overDueTime + '天' }}
                  </span>
                </template>
              </el-table-column>  
              <el-table-column
                show-overflow-tooltip
                prop="points"
                min-width="140"
                label="本次扣分" />  
              <el-table-column
                show-overflow-tooltip
                prop="lightColor"
                min-width="115"
                label="亮灯颜色">
                <template slot-scope="scope">
                  <div :style="'background-color:' + scope.row.lightColor" class="circle"/>
                </template>
              </el-table-column>
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
      </el-tabs>
    </template>
  </div>
</template>

<script>
import billPromptnessServer from './../../../api/statistics/billPromptnessServer'
import { dateToDateStr } from '@/utils/datetime'
const initSearchParams = {
  piNo: null,
  payStyleDesc: null,
  forwarder: null,
  month: null,
}
const initExport = {
  code: '编码',
  name: '名称',
  number: '区号',
  areaType: '类型',
  remark: '备注',
}
export default {
  name: 'BillPromptnessManagement',
  components: {},
  filters: {},
  data() {
    return {
      loading: false,
      title1: null,
      keyword: {
        ...initSearchParams
      },
      page1: 1,
      size1: 10,
      count1: 0,
      page2: 1,
      size2: 10,
      count2: 0,
      tabName: 'first',
      sort: null,
      payStyleList: ['预付', '到付'],
      tableData1: [],
      tableData2: [],
      currentClickRow: {},
      showViewPopup: false,
      showEditPopup: false,
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      more: false,
      showEye: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() { 
    const dateCollec = dateToDateStr(new Date()).split('-')
    this.keyword.month = dateCollec[0] + dateCollec[1]
    this.title1 = '报表部门： 外销财务部' + '  ' + '责任人：龚霞' + '   ' + '频次：每天' + '   ' + '发送范围：货代、单证、船务'
    this.search()
  },
  methods: {
    fixedNumber(numberOrStr) {
      return function fixed(bit) {
        const baseTimes = Number.parseInt((1).toFixed(bit).replace(/\./, ''))
        const roundStringArr = Math.round(Number.parseFloat(numberOrStr) * baseTimes).toString().split('')
        if (roundStringArr.length < bit) {
            let suffixTimes = bit - roundStringArr.length
            while (suffixTimes--) {
                roundStringArr.unshift(0)
            }
        }
        const res = []
        let loop = 0
        while (loop < roundStringArr.length) {
          if (loop === roundStringArr.length - bit) {
            res.push('.')
          }
          res.push(roundStringArr[loop])
          loop++
        }
        return Number.parseFloat(res.join(''))
      }
    },
    async search() {
      this.loading = true
      let url = '/auxhome/rpt/api/1.0.0/billOrderRpt/billOrderDetailRpt'
      let page = this.page1 - 1
      let size = this.size1
      if (this.tabName === 'second') {
        page = this.page2 - 1
        size = this.size2
        url = '/auxhome/rpt/api/1.0.0/billOrderRpt/billOrderSummaryRpt'
      }
      const res = await billPromptnessServer.search({
        query: this.keyword,
        url,
        page,
        size
      })
      
      if (this.tabName === 'second') {
        this.tableData2 = res.data
        this.tableData2.forEach((item, index) => {
          this.$set(this.tableData2, index, item)
        })
        this.count2 = res.pagination.count
      } else {
        this.tableData1 = res.data
        this.tableData1.forEach((item, index) => {
          this.$set(this.tableData1, index, item)
        })
        this.count1 = res.pagination.count
      }
      this.loading = false
    },
    handleClick(tab, event) {
      this.tabName = tab.name
      this.search()
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
    clickExportBtn() {
      this.dataExport = JSON.parse(JSON.stringify(this.tableData))
      this.dataExport.forEach(item => {
        // item.areaType = AreaTypeEnumUtil.toTitleFilter(item.areaType)
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
