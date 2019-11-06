<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单号">
            <el-input v-model="keyword.code" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <MarinePriceConsultationStatusEnumSelect v-model="keyword.status"/>            
          </el-form-item>
        </el-col>
        <!-- 
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="目的港免用箱">
            <el-input v-model="keyword.freeBox" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="免堆期(天)">
            <el-input v-model="keyword.freeStorageTime" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="预计装柜起">
            <el-date-picker
              v-model="keyword.loadDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="预计装柜止">
            <el-date-picker
              v-model="keyword.loadDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col> -->
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.pi" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.warnNo" size="mini" />
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="航线">
            <MarinePriceConsultationAirRouteEnumSelect v-model="keyword.airRoute"/>            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="预计货款到起">
            <el-date-picker
              v-model="keyword.paymentDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="预计货款到止">
            <el-date-picker
              v-model="keyword.paymentDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="其它提单要求">
            <el-input v-model="keyword.otherCommitRequirements" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="柜量">
            <el-input v-model="keyword.containerNumber" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="其它要求">
            <el-input v-model="keyword.otherRequest" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="销售部门">
            <DepartmentSelect v-model="keyword.saleDepartmentId"/>
          </el-form-item>
        </el-col> -->
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="目的国家">
            <AreaSelect v-model="keyword.targetAreaId"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货港口">
            <PortSelect v-model="keyword.shipmentPortId"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="到货港口">
            <PortSelect v-model="keyword.targetPortId"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="推荐船司">
            <ShippingCompanySelect v-model="keyword.recommendShippingCompanyId"/>
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="柜型">
            <ContainerSelect v-model="keyword.containerTypeId"/>
          </el-form-item>
        </el-col> -->
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
        ref="singleTable"
        :data="tableData"
        :loading="loading"
        border
        highlight-current-row
        class="m-t-12"
        style="width: 100%"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        @row-dblclick="handleRowDb"
      >
        <el-table-column
          type="selection"/>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          min-width="145"
          label="单号" />
        <!-- <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          sortable
          min-width="80"
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | MarinePriceConsultationStatusFilter }}
          </template>
        </el-table-column> -->
        <el-table-column
          v-if="eye.warnNo"
          show-overflow-tooltip
          prop="warnNo"
          sortable
          min-width="165"
          label="出货预告号" />
        <el-table-column
          v-if="eye.quotedPriceState"
          show-overflow-tooltip
          prop="quotedPriceState"
          sortable
          min-width="135"
          label="是否报价">
          <template slot-scope="scope">
            <quoted-price-state :id="scope.row.id"/>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.freeBox"
          show-overflow-tooltip
          prop="freeBox"
          sortable
          min-width="135"
          label="目的港免用箱" />
        <el-table-column
          v-if="eye.freeStorageTime"
          show-overflow-tooltip
          prop="freeStorageTime"
          sortable
          min-width="120"
          label="免堆期(天)" />
        <el-table-column
          v-if="eye.loadDate"
          show-overflow-tooltip
          prop="loadDate"
          sortable
          min-width="135"
          label="预计装柜日期"/>
        <el-table-column
          v-if="eye.pi"
          show-overflow-tooltip
          prop="piNo"
          sortable
          min-width="120"
          label="合同号" />
        <!-- <el-table-column
          v-if="eye.airRoute"
          show-overflow-tooltip
          prop="airRoute"
          sortable
          min-width="80"
          label="航线">
          <template slot-scope="scope">
            {{ scope.row.airRoute | MarinePriceConsultationAirRouteFilter }}
          </template>
        </el-table-column> -->
        <el-table-column
          v-if="eye.paymentDate"
          show-overflow-tooltip
          prop="paymentDate"
          sortable
          min-width="165"
          label="预计货款到达日期"/>
        <el-table-column
          v-if="eye.enquiryUptoDate"
          show-overflow-tooltip
          prop="enquiryUptoDate"
          sortable
          min-width="165"
          label="询价截至日期"/>
        <el-table-column
          v-if="eye.isShippingCompanyPrice"
          show-overflow-tooltip
          prop="isShippingCompanyPrice"
          sortable
          min-width="135"
          label="是否船司价格">
          <template slot-scope="scope">
            <span v-if="scope.row.isShippingCompanyPrice">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.saleDepartmentId"
          show-overflow-tooltip
          prop="saleDepartment"
          sortable
          min-width="115"
          label="销售部门"/>
        <el-table-column
          v-if="eye.targetAreaId"
          show-overflow-tooltip
          prop="targetArea"
          sortable
          min-width="115"
          label="目的国家"/>
        <el-table-column
          v-if="eye.shipmentPortId"
          show-overflow-tooltip
          prop="shipmentPort"
          sortable
          min-width="115"
          label="出货港口"/>
        <el-table-column
          v-if="eye.targetPortId"
          show-overflow-tooltip
          prop="targetPort"
          sortable
          min-width="115"
          label="到货港口"/>
        <el-table-column
          v-if="eye.recommendShippingCompanyId"
          show-overflow-tooltip
          prop="recommendShippingCompanyId"
          sortable
          min-width="115"
          label="推荐船司"/>
        <el-table-column
          v-if="eye.containerTypeId"
          show-overflow-tooltip
          prop="boxNames"
          sortable
          min-width="80"
          label="柜型"/>
        <el-table-column
          v-if="eye.containerNumber"
          show-overflow-tooltip
          prop="boxCounts"
          sortable
          min-width="80"
          label="柜量" />
        <!-- <el-table-column
          v-if="eye.otherCommitRequirements"
          show-overflow-tooltip
          prop="otherCommitRequirements"
          sortable
          min-width="135"
          label="其它提单要求" /> -->
        <!-- <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          sortable
          min-width="80"
          label="备注" /> -->
        <el-table-column
          v-if="eye.otherRequest"
          show-overflow-tooltip
          prop="otherRequest"
          sortable
          min-width="115"
          label="其它要求"/>
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
            <el-checkbox v-model="eye.code">单号</el-checkbox>
          </el-col>
          <!-- <el-col :span="24">
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col> -->
          <el-col :span="24">
            <el-checkbox v-model="eye.warnNo">出货预告号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.quotedPriceState">是否报价</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.freeBox">目的港免用箱</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.freeStorageTime">免堆期(天)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.loadDate">预计装柜日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.pi">合同号</el-checkbox>
          </el-col>
          <!-- <el-col :span="24">
            <el-checkbox v-model="eye.airRoute">航线</el-checkbox>
          </el-col> -->
          <el-col :span="24">
            <el-checkbox v-model="eye.paymentDate">预计货款到达日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.enquiryUptoDate">询价截至日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isShippingCompanyPrice">是否船司价格</el-checkbox>
          </el-col>
          <!-- <el-col :span="24">
            <el-checkbox v-model="eye.otherCommitRequirements">其它提单要求</el-checkbox>
          </el-col> -->
          <el-col :span="24">
            <el-checkbox v-model="eye.containerNumber">柜量</el-checkbox>
          </el-col>
          <!-- <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col> -->
          <el-col :span="24">
            <el-checkbox v-model="eye.otherRequest">其它要求</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.saleDepartmentId">销售部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.targetAreaId">目的国家</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shipmentPortId">出货港口</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.targetPortId">到货港口</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.recommendShippingCompanyId">推荐船司</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.containerTypeId">柜型</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showDeletePopup"
      :is="'MarinePriceConsultationDeletePopup'"
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
      v-if="showTargetAreaViewPopup"
      :is="'AreaViewPopup'"
      :id="areaId"
      @close="showTargetAreaViewPopup = false"
    />
    <component
      v-if="showShipmentPortViewPopup"
      :is="'PortViewPopup'"
      :id="portId"
      @close="showShipmentPortViewPopup = false"
    />
    <component
      v-if="showTargetPortViewPopup"
      :is="'PortViewPopup'"
      :id="portId"
      @close="showTargetPortViewPopup = false"
    />
    <component
      v-if="showRecommendShippingCompanyViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="shippingCompanyId"
      @close="showRecommendShippingCompanyViewPopup = false"
    />
    <div v-if="showDetailView" class="detail-info">
      <div>
        询价明细
      </div>
      <template>
        <el-table
          :data="detailData"
          :loading="loading"
          border
          class="m-t-12"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="index" width="55" label="序号"/>
          <el-table-column
            show-overflow-tooltip
            prop="expirationDate"
            sortable
            min-width="115"
            label="截关日期">
            <template slot-scope="scope">
              {{ scope.row.expirationDate | parseTime('{y}-{m}-{d}') }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="pricePeriodValidity"
            sortable
            min-width="135"
            label="价格有效日期">
            <template slot-scope="scope">
              {{ scope.row.pricePeriodValidity | parseTime('{y}-{m}-{d}') }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="totalAmount"
            sortable
            min-width="105"
            label="总金额" />
          <el-table-column
            show-overflow-tooltip
            prop="lowestPrice"
            sortable
            min-width="115"
            label="综合低价" />
          <el-table-column type="index" width="115" label="综合排名"/>
          <el-table-column
            show-overflow-tooltip
            prop="lastScheduledDate"
            sortable
            min-width="135"
            label="最晚订舱日期">
            <template slot-scope="scope">
              {{ scope.row.lastScheduledDate | parseTime('{y}-{m}-{d}') }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="transportTime"
            sortable
            min-width="135"
            label="预计航程(天)" />
          <el-table-column
            show-overflow-tooltip
            prop="designate"
            sortable
            min-width="115"
            label="确定船司">
            <template slot-scope="scope">
              <span v-if="scope.row.designate === 1">否</span>
              <span v-else-if="scope.row.designate === 2">是</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="remark"
            sortable
            min-width="80"
            label="备注" />
          <el-table-column
            show-overflow-tooltip
            prop="recommendShippingCompanyId"
            sortable
            min-width="115"
            label="货代公司">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="openRecommendShippingCompanyViewPopup(scope.row.recommendShippingCompanyId)">{{ scope.row.recommendShippingCompanyName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="shippingCompanyId"
            sortable
            min-width="115"
            label="船运公司">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="openShippingCompanyViewPopup(scope.row.shippingCompanyId)">{{ scope.row.recommendShippingCompanyName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="currencyName"
            sortable
            min-width="80"
            label="货币"/>
          <el-table-column
            show-overflow-tooltip
            prop="unitMeasurementName"
            sortable
            min-width="80"
            label="单位"/>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import AreaSelect from './../../../components/entity/area/AreaSelect'
import PortSelect from './../../../components/entity/port/PortSelect'
import ShippingCompanySelect from './../../../components/entity/shipping-company/ShippingCompanySelect'
import ContainerSelect from './../../../components/entity/container/ContainerSelect'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import MarinePriceConsultationStatusEnumSelect from './../../../components/entity/marine-price-consultation/MarinePriceConsultationStatusEnumSelect'
import MarinePriceConsultationStatusEnumUtil from './../../../components/enum/marine-price-consultation/MarinePriceConsultationStatusEnumUtil'
import MarinePriceConsultationAirRouteEnumSelect from './../../../components/entity/marine-price-consultation/MarinePriceConsultationAirRouteEnumSelect'
import MarinePriceConsultationAirRouteEnumUtil from './../../../components/enum/marine-price-consultation/MarinePriceConsultationAirRouteEnumUtil'
import marineQuotedPriceServer from './../../../api/marineQuotedPriceServer'
import quotedPriceState from './quotedPriceState'
const initSearchParams = {
  code: null,
  status: null,
  warnNo: null,
  freeBox: null,
  freeStorageTime: null,
  loadDateStart: null,
  loadDateEnd: null,
  pi: null,
  airRoute: null,
  paymentDateStart: null,
  paymentDateEnd: null,
  isShippingCompanyPrice: null,
  otherCommitRequirements: null,
  containerNumber: null,
  remark: null,
  otherRequest: null,
  isDelete: null,
  saleDepartmentId: null,
  targetAreaId: null,
  shipmentPortId: null,
  targetPortId: null,
  recommendShippingCompanyId: null,
  containerTypeId: null,
}
const initExport = {
  code: '单号',
  status: '状态',
  warnNo: '出货预告号',
  quotedPriceState: '是否报价',
  freeBox: '目的港免用箱',
  freeStorageTime: '免堆期(天)',
  loadDate: '预计装柜日期',
  pi: '合同号',
  airRoute: '航线',
  paymentDate: '预计货款到达日期',
  enquiryUptoDate: '询价截至日期',
  isShippingCompanyPrice: '是否船司价格',
  otherCommitRequirements: '其它提单要求',
  containerNumber: '柜量',
  remark: '备注',
  otherRequest: '其它要求',
  saleDepartment: '销售部门',
  targetArea: '目的国家',
  shipmentPort: '出货港口',
  targetPort: '到货港口',
  recommendShippingCompany: '推荐船司',
  containerType: '柜型',
  operateUnit: '经营单位',
}
export default {
  name: 'MarineQuotedPriceManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    DepartmentSelect,
    AreaSelect,
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    PortSelect,
    PortViewPopup: () => import('./../port/portViewPopup'),
    ShippingCompanySelect,
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    ContainerSelect,
    OperateUnitSelect,
    MarinePriceConsultationStatusEnumSelect,
    MarinePriceConsultationAirRouteEnumSelect,
    quotedPriceState,
    MarinePriceConsultationDeletePopup: () => import('./marinePriceConsultationDeletePopup.vue')
  },
  filters: {
    MarinePriceConsultationStatusFilter: MarinePriceConsultationStatusEnumUtil.toTitleFilter,
    MarinePriceConsultationAirRouteFilter: MarinePriceConsultationAirRouteEnumUtil.toTitleFilter,
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
      showDetailView: false,
      detailData: [],
      sort: null,
      tableData: [],
      multipleSelection: [],
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      showTargetAreaViewPopup: false,
      areaId: null,
      showShipmentPortViewPopup: false,
      portId: null,
      showTargetPortViewPopup: false,
      showRecommendShippingCompanyViewPopup: false,
      shippingCompanyId: null,
      more: false,
      eye: {
        code: true,
        status: true,
        warnNo: true,
        quotedPriceState: true,
        freeBox: true,
        freeStorageTime: true,
        loadDate: true,
        pi: true,
        airRoute: true,
        paymentDate: true,
        enquiryUptoDate: true,
        isShippingCompanyPrice: true,
        otherCommitRequirements: true,
        containerNumber: true,
        remark: true,
        otherRequest: true,
        saleDepartmentId: true,
        targetAreaId: true,
        shipmentPortId: true,
        targetPortId: true,
        recommendShippingCompanyId: true,
        containerTypeId: true,
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
      const res = await marineQuotedPriceServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.rows
      // 更新数据
      res.rows.forEach((item, index) => {
        this.$set(this.tableData, index, item)
      })
      this.count = res.page.total
      this.$nextTick(() => {
        this.setPageSize()
      })
      // 每次查询之后都显示第一条信息的详情
      if (res.rows.length > 0) {
        // 选中状态
        this.$refs.singleTable.setCurrentRow(this.tableData[0])
      }
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
    handleCurrentChange(val) {
      this.detailData = []
      if (val === null) {
        this.showDetailView = false
      } else {
        this.getDetail(val.enquirylistId)
      }
    },
    async getDetail(id) {
      const res = await marineQuotedPriceServer.get(id)
      if (res.data.sdpSaleEnquiryLineList.length > 0) {
        // 更新数据
        this.detailData = []
        res.data.sdpSaleEnquiryLineList.forEach((item, index) => {
          this.$set(this.detailData, index, item)
        })
        this.showDetailView = true
      } else {
        this.showDetailView = false
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleRowDb(row) {
      this.$router.push({
        path: './marine-quoted-price/edit/' + row.enquirylistId
      })
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
        item.status = MarinePriceConsultationStatusEnumUtil.toTitleFilter(item.status)
        item.airRoute = MarinePriceConsultationAirRouteEnumUtil.toTitleFilter(item.airRoute)
        item.isShippingCompanyPrice = item.isShippingCompanyPrice ? '是' : '否'
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
    openTargetAreaViewPopup(id) {
      this.areaId = id
      this.showTargetAreaViewPopup = true
    },
    openShipmentPortViewPopup(id) {
      this.portId = id
      this.showShipmentPortViewPopup = true
    },
    openTargetPortViewPopup(id) {
      this.portId = id
      this.showTargetPortViewPopup = true
    },
    openRecommendShippingCompanyViewPopup(id) {
      this.shippingCompanyId = id
      this.showRecommendShippingCompanyViewPopup = true
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
      width: 110px;
    }
    /deep/ .el-form-item__content {
      width: calc(100% - 110px);
    }
  }
  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
</style>
