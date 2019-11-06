<template>
  <div class="container">
    <el-form 
      :inline="true" 
      :model="keyword" 
      :ref="'keyword'"
      :rules="rules" 
      class="demo-form-inline" 
      @keyup.enter.native="commitSearch">
      <el-row>
        <el-col v-if="type === 1" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开始时间" required prop="beginDate">
            <el-date-picker
              v-model="keyword.beginDate"
              size="mini"
              class="max-w"
              type="month"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="type === 1" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="结束时间" required prop="endDate">
            <el-date-picker
              v-model="keyword.endDate"
              size="mini"
              class="max-w"
              type="month"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="type === 2" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年份">
            <el-date-picker
              v-model="keyword.year"
              size="mini"
              class="max-w"
              type="year"
              value-format="yyyy"
              placeholder="选择年" />
          </el-form-item>
        </el-col>
        <el-col v-if="type === 2" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="供应商名称">
            <ShippingCompanySelect v-model="keyword.supplierId" :hd-type="1" :is-shipping-price="1"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button v-loading="loading" type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button v-loading="loading" size="mini" @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button-group>
        <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
      </el-button-group>
    </el-form>
    <template>
      <el-tabs type="border-card" style="margin-top:20px" @tab-click="tabClick">
        <el-tab-pane 
          label="供应商考评通报表" >
          <el-table
            v-loading="loading"
            :data="tableData1"
            border
            class="m-t-12"
            style="width: 100%"
          > 
            <el-table-column
              show-overflow-tooltip
              prop="transitName"
              label="供应商名称" />
            <el-table-column
              show-overflow-tooltip
              prop="exceNum"
              label="排车配合度(10分)" />  
            <el-table-column
              show-overflow-tooltip
              prop="timelyRate"
              label="订舱及时率(20分)" />
            <el-table-column
              show-overflow-tooltip
              prop="toCarRate"
              label="到车及时率(30分)" />
            <el-table-column
              show-overflow-tooltip
              prop="paymentRate"
              label="费用确认及时率(20分)" /> 
            <el-table-column
              show-overflow-tooltip
              prop="accidentNum"
              label="事故发生率(20分)" />
            <el-table-column
              show-overflow-tooltip
              prop="totalRate"
              label="总分(100分)" />
            <el-table-column
              show-overflow-tooltip
              prop="lightColor"
              label="亮灯">
              <template slot-scope="scope">
                <div :style="'background-color:' + scope.row.lightColor" class="circle"/>
              </template>
            </el-table-column>   
        </el-table></el-tab-pane>  
        <el-tab-pane 
          label="供应商月度考评明细表">
          <el-table
            v-loading="loading"
            id="test1"
            :data="tableData2"
            border
            class="m-t-12"
            style="width: 100%"
          > 
            <el-table-column
              show-overflow-tooltip
              prop="month"
              label="月份" />
            <el-table-column label="排车配合度(10分)">  
              <el-table-column
                show-overflow-tooltip
                prop="s1"
                label="拖柜票数" />
              <el-table-column
                show-overflow-tooltip
                prop="s2"
                label="异常票数" />      
            </el-table-column>  
            <el-table-column label="订舱及时率(20分)">  
              <el-table-column
                show-overflow-tooltip
                prop="s3"
                label="订舱票数" />
              <el-table-column
                show-overflow-tooltip
                prop="s4"
                label="不及时票数" />      
            </el-table-column> 
            <el-table-column label="到车及时率(30分)">  
              <el-table-column
                show-overflow-tooltip
                prop="s5"
                label="拖柜量" />
              <el-table-column
                show-overflow-tooltip
                prop="s6"
                label="迟到柜量" />      
            </el-table-column>   
            <el-table-column label="费用确认及时率(20分)">  
              <el-table-column
                show-overflow-tooltip
                prop="s7"
                label="确认票数" />
              <el-table-column
                show-overflow-tooltip
                prop="s8"
                label="不及时票数" />      
            </el-table-column>  
            <el-table-column label="安全事故发生率(20分)">  
              <el-table-column
                show-overflow-tooltip
                prop="s9"
                label="出货票数" />
              <el-table-column
                show-overflow-tooltip
                prop="s10"
                label="事故票数" />      
            </el-table-column> 
            <el-table-column
              show-overflow-tooltip
              prop="total"
              label="得分(100)" />  
          </el-table>    
        </el-tab-pane>  
      </el-tabs>  
    </template>
    <div v-if="type === 1" class="m-w cen-box m-t-12">
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
import supplierEvalueNoticeServer from './../../../api/supplierEvalueNoticeServer'
import StatusEnumUtils from './../../../components/enum/report-form/StatusEnumUtils'
import ShippingCompanySelect from './../../../components/entity/shipping-company/ShippingCompanySelect'
const initSearchParams = {
  beginDate: null,
  endDate: null,
  year: null,
  supplierId: null
}  
const initExport1 = [
  '供应商名称',
  '排车配合度(10分)', '订舱及时率(20分)',
  '到车及时率(30分)', '费用确认及时率(20分)',
  '事故发生率(20分)', '总分(100分)',
  '亮灯'
]   
const filterVal1 = [
  'transitName',
  'exceNum', 'timelyRate',
  'toCarRate', 'paymentRate',
  'accidentNum', 'totalRate',
  'lightColor'
]  
const initExport2_head1 = [
  '月份',
  '排车配合度(20分)', '排车配合度(20分)',
  '订舱及时率(20分)', '订舱及时率(20分)',
  '到车及时率(30分)', '到车及时率(30分)',
  '费用确认及时率(10分)', '费用确认及时率(10分)',
  '安全事故发生率(20分)', '安全事故发生率(20分)',
  '得分(100)',
]              
const initExport2_head2 = [
  '月份',
  '拖柜票数', '异常票数',
  '订舱票数', '不及时票数',
  '拖柜量', '迟到柜量',
  '确认票数', '不及时票数',
  '出货票数', '事故票数',
  '得分(100)'
]
const filterVal2 = [
  'month',
  's1', 's2',
  's3', 's4',
  's5', 's6',
  's7', 's8',
  's9', 's10',
  'total'
]    
export default {
  name: 'VendorEvaluateManagement',
  components: {
    ShippingCompanySelect,
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
  },
  filters: {
    StatusEnumUtilsFilter: StatusEnumUtils.toTitleFilter,
    // OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
  },
  data() {
    return {
      loading: false,
      keyword: {
        ...initSearchParams
      },
      comeTime: 1,
      rules: {
        beginDate: [
          { required: true, message: '不能为空', trigger: 'blur' },  
        ],
        endDate: [
          { required: true, message: '不能为空', trigger: 'blur' },  
        ],
      },
      page: 1,
      size: 10,
      count: 0,
      pageSize: [10, 20, 30, 40, 50],
      sort: null,
      type: 1,
      tableData1: [],
      tableData2: [],
      showExportPopup: false,
      tHeader: [],
      filterVal: []
    }
  },
  computed: {
    windowWidth() { 
      return this.$store.getters.width
    },
  },
  created() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const strDate = date.getDate() 
    this.keyword.beginDate = year + '-' + month + '-' + '01'
    this.keyword.endDate = year + '-' + month + '-' + strDate
    this.keyword.year = year.toString()
    this.search()
  },
  methods: {
    tabClick(info) {
      if (info.label === '供应商考评通报表') {
        this.type = 1
        this.search()
      }
      if (info.label === '供应商月度考评明细表') {
        this.type = 2
        this.search()
      }
    },
    async search() {
      this.loading = true
      if (this.type === 1) {
        if (this.comeTime === 1) {
          const keyword = this.keyword
          const res = await supplierEvalueNoticeServer.searchOne({
            keyword,
            page: this.page - 1,
            size: this.size
          })
          this.tableData1 = []
          this.tableData1 = res.data
          res.data.forEach((item, index) => {
            this.$set(this.tableData1, index, item)
          })
          this.count = res.page.total
          this.$nextTick(() => {
            this.setPageSize()
          })
          this.comeTime = 2
          this.loading = false
        } else {
          this.$refs['keyword'].validate(async valid => {
            if (valid) {
              const keyword = this.keyword
              const res = await supplierEvalueNoticeServer.searchOne({
                keyword,
                page: this.page - 1,
                size: this.size
              })
              this.tableData1 = []
              this.tableData1 = res.data
              res.data.forEach((item, index) => {
                this.$set(this.tableData1, index, item)
              })
              this.count = res.page.total
              this.$nextTick(() => {
                this.setPageSize()
              })
            }
            this.loading = false
          })
        }   
      }
      if (this.type === 2) {
        const keyword = this.keyword
        const res = await supplierEvalueNoticeServer.searchTwo({
          keyword,
          page: this.page - 1,
          size: this.size
        })
        this.tableData2 = []
        this.tableData2 = res.data
        res.data.forEach((item, index) => {
          this.$set(this.tableData2, index, item)
        })
        this.loading = false
      } 
    },
    commitSearch() {
      this.page = 1
      this.search()
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
    resetSearch() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const strDate = date.getDate() 
      this.keyword.beginDate = year + '-' + month + '-' + '01'
      this.keyword.endDate = year + '-' + month + '-' + strDate
      this.keyword.year = year.toString()
      this.page = 1
      this.search()
    },
    clickExportBtn() {
      this.tHeader = []
      this.filterVal = []
      this.dataExport = []

      if (this.type === 1) {
        this.dataExport = JSON.parse(JSON.stringify(this.tableData1))
        this.tHeader = initExport1
        this.filterVal = filterVal1
      }

      if (this.type === 2) {
        this.dataExport = JSON.parse(JSON.stringify(this.tableData2))        
        this.tHeader[0] = initExport2_head1
        this.tHeader[1] = initExport2_head2
        this.filterVal = filterVal2
      }
      if (this.dataExport.length === 0) {        
        return this.$message({
          message: '无导出数据',
          type: 'warning'
        })
      }
      this.setExportData()
      this.showExportPopup = true
    },
    setExportData() {
      console.log('handle data transform')
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
  .container {
    /deep/ .yellow{
        background: yellow;
      }
  }
  .circle{
    width: 20px;
    height: 20px;
    margin:0 auto;
    border-radius: 10px;
  }
</style>
