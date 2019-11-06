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
          <el-form-item label="商检批号">
            <el-input v-model="keyword.inspectionBatchno" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.warnNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="无要求到达时间">
            <TowingCabinetReqarrivalTimeFlagEnumSelect v-model="keyword.reqarrivalTimeFlag"/>            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="车牌号">
            <el-input v-model="keyword.plateNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="柜号">
            <el-input v-model="keyword.sealNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="排柜序号">
            <el-input v-model="keyword.solNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="协议货代">
            <el-input v-model="keyword.logisticsName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="要求到达起">
            <el-date-picker
              v-model="keyword.reqArrivalTimeBegin"
              size="mini"
              class="max-w"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="要求到达止">
            <el-date-picker
              v-model="keyword.reqArrivalTimeEnd"
              size="mini"
              class="max-w"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出厂时间起">
            <el-date-picker
              v-model="keyword.carOuttimeBegin"
              size="mini"
              class="max-w"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出厂时间止">
            <el-date-picker
              v-model="keyword.carOuttimeEnd"
              size="mini"
              class="max-w"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="装柜地点">
            <TowingCabinetBoxAddressEnumSelect v-model="keyword.boxAddress"/>            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="装柜状态">
            <TowingCabinetSolStatusEnumSelect v-model="keyword.solStatus"/>            
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
      <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickDragContWarn">同步拖柜进度</el-button>
      <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
      <!-- <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button> -->
    </el-button-group>
    <template>
      <el-table
        :data="tableData"
        :loading="loading"
        border
        class="m-t-12"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" fixed="left"/>
        <el-table-column
          show-overflow-tooltip
          prop="entid"
          sortable
          label="组织"
          min-width="100"
          fixed="left">
          <template slot-scope="scope">
            {{ scope.row.entid | OperaUnitFilter }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="piNo"
          sortable
          label="合同号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="bookingNo"
          sortable
          label="订舱单号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="inspectionBatchno"
          sortable
          label="商检批号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="solStatus"
          sortable
          label="装柜状态"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="warnNo"
          sortable
          label="出货预告号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="plateNo"
          sortable
          label="车牌号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="sealNo"
          sortable
          label="柜号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="solNo"
          sortable
          label="排柜序号"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="logisticsName"
          sortable
          label="协议货代"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="phone"
          sortable
          label="联系方式"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="reqArrivalTime"
          sortable
          label="要求到达时间"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.reqArrivalTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="actualArrivalTime"
          sortable
          label="实际到达时间"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.actualArrivalTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="solStartTime"
          sortable
          label="装箱开始时间"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.solStartTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="solFinishTime"
          sortable
          label="装箱完成时间"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.solFinishTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="zsolTime"
          sortable
          label="总装箱时间"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="carOuttime"
          sortable
          label="出厂时间"
          min-width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.carOuttime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="isOvernight"
          sortable
          label="是否过夜"
          min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.isOvernight === 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="boxAddress"
          sortable
          label="装柜地点"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="stopLate"
          sortable
          label="停空/迟到"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="lateTime"
          sortable
          label="迟到时间"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="lateReason"
          sortable
          label="迟到原因及备注"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="stopEmptyTime"
          sortable
          label="停空时间"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="stopEmptyExplain"
          sortable
          label="停空情况"
          min-width="150"
        />
        <el-table-column
          show-overflow-tooltip
          prop="nightNote"
          sortable
          label="关夜原因"
          min-width="150"
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
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import TowingCabinetReqarrivalTimeFlagEnumSelect from './../../../components/entity/statistics/towing-cabinet/TowingCabinetReqarrivalTimeFlagEnumSelect'
import TowingCabinetReqarrivalTimeFlagEnumUtil from './../../../components/enum/statistics/towing-cabinet/TowingCabinetReqarrivalTimeFlagEnumUtil'
import TowingCabinetBoxAddressEnumSelect from './../../../components/entity/statistics/towing-cabinet/TowingCabinetBoxAddressEnumSelect'
import TowingCabinetBoxAddressEnumUtil from './../../../components/enum/statistics/towing-cabinet/TowingCabinetBoxAddressEnumUtil'
import TowingCabinetSolStatusEnumSelect from './../../../components/entity/statistics/towing-cabinet/TowingCabinetSolStatusEnumSelect'
import TowingCabinetSolStatusEnumUtil from './../../../components/enum/statistics/towing-cabinet/TowingCabinetSolStatusEnumUtil'
import towingCabinetStatisticsServer from './../../../api/statistics/towingCabinetStatisticsServer'
const initSearchParams = {
  piNo: null,
  inspectionBatchno: null,
  warnNo: null,
  reqarrivalTimeFlag: null,
  plateNo: null,
  sealNo: null,
  solNo: null,
  logisticsName: null,
  reqArrivalTimeBeginStart: null,
  reqArrivalTimeBeginEnd: null,
  reqArrivalTimeEndStart: null,
  reqArrivalTimeEndEnd: null,
  carOuttimeBeginStart: null,
  carOuttimeBeginEnd: null,
  carOuttimeEndStart: null,
  carOuttimeEndEnd: null,
  boxAddress: null,
  solStatus: null,
}
const initExport = {
  entid: '组织',
  piNo: '合同号',
  bookingNo: '订舱单号',
  inspectionBatchno: '商检批号',
  solStatus: '装柜状态',
  warnNo: '出货预告号',
  plateNo: '车牌号',
  sealNo: '柜号',
  solNo: '排柜序号',
  logisticsName: '协议货代',
  phone: '联系方式',
  reqArrivalTime: '要求到达时间',
  actualArrivalTime: '实际到达时间',
  solStartTime: '装箱开始时间',
  solFinishTime: '装箱完成时间',
  zsolTime: '总装箱时间',
  carOuttime: '出厂时间',
  isOvernight: '是否过夜',
  boxAddress: '装柜地点',
  stopLate: '停空/迟到',
  lateTime: '迟到时间',
  lateReason: '迟到原因及备注',
  stopEmptyTime: '停空时间',
  stopEmptyExplain: '停空情况',
  nightNote: '关夜原因'
}
export default {
  name: 'TowingCabinetStatistics',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    TowingCabinetReqarrivalTimeFlagEnumSelect,
    TowingCabinetBoxAddressEnumSelect,
    TowingCabinetSolStatusEnumSelect,
  },
  filters: {
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
    TowingCabinetReqarrivalTimeFlagFilter: TowingCabinetReqarrivalTimeFlagEnumUtil.toTitleFilter,
    TowingCabinetBoxAddressFilter: TowingCabinetBoxAddressEnumUtil.toTitleFilter,
    TowingCabinetSolStatusFilter: TowingCabinetSolStatusEnumUtil.toTitleFilter,
  },
  data() {
    return {
      loading: false,
      keyword: {
        ...initSearchParams
      },
      page: 1,
      size: 10,
      count: 0,
      pageSize: [10, 20, 30, 40, 50],
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
      more: false,
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    if (this.$route.query.start) {
      this.keyword.reqArrivalTimeBegin = this.$route.query.start
    }
    if (this.$route.query.end) {
      this.keyword.reqArrivalTimeEnd = this.$route.query.end
    }
    this.search()
  },
  methods: {
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = {
        ...this.keyword
      }
      const res = await towingCabinetStatisticsServer.search({
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
      this.tHeader = initExport
      this.dataExport = JSON.parse(JSON.stringify(this.tableData))
      this.dataExport.forEach(item => {
        item.isOvernight = item.isOvernight === 1 ? '是' : '否'
      })
      this.setExportData()
      this.showExportPopup = true
    },
    async clickDragContWarn() {
      const res = await towingCabinetStatisticsServer.updateDragContWarn()
      if (Number.parseInt(res.data.code) === 200) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '操作失败',
          type: 'warning'
        })
      }
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
      width: 120px;
    }
    /deep/ .el-form-item__content {
      width: calc(100% - 120px);
    }
  }
  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
</style>
