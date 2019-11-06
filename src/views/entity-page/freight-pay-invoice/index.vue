<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <el-input v-model="keyword.invoiceNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="应付金额">
            <el-input v-model="keyword.amt" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="其中税金">
            <el-input v-model="keyword.tax" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="财务复核金额">
            <el-input v-model="keyword.checkAmt" size="mini" />
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
          <el-form-item label="费用登记日期起始">
            <el-date-picker
              v-model="keyword.payregCreateTimeStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="费用登记日期结束">
            <el-date-picker
              v-model="keyword.payregCreateTimeEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.note" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="部门">
            <DepartmentSelect v-model="keyword.orgIds" type="multiple" />
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
          v-if="eye.invoiceNo"
          show-overflow-tooltip
          prop="invoiceNo"
          sortable
          label="发票号" />
        <el-table-column
          v-if="eye.amt"
          show-overflow-tooltip
          prop="amt"
          sortable
          label="应付金额" />
        <el-table-column
          v-if="eye.tax"
          show-overflow-tooltip
          prop="tax"
          sortable
          label="其中税金" />
        <el-table-column
          v-if="eye.checkAmt"
          show-overflow-tooltip
          prop="checkAmt"
          sortable
          label="财务复核金额" />
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
          v-if="eye.payregCreateTime"
          show-overflow-tooltip
          prop="payregCreateTime"
          sortable
          label="费用登记日期">
          <template slot-scope="scope">
            {{ scope.row.payregCreateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.note"
          show-overflow-tooltip
          prop="note"
          sortable
          label="备注" />
        <el-table-column
          v-if="eye.orgId"
          show-overflow-tooltip
          prop="orgId"
          sortable
          label="部门">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openOrgViewPopup(scope.row.orgId)">{{ scope.row.org ? scope.row.org.id : '' }}</el-button>
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
            <el-checkbox v-model="eye.invoiceNo">发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.amt">应付金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.tax">其中税金</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.checkAmt">财务复核金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnNo">出货预告号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.piNo">PI号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payregCreateTime">费用登记日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.note">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orgId">orgId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'FreightPayInvoiceViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'FreightPayInvoiceEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'FreightPayInvoiceDeletePopup'"
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
    <component
      v-if="showOrgViewPopup"
      :is="'DepartmentViewPopup'"
      :id="orgId"
      @close="showOrgViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import Datetime from './../../../utils/datetime'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import freightPayInvoiceServer from './../../../api/freightPayInvoiceServer'
const initSearchParams = {
  invoiceNo: null,
  amt: null,
  tax: null,
  checkAmt: null,
  warnNo: null,
  piNo: null,
  payregCreateTimeStart: null,
  payregCreateTimeEnd: null,
  note: null,
  orgIds: [],
}
const initExport = {
  invoiceNo: '发票号',
  amt: '应付金额',
  tax: '其中税金',
  checkAmt: '财务复核金额',
  warnNo: '出货预告号',
  piNo: 'PI号',
  payregCreateTime: '费用登记日期',
  note: '备注',
  org: '部门',
}
export default {
  name: 'FreightPayInvoiceManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    DepartmentSelect,
    DepartmentViewPopup: () => import('./../department/departmentViewPopup'),
    FreightPayInvoiceViewPopup: () => import('./freightPayInvoiceViewPopup.vue'),
    FreightPayInvoiceEditPopup: () => import('./freightPayInvoiceEditPopup.vue'),
    FreightPayInvoiceDeletePopup: () => import('./freightPayInvoiceDeletePopup.vue')
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
      showOrgViewPopup: false,
      orgId: null,
      more: false,
      eye: {
        invoiceNo: true,
        amt: true,
        tax: true,
        checkAmt: true,
        warnNo: true,
        piNo: true,
        payregCreateTime: true,
        note: true,
        orgId: true,
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
      if (Validate.isNotEmpty(keyword.invoiceNo)) {
        query += ` AND invoiceNo:${keyword.invoiceNo}`
      }
      if (Validate.isNotEmpty(keyword.amt)) {
        query += ` AND amt:${keyword.amt}`
      }
      if (Validate.isNotEmpty(keyword.tax)) {
        query += ` AND tax:${keyword.tax}`
      }
      if (Validate.isNotEmpty(keyword.checkAmt)) {
        query += ` AND checkAmt:${keyword.checkAmt}`
      }
      if (Validate.isNotEmpty(keyword.warnNo)) {
        query += ` AND warnNo:${keyword.warnNo}`
      }
      if (Validate.isNotEmpty(keyword.piNo)) {
        query += ` AND piNo:${keyword.piNo}`
      }
      if (keyword.payregCreateTimeStart) {
        query += ` AND payregCreateTime:[${Datetime.dateToDateStr(keyword.payregCreateTimeStart)} TO *]`
      }
      if (keyword.payregCreateTimeEnd) {
        query += ` AND payregCreateTime:[* TO ${Datetime.dateToDateStr(keyword.payregCreateTimeEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.note)) {
        query += ` AND note:${keyword.note}`
      }
      if (keyword.orgIds && keyword.orgIds.length > 0) {
        query += ' AND ('
        keyword.orgIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `org.id:${id}`
        })
        query += ')'
      }
      const res = await freightPayInvoiceServer.search({
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
    openOrgViewPopup(id) {
      this.orgId = id
      this.showOrgViewPopup = true
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
