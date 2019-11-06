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
          <el-form-item label="申请单号">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户">
            <CustomerSelect v-model="keyword.customerIds"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单据状态">
            <IrregularInvoiceOrderStatusEnumSelect v-model="keyword.orderStatus"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建人">
            <el-input v-model="keyword.createMan" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申请类型">
            <IrregularInvoiceApplyTypeEnumSelect v-model="keyword.applyType"/>
          </el-form-item>
        </el-col>
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
        @row-dblclick="handleRowDb"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" label="序号"/>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          min-width="180"
          sortable
          label="申请单号"
        />
        <el-table-column
          v-if="eye.orderStatus"
          show-overflow-tooltip
          prop="orderStatus"
          min-width="100"
          sortable
          label="单据状态"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.orderStatus | IrregularInvoiceOrderStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.invoiceCode"
          show-overflow-tooltip
          prop="invoiceCode"
          min-width="180"
          sortable
          label="发票号"
        />
        <el-table-column
          v-if="eye.createMan"
          show-overflow-tooltip
          prop="createMan"
          min-width="110"
          sortable
          label="创建人"
        />
        <el-table-column
          v-if="eye.createTime"
          show-overflow-tooltip
          prop="createTime"
          min-width="138"
          sortable
          label="创建时间"
        >
          <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.applyType"
          show-overflow-tooltip
          prop="applyType"
          min-width="100"
          sortable
          label="申请类型"
        >
          <template slot-scope="scope">{{ scope.row.applyType | IrregularInvoiceApplyTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.custName"
          show-overflow-tooltip
          prop="custName"
          min-width="210"
          sortable
          label="客户" />
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          min-width="210"
          sortable
          label="备注"
        />
        <el-table-column
          v-if="eye.entid"
          show-overflow-tooltip
          prop="entid"
          min-width="150"
          sortable
          label="经营单位"
        >
          <template slot-scope="scope">{{ scope.row.entid | OperaUnitFilter }}</template>
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
    <el-dialog :visible="showEye" width="360px" title="过滤" top="10vh" @close="showEye = false">
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.code">申请单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orderStatus">单据状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceCode">发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createMan">创建人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createTime">创建时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.applyType">申请类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entid">经营单位</el-checkbox>
          </el-col>
          <!--<el-col :span="24">-->
          <!--<el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>-->
          <!--</el-col>-->
          <el-col :span="24">
            <el-checkbox v-model="eye.custName">客户</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'IrregularInvoiceViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'IrregularInvoiceEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'IrregularInvoiceDeletePopup'"
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
    <!-- <component
      v-if="showCustomerViewPopup"
      :is="'CustomerViewPopup'"
      :id="customerId"
      @close="showCustomerViewPopup = false"
    /> -->
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
import IrregularInvoiceOrderStatusEnumSelect from './../../../components/entity/irregular-invoice/IrregularInvoiceOrderStatusEnumSelect'
import IrregularInvoiceOrderStatusEnumUtil from './../../../components/enum/irregular-invoice/IrregularInvoiceOrderStatusEnumUtil'
import IrregularInvoiceApplyTypeEnumSelect from './../../../components/entity/irregular-invoice/IrregularInvoiceApplyTypeEnumSelect'
import IrregularInvoiceApplyTypeEnumUtil from './../../../components/enum/irregular-invoice/IrregularInvoiceApplyTypeEnumUtil'
import irregularInvoiceServer from './../../../api/irregularInvoiceServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
const initSearchParams = {
  code: null,
  orderStatus: null,
  invoiceCode: null,
  createMan: null,
  createTimeStart: null,
  createTimeEnd: null,
  applyType: null,
  remark: null,
  isDelete: null,
  customerIds: null
}
const initExport = {
  code: '申请单号',
  orderStatus: '单据状态',
  invoiceCode: '发票号',
  createMan: '创建人',
  createTime: '创建时间',
  applyType: '申请类型',
  remark: '备注',
  custName: '客户',
  entid: '经营单位'
}
export default {
  name: 'IrregularInvoiceManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CustomerSelect,
    CustomerViewPopup: () => import('./../customer/customerViewPopup'),
    IrregularInvoiceOrderStatusEnumSelect,
    IrregularInvoiceApplyTypeEnumSelect,
    IrregularInvoiceViewPopup: () => import('./irregularInvoiceViewPopup.vue'),
    IrregularInvoiceEditPopup: () => import('./irregularInvoiceEditPopup.vue'),
    IrregularInvoiceDeletePopup: () =>
      import('./irregularInvoiceDeletePopup.vue')
  },
  filters: {
    IrregularInvoiceOrderStatusFilter:
      IrregularInvoiceOrderStatusEnumUtil.toTitleFilter,
    IrregularInvoiceApplyTypeFilter:
      IrregularInvoiceApplyTypeEnumUtil.toTitleFilter,
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
      showViewPopup: false,
      showEditPopup: false,
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      showCustomerViewPopup: false,
      more: false,
      eye: {
        code: true,
        orderStatus: true,
        invoiceCode: true,
        createMan: true,
        createTime: true,
        applyType: true,
        remark: true,
        isDelete: true,
        custName: true,
        entid: true
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
      const query = {}
      Object.keys(keyword).forEach(key => {
        if (Validate.isNotEmpty(keyword[key])) {
          query[key] = keyword[key]
        }
      })
      const res = await irregularInvoiceServer.search({
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
      // this.currentClickRow = row
      // this.showEditPopup = true
      this.$router.push({
        path: './irregular-invoice/edit/' + row.id
      })
    },
    clickAddBtn() {
      // this.currentClickRow = {}
      // this.showEditPopup = true
      this.$router.push({
        path: './irregular-invoice/edit/new'
      })
      this.reload()
    },
    handleRowDb(val) {
      this.$router.push({
        path: './irregular-invoice/edit/' + val.id
      })
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
        item.orderStatus = IrregularInvoiceOrderStatusEnumUtil.toTitleFilter(item.orderStatus)
        item.entid = OperaUnitEnumUtil.toTitleFilter(item.entid)
        item.applyType = IrregularInvoiceApplyTypeEnumUtil.toTitleFilter(item.applyType)
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
