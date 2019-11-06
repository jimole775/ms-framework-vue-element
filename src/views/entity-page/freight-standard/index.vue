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
          <el-form-item label="单据号">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <FreightStandardStatusEnumSelect v-model="keyword.status"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="有效期开始时间">
            <el-date-picker v-model="keyword.startDate" type="date" placeholder="选择日期" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="有效期结束时间">
            <el-date-picker v-model="keyword.endDate" type="date" placeholder="选择日期" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建人">
            <el-input v-model="keyword.createUser" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="更新人">
            <el-input v-model="keyword.updateName" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建开始时间">
            <el-date-picker v-model="keyword.startCreateDate" type="date" placeholder="选择日期" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建结束时间">
            <el-date-picker v-model="keyword.endCreateDate" type="date" placeholder="选择日期" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="更新开始时间">
            <el-date-picker v-model="keyword.startUpdateDate" type="date" placeholder="选择日期" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="更新结束时间">
            <el-date-picker v-model="keyword.endUpdateDate" type="date" placeholder="选择日期" size="mini"/>
          </el-form-item>
        </el-col>
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
        @selection-change="handleSelectionChange"
        @row-dblclick="clickEditBtn"
      >
        <el-table-column type="selection"/>
        <el-table-column type="index" label="序号"/>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          min-width="150"
          label="单号"
        />
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          min-width="80"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.status | FreightStandardStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.startDate"
          show-overflow-tooltip
          prop="startDate"
          sortable
          min-width="180"
          label="有效期开始"
        />
        <el-table-column
          v-if="eye.endDate"
          show-overflow-tooltip
          prop="endDate"
          sortable
          min-width="180"
          label="有效期结束"
        />
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          sortable
          min-width="150"
          label="备注"
        />
        <el-table-column
          v-if="eye.createUser"
          show-overflow-tooltip
          prop="createUser"
          sortable
          min-width="100"
          label="创建人"
        />
        <el-table-column
          v-if="eye.createDate"
          show-overflow-tooltip
          prop="createDate"
          sortable
          min-width="180"
          label="创建时间"
        />
        <el-table-column
          v-if="eye.updateName"
          show-overflow-tooltip
          prop="updateName"
          sortable
          min-width="100"
          label="更新人"
        />
        <el-table-column
          v-if="eye.updateDate"
          show-overflow-tooltip
          prop="updateDate"
          sortable
          min-width="180"
          label="更新时间"
        />
        <el-table-column
          v-if="eye.operateUnitId"
          show-overflow-tooltip
          prop="operateUnitId"
          min-width="150"
          sortable
          label="经营单位"
        >
          <template slot-scope="scope">{{ scope.row.operateUnitId | OperaUnitFilter }}</template>
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          label="操作">
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
            <el-checkbox v-model="eye.code">单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.operateUnitId">经营单位</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.startDate">有效期开始时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.endDate">有效期结束时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createUser">创建人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.updateName">更新人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createDate">创建时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.updateDate">更新时间</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- <component
      v-if="showViewPopup"
      :is="'FreightStandardViewPopup'"
      :id="currentClickRow.stdId"
      @close="showViewPopup = false"
    />-->
    <component
      v-if="showEditPopup"
      :is="'FreightStandardEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'FreightStandardDeletePopup'"
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
// import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import FreightStandardStatusEnumSelect from './../../../components/entity/freight-standard/FreightStandardStatusEnumSelect'
import FreightStandardStatusEnumUtil from './../../../components/enum/freight-standard/FreightStandardStatusEnumUtil'
import freightStandardServer from './../../../api/freightStandardServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
const initSearchParams = {
  code: null,
  status: Array(0),
  startDate: null,
  endDate: null,
  createUser: null,
  startCreateDate: null,
  endCreateDate: null,
  updateName: null,
  startUpdateDate: null,
  endUpdateDate: null,
  operateUnitIds: []
}
const initExport = {
  code: '单号',
  status: '状态',
  startDate: '有效期开始时间',
  endDate: '有效期结束时间',
  createUser: '创建人',
  createDate: '创建时间',
  updateName: '更新人',
  updateDate: '更新时间',
  remark: '备注',
  operateUnitId: '经营单位'
}
export default {
  name: 'FreightStandardManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    // OperateUnitSelect,
    FreightStandardStatusEnumSelect,
    // FreightStandardViewPopup: () => import('./freightStandardViewPopup.vue'),
    FreightStandardEditPopup: () => import('./freightStandardEditPopup.vue'),
    FreightStandardDeletePopup: () => import('./freightStandardDeletePopup.vue')
  },
  filters: {
    FreightStandardStatusFilter: FreightStandardStatusEnumUtil.toTitleFilter,
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
      more: false,
      eye: {
        code: true,
        status: true,
        remark: true,
        isDelete: true,
        operateUnitId: true,
        startDate: true,
        endDate: true,
        createUser: true,
        updateName: true,
        createDate: true,
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
      const keyword = this.keyword
      const res = await freightStandardServer.search({
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
    // clickViewBtn(row) {
    //   this.currentClickRow = row
    //   this.showViewPopup = true
    // },
    clickEditBtn(row) {
      // this.currentClickRow = row
      // this.showEditPopup = true
      this.$router.push({
        path: './freight-standard/edit-sublist/' + row.stdId
        // query: { id: row.stdId }
      })
    },
    clickAddBtn() {
      // this.currentClickRow = {}
      // this.showEditPopup = true
      this.$router.push({
        path: './freight-standard/edit-sublist/new'
      })
      this.reload()
    },
    clickBatchDeleteBtn() {
      if (this.multipleSelection.length > 0) {
        this.showDeletePopup = true
      } else {
        this.$message({
          showClose: true,
          message: '请先选中需要删除的行',
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
        item.status = FreightStandardStatusEnumUtil.toTitleFilter(item.status)
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
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
