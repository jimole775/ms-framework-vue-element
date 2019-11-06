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
            <el-form-item label="应付总额(RMB)" prop="totalAmtRmb">
              <el-input-number v-model="formData.totalAmtRmb" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="应付总额" prop="totalAmt">
              <el-input-number v-model="formData.totalAmt" :disabled="true" size="mini"/>
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
            <el-form-item label="资金系统单号" prop="zjxtNo">
              <el-input v-model="formData.zjxtNo" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="资金系统状态" prop="zjxtStat">
              <el-input v-model="formData.zjxtStat" :disabled="true" size="mini"/>
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
            <el-form-item v-if="formData.entid" label="经营单位" prop="entid">
              <OperateUnitSelect :disabled="true" v-model="formData.entid"/>
            </el-form-item>
          </el-col>
          <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="特殊处理" prop="isTs">
              <el-switch v-model="formData.isTs" size="mini" />
            </el-form-item>
          </el-col>-->

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
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="链接" prop="linkUrl">
              <el-input v-model="formData.linkUrl" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24">
            <el-form-item label="备注" prop="note">
              <el-input v-model="formData.note" size="mini"/>
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
              @click="clickAddFeePayInvoice"
            />
            <el-button
              :disabled="detailCanEdit" 
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteFeePayInvoice"
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
            :title="`已选中 ${feePayInvoicesSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="feePayInvoices"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeFeePayInvoice"
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
            <el-table-column prop="tax" width="190" label="其中税金">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.tax" :disabled="detailCanEdit" :precision="2" :step="0.1" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="checkAmt" width="190" label="财务复核金额">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.checkAmt"
                  :disabled="detailCanEdit" 
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="amtRmb" width="190" label="应付金额(RMB)">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.amtRmb" :disabled="detailCanEdit" :precision="2" :step="0.1" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="warnNo" width="180" label="出货预告号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.warnNo" :disabled="detailCanEdit" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="piNo" width="180" label="PI号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.piNo" :disabled="detailCanEdit" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="orgId" width="210" label="部门">
              <template slot-scope="scope">
                <DepartmentSelect 
                  v-model="scope.row.orgId"
                  :disabled="detailCanEdit" 
                  :stat="2"
                  :index="scope.$index"
                  @changeDataTwo="changeOrg"/>
              </template>
            </el-table-column>
            <el-table-column prop="payregCreateDate" width="240" label="费用登记日期">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.payregCreateDate"
                  :disabled="detailCanEdit" 
                  type="date"
                  value-format="yyyy-MM-dd"
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
              @click="clickAddFeePayWarn"
            />
            <el-button
              :disabled="detailCanEdit" 
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteFeePayWarn"
            />
            <el-switch v-model="isTsDeal" :disabled="detailCanEdit" style="margin-left:10px" inactive-text="是否特殊处理"/>
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${feePayWarnsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="feePayWarns"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeFeePayWarn"
          >
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="preShipDate" width="240" label="预计发货日期">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.preShipDate"
                  :disabled="true"
                  type="date"
                  value-format="yyyy-MM-dd"
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
            <el-table-column prop="piNo" width="180" label="PI号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.piNo" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="warnNo" width="180" label="出货预告号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.warnNo" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="boxQty1" width="180" label="20GP">
              <template slot-scope="scope">
                <el-input v-model="scope.row.boxQty1" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="boxQty2" width="180" label="40GP">
              <template slot-scope="scope">
                <el-input v-model="scope.row.boxQty2" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="boxQty3" width="180" label="40HQ">
              <template slot-scope="scope">
                <el-input v-model="scope.row.boxQty3" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="boxQty4" width="180" label="45HQ">
              <template slot-scope="scope">
                <el-input v-model="scope.row.boxQty4" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="boxQty5" width="180" label="40RH">
              <template slot-scope="scope">
                <el-input v-model="scope.row.boxQty5" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="boxQty6" width="180" label="拼箱">
              <template slot-scope="scope">
                <el-input v-model="scope.row.boxQty6" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="boxQty7" width="180" label="空运">
              <template slot-scope="scope">
                <el-input v-model="scope.row.boxQty7" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="boxQty8" width="180" label="一卡一车">
              <template slot-scope="scope">
                <el-input v-model="scope.row.boxQty8" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="boxQty9" width="180" label="二卡一车">
              <template slot-scope="scope">
                <el-input v-model="scope.row.boxQty9" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="boxQty10" width="180" label="三卡一车">
              <template slot-scope="scope">
                <el-input v-model="scope.row.boxQty10" :disabled="true" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="amt" width="190" label="按柜金额">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.amt"
                  :precision="2"
                  :step="0.1"
                  :disabled="true"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="otherAmt" width="190" label="按票金额">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.otherAmt"
                  :precision="2"
                  :step="0.1"
                  :disabled="true"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="payAmt" width="190" label="应付金额">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.payAmt" :disabled="detailCanEdit" :precision="2" :step="0.1" size="mini"/>
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
            <el-table-column prop="note" width="180" label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.note" :disabled="detailCanEdit" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="isYt" width="200" label="是否已预提">
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
            <el-table-column prop="isTs" width="200" label="是否已特殊处理">
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
      v-if="showFeePayInvoiceDeletePopup"
      :is="'FeePayInvoiceDeletePopup'"
      :list="feePayInvoicesSelection"
      @close="showFeePayInvoiceDeletePopup = false"
      @update="deletedFeePayInvoice"
    />
    <component
      v-if="showFeePayWarnDeletePopup"
      :is="'FeePayWarnDeletePopup'"
      :list="feePayWarnsSelection"
      @close="showFeePayWarnDeletePopup = false"
      @update="deletedFeePayWarn"
    />
    <component
      v-if="showExportPopup"
      :is="'ExportPopup'"
      :list="dataExport"
      :t-header="tHeader"
      :filter-val="filterVal"
      @close="showExportPopup = false"
    />
    <FeePayAdvanceNoticeSelect
      v-if="showAdvancePopup"
      :ists="isTsDeal"
      :transitid="formData.transitId"
      @confirm="confirmInfo"
      @close="showAdvancePopup = false"
    />
    <FeePayCostInfoSelect
      v-if="showCostPopup"
      :currencycode="formData.currencyCode"
      :infos="feePayWarns"
      @confirm="confirmCostInfo"
      @close="showCostPopup = false"
    />
  </div>
</template>

<script>
import feePayServer from './../../../api/feePayServer'
// import feePayInvoiceServer from './../../../api/feePayInvoiceServer'
// import feePayWarnServer from './../../../api/feePayWarnServer'
import validate from './../../../utils/validate'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import FeePayCustomerSelect from './FeePayCustomerSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import FeePayStatEnumSelect from './../../../components/entity/fee-pay/FeePayStatEnumSelect'
import CurrencySelect from './../../../components/entity/currency/CurrencySelect'
import PayTypeEnumSelect from './../../../components/entity/fee-pay/PayTypeEnumSelect'
import FeePayAdvanceNoticeSelect from './../../../components/entity/fee-pay/FeePayAdvanceNoticeSelect'
import FeePayCostInfoSelect from './../../../components/entity/fee-pay/FeePayCostInfoSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
const emptyFormData = {
  id: null,
  payNo: null,
  payYear: null,
  payMonth: null,
  stat: null,
  applyDate: null,
  createDate: null,
  createUser: null,
  totalAmtRmb: null,
  totalAmt: null,
  totalCheckAmt: null,
  sapNo: null,
  zjxtNo: null,
  zjxtStat: null,
  bankAccountNum: null,
  bankCode: null,
  bankAccountOwer: null,
  bankName: null,
  currencyCode: 'CNY',
  feeType: null,
  payType: null,
  isYs: null,
  piNos: null,
  note: null,
  isTs: null,
  transitId: null,
  transitName: null,
  transitCode: null,
  venderId: null
}
const feePayInvoiceEmptyData = {
  invoiceNo: null,
  amt: null,
  tax: null,
  checkAmt: null,
  amtRmb: null,
  warnNo: null,
  piNo: null,
  payregCreateDate: null,
  note: null,
  org: null
}
// const feePayWarnEmptyData = {
//   preShipDate: null,
//   superOrgId: null,
//   superOrgCode: null,
//   superOrgName: null,
//   custName: null,
//   warnId: null,
//   warnNo: null,
//   piNo: null,
//   boxQty1: null,
//   boxQty2: null,
//   boxQty3: null,
//   boxQty4: null,
//   boxQty5: null,
//   boxQty6: null,
//   boxQty7: null,
//   boxQty8: null,
//   boxQty9: null,
//   boxQty10: null,
//   amt: null,
//   otherAmt: null,
//   payAmt: null,
//   ytAmt: null,
//   payedAmt: null,
//   fpNo: null,
//   note: null,
//   isYt: null,
//   isTs: null,
// }

const feePayInvoiceRules = {
  invoiceNo: [],
  amt: [{ message: '应付金额 必须为数字', validate: validate.isNumberOrEmpty }],
  tax: [{ message: '其中税金 必须为数字', validate: validate.isNumberOrEmpty }],
  checkAmt: [
    { message: '财务复核金额 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  amtRmb: [
    { message: '应付金额(RMB) 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  warnNo: [],
  piNo: [],
  payregCreateDate: [],
  note: [],
  orgId: []
}
const feePayWarnRules = {
  preShipDate: [],
  superOrgId: [
    { message: '大区 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  superOrgCode: [],
  superOrgName: [],
  custName: [],
  warnId: [
    { message: '出货预告号 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  warnNo: [],
  piNo: [],
  boxQty1: [],
  boxQty2: [],
  boxQty3: [],
  boxQty4: [],
  boxQty5: [],
  boxQty6: [],
  boxQty7: [],
  boxQty8: [],
  boxQty9: [],
  boxQty10: [],
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
  note: [],
  isYt: [],
  isTs: []
}

let initFormData = {
  ...emptyFormData
}
const initExport = {
  invoiceNo: '发票号',
  amt: '应付金额',
  tax: '其中税金',
  checkAmt: '财务复核金额',
  amtRmb: '应付金额(RMB)',
  warnNo: '出货预告号',
  payregCreateDate: '费用登记日期',
  note: '备注',
  orgName: '部门'
}
export default {
  name: 'FeePaySublistEdit',
  components: {
    ShippingCompanySelect,
    FeePayCustomerSelect,
    DepartmentSelect,
    FeePayStatEnumSelect,
    CurrencySelect,
    PayTypeEnumSelect,
    FeePayAdvanceNoticeSelect,
    FeePayCostInfoSelect,
    OperateUnitSelect,
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    FeePayInvoiceDeletePopup: () =>
      import('./../../../views/entity-page/fee-pay-invoice/feePayInvoiceDeletePopup.vue'),
    FeePayWarnDeletePopup: () =>
      import('./../../../views/entity-page/fee-pay-warn/feePayWarnDeletePopup.vue')
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
      isTsDeal: false,
      showAdvancePopup: false,
      showCostPopup: false,
      feePayInvoices: [],
      feePayWarns: [],
      oldline1: [],
      oldline2: [],
      feePayInvoicesSelection: [],
      showFeePayInvoiceDeletePopup: false,
      feePayWarnsSelection: [],
      showFeePayWarnDeletePopup: false,
      rules: {
        payNo: [],
        payYear: [{ required: true, message: '不能为空', trigger: 'change' }],
        payMonth: [{ required: true, message: '不能为空', trigger: 'change' }],
        stat: [],
        applyDate: [{ required: true, message: '不能为空', trigger: 'change' }],
        createDate: [],
        createUser: [],
        totalAmtRmb: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        totalAmt: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
        totalCheckAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        sapNo: [],
        zjxtNo: [],
        zjxtStat: [],
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
        note: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        isTs: [],
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
    routeJump(rowData) {
      this.$router.push({
        path: '/CW-manage/fee-manage/expense-record/edit-sublist/' + rowData.id
      })
    },
    changeOrg(val) {
      this.feePayInvoices[val.$index].orgName = val.orgName
    },
    clickExportBtn() {
      if (this.feePayInvoices.length > 0) {
        this.dataExport = JSON.parse(
          JSON.stringify(this.feePayInvoices)
        )
      } else {
        this.$message({
          message: '当前内陆包干费支付发票明细没有数据可导出',
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
    importCostInfos() {
      if (this.feePayWarns.length > 0) {
        this.showCostPopup = true
      } else {
        this.$message({
          message: '请先插入出货预告明细',
          type: 'warning',
          duration: 3000
        })
      }
    },
    confirmCostInfo(chooseData) {
      for (let i = 0; i < chooseData.length; i++) {
        for (let j = 0; j < this.feePayInvoices.length; j++) {
          if (chooseData[i].warnId === this.feePayInvoices[j].warnId) {
            chooseData.splice(i, 1)
          }
        }
        chooseData[i].checkAmt = chooseData[i].amt + chooseData[i].tax
      }
      this.feePayInvoices = this.feePayInvoices.concat(chooseData)
      this.showCostPopup = false
    },
    changeSupplier(list) {
      this.formData.bankCode = list.bankCode
      this.formData.bankAccountNum = list.bankAccountNum
      this.formData.bankAccountOwer = list.bankAccountOwer
      this.formData.bankName = list.bankName
    },
    changeTransit(list) {
      if (list) {
        this.formData.transitName = list.supplierName
        this.formData.transitCode = list.supplierCode
      }
    },
    confirmInfo(chooseData) {
      for (let i = 0; i < chooseData.length; i++) {
        for (let j = 0; j < this.feePayWarns.length; j++) {
          if (chooseData[i].warnId === this.feePayWarns[j].warnId) {
            chooseData.splice(i, 1)
          }
        }
      }
      this.feePayWarns = this.feePayWarns.concat(chooseData)
      this.showAdvancePopup = false
    },
    async getData() {
      this.loading = true
      const res = await feePayServer.get(this.formData.id)
      initFormData = res.rows[0]
      this.formData = {
        ...res.rows[0]
      }
      this.oldline1 = [...res.rows[0].localPayFpLineAdd]
      this.oldline2 = [...res.rows[0].localPayLineAdd]
      this.feePayInvoices = [...res.rows[0].localPayFpLineAdd]
      this.feePayWarns = [...res.rows[0].localPayLineAdd]
      this.formData.id = res.rows[0].payId
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const feePayInvoices = this.feePayInvoices
            for (let i = 0; i < feePayInvoices.length; i++) {
              const error = validate.dataObjectValidate(
                feePayInvoices[i],
                feePayInvoiceRules
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
            const feePayWarns = this.feePayWarns
            for (let i = 0; i < feePayWarns.length; i++) {
              const error = validate.dataObjectValidate(
                feePayWarns[i],
                feePayWarnRules
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
                const res = await feePayServer.put(
                  this.formData,
                  this.feePayInvoices,
                  this.feePayWarns,
                  this.oldline1,
                  this.oldline2
                )
                this.formData.id = res.data.dataSet.rows[0].payId
                // this.getData()
              } else {
                this.formData.entid = this.$store.getters.entid
                const res = await feePayServer.post(
                  this.formData,
                  this.feePayInvoices,
                  this.feePayWarns
                )
                if (Number.parseInt(res.data.code) === 200) {
                  // 新增保存成功后清空表单数据
                  this.formData = { ...emptyFormData }
                }
                this.formData.id = res.data.dataSet.rows[0].pay_id
                // this.getData()
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
    del() {
      this.$confirm('确定要删除当前表单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        feePayServer.delete(this.formData.payId).then(() => {
          this.$message({
            message: `删除 ${this.formData.payNo} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'FeePayEditSublistPage')
        })
      })
    },
    resetData() {
      if (this.id) {
        this.formData = {
          ...initFormData
        }
        this.feePayInvoices = []
        this.feePayWarns = []
        this.formData.id = this.id
        this.getData()
      } else {
        this.formData = {
          ...initFormData
        }
        this.feePayInvoices = []
        this.feePayWarns = []
      }
    },
    clickAddFeePayInvoice() {
      this.feePayInvoices.push({
        ...feePayInvoiceEmptyData
      })
    },
    selectionChangeFeePayInvoice(val) {
      this.feePayInvoicesSelection = val
    },
    clickDeleteFeePayInvoice() {
      if (this.feePayInvoicesSelection.length > 0) {
        // this.showFeePayInvoiceDeletePopup = true
        this.feePayInvoicesSelection.forEach(item => {
          for (let i = 0; i < this.feePayInvoices.length; i++) {
            if (this.feePayInvoices[i] === item) {
              this.feePayInvoices.splice(i, 1)
              break
            }
          }
        })
        this.feePayInvoicesSelection = []
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedFeePayInvoice() {
      this.feePayInvoicesSelection.forEach(item => {
        for (let i = 0; i < this.feePayInvoices.length; i++) {
          if (this.feePayInvoices[i] === item) {
            this.feePayInvoices.splice(i, 1)
            break
          }
        }
      })
      this.feePayInvoicesSelection = []
    },
    clickAddFeePayWarn() {
      // this.feePayWarns.push({
      //   ...feePayWarnEmptyData
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
    selectionChangeFeePayWarn(val) {
      this.feePayWarnsSelection = val
    },
    clickDeleteFeePayWarn() {
      if (this.feePayWarnsSelection.length > 0) {
        // this.showFeePayWarnDeletePopup = true
        this.feePayWarnsSelection.forEach(item => {
          for (let i = 0; i < this.feePayWarns.length; i++) {
            if (this.feePayWarns[i] === item) {
              this.feePayWarns.splice(i, 1)
              break
            }
          }
        })
        this.feePayWarnsSelection = []
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedFeePayWarn() {
      this.feePayWarnsSelection.forEach(item => {
        for (let i = 0; i < this.feePayWarns.length; i++) {
          if (this.feePayWarns[i] === item) {
            this.feePayWarns.splice(i, 1)
            break
          }
        }
      })
      this.feePayWarnsSelection = []
    }
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
