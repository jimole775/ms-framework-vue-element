<template>
  <div class="max-w back">
    <div class="container m-t-not">
      <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
        <el-form
          :model="formData"
          :ref="'formData'"
          :rules="rules"
          class="demo-form-inline"
          label-position="right"
          label-width="120px"
        >
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="formData.regId" label="登记流水号" prop="code">
                <el-input v-model="formData.code" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="formData.regId" label="创建人" prop="createUser">
                <el-input v-model="formData.createUser" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="formData.regId" label="创建时间" prop="createDate">
                <el-date-picker
                  v-model="formData.createDate"
                  :disabled="true"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="formData.regId" label="状态" prop="stat">
                <ExpenseRecordStatusEnumSelect v-model="formData.stat" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同号" prop="piNo">
                <PiNoSelect v-if="formData.stat === '1'" v-model="formData.piNo" :disabled="formData.stat !== '1'" @changeData="changePiNo"/>
                <el-input v-else-if="formData.stat !== '1'" v-model="formData.piNo" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出货预告号" prop="warnNo">
                <el-input v-model="formData.warnNo" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="运费付款方式" required prop="payStyle">
                <ShipCabinOrderPayStyleEnumSelect v-model="formData.payStyle" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发票快递单号" prop="courierNumber">
                <el-input v-model="formData.courierNumber" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="部门编码" prop="orgCode">
                <el-input v-model="formData.orgCode" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="部门名称" prop="orgName">
                <el-input v-model="formData.orgName" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户编码" prop="custCode">
                <el-input v-model="formData.custCode" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户名称" prop="custName">
                <el-input v-model="formData.custName" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item v-show="formData.regId" label="发票号" prop="invoiceNos">
                <el-input v-model="formData.invoiceNos" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="通知联系方式" prop="invoiceContact">
                <el-input
                  v-model="formData.invoiceContact"
                  placeholder="微信号、短信手机号、email"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="指代是否支付" prop="isLogisticsPayed ">
                <el-switch v-model="formData.isLogisticsPayed" @change="isAppointedForwardPay(formData.isLogisticsPayed)"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="formData.regId" label="合计金额" prop="totalAmt">
                <el-input v-model="formData.totalAmt" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="formData.regId" label="指代金额" prop="assignAmt">
                <el-input v-model="formData.assignAmt" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="formData.regId" label="协代金额" prop="dealAmt">
                <el-input v-model="formData.dealAmt" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="formData.regId" label="经营单位" prop="operateUnitId">
                <OperateUnitSelect v-model="formData.operateUnitId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :xs="24">
              <FileUpload
                :id="formData.id"
                :title="'附件'"
                :tab="1"
                :btn-text="'添加附件'"
                :bill-name="'费用登记流水号'"
              />
            </el-col>
          </el-row>
        </el-form>
        <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
      </el-tabs>
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane label="本次登记">
          <el-row>
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="clickAddCostResignTicket"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDelCostResignTicket"
            />
            <el-button
              v-if="costResignTickets.length > 0"
              @click="gotoFreightStandard">
              费用确认
            </el-button>
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${costResignSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            v-loading="loading"
            :data="costResignTickets"
            class="m-t-12"
            border
            @selection-change="selectCostResignTicket"
          >
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="boxName" width="80" label="柜型">
              <template slot-scope="scope">
                <BoxTypeChoose
                  v-model="scope.row.boxName"
                  :warnid="warnId"
                  :index="scope.$index"
                  @changeData="changeBoxType"
                />
              </template>
            </el-table-column>
            <el-table-column prop="payObjectAnother" width="160" label="支付对象">
              <template slot-scope="scope">
                <!-- <el-input v-model="scope.row.payObjectAnother" size="mini"/> -->
                <!-- <PayAnotherObjectSelect
                  v-model="scope.row.payObjectAnother"
                  :index="scope.$index"
                /> -->
                <el-select
                  :loading="loading"
                  :clearable="true"
                  v-model="scope.row.payObjectAnother"
                  size="mini"
                  filterable
                  class="max-w"
                >
                  <el-option
                    v-for="item in payObjectAnotherList"
                    :key="item.transitId"
                    :label="item.supplierName"
                    :value="item.transitCode" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="payObject" width="100" label="货代组织">
              <template slot-scope="scope">
                <PayObjectSelect
                  v-model="scope.row.payObject"
                  :index="scope.$index"
                  @changeData="changeToCompany"
                />
              </template>
            </el-table-column>
            <el-table-column prop="transitName" width="200" label="货代公司">
              <template slot-scope="scope">
                <el-input v-model="scope.row.transitName" :disabled="scope.row.payObject !== 3" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="currencyCode" width="90" label="币种">
              <template slot-scope="scope">
                <CurrencySelect :disabled="false" v-model="scope.row.currencyCode"/>
              </template>
            </el-table-column>
            <el-table-column prop="orderFeeCode" width="100" label="费用编码">
              <template slot-scope="scope">
                <ExpenseCostProjectSelect
                  v-model="scope.row.orderFeeCode"
                  :index="scope.$index"
                  @changeData="changeToOrderFeeCode"
                />
              </template>
            </el-table-column>
            <el-table-column prop="orderFeeName" width="100" label="费用名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.orderFeeName" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="boxQty" width="140" label="柜数">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.boxQty"
                  :precision="0"
                  :step="1"
                  :min="0"
                  size="mini"
                  @change="changBoxTy(scope.$index)"
                />
              </template>
            </el-table-column>
            <el-table-column prop="boxPrice" width="140" label="单柜费用">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.boxPrice"
                  :precision="2"
                  :step="1"
                  :min="0"
                  size="mini"
                  @change="changBoxPrice(scope.$index)"
                />
              </template>
            </el-table-column>
            <el-table-column prop="amt" width="140" label="总费用">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.amt"
                  :precision="2"
                  :step="1"
                  :disabled="true"
                  :min="0"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="tax" width="140" label="其中税金">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.tax"
                  :precision="2"
                  :step="1"
                  :min="0"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="amtRmb" width="140" label="总费用(RMB)">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.amtRmb"
                  :precision="2"
                  :step="1"
                  :min="0"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column v-if="isJudge === false && formData.stat !== '1'" prop="isDocumentsCost" min-width="100" label="是否单证费">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isDocumentsCost"/>
              </template>
            </el-table-column>
            <el-table-column v-if="isJudge === false && formData.stat !== '1'" prop="isEwfee" min-width="100" label="是否额外费用">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isEwfee"/>
              </template>
            </el-table-column>
            <el-table-column v-if="isJudge === false && formData.stat !== '1'" prop="isPay" min-width="150" label="额外费用是否审批">
              <template slot-scope="scope">
                <el-switch :disabled="true" v-model="scope.row.isPay"/>
              </template>
            </el-table-column>
            <el-table-column v-if="isJudge === false && formData.stat !== '1'" prop="costConfirmDate" sortable width="200" label="费用确认时间">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.costConfirmDate"
                  :disabled="true"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期时间"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="invoiceNo" width="240" label="发票号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.invoiceNo" :disabled="isWarnEdit === false" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="invoiceDate" sortable width="200" label="发票日期">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.invoiceDate"
                  :disabled="isWarnEdit === false"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期时间"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="reason" width="200" label="额外费用原因">
              <template slot-scope="scope">
                <el-input v-model="scope.row.reason" size="mini"/>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已登记">
          <el-table :data="hadCostResignTickets" :loading="loading" class="m-t-12" border>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="boxName" width="100" label="柜型" />
            <el-table-column prop="payObjectAnother" width="100" label="支付对象"/>
            <el-table-column prop="payObject" width="100" label="货代组织">
              <template slot-scope="scope">
                <PayObjectSelect
                  v-model="scope.row.payObject"
                  :index="scope.$index"
                  @changeData="changeToCompany"
                />
              </template>
            </el-table-column>
            <el-table-column prop="transitName" width="200" label="货代公司" />
            <el-table-column prop="invoiceNo" width="240" label="发票号" />
            <el-table-column prop="invoiceDate" sortable width="200" label="发票日期" />
            <el-table-column prop="currencyCode" width="140" label="币种">
              <template slot-scope="scope">
                <CurrencySelect :disabled="false" v-model="scope.row.currencyCode"/>
              </template>
            </el-table-column>
            <el-table-column prop="orderFeeCode" width="140" label="费用编码" />
            <el-table-column prop="orderFeeName" width="140" label="费用名称" />
            <el-table-column prop="boxQty" width="140" label="柜数" />
            <el-table-column prop="boxPrice" width="140" label="单柜费用" />
            <el-table-column prop="amt" width="140" label="总费用" />
            <el-table-column prop="tax" width="140" label="其中税金" />
            <el-table-column prop="amtRmb" width="140" label="总费用(RMB)" />
            <el-table-column v-if="isJudge === false && formData.stat !== '1'" prop="isDocumentsCost" min-width="100" label="是否单证费">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isDocumentsCost" :disabled="true"/>
              </template>
            </el-table-column>
            <el-table-column v-if="isJudge === false && formData.stat !== '1'" prop="isEwfee" min-width="100" label="是否额外费用">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isEwfee" :disabled="true"/>
              </template>
            </el-table-column>
            <el-table-column v-if="isJudge === false && formData.stat !== '1'" prop="isPay" min-width="150" label="额外费用是否审批">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isPay" :disabled="true"/>
              </template>
            </el-table-column>
            <el-table-column v-if="isJudge === false && formData.stat !== '1'" prop="costConfirmDate" sortable width="200" label="费用确认时间">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.costConfirmDate"
                  :disabled="true"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期时间"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="reason" width="200" label="额外费用原因"/>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
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
import expenseRecordServer from './../../../api/expenseRecordServer'
import DepartmentSelect from './../department/DepartmentSelect'
import CustomerSelect from './../customer/CustomerSelect'
import PiNoSelect from './PiNoSelect'
import validate from './../../../utils/validate'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import CurrencySelect from './../currency/CurrencySelect'
import PayObjectSelect from './PayObjectSelect'
import ExpenseRecordStatusEnumSelect from './../../../components/entity/expense-record/ExpenseRecordStatusEnumSelect'
import ExpenseRecordSPaymentMethodEnumSelect from './../../../components/entity/expense-record/ExpenseRecordSPaymentMethodEnumSelect'
import ShipCabinOrderPayStyleEnumSelect from './../../../components/entity/ship-cabin-order/ShipCabinOrderPayStyleEnumSelect'
import BoxTypeChoose from './../../../components/entity/expense-record/BoxTypeChoose'
import ExpenseCostProjectSelect from './../../../components/entity/expense-record/ExpenseCostProjectSelect'
import FreightAdvanceStatusEnumUtil from './../../enum/expense-record/PayObjectSelectUtil'
import { dateToDateStr } from '@/utils/datetime'
const emptyFormData = {
  id: null,
  code: null,
  createUser: null,
  createDate: null,
  stat: '1',
  warnNo: null,
  payStyle: null,
  piNo: null,
  courierNumber: null,
  remark: null,
  totalAmt: null,
  assignAmt: null,
  dealAmt: null,
  invoiceNos: null,
  isLogisticsPayed: false,
  invoiceContact: null,
  orgCode: null,
  orgName: null,
  custName: null,
  custCode: null,
  operateUnitId: null,
  areaName: null
}
const costResignEmptyData = {
  boxName: null,
  boxType: null,
  payObjectAnother: null,
  payObject: null,
  transitName: null,
  invoiceNo: null,
  invoiceDate: null,
  currencyCode: null,
  orderFeeCode: null,
  orderFeeName: null,
  boxQty: 0,
  boxPrice: 0,
  amt: 0,
  tax: 0,
  amtRmb: 0,
  isDocumentsCost: false,
  isEwfee: false,
  isPay: false,
  reason: null
}
const expenseRecordRules = {
  orderFeeCode: [
    { message: '费用编码 不能为空', validate: validate.isNotEmpty },
  ],
  orderFeeName: [
    { message: '费用编码 不能为空', validate: validate.isNotEmpty },
  ],
  currencyCode: [
    { message: '币种 不能为空', validate: validate.isNotEmpty },
  ],
}
const initExport1 = [
  '柜型', '支付对象', '货代组织', '货代公司', '币种', '费用编码',
  '费用名称', '柜数', '单柜费用', '总费用', '其中税金', '总费用(RMB)', '发票号',
  '发票日期', '额外费用原因'
]
const filterVal1 = [
  'boxName', 'payObjectAnother', 'payObject', 'transitName',
  'currencyCode', 'orderFeeCode', 'orderFeeName', 'boxQty', 'boxPrice',
  'amt', 'tax', 'amtRmb', 'invoiceNo', 'invoiceDate', 'reason'
]
const initExport2 = [
  '柜型', '支付对象', '货代组织', '货代公司', '发票号', '发票日期', '货代公司', '币种', '费用编码',
  '费用名称', '柜数', '单柜费用', '总费用', '其中税金', '总费用(RMB)', '额外费用原因'
]
const filterVal2 = [
  'boxName', 'payObjectAnother', 'payObject', 'transitName', 'invoiceNo', 'invoiceDate', 'transitName',
  'currencyCode', 'orderFeeCode', 'orderFeeName', 'boxQty', 'boxPrice',
  'amt', 'tax', 'amtRmb', 'reason'
]
let initFormData = {
  ...emptyFormData
}
 
export default {
  name: 'ExpenseRecordEdit',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    DepartmentSelect,
    CustomerSelect,
    OperateUnitSelect,
    ExpenseRecordStatusEnumSelect,
    ExpenseRecordSPaymentMethodEnumSelect,
    PiNoSelect,
    ShipCabinOrderPayStyleEnumSelect,
    CurrencySelect,
    PayObjectSelect,
    BoxTypeChoose,
    ExpenseCostProjectSelect
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        ...initFormData
      },
      isFp: false,
      isWarnEdit: false,
      isWrong: false,
      isJudge: false,
      isFinishTime: false,
      warnId: null,
      payObjectAnotherList: [],
      hadCostResignTickets: [],
      oldLines: [],
      costResignSelection: [],
      costResignTickets: [],
      rules: {
        code: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        createUser: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        createDate: [],
        stat: [],
        warnNo: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        payStyle: [
          // { required: true, message: '不能为空', trigger: 'blur' },
        ],
        piNo: [
          { required: true, message: '不能为空', trigger: 'change' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        remark: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        totalAmt: [],
        invoiceNos: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        orgCode: [],
        custName: [],
        operateUnitId: [],
      },
      type: 1,
      tableData1: [],
      tableData2: [],
      showExportPopup: false,
      tHeader: [],
      filterVal: []
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
    // id(val) {
    //   if (val !== this.initFormData.id) {
    //     this.getData()
    //   }
    // },
    loading(val) {
      this.$emit('loadingChange', val)
    }
  },
  created() {
    if (this.id) {
      this.formData.id = this.id
      this.getData()
    } else {
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }
    }
  },
  methods: {
    tabClick(info) {
      if (info.label === '本次登记') {
        this.type = 1
      }
      if (info.label === '已登记') {
        this.type = 2
      }
    },
    async transformDefaultLines() {
      const { data: { data = {}}} = await expenseRecordServer.findCompany(this.warnId, 1)
      const { supplierName = '' } = data
      this.costResignTickets = []
      const orderFeeCodes = ['TCF', 'BGF', 'TXM', 'CZF', 'DC', 'THC', 'WJF', 'EDI', 'ZXD', 'XDF', 'DJF', 'DC', 'CZF']
      const orderFeeNames = ['拖车费', '报关费', '条形码', '操作费', '订舱费', '码头操作费', '文件费', 'EDI', '电子装箱单', '箱单费', '吊机费', '堆存费', '操作费']
      for (let i = 0; i < 13; i++) {
        const costModel = { ...costResignEmptyData }
        costModel.orderFeeCode = orderFeeCodes[i]
        costModel.orderFeeName = orderFeeNames[i]
        costModel.payObjectAnother = supplierName
        costModel.currencyCode = 'CNY'
        costModel.boxName = '40HQ'
        this.costResignTickets.push(costModel)
      }
    },
    async gotoFreightStandard() {
      let transitName = ''
      this.costResignTickets.forEach((ticketItem) => {
        if (ticketItem.boxName) {
          transitName = ticketItem.transitName
        }
      })
      if (transitName) {
        const res = await expenseRecordServer.getFreightId(transitName)
        this.$router.push({
          path: '/CW-manage/fee-manage/freight-standard/edit-sublist/' + res.stdId
        })
      } else {
        this.$message({
          message: '至少选择一个柜型',
          type: 'warning'
        })
      }    
    },
    async isAppointedForwardPay(val) { // 指代是否支付
      if (val === true) {
        const res = await expenseRecordServer.appontedIsPay(this.formData.id)
        if (Number.parseInt(res.code) === 200) {
          this.$message({
            message: '指代支付已推送',
            type: 'success'
          })
        }
      }
    },
    close() {
      this.$emit('close')
    },
    changBoxTy(val) {
      if (val !== null) {
        this.costResignTickets[val].amt =
          this.costResignTickets[val].boxQty *
          this.costResignTickets[val].boxPrice
        this.costResignTickets[val].amtRmb =
          this.costResignTickets[val].boxQty *
          this.costResignTickets[val].boxPrice
      }
    },
    changBoxPrice(val) {
      if (val !== null) {
        this.costResignTickets[val].amtRmb =
          this.costResignTickets[val].boxQty *
          this.costResignTickets[val].boxPrice
        this.costResignTickets[val].amt =
          this.costResignTickets[val].boxQty *
          this.costResignTickets[val].boxPrice
      }
    },
    changeToOrderFeeCode(res) {
      const costName = res.name
      const rows = res.$index
      this.costResignTickets[rows].orderFeeName = costName
      this.costResignTickets[rows].isEwfee = res.isExtra
    },
    changeBoxType(type, index) {
      if (type !== null && type !== '') {
        this.costResignTickets[index].boxType = type
      }
    },
    async getData() {
      this.loading = true
      const res = await expenseRecordServer.get(this.formData.id)
      initFormData = res
      this.formData = {
        ...res
      }
      this.warnId = res.warnId
      this.addHadRecordInfos(this.warnId)
      this.fetchObjectAnotherList(this.warnId)
      this.formData.id = res.regId
      this.oldLines = JSON.parse(JSON.stringify(res.lines))
      this.costResignTickets = [...res.lines]
      this.loading = false      
      if (this.costResignTickets.length === 0) {
        this.$nextTick(() => {
          this.transformDefaultLines()
        })
      }
    },
    /** 【货代组织】对应的【货代公司】拼装成一个list，当作【支付对象】的下拉选项*/
    fetchObjectAnotherList(warnId) {
      const list = [
        {
          id: 1,
          title: FreightAdvanceStatusEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: FreightAdvanceStatusEnumUtil.toTitle(2)
        },
        // {
        //   id: 3,
        //   title: FreightAdvanceStatusEnumUtil.toTitle(3)
        // },
      ]
      this.payObjectAnotherList = [] 
      list.forEach(async(item) => {
        const payStyle = item.id
        // if (payStyle === 3) { 
          // this.costResignTickets[rows].transitName = null
          // this.costResignTickets[rows].transitId = null
          // this.costResignTickets[rows].transitCode = null
        // } else {
        const resData = await expenseRecordServer.findCompany(
          warnId,
          payStyle
        )
        if (Number.parseInt(resData.data.code) === 200) {
          if (resData.data.data) {
            this.payObjectAnotherList.push(resData.data.data)
          }
        }
        // }
      })
    },
    async changeToCompany(res) {
      const payStyle = res.id
      const rows = res.$index
      if (payStyle === 3) {
        this.costResignTickets[rows].transitName = null
        this.costResignTickets[rows].transitId = null
        this.costResignTickets[rows].transitCode = null
      } else {
        const resData = await expenseRecordServer.findCompany(
          this.warnId,
          payStyle
        )
        if (Number.parseInt(resData.data.code) === 200) {
          if (resData.data.data) {
            this.costResignTickets[rows].transitName = resData.data.data.supplierName
            this.costResignTickets[rows].transitId = resData.data.data.transitId
            this.costResignTickets[rows].transitCode = resData.data.data.transitCode
          } else {
            this.costResignTickets[rows].transitName = null
            this.costResignTickets[rows].transitId = null
            this.costResignTickets[rows].transitCode = null
          } 
        } 
      }
    },
    changePiNo(res) {
      if (res === undefined) {
        return
      }
      this.formData.warnNo = res.warnno
      this.formData.orgName = res.orgname
      this.formData.orgCode = res.orgcode
      if (res.orgid !== null) {
        this.formData.orgId = parseInt(res.orgid)
      }
      this.formData.custName = res.custname
      this.formData.custCode = res.custcode
      if (res.custid !== null) {
        this.formData.custId = parseInt(res.custid)
      }
      this.formData.piNo = res.pino
      this.formData.payStyle = res.paystyle
      this.warnId = res.warnid
      this.formData.areaName = res.zonename
      this.addHadRecordInfos(parseInt(this.warnId))
      // this.addHadRecordInfos(1)
    },
    processStep1() {
      this.isJudge = true 
      this.isFinishTime = false
    },
    processStep2() {
      this.isJudge = false
      this.isFinishTime = true
    },
    processStep3() {
      this.isJudge = false
      this.isFinishTime = false
    },
    processStep4() {
      this.isJudge = true
      this.isFp = true
      this.isWarnEdit = true
      this.isFinishTime = false
    },
    processStep5() {
      this.isJudge = false
      this.isFp = false // 流程到达该节点时对行内发票号进行非空校验
      this.isWarnEdit = true
      this.isFinishTime = false
    },
    processStep6() {
      this.isFp = false
      this.isJudge = false
      this.isWarnEdit = true
      this.isFinishTime = false
    },
    shareProcessInfo({ info }) {
      this.processInfo = info
      if (
        this.processInfo &&
        this.processInfo.nodeInfo &&
        this.processInfo.nodeInfo.length
      ) {
        this.processInfo.nodeInfo.forEach(processNode => {
          if (processNode.status && processNode.status === 'awaiting_check') {
            this.curProcessOrder = processNode.nodeOrder
            const eventName = 'processStep' + this.curProcessOrder
            this[eventName] && this[eventName]()
          }
        })
      }
    },
    async addHadRecordInfos(id) {
      this.hadCostResignTickets = []
      const res = await expenseRecordServer.findHadRecord(id)
      this.hadCostResignTickets = res.data.data
    },
    clickAddCostResignTicket() {
      if (this.warnId == null) {
        this.$message({
          message: '请先选择合同号',
          type: 'warning',
          duration: 3000
        })
        return
      }
      this.costResignTickets.push({
        ...costResignEmptyData
      })
    },
    clickExportBtn() {
      this.tHeader = []
      this.filterVal = []
      this.dataExport = []

      if (this.type === 1) {
        this.dataExport = JSON.parse(JSON.stringify(this.costResignTickets))
        this.dataExport.forEach(item => {
          if (item.payObject !== 1) {
            if (item.payObject === 2) {
              item.payObject = '指定货代'
            } else {
              item.payObject = '车队'
            }
          } else {
            item.payObject = '协议货代'
          }
        })
        this.dataExport.forEach(item => {
          switch (item.currencyCode) {
            case 'CNY' : item.currencyCode = '人民币'
                  break
            case 'HK$' : item.currencyCode = '港币'
                  break
            case 'EUR' : item.currencyCode = '欧元'
                  break
            case 'GBP' : item.currencyCode = '英镑'
                  break
            case 'USD' : item.currencyCode = '美元'
                  break
            case 'THB' : item.currencyCode = '泰铢'
                  break
          }
        })
        this.tHeader = initExport1
        this.filterVal = filterVal1
      }

      if (this.type === 2) {
        this.dataExport = JSON.parse(JSON.stringify(this.hadCostResignTickets))
        this.dataExport.forEach(item => {
          if (item.payObject !== 1) {
            if (item.payObject === 2) {
              item.payObject = '指定货代'
            } else {
              item.payObject = '车队'
            }
          } else {
            item.payObject = '协议货代'
          }
        })
        this.dataExport.forEach(item => {
          switch (item.currencyCode) {
            case 'CNY' : item.currencyCode = '人民币'
              break
            case 'HK$' : item.currencyCode = '港币'
              break
            case 'EUR' : item.currencyCode = '欧元'
              break
            case 'GBP' : item.currencyCode = '英镑'
              break
            case 'USD' : item.currencyCode = '美元'
              break
            case 'THB' : item.currencyCode = '泰铢'
              break
          }
        })
        this.tHeader = initExport2
        this.filterVal = filterVal2
      }
      if (this.dataExport.length === 0) {
        return this.$message({
          message: '无导出数据',
          type: 'warning'
        })
      }
      this.showExportPopup = true
    },
    clickDelCostResignTicket() {
      if (this.costResignSelection.length > 0) {
        this.costResignSelection.forEach(item => {
          for (let i = 0; i < this.costResignTickets.length; i++) {
            if (this.costResignTickets[i] === item) {
              this.costResignTickets.splice(i, 1)
              break
            }
          }
        })
        this.costResignSelection = []
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    selectCostResignTicket(val) {
      this.costResignSelection = val
    },
    async saveForSubmit() {
      let isNullInfo = false
      for (let i = 0; i < this.costResignTickets.length; i++) {
        if (this.costResignTickets[i].invoiceNo === '' || this.costResignTickets[i].invoiceNo === null) {
          isNullInfo = true
          break
        }
      }
      if (isNullInfo === true && this.isFp === true) {
        this.$message({
          message: '当前流程登记发票号不能有空数据！',
          type: 'warning'
        }) 
        this.isWrong = true
      } else {
        this.isWrong = false
        return new Promise((resolve, reject) => {
          this.$refs['formData'].validate(async valid => {
            if (valid) {
              const costResignTicketsContainers = this.costResignTickets
              for (let i = 0; i < costResignTicketsContainers.length; i++) {
                const error = validate.dataObjectValidate(costResignTicketsContainers[i], expenseRecordRules)
                if (error) {
                  this.$message({
                    message: `费用登记 第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
                    type: 'warning',
                    duration: 4000
                  })
                  reject('error submit!!')
                  return
                }
              }
              if (this.formData.id !== null) {
                const res = await expenseRecordServer.put(
                  this.formData,
                  this.costResignTickets,
                  this.oldLines,
                  this.warnId
                )
                this.formData.id = res.rows[0].reg_id
              } else {
                this.formData.entid = this.$store.getters.entid
                const res = await expenseRecordServer.post(
                  this.formData,
                  this.costResignTickets,
                  this.warnId
                )
                this.formData.id = res.rows[0].reg_id
              }
              initFormData = {
                ...this.formData
              }
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              resolve({
                ...this.formData
              })
            } else {
              this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
              reject('error submit!!')
            }
          })
        })
      }
    },
    async save() {
      let isNullInfo = false
      for (let i = 0; i < this.costResignTickets.length; i++) {
        if (this.costResignTickets[i].invoiceNo === '' || this.costResignTickets[i].invoiceNo === null) {
          isNullInfo = true
          break
        }
      }
      if (isNullInfo === true && this.isFp === true) {
        return new Promise((resolve, reject) => {
        this.$message({
          message: '当前流程登记发票号不能有空数据！',
          type: 'warning'
        }) 
        return reject()
        })
      } else {
        return new Promise((resolve, reject) => {
          this.$refs['formData'].validate(async valid => {
            if (valid) {
              const costResignTicketsContainers = this.costResignTickets
              for (let i = 0; i < costResignTicketsContainers.length; i++) {
                const error = validate.dataObjectValidate(costResignTicketsContainers[i], expenseRecordRules)
                if (error) {
                  this.$message({
                    message: `费用登记 第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
                    type: 'warning',
                    duration: 5000
                  })
                  reject('error submit!!')
                  return
                }
              }
              if (this.formData.id !== null) {          
                  const res = await expenseRecordServer.put(
                    this.formData,
                    this.costResignTickets,
                    this.oldLines,
                    this.warnId
                  )
                  this.formData.id = res.rows[0].reg_id
                // this.getData()
              } else {     
                const vRes = await expenseRecordServer.valid(this.formData.piNo)
                if (vRes.data && vRes.data > 0) {        
                  this.formData.entid = this.$store.getters.entid
                  const res = await expenseRecordServer.post(
                    this.formData,
                    this.costResignTickets,
                    this.warnId
                  )
                  this.formData.id = res.rows[0].reg_id
                  // this.getData()                 
                } else {                  
                  this.$message({
                    message: `该合同号对应的 "订舱单号" 还未完成，请勿提前做费用登记`,
                    type: 'warning',
                    duration: 5000
                  })
                  return reject()
                }
              }
              initFormData = {
                ...this.formData
              }
              this.$emit('emitEvent', {
                key: 'update',
                params: {
                  id: this.formData.id
                }
              })
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              resolve({
                ...this.formData
              })
            } else {
              this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
              reject('error submit!!')
            }
          })
        })
      }
    },
    async newStartProcess() {
      return new Promise(async(resolve, reject) => {
        await this.save()
        resolve()
      })
    },
    async valiAgreeProcess() {
      return new Promise(async(s, j) => {
        if (this.isFinishTime === true) {
          const thisTime = dateToDateStr(new Date())
          for (let i = 0; i < this.costResignTickets.length; i++) {
            this.costResignTickets[i].costConfirmDate = thisTime
          }
          await this.saveForSubmit()
          if (this.isWrong === true) {
            j()
          } else {
            s()
          }
        } else {
          await this.saveForSubmit()
          if (this.isWrong === true) {
            j()
          } else {
            s()
          }
        }
      })
    },
    async emitEvent({ key, params }) {
      switch (key) {
        case 'saveFormData':
          this.save()
          break
        case 'resetData':
          this.resetData()
          break
        case 'startProcess':
          return this.newStartProcess()  
        case 'agreeProcess':
          return this.valiAgreeProcess()  
        case 'update':
          this.getData()
          break
        default:
          this[key] && this[key](params)
          break
      }
    },
    del() {
      this.$confirm('确定要删除当前表单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        expenseRecordServer.delete(this.formData).then(() => {
          this.$message({
            message: `成功删除当前费用登记单 ${this.formData.regNo}`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'ExpenseRecordEditPage')
        })
      })
    },
    resetData() {
      if (this.id) {
        this.formData = {
          ...initFormData
        }
        this.costResignTickets = []
        this.hadCostResignTickets = []
        this.formData.id = this.id
        this.getData()
      } else {
        this.formData = {
          ...initFormData
        }
        this.costResignTickets = []
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item {
  width: 100%;
  margin-right: 0;
}
</style>
