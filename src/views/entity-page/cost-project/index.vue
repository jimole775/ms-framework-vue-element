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
        <el-table-column type="selection"/>
        <el-table-column type="index" label="序号" width="50"/>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          min-width="200"
          sortable
          label="订单费用编码"
        />
        <el-table-column
          v-if="eye.name"
          show-overflow-tooltip
          prop="name"
          min-width="130"
          sortable
          label="订单费用名称"
        />
        <el-table-column
          v-if="eye.normFee"
          show-overflow-tooltip
          prop="normFee"
          min-width="130"
          sortable
          label="标准费用"
        />
        <el-table-column
          v-if="eye.costProjectType"
          show-overflow-tooltip
          prop="costProjectType"
          min-width="130"
          sortable
          label="订单费用类型"
        >
          <template slot-scope="scope">{{ scope.row.costProjectType | CostProjectTypeFilter }}</template>
        </el-table-column>        
        <el-table-column
          v-if="eye.isDefault"
          show-overflow-tooltip
          prop="isDefault"
          min-width="130"
          sortable
          label="默认指代费用"
        >
          <template slot-scope="scope">{{ scope.row.isDefault === 1 ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.enable"
          show-overflow-tooltip
          prop="enable"
          min-width="130"
          sortable
          label="是否可用"
        >
          <template slot-scope="scope">{{ scope.row.enable === true ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.isExtra"
          show-overflow-tooltip
          prop="isExtra"
          min-width="130"
          sortable
          label="是否额外费用"
        >
          <template slot-scope="scope">{{ scope.row.isExtra === true ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.costProjectProjectType"
          show-overflow-tooltip
          prop="costProjectProjectType"
          min-width="130"
          sortable
          label="项目类型"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.costProjectProjectType | CostProjectProjectTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.entid"
          show-overflow-tooltip
          prop="entid"
          min-width="130"
          sortable
          label="经营单位"
        >
          <template slot-scope="scope">{{ scope.row.entid | OperaUnitFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          min-width="200"
          sortable
          label="备注"
        />
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
            <el-checkbox v-model="eye.normFee">标准费用</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.key">序列</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.costProjectType">订单费用类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.enable">是否可用</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isExtra">是否额外费用</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.costProjectProjectType">项目类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entid">经营单位</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDefault">默认指代费用</el-checkbox>
          </el-col>
          <!-- <el-col :span="24">
            <el-checkbox v-model="eye.areaId">areaId</el-checkbox>
          </el-col>-->
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'CostProjectViewPopup'"
      :id="currentClickRow.orderFeeId"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'CostProjectEditPopup'"
      :id="currentClickRow.orderFeeId"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'CostProjectDeletePopup'"
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
// import Validate from './../../../utils/validate.js'
import AreaSelect from './../../../components/entity/area/AreaSelect'
import CostProjectTypeEnumSelect from './../../../components/entity/cost-project/CostProjectTypeEnumSelect'
import CostProjectTypeEnumUtil from './../../../components/enum/cost-project/CostProjectTypeEnumUtil'
import CostProjectProjectTypeEnumSelect from './../../../components/entity/cost-project/CostProjectProjectTypeEnumSelect'
import CostProjectProjectTypeEnumUtil from './../../../components/enum/cost-project/CostProjectProjectTypeEnumUtil'
import costProjectServer from './../../../api/costProjectServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
const initSearchParams = {
  code: null,
  name: null
}
const initExport = {
  code: '编码',
  name: '名称',
  normFee: '标准费用',
  costProjectType: '订单费用类型',
  costProjectProjectType: '项目类型',
  enable: '是否可用',
  isExtra: '是否额外费用',
  remark: '备注',
  entid: '经营单位',
  isDefault: '默认指代费用',
}
export default {
  name: 'CostProjectManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    AreaSelect,
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    CostProjectTypeEnumSelect,
    CostProjectProjectTypeEnumSelect,
    CostProjectViewPopup: () => import('./costProjectViewPopup.vue'),
    CostProjectEditPopup: () => import('./costProjectEditPopup.vue'),
    CostProjectDeletePopup: () => import('./costProjectDeletePopup.vue')
  },
  filters: {
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
    CostProjectTypeFilter: CostProjectTypeEnumUtil.toTitleFilter,
    CostProjectProjectTypeFilter: CostProjectProjectTypeEnumUtil.toTitleFilter
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
        normFee: true,
        key: true,
        costProjectType: true,
        enable: true,
        remark: true,
        costProjectProjectType: true,
        entid: true,
        areaId: true,
        isExtra: true,
        isDefault: true,
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
      const res = await costProjectServer.search({
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
        item.costProjectType = CostProjectTypeEnumUtil.toTitleFilter(
          item.costProjectType
        )
        item.enable = item.enable ? '是' : '否'
        item.isExtra = item.isExtra ? '是' : '否'
        item.isExtra = item.isExtra ? '是' : '否'
        item.isDefault = item.isDefault === 1 ? '是' : '否'
        item.costProjectProjectType = CostProjectProjectTypeEnumUtil.toTitleFilter(
          item.costProjectProjectType
        )
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
