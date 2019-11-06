<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="费用明细">
            <FreightStandardContainerCostDetailEnumSelect v-model="keyword.freightStandardContainerCostDetail" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="有效期开始时间起始">
            <el-date-picker
              v-model="keyword.startTimeStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="有效期开始时间结束">
            <el-date-picker
              v-model="keyword.startTimeEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="有效期结束时间起始">
            <el-date-picker
              v-model="keyword.endTimeStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="有效期结束时间结束">
            <el-date-picker
              v-model="keyword.endTimeEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="20GP">
            <el-input v-model="keyword.specGp20" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="40GP">
            <el-input v-model="keyword.specGp40" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="40HQ">
            <el-input v-model="keyword.specHq40" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="45HQ">
            <el-input v-model="keyword.specHq45" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="拼箱">
            <el-input v-model="keyword.mergeContainer" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="空运">
            <el-input v-model="keyword.airTransportation" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="一卡一车">
            <el-input v-model="keyword.oneContainer" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="两卡一车">
            <el-input v-model="keyword.towContainer" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="三卡一车">
            <el-input v-model="keyword.threeContainer" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="船务公司">
            <ShippingCompanySelect v-model="keyword.shippingCompanyIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="包干费用标准">
            <FreightStandardSelect v-model="keyword.freightStandardIds" type="multiple" />
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
          v-if="eye.freightStandardContainerCostDetail"
          show-overflow-tooltip
          prop="freightStandardContainerCostDetail"
          sortable
          label="费用明细">
          <template slot-scope="scope">
            {{ scope.row.freightStandardContainerCostDetail | FreightStandardContainerCostDetailFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.startTime"
          show-overflow-tooltip
          prop="startTime"
          sortable
          label="有效期开始时间">
          <template slot-scope="scope">
            {{ scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.endTime"
          show-overflow-tooltip
          prop="endTime"
          sortable
          label="有效期结束时间">
          <template slot-scope="scope">
            {{ scope.row.endTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.specGp20"
          show-overflow-tooltip
          prop="specGp20"
          sortable
          label="20GP" />
        <el-table-column
          v-if="eye.specGp40"
          show-overflow-tooltip
          prop="specGp40"
          sortable
          label="40GP" />
        <el-table-column
          v-if="eye.specHq40"
          show-overflow-tooltip
          prop="specHq40"
          sortable
          label="40HQ" />
        <el-table-column
          v-if="eye.specHq45"
          show-overflow-tooltip
          prop="specHq45"
          sortable
          label="45HQ" />
        <el-table-column
          v-if="eye.mergeContainer"
          show-overflow-tooltip
          prop="mergeContainer"
          sortable
          label="拼箱" />
        <el-table-column
          v-if="eye.airTransportation"
          show-overflow-tooltip
          prop="airTransportation"
          sortable
          label="空运" />
        <el-table-column
          v-if="eye.oneContainer"
          show-overflow-tooltip
          prop="oneContainer"
          sortable
          label="一卡一车" />
        <el-table-column
          v-if="eye.towContainer"
          show-overflow-tooltip
          prop="towContainer"
          sortable
          label="两卡一车" />
        <el-table-column
          v-if="eye.threeContainer"
          show-overflow-tooltip
          prop="threeContainer"
          sortable
          label="三卡一车" />
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
          v-if="eye.shippingCompanyId"
          show-overflow-tooltip
          prop="shippingCompanyId"
          sortable
          label="船务公司">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openShippingCompanyViewPopup(scope.row.shippingCompanyId)">{{ scope.row.shippingCompany ? scope.row.shippingCompany.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.freightStandardId"
          show-overflow-tooltip
          prop="freightStandardId"
          sortable
          label="包干费用标准">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openFreightStandardViewPopup(scope.row.freightStandardId)">{{ scope.row.freightStandard ? scope.row.freightStandard.id : '' }}</el-button>
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
            <el-checkbox v-model="eye.freightStandardContainerCostDetail">费用明细</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.startTime">有效期开始时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.endTime">有效期结束时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.specGp20">20GP</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.specGp40">40GP</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.specHq40">40HQ</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.specHq45">45HQ</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.mergeContainer">拼箱</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.airTransportation">空运</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.oneContainer">一卡一车</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.towContainer">两卡一车</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.threeContainer">三卡一车</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shippingCompanyId">shippingCompanyId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.freightStandardId">freightStandardId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'FreightStandardContainerViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'FreightStandardContainerEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'FreightStandardContainerDeletePopup'"
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
      v-if="showShippingCompanyViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="shippingCompanyId"
      @close="showShippingCompanyViewPopup = false"
    />
    <component
      v-if="showFreightStandardViewPopup"
      :is="'FreightStandardViewPopup'"
      :id="freightStandardId"
      @close="showFreightStandardViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import Datetime from './../../../utils/datetime'
import ShippingCompanySelect from './../../../components/entity/shipping-company/ShippingCompanySelect'
import FreightStandardSelect from './../../../components/entity/freight-standard/FreightStandardSelect'
import FreightStandardContainerCostDetailEnumSelect from './../../../components/entity/freight-standard-container/FreightStandardContainerCostDetailEnumSelect'
import FreightStandardContainerCostDetailEnumUtil from './../../../components/enum/freight-standard-container/FreightStandardContainerCostDetailEnumUtil'
import freightStandardContainerServer from './../../../api/freightStandardContainerServer'
const initSearchParams = {
  freightStandardContainerCostDetail: null,
  startTimeStart: null,
  startTimeEnd: null,
  endTimeStart: null,
  endTimeEnd: null,
  specGp20: null,
  specGp40: null,
  specHq40: null,
  specHq45: null,
  mergeContainer: null,
  airTransportation: null,
  oneContainer: null,
  towContainer: null,
  threeContainer: null,
  isDelete: null,
  shippingCompanyIds: [],
  freightStandardIds: [],
}
const initExport = {
  freightStandardContainerCostDetail: '费用明细',
  startTime: '有效期开始时间',
  endTime: '有效期结束时间',
  specGp20: '20GP',
  specGp40: '40GP',
  specHq40: '40HQ',
  specHq45: '45HQ',
  mergeContainer: '拼箱',
  airTransportation: '空运',
  oneContainer: '一卡一车',
  towContainer: '两卡一车',
  threeContainer: '三卡一车',
  isDelete: '是否删除',
  shippingCompany: '船务公司',
  freightStandard: '包干费用标准',
}
export default {
  name: 'FreightStandardContainerManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    ShippingCompanySelect,
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    FreightStandardSelect,
    FreightStandardViewPopup: () => import('./../freight-standard/freightStandardViewPopup'),
    FreightStandardContainerCostDetailEnumSelect,
    FreightStandardContainerViewPopup: () => import('./freightStandardContainerViewPopup.vue'),
    FreightStandardContainerEditPopup: () => import('./freightStandardContainerEditPopup.vue'),
    FreightStandardContainerDeletePopup: () => import('./freightStandardContainerDeletePopup.vue')
  },
  filters: {
    FreightStandardContainerCostDetailFilter: FreightStandardContainerCostDetailEnumUtil.toTitleFilter,
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
      showShippingCompanyViewPopup: false,
      shippingCompanyId: null,
      showFreightStandardViewPopup: false,
      freightStandardId: null,
      more: false,
      eye: {
        freightStandardContainerCostDetail: true,
        startTime: true,
        endTime: true,
        specGp20: true,
        specGp40: true,
        specHq40: true,
        specHq45: true,
        mergeContainer: true,
        airTransportation: true,
        oneContainer: true,
        towContainer: true,
        threeContainer: true,
        isDelete: true,
        shippingCompanyId: true,
        freightStandardId: true,
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
      if (keyword.freightStandardContainerCostDetail && keyword.freightStandardContainerCostDetail.length > 0) {
        query += ' AND ('
        keyword.freightStandardContainerCostDetail.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `freightStandardContainerCostDetail:${str}`
        })
        query += ')'
      }
      if (keyword.startTimeStart) {
        query += ` AND startTime:[${Datetime.dateToDateStr(keyword.startTimeStart)} TO *]`
      }
      if (keyword.startTimeEnd) {
        query += ` AND startTime:[* TO ${Datetime.dateToDateStr(keyword.startTimeEnd)}]`
      }
      if (keyword.endTimeStart) {
        query += ` AND endTime:[${Datetime.dateToDateStr(keyword.endTimeStart)} TO *]`
      }
      if (keyword.endTimeEnd) {
        query += ` AND endTime:[* TO ${Datetime.dateToDateStr(keyword.endTimeEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.specGp20)) {
        query += ` AND specGp20:${keyword.specGp20}`
      }
      if (Validate.isNotEmpty(keyword.specGp40)) {
        query += ` AND specGp40:${keyword.specGp40}`
      }
      if (Validate.isNotEmpty(keyword.specHq40)) {
        query += ` AND specHq40:${keyword.specHq40}`
      }
      if (Validate.isNotEmpty(keyword.specHq45)) {
        query += ` AND specHq45:${keyword.specHq45}`
      }
      if (Validate.isNotEmpty(keyword.mergeContainer)) {
        query += ` AND mergeContainer:${keyword.mergeContainer}`
      }
      if (Validate.isNotEmpty(keyword.airTransportation)) {
        query += ` AND airTransportation:${keyword.airTransportation}`
      }
      if (Validate.isNotEmpty(keyword.oneContainer)) {
        query += ` AND oneContainer:${keyword.oneContainer}`
      }
      if (Validate.isNotEmpty(keyword.towContainer)) {
        query += ` AND towContainer:${keyword.towContainer}`
      }
      if (Validate.isNotEmpty(keyword.threeContainer)) {
        query += ` AND threeContainer:${keyword.threeContainer}`
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
      if (keyword.freightStandardIds && keyword.freightStandardIds.length > 0) {
        query += ' AND ('
        keyword.freightStandardIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `freightStandard.id:${id}`
        })
        query += ')'
      }
      const res = await freightStandardContainerServer.search({
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
    openShippingCompanyViewPopup(id) {
      this.shippingCompanyId = id
      this.showShippingCompanyViewPopup = true
    },
    openFreightStandardViewPopup(id) {
      this.freightStandardId = id
      this.showFreightStandardViewPopup = true
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
