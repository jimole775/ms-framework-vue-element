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
          <el-form-item label="最大体积">
            <el-input v-model="keyword.volume" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="柜型">
            <ContainerSelect v-model="keyword.containerType" type="multiple"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <!-- <el-button type="text" size="mini" @click="more = !more">
              {{ more ? '收起' : '更多' }}
            </el-button>-->
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
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" label="序号" width="50"/>
        <el-table-column
          v-if="eye.containerTypeName"
          show-overflow-tooltip
          prop="containerTypeName"
          sortable
          label="柜型"
        />
        <el-table-column
          v-if="eye.volume"
          show-overflow-tooltip
          prop="volume"
          sortable
          label="最大体积"
        />
        <el-table-column
          v-if="eye.maxRoughWeight"
          show-overflow-tooltip
          prop="maxRoughWeight"
          sortable
          label="最大毛重"
        />
        <el-table-column
          v-if="eye.maxSuttle"
          show-overflow-tooltip
          prop="maxSuttle"
          sortable
          label="最大净重"
        />
        <el-table-column
          v-if="eye.createUser"
          show-overflow-tooltip
          prop="createUser"
          sortable
          label="创建者"
        />
        <el-table-column
          v-if="eye.createDate"
          show-overflow-tooltip
          prop="createDate"
          sortable
          label="创建时间"
        />
        <el-table-column v-if="eye.updateUser" show-overflow-tooltip prop="updateUser" label="更新者"/>
        <el-table-column
          v-if="eye.updateDate"
          show-overflow-tooltip
          prop="updateDate"
          label="更新时间"
        />
        <el-table-column v-if="eye.entid" show-overflow-tooltip prop="entid" sortable label="经营单位">
          <template slot-scope="scope">{{ scope.row.entid | OperaUnitFilter }}</template>
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
            <el-checkbox v-model="eye.volume">最大体积</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.maxRoughWeight">最大毛重</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.maxSuttle">最大净重</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.containerTypeName">柜型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createUser">创建者</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createDate">创建时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.updateUser">更新者</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.updateDate">更新时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entid">经营单位</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'ContainerLoadViewPopup'"
      :id="currentClickRow.ruleId"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'ContainerLoadEditPopup'"
      :id="currentClickRow.ruleId"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'ContainerLoadDeletePopup'"
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
import ContainerSelect from './../../../components/entity/container/ContainerSelect'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import containerLoadServer from './../../../api/containerLoadServer'
const initSearchParams = {
  volume: null,
  maxRoughWeight: null,
  maxSuttle: null,
  remark: null,
  isDelete: null,
  containerType: [],
  operateUnitIds: []
}
const initExport = {
  containerTypeName: '柜型',
  volume: '最大体积',
  maxRoughWeight: '最大毛重',
  maxSuttle: '最大净重',
  createUser: '创建者',
  createDate: '创建时间',
  updateUser: '更新者',
  updateDate: '更新时间',
  // remark: '备注',
  // isDelete: '是否删除',
  entid: '经营单位'
}
export default {
  name: 'ContainerLoadManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    ContainerSelect,
    OperateUnitSelect,
    ContainerLoadViewPopup: () => import('./containerLoadViewPopup.vue'),
    ContainerLoadEditPopup: () => import('./containerLoadEditPopup.vue'),
    ContainerLoadDeletePopup: () => import('./containerLoadDeletePopup.vue')
  },
  filters: {
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter
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
        volume: true,
        maxRoughWeight: true,
        maxSuttle: true,
        remark: true,
        containerTypeName: true,
        createUser: true,
        createDate: true,
        updateUser: true,
        updateDate: true,
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
      const res = await containerLoadServer.search({
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
        this.dataExport = JSON.parse(JSON.stringify(this.multipleSelection))
      } else if (this.tableData.length > 0) {
        this.dataExport = JSON.parse(JSON.stringify(this.tableData))
      }
      this.dataExport.forEach(item => {
        item.entid = OperaUnitEnumUtil.toTitleFilter(item.entid)
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
