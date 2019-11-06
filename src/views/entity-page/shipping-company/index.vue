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
          <el-form-item label="公司编码">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="公司名称">
            <el-input v-model="keyword.name" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="公司简称">
            <el-input v-model="keyword.simplifyName" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <ShippingCompanyStatusEnumSelect v-model="keyword.shippingCompanyStatus"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="类型">
            <ShippingCompanyTypeEnumSelect v-model="keyword.shippingCompanyType"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="货代类型">
            <ShippingCompanyProxyTypeEnumSelect v-model="keyword.shippingCompanyProxyType"/>
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
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          min-width="115"
          label="公司编码"
        />
        <el-table-column
          v-if="eye.name"
          show-overflow-tooltip
          prop="name"
          sortable
          min-width="115"
          label="公司名称"
        />
        <el-table-column
          v-if="eye.simplifyName"
          show-overflow-tooltip
          prop="simplifyName"
          sortable
          min-width="115"
          label="公司简称"
        />
        <el-table-column
          v-if="eye.shippingCompanyStatus"
          show-overflow-tooltip
          prop="shippingCompanyStatus"
          sortable
          min-width="80"
          label="状态"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.shippingCompanyStatus | ShippingCompanyStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.shippingCompanyType"
          show-overflow-tooltip
          prop="shippingCompanyType"
          sortable
          min-width="80"
          label="类型"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.shippingCompanyType | ShippingCompanyTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.shippingCompanyProxyType"
          show-overflow-tooltip
          prop="shippingCompanyProxyType"
          sortable
          min-width="115"
          label="货代类型"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.shippingCompanyProxyType | ShippingCompanyProxyTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.customsLine"
          show-overflow-tooltip
          prop="customsLine"
          sortable
          min-width="105"
          label="报关行"
        />
        <el-table-column
          v-if="eye.certificateCode"
          show-overflow-tooltip
          prop="certificateCode"
          sortable
          min-width="135"
          label="资格证书号"
        />
        <el-table-column
          v-if="eye.accountName"
          show-overflow-tooltip
          prop="accountName"
          sortable
          min-width="105"
          label="账户名"
        />
        <el-table-column
          v-if="eye.account"
          show-overflow-tooltip
          prop="account"
          sortable
          min-width="105"
          label="账户号"
        />
        <el-table-column
          v-if="eye.certificateValidityTime"
          show-overflow-tooltip
          prop="certificateValidityTime"
          sortable
          min-width="135"
          label="证书到期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.certificateValidityTime | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.address"
          show-overflow-tooltip
          prop="address"
          sortable
          min-width="80"
          label="地址"
        />
        <el-table-column
          v-if="eye.email"
          show-overflow-tooltip
          prop="email"
          sortable
          min-width="115"
          label="电子邮件"
        />
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          sortable
          min-width="80"
          label="备注"
        />
        <el-table-column
          v-if="eye.entidStr"
          show-overflow-tooltip
          prop="entidStr"
          sortable
          min-width="130"
          label="经营单位"
        />
        <el-table-column
          v-if="eye.blacklist"
          show-overflow-tooltip
          prop="blacklist"
          sortable
          min-width="135"
          label="列入黑名单"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.blacklist">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.usable"
          show-overflow-tooltip
          prop="usable"
          sortable
          min-width="115"
          label="是否有效"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.usable">是</span>
            <span v-else>否</span>
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
    <el-dialog :visible="showEye" width="360px" title="过滤" top="10vh" @close="showEye = false">
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.code">公司编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.name">公司名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.simplifyName">公司简称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shippingCompanyStatus">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shippingCompanyType">类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shippingCompanyProxyType">货代类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customsLine">报关行</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.certificateCode">资格证书号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.accountName">账户名</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.account">账户号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.certificateValidityTime">证书到期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.address">地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.email">电子邮件</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entidStr">经营单位</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.blacklist">列入黑名单</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.usable">是否有效</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showDeletePopup"
      :is="'ShippingCompanyDeletePopup'"
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
// import Validate from './../../../utils/validate.js'
// import Datetime from './../../../utils/datetime'
import ShippingCompanyStatusEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyStatusEnumSelect'
import ShippingCompanyStatusEnumUtil from './../../../components/enum/shipping-company/ShippingCompanyStatusEnumUtil'
import ShippingCompanyTypeEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyTypeEnumSelect'
import ShippingCompanyTypeEnumUtil from './../../../components/enum/shipping-company/ShippingCompanyTypeEnumUtil'
import ShippingCompanyProxyTypeEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyProxyTypeEnumSelect'
import ShippingCompanyProxyTypeEnumUtil from './../../../components/enum/shipping-company/ShippingCompanyProxyTypeEnumUtil'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import shippingCompanyServer from './../../../api/shippingCompanyServer'
const initSearchParams = {
  code: null,
  name: null,
  simplifyName: null,
  shippingCompanyStatus: null,
  shippingCompanyType: null,
  shippingCompanyProxyType: null,
  certificateCode: null,
  customsLine: null,
  accountName: null,
  account: null,
  certificateValidityTimeStart: null,
  certificateValidityTimeEnd: null,
  address: null,
  remark: null,
  blacklist: null
}
const initExport = {
  code: '公司编码',
  name: '公司名称',
  simplifyName: '公司简称',
  shippingCompanyStatus: '状态',
  shippingCompanyType: '类型',
  shippingCompanyProxyType: '货代类型',
  customsLine: '报关行',
  certificateCode: '资格证书号',
  accountName: '账户名',
  account: '账户号',
  certificateValidityTime: '证书到期',
  address: '地址',
  email: '电子邮件',
  remark: '备注',
  entidStr: '经营单位',
  blacklist: '列入黑名单',
  usable: '是否有效'
}
export default {
  name: 'ShippingCompanyManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    ShippingCompanyStatusEnumSelect,
    ShippingCompanyTypeEnumSelect,
    ShippingCompanyProxyTypeEnumSelect,
    ShippingCompanyDeletePopup: () => import('./shippingCompanyDeletePopup.vue')
  },
  filters: {
    ShippingCompanyStatusFilter: ShippingCompanyStatusEnumUtil.toTitleFilter,
    ShippingCompanyTypeFilter: ShippingCompanyTypeEnumUtil.toTitleFilter,
    ShippingCompanyProxyTypeFilter:
      ShippingCompanyProxyTypeEnumUtil.toTitleFilter
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
      multipleSelection: [],
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      more: false,
      eye: {
        code: true,
        name: true,
        simplifyName: true,
        shippingCompanyStatus: true,
        shippingCompanyType: true,
        shippingCompanyProxyType: true,
        customsLine: true,
        certificateCode: true,
        accountName: true,
        account: true,
        certificateValidityTime: true,
        address: true,
        email: true,
        remark: true,
        blacklist: true,
        entidStr: true,
        usable: true
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
      const res = await shippingCompanyServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = []
      // 更新数据
      res.rows.forEach((item, index) => {
        item.entidStr = OperaUnitEnumUtil.toTitleFilter(parseInt(item.entid))
        this.$set(this.tableData, index, item)
      })
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
    handleRowDb(row) {
      this.$router.push({
        path: './shipping-company/edit/' + row.id
      })
    },
    clickAddBtn() {
      this.$router.push({
        path: './shipping-company/edit/new'
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
        item.shippingCompanyStatus = ShippingCompanyStatusEnumUtil.toTitleFilter(
          item.shippingCompanyStatus
        )
        item.shippingCompanyType = ShippingCompanyTypeEnumUtil.toTitleFilter(
          item.shippingCompanyType
        )
        item.shippingCompanyProxyType = ShippingCompanyProxyTypeEnumUtil.toTitleFilter(
          item.shippingCompanyProxyType
        )
        item.blacklist = item.blacklist ? '是' : '否'
        item.usable = item.usable ? '是' : '否'
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
    width: 105px;
  }
  /deep/ .el-form-item__content {
    width: calc(100% - 105px);
  }
}
.search-btn-item {
  /deep/ .el-form-item__content {
    width: auto;
    float: right;
  }
}
</style>
