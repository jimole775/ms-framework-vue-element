<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="输单日期起始">
            <el-date-picker
              v-model="keyword.inputDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="输单日期结束">
            <el-date-picker
              v-model="keyword.inputDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告id">
            <el-input v-model="keyword.warnId" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.warnNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.piNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="柜量">
            <el-input v-model="keyword.boxQty" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="截关起始">
            <el-date-picker
              v-model="keyword.cutDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="截关结束">
            <el-date-picker
              v-model="keyword.cutDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="币种">
            <CurrencySelectEnumSelect v-model="keyword.currencyCode" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="费用编码">
            <el-input v-model="keyword.feeType" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="金额">
            <el-input v-model="keyword.amt" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="原因">
            <el-input v-model="keyword.reason" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="责任人">
            <el-input v-model="keyword.resMan" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="负责人">
            <ResponsibleLeaderEnumSelect v-model="keyword.responsibleLeader" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="责任体系">
            <ResponsibleOrgEnumSelect v-model="keyword.responsibleOrg" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="负激励">
            <el-input v-model="keyword.negativeIncentive" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="大区">
            <AreaSelect v-model="keyword.areaIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="部门">
            <DepartmentSelect v-model="keyword.orgIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="货代">
            <ShippingCompanySelect v-model="keyword.transitIds" type="multiple" />
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
          v-if="eye.inputDate"
          show-overflow-tooltip
          prop="inputDate"
          sortable
          label="输单日期">
          <template slot-scope="scope">
            {{ scope.row.inputDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.warnId"
          show-overflow-tooltip
          prop="warnId"
          sortable
          label="出货预告id" />
        <el-table-column
          v-if="eye.warnNo"
          show-overflow-tooltip
          prop="warnNo"
          sortable
          label="出货预告号" />
        <el-table-column
          v-if="eye.piNo"
          show-overflow-tooltip
          prop="piNo"
          sortable
          label="合同号" />
        <el-table-column
          v-if="eye.boxQty"
          show-overflow-tooltip
          prop="boxQty"
          sortable
          label="柜量" />
        <el-table-column
          v-if="eye.cutDate"
          show-overflow-tooltip
          prop="cutDate"
          sortable
          label="截关">
          <template slot-scope="scope">
            {{ scope.row.cutDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.currencyCode"
          show-overflow-tooltip
          prop="currencyCode"
          sortable
          label="币种">
          <template slot-scope="scope">
            {{ scope.row.currencyCode | CurrencySelectFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.feeType"
          show-overflow-tooltip
          prop="feeType"
          sortable
          label="费用编码" />
        <el-table-column
          v-if="eye.amt"
          show-overflow-tooltip
          prop="amt"
          sortable
          label="金额" />
        <el-table-column
          v-if="eye.reason"
          show-overflow-tooltip
          prop="reason"
          sortable
          label="原因" />
        <el-table-column
          v-if="eye.resMan"
          show-overflow-tooltip
          prop="resMan"
          sortable
          label="责任人" />
        <el-table-column
          v-if="eye.responsibleLeader"
          show-overflow-tooltip
          prop="responsibleLeader"
          sortable
          label="负责人">
          <template slot-scope="scope">
            {{ scope.row.responsibleLeader | ResponsibleLeaderFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.responsibleOrg"
          show-overflow-tooltip
          prop="responsibleOrg"
          sortable
          label="责任体系">
          <template slot-scope="scope">
            {{ scope.row.responsibleOrg | ResponsibleOrgFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.negativeIncentive"
          show-overflow-tooltip
          prop="negativeIncentive"
          sortable
          label="负激励" />
        <el-table-column
          v-if="eye.areaId"
          show-overflow-tooltip
          prop="areaId"
          sortable
          label="大区">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openAreaViewPopup(scope.row.areaId)">{{ scope.row.area ? scope.row.area.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.orgId"
          show-overflow-tooltip
          prop="orgId"
          sortable
          label="部门">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openOrgViewPopup(scope.row.orgId)">{{ scope.row.org ? scope.row.org.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.transitId"
          show-overflow-tooltip
          prop="transitId"
          sortable
          label="货代">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openTransitViewPopup(scope.row.transitId)">{{ scope.row.transit ? scope.row.transit.id : '' }}</el-button>
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
            <el-checkbox v-model="eye.inputDate">输单日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnId">出货预告id</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnNo">出货预告号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.piNo">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.boxQty">柜量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cutDate">截关</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currencyCode">币种</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.feeType">费用编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.amt">金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.reason">原因</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.resMan">责任人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.responsibleLeader">负责人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.responsibleOrg">责任体系</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.negativeIncentive">负激励</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.areaId">areaId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orgId">orgId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.transitId">transitId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'ExtraFeeItemViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'ExtraFeeItemEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'ExtraFeeItemDeletePopup'"
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
    <component
      v-if="showOrgViewPopup"
      :is="'DepartmentViewPopup'"
      :id="orgId"
      @close="showOrgViewPopup = false"
    />
    <component
      v-if="showTransitViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="transitId"
      @close="showTransitViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import Datetime from './../../../utils/datetime'
import AreaSelect from './../../../components/entity/area/AreaSelect'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import ShippingCompanySelect from './../../../components/entity/shipping-company/ShippingCompanySelect'
import CurrencySelectEnumSelect from './../../../components/entity/extra-fee-item/CurrencySelectEnumSelect'
import CurrencySelectEnumUtil from './../../../components/enum/extra-fee-item/CurrencySelectEnumUtil'
import ResponsibleLeaderEnumSelect from './../../../components/entity/extra-fee-item/ResponsibleLeaderEnumSelect'
import ResponsibleLeaderEnumUtil from './../../../components/enum/extra-fee-item/ResponsibleLeaderEnumUtil'
import ResponsibleOrgEnumSelect from './../../../components/entity/extra-fee-item/ResponsibleOrgEnumSelect'
import ResponsibleOrgEnumUtil from './../../../components/enum/extra-fee-item/ResponsibleOrgEnumUtil'
import extraFeeItemServer from './../../../api/extraFeeItemServer'
const initSearchParams = {
  inputDateStart: null,
  inputDateEnd: null,
  warnId: null,
  warnNo: null,
  piNo: null,
  boxQty: null,
  cutDateStart: null,
  cutDateEnd: null,
  currencyCode: null,
  feeType: null,
  amt: null,
  reason: null,
  resMan: null,
  responsibleLeader: null,
  responsibleOrg: null,
  negativeIncentive: null,
  areaIds: [],
  orgIds: [],
  transitIds: [],
}
const initExport = {
  inputDate: '输单日期',
  warnId: '出货预告id',
  warnNo: '出货预告号',
  piNo: '合同号',
  boxQty: '柜量',
  cutDate: '截关',
  currencyCode: '币种',
  feeType: '费用编码',
  amt: '金额',
  reason: '原因',
  resMan: '责任人',
  responsibleLeader: '负责人',
  responsibleOrg: '责任体系',
  negativeIncentive: '负激励',
  area: '大区',
  org: '部门',
  transit: '货代',
}
export default {
  name: 'ExtraFeeItemManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    AreaSelect,
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    DepartmentSelect,
    DepartmentViewPopup: () => import('./../department/departmentViewPopup'),
    ShippingCompanySelect,
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    CurrencySelectEnumSelect,
    ResponsibleLeaderEnumSelect,
    ResponsibleOrgEnumSelect,
    ExtraFeeItemViewPopup: () => import('./extraFeeItemViewPopup.vue'),
    ExtraFeeItemEditPopup: () => import('./extraFeeItemEditPopup.vue'),
    ExtraFeeItemDeletePopup: () => import('./extraFeeItemDeletePopup.vue')
  },
  filters: {
    CurrencySelectFilter: CurrencySelectEnumUtil.toTitleFilter,
    ResponsibleLeaderFilter: ResponsibleLeaderEnumUtil.toTitleFilter,
    ResponsibleOrgFilter: ResponsibleOrgEnumUtil.toTitleFilter,
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
      showOrgViewPopup: false,
      orgId: null,
      showTransitViewPopup: false,
      transitId: null,
      more: false,
      eye: {
        inputDate: true,
        warnId: true,
        warnNo: true,
        piNo: true,
        boxQty: true,
        cutDate: true,
        currencyCode: true,
        feeType: true,
        amt: true,
        reason: true,
        resMan: true,
        responsibleLeader: true,
        responsibleOrg: true,
        negativeIncentive: true,
        areaId: true,
        orgId: true,
        transitId: true,
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
      if (keyword.inputDateStart) {
        query += ` AND inputDate:[${Datetime.dateToDateStr(keyword.inputDateStart)} TO *]`
      }
      if (keyword.inputDateEnd) {
        query += ` AND inputDate:[* TO ${Datetime.dateToDateStr(keyword.inputDateEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.warnId)) {
        query += ` AND warnId:${keyword.warnId}`
      }
      if (Validate.isNotEmpty(keyword.warnNo)) {
        query += ` AND warnNo:${keyword.warnNo}`
      }
      if (Validate.isNotEmpty(keyword.piNo)) {
        query += ` AND piNo:${keyword.piNo}`
      }
      if (Validate.isNotEmpty(keyword.boxQty)) {
        query += ` AND boxQty:${keyword.boxQty}`
      }
      if (keyword.cutDateStart) {
        query += ` AND cutDate:[${Datetime.dateToDateStr(keyword.cutDateStart)} TO *]`
      }
      if (keyword.cutDateEnd) {
        query += ` AND cutDate:[* TO ${Datetime.dateToDateStr(keyword.cutDateEnd)}]`
      }
      if (keyword.currencyCode && keyword.currencyCode.length > 0) {
        query += ' AND ('
        keyword.currencyCode.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `currencyCode:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.feeType)) {
        query += ` AND feeType:${keyword.feeType}`
      }
      if (Validate.isNotEmpty(keyword.amt)) {
        query += ` AND amt:${keyword.amt}`
      }
      if (Validate.isNotEmpty(keyword.reason)) {
        query += ` AND reason:${keyword.reason}`
      }
      if (Validate.isNotEmpty(keyword.resMan)) {
        query += ` AND resMan:${keyword.resMan}`
      }
      if (keyword.responsibleLeader && keyword.responsibleLeader.length > 0) {
        query += ' AND ('
        keyword.responsibleLeader.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `responsibleLeader:${str}`
        })
        query += ')'
      }
      if (keyword.responsibleOrg && keyword.responsibleOrg.length > 0) {
        query += ' AND ('
        keyword.responsibleOrg.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `responsibleOrg:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.negativeIncentive)) {
        query += ` AND negativeIncentive:${keyword.negativeIncentive}`
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
      if (keyword.orgIds && keyword.orgIds.length > 0) {
        query += ' AND ('
        keyword.orgIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `org.id:${id}`
        })
        query += ')'
      }
      if (keyword.transitIds && keyword.transitIds.length > 0) {
        query += ' AND ('
        keyword.transitIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `transit.id:${id}`
        })
        query += ')'
      }
      const res = await extraFeeItemServer.search({
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
    openAreaViewPopup(id) {
      this.areaId = id
      this.showAreaViewPopup = true
    },
    openOrgViewPopup(id) {
      this.orgId = id
      this.showOrgViewPopup = true
    },
    openTransitViewPopup(id) {
      this.transitId = id
      this.showTransitViewPopup = true
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
