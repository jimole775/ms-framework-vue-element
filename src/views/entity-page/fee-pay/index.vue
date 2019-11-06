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
            <el-input v-model="keyword.payNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年份">
            <el-date-picker
              v-model="keyword.payYear"
              size="mini"
              class="max-w"
              type="year"
              value-format="yyyy"
              placeholder="选择年"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年份结束">
            <el-date-picker
              v-model="keyword.payYearEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>-->
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="月份">
            <el-date-picker
              v-model="keyword.payMonth"
              size="mini"
              class="max-w"
              type="month"
              format="MM"
              value-format="MM"
              placeholder="选择月"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="月份结束">
            <el-date-picker
              v-model="keyword.payMonthEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>-->
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <FeePayStatEnumSelect v-model="keyword.stat" type="multiple"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单人">
            <el-input v-model="keyword.createUser" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单日期起始">
            <el-date-picker
              v-model="keyword.createDateStart"
              value-format="yyyy-MM-dd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单日期结束">
            <el-date-picker
              v-model="keyword.createDateEnd"
              value-format="yyyy-MM-dd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="应付总额(RMB)">
            <el-input v-model="keyword.totalAmtRmb" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="应付总额">
            <el-input v-model="keyword.totalAmt" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="财务复核总额">
            <el-input v-model="keyword.totalCheckAmt" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="凭证号">
            <el-input v-model="keyword.sapNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.note" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="协议货代">
            <el-input v-model="keyword.transitName" size="mini"/>
            <!-- <ShippingCompanySelect v-model="keyword.transitName" @changeData="changeTransit" /> -->
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="供应商">
            <el-input v-model="keyword.supplierName" size="mini"/>
            <!-- <CustomerSelect v-model="keyword.supplierName" @changeData="changeSupplier" /> -->
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
        <el-table-column type="index" label="序号"/>
        <el-table-column
          v-if="eye.payNo"
          show-overflow-tooltip
          prop="payNo"
          min-width="220"
          label="单据号"
        />
        <el-table-column
          v-if="eye.payYear"
          show-overflow-tooltip
          prop="payYear"
          min-width="100"
          sortable
          label="年份"
        />
        <el-table-column
          v-if="eye.payMonth"
          show-overflow-tooltip
          prop="payMonth"
          min-width="100"
          sortable
          label="月份"
        />
        <el-table-column
          v-if="eye.stat"
          show-overflow-tooltip
          prop="stat"
          min-width="100"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.stat | FeePayStatFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.applyDate"
          show-overflow-tooltip
          prop="applyDate"
          min-width="180"
          label="申请日期"
        />
        <el-table-column
          v-if="eye.createUser"
          show-overflow-tooltip
          prop="createUser"
          min-width="100"
          label="制单人"
        />
        <el-table-column
          v-if="eye.totalAmtRmb"
          show-overflow-tooltip
          prop="totalAmtRmb"
          min-width="140"
          label="应付总额(RMB)"
        />
        <el-table-column
          v-if="eye.totalAmt"
          show-overflow-tooltip
          prop="totalAmt"
          min-width="100"
          label="应付总额"
        />
        <el-table-column
          v-if="eye.totalCheckAmt"
          show-overflow-tooltip
          prop="totalCheckAmt"
          min-width="100"
          label="财务复核总额"
        />
        <el-table-column
          v-if="eye.sapNo"
          show-overflow-tooltip
          prop="sapNo"
          min-width="180"
          label="凭证号"
        />
        <el-table-column
          v-if="eye.note"
          show-overflow-tooltip
          prop="note"
          min-width="100"
          label="备注"
        />
        <el-table-column
          v-if="eye.transitName"
          show-overflow-tooltip
          prop="transitName"
          min-width="140"
          label="协议货代"
        />
        <el-table-column
          v-if="eye.supplierName"
          show-overflow-tooltip
          prop="supplierName"
          min-width="140"
          label="供应商"
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
            <el-checkbox v-model="eye.payNo">单据号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payYear">年份</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payMonth">月份</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.stat">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.applyDate">申请日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createUser">制单人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.totalAmtRmb">应付总额(RMB)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.totalAmt">应付总额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.totalCheckAmt">财务复核总额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.note">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.transitName">协议货代</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.supplierName">供应商</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- <component
      v-if="showViewPopup"
      :is="'FeePayViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />-->
    <component
      v-if="showEditPopup"
      :is="'FeePayEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'FeePayDeletePopup'"
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
// import Datetime from './../../../utils/datetime'
import ShippingCompanySelect from './../../../components/entity/shipping-company/ShippingCompanySelect'
import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
import FeePayStatEnumSelect from './../../../components/entity/fee-pay/FeePayStatEnumSelect'
import FeePayStatEnumUtil from './../../../components/enum/fee-pay/FeePayStatEnumUtil'
import CurrencyEnumSelect from './../../../components/entity/fee-pay/CurrencyEnumSelect'
import CurrencyEnumUtil from './../../../components/enum/fee-pay/CurrencyEnumUtil'
import PayTypeEnumSelect from './../../../components/entity/fee-pay/PayTypeEnumSelect'
import PayTypeEnumUtil from './../../../components/enum/fee-pay/PayTypeEnumUtil'
import feePayServer from './../../../api/feePayServer'
const initSearchParams = {
  payNo: null,
  payYear: null,
  payMonth: null,
  stat: null,
  createDateStart: null,
  createDateEnd: null,
  createUser: null,
  totalAmtRmb: null,
  totalAmt: null,
  totalCheckAmt: null,
  sapNo: null,
  note: null,
  transitName: null,
  supplierName: null
}
const initExport = {
  payNo: '单据号',
  payYear: '年份',
  payMonth: '月份',
  stat: '状态',
  applyDate: '申请日期',
  createUser: '制单人',
  totalAmtRmb: '应付总额(RMB)',
  totalAmt: '应付总额',
  totalCheckAmt: '财务复核总额',
  sapNo: '凭证号',
  note: '备注',
  transitName: '协议货代',
  supplierName: '供应商'
}
export default {
  name: 'FeePayManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    ShippingCompanySelect,
    ShippingCompanyViewPopup: () =>
      import('./../shipping-company/shippingCompanyViewPopup'),
    CustomerSelect,
    CustomerViewPopup: () => import('./../customer/customerViewPopup'),
    FeePayStatEnumSelect,
    CurrencyEnumSelect,
    PayTypeEnumSelect,
    FeePayViewPopup: () => import('./feePayViewPopup.vue'),
    FeePayEditPopup: () => import('./feePayEditPopup.vue'),
    FeePayDeletePopup: () => import('./feePayDeletePopup.vue')
  },
  filters: {
    FeePayStatFilter: FeePayStatEnumUtil.toTitleFilter,
    CurrencyFilter: CurrencyEnumUtil.toTitleFilter,
    PayTypeFilter: PayTypeEnumUtil.toTitleFilter
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
      transitName: null,
      showSupplierViewPopup: false,
      supplierName: null,
      more: false,
      eye: {
        payNo: true,
        payYear: true,
        payMonth: true,
        stat: true,
        applyDate: true,
        createUser: true,
        totalAmtRmb: true,
        totalAmt: true,
        totalCheckAmt: true,
        sapNo: true,
        note: true,
        transitName: true,
        supplierName: true
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
      const res = await feePayServer.search({
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
        path: './fee-pay-edit/' + row.payId
        // query: { id: row.payId }
      })
      this.reload()
    },
    changeTransit(res) {
      this.keyword.transitName = res.supplierName
    },
    changeSupplier(res) {
      this.keyword.supplierName = res
    },
    clickAddBtn() {
      // this.currentClickRow = {}
      // this.showEditPopup = true
      this.$router.push({
        path: './fee-pay-edit/new'
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
        item.stat = FeePayStatEnumUtil.toTitleFilter(item.stat)
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
</style>
