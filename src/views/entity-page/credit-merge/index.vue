<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发起人">
            <PersonSelect v-model="keyword.initiator"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="信用证号">
            <CreditCertificateSelect v-model="keyword.lcNo"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
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
          v-if="eye.mergeNo"
          show-overflow-tooltip
          prop="mergeNo"
          sortable
          min-width="130"
          label="合并流水号"
        />
        <el-table-column
          v-if="eye.lcNo"
          show-overflow-tooltip
          prop="lcNo"
          sortable
          min-width="130"
          label="信用证号组"
        />
        <el-table-column
          v-if="eye.createName"
          show-overflow-tooltip
          prop="createName"
          sortable
          min-width="100"
          label="发起人"
        />
        <el-table-column
          v-if="eye.createDate"
          show-overflow-tooltip
          prop="createDate"
          sortable
          min-width="115"
          label="发起时间"
        >
          <template slot-scope="scope">{{ scope.row.createDate | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.effectiveTime"
          show-overflow-tooltip
          prop="effectiveTime"
          sortable
          min-width="115"
          label="生效时间"
        >
          <template slot-scope="scope">{{ scope.row.effectiveTime | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.mergeState"
          show-overflow-tooltip
          prop="mergeState"
          sortable
          min-width="80"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.mergeState | CreditCertificateStatusFilter }}</template>
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
            <el-checkbox v-model="eye.mergeNo">合并流水号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.lcNo">信用证号组</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createName">发起人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createDate">发起时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.effectiveTime">生效时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.mergeState">状态</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showDeletePopup"
      :is="'CreditMergeDeletePopup'"
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
import creditMergeServer from './../../../api/creditMergeServer'
import PersonSelect from './../../../components/entity/person/PersonSelect'
import CreditCertificateStatusEnumUtil from './../../../components/enum/credit-certificate/CreditCertificateStatusEnumUtil'
import CreditCertificateSelect from './../../../components/entity/credit-certificate/CreditCertificateSelect'
const initSearchParams = {
  name: null,
  creditNo: null
}
const initExport = {
  mergeNo: '合并流水号',
  lcNo: '信用证号组',
  createName: '发起人',
  createDate: '发起时间',
  effectiveTime: '生效时间',
  mergeState: '状态'
}
export default {
  name: 'CreditMergeManagement',
  components: {
    PersonSelect,
    CreditCertificateSelect,
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CreditMergeDeletePopup: () => import('./creditMergeDeletePopup.vue')
  },
  filters: {
    CreditCertificateStatusFilter: CreditCertificateStatusEnumUtil.toTitleFilter
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
      eye: {
        mergeNo: true,
        lcNo: true,
        createName: true,
        createDate: true,
        effectiveTime: true,
        mergeState: true
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
      const res = await creditMergeServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
      res.data.forEach((item, index) => {
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
        path: './credit-merge/edit/' + row.mergeId
      })
    },
    clickAddBtn() {
      this.$router.push({
        path: './credit-merge/edit/new'
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
        item.mergeState = CreditCertificateStatusEnumUtil.toTitleFilter(
          item.mergeState
        )
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
