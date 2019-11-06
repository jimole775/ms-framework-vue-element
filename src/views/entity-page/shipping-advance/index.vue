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
          <el-form-item label="单号">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年份">
            <el-date-picker
              v-model="keyword.ytYear"
              size="mini"
              class="max-w"
              type="year"
              value-format="yyyy"
              placeholder="选择年"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="月份">
            <el-date-picker
              v-model="keyword.ytMonth"
              size="mini"
              class="max-w"
              type="month"
              format="MM"
              value-format="MM"
              placeholder="选择月"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <FreightPayStatusEnumSelect v-model="keyword.status" type="multiple"/>
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="总金额">
            <el-input v-model="keyword.amount" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="预提金额">
            <el-input v-model="keyword.advanceAmount" size="mini" />
          </el-form-item>
        </el-col>-->
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建人">
            <el-input v-model="keyword.createMan" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申请日期起始">
            <el-date-picker
              v-model="keyword.applyDateStart"
              size="mini"
              class="max-w"
              type="date"
              placeholder="选择结束时间"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申请日期结束">
            <el-date-picker
              v-model="keyword.applyDateEnd"
              size="mini"
              class="max-w"
              type="date"
              placeholder="选择结束时间"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="凭证号">
            <el-input v-model="keyword.credentials" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini"/>
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
          min-width="200"
          label="单号"
        />
        <el-table-column
          v-if="eye.yearMonth"
          show-overflow-tooltip
          prop="yearMonth"
          min-width="200"
          label="年份月份"
        />
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          min-width="80"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.status | FreightPayStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.amount"
          show-overflow-tooltip
          prop="amount"
          min-width="100"
          label="总金额"
        />
        <el-table-column
          v-if="eye.advanceAmount"
          show-overflow-tooltip
          prop="advanceAmount"
          min-width="100"
          label="预提金额"
        />
        <el-table-column
          v-if="eye.createMan"
          show-overflow-tooltip
          prop="createMan"
          min-width="100"
          label="创建人"
        />
        <el-table-column
          v-if="eye.applyDate"
          show-overflow-tooltip
          prop="applyDate"
          min-width="180"
          label="申请日期"
        />
        <el-table-column
          v-if="eye.credentials"
          show-overflow-tooltip
          prop="credentials"
          min-width="100"
          label="凭证号"
        />
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          min-width="200"
          label="备注"
        />
        <el-table-column
          v-if="eye.operateUnitId"
          show-overflow-tooltip
          prop="operateUnitId"
          min-width="150"
          label="经营单位"
        >
          <template slot-scope="scope">{{ scope.row.operateUnitId | OperaUnitFilter }}</template>
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
            <el-checkbox v-model="eye.code">单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.yearMonth">年份月份</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.amount">总金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.advanceAmount">预提金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createMan">创建人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.applyDate">申请日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.credentials">凭证号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.operateUnitId">operateUnitId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- <component
      v-if="showViewPopup"
      :is="'ShippingAdvanceViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />-->
    <component
      v-if="showEditPopup"
      :is="'ShippingAdvanceEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'ShippingAdvanceDeletePopup'"
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
      v-if="showOperateUnitViewPopup"
      :is="'OperateUnitViewPopup'"
      :id="operateUnitId"
      @close="showOperateUnitViewPopup = false"
    />
  </div>
</template>

<script>
// import Validate from './../../../utils/validate.js'
// import Datetime from './../../../utils/datetime'
// import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import FreightPayStatusEnumSelect from './../../../components/entity/shipping-advance/FreightPayStatusEnumSelect'
import FreightPayStatusEnumUtil from './../../../components/enum/shipping-advance/FreightPayStatusEnumUtil'
import shippingAdvanceServer from './../../../api/shippingAdvanceServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
const initSearchParams = {
  code: null,
  ytYear: null,
  ytMonth: null,
  status: Array(0),
  // amount: null,
  // advanceAmount: null,
  createMan: null,
  applyDateStart: null,
  applyDateEnd: null,
  credentials: null,
  remark: null
}
const initExport = {
  code: '单号',
  yearMonth: '年份月份',
  status: '状态',
  amount: '总金额',
  advanceAmount: '预提金额',
  createMan: '创建人',
  applyDate: '申请日期',
  credentials: '凭证号',
  remark: '备注',
  operateUnitId: '经营单位'
}
export default {
  name: 'ShippingAdvanceManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    // OperateUnitSelect,
    OperateUnitViewPopup: () =>
      import('./../operate-unit/operateUnitViewPopup'),
    FreightPayStatusEnumSelect,
    ShippingAdvanceViewPopup: () => import('./shippingAdvanceViewPopup.vue'),
    ShippingAdvanceEditPopup: () => import('./shippingAdvanceEditPopup.vue'),
    ShippingAdvanceDeletePopup: () => import('./shippingAdvanceDeletePopup.vue')
  },
  filters: {
    FreightPayStatusFilter: FreightPayStatusEnumUtil.toTitleFilter,
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
      showOperateUnitViewPopup: false,
      operateUnitId: null,
      more: false,
      eye: {
        code: true,
        yearMonth: true,
        status: true,
        amount: true,
        advanceAmount: true,
        createMan: true,
        applyDate: true,
        credentials: true,
        remark: true,
        operateUnitId: true
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
      const res = await shippingAdvanceServer.search({
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
      this.$router.push({
        path: './shipping-advance/edit/' + row.ytId
        // query: { id: row.ytId }
      })
    },
    clickAddBtn() {
      this.$router.push({
        path: './shipping-advance/edit/new'
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
        item.status = FreightPayStatusEnumUtil.toTitleFilter(item.status)
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
    openOperateUnitViewPopup(id) {
      this.operateUnitId = id
      this.showOperateUnitViewPopup = true
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
</style>
