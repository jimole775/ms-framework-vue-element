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
          <el-form-item label="制单人">
            <el-input v-model="keyword.createMan" size="mini"/>
          </el-form-item>
        </el-col>
        <!--<el-col :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="创建时间起始">-->
        <!--<el-date-picker-->
        <!--v-model="keyword.createTimeStart"-->
        <!--size="mini"-->
        <!--class="max-w"-->
        <!--type="datetime"-->
        <!--/>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="创建时间结束">-->
        <!--<el-date-picker-->
        <!--v-model="keyword.createTimeEnd"-->
        <!--size="mini"-->
        <!--class="max-w"-->
        <!--type="datetime"-->
        <!--/>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单据状态">
            <ChangeOrderOrderStatusEnumSelect v-model="keyword.orderStatus"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.shipmentNotice" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="PI号">
            <el-input v-model="keyword.piNo" size="mini"/>
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
        @row-dblclick="clickEditBtn"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          min-width="150"
          label="单号"
        />
        <el-table-column
          v-if="eye.createMan"
          show-overflow-tooltip
          prop="createMan"
          min-width="100"
          sortable
          label="创建人"
        />
        <el-table-column
          v-if="eye.createTime"
          show-overflow-tooltip
          prop="createTime"
          sortable
          min-width="180"
          label="创建时间"
        >
          <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.orderStatus"
          show-overflow-tooltip
          prop="orderStatus"
          sortable
          min-width="120"
          label="单据状态"
        >
          <template slot-scope="scope">{{ scope.row.orderStatus | ChangeOrderOrderStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.shipmentNotice"
          show-overflow-tooltip
          prop="shipmentNotice"
          sortable
          min-width="180"
          label="出货预告号"
        />
        <el-table-column
          v-if="eye.piNo"
          show-overflow-tooltip
          prop="piNo"
          sortable
          min-width="180"
          label="合同号"
        />
        <el-table-column
          v-if="eye.customer"
          show-overflow-tooltip
          prop="customer"
          sortable
          min-width="150"
          label="客户"
        />
        <el-table-column
          v-if="eye.changeOrderCost"
          show-overflow-tooltip
          prop="changeOrderCost"
          sortable
          min-width="120"
          label="改单费"
        />
        <el-table-column
          v-if="eye.paymentMan"
          show-overflow-tooltip
          prop="paymentMan"
          sortable
          min-width="120"
          label="费用承担人"
        />
        <el-table-column
          v-if="eye.changeReason"
          show-overflow-tooltip
          prop="changeReason"
          sortable
          min-width="150"
          label="改单原因"
        />
        <el-table-column
          v-if="eye.changeContent"
          show-overflow-tooltip
          prop="changeContent"
          sortable
          min-width="150"
          label="改单内容"
        />
        <!-- <el-table-column
          fixed="right"
          label="操作"
          width="60">
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
            <el-checkbox v-model="eye.createMan">创建人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createTime">创建时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orderStatus">单据状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shipmentNotice">出货预告号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.piNo">PI号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customer">客户</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.changeOrderCost">改单费</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.paymentMan">费用承担人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.changeReason">改单原因</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.changeContent">改单内容</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'ChangeOrderViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'ChangeOrderEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'ChangeOrderDeletePopup'"
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
import Validate from './../../../utils/validate.js'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import ChangeOrderOrderStatusEnumSelect from './../../../components/entity/change-order/ChangeOrderOrderStatusEnumSelect'
import ChangeOrderOrderStatusEnumUtil from './../../../components/enum/change-order/ChangeOrderOrderStatusEnumUtil'
import changeOrderServer from './../../../api/changeOrderServer'
import { getAccount } from '@/api/login'
const initSearchParams = {
  code: null,
  createMan: null,
  createTimeStart: null,
  createTimeEnd: null,
  orderStatus: null,
  shipmentNotice: null,
  piNo: null,
  customer: null,
  changeOrderCost: null,
  paymentMan: null,
  changeReason: null,
  changeContent: null,
  isDelete: null,
  operateUnitIds: []
}
const initExport = {
  code: '单号',
  createMan: '创建人',
  createTime: '创建时间',
  orderStatus: '单据状态',
  shipmentNotice: '出货预告号',
  piNo: '合同号',
  customer: '客户',
  changeOrderCost: '改单费',
  paymentMan: '费用承担人',
  changeReason: '改单原因',
  changeContent: '改单内容',
  isDelete: '是否删除',
  operateUnit: '经营单位'
}
export default {
  name: 'ChangeOrderManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    OperateUnitSelect,
    OperateUnitViewPopup: () =>
      import('./../operate-unit/operateUnitViewPopup'),
    ChangeOrderOrderStatusEnumSelect,
    ChangeOrderViewPopup: () => import('./changeOrderViewPopup.vue'),
    ChangeOrderEditPopup: () => import('./changeOrderEditPopup.vue'),
    ChangeOrderDeletePopup: () => import('./changeOrderDeletePopup.vue')
  },
  filters: {
    ChangeOrderOrderStatusFilter: ChangeOrderOrderStatusEnumUtil.toTitleFilter
  },
  inject: ['reload'],
  data() {
    return {
      loading: false,
      keyword: {
        ...initSearchParams
      },
      userTypeTo: null,
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
      showOperateUnitViewPopup: false,
      operateUnitId: null,
      more: false,
      eye: {
        code: true,
        createMan: true,
        createTime: true,
        orderStatus: true,
        shipmentNotice: true,
        piNo: true,
        customer: true,
        changeOrderCost: true,
        paymentMan: true,
        changeReason: true,
        changeContent: true,
        isDelete: true,
        operateUnitId: true
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
    this.search()
  },
  methods: {
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = this.keyword
      const query = {}
      await getAccount().then(response => {
        this.userTypeTo = response.data.data.userType
      })
      Object.keys(keyword).forEach(key => {
        if (Validate.isNotEmpty(keyword[key])) {
          query[key] = keyword[key]
        }
      })
      const res = await changeOrderServer.search({
        query,
        userType: this.userTypeTo,
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
        path: './change-order/edit/' + row.id
      })
    },
    clickAddBtn() {
      // this.currentClickRow = {}
      // this.showEditPopup = true
      this.$router.push({
        path: './change-order/edit/new'
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
        this.dataExport = this.multipleSelection
      } else if (this.tableData.length > 0) {
        this.dataExport = this.tableData
      }
      this.dataExport.forEach((item) => {
        item.orderStatus = ChangeOrderOrderStatusEnumUtil.toTitleFilter(item.orderStatus)
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
