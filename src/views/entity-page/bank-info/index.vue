<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="名称">
            <el-input v-model="keyword.name" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="公司简称">
            <el-input v-model="keyword.simplifyName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="货币名称">
            <BankInfoCurrencyEnumSelect v-model="keyword.currency" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="账号">
            <el-input v-model="keyword.account" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="账号2">
            <el-input v-model="keyword.account2" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="SAP科目">
            <el-input v-model="keyword.sap" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="回款组织">
            <BankInfoOrganizationEnumSelect v-model="keyword.organization" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="地址">
            <el-input v-model="keyword.address" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="经营单位">
            <DepartmentSelect v-model="keyword.departmentIds" type="multiple" />
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
          v-if="eye.name"
          show-overflow-tooltip
          prop="name"
          sortable
          label="名称" />
        <el-table-column
          v-if="eye.simplifyName"
          show-overflow-tooltip
          prop="simplifyName"
          sortable
          label="公司简称" />
        <el-table-column
          v-if="eye.currency"
          show-overflow-tooltip
          prop="currency"
          sortable
          label="货币名称">
          <template slot-scope="scope">
            {{ scope.row.currency | BankInfoCurrencyFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.account"
          show-overflow-tooltip
          prop="account"
          sortable
          label="账号" />
        <el-table-column
          v-if="eye.account2"
          show-overflow-tooltip
          prop="account2"
          sortable
          label="账号2" />
        <el-table-column
          v-if="eye.sap"
          show-overflow-tooltip
          prop="sap"
          sortable
          label="SAP科目" />
        <el-table-column
          v-if="eye.organization"
          show-overflow-tooltip
          prop="organization"
          sortable
          label="回款组织">
          <template slot-scope="scope">
            {{ scope.row.organization | BankInfoOrganizationFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.address"
          show-overflow-tooltip
          prop="address"
          sortable
          label="地址" />
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          sortable
          label="备注" />
        <el-table-column
          v-if="eye.enable"
          show-overflow-tooltip
          prop="enable"
          sortable
          label="可用">
          <template slot-scope="scope">
            <el-tag :type="scope.row.enable === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.enable }}
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
          v-if="eye.departmentId"
          show-overflow-tooltip
          prop="departmentId"
          sortable
          label="经营单位"/>
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
            <el-checkbox v-model="eye.name">名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.simplifyName">公司简称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currency">货币名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.account">账号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.account2">账号2</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.sap">SAP科目</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.organization">回款组织</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.address">地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.enable">可用</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.departmentId">departmentId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'BankInfoViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'BankInfoEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'BankInfoDeletePopup'"
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
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import BankInfoCurrencyEnumSelect from './../../../components/entity/bank-info/BankInfoCurrencyEnumSelect'
import BankInfoCurrencyEnumUtil from './../../../components/enum/bank-info/BankInfoCurrencyEnumUtil'
import BankInfoOrganizationEnumSelect from './../../../components/entity/bank-info/BankInfoOrganizationEnumSelect'
import BankInfoOrganizationEnumUtil from './../../../components/enum/bank-info/BankInfoOrganizationEnumUtil'
import bankInfoServer from './../../../api/bankInfoServer'
const initSearchParams = {
  name: null,
  simplifyName: null,
  currency: null,
  account: null,
  account2: null,
  sap: null,
  organization: null,
  address: null,
  remark: null,
  enable: null,
  isDelete: null,
  departmentIds: [],
}
const initExport = {
  name: '名称',
  simplifyName: '公司简称',
  currency: '货币名称',
  account: '账号',
  account2: '账号2',
  sap: 'SAP科目',
  organization: '回款组织',
  address: '地址',
  remark: '备注',
  enable: '可用',
  isDelete: '是否删除',
  department: '经营单位',
}
export default {
  name: 'BankInfoManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    DepartmentSelect,
    BankInfoCurrencyEnumSelect,
    BankInfoOrganizationEnumSelect,
    BankInfoViewPopup: () => import('./bankInfoViewPopup.vue'),
    BankInfoEditPopup: () => import('./bankInfoEditPopup.vue'),
    BankInfoDeletePopup: () => import('./bankInfoDeletePopup.vue')
  },
  filters: {
    BankInfoCurrencyFilter: BankInfoCurrencyEnumUtil.toTitleFilter,
    BankInfoOrganizationFilter: BankInfoOrganizationEnumUtil.toTitleFilter,
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
        name: true,
        simplifyName: true,
        currency: true,
        account: true,
        account2: true,
        sap: true,
        organization: true,
        address: true,
        remark: true,
        enable: true,
        isDelete: true,
        departmentId: true,
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
      if (Validate.isNotEmpty(keyword.name)) {
        query += ` AND name:${keyword.name}`
      }
      if (Validate.isNotEmpty(keyword.simplifyName)) {
        query += ` AND simplifyName:${keyword.simplifyName}`
      }
      if (keyword.currency && keyword.currency.length > 0) {
        query += ' AND ('
        keyword.currency.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `currency:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.account)) {
        query += ` AND account:${keyword.account}`
      }
      if (Validate.isNotEmpty(keyword.account2)) {
        query += ` AND account2:${keyword.account2}`
      }
      if (Validate.isNotEmpty(keyword.sap)) {
        query += ` AND sap:${keyword.sap}`
      }
      if (keyword.organization && keyword.organization.length > 0) {
        query += ' AND ('
        keyword.organization.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `organization:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.address)) {
        query += ` AND address:${keyword.address}`
      }
      if (Validate.isNotEmpty(keyword.remark)) {
        query += ` AND remark:${keyword.remark}`
      }
      if (keyword.departmentIds && keyword.departmentIds.length > 0) {
        query += ' AND ('
        keyword.departmentIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `department.id:${id}`
        })
        query += ')'
      }
      const res = await bankInfoServer.search({
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
