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
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年份" required prop="year">
            <el-date-picker
              v-model="keyword.year"
              size="mini"
              class="max-w"
              type="year"
              value-format="yyyy"
              placeholder="选择年" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="月份" required prop="month">
            <el-date-picker
              v-model="keyword.month"
              size="mini"
              class="max-w"
              type="month"
              format="MM"
              value-format="MM"
              placeholder="选择月" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button v-loading="loading" type="primary" size="mini" @click="commitSearch">查询</el-button>
            <!-- <el-button v-loading="loading" size="mini" @click="resetSearch">重置</el-button> -->
            <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template>
      <el-table
        v-loading="loading"
        :data="tableData1"
        border
        class="m-t-12"
        style="width: 100%"
      > 
        <el-table-column label="订舱发货进度通报表(大区)(万套)" align="center">
          <el-table-column
            show-overflow-tooltip
            prop="zoneName"
            align="center"
            label="大区" />
          <el-table-column
            show-overflow-tooltip
            prop="qtyNum1"
            align="center"
            label="预算" />  
          <el-table-column label="发货完成情况" align="center">
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum2"
              align="center"
              label="预估" />
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum3"
              align="center"
              label="已发" />    
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum4"
              min-width="90"
              label="完成率(%)" />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="lightColor"
              label="亮灯">
              <template slot-scope="scope">
                <div :style="'background-color:' + scope.row.lightColor" class="circle"/>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum5"
              align="center"
              label="过账" />
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum6"
              align="center"
              label="库存" />      
          </el-table-column> 
          <el-table-column label="订舱未发货" align="center">
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum7"
              align="center"
              label="合计" />
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum8"
              align="center"
              label="已排" />    
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum9"
              align="center"
              label="未排" /> 
          </el-table-column>    
          <el-table-column label="预计达成" align="center">
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum10"
              align="center"
              label="总计" />
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum11"
              align="center"
              min-width="90"
              label="完成率(%)" />    
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum12"
              label="缺口" /> 
          </el-table-column>      
        </el-table-column>
        <el-table-column label="订舱发货进度通报表(大区)(柜量)" align="center">
          <el-table-column label="已排柜" align="center">
            <el-table-column
              :label="dayOne"
              show-overflow-tooltip
              prop="qtyNum13"
              align="center" />
            <el-table-column
              :label="dayTwo"
              show-overflow-tooltip
              prop="qtyNum14"
              align="center" />    
            <el-table-column
              :label="dayThree"
              show-overflow-tooltip
              prop="qtyNum15" /> 
            <el-table-column
              :label="dayFour"
              show-overflow-tooltip
              prop="qtyNum16"
              align="center" />
            <el-table-column
              :label="dayFive"
              show-overflow-tooltip
              prop="qtyNum17"
              align="center" />    
            <el-table-column
              show-overflow-tooltip
              prop="qtyNum18"
              label="小计" />   
          </el-table-column> 
          <el-table-column label="未排柜" align="center">
            <el-table-column
              label="无船期"
              show-overflow-tooltip
              prop="qtyNum19"
              align="center" />
            <el-table-column
              label="有船期"
              show-overflow-tooltip
              prop="qtyNum20"
              align="center" />    
            <el-table-column
              :label="dateIntervalOne"
              show-overflow-tooltip
              min-width="120"
              prop="qtyNum21" /> 
            <el-table-column
              :label="dateIntervalTwo"
              show-overflow-tooltip
              prop="qtyNum22"
              min-width="120"
              align="center" />
            <el-table-column
              :label="dateIntervalThree"
              show-overflow-tooltip
              prop="qtyNum23"
              min-width="120"
              align="center" />     
          </el-table-column>     
        </el-table-column>   
      </el-table>
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
import bookingShippingNoticeServer from './../../../api/bookingShippingNoticeServer'
import StatusEnumUtils from './../../../components/enum/report-form/StatusEnumUtils'
const initSearchParams = {
  year: null,
  month: null,
}
const initExport2_head1 = [
  '订舱发货进度通报表(大区)(万套)', '订舱发货进度通报表(大区)(万套)', '订舱发货进度通报表(大区)(万套)', '订舱发货进度通报表(大区)(万套)',
  '订舱发货进度通报表(大区)(万套)', '订舱发货进度通报表(大区)(万套)', '订舱发货进度通报表(大区)(万套)', '订舱发货进度通报表(大区)(万套)',
  '订舱发货进度通报表(大区)(万套)', '订舱发货进度通报表(大区)(万套)', '订舱发货进度通报表(大区)(万套)', '订舱发货进度通报表(大区)(万套)',
  '订舱发货进度通报表(大区)(万套)', '订舱发货进度通报表(大区)(万套)',
  '订舱发货进度通报表(大区)(柜量)', '订舱发货进度通报表(大区)(柜量)', '订舱发货进度通报表(大区)(柜量)',
  '订舱发货进度通报表(大区)(柜量)', '订舱发货进度通报表(大区)(柜量)', '订舱发货进度通报表(大区)(柜量)',
  '订舱发货进度通报表(大区)(柜量)', '订舱发货进度通报表(大区)(柜量)', '订舱发货进度通报表(大区)(柜量)',
  '订舱发货进度通报表(大区)(柜量)', '订舱发货进度通报表(大区)(柜量)'
]
const initExport2_head2 = [
  ' ', ' ',
  '发货完成情况', '发货完成情况', '发货完成情况', '发货完成情况', '发货完成情况', '发货完成情况',
  '订舱未发货', '订舱未发货', '订舱未发货',
  '预计达成', '预计达成', '预计达成',
  '已排柜', '已排柜', '已排柜', '已排柜', '已排柜', '已排柜',
  '未排柜', '未排柜', '未排柜', '未排柜', '未排柜'
]
const initExport2_head3 = [
  '大区', '预算',
  '预估', '已发', '完成率(%)', '亮灯', '过账', '库存',
  '合计', '已排', '未排',
  '总计', '完成率(%)', '缺口',
  '10月25日', '10月26日', '10月27日', '10月28日', '10月29日', '小计',
  '无船期', '有船期', '10月25日-10月29日', '10月30日-11月3日', '11月4日-11月8日',
]
const filterVal = [
  'zoneName', 'qtyNum1',
  'qtyNum2', 'qtyNum3', 'qtyNum4', 'lightColor', 'qtyNum5', 'qtyNum6',
  'qtyNum7', 'qtyNum8', 'qtyNum9',
  'qtyNum10', 'qtyNum11', 'qtyNum12',
  'qtyNum13', 'qtyNum14', 'qtyNum15', 'qtyNum16', 'qtyNum17', 'qtyNum18',
  'qtyNum19', 'qtyNum20', 'qtyNum21', 'qtyNum22', 'qtyNum23',
]
export default {
  name: 'BookSpaceProgressManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue')
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
      dayOne: null,
      dayTwo: null,
      dayThree: null,
      dayFour: null,
      dayFive: null,
      dateIntervalOne: null,
      dateIntervalTwo: null,
      dateIntervalThree: null,
      comeTime: 1,
      rules: {
        year: [
          { required: true, message: '不能为空', trigger: 'blur' },  
        ],
        month: [
          { required: true, message: '不能为空', trigger: 'blur' },  
        ],
      },
      size: 10,
      count: 0,
      sort: null,
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
    }
  },
  created() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    this.keyword.year = year.toString()
    this.keyword.month = month.toString()
    this.dayOne = this.dateAdd(0)
    this.dayTwo = this.dateAdd(1)
    this.dayThree = this.dateAdd(2)
    this.dayFour = this.dateAdd(3)
    this.dayFive = this.dateAdd(4)
    this.dateIntervalOne = this.dateAdd(3) + '/' + this.dateAdd(7)
    this.dateIntervalTwo = this.dateAdd(8) + '/' + this.dateAdd(12)
    this.dateIntervalThree = this.dateAdd(13) + '/' + this.dateAdd(17)
    this.search()
  },
  methods: {
    dateAdd(val) {
      const date = new Date(new Date().getTime() + (24 * 60 * 60 * 1000) * val)
      return (date.getMonth() + 1) + '月' + date.getDate() + '日'
    },
    clickExportBtn() {
      this.dataExport = JSON.parse(JSON.stringify(this.tableData1))
      this.tHeader[0] = initExport2_head1
      this.tHeader[1] = initExport2_head2
      this.tHeader[2] = initExport2_head3
      this.filterVal = filterVal
      if (this.dataExport.length === 0) {
        return this.$message({
          message: '无导出数据',
          type: 'warning'
        })
      }
      this.showExportPopup = true
    },
    findTotalInfo(data) {
       const query = {}
        query['zoneName'] = '合计'
        let qtyNum1 = 0
        let qtyNum2 = 0 
        let qtyNum3 = 0
        let qtyNum4 = 0 
        let qtyNum5 = 0 
        let qtyNum6 = 0 
        let qtyNum7 = 0 
        let qtyNum8 = 0 
        let qtyNum9 = 0 
        let qtyNum10 = 0 
        let qtyNum11 = 0 
        let qtyNum12 = 0 
        let qtyNum13 = 0 
        let qtyNum14 = 0 
        let qtyNum15 = 0 
        let qtyNum16 = 0 
        let qtyNum17 = 0 
        let qtyNum18 = 0 
        let qtyNum19 = 0 
        let qtyNum20 = 0 
        let qtyNum21 = 0 
        let qtyNum22 = 0 
        let qtyNum23 = 0
        for (let i = 0; i < data.length; i++) {
          qtyNum1 += data[i].qtyNum1
          qtyNum2 += data[i].qtyNum2
          qtyNum3 += data[i].qtyNum3
          qtyNum5 += data[i].qtyNum5
          qtyNum6 += data[i].qtyNum6
          qtyNum7 += data[i].qtyNum7
          qtyNum8 += data[i].qtyNum8
          qtyNum9 += data[i].qtyNum9
          qtyNum10 += data[i].qtyNum10
          qtyNum12 += data[i].qtyNum12
          qtyNum13 += data[i].qtyNum13
          qtyNum14 += data[i].qtyNum14
          qtyNum15 += data[i].qtyNum15
          qtyNum16 += data[i].qtyNum16
          qtyNum17 += data[i].qtyNum17
          qtyNum18 += data[i].qtyNum18
          qtyNum19 += data[i].qtyNum19
          qtyNum20 += data[i].qtyNum20
          qtyNum21 += data[i].qtyNum21
          qtyNum22 += data[i].qtyNum22
          qtyNum23 += data[i].qtyNum23
        }
        if (qtyNum3 !== 0 && qtyNum2 !== 0) {
          qtyNum4 = (qtyNum3 / qtyNum2) * 100
        }
        if (qtyNum10 !== 0 && qtyNum2 !== 0) {
          qtyNum11 = (qtyNum10 / qtyNum2) * 100
        }
        query['qtyNum1'] = /\./.test(qtyNum1) ? qtyNum1.toFixed(2) : qtyNum1
        query['qtyNum2'] = /\./.test(qtyNum2) ? qtyNum2.toFixed(2) : qtyNum2
        query['qtyNum3'] = /\./.test(qtyNum3) ? qtyNum3.toFixed(2) : qtyNum3
        query['qtyNum4'] = /\./.test(qtyNum4) ? qtyNum4.toFixed(2) : qtyNum4
        query['qtyNum5'] = /\./.test(qtyNum5) ? qtyNum5.toFixed(2) : qtyNum5
        query['qtyNum6'] = /\./.test(qtyNum6) ? qtyNum6.toFixed(2) : qtyNum6
        query['qtyNum7'] = /\./.test(qtyNum7) ? qtyNum7.toFixed(2) : qtyNum7
        query['qtyNum8'] = /\./.test(qtyNum8) ? qtyNum8.toFixed(2) : qtyNum8
        if (qtyNum4 < 60) {
          query['lightColor'] = 'red'
        } else if (qtyNum4 >= 60 && qtyNum4 < 90) {
          query['lightColor'] = 'yellow'
        } else if (qtyNum4 >= 90 && qtyNum4 <= 100) {
          query['lightColor'] = 'green'
        }
        query['qtyNum9'] = /\./.test(qtyNum9) ? qtyNum9.toFixed(2) : qtyNum9
        query['qtyNum10'] = /\./.test(qtyNum10) ? qtyNum10.toFixed(2) : qtyNum10
        query['qtyNum11'] = /\./.test(qtyNum11) ? qtyNum11.toFixed(2) : qtyNum11
        query['qtyNum12'] = /\./.test(qtyNum12) ? qtyNum12.toFixed(2) : qtyNum12
        query['qtyNum13'] = /\./.test(qtyNum13) ? qtyNum13.toFixed(2) : qtyNum13
        query['qtyNum14'] = /\./.test(qtyNum14) ? qtyNum14.toFixed(2) : qtyNum14
        query['qtyNum15'] = /\./.test(qtyNum15) ? qtyNum15.toFixed(2) : qtyNum15
        query['qtyNum16'] = /\./.test(qtyNum16) ? qtyNum16.toFixed(2) : qtyNum16
        query['qtyNum17'] = /\./.test(qtyNum17) ? qtyNum17.toFixed(2) : qtyNum17
        query['qtyNum18'] = /\./.test(qtyNum18) ? qtyNum18.toFixed(2) : qtyNum18
        query['qtyNum19'] = /\./.test(qtyNum19) ? qtyNum19.toFixed(2) : qtyNum19
        query['qtyNum20'] = /\./.test(qtyNum20) ? qtyNum20.toFixed(2) : qtyNum20
        query['qtyNum21'] = /\./.test(qtyNum21) ? qtyNum21.toFixed(2) : qtyNum21
        query['qtyNum22'] = /\./.test(qtyNum22) ? qtyNum22.toFixed(2) : qtyNum22
        query['qtyNum23'] = /\./.test(qtyNum23) ? qtyNum23.toFixed(2) : qtyNum23
        return query
    },
    async search() {
      this.loading = true
      if (this.comeTime === 1) {
        const keyword = this.keyword
        const res = await bookingShippingNoticeServer.search({
          keyword,
        })
        this.tableData1 = []
        this.tableData1 = res.data
        const query = this.findTotalInfo(this.tableData1)
        this.tableData1.unshift(query)
        res.data.forEach((item, index) => {
          this.$set(this.tableData1, index, item)
        })
        this.comeTime = 2
        this.loading = false
      } else {
        this.$refs['keyword'].validate(async valid => {
          if (valid) {
            const keyword = this.keyword
            const res = await bookingShippingNoticeServer.search({
              keyword,
            })
            this.tableData1 = []
            this.tableData1 = res.data
            const query = this.findTotalInfo(this.tableData1)
            this.tableData1.unshift(query)
            res.data.forEach((item, index) => {
              this.$set(this.tableData1, index, item)
            })
          }
          this.loading = false    
        })      
      }   
    },
    commitSearch() {
      this.search()
    },
    resetSearch() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      this.keyword.year = year.toString()
      this.keyword.month = month.toString()
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
  .circle{
    width: 20px;
    height: 20px;
    margin:0 auto;
    border-radius: 10px;
  }
</style>
