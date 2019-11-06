<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="keyword"
      class="demo-form-inline"
      @keyup.enter.native="commitSearch"
    >
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="流水号">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建人">
            <el-input v-model="keyword.createMan" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建时间起始">
            <el-date-picker
              v-model="keyword.createTimeStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建时间结束">
            <el-date-picker
              v-model="keyword.createTimeEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>-->
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <ExpenseRecordStatusEnumSelect v-model="keyword.status"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.shipmentNotice" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="运费付款方式">
            <ShipCabinOrderPayStyleEnumSelect v-model="keyword.paymentMethod" :disabled="false"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.contractCode" size="mini"/>
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合计金额">
            <el-input v-model="keyword.amount" size="mini" />
          </el-form-item>
        </el-col>-->
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <el-input v-model="keyword.invoiceCode" size="mini"/>
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="部门">
            <DepartmentSelect v-model="keyword.departmentIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户">
            <el-input v-model="keyword.customerIds" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="经营单位">
            <OperateUnitSelect v-model="keyword.operateUnitIds" type="multiple" />
          </el-form-item>
        </el-col>-->
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <el-button type="text" size="mini" @click="more = !more">{{ more ? '收起' : '更多' }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="clickAddBtn"
      >新增</el-button>
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
      show-icon
    />
    <template>
      <el-table
        :data="tableData"
        :loading="loading"
        border
        class="m-t-12"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-dblclick="clickEditBtn"
      >
        <el-table-column type="selection"/>
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          min-width="70"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.status | ExpenseRecordStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          min-width="180"
          label="登记流水号"
        />
        <el-table-column
          v-if="eye.transitNames"
          show-overflow-tooltip
          prop="transitNames"
          min-width="220"
          label="货代公司"
        />
        <el-table-column
          v-if="eye.shipmentNotice"
          show-overflow-tooltip
          prop="shipmentNotice"
          min-width="200"
          label="出货预告号"
        />
        <el-table-column
          v-if="eye.contractCode"
          show-overflow-tooltip
          prop="contractCode"
          min-width="200"
          label="合同号"
        />
        <el-table-column
          v-if="eye.payName"
          show-overflow-tooltip
          prop="payName"
          min-width="150"
          label="运费付款方式"
        />
        <el-table-column
          v-if="eye.departmentId"
          show-overflow-tooltip
          prop="departmentId"
          min-width="100"
          label="部门"
        />
        <el-table-column
          v-if="eye.customerId"
          show-overflow-tooltip
          prop="customerId"
          min-width="100"
          label="客户编码"
        />
        <el-table-column
          v-if="eye.custName"
          show-overflow-tooltip
          prop="custName"
          min-width="100"
          label="客户名称"
        />
        <el-table-column
          v-if="eye.createMan"
          show-overflow-tooltip
          prop="createMan"
          min-width="100"
          label="创建人"
        />
        <el-table-column
          v-if="eye.createTime"
          show-overflow-tooltip
          prop="createTime"
          sortable
          min-width="180"
          label="创建时间"
        />
        <el-table-column
          v-if="eye.updateUser"
          show-overflow-tooltip
          prop="updateUser"
          min-width="100"
          label="修改人"
        />
        <el-table-column
          v-if="eye.updateDate"
          show-overflow-tooltip
          prop="updateDate"
          sortable
          min-width="180"
          label="修改时间"
        />
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          min-width="200"
          label="备注"
        />
        <el-table-column
          v-if="eye.amount"
          show-overflow-tooltip
          prop="amount"
          sortable
          min-width="120"
          label="合计金额"
        />
        <el-table-column
          v-if="eye.invoiceCode"
          show-overflow-tooltip
          prop="invoiceCode"
          min-width="200"
          label="发票号"
        />
        <el-table-column
          v-if="eye.operateUnitId"
          show-overflow-tooltip
          prop="operateUnitId"
          min-width="120"
          label="经营单位"
        >
          <template slot-scope="scope">{{ scope.row.operateUnitId | OperaUnitFilter }}</template>
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="clickViewBtn(scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="clickEditBtn(scope.row)">编辑</el-button>
          </template>
        </el-table-column>-->
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
    <el-dialog :visible="showEye" width="360px" title="过滤" top="10vh" @close="showEye = false">
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.code">登记流水号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shipmentNotice">出货预告号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.transitNames">货代公司</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractCode">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payName">运费付款方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.departmentId">部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customerId">客户编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custName">客户名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createMan">创建人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createTime">创建时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.updateUser">修改人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.updateDate">修改时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.amount">合计金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceCode">发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.operateUnitId">经营单位</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'ExpenseRecordViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'ExpenseRecordEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'ExpenseRecordDeletePopup'"
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
      v-if="showDepartmentViewPopup"
      :is="'DepartmentViewPopup'"
      :id="departmentId"
      @close="showDepartmentViewPopup = false"
    />
    <component
      v-if="showCustomerViewPopup"
      :is="'CustomerViewPopup'"
      :id="customerId"
      @close="showCustomerViewPopup = false"
    />
    <component
      v-if="showOperateUnitViewPopup"
      :is="'OperateUnitViewPopup'"
      :id="operateUnitId"
      @close="showOperateUnitViewPopup = false"
    />
  </div>
</template>

<script>
// import Validate from './../../../utils/validate.js'
// import Datetime from './../../../utils/datetime'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
// import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import ExpenseRecordStatusEnumSelect from './../../../components/entity/expense-record/ExpenseRecordStatusEnumSelect'
import ExpenseRecordStatusEnumUtil from './../../../components/enum/expense-record/ExpenseRecordStatusEnumUtil'
import ExpenseRecordSPaymentMethodEnumSelect from './../../../components/entity/expense-record/ExpenseRecordSPaymentMethodEnumSelect'
import ExpenseRecordSPaymentMethodEnumUtil from './../../../components/enum/expense-record/ExpenseRecordSPaymentMethodEnumUtil'
import expenseRecordServer from './../../../api/expenseRecordServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import ShipCabinOrderPayStyleEnumSelect from './../../../components/entity/ship-cabin-order/ShipCabinOrderPayStyleEnumSelect'
import { getAccount } from '@/api/login'
const initSearchParams = {
  code: null,
  createMan: null,
  createTimeStart: null,
  createTimeEnd: null,
  status: null,
  shipmentNotice: null,
  payName: null,
  contractCode: null,
  remark: null,
  amount: null,
  invoiceCode: null,
  departmentIds: [],
  customerIds: null,
  operateUnitIds: []
}
const initExport = {
  code: '流水号',
  createMan: '创建人',
  createTime: '创建时间',
  status: '状态',
  shipmentNotice: '出货预告号',
  payName: '运费付款方式',
  contractCode: '合同号',
  remark: '备注',
  amount: '合计金额',
  invoiceCode: '发票号',
  departmentId: '部门',
  custName: '客户名称',
  customerId: '客户编码',
  operateUnit: '经营单位',
  transitNames: '货代公司',
  updateUser: '修改人',
  updateDate: '修改时间',
  operateUnitId: '经营单位'
}
export default {
  name: 'ExpenseRecordManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    DepartmentSelect,
    DepartmentViewPopup: () => import('./../department/departmentViewPopup'),
    // CustomerSelect,
    CustomerViewPopup: () => import('./../customer/customerViewPopup'),
    OperateUnitSelect,
    OperateUnitViewPopup: () =>
      import('./../operate-unit/operateUnitViewPopup'),
    ExpenseRecordStatusEnumSelect,
    ExpenseRecordSPaymentMethodEnumSelect,
    ShipCabinOrderPayStyleEnumSelect,
    ExpenseRecordViewPopup: () => import('./expenseRecordViewPopup.vue'),
    ExpenseRecordEditPopup: () => import('./expenseRecordEditPopup.vue'),
    ExpenseRecordDeletePopup: () => import('./expenseRecordDeletePopup.vue')
  },
  filters: {
    ExpenseRecordStatusFilter: ExpenseRecordStatusEnumUtil.toTitleFilter,
    ExpenseRecordSPaymentMethodFilter:
      ExpenseRecordSPaymentMethodEnumUtil.toTitleFilter,
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter
  },
  inject: ['reload'],
  data() {
    return {
      loading: false,
      keyword: {
        ...initSearchParams
      },
      userType: null,
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
      showDepartmentViewPopup: false,
      departmentId: null,
      showCustomerViewPopup: false,
      customerId: null,
      showOperateUnitViewPopup: false,
      operateUnitId: null,
      more: false,
      eye: {
        code: true,
        createMan: true,
        createTime: true,
        status: true,
        shipmentNotice: true,
        payName: true,
        contractCode: true,
        remark: true,
        amount: true,
        customerId: true,
        invoiceCode: true,
        departmentId: true,
        custName: true,
        transitNames: true,
        operateUnitId: true,
        updateUser: true,
        updateDate: true
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
      await getAccount().then(response => {
        this.userType = response.data.data.userType
      })
      const keyword = this.keyword
      keyword.userType = this.userType 
      const res = await expenseRecordServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.rows
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    clickViewBtn(row) {
      this.currentClickRow = row
      this.showViewPopup = true
    },
    clickEditBtn(row) {
      // this.currentClickRow = row
      // this.showEditPopup = true
      this.$router.push({
        path: './expense-record/edit-sublist/' + row.regId
        // query: { id: row.regId }
      })
    },
    clickAddBtn() {
      // this.currentClickRow = {}
      // this.showEditPopup = true
      this.$router.push({
        path: './expense-record/edit-sublist/new'
      })
      this.reload()
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
        this.dataExport = JSON.parse(JSON.stringify(this.multipleSelection))
      } else if (this.tableData.length > 0) {
        this.dataExport = JSON.parse(JSON.stringify(this.tableData))
      }
      this.dataExport.forEach(item => {
        item.status = ExpenseRecordStatusEnumUtil.toTitleFilter(item.status)
        item.operateUnitId = OperaUnitEnumUtil.toTitleFilter(item.operateUnitId)
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
    openDepartmentViewPopup(id) {
      this.departmentId = id
      this.showDepartmentViewPopup = true
    },
    openCustomerViewPopup(id) {
      this.customerId = id
      this.showCustomerViewPopup = true
    },
    openOperateUnitViewPopup(id) {
      this.operateUnitId = id
      this.showOperateUnitViewPopup = true
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
    width: 135px;
  }
  /deep/ .el-form-item__content {
    width: calc(100% - 135px);
  }
}
.search-btn-item {
  /deep/ .el-form-item__content {
    width: auto;
    float: right;
  }
}
</style>
