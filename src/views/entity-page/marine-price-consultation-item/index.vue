<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="截关日期起始">
            <el-date-picker
              v-model="keyword.expirationDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="截关日期结束">
            <el-date-picker
              v-model="keyword.expirationDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="价格有效日期起始">
            <el-date-picker
              v-model="keyword.pricePeriodValidityStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="价格有效日期结束">
            <el-date-picker
              v-model="keyword.pricePeriodValidityEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="总金额">
            <el-input v-model="keyword.totalAmount" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="综合低价">
            <el-input v-model="keyword.lowestPrice" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="综合排名">
            <el-input v-model="keyword.sort" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="最晚订舱日期起始">
            <el-date-picker
              v-model="keyword.lastScheduledDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="最晚订舱日期结束">
            <el-date-picker
              v-model="keyword.lastScheduledDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="预计航程(天)">
            <el-input v-model="keyword.transportTime" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="海运价格咨询">
            <MarinePriceConsultationSelect v-model="keyword.marinePriceConsultationIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="货代公司">
            <ShippingCompanySelect v-model="keyword.recommendShippingCompanyIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="船运公司">
            <ShippingCompanySelect v-model="keyword.shippingCompanyIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="货币">
            <CurrencySelect v-model="keyword.currencyIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单位">
            <UnitMeasurementSelect v-model="keyword.unitMeasurementIds" type="multiple" />
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
          v-if="eye.expirationDate"
          show-overflow-tooltip
          prop="expirationDate"
          sortable
          label="截关日期">
          <template slot-scope="scope">
            {{ scope.row.expirationDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.pricePeriodValidity"
          show-overflow-tooltip
          prop="pricePeriodValidity"
          sortable
          label="价格有效日期">
          <template slot-scope="scope">
            {{ scope.row.pricePeriodValidity | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.totalAmount"
          show-overflow-tooltip
          prop="totalAmount"
          sortable
          label="总金额" />
        <el-table-column
          v-if="eye.lowestPrice"
          show-overflow-tooltip
          prop="lowestPrice"
          sortable
          label="综合低价" />
        <el-table-column
          v-if="eye.sort"
          show-overflow-tooltip
          prop="sort"
          sortable
          label="综合排名" />
        <el-table-column
          v-if="eye.lastScheduledDate"
          show-overflow-tooltip
          prop="lastScheduledDate"
          sortable
          label="最晚订舱日期">
          <template slot-scope="scope">
            {{ scope.row.lastScheduledDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.transportTime"
          show-overflow-tooltip
          prop="transportTime"
          sortable
          label="预计航程(天)" />
        <el-table-column
          v-if="eye.designate"
          show-overflow-tooltip
          prop="designate"
          sortable
          label="确定船司">
          <template slot-scope="scope">
            <el-tag :type="scope.row.designate === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.designate }}
            </el-tag>
          </template>
        </el-table-column>
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
          v-if="eye.marinePriceConsultationId"
          show-overflow-tooltip
          prop="marinePriceConsultationId"
          sortable
          label="海运价格咨询">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openMarinePriceConsultationViewPopup(scope.row.marinePriceConsultationId)">{{ scope.row.marinePriceConsultation ? scope.row.marinePriceConsultation.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.recommendShippingCompanyId"
          show-overflow-tooltip
          prop="recommendShippingCompanyId"
          sortable
          label="货代公司">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openRecommendShippingCompanyViewPopup(scope.row.recommendShippingCompanyId)">{{ scope.row.recommendShippingCompany ? scope.row.recommendShippingCompany.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.shippingCompanyId"
          show-overflow-tooltip
          prop="shippingCompanyId"
          sortable
          label="船运公司">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openShippingCompanyViewPopup(scope.row.shippingCompanyId)">{{ scope.row.shippingCompany ? scope.row.shippingCompany.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.currencyId"
          show-overflow-tooltip
          prop="currencyId"
          sortable
          label="货币"/>
        <el-table-column
          v-if="eye.unitMeasurementId"
          show-overflow-tooltip
          prop="unitMeasurementId"
          sortable
          label="单位">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openUnitMeasurementViewPopup(scope.row.unitMeasurementId)">{{ scope.row.unitMeasurement ? scope.row.unitMeasurement.id : '' }}</el-button>
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
            <el-checkbox v-model="eye.expirationDate">截关日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.pricePeriodValidity">价格有效日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.totalAmount">总金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.lowestPrice">综合低价</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.sort">综合排名</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.lastScheduledDate">最晚订舱日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.transportTime">预计航程(天)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.designate">确定船司</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.marinePriceConsultationId">marinePriceConsultationId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.recommendShippingCompanyId">recommendShippingCompanyId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shippingCompanyId">shippingCompanyId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currencyId">currencyId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.unitMeasurementId">unitMeasurementId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'MarinePriceConsultationItemViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'MarinePriceConsultationItemEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'MarinePriceConsultationItemDeletePopup'"
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
      v-if="showMarinePriceConsultationViewPopup"
      :is="'MarinePriceConsultationViewPopup'"
      :id="marinePriceConsultationId"
      @close="showMarinePriceConsultationViewPopup = false"
    />
    <component
      v-if="showRecommendShippingCompanyViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="shippingCompanyId"
      @close="showRecommendShippingCompanyViewPopup = false"
    />
    <component
      v-if="showShippingCompanyViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="shippingCompanyId"
      @close="showShippingCompanyViewPopup = false"
    />
    <component
      v-if="showUnitMeasurementViewPopup"
      :is="'UnitMeasurementViewPopup'"
      :id="unitMeasurementId"
      @close="showUnitMeasurementViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import Datetime from './../../../utils/datetime'
import MarinePriceConsultationSelect from './../../../components/entity/marine-price-consultation/MarinePriceConsultationSelect'
import ShippingCompanySelect from './../../../components/entity/shipping-company/ShippingCompanySelect'
import CurrencySelect from './../../../components/entity/currency/CurrencySelect'
import UnitMeasurementSelect from './../../../components/entity/unit-measurement/UnitMeasurementSelect'
import marinePriceConsultationItemServer from './../../../api/marinePriceConsultationItemServer'
const initSearchParams = {
  expirationDateStart: null,
  expirationDateEnd: null,
  pricePeriodValidityStart: null,
  pricePeriodValidityEnd: null,
  totalAmount: null,
  lowestPrice: null,
  sort: null,
  lastScheduledDateStart: null,
  lastScheduledDateEnd: null,
  transportTime: null,
  designate: null,
  remark: null,
  isDelete: null,
  marinePriceConsultationIds: [],
  recommendShippingCompanyIds: [],
  shippingCompanyIds: [],
  currencyIds: [],
  unitMeasurementIds: [],
}
const initExport = {
  expirationDate: '截关日期',
  pricePeriodValidity: '价格有效日期',
  totalAmount: '总金额',
  lowestPrice: '综合低价',
  sort: '综合排名',
  lastScheduledDate: '最晚订舱日期',
  transportTime: '预计航程(天)',
  designate: '确定船司',
  remark: '备注',
  isDelete: '是否删除',
  marinePriceConsultation: '海运价格咨询',
  recommendShippingCompany: '货代公司',
  shippingCompany: '船运公司',
  currency: '货币',
  unitMeasurement: '单位',
}
export default {
  name: 'MarinePriceConsultationItemManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    MarinePriceConsultationSelect,
    MarinePriceConsultationViewPopup: () => import('./../marine-price-consultation/marinePriceConsultationViewPopup'),
    ShippingCompanySelect,
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    CurrencySelect,
    UnitMeasurementSelect,
    UnitMeasurementViewPopup: () => import('./../unit-measurement/unitMeasurementViewPopup'),
    MarinePriceConsultationItemViewPopup: () => import('./marinePriceConsultationItemViewPopup.vue'),
    MarinePriceConsultationItemEditPopup: () => import('./marinePriceConsultationItemEditPopup.vue'),
    MarinePriceConsultationItemDeletePopup: () => import('./marinePriceConsultationItemDeletePopup.vue')
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
      showMarinePriceConsultationViewPopup: false,
      marinePriceConsultationId: null,
      showRecommendShippingCompanyViewPopup: false,
      shippingCompanyId: null,
      showShippingCompanyViewPopup: false,
      showUnitMeasurementViewPopup: false,
      unitMeasurementId: null,
      more: false,
      eye: {
        expirationDate: true,
        pricePeriodValidity: true,
        totalAmount: true,
        lowestPrice: true,
        sort: true,
        lastScheduledDate: true,
        transportTime: true,
        designate: true,
        remark: true,
        isDelete: true,
        marinePriceConsultationId: true,
        recommendShippingCompanyId: true,
        shippingCompanyId: true,
        currencyId: true,
        unitMeasurementId: true,
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
      if (keyword.expirationDateStart) {
        query += ` AND expirationDate:[${Datetime.dateToDateStr(keyword.expirationDateStart)} TO *]`
      }
      if (keyword.expirationDateEnd) {
        query += ` AND expirationDate:[* TO ${Datetime.dateToDateStr(keyword.expirationDateEnd)}]`
      }
      if (keyword.pricePeriodValidityStart) {
        query += ` AND pricePeriodValidity:[${Datetime.dateToDateStr(keyword.pricePeriodValidityStart)} TO *]`
      }
      if (keyword.pricePeriodValidityEnd) {
        query += ` AND pricePeriodValidity:[* TO ${Datetime.dateToDateStr(keyword.pricePeriodValidityEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.totalAmount)) {
        query += ` AND totalAmount:${keyword.totalAmount}`
      }
      if (Validate.isNotEmpty(keyword.lowestPrice)) {
        query += ` AND lowestPrice:${keyword.lowestPrice}`
      }
      if (Validate.isNotEmpty(keyword.sort)) {
        query += ` AND sort:${keyword.sort}`
      }
      if (keyword.lastScheduledDateStart) {
        query += ` AND lastScheduledDate:[${Datetime.dateToDateStr(keyword.lastScheduledDateStart)} TO *]`
      }
      if (keyword.lastScheduledDateEnd) {
        query += ` AND lastScheduledDate:[* TO ${Datetime.dateToDateStr(keyword.lastScheduledDateEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.transportTime)) {
        query += ` AND transportTime:${keyword.transportTime}`
      }
      if (Validate.isNotEmpty(keyword.remark)) {
        query += ` AND remark:${keyword.remark}`
      }
      if (keyword.marinePriceConsultationIds && keyword.marinePriceConsultationIds.length > 0) {
        query += ' AND ('
        keyword.marinePriceConsultationIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `marinePriceConsultation.id:${id}`
        })
        query += ')'
      }
      if (keyword.recommendShippingCompanyIds && keyword.recommendShippingCompanyIds.length > 0) {
        query += ' AND ('
        keyword.recommendShippingCompanyIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `recommendShippingCompany.id:${id}`
        })
        query += ')'
      }
      if (keyword.shippingCompanyIds && keyword.shippingCompanyIds.length > 0) {
        query += ' AND ('
        keyword.shippingCompanyIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `shippingCompany.id:${id}`
        })
        query += ')'
      }
      if (keyword.currencyIds && keyword.currencyIds.length > 0) {
        query += ' AND ('
        keyword.currencyIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `currency.id:${id}`
        })
        query += ')'
      }
      if (keyword.unitMeasurementIds && keyword.unitMeasurementIds.length > 0) {
        query += ' AND ('
        keyword.unitMeasurementIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `unitMeasurement.id:${id}`
        })
        query += ')'
      }
      const res = await marinePriceConsultationItemServer.search({
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
    openMarinePriceConsultationViewPopup(id) {
      this.marinePriceConsultationId = id
      this.showMarinePriceConsultationViewPopup = true
    },
    openRecommendShippingCompanyViewPopup(id) {
      this.shippingCompanyId = id
      this.showRecommendShippingCompanyViewPopup = true
    },
    openShippingCompanyViewPopup(id) {
      this.shippingCompanyId = id
      this.showShippingCompanyViewPopup = true
    },
    openUnitMeasurementViewPopup(id) {
      this.unitMeasurementId = id
      this.showUnitMeasurementViewPopup = true
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
