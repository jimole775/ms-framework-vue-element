<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="汇总方式">
            <el-select
              v-model="keyword.summaryType"
              :clearable="false"
              size="mini"
              class="max-w"
              @change="chanageSummaryType">
              <el-option
                v-for="item in summaryTypeList"
                :key="item.id"
                :label="item.title"
                :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年份">
            <el-date-picker
              v-model="keyword.pYear"
              :clearable="false"
              size="mini"
              class="max-w"
              type="year"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="月份">
            <ShippingCapacitySMonthStatEnumSelect v-model="keyword.pMonth" :disabled="disabledMonth" :clearable="false"/>            
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="日期">
            <el-date-picker
              v-model="keyword.yMonthDay"
              :disabled="disabledDay"
              size="mini"
              class="max-w"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="阶段日期">
            <el-date-picker
              v-model="keyword.daterange"
              :disabled="disabledDaterange"
              type="daterange"
              start-placeholder="开始"
              end-placeholder="结束"
              size="mini"
              class="max-w"
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
      <el-row :gutter="12" class="table-box">
        <el-col :lg="16" :md="24" :sm="24" :xs="24">
          <p class="title">到柜/装柜及时率与停空率汇总</p>
          <el-table
            :data="tableData1"
            :loading="loading"
            border
            class="m-t-12"
            height="250"
            style="width: 100%"
          >
            <el-table-column type="index" width="55" label="序号" fixed="left"/>
            <el-table-column
              align="center"
              label="到柜">
              <el-table-column
                show-overflow-tooltip
                prop="arrivalRate"
                sortable
                min-width="140"
                label="到柜及时率%" />
              <el-table-column
                show-overflow-tooltip
                prop="planContQty"
                sortable
                min-width="140"
                label="计划到柜" />
              <el-table-column
                show-overflow-tooltip
                prop="actualArrivalTime"
                sortable
                min-width="140"
                label="实际到柜" />
              <el-table-column
                show-overflow-tooltip
                prop="arrivalQty"
                sortable
                min-width="140"
                label="及时到柜" />
            </el-table-column>
            <el-table-column
              align="center"
              label="装柜">
              <el-table-column
                show-overflow-tooltip
                prop="loadingRate"
                sortable
                min-width="140"
                label="装柜及时率%" />
              <el-table-column
                show-overflow-tooltip
                prop="planContQty"
                sortable
                min-width="140"
                label="计划装柜" />
              <el-table-column
                show-overflow-tooltip
                prop="solFinishTime"
                sortable
                min-width="140"
                label="实际装柜" />
              <el-table-column
                show-overflow-tooltip
                prop="loadingQty"
                sortable
                min-width="140"
                label="及时装柜" />
            </el-table-column>
            <el-table-column
              align="center"
              label="停空">
              <el-table-column
                show-overflow-tooltip
                prop="emptyRate"
                sortable
                min-width="140"
                label="停空率%" />
              <el-table-column
                show-overflow-tooltip
                prop="planContQty"
                sortable
                min-width="140"
                label="计划装柜" />
              <el-table-column
                show-overflow-tooltip
                prop="stopContQty"
                sortable
                min-width="140"
                label="停空柜数" />
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :lg="8" :md="24" :sm="24" :xs="24">
          <p class="title">迟到时间汇总</p>
          <el-table
            :data="tableData2"
            :loading="loading"
            border
            class="m-t-12"
            height="250"
            style="width: 100%"
          >
            <el-table-column type="index" width="55" label="序号"/>
            <el-table-column
              show-overflow-tooltip
              prop="titleName"
              sortable
              min-width="140"
              label="货代公司" />
            <el-table-column
              align="center"
              label="迟到时间合计">
              <el-table-column
                show-overflow-tooltip
                prop="yTotal"
                sortable
                min-width="100"
                label="年累" />
              <el-table-column type="index" label="排名"/>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="12" class="table-box">
        <el-col :lg="8" :md="24" :sm="24" :xs="24">
          <p class="title">停空时间汇总</p>
          <el-table
            :data="tableData3"
            :loading="loading"
            border
            class="m-t-12"
            height="250"
            style="width: 100%"
          >
            <el-table-column type="index" width="55" label="序号"/>
            <el-table-column
              show-overflow-tooltip
              prop="titleName"
              sortable
              min-width="140"
              label="货代公司" />
            <el-table-column
              align="center"
              label="停空时间合计">
              <el-table-column
                show-overflow-tooltip
                prop="yTotal"
                sortable
                min-width="100"
                label="年累" />
              <el-table-column type="index" label="排名"/>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :lg="8" :md="24" :sm="24" :xs="24">
          <p class="title">迟到费用汇总</p>
          <el-table
            :data="tableData4"
            :loading="loading"
            border
            class="m-t-12"
            height="250"
            style="width: 100%"
          >
            <el-table-column type="index" width="55" label="序号"/>
            <el-table-column
              show-overflow-tooltip
              prop="titleName"
              sortable
              min-width="140"
              label="货代公司" />
            <el-table-column
              align="center"
              label="迟到费用合计">
              <el-table-column
                show-overflow-tooltip
                prop="yTotal"
                sortable
                min-width="100"
                label="年累" />
              <el-table-column type="index" label="排名"/>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :lg="8" :md="24" :sm="24" :xs="24">
          <p class="title">停空费用汇总</p>
          <el-table
            :data="tableData5"
            :loading="loading"
            border
            class="m-t-12"
            height="250"
            style="width: 100%"
          >
            <el-table-column type="index" width="55" label="序号"/>
            <el-table-column
              show-overflow-tooltip
              prop="titleName"
              sortable
              min-width="140"
              label="货代公司" />
            <el-table-column
              align="center"
              label="停空费用合计">
              <el-table-column
                show-overflow-tooltip
                prop="yTotal"
                sortable
                min-width="100"
                label="年累" />
              <el-table-column type="index" label="排名"/>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="12" class="table-box">
        <el-col :lg="8" :md="24" :sm="24" :xs="24">
          <p class="title">迟到原因汇总</p>
          <el-table
            :data="tableData6"
            :loading="loading"
            border
            class="m-t-12"
            height="250"
            style="width: 100%"
          >
            <el-table-column type="index" width="55" label="序号"/>
            <el-table-column
              show-overflow-tooltip
              prop="titleName"
              sortable
              min-width="140"
              label="迟到原因" />
            <el-table-column
              show-overflow-tooltip
              prop="yTotal"
              sortable
              min-width="100"
              label="年累" />
            <el-table-column type="index" width="55" label="排名"/>
          </el-table>
        </el-col>
        <el-col :lg="8" :md="24" :sm="24" :xs="24">
          <p class="title">停空原因汇总</p>
          <el-table
            :data="tableData7"
            :loading="loading"
            border
            class="m-t-12"
            height="250"
            style="width: 100%"
          >
            <el-table-column type="index" width="55" label="序号"/>
            <el-table-column
              show-overflow-tooltip
              prop="titleName"
              sortable
              min-width="140"
              label="停空原因" />
            <el-table-column
              show-overflow-tooltip
              prop="yTotal"
              sortable
              min-width="100"
              label="年累" />
            <el-table-column type="index" width="55" label="排名"/>
          </el-table>
        </el-col>
        <el-col :lg="8" :md="24" :sm="24" :xs="24">
          <p class="title">货代费用汇总</p>
          <el-table
            :data="tableData8"
            :loading="loading"
            border
            class="m-t-12"
            height="250"
            style="width: 100%"
          >
            <el-table-column type="index" width="55" label="序号"/>
            <el-table-column
              show-overflow-tooltip
              prop="titleName"
              sortable
              min-width="140"
              label="货代费用" />
            <el-table-column
              show-overflow-tooltip
              prop="yTotal"
              sortable
              min-width="100"
              label="年累" />
          </el-table>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
import ShippingCapacitySMonthStatEnumSelect from './../../../components/entity/statistics/shipping-capacity/ShippingCapacitySMonthStatEnumSelect'
import towerSummaryServer from './../../../api/statistics/towerSummaryServer'

const dateFormat = () => {
  const date = new Date()
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
  summaryType: 1,
  pYear: (new Date()).getFullYear().toString(),
  pMonth: null,
  yMonthDay: null,
  daterange: null,
  yMonthDayStart: null,
  yMonthDayEnd: null,
  entid: null,
}

const summaryTypeListInit = [
  {
    id: 1,
    title: '按年'
  },
  {
    id: 2,
    title: '按月'
  },
  {
    id: 3,
    title: '按日'
  }
]

export default {
  name: 'TowerSummary',
  components: {
    ShippingCapacitySMonthStatEnumSelect,
  },
  data() {
    return {
      summaryTypeList: summaryTypeListInit,
      disabledMonth: true,
      disabledDay: true,
      disabledDaterange: true,
      loading: false,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      tableData7: [],
      tableData8: [],
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
    chanageSummaryType(summaryType) {
      this.keyword.daterange = null
      this.keyword.yMonthDayStart = null
      this.keyword.yMonthDayEnd = null
      if (summaryType === 1) {
        // 按年查询
        this.disabledMonth = true
        this.disabledDay = true
        this.disabledDaterange = true
        this.keyword.pMonth = null
        this.keyword.yMonthDay = null
      } else if (summaryType === 2) {
        // 按月查询
        this.disabledMonth = false
        this.disabledDay = true
        this.disabledDaterange = true
        this.keyword.pMonth = ((new Date()).getMonth() + 1).toString()
        this.keyword.yMonthDay = null
        this.keyword.daterange = null
      } else if (summaryType === 3) {
        // 按日查询
        this.disabledMonth = false
        this.disabledDay = false
        this.disabledDaterange = false
        this.keyword.pMonth = ((new Date()).getMonth() + 1).toString()
        this.keyword.yMonthDay = dateFormat()
        this.keyword.daterange = null
      }
    },
    async search() {
      if (this.keyword.summaryType === 3 && !this.keyword.daterange && !this.keyword.yMonthDay) {
        // 如果是按日查询，日期和阶段日期必填一个
        this.$message({
          message: '请先选择日期，阶段日期优先',
          type: 'warning'
        })
        return
      }
      if (this.keyword.daterange) {
        this.keyword.yMonthDayStart = this.keyword.daterange[0]
        this.keyword.yMonthDayEnd = this.keyword.daterange[1]
      }
      this.keyword.entid = this.$store.getters.entid
      this.loading = true
      // 根据选择日期获取对应的报表数据
      const res = await towerSummaryServer.search({
        ...this.keyword
      })
      if (Number.parseInt(res.data.code) === 200) {
        // 获取数据成功后设置对应的值
        this.tableData1 = res.data.data.result1
        this.tableData1.forEach((item, index) => {
          this.$set(this.tableData1, index, item)
        })
        this.tableData2 = res.data.data.result2
        this.tableData2.forEach((item, index) => {
          this.$set(this.tableData2, index, item)
        })
        this.tableData3 = res.data.data.result3
        this.tableData3.forEach((item, index) => {
          this.$set(this.tableData3, index, item)
        })
        this.tableData4 = res.data.data.result4
        this.tableData4.forEach((item, index) => {
          this.$set(this.tableData4, index, item)
        })
        this.tableData5 = res.data.data.result5
        this.tableData5.forEach((item, index) => {
          this.$set(this.tableData5, index, item)
        })
        this.tableData6 = res.data.data.result6
        this.tableData6.forEach((item, index) => {
          this.$set(this.tableData6, index, item)
        })
        this.tableData7 = res.data.data.result7
        this.tableData7.forEach((item, index) => {
          this.$set(this.tableData7, index, item)
        })
        this.tableData8 = res.data.data.result8
        this.tableData8.forEach((item, index) => {
          this.$set(this.tableData8, index, item)
        })
      } else {
        // 获取数据失败后清空对应的信息
        this.tableData1 = []
        this.tableData2 = []
        this.tableData3 = []
        this.tableData4 = []
        this.tableData5 = []
        this.tableData6 = []
        this.tableData7 = []
        this.tableData8 = []
      }
      this.loading = false
    },
    commitSearch() {
      this.search()
    },
    resetSearch() {
      this.disabledMonth = true
      this.disabledDay = true
      this.disabledDaterange = true
      this.keyword = {
        ...initSearchParams
      }
      this.keyword.pMonth = null
      this.keyword.yMonthDay = null
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
      width: 70px;
    }
    /deep/ .el-form-item__content {
      width: calc(100% - 70px);
    }
  }
  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
  .title{
    text-align: left;
    margin: 0 auto;
    padding-left: 10px;
  }
  .table-box {
    padding-bottom: 10px;
  }
</style>
