<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="组织id">
            <EntidTypeEnumSelect v-model="keyword.entid" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告">
            <el-input v-model="keyword.warnNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="商检编号">
            <el-input v-model="keyword.inspectionBatchnos" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="订舱发起时间起">
            <el-date-picker v-model="keyword.createDateStart" size="mini" class="max-w" type="date" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="订舱发起时间止">
            <el-date-picker v-model="keyword.createDateEnd" size="mini" class="max-w" type="date" />
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
    <el-button-group>
      <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
      <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
    </el-button-group>
    <el-alert :closable="false" :title="`已选中 ${multipleSelection.length} 行数据`" class="m-t-12" type="info" show-icon />
    <template>
      <el-table :data="tableData" :loading="loading" border class="m-t-12" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column v-if="eye.cutDate" show-overflow-tooltip prop="cutDate" sortable label="截关日期" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.cutDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column v-if="eye.daynum" show-overflow-tooltip prop="daynum" sortable label="订舱周期" min-width="150" />
        <el-table-column v-if="eye.orgName" show-overflow-tooltip prop="orgName" sortable label="部门" min-width="150" />
        <el-table-column v-if="eye.boxQty" show-overflow-tooltip prop="boxQty" sortable label="总柜量" min-width="150" />
        <el-table-column v-if="eye.totalQty" show-overflow-tooltip prop="totalQty" sortable label="预排柜数量" min-width="150" />
        <el-table-column v-if="eye.entid" show-overflow-tooltip prop="entid" sortable label="组织id" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.entid | EntidTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column v-if="eye.payStyle" show-overflow-tooltip prop="payStyle" sortable label="运费付款方式" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.payStyle | ActSaleBookingDeliveryReportSelectPayStyleFilter }}
          </template>
        </el-table-column>
        <el-table-column v-if="eye.custName" show-overflow-tooltip prop="custName" sortable label="客户" min-width="150" />
        <el-table-column v-if="eye.piNo" show-overflow-tooltip prop="piNo" sortable label="合同号" min-width="150" />
        <el-table-column v-if="eye.preShipDate" show-overflow-tooltip prop="preShipDate" sortable label="预计装柜日期" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.preShipDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column v-if="eye.towingStat" show-overflow-tooltip prop="towingStat" sortable label="拖柜情况" min-width="150" />
        <el-table-column v-if="eye.salesUserId" show-overflow-tooltip prop="salesUserId" sortable label="业务员" min-width="150" />
        <el-table-column v-if="eye.transitName" show-overflow-tooltip prop="transitName" sortable label="协议货代" min-width="150" />
        <el-table-column v-if="eye.areaName" show-overflow-tooltip prop="areaName" sortable label="大区" min-width="150" />
        <el-table-column v-if="eye.sumActualNoticeQty" show-overflow-tooltip prop="sumActualNoticeQty" sortable label="实际发货" min-width="150" />
        <el-table-column v-if="eye.shipType" show-overflow-tooltip prop="shipType" sortable label="发运方式" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.shipType | ActSaleBookingDeliveryReportSelectShipTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column v-if="eye.warnNo" show-overflow-tooltip prop="warnNo" sortable label="出货预告" min-width="150" />
        <el-table-column v-if="eye.procname" show-overflow-tooltip prop="procname" sortable label="当前审核人" min-width="150" />
        <el-table-column v-if="eye.warnId" show-overflow-tooltip prop="warnId" sortable label="出货预告id" min-width="150" />
        <el-table-column v-if="eye.inspectionBatchnos" show-overflow-tooltip prop="inspectionBatchnos" sortable label="商检编号" min-width="150" />
        <el-table-column v-if="eye.createDate" show-overflow-tooltip prop="createDate" sortable label="订舱发起时间" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.createDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="m-w cen-box m-t-12">
      <el-pagination :current-page="page" :page-sizes="pageSize" :page-size="size" :total="count" :layout="windowWidth < 768 ? 'total, jumper' : 'total, sizes, prev, pager, next, jumper'" @size-change="pageSizeChange" @current-change="pageNumberChange" />
    </div>
    <el-dialog :visible="showEye" width="360px" title="show-field" top="10vh" @close="showEye = false">
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.cutDate">截关日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.daynum ">订舱周期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orgName">部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.boxQty">总柜量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.totalQty">预排柜数量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entid">组织id</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payStyle">运费付款方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custName">客户</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.piNo">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.preShipDate">预计装柜日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.towingStat">拖柜情况</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.salesUserId">业务员</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.transitName">协议货代</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.areaName">大区</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.sumActualNoticeQty">实际发货</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shipType">发运方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnNo">出货预告</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.procname">当前审核人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnId">出货预告id</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.inspectionBatchnos">商检编号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createDate">订舱发起时间</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EntidTypeEnumSelect from './../../../components/entity/statistics/act-sale-booking-delivery-report-select/EntidTypeEnumSelect'
import EntidTypeEnumUtil from './../../../components/enum/statistics/act-sale-booking-delivery-report-select/EntidTypeEnumUtil'
import ActSaleBookingDeliveryReportSelectPayStyleEnumSelect from './../../../components/entity/statistics/act-sale-booking-delivery-report-select/ActSaleBookingDeliveryReportSelectPayStyleEnumSelect'
import ActSaleBookingDeliveryReportSelectPayStyleEnumUtil from './../../../components/enum/statistics/act-sale-booking-delivery-report-select/ActSaleBookingDeliveryReportSelectPayStyleEnumUtil'
import ActSaleBookingDeliveryReportSelectShipTypeEnumSelect from './../../../components/entity/statistics/act-sale-booking-delivery-report-select/ActSaleBookingDeliveryReportSelectShipTypeEnumSelect'
import ActSaleBookingDeliveryReportSelectShipTypeEnumUtil from './../../../components/enum/statistics/act-sale-booking-delivery-report-select/ActSaleBookingDeliveryReportSelectShipTypeEnumUtil'
import actSaleBookingDeliveryReportSelectStatisticsServer from './../../../api/statistics/actSaleBookingDeliveryReportSelectStatisticsServer'
const initSearchParams = {
  cutDateStart: new Date(new Date().getTime() - 2592000000),
  cutDateEnd: new Date(),
  orgName: null,
  boxQty: null,
  totalQty: null,
  entid: null,
  payStyle: null,
  custName: null,
  piNo: null,
  preShipDateStart: null,
  preShipDateEnd: null,
  towingStat: null,
  salesUserId: null,
  transitName: null,
  areaName: null,
  sumActualNoticeQty: null,
  shipType: null,
  warnNo: null,
  procname: null,
  warnId: null,
  inspectionBatchnos: null,
  createDateStart: new Date(new Date().getTime() - 2592000000),
  createDateEnd: new Date(),
}
const initExport = {
  cutDate: '截关日期',
  daynum: '订舱周期',
  orgName: '部门',
  boxQty: '总柜量',
  totalQty: '预排柜数量',
  entid: '组织id',
  payStyle: '运费付款方式',
  custName: '客户',
  piNo: '合同号',
  preShipDate: '预计装柜日期',
  towingStat: '拖柜情况',
  salesUserId: '业务员',
  transitName: '协议货代',
  areaName: '大区',
  sumActualNoticeQty: '实际发货',
  shipType: '发运方式',
  warnNo: '出货预告',
  procname: '当前审核人',
  warnId: '出货预告id',
  inspectionBatchnos: '商检编号',
  createDate: '订舱发起时间',
}
export default {
  name: 'ActSaleBookingDeliveryReportSelectStatistics',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    EntidTypeEnumSelect,
    ActSaleBookingDeliveryReportSelectPayStyleEnumSelect,
    ActSaleBookingDeliveryReportSelectShipTypeEnumSelect,
  },
  filters: {
    EntidTypeFilter: EntidTypeEnumUtil.toTitleFilter,
    ActSaleBookingDeliveryReportSelectPayStyleFilter: ActSaleBookingDeliveryReportSelectPayStyleEnumUtil.toTitleFilter,
    ActSaleBookingDeliveryReportSelectShipTypeFilter: ActSaleBookingDeliveryReportSelectShipTypeEnumUtil.toTitleFilter,
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
      more: true,
      eye: {
        cutDate: true,
        daynum: true,
        orgName: true,
        boxQty: true,
        totalQty: true,
        entid: true,
        payStyle: true,
        custName: true,
        piNo: true,
        preShipDate: true,
        towingStat: true,
        salesUserId: true,
        transitName: true,
        areaName: true,
        sumActualNoticeQty: true,
        shipType: true,
        warnNo: true,
        procname: true,
        warnId: true,
        inspectionBatchnos: true,
        createDate: true,
      },
      showEye: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    if (this.$route.query.start) {
      this.keyword.createDateStart = this.$route.query.start
    }
    if (this.$route.query.end) {
      this.keyword.createDateEnd = this.$route.query.end
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
      const res = await actSaleBookingDeliveryReportSelectStatisticsServer.search({
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
      if (this.multipleSelection.length === 0 && this.tableData.length === 0) {
        this.$message({
            message: '请选择要导出的数据',
            showClose: true,
            type: 'warning'
          })
        return false
      }
      if (this.multipleSelection.length > 0) {
        this.dataExport = this.multipleSelection
      } else if (this.tableData.length > 0) {
        this.dataExport = this.tableData
      }
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
        if (this.eye[key]) {
          this.filterVal.push(key)
          this.tHeader.push(initExport[key])
        }
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
