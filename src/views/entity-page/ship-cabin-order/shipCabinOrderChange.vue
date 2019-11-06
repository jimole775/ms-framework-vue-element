<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>          
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.contractNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="原订舱单号">
            <el-input v-model="keyword.oldBookingNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="新订舱单号">
            <el-input v-model="keyword.bookingNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.warnNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="询价单号">
            <el-input v-model="keyword.enquiryNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="订舱状态">
            <ShipCabinOrderStatusEnumSelect v-model="keyword.status" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="操作员">
            <el-input v-model="keyword.cwUser" size="mini" />
          </el-form-item>
        </el-col>
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="物流状态">-->
        <!--<ShipCabinOrderLogStatusEnumSelect v-model="keyword.logState" type="multiple" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="运费付款方式">-->
        <!--<ShipCabinOrderPayStyleEnumSelect v-model="keyword.payStyle" type="multiple" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="价格条款">-->
        <!--<el-input v-model="keyword.priceTypeName" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="发运方式">-->
        <!--<ShipCabinOrderShipTypeEnumSelect v-model="keyword.shipType" type="multiple" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="销售部门">-->
        <!--<el-input v-model="keyword.orgName" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="客户编码">-->
        <!--<el-input v-model="keyword.custCode" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="客户名称">-->
        <!--<el-input v-model="keyword.custName" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
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
      <!--<el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="clickAddBtn">新增</el-button>-->
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
        v-loading="loading"
        :data="tableData"
        border
        class="m-t-12"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-dblclick="handleRowDb"
      >
        <el-table-column type="selection" />
        <el-table-column
          v-if="eye.oldBookingNo"
          show-overflow-tooltip
          prop="oldBookingNo"
          min-width="150"
          sortable
          label="原订舱单号" />
        <el-table-column
          v-if="eye.bookingNo"
          show-overflow-tooltip
          prop="bookingNo"
          min-width="150"
          sortable
          label="新订舱单号" />
        <el-table-column
          v-if="eye.warnNo"
          show-overflow-tooltip
          prop="warnNo"
          min-width="180"
          sortable
          label="出货预告号" />
        <el-table-column
          v-if="eye.contractNo"
          show-overflow-tooltip
          prop="contractNo"
          min-width="150"
          sortable
          label="合同号" />
        <el-table-column
          v-if="eye.isChange"
          show-overflow-tooltip
          prop="isChange"
          min-width="100"
          sortable
          label="变更类型">
          <template slot-scope="scope">{{ scope.row.isChange | ChangeTypeEnumFilter }}</template>
        </el-table-column>  
        <el-table-column
          v-if="eye.enquiryNo"
          show-overflow-tooltip
          prop="enquiryNo"
          min-width="180"
          sortable
          label="询价单号" />
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          min-width="100"
          sortable
          label="订舱状态">
          <template slot-scope="scope">
            {{ scope.row.status | ShipCabinOrderStatusFilter }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          v-if="eye.logState"
          show-overflow-tooltip
          prop="logState"
          min-width="100"
          sortable
          label="物流状态">
          <template slot-scope="scope">
            {{ scope.row.logState | ShipCabinOrderLogStatusFilter }}
          </template>
        </el-table-column> -->
        <!--<el-table-column-->
        <!--v-if="eye.payStyle"-->
        <!--show-overflow-tooltip-->
        <!--prop="payStyle"-->
        <!--sortable-->
        <!--label="运费付款方式">-->
        <!--<template slot-scope="scope">-->
        <!--{{ scope.row.payStyle | ShipCabinOrderPayStyleFilter }}-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          v-if="eye.priceTypeName"
          show-overflow-tooltip
          prop="priceTypeNameStr"
          min-width="100"
          sortable
          label="价格条款" />
        <!--<el-table-column-->
        <!--v-if="eye.shipType"-->
        <!--show-overflow-tooltip-->
        <!--prop="shipType"-->
        <!--sortable-->
        <!--label="发运方式">-->
        <!--<template slot-scope="scope">-->
        <!--{{ scope.row.shipType | ShipCabinOrderShipTypeFilter }}-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          v-if="eye.orgName"
          show-overflow-tooltip
          prop="orgName"
          min-width="120"
          sortable
          label="销售部门" />
        <el-table-column
          v-if="eye.custCode"
          show-overflow-tooltip
          prop="custCode"
          min-width="150"
          sortable
          label="客户编码" />
        <el-table-column
          v-if="eye.custName"
          show-overflow-tooltip
          prop="custName"
          min-width="150"
          sortable
          label="客户名称" />
        <el-table-column
          v-if="eye.versionNum"
          show-overflow-tooltip
          prop="versionNum"
          min-width="100"
          sortable
          label="版本号" />
        <el-table-column
          v-if="eye.cwUser"
          show-overflow-tooltip
          prop="cwUser"
          min-width="120"
          sortable
          label="船务操作员"
        />
        <el-table-column
          v-if="eye.transitName"
          show-overflow-tooltip
          prop="transitName"
          min-width="120"
          sortable
          label="协议货代"
        />
        <el-table-column
          v-if="eye.warnBc"
          show-overflow-tooltip
          prop="warnBc"
          min-width="130"
          sortable
          label="预告变更次数" />
        <el-table-column
          v-if="eye.entid"
          show-overflow-tooltip
          prop="entid"
          min-width="120"
          sortable
          label="经营单位">
          <template slot-scope="scope">{{ scope.row.entid | OperaUnitFilter }}</template>
        </el-table-column>
        <!--<el-table-column-->
        <!--fixed="right"-->
        <!--label="操作"-->
        <!--width="100">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button type="text" size="mini" @click="clickViewBtn(scope.row)">查看</el-button>-->
        <!--<el-button type="text" size="mini" @click="clickEditBtn(scope.row)">编辑</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
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
            <el-checkbox v-model="eye.oldBookingNo">原订舱单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bookingNo">新订舱单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnNo">出货预告号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractNo">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isChange">变更类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.enquiryNo">询价单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">订舱状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.logState">物流状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payStyle">运费付款方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.priceTypeName">价格条款</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shipType">发运方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orgName">销售部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.salesUserId">业务员</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.prover">单证员</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custCode">客户编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custName">客户名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.versionNum">版本号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnBc">预告变更次数</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entid">经营单位</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'ShipCabinOrderViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'ShipCabinOrderEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'ShipCabinOrderDeletePopup'"
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
      v-if="showTransitViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="transitId"
      @close="showTransitViewPopup = false"
    />
    <component
      v-if="showLogisticsViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="logisticsId"
      @close="showLogisticsViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import ShippingCompanySelect from './../../../components/entity/shipping-company/ShippingCompanySelect'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import ShipCabinOrderStatusEnumSelect from './../../../components/entity/ship-cabin-order/ShipCabinOrderStatusEnumSelect'
import ShipCabinOrderStatusEnumUtil from './../../../components/enum/ship-cabin-order/ShipCabinOrderStatusEnumUtil'
import ShipCabinOrderLogStatusEnumSelect from './../../../components/entity/ship-cabin-order/ShipCabinOrderLogStatusEnumSelect'
import ShipCabinOrderLogStatusEnumUtil from './../../../components/enum/ship-cabin-order/ShipCabinOrderLogStatusEnumUtil'
import ShipCabinOrderPayStyleEnumSelect from './../../../components/entity/ship-cabin-order/ShipCabinOrderPayStyleEnumSelect'
import ShipCabinOrderPayStyleEnumUtil from './../../../components/enum/ship-cabin-order/ShipCabinOrderPayStyleEnumUtil'
import ShipCabinOrderShipTypeEnumSelect from './../../../components/entity/ship-cabin-order/ShipCabinOrderShipTypeEnumSelect'
import ShipCabinOrderShipTypeEnumUtil from './../../../components/enum/ship-cabin-order/ShipCabinOrderShipTypeEnumUtil'
import shipCabinOrderServer from './../../../api/shipCabinOrderServer'
import ChangeTypeEnumUtil from './../../../components/enum/ship-cabin-order/ChangeTypeEnumUtil'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import { getAccount } from '@/api/login'
const initSearchParams = {
  bookingNo: null,
  warnNo: null,
  contractNo: null,
  enquiryNo: null,
  status: null,
  logState: null,
  payStyle: null,
  priceTypeName: null,
  shipType: null,
  orgName: null,
  salesUserId: null,
  prover: null,
  custCode: null,
  custName: null,
  versionNum: null,
  warnBc: null,
  boxQty: null,
  totalXqty: null,
  totalAmt: null,
  totalQty: null,
  protFreeBox: null,
  protFreeDate: null,
  isExce: null,
  isAccident: null,
  dcNote: null,
  ygNote: null,
  consignorName: null,
  consignorAddress: null,
  consignorPhone: null,
  consignorFax: null,
  consignorEMail: null,
  consignorCompanyCode: null,
  consignorCountryCode: null,
  consignorAeoCode: null,
  consigneeName: null,
  consigneeAddress: null,
  consigneePhone: null,
  consigneeFax: null,
  consigneeEMail: null,
  consigneeCompanyCode: null,
  consigneeCompanyCodeName: null,
  consigneeCountryCode: null,
  consigneeAeoCode: null,
  particularConsigneeName: null,
  particularConsigneePhone: null,
  particularConsigneeFax: null,
  particularConsigneeEMail: null,
  noticeManName: null,
  noticeManAddress: null,
  noticeManPhone: null,
  noticeManFax: null,
  noticeManEMail: null,
  noticeManCompanyCode: null,
  noticeManCountryCode: null,
  noticeManAeoCode: null,
  noticeMan: null,
  chestbill: null,
  bl: null,
  origin: null,
  tddf: null,
  haveFreePart: null,
  tdfd: null,
  preShipDateStart: null,
  preShipDateEnd: null,
  seaportInName: null,
  seaportOutName: null,
  toAreaName: null,
  finalGoul: null,
  transitRelaName: null,
  transitPhone: null,
  transitEmail: null,
  relaman: null,
  phone: null,
  email: null,
  towCopName: null,
  pbrandName: null,
  shipName: null,
  saillings: null,
  billNo: null,
  departDateStart: null,
  departDateEnd: null,
  cutDateStart: null,
  cutDateEnd: null,
  cutoffDate: null,
  customsBroker: null,
  isBg: null,
  isFc: null,
  exitCustomsName: null,
  tradePatterns: null,
  customerPort: null,
  xxxl: null,
  cwUser: null,
  cwTel: null,
  dzUser: null,
  dzTel: null,
  vesselCertificate: null,
  piNos: null,
  transitIds: null,
  logisticsIds: null,
  entIds: null,
  oldBookingNo: null,
  isChange: null
}
const initExport = {
  oldBookingNo: '原订舱单号',
  bookingNo: '新订舱单号',
  warnNo: '出货预告号',
  contractNo: '合同号',
  enquiryNo: '询价单号',
  status: '订舱状态',
  logState: '物流状态',
  payStyle: '运费付款方式',
  priceTypeName: '价格条款',
  shipType: '发运方式',
  orgName: '销售部门',
  salesUserId: '业务员',
  prover: '单证员',
  custCode: '客户编码',
  custName: '客户名称',
  versionNum: '版本号',
  warnBc: '预告变更次数',
  boxQty: '总柜数',
  totalXqty: '总件数',
  totalAmt: '总金额',
  totalQty: '总数量',
  protFreeBox: '目的港免用箱',
  protFreeDate: '免堆期(天)',
  isExce: '异常票数',
  isAccident: '事故票数',
  dcNote: '订舱单备注',
  ygNote: '异常事故原因',
  consignorName: '发货人名称',
  consignorAddress: '发货人详细地址',
  consignorPhone: '发货人手机号',
  consignorFax: '发货人传真',
  consignorEMail: '发货人邮箱',
  consignorCompanyCode: '发货人企业编码',
  consignorCountryCode: '发货人国家代码',
  consignorAeoCode: '发货人AEO企业编码',
  consigneeName: '收货人名称',
  consigneeAddress: '收货人详细地址',
  consigneePhone: '收货人手机号',
  consigneeFax: '收货人传真',
  consigneeEMail: '收货人邮箱',
  consigneeCompanyCode: '收货人企业编码',
  consigneeCompanyCodeName: '收货人企业名称',
  consigneeCountryCode: '收货人国家代码',
  consigneeAeoCode: '收货人AEO企业编码',
  particularConsigneeName: '具体联系人名称',
  particularConsigneePhone: '具体联系人电话',
  particularConsigneeFax: '具体联系人传真',
  particularConsigneeEMail: '具体联系人邮箱',
  noticeManName: '通知人名称',
  noticeManAddress: '通知人详细地址',
  noticeManPhone: '通知人手机号',
  noticeManFax: '通知人传真',
  noticeManEMail: '通知人邮箱',
  noticeManCompanyCode: '通知人企业编码',
  noticeManCountryCode: '通知人国家代码',
  noticeManAeoCode: '通知人AEO企业编码',
  noticeMan: '其他通知人',
  chestbill: '箱单',
  bl: 'B/L',
  origin: '有无产地证',
  tddf: '电放',
  haveFreePart: '有无免费配件',
  tdfd: '提单分单',
  preShipDate: '预计货号日期',
  seaportInName: '到货港',
  seaportOutName: '出货港',
  toAreaName: '目的国家',
  finalGoul: '最终目的地',
  transitRelaName: '协议联系人',
  transitPhone: '协议联系电话',
  transitEmail: '协议联系邮箱',
  relaman: '指贷联系人',
  phone: '指贷联系电话',
  email: '指贷联系邮箱',
  towCopName: '船公司',
  pbrandName: '订舱品名',
  shipName: '船名',
  saillings: '船次',
  billNo: '提单号',
  departDate: '开船日期',
  cutDate: '截关日期',
  cutoffDate: '截单日期',
  customsBroker: '报关行',
  isBg: '是否报关',
  isFc: '是否放舱',
  exitCustomsName: '出境关别',
  tradePatterns: '贸易方式',
  customerPort: '报关口岸',
  xxxl: '箱型箱量',
  cwUser: '船务操作员',
  cwTel: '操作员电话',
  dzUser: '提单确认人',
  dzTel: '提单人电话',
  vesselCertificate: '船证明',
  piNos: 'PI',
  transitName: '协议货代',
  logistics: '指定货代公司',
  ent: '经营单位',
  isChange: '变更类型'
}
export default {
  name: 'ShipCabinOrderChangeManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    ShippingCompanySelect,
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    OperateUnitSelect,
    OperateUnitViewPopup: () => import('./../operate-unit/operateUnitViewPopup'),
    ShipCabinOrderStatusEnumSelect,
    ShipCabinOrderLogStatusEnumSelect,
    ShipCabinOrderPayStyleEnumSelect,
    ShipCabinOrderShipTypeEnumSelect,
    ShipCabinOrderViewPopup: () => import('./shipCabinOrderViewPopup.vue'),
    ShipCabinOrderEditPopup: () => import('./shipCabinOrderEditPopup.vue'),
    ShipCabinOrderDeletePopup: () => import('./shipCabinOrderDeletePopup.vue')
  },
  filters: {
    ShipCabinOrderStatusFilter: ShipCabinOrderStatusEnumUtil.toTitleFilter,
    ShipCabinOrderLogStatusFilter: ShipCabinOrderLogStatusEnumUtil.toTitleFilter,
    ShipCabinOrderPayStyleFilter: ShipCabinOrderPayStyleEnumUtil.toTitleFilter,
    ShipCabinOrderShipTypeFilter: ShipCabinOrderShipTypeEnumUtil.toTitleFilter,
    ChangeTypeEnumFilter: ChangeTypeEnumUtil.toTitleFilter,
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter
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
      showTransitViewPopup: false,
      transitId: null,
      showLogisticsViewPopup: false,
      logisticsId: null,
      showEntViewPopup: false,
      entid: null,
      more: false,
      eye: {
        oldBookingNo: true,
        bookingNo: true,
        warnNo: true,
        contractNo: true,
        isChange: true,
        enquiryNo: true,
        status: true,
        logState: true,
        payStyle: true,
        priceTypeName: true,
        shipType: true,
        orgName: true,
        salesUserId: true,
        prover: true,
        custCode: true,
        custName: true,
        versionNum: true,
        warnBc: true,
        entid: true,
        // oldBookingNo: true,
        // bookingNo: true,
        // warnNo: true,
        // contractNo: true,
        // enquiryNo: true,
        // status: true,
        // logState: true,
        // payStyle: true,
        // priceTypeName: true,
        // shipType: true,
        // orgName: true,
        // salesUserId: true,
        // prover: true,
        // custCode: true,
        // custName: true,
        // versionNum: true,
        // warnBc: true,
        // boxQty: true,
        // totalXqty: true,
        // totalAmt: true,
        // totalQty: true,
        // protFreeBox: true,
        // protFreeDate: true,
        // isExce: true,
        // isAccident: true,
        // dcNote: true,
        // ygNote: true,
        // consignorName: true,
        // consignorAddress: true,
        // consignorPhone: true,
        // consignorFax: true,
        // consignorEMail: true,
        // consignorCompanyCode: true,
        // consignorCountryCode: true,
        // consignorAeoCode: true,
        // consigneeName: true,
        // consigneeAddress: true,
        // consigneePhone: true,
        // consigneeFax: true,
        // consigneeEMail: true,
        // consigneeCompanyCode: true,
        // consigneeCompanyCodeName: true,
        // consigneeCountryCode: true,
        // consigneeAeoCode: true,
        // particularConsigneeName: true,
        // particularConsigneePhone: true,
        // particularConsigneeFax: true,
        // particularConsigneeEMail: true,
        // noticeManName: true,
        // noticeManAddress: true,
        // noticeManPhone: true,
        // noticeManFax: true,
        // noticeManEMail: true,
        // noticeManCompanyCode: true,
        // noticeManCountryCode: true,
        // noticeManAeoCode: true,
        // noticeMan: true,
        // chestbill: true,
        // bl: true,
        // origin: true,
        // tddf: true,
        // haveFreePart: true,
        // tdfd: true,
        // preShipDate: true,
        // seaportInName: true,
        // seaportOutName: true,
        // toAreaName: true,
        // finalGoul: true,
        // transitRelaName: true,
        // transitPhone: true,
        // transitEmail: true,
        // relaman: true,
        // phone: true,
        // email: true,
        // towCopName: true,
        // pbrandName: true,
        // shipName: true,
        // saillings: true,
        // billNo: true,
        // departDate: true,
        // cutDate: true,
        // cutoffDate: true,
        // customsBroker: true,
        // isBg: true,
        // isFc: true,
        // exitCustomsName: true,
        // tradePatterns: true,
        // customerPort: true,
        // xxxl: true,
        // cwUser: true,
        // cwTel: true,
        // dzUser: true,
        // dzTel: true,
        // vesselCertificate: true,
        // piNos: true,
        // transitName: true,
        // transitId: true,
        // logisticsId: true,
        // entid: true,
        // isChange: true
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
    getAccount().then(response => {
      response.data.data.roles && response.data.data.roles.forEach((item) => {
        if (item.roleCode === 'ROLE_SHIPING_USER') {
          this.keyword.cwUser = this.$store.getters.userCode
        }
      })
      this.search()
    }) 
  },
  methods: {
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = this.keyword
      const query = {
        type: 2
      }
      Object.keys(keyword).forEach(key => {
        if (Validate.isNotEmpty(keyword[key])) {
          query[key] = keyword[key]
        }
      })
      query.userType = this.$store.getters.userType
      const res = await shipCabinOrderServer.search({
        query,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
      this.count = res.pagination.count
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
        path: './ship-cabin-order-change/detail/' + row.id
      })
    },
    clickAddBtn() {
      // this.currentClickRow = {}
      // this.showEditPopup = true
      this.$router.push({
        path: './ship-cabin-order-change/detail/new'
      })
    },
    handleRowDb(val) {
      this.$router.push({
        path: './ship-cabin-order-change/detail/' + val.id
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
        this.dataExport = this.multipleSelection
      } else if (this.tableData.length > 0) {
        this.dataExport = this.tableData
      }
      this.dataExport.forEach(item => {
        item.entid = OperaUnitEnumUtil.toTitleFilter(item.entid)
        item.status = ShipCabinOrderStatusEnumUtil.toTitle(item.status)
        item.isChange = ChangeTypeEnumUtil.toTitleFilter(item.isChange)
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
    openTransitViewPopup(id) {
      this.transitId = id
      this.showTransitViewPopup = true
    },
    openLogisticsViewPopup(id) {
      this.logisticsId = id
      this.showLogisticsViewPopup = true
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
