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
          <el-form-item label="保单号">
            <el-input v-model="keyword.policyno" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="可损通知">
            <el-input v-model="keyword.sourceNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <el-input v-model="keyword.invoiceno" size="mini"/>
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
        @row-dblclick="handleRowDb"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          sortable
          min-width="90"
          label="状态"
        >
          <!-- <template slot-scope="scope">
            {{ scope.row.status | DamageNoticeStatusFilter }}
          </template>-->
          <template slot-scope="scope">{{ scope.row.status | DeliverReportStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          min-width="150"
          label="单号"
        />
        <el-table-column
          v-if="eye.policyno"
          show-overflow-tooltip
          prop="policyno"
          sortable
          min-width="150"
          label="保单号"
        />
        <el-table-column
          v-if="eye.sourceNo"
          show-overflow-tooltip
          prop="sourceNo"
          sortable
          min-width="150"
          label="可损通知"
        />
        <el-table-column
          v-if="eye.factInvoiceNo"
          show-overflow-tooltip
          prop="factInvoiceNo"
          sortable
          min-width="150"
          label="发票号"
        />
        <el-table-column
          v-if="eye.areaname"
          show-overflow-tooltip
          prop="areaname"
          sortable
          min-width="130"
          label="销售区域"
        />
        <!-- <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openSalesDepartmentViewPopup(scope.row.salesDepartmentId)">{{ scope.row.salesDepartment ? scope.row.salesDepartment.id : '' }}</el-button>
          </template>
        </el-table-column>-->
        <el-table-column
          v-if="eye.createTime"
          show-overflow-tooltip
          prop="createTime"
          sortable
          min-width="140"
          label="应付款日期"
        >
          <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.createMan"
          show-overflow-tooltip
          prop="createMan"
          sortable
          min-width="110"
          label="创建人"
        />
        <el-table-column
          v-if="eye.createTime"
          show-overflow-tooltip
          prop="createTime"
          sortable
          min-width="140"
          label="创建时间"
        >
          <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.creditCertificateShift"
          show-overflow-tooltip
          prop="creditCertificateShift"
          sortable
          min-width="140"
          label="开证行swift"
        />
        <el-table-column
          v-if="eye.openAccountBankName"
          show-overflow-tooltip
          prop="openAccountBankName"
          sortable
          min-width="160"
          label="开证行名称"
        />
        <el-table-column
          v-if="eye.customer"
          show-overflow-tooltip
          prop="customer"
          sortable
          min-width="130"
          label="客户"
        />
        <el-table-column
          v-if="eye.openAccountBankAddress"
          show-overflow-tooltip
          prop="openAccountBankAddress"
          sortable
          min-width="160"
          label="开证行地址"
        />
        <el-table-column
          v-if="eye.buyerName"
          show-overflow-tooltip
          prop="buyerName"
          sortable
          min-width="140"
          label="买方名称"
        />
        <el-table-column
          v-if="eye.confirmingBankShift"
          show-overflow-tooltip
          prop="confirmingBankShift"
          sortable
          min-width="140"
          label="保兑行swift"
        />
        <el-table-column
          v-if="eye.confirmingBankName"
          show-overflow-tooltip
          prop="confirmingBankName"
          sortable
          min-width="140"
          label="保兑行名称"
        />
        <el-table-column
          v-if="eye.confirmingBankAddress"
          show-overflow-tooltip
          prop="confirmingBankAddress"
          sortable
          min-width="140"
          label="保兑行名称"
        />
        <el-table-column
          v-if="eye.buyerAddress"
          show-overflow-tooltip
          prop="buyerAddress"
          sortable
          min-width="160"
          label="买方地址"
        />
        <el-table-column
          v-if="eye.damageReason"
          show-overflow-tooltip
          prop="damageReason"
          sortable
          min-width="120"
          label="可损原因"
        >
          <template slot-scope="scope">{{ scope.row.damageReason | DamageNoticeDamageReasonFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.explain"
          show-overflow-tooltip
          prop="explain"
          sortable
          min-width="120"
          label="案情说明"
        />
        <el-table-column
          v-if="eye.adoptmeasure"
          show-overflow-tooltip
          prop="adoptmeasure"
          sortable
          min-width="130"
          label="减损措施"
        />
        <el-table-column
          v-if="eye.troverflag"
          show-overflow-tooltip
          prop="troverflag"
          sortable
          min-width="140"
          label="委托我司追讨"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.troverflag = scope.row.troverflag === '1' ? '是' : '否' }}</template>
        </el-table-column>

        <el-table-column
          v-if="eye.financeflag"
          show-overflow-tooltip
          prop="financeflag"
          sortable
          min-width="140"
          label="已办理贸易融资"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.troverflag = scope.row.financeflag === '1' ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.ifinsuranturge"
          show-overflow-tooltip
          prop="ifinsuranturge"
          sortable
          min-width="230"
          label="已签署《索赔权转让协议》"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.ifinsuranturge = scope.row.ifinsuranturge === '1' ? '是' : '否' }}</template>
        </el-table-column>

        <el-table-column
          v-if="eye.detainflag"
          show-overflow-tooltip
          prop="detainflag"
          sortable
          min-width="225"
          label="是否已签署《赔款转让协议》"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.detainflag = scope.row.detainflag === '1' ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.ifbankurge"
          show-overflow-tooltip
          prop="ifbankurge"
          sortable
          min-width="210"
          label="已向保兑银行催款"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.ifbankurge = scope.row.ifbankurge === '1' ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.ifarf"
          show-overflow-tooltip
          prop="ifarf"
          sortable
          min-width="210"
          label="签署《应收账款转让协议》"
        >
          <template slot-scope="scope">{{ scope.row.ifarf = scope.row.ifarf === '1' ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.sinosurebuyerno"
          show-overflow-tooltip
          prop="sinosurebuyerno"
          sortable
          min-width="140"
          label="买方代码"
        />
        <el-table-column
          v-if="eye.settAmt"
          show-overflow-tooltip
          prop="settAmt"
          sortable
          min-width="140"
          label="最终索赔金额"
        />
        <el-table-column
          v-if="eye.settType"
          show-overflow-tooltip
          prop="settType"
          sortable
          min-width="140"
          label="撤销处理类型"
        >
          <template slot-scope="scope">{{ scope.row.settType | DamageCloseUndoEnumUtilFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.entid"
          show-overflow-tooltip
          prop="entid"
          sortable
          min-width="110"
          label="经营单位"
        >
          <template slot-scope="scope">{{ scope.row.entid | OperaUnitEnumUtilFilter }}</template>
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
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createMan">创建人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createTime">创建时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.creditCertificateShift">开证行swift</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.openAccountBankName">开证行名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customer">客户</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.openAccountBankAddress">开证行地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.buyerName">买方名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.confirmingBankShift">保兑行swift</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.confirmingBankName">保兑行名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.confirmingBankAddress">保兑行名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.buyerAddress">买方地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.damageReason">可损原因</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.explain">案情说明</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.adoptmeasure">减损措施</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.commissionCollectionArrears">委托我司追讨</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.financeflag">已办理贸易融资</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.ifinsuranturge">已签署《索赔权转让协议》</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.detainflag">是否已签署《赔款转让协议》</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.ifbankurge">已向保兑银行催款</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.ifarf">签署《应收账款转让协议》</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.areaname">销售区域</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.settAmt">最终索赔金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.settType">撤销处理类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.sinosurebuyerno">买方</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entid">经营单位</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'DamageCloseViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'DamageCloseEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'DamageCloseDeletePopup'"
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
      v-if="showSalesDepartmentViewPopup"
      :is="'DepartmentViewPopup'"
      :id="salesDepartmentId"
      @close="showSalesDepartmentViewPopup = false"
    />
    <component
      v-if="showBuyerViewPopup"
      :is="'BuyerViewPopup'"
      :id="sinosurebuyerno"
      @close="showBuyerViewPopup = false"
    />
    <component
      v-if="showOperateUnitViewPopup"
      :is="'OperateUnitViewPopup'"
      :id="entid"
      @close="showOperateUnitViewPopup = false"
    />
  </div>
</template>

<script>
// import Validate from './../../../utils/validate.js'
// import Datetime from './../../../utils/datetime'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import DamageCloseUndoEnumUtil from './../../../components/enum/damage-close/DamageCloseUndoEnumUtil'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import BuyerSelect from './../../../components/entity/buyer/BuyerSelect'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import DeliverReportStatusEnumUtil from './../../../components/enum/deliver-report/DeliverReportStatusEnumUtil'
// import DamageNoticeStatusEnumSelect from './../../../components/entity/damage-notice/DamageNoticeStatusEnumSelect'
import CommercialInvoiceStatusEnumSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceStatusEnumSelect'
import DamageNoticeStatusEnumUtil from './../../../components/enum/damage-notice/DamageNoticeStatusEnumUtil'
import DamageNoticeDamageReasonEnumSelect from './../../../components/entity/damage-notice/DamageNoticeDamageReasonEnumSelect'
import DamageNoticeDamageReasonEnumUtil from './../../../components/enum/damage-notice/DamageNoticeDamageReasonEnumUtil'
import damageCloseServer from './../../../api/damageCloseServer'
const initSearchParams = {
  code: null,
  policyno: null, // 保单号
  settA: null, // 最终索赔金额
  settType: null, // 撤销处理类型
  sourceNo: null, // 可损通知
  factInvoiceNo: null, // 发票号
  status: null,
  createMan: null,
  createTime: null,
  creditCertificateShift: null,
  openAccountBankName: null,
  customer: null,
  openAccountBankAddress: null,
  buyerName: null,
  confirmingBankShift: null,
  confirmingBankName: null,
  confirmingBankAddress: null,
  buyerAddress: null,
  damageReason: null,
  explain: null,
  adoptmeasure: null,
  // settType: null,
  troverflag: null,
  financeflag: null,
  ifinsuranturge: null,
  detainflag: null,
  ifbankurge: null,
  ifarf: null,
  isDelete: null,
  salesDepartmentIds: [],
  sinosurebuyernos: [],
  entids: []
}
const initExport = {
  code: '单号',
  status: '状态',
  createMan: '创建人',
  createTime: '创建时间',
  creditCertificateShift: '开证行swift',
  openAccountBankName: '开证行名称',
  customer: '客户',
  openAccountBankAddress: '开证行地址',
  buyerName: '买方名称',
  confirmingBankShift: '保兑行swift',
  confirmingBankName: '保兑行名称',
  confirmingBankAddress: '保兑行地址',
  buyerAddress: '买方地址',
  damageReason: '可损原因',
  explain: '案情说明',
  adoptmeasure: '减损措施',
  troverflag: '委托我司追讨',
  financeflag: '已办理贸易融资',
  ifinsuranturge: '已签署《索赔权转让协议》',
  detainflag: '是否已签署《赔款转让协议》',
  ifbankurge: '已向保兑银行催款',
  ifarf: '签署《应收账款转让协议》',
  salesDepartment: '销售区域',
  operateUnit: '经营单位'
}
export default {
  name: 'DamageCloseManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    DepartmentSelect,
    DepartmentViewPopup: () => import('./../department/departmentViewPopup'),
    BuyerSelect,
    BuyerViewPopup: () => import('./../buyer/buyerViewPopup'),
    OperateUnitSelect,
    OperateUnitViewPopup: () =>
      import('./../operate-unit/operateUnitViewPopup'),
    CommercialInvoiceStatusEnumSelect,
    DamageNoticeDamageReasonEnumSelect,
    DamageCloseViewPopup: () => import('./damageCloseViewPopup.vue'),
    DamageCloseEditPopup: () => import('./damageCloseEditPopup.vue'),
    DamageCloseDeletePopup: () => import('./damageCloseDeletePopup.vue')
  },
  filters: {
    DamageNoticeStatusFilter: DamageNoticeStatusEnumUtil.toTitleFilter,
    DamageNoticeDamageReasonFilter:
      DamageNoticeDamageReasonEnumUtil.toTitleFilter,
    DeliverReportStatusFilter: DeliverReportStatusEnumUtil.toTitleFilter,
    OperaUnitEnumUtilFilter: OperaUnitEnumUtil.toTitleFilter,
    DamageCloseUndoEnumUtilFilter: DamageCloseUndoEnumUtil.toTitleFilter
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
      showSalesDepartmentViewPopup: false,
      areaname: null,
      showBuyerViewPopup: false,
      sinosurebuyerno: null,
      showOperateUnitViewPopup: false,
      entid: null,
      more: false,
      eye: {
        code: true,
        policyno: true,
        sourceNo: true,
        factInvoiceNo: true,
        status: true,
        createMan: true,
        createTime: true,
        creditCertificateShift: true,
        openAccountBankName: true,
        customer: true,
        openAccountBankAddress: true,
        buyerName: true,
        confirmingBankShift: true,
        confirmingBankName: true,
        confirmingBankAddress: true,
        buyerAddress: true,
        damageReason: true,
        explain: true,
        settType: true,
        commissionCollectionArrears: true,
        financeflag: true,
        ifinsuranturge: true,
        detainflag: true,
        ifbankurge: true,
        ifarf: true,
        isDelete: true,
        areaname: true,
        sinosurebuyerno: true,
        entid: true,
        settAmt: true,
        adoptmeasure: true
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

      const res = await damageCloseServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data.data.data
      res.data.data.data.forEach((item, index) => {
        this.$set(this.tableData, index, item)
      })
      this.count = res.data.data.page.total
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
    handleRowDb(val) {
      const code = val.corpserialid
      this.$router.push({
        path: './damage-close/edit/' + code
      })
    },
    clickEditBtn(row) {
      const code = row.corpserialid
      this.$router.push({
        path: './damage-close/edit/' + code
      })
    },
    clickAddBtn() {
      const code = 'new'
      this.$router.push({
        path: './damage-close/edit/' + code
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
      this.dataExport.forEach(item => {
        item.status = DeliverReportStatusEnumUtil.toTitleFilter(item.status)
        item.damageReason = DamageNoticeDamageReasonEnumUtil.toTitleFilter(item.damageReason)
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
    openSalesDepartmentViewPopup(id) {
      this.salesDepartmentId = id
      this.showSalesDepartmentViewPopup = true
    },
    openBuyerViewPopup(id) {
      this.sinosurebuyerno = id
      this.showBuyerViewPopup = true
    },
    openOperateUnitViewPopup(id) {
      this.entid = id
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
