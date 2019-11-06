<template>
  <div class="max-w back">
    <div class="container m-t-not">
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
            <el-form-item label="单据号" prop="payNo">
              <el-input v-model="formData.payNo" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="年份" prop="payYear">
              <el-date-picker
                v-model="formData.payYear"
                size="mini"
                class="max-w"
                type="year"
                value-format="yyyy"
                placeholder="选择年"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="月份" prop="payMonth">
              <el-date-picker
                v-model="formData.payMonth"
                size="mini"
                class="max-w"
                type="month"
                format="MM"
                value-format="MM"
                placeholder="选择月"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="状态" prop="stat">
              <FeePayStatEnumSelect v-model="formData.stat" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="申请日期" prop="applyDate">
              <el-date-picker
                v-model="formData.applyDate"
                :disabled="false"
                size="mini"
                class="max-w"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="制单人" prop="createUser">
              <el-input v-model="formData.createUser" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="应付总额" prop="totalAmt">
              <el-input-number v-model="formData.totalAmt" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="应付总额(RMB)" prop="totalAmtRmb">
              <el-input-number v-model="formData.totalAmtRmb" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="财务复核总额" prop="totalCheckAmt">
              <el-input-number v-model="formData.totalCheckAmt" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="凭证号" prop="sapNo">
              <el-input v-model="formData.sapNo" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="银行码" prop="bankAccountNum">
              <el-input v-model="formData.bankAccountNum" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="帐号" prop="bankCode">
              <el-input v-model="formData.bankCode" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="持有人" prop="bankAccountOwer">
              <el-input v-model="formData.bankAccountOwer" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="开户银行" prop="bankName">
              <el-input v-model="formData.bankName" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="币种" prop="currencyCode">
              <CurrencySelect v-model="formData.currencyCode" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="费用类型" prop="feeType">
              <el-input v-model="formData.feeType" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="付款方式" prop="payType">
              <PayTypeEnumSelect v-model="formData.payType"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="预算内付款" prop="isYs">
              <el-switch v-model="formData.isYs" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="合同编号" prop="piNos">
              <el-input v-model="formData.piNos" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="支付公司" prop="compCode">
              <CompCodeEnumSelect v-model="formData.compCode"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="协议货代" prop="transitId">
              <ShippingCompanySelect 
                v-model="formData.transitId" 
                :form="1"
                :hd-type="1"
                @changeData="changeTransit"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="供应商" prop="venderId">
              <FeePayCustomerSelect v-model="formData.venderId" @changeData="changeSupplier"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="共享单号" prop="fsscNo">
              <el-input v-model="formData.fsscNo" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>          
          <el-col :lg="12" :md="16" :sm="24" :xs="24">
            <el-form-item label="备注" prop="note">
              <el-input 
                v-model="formData.note" 
                type="textarea"
                size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="16" :sm="24" :xs="24">
            <el-form-item label="链接" prop="linkUrl">
              <el-input 
                v-model="formData.linkUrl" 
                :disabled="true" 
                size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs type="border-card">
        <el-tab-pane label="发票明细">
          <el-row>
            <el-button
              :disabled="detailCanEdit"
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="clickAddFreightPayInvoice"
            />
            <el-button
              :disabled="detailCanEdit"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteFreightPayInvoice"
            />
            <el-button
              :disabled="detailCanEdit"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="importCostInfos"
            >引入费用登记</el-button>
            <el-button
              type="primary"
              icon="el-icon-copy-document"
              size="mini"
              @click="clickExportBtn"
            >导出</el-button>
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${freightPayInvoicesSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="freightPayInvoices"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeFreightPayInvoice"
          >
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="invoiceNo" width="180" label="发票号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.invoiceNo" :disabled="detailCanEdit" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="invoiceNo" width="80" label="跳转">
              <template slot-scope="scope">
                <a v-if="scope.row.id" href="javascript:void(0)" style="color:#0c60e1" @click="routeJump(scope.row)">登记详情</a>
                <span v-if="!scope.row.id" style="color:#C0C4CC">登记详情</span>
              </template>
            </el-table-column>
            <el-table-column prop="amt" width="190" label="应付金额">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.amt" :disabled="detailCanEdit" :precision="2" :step="0.1" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="amt" width="190" label="应付金额(RMB)">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.amtRmb" :disabled="detailCanEdit" :precision="2" :step="0.1" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="tax" width="190" label="其中税金">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.tax"
                  :disabled="detailCanEdit" 
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="checkAmtRmb" width="190" label="财务复核金额">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.checkAmtRmb"
                  :disabled="detailCanEdit" 
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="piNo" width="180" label="PI号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.piNo" :disabled="detailCanEdit" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="warnNo" width="180" label="出货预告号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.warnNo" :disabled="detailCanEdit" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="orgId" width="210" label="部门">
              <template slot-scope="scope">
                <DepartmentSelect 
                  v-model="scope.row.orgId"
                  :disabled="detailCanEdit" 
                  :stat="2"
                  :index="scope.$index"
                  @changeDataTwo="changeOrg" />
              </template>
            </el-table-column>
            <el-table-column prop="payregCreateTime" width="240" label="费用登记日期">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.payregCreateTime"
                  :disabled="detailCanEdit" 
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期时间"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="note" width="180" label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.note" :disabled="detailCanEdit" maxlength="1024" size="mini"/>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="出货预告明细">
          <el-row>
            <el-button
              :disabled="detailCanEdit"
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="clickAddFreightPayWarn"
            />
            <el-button
              :disabled="detailCanEdit"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteFreightPayWarn"
            />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${freightPayWarnsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="freightPayWarns"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeFreightPayWarn"
          >
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="preShipDate" width="240" label="预计发货日期">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.preShipDate"
                  :disabled="true"
                  type="datetime"
                  placeholder="选择日期时间"
                  size="mini"
                />
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="superOrgId"
              width="190"
              label="大区">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.superOrgId"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="superOrgCode"
              width="180"
              label="大区">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.superOrgCode"
                  size="mini"
                />
              </template>
            </el-table-column>-->
            <el-table-column prop="superOrgName" width="180" label="大区">
              <template slot-scope="scope">
                <el-input v-model="scope.row.superOrgName" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="custName" width="180" label="客户">
              <template slot-scope="scope">
                <el-input v-model="scope.row.custName" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="warnId"
              width="190"
              label="出货预告号">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.warnId"
                  size="mini"
                />
              </template>
            </el-table-column>-->
            <el-table-column prop="warnNo" width="180" label="出货预告号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.warnNo" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="piNo" width="180" label="PI号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.piNo" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="amt"
              width="190"
              label="金额">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.amt"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="otherAmt"
              width="190"
              label="其他">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.otherAmt"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>-->
            <el-table-column prop="payAmt" width="190" label="应付金额">
              <template slot-scope="scope">
                <el-input-number 
                  v-model="scope.row.payAmt" 
                  :disabled="detailCanEdit"
                  :precision="2" 
                  :step="0.1" 
                  size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="ytedAmt" width="190" label="已预提金额">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.ytedAmt"
                  :disabled="true"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="payedAmt" width="190" label="已支付金额">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.payedAmt" 
                  :disabled="detailCanEdit"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="fpNo" width="180" label="发票号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fpNo" :disabled="detailCanEdit" size="mini"/>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="regNo"
              width="180"
              label="商业发票号">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.regNo"
                  size="mini"
                />
              </template>
            </el-table-column>-->
            <el-table-column prop="note" width="180" label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.note" :disabled="detailCanEdit" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="isYt" width="100" label="已预提">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isYt"
                  :disabled="detailCanEdit" 
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="isTs" width="100" label="已特殊处理">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isTs"
                  :disabled="detailCanEdit" 
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <component
      v-if="showFreightPayInvoiceDeletePopup"
      :is="'FreightPayInvoiceDeletePopup'"
      :list="freightPayInvoicesSelection"
      @close="showFreightPayInvoiceDeletePopup = false"
      @update="deletedFreightPayInvoice"
    />
    <component
      v-if="showFreightPayWarnDeletePopup"
      :is="'FreightPayWarnDeletePopup'"
      :list="freightPayWarnsSelection"
      @close="showFreightPayWarnDeletePopup = false"
      @update="deletedFreightPayWarn"
    />
    <component
      v-if="showExportPopup"
      :is="'ExportPopup'"
      :list="dataExport"
      :t-header="tHeader"
      :filter-val="filterVal"
      @close="showExportPopup = false"
    />
    <FreightPayAdvanceNoticeSelect
      v-if="showAdvancePopup"
      :transitid="formData.transitId"
      @confirm="confirmInfo"
      @close="showAdvancePopup = false"
    />
    <FreightPayCostInfoSelect
      v-if="showCostPopup"
      :currencycode="formData.currencyCode"
      :infos="freightPayWarns"
      @confirm="confirmCostInfo"
      @close="showCostPopup = false"
    />
  </div>
</template>

<script>
import freightPayServer from './../../../api/freightPayServer'
import validate from './../../../utils/validate'
import FeePayCustomerSelect from './../../../components/entity/fee-pay/FeePayCustomerSelect'
import FreightPayCostInfoSelect from './../../../components/entity/freight-pay/FreightPayCostInfoSelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import DepartmentSelect from './../department/DepartmentSelect'
import FeePayStatEnumSelect from './../../../components/entity/freight-pay/FeePayStatEnumSelect'
import CurrencySelect from './../../../components/entity/currency/CurrencySelect'
import PayTypeEnumSelect from './../../../components/entity/freight-pay/PayTypeEnumSelect'
import CompCodeEnumSelect from './../../../components/entity/freight-pay/CompCodeEnumSelect'
import FreightPayAdvanceNoticeSelect from './../../../components/entity/freight-pay/FreightPayAdvanceNoticeSelect'
const emptyFormData = {
  id: null,
  payNo: null,
  payYear: null,
  payMonth: null,
  stat: null,
  applyDate: null,
  createDate: null,
  createUser: null,
  totalAmt: null,
  totalAmtRmb: null,
  totalCheckAmt: null,
  sapNo: null,
  bankAccountNum: null,
  bankCode: null,
  bankAccountOwer: null,
  bankName: null,
  currencyCode: 'USD',
  feeType: null,
  payType: null,
  isYs: null,
  piNos: null,
  compCode: null,
  note: null,
  transitId: null,
  venderId: null
}
const freightPayInvoiceEmptyData = {
  invoiceNo: null,
  amt: null,
  amtRmb: null,
  tax: null,
  checkAmt: null,
  checkAmtRmb: null,
  warnNo: null,
  piNo: null,
  payregCreateTime: null,
  note: null,
  org: null
}
const initExport = {
  invoiceNo: '发票号',
  amt: '应付金额',
  amtRmb: '应付金额(RMB)',
  tax: '其中税金',
  checkAmt: '财务复核金额',
  warnNo: '出货预告号',
  payregCreateTime: '费用登记日期',
  note: '备注',
  orgName: '部门'
}
// const freightPayWarnEmptyData = {
//   preShipDate: null,
//   superOrgId: null,
//   superOrgCode: null,
//   superOrgName: null,
//   custName: null,
//   warnId: null,
//   warnNo: null,
//   piNo: null,
//   amt: null,
//   otherAmt: null,
//   payAmt: null,
//   ytedAmt: null,
//   payedAmt: null,
//   fpNo: null,
//   regNo: null,
//   note: null,
//   isYt: null,
//   isTs: null,
// }

const freightPayInvoiceRules = {
  invoiceNo: [],
  amt: [{ message: '应付金额 必须为数字', validate: validate.isNumberOrEmpty }],
  amtRmb: [{ message: '应付金额 必须为数字', validate: validate.isNumberOrEmpty }],
  checkAmt: [
    { message: '其中税金 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  checkAmtRmb: [
    { message: '财务复核金额 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  warnNo: [],
  piNo: [],
  payregCreateTime: [],
  note: [],
  orgId: []
}
const freightPayWarnRules = {
  preShipDate: [],
  // superOrgId: [
  //   { message: '大区 必须为数字', validate: validate.isNumberOrEmpty },
  // ],
  superOrgCode: [],
  superOrgName: [],
  custName: [],
  // warnId: [
  //   { message: '出货预告号 必须为数字', validate: validate.isNumberOrEmpty },
  // ],
  warnNo: [],
  piNo: [],
  amt: [{ message: '金额 必须为数字', validate: validate.isNumberOrEmpty }],
  otherAmt: [
    { message: '其他 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  payAmt: [
    { message: '应付金额 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  ytedAmt: [
    { message: '已预提金额 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  payedAmt: [
    { message: '已支付金额 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  fpNo: [],
  regNo: [],
  note: [],
  isYt: [],
  isTs: []
}

let initFormData = {
  ...emptyFormData
}
// let initFreightPayInvoices = []
// let initFreightPayWarns = []

export default {
  name: 'FreightPaySublistEdit',
  components: {
    ShippingCompanySelect,
    FreightPayAdvanceNoticeSelect,
    DepartmentSelect,
    FeePayStatEnumSelect,
    FreightPayCostInfoSelect,
    CurrencySelect,
    PayTypeEnumSelect,
    CompCodeEnumSelect,
    FeePayCustomerSelect,
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    FreightPayInvoiceDeletePopup: () =>
      import('./../../../views/entity-page/freight-pay-invoice/freightPayInvoiceDeletePopup.vue'),
    FreightPayWarnDeletePopup: () =>
      import('./../../../views/entity-page/freight-pay-warn/freightPayWarnDeletePopup.vue')
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
      curProcessOrder: 0,
      showExportPopup: false,
      oldline1: [],
      oldline2: [],
      showAdvancePopup: false,
      showCostPopup: false,
      freightPayInvoices: [],
      freightPayWarns: [],
      freightPayInvoicesSelection: [],
      showFreightPayInvoiceDeletePopup: false,
      freightPayWarnsSelection: [],
      showFreightPayWarnDeletePopup: false,
      rules: {
        payNo: [],
        payYear: [{ required: true, message: '不能为空', trigger: 'change' }],
        payMonth: [{ required: true, message: '不能为空', trigger: 'change' }],
        stat: [],
        applyDate: [{ required: true, message: '不能为空', trigger: 'change' }],
        createDate: [],
        createUser: [],
        totalAmt: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
        totalCheckAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        sapNo: [],
        bankAccountNum: [],
        bankCode: [],
        bankAccountOwer: [],
        bankName: [],
        currencyCode: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        feeType: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        payType: [{ required: true, message: '不能为空', trigger: 'blur' }],
        isYs: [],
        piNos: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        compCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
        note: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        transitId: [{ required: true, message: '不能为空', trigger: 'change' }],
        venderId: [{ required: true, message: '不能为空', trigger: 'change' }]
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    },
    detailCanEdit() {
      return !(this.curProcessOrder < 2)
    },
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
    changeOrg(val) {
      this.freightPayInvoices[val.$index].orgName = val.orgName
    },
    clickExportBtn() {
      if (this.freightPayInvoices.length > 0) {
        this.dataExport = JSON.parse(
          JSON.stringify(this.freightPayInvoices)
        )
      } else {
        this.$message({
          message: '当前海运费支付发票明细没有数据可导出',
          type: 'warning'
        })
        return
      }
      this.dataExport.forEach(item => {
        item.isYt = item.isYt ? '是' : '否'
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
        this.filterVal.push(key)
        this.tHeader.push(initExport[key])
      }
    },
    close() {
      this.$emit('close')
    },
    confirmInfo(chooseData) {
      for (let i = 0; i < chooseData.length; i++) {
        for (let j = 0; j < this.freightPayWarns.length; j++) {
          if (chooseData[i].warnId === this.freightPayWarns[j].warnId) {
            chooseData.splice(i, 1)
          }
        }
      }
      this.freightPayWarns = this.freightPayWarns.concat(chooseData)
      this.showAdvancePopup = false
    },
    changeSupplier(list) {
      this.formData.venderCode = list.venderCode
      this.formData.venderName = list.venderName
      this.formData.bankCode = list.bankCode
      this.formData.bankAccountNum = list.bankAccountNum
      this.formData.bankAccountOwer = list.bankAccountOwer
      this.formData.bankName = list.bankName
    },
    confirmCostInfo(chooseData) {
      for (let i = 0; i < chooseData.length; i++) {
        chooseData[i].checkAmtRmb = chooseData[i].amt + chooseData[i].tax
      }
      this.freightPayInvoices = this.freightPayInvoices.concat(chooseData)
      this.showCostPopup = false
    },
    importCostInfos() {
      if (this.freightPayWarns.length > 0) {
        this.showCostPopup = true
      } else {
        this.$message({
          message: '请先插入出货预告明细',
          type: 'warning',
          duration: 3000
        })
      }
    },
    async getData() {
      this.loading = true
      const res = await freightPayServer.get(this.formData.id)
      initFormData = res.rows[0]
      this.formData = {
        ...res.rows[0]
      }
      this.freightPayInvoices = [...res.rows[0].ocfPayFpLineAdd]
      this.oldline1 = [...res.rows[0].ocfPayFpLineAdd]
      this.freightPayWarns = [...res.rows[0].ocfPayLineAdd]
      this.oldline2 = [...res.rows[0].ocfPayLineAdd]
      this.formData.id = res.rows[0].payId
      this.loading = false
      this.sumLinesField(this.oldline1)
    },
    sumLinesField(lines = []) {
      let sum = 0
      lines.forEach((line) => {
        sum += line.amtRmb
      })
      this.formData.totalAmtRmb = sum
    },
    routeJump(rowData) {
      this.$router.push({
        path: '/CW-manage/fee-manage/expense-record/edit-sublist/' + rowData.id
      })
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const freightPayInvoices = this.freightPayInvoices
            for (let i = 0; i < freightPayInvoices.length; i++) {
              const error = validate.dataObjectValidate(
                freightPayInvoices[i],
                freightPayInvoiceRules
              )
              if (error) {
                this.$message({
                  message:
                    `发票明细 第 ${i + 1} 行 ` +
                    error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            const freightPayWarns = this.freightPayWarns
            for (let i = 0; i < freightPayWarns.length; i++) {
              const error = validate.dataObjectValidate(
                freightPayWarns[i],
                freightPayWarnRules
              )
              if (error) {
                this.$message({
                  message:
                    `出货预告明细 第 ${i + 1} 行 ` +
                    error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            try {
              if (this.formData.id !== null) {
                const res = await freightPayServer.put(
                  this.formData,
                  this.freightPayInvoices,
                  this.freightPayWarns,
                  this.oldline1,
                  this.oldline2
                )
                this.formData.id = res.data.dataSet.rows[0].payId
              } else {
                this.formData.entid = this.$store.getters.entid
                const res = await freightPayServer.post(
                  this.formData,
                  this.freightPayInvoices,
                  this.freightPayWarns
                )
                if (Number.parseInt(res.data.code) === 200) {
                  // 新增保存成功后清空表单数据
                  this.formData = { ...emptyFormData }
                }
                this.formData.id = res.data.dataSet.rows[0].pay_id
              }
              initFormData = {
                ...this.formData
              }
            } catch (e) {
              this.$message({
                message: '保存失败 ' + e.message,
                type: 'error',
                duration: 5000
              })
              reject('error submit!!')
              return
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
    },
    async newStartProcess() {
      return new Promise(async(resolve, reject) => {
        await this.save()
        resolve()
      })
    },
    async valiAgreeProcess() {
      return new Promise(async(resolve, reject) => {
        await this.save()
        resolve()
      })
    },
    emitEvent({ key, params }) {
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
        case 'shareProcessInfo':
          this.shareProcessInfo(params.info)
          break
        default:
          break
      }
    },
    shareProcessInfo(info) {
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
    del() {
      this.$confirm('确定要删除当前表单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        freightPayServer.delete(this.formData.id).then(() => {
          this.$message({
            message: `删除当前海运费支付单 ${this.formData.payNo} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'FreightPayEditSublistPage')
        })
      })
    },
    resetData() {
      if (this.id) {
        this.formData = {
          ...initFormData
        }
        this.freightPayInvoices = []
        this.freightPayWarns = []
        this.formData.id = this.id
        this.getData()
      } else {
        this.formData = {
          ...initFormData
        }
        this.freightPayInvoices = []
        this.freightPayWarns = []
      }
    },
    clickAddFreightPayInvoice() {
      this.freightPayInvoices.push({
        ...freightPayInvoiceEmptyData
      })
    },
    selectionChangeFreightPayInvoice(val) {
      this.freightPayInvoicesSelection = val
    },
    clickDeleteFreightPayInvoice() {
      if (this.freightPayInvoicesSelection.length > 0) {
        // this.showFreightPayInvoiceDeletePopup = true
        this.freightPayInvoicesSelection.forEach(item => {
          for (let i = 0; i < this.freightPayInvoices.length; i++) {
            if (this.freightPayInvoices[i] === item) {
              this.freightPayInvoices.splice(i, 1)
              break
            }
          }
        })
        this.freightPayInvoicesSelection = []
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedFreightPayInvoice() {
      this.freightPayInvoicesSelection.forEach(item => {
        for (let i = 0; i < this.freightPayInvoices.length; i++) {
          if (this.freightPayInvoices[i] === item) {
            this.freightPayInvoices.splice(i, 1)
            break
          }
        }
      })
      this.freightPayInvoicesSelection = []
    },
    clickAddFreightPayWarn() {
      // this.freightPayWarns.push({
      //   ...freightPayWarnEmptyData
      // })
      if (this.formData.transitId !== null) {
        this.showAdvancePopup = true
      } else {
        this.$message({
          message: '请线选择协议货代',
          type: 'warning'
        })
      }
    },
    selectionChangeFreightPayWarn(val) {
      this.freightPayWarnsSelection = val
    },
    clickDeleteFreightPayWarn() {
      if (this.freightPayWarnsSelection.length > 0) {
        // this.showFreightPayWarnDeletePopup = true
        this.freightPayWarnsSelection.forEach(item => {
          for (let i = 0; i < this.freightPayWarns.length; i++) {
            if (this.freightPayWarns[i] === item) {
              this.freightPayWarns.splice(i, 1)
              break
            }
          }
        })
        this.freightPayWarnsSelection = []
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedFreightPayWarn() {
      this.freightPayWarnsSelection.forEach(item => {
        for (let i = 0; i < this.freightPayWarns.length; i++) {
          if (this.freightPayWarns[i] === item) {
            this.freightPayWarns.splice(i, 1)
            break
          }
        }
      })
      this.freightPayWarnsSelection = []
    },
    changeTransit(list) {
      if (list) {
        this.formData.transitName = list.supplierName
        this.formData.transitCode = list.supplierCode
      }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item {
  width: 100%;
  margin-right: 0;
}
.el-table__body {
  padding-bottom: 12px;
}
</style>
