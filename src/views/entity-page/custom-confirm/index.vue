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
          <el-form-item label="清关确认单号">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单时间起始">
            <el-date-picker
              v-model="keyword.createOrderTimeStart"
              size="mini"
              class="max-w"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单时间结束">
            <el-date-picker
              v-model="keyword.createOrderTimeEnd"
              size="mini"
              class="max-w"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="清关单据确认">
            <el-switch v-model="keyword.confirm" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单人">
            <el-input v-model="keyword.createOrderMan" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <CustomConfirmStatusEnumSelect v-model="keyword.status" type="multiple"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="商业发票号">
            <el-input v-model="keyword.commercialInvoiceCode" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.contractCode" size="mini"/>
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <el-input v-model="keyword.commercialInvoiceIds" size="mini"/>
          </el-form-item>
        </el-col> -->
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
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
        @row-dblclick="clickEditBtn"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          sortable
          prop="code"
          min-width="220"
          label="清关确认单号"
        />
        <el-table-column
          v-if="eye.createOrderTime"
          show-overflow-tooltip
          prop="createOrderTime"
          sortable
          min-width="200"
          label="制单时间"
        />
        <el-table-column
          v-if="eye.createOrderMan"
          show-overflow-tooltip
          prop="createOrderMan"
          min-width="120"
          label="制单人"
        />
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          min-width="100"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.status | CustomConfirmStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.commercialInvoiceCode"
          show-overflow-tooltip
          prop="commercialInvoiceCode"
          min-width="200"
          label="商业发票号"
        />
        <el-table-column
          v-if="eye.contractCode"
          show-overflow-tooltip
          prop="contractCode"
          min-width="120"
          label="合同号"
        />
        <el-table-column
          v-if="eye.salesMan"
          show-overflow-tooltip
          prop="salesMan"
          min-width="120"
          label="业务员"
        />
        <el-table-column
          v-if="eye.salesDepartment"
          show-overflow-tooltip
          prop="salesDepartment"
          min-width="150"
          label="销售部门"
        />
        <el-table-column
          v-if="eye.customer"
          show-overflow-tooltip
          prop="customer"
          min-width="120"
          label="客户"
        />
        <el-table-column
          v-if="eye.custCode"
          show-overflow-tooltip
          prop="custCode"
          min-width="120"
          label="客户编码"
        />
        <!-- <el-table-column
          v-if="eye.needModify"
          show-overflow-tooltip
          prop="needModify"
          label="是否需要修改">
          <template slot-scope="scope">
            <el-tag :type="scope.row.needModify === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.needModify }}
            </el-tag>
          </template>
        </el-table-column>-->
        <el-table-column
          v-if="eye.commercialInvoiceId"
          show-overflow-tooltip
          prop="commercialInvoiceId"
          min-width="200"
          label="发票号"
        />
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          min-width="150"
          prop="remark"
          label="备注"
        />
        <el-table-column
          v-if="eye.operateUnitId"
          show-overflow-tooltip
          prop="operateUnitId"
          min-width="200"
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
            <el-checkbox v-model="eye.code">清关确认单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createOrderTime">制单时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createOrderMan">制单人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.commercialInvoiceCode">商业发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractCode">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.salesMan">业务员</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.salesDepartment">销售部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customer">客户</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custCode">客户编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.commercialInvoiceId">发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <!-- <el-col :span="24">
            <el-checkbox v-model="eye.needModify">是否需要修改</el-checkbox>
          </el-col>-->
          <el-col :span="24">
            <el-checkbox v-model="eye.commercialInvoiceId">发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.operateUnitId">经营单位</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- <component
      v-if="showViewPopup"
      :is="'CustomConfirmViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />-->
    <component
      v-if="showEditPopup"
      :is="'CustomConfirmEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'CustomConfirmDeletePopup'"
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
      v-if="showCommercialInvoiceViewPopup"
      :is="'CommercialInvoiceViewPopup'"
      :id="commercialInvoiceId"
      @close="showCommercialInvoiceViewPopup = false"
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
import CommercialInvoiceSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceSelect'
// import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import CustomConfirmStatusEnumSelect from './../../../components/entity/custom-confirm/CustomConfirmStatusEnumSelect'
import CustomConfirmStatusEnumUtil from './../../../components/enum/custom-confirm/CustomConfirmStatusEnumUtil'
import customConfirmServer from './../../../api/customConfirmServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
const initSearchParams = {
  custCode: null,
  code: null,
  confirm: false,
  createOrderTimeStart: null,
  createOrderTimeEnd: null,
  createOrderMan: null,
  status: Array(0),
  commercialInvoiceCode: null,
  contractCode: null,
  needModify: null,
  isDelete: null
  // commercialInvoiceIds: null
}
const initExport = {
  code: '清关确认单号',
  createOrderTime: '制单时间',
  createOrderMan: '制单人',
  status: '状态',
  commercialInvoiceCode: '商业发票号',
  contractCode: '合同号',
  salesMan: '业务员',
  salesDepartment: '销售部门',
  customer: '客户',
  custCode: '客户编码',
  commercialInvoiceId: '发票号',
  remark: '备注',
  operateUnitId: '经营单位'
}
export default {
  name: 'CustomConfirmManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CommercialInvoiceSelect,
    CommercialInvoiceViewPopup: () =>
      import('./../commercial-invoice/commercialInvoiceViewPopup'),
    // OperateUnitSelect,
    OperateUnitViewPopup: () =>
      import('./../operate-unit/operateUnitViewPopup'),
    CustomConfirmStatusEnumSelect,
    // CustomConfirmViewPopup: () => import('./customConfirmViewPopup.vue'),
    CustomConfirmEditPopup: () => import('./customConfirmEditPopup.vue'),
    CustomConfirmDeletePopup: () => import('./customConfirmDeletePopup.vue')
  },
  filters: {
    CustomConfirmStatusFilter: CustomConfirmStatusEnumUtil.toTitleFilter,
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter
  },
  inject: ['reload'],
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
      // showViewPopup: false,
      showEditPopup: false,
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      showCommercialInvoiceViewPopup: false,
      commercialInvoiceId: null,
      showOperateUnitViewPopup: false,
      operateUnitId: null,
      more: false,
      eye: {
        code: true,
        createOrderTime: true,
        createOrderMan: true,
        status: true,
        commercialInvoiceCode: true,
        contractCode: true,
        salesMan: true,
        salesDepartment: true,
        customer: true,
        custCode: true,
        remark: true,
        needModify: true,
        isDelete: true,
        commercialInvoiceId: true,
        operateUnitId: true
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
    if (this.$route.query.reminderType && parseInt(this.$route.query.reminderType) === 14) {
      this.keyword.confirm = true
    }
    this.search()
  },
  methods: {
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = this.keyword
      const res = await customConfirmServer.search({
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
    // clickViewBtn(row) {
    //   this.currentClickRow = row
    //   this.showViewPopup = true
    // },
    clickEditBtn(row) {
      this.$router.push({
        path: './custorm-confirm/edit/' + row.billId,
      })
    },
    clickAddBtn() {
      this.$router.push({
        path: './custorm-confirm/edit/new'
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
        item.status = CustomConfirmStatusEnumUtil.toTitleFilter(item.status)
        item.operateUnitId = OperaUnitEnumUtil.toTitleFilter(item.operateUnitId)
      })
      this.setExportData()
      this.showExportPopup = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
