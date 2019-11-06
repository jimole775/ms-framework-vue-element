<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="编码">
            <el-input v-model="keyword.code" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="名称">
            <el-input v-model="keyword.name" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="标准机型">
            <MachineTypeSelect v-model="keyword.machineTypeIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="进口物料">
            <MaterialSelect v-model="keyword.materialIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="经营单位">
            <OperateUnitSelect v-model="keyword.operateUnitIds" type="multiple" />
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
          v-if="eye.name"
          show-overflow-tooltip
          prop="name"
          sortable
          label="名称" />
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          sortable
          label="备注" />
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
          v-if="eye.machineTypeId"
          show-overflow-tooltip
          prop="machineTypeId"
          sortable
          label="标准机型">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openMachineTypeViewPopup(scope.row.machineTypeId)">{{ scope.row.machineType ? scope.row.machineType.name : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.materialId"
          show-overflow-tooltip
          prop="materialId"
          sortable
          label="进口物料">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openMaterialViewPopup(scope.row.materialId)">{{ scope.row.material ? scope.row.material.name : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.operateUnitId"
          show-overflow-tooltip
          prop="operateUnitId"
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
            <el-checkbox v-model="eye.code">编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.name">名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.machineTypeId">machineTypeId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.materialId">materialId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.operateUnitId">operateUnitId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'MaterialProcessViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'MaterialProcessEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'MaterialProcessDeletePopup'"
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
      v-if="showMachineTypeViewPopup"
      :is="'MachineTypeViewPopup'"
      :id="machineTypeId"
      @close="showMachineTypeViewPopup = false"
    />
    <component
      v-if="showMaterialViewPopup"
      :is="'MaterialViewPopup'"
      :id="materialId"
      @close="showMaterialViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import MachineTypeSelect from './../../../components/entity/machine-type/MachineTypeSelect'
import MaterialSelect from './../../../components/entity/material/MaterialSelect'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import materialProcessServer from './../../../api/materialProcessServer'
const initSearchParams = {
  code: null,
  name: null,
  remark: null,
  isDelete: null,
  machineTypeIds: [],
  materialIds: [],
  operateUnitIds: [],
}
const initExport = {
  code: '编码',
  name: '名称',
  remark: '备注',
  isDelete: '是否删除',
  machineType: '标准机型',
  material: '进口物料',
  operateUnit: '经营单位',
}
export default {
  name: 'MaterialProcessManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    MachineTypeSelect,
    MachineTypeViewPopup: () => import('./../machine-type/machineTypeViewPopup'),
    MaterialSelect,
    MaterialViewPopup: () => import('./../material/materialViewPopup'),
    OperateUnitSelect,
    MaterialProcessViewPopup: () => import('./materialProcessViewPopup.vue'),
    MaterialProcessEditPopup: () => import('./materialProcessEditPopup.vue'),
    MaterialProcessDeletePopup: () => import('./materialProcessDeletePopup.vue')
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
      showMachineTypeViewPopup: false,
      machineTypeId: null,
      showMaterialViewPopup: false,
      materialId: null,
      more: false,
      eye: {
        code: true,
        name: true,
        remark: true,
        isDelete: true,
        machineTypeId: true,
        materialId: true,
        operateUnitId: true,
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
      if (Validate.isNotEmpty(keyword.name)) {
        query += ` AND name:${keyword.name}`
      }
      if (Validate.isNotEmpty(keyword.remark)) {
        query += ` AND remark:${keyword.remark}`
      }
      if (keyword.machineTypeIds && keyword.machineTypeIds.length > 0) {
        query += ' AND ('
        keyword.machineTypeIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `machineType.id:${id}`
        })
        query += ')'
      }
      if (keyword.materialIds && keyword.materialIds.length > 0) {
        query += ' AND ('
        keyword.materialIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `material.id:${id}`
        })
        query += ')'
      }
      if (keyword.operateUnitIds && keyword.operateUnitIds.length > 0) {
        query += ' AND ('
        keyword.operateUnitIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `operateUnit.id:${id}`
        })
        query += ')'
      }
      const res = await materialProcessServer.search({
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
    openMachineTypeViewPopup(id) {
      this.machineTypeId = id
      this.showMachineTypeViewPopup = true
    },
    openMaterialViewPopup(id) {
      this.materialId = id
      this.showMaterialViewPopup = true
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
