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
          <el-form-item label="计划单号">
            <el-input v-model="keyword.billNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年份">
            <el-input v-model="keyword.pYear" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="月份">
            <el-input v-model="keyword.pMonth" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单人">
            <el-input v-model="keyword.createUser" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.note" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="拖柜状态">
            <ContainerTypeEnumSelect v-model="keyword.stat"/>
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
        v-if="isInnerUser"
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="clickAddBtn"
      >新增</el-button>
      <el-button        
        v-if="isInnerUser"
        type="primary" 
        icon="el-icon-delete" 
        size="mini" 
        @click="clickBatchDeleteBtn"
      >删除</el-button>
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
          v-if="eye.billNo"
          show-overflow-tooltip
          prop="billNo"
          sortable
          label="计划单号"
        />
        <el-table-column v-if="eye.pYear" show-overflow-tooltip prop="pYear" sortable label="年份"/>
        <el-table-column v-if="eye.pMonth" show-overflow-tooltip prop="pMonth" sortable label="月份"/>
        <el-table-column
          v-if="eye.createUser"
          show-overflow-tooltip
          prop="createUser"
          sortable
          label="制单人"
        />
        <el-table-column v-if="eye.note" show-overflow-tooltip prop="note" sortable label="备注"/>
        <el-table-column v-if="eye.entId" show-overflow-tooltip prop="entId" sortable label="经营单位">
          <template slot-scope="scope">
            {{ scope.row.entId | OperaUnitFilter }}
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--fixed="right"-->
        <!--label="操作"-->
        <!--width="100">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button type="text" size="mini" @click="clickViewBtn(scope.row)">查看</el-button>-->
        <!--<el-button type="text" size="mini" @click="clickEditBtn(scope.row)">编辑</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
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
            <el-checkbox v-model="eye.billNo">计划单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.pYear">年份</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.pMonth">月份</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createUser">制单人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.note">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entId">entId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'GetContainerProjectViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'GetContainerProjectEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'GetContainerProjectDeletePopup'"
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
      v-if="showEntViewPopup"
      :is="'OperateUnitViewPopup'"
      :id="entId"
      @close="showEntViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import ContainerTypeEnumSelect from './../../../components/entity/get-container-project/ContainerTypeEnumSelect'
import getContainerProjectServer from './../../../api/getContainerProjectServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
const initSearchParams = {
  stat: null,
  billNo: null,
  pYear: null,
  pMonth: null,
  createUser: null,
  note: null,
}
const initExport = {
  billNo: '计划单号',
  pYear: '年份',
  pMonth: '月份',
  createUser: '制单人',
  note: '备注',
  ent: '经营单位'
}
export default {
  name: 'GetContainerProjectManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    ContainerTypeEnumSelect,
    OperateUnitViewPopup: () =>
      import('./../operate-unit/operateUnitViewPopup'),
    GetContainerProjectViewPopup: () =>
      import('./getContainerProjectViewPopup.vue'),
    GetContainerProjectEditPopup: () =>
      import('./getContainerProjectEditPopup.vue'),
    GetContainerProjectDeletePopup: () =>
      import('./getContainerProjectDeletePopup.vue')
  },
  filters: {
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
      showEntViewPopup: false,
      entId: null,
      more: false,
      eye: {
        billNo: true,
        pYear: true,
        pMonth: true,
        createUser: true,
        note: true,
        entId: true
      },
      showEye: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    },
    isInnerUser() {      
      return this.$store.getters.userType !== '外部用户'
    }
  },
  created() {
    if (
      this.$route.query.reminderType &&
      parseInt(this.$route.query.reminderType) === 1
    ) {
      this.keyword.stat = 1
    }
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
      query.userType = this.$store.getters.userType
      const res = await getContainerProjectServer.search_without_entid({
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
        path: './get-container-project/edit' + row.id
      })
    },
    clickAddBtn() {
      // this.currentClickRow = {}
      // this.showEditPopup = true
      this.$router.push({
        path: './get-container-project/edit/new'
      })
      this.reload()
    },
    handleRowDb(val) {
      this.$router.push({
        path: './get-container-project/edit/' + val.id
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
    openEntViewPopup(id) {
      this.entId = id
      this.showEntViewPopup = true
    },
    update() {
      // 关闭弹窗
      // this.showDeletePopup = false
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
