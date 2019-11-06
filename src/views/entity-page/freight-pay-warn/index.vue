<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="预计发货日期起始">
            <el-date-picker
              v-model="keyword.preShipDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="预计发货日期结束">
            <el-date-picker
              v-model="keyword.preShipDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="大区">
            <el-input v-model="keyword.superOrgId" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="大区">
            <el-input v-model="keyword.superOrgCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="大区">
            <el-input v-model="keyword.superOrgName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户">
            <el-input v-model="keyword.custName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.warnId" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.warnNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="PI号">
            <el-input v-model="keyword.piNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="金额">
            <el-input v-model="keyword.amt" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="其他">
            <el-input v-model="keyword.otherAmt" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="应付金额">
            <el-input v-model="keyword.payAmt" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="已预提金额">
            <el-input v-model="keyword.ytedAmt" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="已支付金额">
            <el-input v-model="keyword.payedAmt" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <el-input v-model="keyword.fpNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="商业发票号">
            <el-input v-model="keyword.regNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.note" size="mini" />
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
      <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="clickAddBtn">新增</el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini" @click="clickBatchDeleteBtn">删除</el-button>
    </el-button-group>
    <el-button-group>
      <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
      <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
    </el-button-group>
    <el-alert
      :closable="false"
      :title="`已选中 ${multipleSelection.length} 行数据`"
      class="m-t-12"
      type="info"
      show-icon />
    <template>
      <el-table
        :data="tableData"
        :loading="loading"
        border
        class="m-t-12"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55" />
        <el-table-column
          v-if="eye.preShipDate"
          show-overflow-tooltip
          prop="preShipDate"
          sortable
          label="预计发货日期">
          <template slot-scope="scope">
            {{ scope.row.preShipDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.superOrgId"
          show-overflow-tooltip
          prop="superOrgId"
          sortable
          label="大区" />
        <el-table-column
          v-if="eye.superOrgCode"
          show-overflow-tooltip
          prop="superOrgCode"
          sortable
          label="大区" />
        <el-table-column
          v-if="eye.superOrgName"
          show-overflow-tooltip
          prop="superOrgName"
          sortable
          label="大区" />
        <el-table-column
          v-if="eye.custName"
          show-overflow-tooltip
          prop="custName"
          sortable
          label="客户" />
        <el-table-column
          v-if="eye.warnId"
          show-overflow-tooltip
          prop="warnId"
          sortable
          label="出货预告号" />
        <el-table-column
          v-if="eye.warnNo"
          show-overflow-tooltip
          prop="warnNo"
          sortable
          label="出货预告号" />
        <el-table-column
          v-if="eye.piNo"
          show-overflow-tooltip
          prop="piNo"
          sortable
          label="PI号" />
        <el-table-column
          v-if="eye.amt"
          show-overflow-tooltip
          prop="amt"
          sortable
          label="金额" />
        <el-table-column
          v-if="eye.otherAmt"
          show-overflow-tooltip
          prop="otherAmt"
          sortable
          label="其他" />
        <el-table-column
          v-if="eye.payAmt"
          show-overflow-tooltip
          prop="payAmt"
          sortable
          label="应付金额" />
        <el-table-column
          v-if="eye.ytedAmt"
          show-overflow-tooltip
          prop="ytedAmt"
          sortable
          label="已预提金额" />
        <el-table-column
          v-if="eye.payedAmt"
          show-overflow-tooltip
          prop="payedAmt"
          sortable
          label="已支付金额" />
        <el-table-column
          v-if="eye.fpNo"
          show-overflow-tooltip
          prop="fpNo"
          sortable
          label="发票号" />
        <el-table-column
          v-if="eye.regNo"
          show-overflow-tooltip
          prop="regNo"
          sortable
          label="商业发票号" />
        <el-table-column
          v-if="eye.note"
          show-overflow-tooltip
          prop="note"
          sortable
          label="备注" />
        <el-table-column
          v-if="eye.isYt"
          show-overflow-tooltip
          prop="isYt"
          sortable
          label="已预提">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isYt === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isYt }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.isTs"
          show-overflow-tooltip
          prop="isTs"
          sortable
          label="已特殊处理">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isTs === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isTs }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="clickViewBtn(scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="clickEditBtn(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
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
    <el-dialog
      :visible="showEye"
      width="360px"
      title="过滤"
      top="10vh"
      @close="showEye = false"
    >
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.preShipDate">预计发货日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.superOrgId">大区</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.superOrgCode">大区</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.superOrgName">大区</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custName">客户</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnId">出货预告号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnNo">出货预告号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.piNo">PI号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.amt">金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.otherAmt">其他</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payAmt">应付金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.ytedAmt">已预提金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payedAmt">已支付金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.fpNo">发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.regNo">商业发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.note">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isYt">已预提</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isTs">已特殊处理</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'FreightPayWarnViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'FreightPayWarnEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'FreightPayWarnDeletePopup'"
      :list="multipleSelection"
      @close="showDeletePopup = false"
      @update="update"
    />
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
import Validate from './../../../utils/validate.js'
import Datetime from './../../../utils/datetime'
import freightPayWarnServer from './../../../api/freightPayWarnServer'
const initSearchParams = {
  preShipDateStart: null,
  preShipDateEnd: null,
  superOrgId: null,
  superOrgCode: null,
  superOrgName: null,
  custName: null,
  warnId: null,
  warnNo: null,
  piNo: null,
  amt: null,
  otherAmt: null,
  payAmt: null,
  ytedAmt: null,
  payedAmt: null,
  fpNo: null,
  regNo: null,
  note: null,
  isYt: null,
  isTs: null,
}
const initExport = {
  preShipDate: '预计发货日期',
  superOrgId: '大区',
  superOrgCode: '大区',
  superOrgName: '大区',
  custName: '客户',
  warnId: '出货预告号',
  warnNo: '出货预告号',
  piNo: 'PI号',
  amt: '金额',
  otherAmt: '其他',
  payAmt: '应付金额',
  ytedAmt: '已预提金额',
  payedAmt: '已支付金额',
  fpNo: '发票号',
  regNo: '商业发票号',
  note: '备注',
  isYt: '已预提',
  isTs: '已特殊处理',
}
export default {
  name: 'FreightPayWarnManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    FreightPayWarnViewPopup: () => import('./freightPayWarnViewPopup.vue'),
    FreightPayWarnEditPopup: () => import('./freightPayWarnEditPopup.vue'),
    FreightPayWarnDeletePopup: () => import('./freightPayWarnDeletePopup.vue')
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
      eye: {
        preShipDate: true,
        superOrgId: true,
        superOrgCode: true,
        superOrgName: true,
        custName: true,
        warnId: true,
        warnNo: true,
        piNo: true,
        amt: true,
        otherAmt: true,
        payAmt: true,
        ytedAmt: true,
        payedAmt: true,
        fpNo: true,
        regNo: true,
        note: true,
        isYt: true,
        isTs: true,
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
    this.search()
  },
  methods: {
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = this.keyword
      let query = '*:*'
      if (keyword.preShipDateStart) {
        query += ` AND preShipDate:[${Datetime.dateToDateStr(keyword.preShipDateStart)} TO *]`
      }
      if (keyword.preShipDateEnd) {
        query += ` AND preShipDate:[* TO ${Datetime.dateToDateStr(keyword.preShipDateEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.superOrgId)) {
        query += ` AND superOrgId:${keyword.superOrgId}`
      }
      if (Validate.isNotEmpty(keyword.superOrgCode)) {
        query += ` AND superOrgCode:${keyword.superOrgCode}`
      }
      if (Validate.isNotEmpty(keyword.superOrgName)) {
        query += ` AND superOrgName:${keyword.superOrgName}`
      }
      if (Validate.isNotEmpty(keyword.custName)) {
        query += ` AND custName:${keyword.custName}`
      }
      if (Validate.isNotEmpty(keyword.warnId)) {
        query += ` AND warnId:${keyword.warnId}`
      }
      if (Validate.isNotEmpty(keyword.warnNo)) {
        query += ` AND warnNo:${keyword.warnNo}`
      }
      if (Validate.isNotEmpty(keyword.piNo)) {
        query += ` AND piNo:${keyword.piNo}`
      }
      if (Validate.isNotEmpty(keyword.amt)) {
        query += ` AND amt:${keyword.amt}`
      }
      if (Validate.isNotEmpty(keyword.otherAmt)) {
        query += ` AND otherAmt:${keyword.otherAmt}`
      }
      if (Validate.isNotEmpty(keyword.payAmt)) {
        query += ` AND payAmt:${keyword.payAmt}`
      }
      if (Validate.isNotEmpty(keyword.ytedAmt)) {
        query += ` AND ytedAmt:${keyword.ytedAmt}`
      }
      if (Validate.isNotEmpty(keyword.payedAmt)) {
        query += ` AND payedAmt:${keyword.payedAmt}`
      }
      if (Validate.isNotEmpty(keyword.fpNo)) {
        query += ` AND fpNo:${keyword.fpNo}`
      }
      if (Validate.isNotEmpty(keyword.regNo)) {
        query += ` AND regNo:${keyword.regNo}`
      }
      if (Validate.isNotEmpty(keyword.note)) {
        query += ` AND note:${keyword.note}`
      }
      const res = await freightPayWarnServer.search({
        query,
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
    clickViewBtn(row) {
      this.currentClickRow = row
      this.showViewPopup = true
    },
    clickEditBtn(row) {
      this.currentClickRow = row
      this.showEditPopup = true
    },
    clickAddBtn() {
      this.currentClickRow = {}
      this.showEditPopup = true
    },
    clickBatchDeleteBtn() {
      if (this.multipleSelection.length > 0) {
        this.showDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
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
      // 关闭弹窗
      this.showDeletePopup = false
      this.showEditPopup = false
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
</style>
