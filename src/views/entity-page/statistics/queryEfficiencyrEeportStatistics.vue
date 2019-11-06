<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="keyword.beginDate"
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
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template>
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane 
          label="信用证录入" >
          <el-table
            :data="tableData1"
            :loading="loading"
            border
            class="m-t-12"
            style="width: 100%"
          > 
            <el-table-column
              type="index"
              label="序号" />
            <el-table-column
              show-overflow-tooltip
              prop="lcBillDate"
              min-width="150"
              label="信用证日期" />
            <el-table-column
              show-overflow-tooltip
              prop="stat"
              min-width="80"
              label="单据状态">
              <template slot-scope="scope">
                {{ scope.row.stat | StatusEnumUtilsFilter }}
              </template>
            </el-table-column>  
            <el-table-column
              show-overflow-tooltip
              prop="lcNo"
              min-width="100"
              label="信用证号" />
            <el-table-column
              show-overflow-tooltip
              min-width="80"
              prop="amt"
              label="金额" />
            <el-table-column
              show-overflow-tooltip
              prop="currencyCode"
              min-width="80"
              label="货币" />
            <el-table-column
              show-overflow-tooltip
              prop="lcActiveDate"
              min-width="150"
              label="信用证有效期" />  
            <el-table-column
              show-overflow-tooltip
              prop="orgname"
              min-width="100"
              label="业务部门" />
            <el-table-column
              show-overflow-tooltip
              prop="prover"
              min-width="80"
              label="单证人员" />  
            <el-table-column
              show-overflow-tooltip
              prop="lcReqMan"
              min-width="150"
              label="信用证申请人" />  
            <el-table-column
              show-overflow-tooltip
              prop="recLcDate"
              min-width="150"
              label="收证日期" /> 
            <el-table-column
              show-overflow-tooltip
              prop="lcDate"
              min-width="150"
              label="录入日期" />   
            <el-table-column
              show-overflow-tooltip
              prop="tbTimes"
              min-width="150"
              label="录证耗时小时"
              label-class-name="yellow" />    
            <el-table-column
              show-overflow-tooltip
              prop="tbDays"
              min-width="80"
              label="录证天数"
              label-class-name="yellow" />   
          </el-table>
        </el-tab-pane>  
        <el-tab-pane 
          label="清关单据确认">
          <el-table
            :data="tableData2"
            :loading="loading"
            border
            class="m-t-12"
            style="width: 100%"
          > 
            <el-table-column
              type="index"
              label="序号" />
            <el-table-column
              show-overflow-tooltip
              prop="stat"
              label="单据状态">
              <template slot-scope="scope">
                {{ scope.row.stat | StatusEnumUtilsFilter }}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="billNo"
              label="清关确认单号" />   
            <el-table-column
              show-overflow-tooltip
              prop="orgName"
              label="业务部门名称" />   
            <el-table-column
              show-overflow-tooltip
              prop="custName"
              label="客户名称" />   
            <el-table-column
              show-overflow-tooltip
              prop="salesUserId"
              label="业务员" />   
            <el-table-column
              show-overflow-tooltip
              prop="factInvoiceNo"
              label="商业发票号" />   
            <el-table-column
              show-overflow-tooltip
              prop="pinoNew"
              label="合同号" />   
            <el-table-column
              show-overflow-tooltip
              prop="createTime"
              label="制单时间" />   
            <el-table-column
              show-overflow-tooltip
              prop="kpDate"
              label="开票时间" />   
            <el-table-column
              show-overflow-tooltip
              prop="zdTimes"
              label="制单耗时小时" />    
            <el-table-column
              show-overflow-tooltip
              prop="createUser"
              label="制单人" />  
            <el-table-column
              show-overflow-tooltip
              prop="tbDays"
              label="制单耗时天数" />   
          </el-table>    
        </el-tab-pane>  
        <el-tab-pane 
          label="出运申报查询">  
          <el-table
            :data="tableData3"
            :loading="loading"
            border
            class="m-t-12"
            style="width: 100%"
          > 
            <el-table-column
              type="index"
              label="序号" />
            <el-table-column
              show-overflow-tooltip
              prop="stat"
              label="单据状态">
              <template slot-scope="scope">
                {{ scope.row.stat | StatusEnumUtilsFilter }}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="orgname"
              label="业务部门名称" /> 
            <el-table-column
              show-overflow-tooltip
              prop="custName"
              label="客户名称" />   
            <el-table-column
              show-overflow-tooltip
              prop="buyerno"
              label="买方代码" /> 
            <el-table-column
              show-overflow-tooltip
              prop="invoiceno"
              label="发票号" />     
            <el-table-column
              show-overflow-tooltip
              prop="invoicesum"
              label="发票金额" /> 
            <el-table-column
              show-overflow-tooltip
              prop="insuresum"
              label="投保金额" />
            <el-table-column
              show-overflow-tooltip
              prop="moneyid"
              label="出运货币代码" />  
            <el-table-column
              show-overflow-tooltip
              prop="payterm"
              label="合同支付期限" />  
            <el-table-column
              show-overflow-tooltip
              prop="transportdate"
              label="出运日期" />  
            <el-table-column
              show-overflow-tooltip
              prop="contractno"
              label="合同号" />  
            <el-table-column
              show-overflow-tooltip
              prop="createName"
              label="创建人" />  
            <el-table-column
              show-overflow-tooltip
              prop="tbDate"
              label="投保日期" />  
            <el-table-column
              show-overflow-tooltip
              prop="tbTimes"
              label="投保耗时" />  
            <el-table-column
              show-overflow-tooltip
              prop="tbDays"
              label="投保消耗天数" />  
          </el-table>  
        </el-tab-pane>  
      </el-tabs>  
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
  </div>
</template>

<script>
/* import Validate from './../../../utils/validate.js' */
import efficiencyStatementServer from './../../../api/efficiencyStatementServer'
import StatusEnumUtils from './../../../components/enum/report-form/StatusEnumUtils'
const initSearchParams = {
  beginDate: null,
  endDate: null,
}
export default {
  name: 'DZEfficiencyManagement',
  components: {
  },
  filters: {
    StatusEnumUtilsFilter: StatusEnumUtils.toTitleFilter,
    // OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
  },
  data() {
    return {
      type: '1',
      loading: false,
      keyword: {
        ...initSearchParams
      },
      page: 1,
      size: 10,
      count: 0,
      pageSize: [10, 20, 30, 40, 50],
      sort: null,
      tableData1: [],
      tableData2: [],
      tableData3: [],
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
    tabClick(info) {
      if (info.label === '信用证录入') {
        this.type = '1'
        this.search()
      }
      if (info.label === '清关单据确认') {
        this.type = '2'
        this.search()
      }
      if (info.label === '出运申报查询') {
        this.type = '3'
        this.search()
      }
    },
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = this.keyword
      const res = await efficiencyStatementServer.search({
        keyword,
        type: this.type,
        page: this.page - 1,
        size: this.size
      })
      if (this.type === '1') {
        this.tableData1 = []
        this.tableData1 = res.data
        res.data.forEach((item, index) => {
          this.$set(this.tableData1, index, item)
        })
      }
      if (this.type === '2') {
        this.tableData2 = []
        this.tableData2 = res.data
        res.data.forEach((item, index) => {
          this.$set(this.tableData2, index, item)
        })
      }
      if (this.type === '3') {
        this.tableData3 = []
        this.tableData3 = res.data
        res.data.forEach((item, index) => {
          this.$set(this.tableData3, index, item)
        })
      }
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
  .container {
    /deep/ .yellow{
        background: yellow;
      }
  }
  
</style>
