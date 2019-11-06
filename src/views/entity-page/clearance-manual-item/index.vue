<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="记录号">
            <el-input v-model="keyword.recordNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="商品编码">
            <el-input v-model="keyword.itemHNode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="商品名称">
            <el-input v-model="keyword.itemHName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="规格型号">
            <el-input v-model="keyword.spec" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="计量单位">
            <UomEnumSelect v-model="keyword.uom" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="法定计量单位">
            <StdUomEnumSelect v-model="keyword.stdUom" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申报数量">
            <el-input v-model="keyword.declareQty" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申报单价">
            <el-input v-model="keyword.declarePrice" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申报总价">
            <el-input v-model="keyword.declareAmt" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="币值">
            <CnyEnumSelect v-model="keyword.cny" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="美元总价">
            <el-input v-model="keyword.dollarAmt" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="比例因子">
            <el-input v-model="keyword.stdUomFactor" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="免征方案">
            <el-input v-model="keyword.exemptionScheme" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.note" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="产销国">
            <AreaSelect v-model="keyword.proMarkingCountryIds" type="multiple" />
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
          v-if="eye.recordNo"
          show-overflow-tooltip
          prop="recordNo"
          sortable
          label="记录号" />
        <el-table-column
          v-if="eye.itemHNode"
          show-overflow-tooltip
          prop="itemHNode"
          sortable
          label="商品编码" />
        <el-table-column
          v-if="eye.itemHName"
          show-overflow-tooltip
          prop="itemHName"
          sortable
          label="商品名称" />
        <el-table-column
          v-if="eye.spec"
          show-overflow-tooltip
          prop="spec"
          sortable
          label="规格型号" />
        <el-table-column
          v-if="eye.isMainMaterial"
          show-overflow-tooltip
          prop="isMainMaterial"
          sortable
          label="主料标志">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isMainMaterial === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isMainMaterial }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.uom"
          show-overflow-tooltip
          prop="uom"
          sortable
          label="计量单位">
          <template slot-scope="scope">
            {{ scope.row.uom | UomFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.stdUom"
          show-overflow-tooltip
          prop="stdUom"
          sortable
          label="法定计量单位">
          <template slot-scope="scope">
            {{ scope.row.stdUom | StdUomFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.declareQty"
          show-overflow-tooltip
          prop="declareQty"
          sortable
          label="申报数量" />
        <el-table-column
          v-if="eye.declarePrice"
          show-overflow-tooltip
          prop="declarePrice"
          sortable
          label="申报单价" />
        <el-table-column
          v-if="eye.declareAmt"
          show-overflow-tooltip
          prop="declareAmt"
          sortable
          label="申报总价" />
        <el-table-column
          v-if="eye.cny"
          show-overflow-tooltip
          prop="cny"
          sortable
          label="币值">
          <template slot-scope="scope">
            {{ scope.row.cny | CnyFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.dollarAmt"
          show-overflow-tooltip
          prop="dollarAmt"
          sortable
          label="美元总价" />
        <el-table-column
          v-if="eye.stdUomFactor"
          show-overflow-tooltip
          prop="stdUomFactor"
          sortable
          label="比例因子" />
        <el-table-column
          v-if="eye.exemptionScheme"
          show-overflow-tooltip
          prop="exemptionScheme"
          sortable
          label="免征方案" />
        <el-table-column
          v-if="eye.note"
          show-overflow-tooltip
          prop="note"
          sortable
          label="备注" />
        <el-table-column
          v-if="eye.proMarkingCountryId"
          show-overflow-tooltip
          prop="proMarkingCountryId"
          sortable
          label="产销国">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openProMarkingCountryViewPopup(scope.row.proMarkingCountryId)">{{ scope.row.proMarkingCountry ? scope.row.proMarkingCountry.id : '' }}</el-button>
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
            <el-checkbox v-model="eye.recordNo">记录号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.itemHNode">商品编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.itemHName">商品名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.spec">规格型号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isMainMaterial">主料标志</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.uom">计量单位</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.stdUom">法定计量单位</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.declareQty">申报数量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.declarePrice">申报单价</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.declareAmt">申报总价</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cny">币值</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.dollarAmt">美元总价</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.stdUomFactor">比例因子</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.exemptionScheme">免征方案</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.note">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.proMarkingCountryId">proMarkingCountryId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'ClearanceManualItemViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'ClearanceManualItemEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'ClearanceManualItemDeletePopup'"
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
      v-if="showProMarkingCountryViewPopup"
      :is="'AreaViewPopup'"
      :id="proMarkingCountryId"
      @close="showProMarkingCountryViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import AreaSelect from './../../../components/entity/area/AreaSelect'
import UomEnumSelect from './../../../components/entity/clearance-manual-item/UomEnumSelect'
import UomEnumUtil from './../../../components/enum/clearance-manual-item/UomEnumUtil'
import StdUomEnumSelect from './../../../components/entity/clearance-manual-item/StdUomEnumSelect'
import StdUomEnumUtil from './../../../components/enum/clearance-manual-item/StdUomEnumUtil'
import CnyEnumSelect from './../../../components/entity/clearance-manual-item/CnyEnumSelect'
import CnyEnumUtil from './../../../components/enum/clearance-manual-item/CnyEnumUtil'
import clearanceManualItemServer from './../../../api/clearanceManualItemServer'
const initSearchParams = {
  recordNo: null,
  itemHNode: null,
  itemHName: null,
  spec: null,
  isMainMaterial: null,
  uom: null,
  stdUom: null,
  declareQty: null,
  declarePrice: null,
  declareAmt: null,
  cny: null,
  dollarAmt: null,
  stdUomFactor: null,
  exemptionScheme: null,
  note: null,
  proMarkingCountryIds: [],
}
const initExport = {
  recordNo: '记录号',
  itemHNode: '商品编码',
  itemHName: '商品名称',
  spec: '规格型号',
  isMainMaterial: '主料标志',
  uom: '计量单位',
  stdUom: '法定计量单位',
  declareQty: '申报数量',
  declarePrice: '申报单价',
  declareAmt: '申报总价',
  cny: '币值',
  dollarAmt: '美元总价',
  stdUomFactor: '比例因子',
  exemptionScheme: '免征方案',
  note: '备注',
  proMarkingCountry: '产销国',
}
export default {
  name: 'ClearanceManualItemManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    AreaSelect,
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    UomEnumSelect,
    StdUomEnumSelect,
    CnyEnumSelect,
    ClearanceManualItemViewPopup: () => import('./clearanceManualItemViewPopup.vue'),
    ClearanceManualItemEditPopup: () => import('./clearanceManualItemEditPopup.vue'),
    ClearanceManualItemDeletePopup: () => import('./clearanceManualItemDeletePopup.vue')
  },
  filters: {
    UomFilter: UomEnumUtil.toTitleFilter,
    StdUomFilter: StdUomEnumUtil.toTitleFilter,
    CnyFilter: CnyEnumUtil.toTitleFilter,
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
      showProMarkingCountryViewPopup: false,
      proMarkingCountryId: null,
      more: false,
      eye: {
        recordNo: true,
        itemHNode: true,
        itemHName: true,
        spec: true,
        isMainMaterial: true,
        uom: true,
        stdUom: true,
        declareQty: true,
        declarePrice: true,
        declareAmt: true,
        cny: true,
        dollarAmt: true,
        stdUomFactor: true,
        exemptionScheme: true,
        note: true,
        proMarkingCountryId: true,
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
      if (Validate.isNotEmpty(keyword.recordNo)) {
        query += ` AND recordNo:${keyword.recordNo}`
      }
      if (Validate.isNotEmpty(keyword.itemHNode)) {
        query += ` AND itemHNode:${keyword.itemHNode}`
      }
      if (Validate.isNotEmpty(keyword.itemHName)) {
        query += ` AND itemHName:${keyword.itemHName}`
      }
      if (Validate.isNotEmpty(keyword.spec)) {
        query += ` AND spec:${keyword.spec}`
      }
      if (keyword.uom && keyword.uom.length > 0) {
        query += ' AND ('
        keyword.uom.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `uom:${str}`
        })
        query += ')'
      }
      if (keyword.stdUom && keyword.stdUom.length > 0) {
        query += ' AND ('
        keyword.stdUom.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `stdUom:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.declareQty)) {
        query += ` AND declareQty:${keyword.declareQty}`
      }
      if (Validate.isNotEmpty(keyword.declarePrice)) {
        query += ` AND declarePrice:${keyword.declarePrice}`
      }
      if (Validate.isNotEmpty(keyword.declareAmt)) {
        query += ` AND declareAmt:${keyword.declareAmt}`
      }
      if (keyword.cny && keyword.cny.length > 0) {
        query += ' AND ('
        keyword.cny.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `cny:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.dollarAmt)) {
        query += ` AND dollarAmt:${keyword.dollarAmt}`
      }
      if (Validate.isNotEmpty(keyword.stdUomFactor)) {
        query += ` AND stdUomFactor:${keyword.stdUomFactor}`
      }
      if (Validate.isNotEmpty(keyword.exemptionScheme)) {
        query += ` AND exemptionScheme:${keyword.exemptionScheme}`
      }
      if (Validate.isNotEmpty(keyword.note)) {
        query += ` AND note:${keyword.note}`
      }
      if (keyword.proMarkingCountryIds && keyword.proMarkingCountryIds.length > 0) {
        query += ' AND ('
        keyword.proMarkingCountryIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `proMarkingCountry.id:${id}`
        })
        query += ')'
      }
      const res = await clearanceManualItemServer.search({
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
    openProMarkingCountryViewPopup(id) {
      this.proMarkingCountryId = id
      this.showProMarkingCountryViewPopup = true
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
