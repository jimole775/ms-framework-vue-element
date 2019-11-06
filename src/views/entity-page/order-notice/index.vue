<template>
  <div class="container order_notice_edit">
    <el-form
      :inline="true"
      :model="keyword"
      class="demo-form-inline"
      @keyup.enter.native="commitSearch"
    >
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申请单号">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <OrderNoticeStatusEnumSelect v-model="keyword.status"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单人">
            <el-input v-model="keyword.createOrderMan" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="商业发票号">
            <el-input v-model="keyword.commercialInvoiceCode" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <el-input v-model="keyword.invoiceNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.contractCode" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="通知单号">
            <el-input v-model="keyword.noticeCode" size="mini"/>
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
        <el-table-column type="selection"/>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          min-width="180"
          sortable
          label="申请单号"
        />
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          min-width="120"
          sortable
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.stat | OrderNoticeStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.createOrderMan"
          show-overflow-tooltip
          prop="createOrderMan"
          min-width="150"
          sortable
          label="制单人"
        />
        <el-table-column
          v-if="eye.createOrderTime"
          show-overflow-tooltip
          prop="createOrderTime"
          min-width="150"
          sortable
          label="制单时间"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.createOrderTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.commercialInvoiceCode"
          show-overflow-tooltip
          prop="commercialInvoiceCode"
          min-width="150"
          sortable
          label="商业发票号"
        />
        <el-table-column
          show-overflow-tooltip
          prop="invoiceNo"
          min-width="180"
          sortable
          label="发票号"
        />
        <el-table-column
          v-if="eye.contractCode"
          show-overflow-tooltip
          prop="contractCode"
          min-width="150"
          sortable
          label="合同号"
        />
        <el-table-column
          v-if="eye.invoiceAmount"
          show-overflow-tooltip
          prop="invoiceAmount"
          min-width="130"
          sortable
          label="发票总金额"
        />
        <el-table-column
          v-if="eye.salesDepartment"
          show-overflow-tooltip
          prop="salesDepartment"
          min-width="130"
          sortable
          label="业务部门"/>
        <el-table-column
          v-if="eye.paymentMethod"
          show-overflow-tooltip
          prop="paymentMethod"
          min-width="110"
          sortable
          label="付款类型" />
        <!--<el-table-column-->
        <!--v-if="eye.ttAmount"-->
        <!--show-overflow-tooltip-->
        <!--prop="ttAmount"-->
        <!--sortable-->
        <!--label="TT金额" />-->
        <el-table-column
          v-if="eye.presentOrderCode"
          show-overflow-tooltip
          prop="presentOrderCode"
          min-width="150"
          sortable
          label="提单号"
        />
        <el-table-column
          v-if="eye.loadDate"
          show-overflow-tooltip
          prop="loadDate"
          min-width="150"
          sortable
          label="装船日期"
        >
          <template slot-scope="scope">{{ scope.row.loadDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <!--<el-table-column-->
        <!--v-if="eye.buyerCode"-->
        <!--show-overflow-tooltip-->
        <!--prop="buyerCode"-->
        <!--sortable-->
        <!--label="买方代码" />-->
        <!--<el-table-column-->
        <!--v-if="eye.insureInvoiceCode"-->
        <!--show-overflow-tooltip-->
        <!--prop="insureInvoiceCode"-->
        <!--sortable-->
        <!--label="投保发票号" />-->
        <!--<el-table-column-->
        <!--v-if="eye.insureAmount"-->
        <!--show-overflow-tooltip-->
        <!--prop="insureAmount"-->
        <!--sortable-->
        <!--label="投保金额" />-->
        <!--<el-table-column-->
        <!--v-if="eye.insureDate"-->
        <!--show-overflow-tooltip-->
        <!--prop="insureDate"-->
        <!--sortable-->
        <!--label="投保日期">-->
        <!--<template slot-scope="scope">-->
        <!--{{ scope.row.insureDate | parseTime('{y}-{m}-{d} {h}:{i}') }}-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          v-if="eye.noticeCode"
          show-overflow-tooltip
          prop="noticeCode"
          min-width="180"
          sortable
          label="通知单号"
        />
        <!--<el-table-column-->
        <!--v-if="eye.voicePlayAmount"-->
        <!--show-overflow-tooltip-->
        <!--prop="voicePlayAmount"-->
        <!--sortable-->
        <!--label="电放费" />-->
        <!--<el-table-column-->
        <!--v-if="eye.distributionAmount"-->
        <!--show-overflow-tooltip-->
        <!--prop="distributionAmount"-->
        <!--sortable-->
        <!--label="分配金额总额" />-->
        <el-table-column
          v-if="eye.salesman"
          show-overflow-tooltip
          prop="salesman"
          min-width="130"
          sortable
          label="业务员"
        />
        <el-table-column
          v-if="eye.predictArriveDate"
          show-overflow-tooltip
          prop="predictArriveDate"
          min-width="150"
          sortable
          label="到港日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.predictArriveDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <!--<el-table-column-->
        <!--v-if="eye.freeStorageTime"-->
        <!--show-overflow-tooltip-->
        <!--prop="freeStorageTime"-->
        <!--sortable-->
        <!--label="免堆期(天)" />-->
        <!--<el-table-column-->
        <!--v-if="eye.remark"-->
        <!--show-overflow-tooltip-->
        <!--prop="remark"-->
        <!--sortable-->
        <!--label="备注" />-->
        <el-table-column
          v-if="eye.noticeType"
          show-overflow-tooltip
          prop="noticeType"
          min-width="130"
          sortable
          label="放单类型"
        >
          <template slot-scope="scope">{{ scope.row.noticeType | OrderNoticeNoticeTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.applyThoseResponsible"
          show-overflow-tooltip
          prop="applyThoseResponsible"
          min-width="130"
          sortable
          label="负责人"
        />
        <!--<el-table-column-->
        <!--v-if="eye.applyPhone"-->
        <!--show-overflow-tooltip-->
        <!--prop="applyPhone"-->
        <!--sortable-->
        <!--label="申请人手机" />-->
        <!--<el-table-column-->
        <!--v-if="eye.regionalManager"-->
        <!--show-overflow-tooltip-->
        <!--prop="regionalManager"-->
        <!--sortable-->
        <!--label="区域经理" />-->
        <!--<el-table-column-->
        <!--v-if="eye.consigneeInfo"-->
        <!--show-overflow-tooltip-->
        <!--prop="consigneeInfo"-->
        <!--sortable-->
        <!--label="收货人信息" />-->
        <!--<el-table-column-->
        <!--v-if="eye.recipient"-->
        <!--show-overflow-tooltip-->
        <!--prop="recipient"-->
        <!--sortable-->
        <!--label="收件人" />-->
        <!--<el-table-column-->
        <!--v-if="eye.recipientAddress"-->
        <!--show-overflow-tooltip-->
        <!--prop="recipientAddress"-->
        <!--sortable-->
        <!--label="收货人地址" />-->
        <!--<el-table-column-->
        <!--v-if="eye.postcode"-->
        <!--show-overflow-tooltip-->
        <!--prop="postcode"-->
        <!--sortable-->
        <!--label="邮编" />-->
        <!--<el-table-column-->
        <!--v-if="eye.recipientContact"-->
        <!--show-overflow-tooltip-->
        <!--prop="recipientContact"-->
        <!--sortable-->
        <!--label="联系人" />-->
        <!--<el-table-column-->
        <!--v-if="eye.recipientPhone"-->
        <!--show-overflow-tooltip-->
        <!--prop="recipientPhone"-->
        <!--sortable-->
        <!--label="电话号码" />-->
        <!--<el-table-column-->
        <!--v-if="eye.recipientCountry"-->
        <!--show-overflow-tooltip-->
        <!--prop="recipientCountry"-->
        <!--sortable-->
        <!--label="国家" />-->
        <!--<el-table-column-->
        <!--v-if="eye.recipientCity"-->
        <!--show-overflow-tooltip-->
        <!--prop="recipientCity"-->
        <!--sortable-->
        <!--label="城市" />-->
        <!--<el-table-column-->
        <!--v-if="eye.courierCompanyName"-->
        <!--show-overflow-tooltip-->
        <!--prop="courierCompanyName"-->
        <!--sortable-->
        <!--label="快递公司名称" />-->
        <!--<el-table-column-->
        <!--v-if="eye.courierCode"-->
        <!--show-overflow-tooltip-->
        <!--prop="courierCode"-->
        <!--sortable-->
        <!--label="寄单号" />-->
        <el-table-column
          v-if="eye.invoiceNo"
          show-overflow-tooltip
          prop="invoiceNo"
          min-width="180"
          sortable
          label="发票号"
        />
        <el-table-column
          v-if="eye.customerId"
          show-overflow-tooltip
          prop="customerId"
          min-width="130"
          sortable
          label="客户"
        >
          <template slot-scope="scope" >
            <!-- <CustomerSelect v-show="false" v-model="scope.row.customerId" disabled @changeData="cacheCustoms"/> -->
            <span>{{ customerStorage[scope.row.customerId] || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.operateUnitId"
          show-overflow-tooltip
          prop="operateUnitId"
          min-width="130"
          sortable
          label="经营单位"
        >
          <template slot-scope="scope" >
            {{ scope.row.operateUnitId | OperaUnitFilter }}
          </template>
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
    <el-dialog :visible="showEye" width="360px" title="过滤" top="10vh" @close="showEye = false">
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.code">申请单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createOrderMan">制单人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createOrderTime">制单时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.commercialInvoiceCode">商业发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractCode">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceAmount">发票总金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.salesDepartment">业务部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.paymentMethod">付款类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.ttAmount">TT金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.presentOrderCode">提单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.loadDate">装船日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.buyerCode">买方代码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.insureInvoiceCode">投保发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.insureAmount">投保金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.insureDate">投保日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.noticeCode">通知单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.voicePlayAmount">电放费</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.distributionAmount">分配金额总额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.salesman">业务员</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.predictArriveDate">到港日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.freeStorageTime">免堆期(天)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.noticeType">放单类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.applyThoseResponsible">负责人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.applyPhone">申请人手机</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.regionalManager">区域经理</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeInfo">收货人信息</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.recipient">收件人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.recipientAddress">收货人地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.postcode">邮编</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.recipientContact">联系人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.recipientPhone">电话号码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.recipientCountry">国家</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.recipientCity">城市</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.courierCompanyName">快递公司名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.courierCode">寄单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customerId">客户</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.operateUnitId">经营单位</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'OrderNoticeViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'OrderNoticeEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'OrderNoticeDeletePopup'"
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
      v-if="showCommercialInvoiceViewPopup"
      :is="'CommercialInvoiceViewPopup'"
      :id="commercialInvoiceId"
      @close="showCommercialInvoiceViewPopup = false"
    />
    <component
      v-if="showCustomerViewPopup"
      :is="'CustomerViewPopup'"
      :id="customerId"
      @close="showCustomerViewPopup = false"
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
import CommercialInvoiceSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceSelect'
import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import OrderNoticeStatusEnumSelect from './../../../components/entity/order-notice/OrderNoticeStatusEnumSelect'
import OrderNoticeStatusEnumUtil from './../../../components/enum/order-notice/OrderNoticeStatusEnumUtil'
import OrderNoticeNoticeTypeEnumSelect from './../../../components/entity/order-notice/OrderNoticeNoticeTypeEnumSelect'
import OrderNoticeNoticeTypeEnumUtil from './../../../components/enum/order-notice/OrderNoticeNoticeTypeEnumUtil'
import orderNoticeServer from './../../../api/orderNoticeServer'
import departmentServer from './../../../api/departmentServer'
import customerServer from './../../../api/customerServer'
const initSearchParams = {
  code: null,
  status: null,
  createOrderMan: null,
  createOrderTimeStart: null,
  createOrderTimeEnd: null,
  commercialInvoiceCode: null,
  contractCode: null,
  invoiceAmount: null,
  salesDepartment: null,
  paymentMethod: null,
  ttAmount: null,
  presentOrderCode: null,
  loadDateStart: null,
  loadDateEnd: null,
  buyerCode: null,
  insureInvoiceCode: null,
  insureAmount: null,
  insureDateStart: null,
  insureDateEnd: null,
  noticeCode: null,
  voicePlayAmount: null,
  distributionAmount: null,
  salesman: null,
  predictArriveDateStart: null,
  predictArriveDateEnd: null,
  freeStorageTime: null,
  remark: null,
  isDelete: null,
  noticeType: null,
  applyThoseResponsible: null,
  applyPhone: null,
  regionalManager: null,
  consigneeInfo: null,
  recipient: null,
  recipientAddress: null,
  postcode: null,
  recipientContact: null,
  recipientPhone: null,
  recipientCountry: null,
  recipientCity: null,
  courierCompanyName: null,
  courierCode: null,
  commercialInvoiceIds: [],
  customerIds: [],
  operateUnitIds: [],
  invoiceNo: null
}
const initExport = {
  code: '申请单号',
  status: '状态',
  createOrderMan: '制单人',
  createOrderTime: '制单时间',
  commercialInvoiceCode: '商业发票号',
  contractCode: '合同号',
  invoiceAmount: '发票总金额',
  salesDepartment: '业务部门',
  paymentMethod: '付款类型',
  ttAmount: 'TT金额',
  presentOrderCode: '提单号',
  loadDate: '装船日期',
  buyerCode: '买方代码',
  insureInvoiceCode: '投保发票号',
  insureAmount: '投保金额',
  insureDate: '投保日期',
  noticeCode: '通知单号',
  voicePlayAmount: '电放费',
  distributionAmount: '分配金额总额',
  salesman: '业务员',
  predictArriveDate: '到港日期',
  freeStorageTime: '免堆期(天)',
  remark: '备注',
  isDelete: '是否删除',
  noticeType: '放单类型',
  applyThoseResponsible: '负责人',
  applyPhone: '申请人手机',
  regionalManager: '区域经理',
  consigneeInfo: '收货人信息',
  recipient: '收件人',
  recipientAddress: '收货人地址',
  postcode: '邮编',
  recipientContact: '联系人',
  recipientPhone: '电话号码',
  recipientCountry: '国家',
  recipientCity: '城市',
  courierCompanyName: '快递公司名称',
  courierCode: '寄单号',
  commercialInvoice: '发票号',
  customerId: '客户',
  operateUnit: '经营单位'
}
export default {
  name: 'OrderNoticeManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CommercialInvoiceSelect,
    CommercialInvoiceViewPopup: () =>
      import('./../commercial-invoice/commercialInvoiceViewPopup'),
    CustomerSelect,
    CustomerViewPopup: () => import('./../customer/customerViewPopup'),
    OperateUnitSelect,
    OperateUnitViewPopup: () =>
      import('./../operate-unit/operateUnitViewPopup'),
    OrderNoticeStatusEnumSelect,
    OrderNoticeNoticeTypeEnumSelect,
    OrderNoticeViewPopup: () => import('./orderNoticeViewPopup.vue'),
    OrderNoticeEditPopup: () => import('./orderNoticeEditPopup.vue'),
    OrderNoticeDeletePopup: () => import('./orderNoticeDeletePopup.vue'),
    DepartmentSelect
  },
  filters: {
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
    OrderNoticeStatusFilter: OrderNoticeStatusEnumUtil.toTitleFilter,
    OrderNoticeNoticeTypeFilter: OrderNoticeNoticeTypeEnumUtil.toTitleFilter
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
      customerStorage: {},
      showCommercialInvoiceViewPopup: false,
      commercialInvoiceId: null,
      showCustomerViewPopup: false,
      customerId: null,
      showOperateUnitViewPopup: false,
      operateUnitId: null,
      more: false,
      eye: {
        code: true,
        status: true,
        createOrderMan: true,
        createOrderTime: true,
        commercialInvoiceCode: true,
        contractCode: true,
        invoiceAmount: true,
        salesDepartment: true,
        paymentMethod: true,
        ttAmount: true,
        presentOrderCode: true,
        loadDate: true,
        buyerCode: true,
        insureInvoiceCode: true,
        insureAmount: true,
        insureDate: true,
        noticeCode: true,
        voicePlayAmount: true,
        distributionAmount: true,
        salesman: true,
        predictArriveDate: true,
        freeStorageTime: true,
        remark: true,
        isDelete: true,
        noticeType: true,
        applyThoseResponsible: true,
        applyPhone: true,
        regionalManager: true,
        consigneeInfo: true,
        recipient: true,
        recipientAddress: true,
        postcode: true,
        recipientContact: true,
        recipientPhone: true,
        recipientCountry: true,
        recipientCity: true,
        courierCompanyName: true,
        courierCode: true,
        customerId: true,
        commercialInvoiceId: true,
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
    async fetchCustomList(id) {
      if (id !== null && id !== '') {
        const data = {
          keyword: {
            id
          }
        }
        const { data: [info] } = await customerServer.search(data)
        if (info && !this.customerStorage[info.cust_id] && info.cust_name) {
          this.customerStorage[info.cust_id] = info.cust_name
        }
      }
    },
    async test(value) {
      const data = {
        keyword: {
          orgIdList: value
        },
        page: 0,
        size: 1000
      }
      const res = await departmentServer.search(data)
      // this.list = res.rows
      // debugger
      this.tableData.forEach((tableItem) => {
        res.rows.forEach((rowItem) => {
          if (tableItem.orgId === rowItem.id) {
            tableItem.salesDepartment = rowItem.name
          }
        })
      })
      // console.log(res.rows)
    },
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = this.keyword
      const query = {}
      Object.keys(keyword).forEach(key => {
        if (Validate.isNotEmpty(keyword[key])) {
          query[key] = keyword[key]
        }
      })
      const res = await orderNoticeServer.search({
        query,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
      this.count = res.pagination.count
      this.$nextTick(() => {
        this.setPageSize()
      })

      const orgIds = []
      this.tableData.forEach((row) => {
        orgIds.push(row.orgId)
        if (row.customerId) {
          this.fetchCustomList(row.customerId)
        }
      })
      if (orgIds.length) {
        this.test(orgIds)
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
      // this.currentClickRow = {}
      // this.showEditPopup = true
      this.$router.push({
        path: './order-notice/edit/new'
      })
      this.reload()
    },
    handleRowDb(val) {
      this.$router.push({
        path: './order-notice/edit/' + val.id
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
      this.dataExport.forEach((item) => {
        item.noticeType = OrderNoticeNoticeTypeEnumUtil.toTitleFilter(item.noticeType)
        item.status = OrderNoticeStatusEnumUtil.toTitle(item.status)
        item.customerId = this.customerStorage[item.customerId]
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
    openCommercialInvoiceViewPopup(id) {
      this.commercialInvoiceId = id
      this.showCommercialInvoiceViewPopup = true
    },
    openCustomerViewPopup(id) {
      this.customerId = id
      this.showCustomerViewPopup = true
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

<style rel="stylesheet/scss" lang="scss">
  .order_notice_edit {
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
    .special_department input.el-input__inner{
      background: #fff;
      border: 0;
    }

  }
</style>
