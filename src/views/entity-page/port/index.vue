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
          <el-form-item label="编码">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="名称">
            <el-input v-model="keyword.name" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="英文名称">
            <el-input v-model="keyword.englishName" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="港口类型">
            <PortTypeEnumSelect v-model="keyword.portType" type="multiple"/>
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
        @row-dblclick="clickEditBtn"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" label="序号" width="50"/>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          min-width="120"
          label="编码"
        />
        <el-table-column
          v-if="eye.name"
          show-overflow-tooltip
          prop="name"
          sortable
          min-width="120"
          label="名称"
        />
        <el-table-column
          v-if="eye.englishName"
          show-overflow-tooltip
          prop="englishName"
          sortable
          min-width="120"
          label="英文名称"
        />
        <el-table-column
          v-if="eye.portType"
          show-overflow-tooltip
          prop="portType"
          sortable
          min-width="120"
          label="港口类型"
        >
          <template slot-scope="scope">{{ scope.row.portType | PortTypeFilter }}</template>
        </el-table-column>

        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          sortable
          min-width="120"
          label="备注"
        />
        <!-- <el-table-column
          v-if="eye.isDelete"
          show-overflow-tooltip
          prop="isDelete"
          sortable
          min-width="120"
          label="是否可用">
          <template slot-scope="scope">
            {{ scope.row.enable === true ? '是' : '否' }}
          </template>
        </el-table-column>-->
        <el-table-column
          v-if="eye.areaName"
          show-overflow-tooltip
          prop="areaName"
          sortable
          min-width="120"
          label="所在国家"
        />
        <el-table-column
          v-if="eye.createUser"
          show-overflow-tooltip
          prop="createUser"
          sortable
          min-width="120"
          label="创建人"
        />
        <el-table-column
          v-if="eye.createDate"
          show-overflow-tooltip
          prop="createDate"
          sortable
          min-width="140"
          label="创建时间"
        />
        <el-table-column
          v-if="eye.updateUser"
          show-overflow-tooltip
          prop="updateUser"
          sortable
          min-width="120"
          label="更新人"
        />
        <el-table-column
          v-if="eye.updateDate"
          show-overflow-tooltip
          prop="updateDate"
          sortable
          min-width="140"
          label="更新时间"
        />
        <el-table-column
          v-if="eye.usable"
          show-overflow-tooltip
          prop="usable"
          sortable
          min-width="140"
          label="是否可用"
        >
          <template slot-scope="scope">{{ scope.row.usable ? '是' : '否' }}</template>
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
            <el-checkbox v-model="eye.code">编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.name">名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.englishName">英文名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.portType">港口类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createUser">创建人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createDate">创建时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.updateUser">更新人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.updateDate">更新时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.usable">是否可用</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.areaName">所在国家</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'PortViewPopup'"
      :id="currentClickRow.seaportId"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'PortEditPopup'"
      :id="currentClickRow.seaportId"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'PortDeletePopup'"
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
      v-if="showAreaViewPopup"
      :is="'AreaViewPopup'"
      :id="areaId"
      @close="showAreaViewPopup = false"
    />
  </div>
</template>

<script>
import AreaSelect from './../../../components/entity/area/AreaSelect'
import PortTypeEnumSelect from './../../../components/entity/port/PortTypeEnumSelect'
import PortTypeEnumUtil from './../../../components/enum/port/PortTypeEnumUtil'
import portServer from './../../../api/portServer'
const initSearchParams = {
  code: null,
  name: null,
  englishName: null,
  portType: Array(0),
  enable: null,
  remark: null,
  isDelete: null,
  areaIds: []
}
const initExport = {
  code: '编码',
  name: '名称',
  englishName: '英文名称',
  portType: '港口类型',
  remark: '备注',
  areaName: '所在国家',
  createUser: '创建人',
  createDate: '创建时间',
  updateUser: '更新人',
  updateDate: '更新时间',
  usable: '是否可用'
}
export default {
  name: 'PortManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    AreaSelect,
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    PortTypeEnumSelect,
    PortViewPopup: () => import('./portViewPopup.vue'),
    PortEditPopup: () => import('./portEditPopup.vue'),
    PortDeletePopup: () => import('./portDeletePopup.vue')
  },
  filters: {
    PortTypeFilter: PortTypeEnumUtil.toTitleFilter
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
      showAreaViewPopup: false,
      areaId: null,
      more: false,
      eye: {
        code: true,
        name: true,
        englishName: true,
        portType: true,
        enable: true,
        remark: true,
        areaName: true,
        createUser: true,
        createDate: true,
        updateUser: true,
        updateDate: true,
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
      /*
      let query = '*:*'
      if (Validate.isNotEmpty(keyword.code)) {
        query += ` AND code:${keyword.code}`
      }
      if (Validate.isNotEmpty(keyword.name)) {
        query += ` AND name:${keyword.name}`
      }
      if (Validate.isNotEmpty(keyword.englishName)) {
        query += ` AND englishName:${keyword.englishName}`
      }
      if (keyword.portType && keyword.portType.length > 0) {
        query += ' AND ('
        keyword.portType.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `portType:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.remark)) {
        query += ` AND remark:${keyword.remark}`
      }
      if (keyword.areaIds && keyword.areaIds.length > 0) {
        query += ' AND ('
        keyword.areaIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `area.id:${id}`
        })
        query += ')'
      }
      */
      const res = await portServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.rows
      this.count = res.page.total
      this.setPageSize(res.page.total)
      this.loading = false
    },
    setPageSize(total) {
      // 重新设定分页条件
      this.pageSize = []
      for (let i = 1; i < 6; i++) {
        if (total > 10 * i) {
          this.pageSize.push(10 * i)
        }
      }
      this.pageSize.push(total)
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
        item.portType = PortTypeEnumUtil.toTitleFilter(item.portType)
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
    openAreaViewPopup(id) {
      this.areaId = id
      this.showAreaViewPopup = true
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
