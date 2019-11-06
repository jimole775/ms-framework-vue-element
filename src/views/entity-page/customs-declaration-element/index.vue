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
          <el-form-item label="HS编码">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="排序号">
            <el-input v-model="keyword.sortNumber" size="mini" />
          </el-form-item>
        </el-col>-->
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="中文品名">
            <el-input v-model="keyword.name" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="要素品名">
            <el-input v-model="keyword.elementName" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制冷量(BTU)">
            <el-input v-model="keyword.refrigeratingCapacity" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="退税率">
            <el-input-number v-model="keyword.refundTax" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="不退税率">
            <el-input-number v-model="keyword.notRefundTax" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini"/>
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="经营单位">
            <OperateUnitSelect v-model="keyword.entIds" type="multiple" />
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
        <el-table-column type="selection" width="55"/>
        <el-table-column v-if="eye.sortNumber" show-overflow-tooltip prop="sortNumber" label="排序号"/>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          min-width="120"
          prop="code"
          label="HS编码"
        />
        <el-table-column
          v-if="eye.name"
          show-overflow-tooltip
          prop="name"
          min-width="120"
          label="中文品名"
        />
        <el-table-column
          v-if="eye.nameYw"
          show-overflow-tooltip
          prop="nameYw"
          min-width="120"
          label="英文品名"
        />
        <el-table-column
          v-if="eye.elementName"
          show-overflow-tooltip
          prop="elementName"
          min-width="120"
          label="要素品名"
        />
        <el-table-column
          v-if="eye.refrigeratingCapacity"
          show-overflow-tooltip
          prop="refrigeratingCapacity"
          min-width="120"
          sortable
          label="制冷量(BTU)"
        />
        <el-table-column
          v-if="eye.refundTax"
          show-overflow-tooltip
          prop="refundTax"
          min-width="120"
          sortable
          label="退税率"
        />
        <el-table-column
          v-if="eye.notRefundTax"
          show-overflow-tooltip
          prop="notRefundTax"
          min-width="120"
          sortable
          label="不退税率"
        />
        <el-table-column
          v-if="eye.unit"
          show-overflow-tooltip
          prop="unit"
          min-width="100"
          label="单位"
        />
        <el-table-column
          v-if="eye.secondUnit"
          show-overflow-tooltip
          prop="secondUnit"
          min-width="100"
          label="第二单位"
        />
        <el-table-column
          v-if="eye.coldWarm"
          show-overflow-tooltip
          prop="coldWarm"
          min-width="120"
          label="冷暖"
        >
          <template slot-scope="scope">{{ scope.row.coldWarm | WarmOrColdUtilFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.modelsType"
          show-overflow-tooltip
          prop="modelsType"
          min-width="120"
          label="机型详细分类"
        >
          <template slot-scope="scope">{{ scope.row.modelsType | TypeClassifyUtilFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.bigClassName"
          show-overflow-tooltip
          prop="bigClassName"
          min-width="120"
          label="大类名称"
        >
          <template slot-scope="scope">{{ scope.row.bigClassName | BigTypeUtilFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.enable"
          show-overflow-tooltip
          prop="enable"
          min-width="100"
          label="是否可用"
        >
          <template slot-scope="scope">{{ scope.row.enable === true ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          min-width="140"
          label="备注"
        />
        <el-table-column
          v-if="eye.entId"
          show-overflow-tooltip
          prop="entId"
          min-width="120"
          label="经营单位"
        >
          <template slot-scope="scope">{{ scope.row.entId | OperaUnitFilter }}</template>
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
            <el-checkbox v-model="eye.code">HS编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.sortNumber">排序号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.name">中文品名</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.nameYw">英文品名</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.elementName">要素品名</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.refrigeratingCapacity">制冷量(BTU)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.refundTax">退税率</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.notRefundTax">不退税率</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.unit">单位</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.secondUnit">第二单位</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.coldWarm">冷暖</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.modelsType">机型详细分类</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bigClassName">大类名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.enable">是否可用</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entId">经营单位</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'CustomsDeclarationElementViewPopup'"
      :id="currentClickRow.nameId"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'CustomsDeclarationElementEditPopup'"
      :id="currentClickRow.nameId"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'CustomsDeclarationElementDeletePopup'"
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
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import customsDeclarationElementServer from './../../../api/customsDeclarationElementServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import BigTypeUtil from './../../../components/enum/customer/BigTypeUtil'
import TypeClassifyUtil from './../../../components/enum/customer/TypeClassifyUtil'
import WarmOrColdUtil from './../../../components/enum/customer/WarmOrColdUtil'
const initSearchParams = {
  code: null,
  sortNumber: null,
  name: null,
  elementName: null,
  refrigeratingCapacity: null,
  refundTax: null,
  notRefundTax: null,
  unit: null,
  secondUnit: null,
  coldWarm: null,
  modelsType: null,
  bigClassName: null,
  enable: null,
  remark: null,
  isDelete: null,
  entIds: []
}
const initExport = {
  sortNumber: '排序号',
  code: 'HS编码',
  name: '中文品名',
  nameYw: '英文品名',
  elementName: '要素品名',
  refrigeratingCapacity: '制冷量(BTU)',
  refundTax: '退税率',
  notRefundTax: '不退税率',
  unit: '单位',
  secondUnit: '第二单位',
  coldWarm: '冷暖',
  modelsType: '机型详细分类',
  bigClassName: '大类名称',
  enable: '是否可用',
  remark: '备注',
  entId: '经营单位'
}
export default {
  name: 'CustomsDeclarationElementManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    OperateUnitSelect,
    CustomsDeclarationElementViewPopup: () =>
      import('./customsDeclarationElementViewPopup.vue'),
    CustomsDeclarationElementEditPopup: () =>
      import('./customsDeclarationElementEditPopup.vue'),
    CustomsDeclarationElementDeletePopup: () =>
      import('./customsDeclarationElementDeletePopup.vue')
  },
  filters: {
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
    BigTypeUtilFilter: BigTypeUtil.toTitleFilter,
    TypeClassifyUtilFilter: TypeClassifyUtil.toTitleFilter,
    WarmOrColdUtilFilter: WarmOrColdUtil.toTitleFilter
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
        code: true,
        sortNumber: true,
        name: true,
        nameYw: true,
        elementName: true,
        refrigeratingCapacity: true,
        refundTax: true,
        notRefundTax: true,
        unit: true,
        secondUnit: true,
        coldWarm: true,
        modelsType: true,
        bigClassName: true,
        enable: true,
        remark: true,
        isDelete: true,
        entId: true
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
      const res = await customsDeclarationElementServer.search({
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
        item.coldWarm = WarmOrColdUtil.toTitleFilter(item.coldWarm)
        item.modelsType = TypeClassifyUtil.toTitleFilter(item.modelsType)
        item.bigClassName = BigTypeUtil.toTitleFilter(item.bigClassName)
        item.enable = item.enable ? '是' : '否'
        item.entId = OperaUnitEnumUtil.toTitleFilter(item.entId)
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
