<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="日期">
            <el-date-picker
              v-model="keyword.day"
              :clearable="false"
              size="mini"
              class="max-w"
              type="date"
              value-format="yyyy-MM-dd"
            />
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
    <template>
      <div class="dashboard-editor-container">
        <el-row :gutter="12">
          <el-col :xs="24" :sm="24" :lg="24">
            <div class="chart-wrapper">
              <p class="title">{{ titleYear }}指标完成率</p>
              <bar-chart :datas="yearData" :day="keyword.day" :type="'year'"/>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="24">
            <div class="chart-wrapper">
              <p class="title">{{ titleMonth }}指标完成率</p>
              <bar-chart :datas="monthData" :day="keyword.day" :type="'month'"/>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="24">
            <div class="chart-wrapper">
              <p class="title">{{ titleDay }}指标完成率</p>
              <bar-chart :datas="dayData" :day="keyword.day" :type="'day'"/>
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
import BarChart from './../../../components/entity/statistics/coreIndicators-stand/BarChart'
import coreIndicatorsStandServer from './../../../api/statistics/coreIndicatorsStandServer'
const dateFormat = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  const year = date.getFullYear()
  /* 在日期格式中，月份是从0开始的，因此要加0
   * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
   * */
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  // 拼接
  return (
    year + '-' + month + '-' + day
  )
}

const initSearchParams = {
  day: dateFormat()
}

export default {
  name: 'CoreIndicatorsStand',
  components: {
    BarChart
  },
  data() {
    return {
      titleYear: null,
      titleMonth: null,
      titleDay: null,
      yearData: {},
      monthData: {},
      dayData: {},
      keyword: {
        ...initSearchParams
      },
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
      // 将选中日期转成数组
      const dayList = this.keyword.day.split('-').map(e => parseInt(e))
      // 设置对应柱状图的时间标题
      this.titleYear = dayList[0] + '年'
      this.titleMonth = dayList[0] + '年' + dayList[1] + '月'
      this.titleDay = dayList[0] + '年' + dayList[1] + '月' + dayList[2] + '日'
      // 根据选择日期获取对应的报表数据
      const res = await coreIndicatorsStandServer.search({
        ...this.keyword
      })
      if (Number.parseInt(res.data.code) === 200) {
        // 获取数据成功后设置对应的值
        this.yearData = res.data.data.yearData
        this.monthData = res.data.data.yMonthData
        this.dayData = res.data.data.yMonthDayData
      } else {
        // 获取数据失败后清空对应的信息
        this.yearData = {}
        this.monthData = {}
        this.dayData = {}
      }
    },
    commitSearch() {
      this.search()
    },
    resetSearch() {
      this.keyword = {
        ...initSearchParams
      }
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
  .title{
    text-align: center;
    margin: 0 auto;
  }
  .dashboard-editor-container {
    padding: 10px 10px 0 10px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 10px 0;
      // padding: 5px 5px 0;
      margin-bottom: 10px;
    }
  }
</style>
