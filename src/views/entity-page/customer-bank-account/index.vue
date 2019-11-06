<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="编码">
            <el-input v-model="keyword.code" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="账号">
            <el-input v-model="keyword.account" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户">
            <CustomerSelect v-model="keyword.customerIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="银行">
            <BankInfoSelect v-model="keyword.bankInfoIds" type="multiple" />
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
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          label="编码" />
        <el-table-column
          v-if="eye.account"
          show-overflow-tooltip
          prop="account"
          sortable
          label="账号" />
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          sortable
          label="备注" />
        <el-table-column
          v-if="eye.isDefault"
          show-overflow-tooltip
          prop="isDefault"
          sortable
          label="默认">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDefault === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isDefault }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.isDelete"
          show-overflow-tooltip
          prop="isDelete"
          sortable
          label="是否删除">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDelete === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isDelete }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.customerId"
          show-overflow-tooltip
          prop="customerId"
          sortable
          label="客户">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openCustomerViewPopup(scope.row.customerId)">{{ scope.row.customer ? scope.row.customer.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.bankInfoId"
          show-overflow-tooltip
          prop="bankInfoId"
          sortable
          label="银行">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openBankInfoViewPopup(scope.row.bankInfoId)">{{ scope.row.bankInfo ? scope.row.bankInfo.id : '' }}</el-button>
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
            <el-checkbox v-model="eye.code">编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.account">账号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDefault">默认</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customerId">customerId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bankInfoId">bankInfoId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'CustomerBankAccountViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'CustomerBankAccountEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'CustomerBankAccountDeletePopup'"
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
      v-if="showCustomerViewPopup"
      :is="'CustomerViewPopup'"
      :id="customerId"
      @close="showCustomerViewPopup = false"
    />
    <component
      v-if="showBankInfoViewPopup"
      :is="'BankInfoViewPopup'"
      :id="bankInfoId"
      @close="showBankInfoViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
import BankInfoSelect from './../../../components/entity/bank-info/BankInfoSelect'
import customerBankAccountServer from './../../../api/customerBankAccountServer'
const initSearchParams = {
  code: null,
  account: null,
  remark: null,
  isDefault: null,
  isDelete: null,
  customerIds: [],
  bankInfoIds: [],
}
const initExport = {
  code: '编码',
  account: '账号',
  remark: '备注',
  isDefault: '默认',
  isDelete: '是否删除',
  customer: '客户',
  bankInfo: '银行',
}
export default {
  name: 'CustomerBankAccountManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CustomerSelect,
    CustomerViewPopup: () => import('./../customer/customerViewPopup'),
    BankInfoSelect,
    BankInfoViewPopup: () => import('./../bank-info/bankInfoViewPopup'),
    CustomerBankAccountViewPopup: () => import('./customerBankAccountViewPopup.vue'),
    CustomerBankAccountEditPopup: () => import('./customerBankAccountEditPopup.vue'),
    CustomerBankAccountDeletePopup: () => import('./customerBankAccountDeletePopup.vue')
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
      showCustomerViewPopup: false,
      customerId: null,
      showBankInfoViewPopup: false,
      bankInfoId: null,
      more: false,
      eye: {
        code: true,
        account: true,
        remark: true,
        isDefault: true,
        isDelete: true,
        customerId: true,
        bankInfoId: true,
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
      if (Validate.isNotEmpty(keyword.code)) {
        query += ` AND code:${keyword.code}`
      }
      if (Validate.isNotEmpty(keyword.account)) {
        query += ` AND account:${keyword.account}`
      }
      if (Validate.isNotEmpty(keyword.remark)) {
        query += ` AND remark:${keyword.remark}`
      }
      if (keyword.customerIds && keyword.customerIds.length > 0) {
        query += ' AND ('
        keyword.customerIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `customer.id:${id}`
        })
        query += ')'
      }
      if (keyword.bankInfoIds && keyword.bankInfoIds.length > 0) {
        query += ' AND ('
        keyword.bankInfoIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `bankInfo.id:${id}`
        })
        query += ')'
      }
      const res = await customerBankAccountServer.search({
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
    openCustomerViewPopup(id) {
      this.customerId = id
      this.showCustomerViewPopup = true
    },
    openBankInfoViewPopup(id) {
      this.bankInfoId = id
      this.showBankInfoViewPopup = true
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
