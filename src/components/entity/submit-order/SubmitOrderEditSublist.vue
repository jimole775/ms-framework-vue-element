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
            <el-form-item label="商业发票号" prop="invoiceId">
              <CommercialInvoiceSelect
                :merging-split-type="3"
                v-model="formData.invoiceId"
                :disabled="dis.invoiceId"
                @changeData="changeCommercialInvoice"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="id" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="交单登记号" prop="billNo">
              <el-input v-model="formData.billNo" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col v-if="id" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="单证人员" prop="createUser">
              <el-input v-model="formData.createUser" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col v-if="id" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="制单时间" prop="createDate">
              <el-date-picker
                v-model="formData.createDate"
                :disabled="true"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="状态" prop="stat">
              <SubmitOrderOrderStatusEnumSelect v-model="formData.stat" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发票流水号" prop="invoiceNo">
              <el-input v-model="formData.invoiceNo" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发票金额" prop="invoiceAmt">
              <el-input-number
                v-model="formData.invoiceAmt"
                :precision="2"
                :min="0"
                :disabled="true"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="付款方式" prop="paymentTypeName">
              <el-input v-model="formData.paymentTypeName" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="部门" prop="orgId">
              <DepartmentSelect v-model="formData.orgId" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户" prop="custId">
              <CustomerSelect v-model="formData.custId" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="合同号" prop="pinoNew">
              <el-input v-model="formData.pinoNew" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="改单次数" prop="qty1">
              <el-input-number v-model="formData.qty1" :disabled="true" :min="0" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="交单人" prop="jdMan">
              <el-input v-model="formData.jdMan" :disabled="dis.jdMan" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="交单时间" prop="jdDate">
              <el-date-picker
                v-model="formData.jdDate"
                :disabled="dis.jdDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>

          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="交单发票号" prop="jdInvoiceNo">
              <el-input v-model="formData.jdInvoiceNo" :disabled="dis.jdInvoiceNo" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="开船日期" prop="kcDate">
              <el-date-picker
                v-model="formData.kcDate"
                :disabled="dis.kcDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="制单票数" prop="qty2">
              <!-- <el-input-number v-model="formData.qty2" size="mini"/> -->
              <el-input v-model.number="formData.qty2" :disabled="dis.qty2" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col v-show="formData.qty2>2" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="交单金额" prop="jdTotalamt">
              <el-input-number v-model="formData.jdTotalamt" :precision="2" :min="0" :disabled="dis.jdTotalamt" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col v-show="formData.qty2<=2" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="交单金额" prop="jdTotalamt">
              <el-input-number v-model="formData.jdTotalamt" :precision="2" :min="0" :disabled="dis.jdTotalamt" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="快递单号" prop="ktOrder">
              <el-input v-model="formData.ktOrder" :disabled="dis.ktOrder" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="制单状态" prop="jdStat">
              <SubmitOrderStatusEnumSelect v-model="formData.jdStat" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item label="备注" prop="note">
              <el-input 
                v-model="formData.note" 
                :disabled="dis.note" 
                type="textarea"
                rows="2"
                size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="到港日期" prop="dgDate">
              <el-date-picker
                v-model="formData.dgDate"
                :disabled="dis.dgDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="特殊单据号" prop="billsNo">
              <el-input v-model="formData.billsNo" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="信用证号" prop="lcNo">
              <el-input v-model="formData.lcNo" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="交单行" prop="jdBank">
              <BankNameSelect v-model="formData.jdBank" :disabled="dis.jdBank"/>
            </el-form-item>
          </el-col>
          <el-col v-show="!formData.lcBillId" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item prop="jdStyle" label="寄单方式">
              <el-input v-model="formData.jdStyle" :disabled="dis.jdStyle" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col v-show="formData.lcBillId" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="寄单方式" prop="jdStyle">
              <el-input v-model="formData.jdStyle" :disabled="dis.jdStyle" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="预计收汇日期" prop="preReturnDate">
              <el-date-picker
                v-model="formData.preReturnDate"
                :disabled="dis.preReturnDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="交单不符点" prop="jdNote">
              <el-input v-model="formData.jdNote" :disabled="dis.jdNote" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col v-if="id" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="文件归档信息" prop="filePlace">
              <el-input v-model="formData.filePlace" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="提单号" prop="tdOrder">
              <el-input v-model="formData.tdOrder" :disabled="dis.tdOrder" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="提单日期" prop="tdDate">
              <el-date-picker
                v-model="formData.tdDate"
                :disabled="dis.tdDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="提单收到日期" prop="tdReciveDate">
              <el-date-picker
                v-model="formData.tdReciveDate"
                :disabled="dis.tdReciveDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="收汇日期" prop="returnDate">
              <el-date-picker
                v-model="formData.returnDate"
                :disabled="true"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="收汇金额" prop="returnAmt">
              <el-input-number
                v-model="formData.returnAmt"
                :precision="2"
                :min="0"
                :disabled="true"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="投保日期" prop="tbDate">
              <el-date-picker
                v-model="formData.tbDate"
                :disabled="true"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="投保金额" prop="tbAmt">
              <el-input-number
                v-model="formData.tbAmt"
                :precision="2"
                :min="0"
                :disabled="true"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="不一致原因" prop="notNote">
              <el-input v-model="formData.notNote" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="交单前检查" prop="jdCheck">
              <el-input v-model="formData.jdCheck" :disabled="dis.jdCheck" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="开证行不符点" prop="kzhBfd">
              <el-input v-model="formData.kzhBfd" :disabled="dis.kzhBfd" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出单单号" prop="cdOrder">
              <el-input v-model="formData.cdOrder" :disabled="dis.cdOrder" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="快递签收日期" prop="kdReciveDate">
              <el-date-picker
                v-model="formData.kdReciveDate"
                :disabled="dis.kdReciveDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="票数" prop="qty3">
              <el-input-number v-model="formData.qty3" :disabled="dis.qty3" :min="0" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="银行通知编号" prop="bankOrder">
              <el-input v-model="formData.bankOrder" :disabled="dis.bankOrder" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="承兑日期" prop="cdDate">
              <el-date-picker
                v-model="formData.cdDate"
                :disabled="dis.cdDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="融资类型" prop="rongziType">
              <SubmitOrderFinancingTypeEnumSelect v-model="formData.rongziType" :disabled="dis.rongziType"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="融资银行" prop="rongziBank">
              <el-input v-model="formData.rongziBank" :disabled="dis.rongziBank" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="融资金额" prop="rongziAmt">
              <el-input-number v-model="formData.rongziAmt" :precision="2" :min="0" :disabled="dis.rongziAmt" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="融资利率" prop="rongziLl">
              <el-input-number v-model="formData.rongziLl" :precision="2" :min="0" :disabled="dis.rongziLl" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="融资日期" prop="rongziDate">
              <el-date-picker
                v-model="formData.rongziDate"
                :disabled="dis.rongziDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="融资天数" prop="rongziDays">
              <el-input-number v-model="formData.rongziDays" :min="0" :disabled="dis.rongziDays" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="融资利息" prop="rongziLx">
              <el-input-number v-model="formData.rongziLx" :precision="2" :min="0" :disabled="dis.rongziLx" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="是否出错" prop="isWrong">
              <el-switch v-model="formData.isWrong" :disabled="dis.isWrong" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        v-if="formData.id && submitOrderItems.length > 0"
        :data="submitOrderItems"
        :loading="loading"
        class="m-t-12"
        border
      >
        <el-table-column type="index" label="序号" width="50"/>
        <el-table-column prop="jdInvoiceNo" sortable width="180" label="交单发票号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.jdInvoiceNo" :disabled="itemDis.jdInvoiceNo" required size="mini"/>
          </template>
        </el-table-column>
        <el-table-column prop="jdAmt" sortable width="190" label="交单金额">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.jdAmt" :precision="2" :min="0" :disabled="itemDis.jdAmt" size="mini" required/>
          </template>
        </el-table-column>
        <el-table-column prop="currencyCode" sortable width="210" label="币种">
          <template slot-scope="scope">
            <CurrencySelect
              v-model="scope.row.currencyCode"
              :index="scope.$index"
              :disabled="itemDis.currencyCode"
              @changeData="changeCurrency"
            />
          </template>
        </el-table-column>
        <el-table-column prop="lcNo" sortable width="180" label="信用证号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lcNo" :disabled="itemDis.lcNo" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column prop="tdOrder" sortable width="180" label="提单号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.tdOrder" :disabled="itemDis.tdOrder" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column prop="tdDate" sortable width="240" label="提单日期">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.tdDate"
              :disabled="itemDis.tdDate"
              type="datetime"
              placeholder="选择日期时间"
              size="mini"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </template>
        </el-table-column>
        <el-table-column prop="jdNote" sortable width="180" label="交单不符点">
          <template slot-scope="scope">
            <el-input v-model="scope.row.jdNote" :disabled="itemDis.jdNote" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column prop="jdCheck" sortable width="180" label="交单前检查">
          <template slot-scope="scope">
            <el-input v-model="scope.row.jdCheck" :disabled="itemDis.jdCheck" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column prop="kzhBfd" sortable width="180" label="开证行不符点">
          <template slot-scope="scope">
            <el-input v-model="scope.row.kzhBfd" :disabled="itemDis.kzhBfd" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column prop="cdDate" sortable width="240" label="承兑日期">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.cdDate"
              :disabled="itemDis.cdDate"
              type="datetime"
              placeholder="选择日期时间"
              size="mini"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </template>
        </el-table-column>
        <el-table-column prop="bankOrder" sortable width="180" label="银行通知编码">
          <template slot-scope="scope">
            <el-input v-model="scope.row.bankOrder" :disabled="itemDis.bankOrder" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column prop="cdOrder" sortable width="180" label="出单单号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.cdOrder" :disabled="itemDis.cdOrder" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column prop="kdReciveDate" sortable width="240" label="快递签收日期">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.kdReciveDate"
              :disabled="itemDis.kdReciveDate"
              type="datetime"
              placeholder="选择日期时间"
              size="mini"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </template>
        </el-table-column>
        <el-table-column prop="note" sortable width="180" label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.note" :disabled="itemDis.note" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column prop="jdBank" sortable width="210" label="交单行">
          <template slot-scope="scope">
            <BankNameSelect v-model="scope.row.jdBank" :disabled="itemDis.jdBank"/>
          </template>
        </el-table-column>
      </el-table>
      <el-tabs type="border-card">
        <el-tab-pane label="内部文件">
          <FileUpload :id="id" :tab="1" :bill-name="'交单登记单号'" :conceal="conceal" :form="'内部文件'"/>
        </el-tab-pane>
        <el-tab-pane label="外部文件">
          <FileUpload :id="id" :tab="2" :bill-name="'交单登记单号'" :form="'外部文件'" :astrict="astrict"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import creditCertificateServer from './../../../api/creditCertificateServer'
import commercialInvoiceServer from './../../../api/commercialInvoiceServer'
import submitOrderServer from './../../../api/submitOrderServer'
import validate from './../../../utils/validate'
import CommercialInvoiceSelect from './../commercial-invoice/CommercialInvoiceSelect'
import CreditCertificateSelect from './../credit-certificate/CreditCertificateSelect'
import BankNameSelect from './../bank/BankNameSelect'
import CustomerSelect from './../customer/CustomerSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import SubmitOrderOrderStatusEnumSelect from './../../../components/entity/submit-order/SubmitOrderOrderStatusEnumSelect'
import SubmitOrderStatusEnumSelect from './../../../components/entity/submit-order/SubmitOrderStatusEnumSelect'
import SubmitOrderFinancingTypeEnumSelect from './../../../components/entity/submit-order/SubmitOrderFinancingTypeEnumSelect'
import CurrencySelect from './../../../components/entity/currency/CurrencySelect'
import { getAccount } from '@/api/login'
const emptyFormData = {
  billId: null,
  billNo: null,
  createUser: null,
  createDate: null,
  stat: 1,
  factInvoiceNo: null,
  invoiceAmt: null,
  paymentTypeId: null,
  paymentTypeCode: null,
  paymentTypeName: null,
  orgId: null,
  orgName: null,
  custId: null,
  custName: null,
  pinoNew: null,
  qty1: null,
  jdMan: null,
  jdDate: null,
  jdTotalamt: null,
  jdInvoiceNo: null,
  kcDate: null,
  qty2: null,
  ktOrder: null,
  jdStat: 1,
  note: null,
  dgDate: null,
  billsNo: null,
  preReturnDate: null,
  jdNote: null,
  filePlace: null,
  tdOrder: null,
  tdDate: null,
  tdReciveDate: null,
  returnDate: null,
  returnAmt: null,
  tbDate: null,
  tbAmt: null,
  notNote: null,
  jdCheck: null,
  kzhBfd: null,
  cdOrder: null,
  kdReciveDate: null,
  qty3: null,
  bankOrder: null,
  cdDate: null,
  rongziType: null,
  rongziBank: null,
  rongziAmt: null,
  rongziLl: null,
  rongziDate: null,
  rongziDays: null,
  rongziLx: null,
  isWrong: false,
  invoiceId: null,
  invoiceNo: null,
  lcBillId: null,
  jdBank: null,
  jdStyle: null
}
const submitOrderItemEmptyData = {
  jdInvoiceNo: null,
  jdAmt: null,
  currencyId: null,
  currencyCode: 'USD',
  currencyName: '美元',
  lcNo: null,
  tdOrder: null,
  tdDate: null,
  jdNote: null,
  jdCheck: null,
  kzhBfd: null,
  cdDate: null,
  bankOrder: null,
  cdOrder: null,
  kdReciveDate: null,
  note: null,
  jdBank: null
}
const submitOrderItemRules = {
  jdInvoiceNo: [],
  jdAmt: [
    { message: '交单金额 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  currencyCode: [],
  lcNo: [],
  tdOrder: [],
  tdDate: [],
  jdNote: [],
  jdCheck: [],
  kzhBfd: [],
  cdDate: [],
  bankOrder: [],
  cdOrder: [],
  kdReciveDate: [],
  note: [],
  jdBank: []
}

let initFormData = {
  ...emptyFormData
}
const initFormDis2 = {
  billId: false,
  billNo: false,
  createUser: false,
  createDate: false,
  stat: false,
  factInvoiceNo: false,
  invoiceAmt: false,
  paymentTypeId: false,
  paymentTypeCode: false,
  paymentTypeName: false,
  orgId: false,
  orgName: false,
  custId: false,
  custName: false,
  pinoNew: false,
  qty1: false,
  jdMan: false,
  jdDate: false,
  jdTotalamt: false,
  jdInvoiceNo: false,
  kcDate: false,
  qty2: false,
  ktOrder: false,
  jdStat: false,
  note: false,
  dgDate: false,
  billsNo: false,
  preReturnDate: false,
  jdNote: false,
  filePlace: false,
  tdOrder: false,
  tdDate: false,
  tdReciveDate: false,
  returnDate: false,
  returnAmt: false,
  tbDate: false,
  tbAmt: false,
  notNote: false,
  jdCheck: false,
  kzhBfd: false,
  cdOrder: false,
  kdReciveDate: false,
  qty3: false,
  bankOrder: false,
  cdDate: false,
  rongziType: false,
  rongziBank: false,
  rongziAmt: false,
  rongziLl: false,
  rongziDate: false,
  rongziDays: false,
  rongziLx: false,
  isWrong: false,
  invoiceId: false,
  invoiceNo: false,
  lcBillId: false,
  jdBank: false,
  jdStyle: false,
}
const initItemDis2 = {
  jdInvoiceNo: false,
  jdAmt: false,
  currencyId: false,
  currencyCode: false,
  currencyName: false,
  lcNo: false,
  tdOrder: false,
  tdDate: false,
  jdNote: false,
  jdCheck: false,
  kzhBfd: false,
  cdDate: false,
  bankOrder: false,
  cdOrder: false,
  kdReciveDate: false,
  note: false,
  jdBank: false
}
const initFormDis = {
  billId: false,
  billNo: false,
  createUser: false,
  createDate: false,
  stat: false,
  factInvoiceNo: false,
  invoiceAmt: false,
  paymentTypeId: false,
  paymentTypeCode: false,
  paymentTypeName: false,
  orgId: false,
  orgName: false,
  custId: false,
  custName: false,
  pinoNew: false,
  qty1: false,
  jdMan: false,
  jdDate: false,
  jdTotalamt: false,
  jdInvoiceNo: false,
  kcDate: false,
  qty2: false,
  ktOrder: false,
  jdStat: false,
  note: false,
  dgDate: false,
  billsNo: false,
  preReturnDate: false,
  jdNote: false,
  filePlace: false,
  tdOrder: false,
  tdDate: false,
  tdReciveDate: false,
  returnDate: false,
  returnAmt: false,
  tbDate: false,
  tbAmt: false,
  notNote: false,
  jdCheck: false,
  kzhBfd: false,
  cdOrder: false,
  kdReciveDate: false,
  qty3: false,
  bankOrder: false,
  cdDate: false,
  rongziType: false,
  rongziBank: false,
  rongziAmt: false,
  rongziLl: false,
  rongziDate: false,
  rongziDays: false,
  rongziLx: false,
  isWrong: false,
  invoiceId: false,
  invoiceNo: false,
  lcBillId: false,
  jdBank: false,
  jdStyle: false,
}
const initItemDis = {
  jdInvoiceNo: false,
  jdAmt: false,
  currencyId: false,
  currencyCode: false,
  currencyName: false,
  lcNo: false,
  tdOrder: false,
  tdDate: false,
  jdNote: false,
  jdCheck: false,
  kzhBfd: false,
  cdDate: false,
  bankOrder: false,
  cdOrder: false,
  kdReciveDate: false,
  note: false,
  jdBank: false
}
let initSubmitOrderItems = []
const rules = {
  billNo: [],
  createUser: [],
  createDate: [],
  stat: [],
  factInvoiceNo: [],
  invoiceAmt: [
    { type: 'number', message: '必须为数字', trigger: 'blur' }
  ],
  paymentTypeId: [],
  paymentTypeCode: [],
  paymentTypeName: [],
  orgId: [],
  orgCode: [],
  orgName: [],
  custId: [],
  custCode: [],
  custName: [],
  pinoNew: [],
  qty1: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  jdMan: [],
  jdDate: [{ required: true, message: '不能为空', trigger: 'change' }],
  jdTotalamt: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { type: 'number', message: '必须为数字', trigger: 'blur' }
  ],
  jdInvoiceNo: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  kcDate: [{ required: true, message: '不能为空', trigger: 'blur' }],
  qty2: [
    { required: true, message: '不能为空', trigger: 'blur' },
    // { type: 'number', message: '必须为数字', trigger: 'blur' }
    {
      trigger: 'blur',
      validator: (rule, value, callback) => {
        const isNum = /^[0-9]*$/
        if (!isNum.test(value)) {
          callback(new Error('制单票数只能为正整数'))
        }
        callback()
      }
    }
  ],
  ktOrder: [
    { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  jdStat: [],
  note: [
    {
      min: 0,
      max: 1024,
      message: '长度在 0 到 1024 个字符',
      trigger: 'blur'
    }
  ],
  dgDate: [{ required: true, message: '不能为空', trigger: 'blur' }],
  billsNo: [],
  preReturnDate: [],
  jdNote: [
    {
      min: 0,
      max: 512,
      message: '长度在 0 到 512 个字符',
      trigger: 'blur'
    }
  ],
  filePlace: [
    {
      min: 0,
      max: 512,
      message: '长度在 0 到 512 个字符',
      trigger: 'blur'
    }
  ],
  tdOrder: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  tdDate: [{ required: true, message: '不能为空', trigger: 'change' }],
  tdReciveDate: [
    { required: true, message: '不能为空', trigger: 'change' }
  ],
  returnDate: [],
  returnAmt: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  tbDate: [],
  tbAmt: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  notNote: [],
  jdCheck: [
    {
      min: 0,
      max: 1024,
      message: '长度在 0 到 1024 个字符',
      trigger: 'blur'
    }
  ],
  kzhBfd: [
    {
      min: 0,
      max: 1024,
      message: '长度在 0 到 1024 个字符',
      trigger: 'blur'
    }
  ],
  cdOrder: [
    { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  kdReciveDate: [],
  qty3: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  bankOrder: [
    { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  cdDate: [],
  rongziType: [],
  rongziBank: [],
  rongziAmt: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  rongziLl: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  rongziDate: [],
  rongziDays: [
    { type: 'number', message: '必须为数字', trigger: 'blur' }
  ],
  jdStyle: [],
  rongziLx: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
  isWrong: [],
  invoiceId: [{ required: true, message: '不能为空', trigger: 'change' }],
  lcBillId: [],
  jdBank: [{ required: true, message: '不能为空', trigger: 'change' }]
}

export default {
  name: 'SubmitOrderSublistEdit',
  components: {
    CommercialInvoiceSelect,
    CreditCertificateSelect,
    BankNameSelect,
    SubmitOrderOrderStatusEnumSelect,
    SubmitOrderStatusEnumSelect,
    CustomerSelect,
    DepartmentSelect,
    SubmitOrderFinancingTypeEnumSelect,
    CurrencySelect
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
      submitOrderItems: [],
      showSubmitOrderItemDeletePopup: false,
      conceal: false,
      astrict: true,
      dis: { ...initFormDis },
      itemDis: { ...initItemDis },
      rules: { ...rules }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
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
  async created() {
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
    if (this.formData.stat === 1) {
      this.dis = { ...initFormDis2 }
      this.itemDis = { ...initItemDis2 }
    }
    if (this.formData.stat === 1) {
      await getAccount().then(response => {
        this.formData.jdMan = response.data.data.userName
      })
    } 
  },
  methods: {
    changeCommercialInvoice(res) {
      if (res) {
        // 由发票流水号引入数据
        // 商业发票号
        this.formData.factInvoiceNo = res.factInvoiceNo
        // 发票金额
        this.formData.invoiceAmt = res.invoiceAmt
        // 付款方式
        this.formData.paymentTypeId = res.paymentTypeId
        this.formData.paymentTypeCode = res.paymentTypeCode
        this.formData.paymentTypeName = res.paymentTypeName
        // 部门
        this.formData.orgId = res.orgId
        this.formData.orgName = res.orgName
        // 客户
        this.formData.custId = res.custId
        this.formData.custName = res.custName
        // 合同
        this.formData.pinoNew = res.pinoNew
        // 收汇日期
        this.formData.preReturnDate = res.preReturnDate
        // 信用证号
        this.formData.lcBillId = res.lcBillId
        // 收汇金额
        this.formData.returnAmt = res.returnAmt
        // 投保日期
        this.formData.tbDate = res.tbDate
        // 投保金额
        this.formData.tbAmt = res.tbAmt
        // 发票流水号
        this.formData.invoiceNo = res.invoiceNo
        // 投保金额不一致原因
        this.formData.notNote = res.tbYy
        // 交单发票号
        this.formData.jdInvoiceNo = res.factInvoiceNo
        this.formData.invoiceNo = res.invoiceNo
        // 特殊单据号
        this.setBillsNo(res.factInvoiceNo)
        // this.changeIcBillId()
      }
    },
    async changeIcBillId() {
      const id = this.formData.lcBillId
      const data = {
        keyword: { id },
        page: 0,
        size: 20
      }
      const res = await creditCertificateServer.search(data)
      this.formData.lcNo = res.data[0].code
      this.validRelativeField()
    },
    async setBillsNo(factInvoiceNo) {
      const res = await submitOrderServer.getBillsNo(factInvoiceNo)
      const resData = await submitOrderServer.getTdfdByFactInvoiceNo(factInvoiceNo)
      this.formData.billsNo = res
      this.formData.tdOrder = resData.tdOrder
      this.formData.billsNo = resData.billsNo
      this.formData.kcDate = resData.kcDate
      this.formData.tdDate = resData.tdDate
      this.formData.qty1 = resData.qty1
      if (resData.billFinacing) {
        this.formData.rongziType = resData.billFinacing.rongziType
        this.formData.rongziBank = resData.billFinacing.rongziBank
        this.formData.rongziAmt = parseFloat(resData.billFinacing.rongziAmt)
        this.formData.rongziLl = resData.billFinacing.rongziRate
        this.formData.rongziDate = resData.billFinacing.rongziDatetime
        this.formData.rongziDays = resData.billFinacing.rongziDays 
        this.formData.rongziLx = resData.billFinacing.rongziLx
      }
    },
    changeCurrency(res) {
      this.submitOrderItems[res.$index].currencyName = res.name
    },
    close() {
      this.$emit('close')
    },
    validRelativeField() {
      // 有信用证号的单据，交单行字段为必填字段，寄单方式字段可不填
      // 没有信用证的单据，交单行字段可不填，寄单方式字段必填
      if (this.formData.lcBillId && this.formData.lcBillId !== '0') {
        this.rules.jdStyle = []
        this.rules.jdBank = [{ required: true, message: '不能为空', trigger: 'blur' }]
      } else {
        this.rules.jdStyle = [{ required: true, message: '不能为空', trigger: 'blur' }]
        this.rules.jdBank = []
      }
    },
    async getData() {
      this.loading = true
      try {
        const res = await submitOrderServer.get(this.formData.id)
        this.formData = {
          ...res
        }
        this.formData.id = res.billId
        initFormData = {
          ...this.formData
        }
        if (res.stat !== 1) {
          Object.keys(initFormDis).forEach(key => {
            initFormDis[key] = true
          })
          this.dis = { ...initFormDis }
          Object.keys(initItemDis).forEach(key => {
            initItemDis[key] = true
          })
          this.itemDis = { ...initItemDis }
        } 
        initSubmitOrderItems = res.lines
        this.submitOrderItems = [...initSubmitOrderItems]
        this.loading = false
        if (this.formData.stat === 5) {
          this.conceal = true
        }
        if (this.$store.getters.userCode === '龚霞' || this.$store.getters.userCode === '鲍幼晶') {
          this.astrict = false
        }

        this.validRelativeField()
      } catch (e) {
        this.loading = false
      }
    },
    hasRequiredFieldsEmpty(item) {
      let result = false
      // 验证每条明细的 “交单发票号” 和 “交单金额” 不可为空
      if (!item.jdInvoiceNo || !item.jdAmt) {
        result = true
      }
      return result
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {            
            const submitOrderItems = this.submitOrderItems
            for (let i = 0; i < submitOrderItems.length; i++) {
              const error = validate.dataObjectValidate(
                submitOrderItems[i],
                submitOrderItemRules
              )              
              const isEmpty = this.hasRequiredFieldsEmpty(submitOrderItems[i])
              if (error || isEmpty) {
                const msg = error ? error[Object.keys(error)[0]][0].message : '"交单发票号" 或 "交单金额" 不可为空'
                this.$message({
                  message: `交单登记明细 第 ${i + 1} 行 ${msg}`,
                  type: 'warning',
                  duration: 3000
                })
                return reject('error submit!!')
              }
            }
            try {
              if (this.formData.id) {
                this.formData.billId = this.formData.id
                this.formData.bill_id = this.formData.id
                const lines = []
                if (this.formData.qty2 > 1) {
                  let diff = this.formData.qty2 - this.submitOrderItems.length
                  if (diff > 0) {
                    // 增加子表数据
                    for (let i = 0; i < diff; i++) {
                      lines.push({ ...submitOrderItemEmptyData })
                    }
                  }
                  if (diff < 0) {
                    // 删除多出来的子表数据
                    for (
                      let i = this.submitOrderItems.length - 1;
                      i >= 0;
                      i--
                    ) {
                      if (diff < 0) {
                        this.submitOrderItems[i].deleted = 1
                        diff++
                      }
                    }
                  }
                } else {
                  // 删除所有子表数据
                  this.submitOrderItems.forEach(element => {
                    element.deleted = 1
                  })
                }
                this.formData.lines = lines
                this.formData.lineUpd = this.submitOrderItems          
                await submitOrderServer.put(this.formData)
                // this.getData()
              } else {
                if (this.formData.qty2 > 1) {
                  for (let i = 0; i < this.formData.qty2; i++) {
                    this.submitOrderItems.push({ ...submitOrderItemEmptyData })
                  }
                }
                this.formData.lines = this.submitOrderItems
                this.formData.entid = this.$store.getters.entid  
                const res = await submitOrderServer.post(this.formData)
                // if (Number.parseInt(res.data.code) === 200) {
                //   // 新增保存成功后清空表单数据
                //   // this.formData = { ...emptyFormData }
                // }
                this.formData.id = res.data.data.dataSet.rows[0].bill_id
                // this.getData()
                // this.$router.push({
                //   path: './' + res.data.data.dataSet.rows[0].bill_id
                // })
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
    del() {
      this.$confirm('确定要删除当前表单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        submitOrderServer.delete(this.formData.id).then(() => {
          this.$message({
            message: `删除 ${this.formData.id} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'SubmitOrderSublistEdit')
        })
      })
    },
    // 跳转提单放单
    async goToBillDocuments() {
      if (this.formData.factInvoiceNo) {
        const data = {
          invoiceNo: this.formData.factInvoiceNo
        }
        const res = await commercialInvoiceServer.getTDFD(data)
        if (Number.parseInt(res.data.code) === 200) {
          if (res.data.data !== undefined || res.data.data != null) {
            this.$router.push({
              path:
                '/DZ-manage/submit-amend/order-notice/edit/' +
                res.data.data
            })
          } else {
            this.$message({
              message: '没找到对应的提单放单数据，无法跳转！',
              type: 'warning'
            })
          }
        }
      } else {
        this.$message({
          message: '请先选择商业发票号',
          type: 'warning'
        })
      }
    },
    // 跳转特殊单据
    async goToSpecialDocuments() {
      if (this.formData.factInvoiceNo) {
        const data = {
          invoiceNo: this.formData.factInvoiceNo
        }
        const res = await commercialInvoiceServer.getBillsId(data)
        if (Number.parseInt(res.data.code) === 200) {
          if (res.data.data !== undefined || res.data.data != null) {
            this.$router.push({
              path:
                '/DZ-manage/invoice-manage/irregular-invoice/edit/' +
                res.data.data
            })
          } else {
            this.$message({
              message: '没找到对应的特殊申请单数据，无法跳转！',
              type: 'warning'
            })
          }
        } else {
          this.$message.error(res.data.msg)
        }
      } else {
        this.$message({
          message: '请先选择商业发票号',
          type: 'warning'
        })
      }
    },
    async emitEvent(event) {
      switch (event.key) {
        case 'saveFormData':
          this.save()
          break
        case 'resetData':
          this.resetData()
          break
        case 'update':
          this.getData()
          break
        case 'del':
          this.del()
          break
        case 'shareProcessInfo':
          this.shareProcessInfo(event.params.info)
          break
        case 'goToSpecialDocuments':
          // 跳转特殊单据
          this.goToSpecialDocuments()
          break
        case 'goToBillDocuments':
          // 跳转提单放单
          this.goToBillDocuments()
          break
        case 'agreeProcess':
          return this.newAgreeProcess()
        case 'startProcess':
          // 跳转提单放单
          await this.save()
          break
        default:
          break
      }
    },
    async newAgreeProcess() {
      return new Promise(async(resolve, reject) => {
        this.formData.lines = this.submitOrderItems
        if (JSON.stringify(initFormData) !== JSON.stringify(this.formData)) {
          // 如果当前表单数据与初始化数据不同，提示要先保存
          this.$confirm('是否确认提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async() => {
              // 同意保存，执行保存动作
              try {
                resolve(await this.saveBeforeStart())
              } catch (e) {
                reject(e)
              }
            })
            .catch(() => {
              // 不同意保存，断开流程
              reject()
            })
        } else {
          // 如果当前表单数据与初始化数据相同
          resolve()
        }
      })
    },
    async saveBeforeStart() {
      return new Promise(async(resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            try {
              const submitOrderItems = this.submitOrderItems
              for (let i = 0; i < submitOrderItems.length; i++) {
                const error = validate.dataObjectValidate(
                  submitOrderItems[i],
                  submitOrderItemRules
                )              
                const isEmpty = this.hasRequiredFieldsEmpty(submitOrderItems[i])
                if (error || isEmpty) {
                  const msg = error ? error[Object.keys(error)[0]][0].message : '"交单发票号" 或 "交单金额" 不可为空'
                  this.$message({
                    message: `交单登记明细 第 ${i + 1} 行 ${msg}`,
                    type: 'warning',
                    duration: 3000
                  })
                  return reject('error submit!!')
                }
              }
              this.formData.billId = this.formData.id
              this.formData.bill_id = this.formData.id
              const lines = []
              if (this.formData.qty2 > 1) {
                let diff = this.formData.qty2 - this.submitOrderItems.length
                if (diff > 0) {
                  // 增加子表数据
                  for (let i = 0; i < diff; i++) {
                    lines.push({ ...submitOrderItemEmptyData })
                  }
                }
                if (diff < 0) {
                  // 删除多出来的子表数据
                  for (
                    let i = this.submitOrderItems.length - 1;
                    i >= 0;
                    i--
                  ) {
                    if (diff < 0) {
                      this.submitOrderItems[i].deleted = 1
                      diff++
                    }
                  }
                }
              } else {
                // 删除所有子表数据
                this.submitOrderItems.forEach(element => {
                  element.deleted = 1
                })
              }
              this.formData.lines = lines
              this.formData.lineUpd = this.submitOrderItems          
              const res = submitOrderServer.put(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                initFormData = {
                  ...this.formData
                }
              } else {
                reject()
                return
              }
            } catch (e) {
              this.$message({
                message: '保存失败 ' + e.message,
                type: 'error',
                duration: 5000
              })
              reject()
              return
            }
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            resolve()
          } else {
            if (this.editConsignor || this.editMessage) {
              this.$message({
                message: '请将单据信息中的资料填写完全',
                type: 'warning'
              })
            } else {
              this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            }
            reject()
          }
        })
      })
    },
    shareProcessInfo(data) {
      this.processInfo = data
      if (data.nodeInfo && data.nodeInfo.length > 0) {
        if (data.nodeInfo[2].status === 'awaiting_check') {
          // 第四个节点时以下字段可编辑
          initFormDis.kdReciveDate = false
          initFormDis.qty2 = false
          initFormDis.bankOrder = false
          initFormDis.rongziType = false
          initFormDis.rongziBank = false
          initFormDis.rongziAmt = false
          initFormDis.rongziLl = false
          initFormDis.rongziDate = false
          initFormDis.rongziDays = false
          initFormDis.rongziLx = false
          this.dis = { ...initFormDis }
        }
        if (data.nodeInfo[3].status === 'awaiting_check') {
          // 第四个节点时票数字段可编辑
          initFormDis.qty2 = false
          this.dis = { ...initFormDis }
        }
      }
    },
    resetData() {
      if (this.formData.id) {
        this.formData = { ...initFormData }
        this.submitOrderItems = []
        this.getData()
      } else {
        this.formData = { ...initFormData }
        this.submitOrderItems = []
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
.el-table__body {
  padding-bottom: 12px;
}
/deep/.el-form-item__error {
  padding-top: 0;
}
</style>
