<template>
  <div class="max-w">
    <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
      <el-tab-pane label="基础">
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
              <el-form-item label="交单登记号" prop="billNo">
                <el-input v-model="formData.billNo" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="单证人员" prop="creator">
                <el-input v-model="formData.creator" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单时间" prop="createTime">
                <el-date-picker
                  v-model="formData.createTime"
                  :disabled="true"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="stat">
                <SubmitOrderOrderStatusEnumSelect v-model="formData.stat" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="商业发票号" prop="factInvoiceNo">
                <el-input v-model="formData.factInvoiceNo" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发票金额" prop="invoiceAmt">
                <el-input-number v-model="formData.invoiceAmt" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="付款方式" prop="paymentTypeId">
                <el-input v-model="formData.paymentTypeId" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="付款方式" prop="paymentTypeCode">
                <el-input v-model="formData.paymentTypeCode" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="付款方式" prop="paymentTypeName">
                <el-input v-model="formData.paymentTypeName" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="部门" prop="orgId">
                <el-input v-model="formData.orgId" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="部门" prop="orgCode">
                <el-input v-model="formData.orgCode" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="部门" prop="orgName">
                <el-input v-model="formData.orgName" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" prop="custId">
                <el-input v-model="formData.custId" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" prop="custCode">
                <el-input v-model="formData.custCode" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" prop="custName">
                <el-input v-model="formData.custName" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同号" prop="pinoNew">
                <el-input v-model="formData.pinoNew" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="改单次数" prop="qty1">
                <el-input-number v-model="formData.qty1" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="交单人" prop="jdMan">
                <el-input v-model="formData.jdMan" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="交单时间" required prop="jdDate">
                <el-date-picker
                  v-model="formData.jdDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="交单金额" required prop="jdTotalamt">
                <el-input-number v-model="formData.jdTotalamt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="交单发票号" prop="jdInvoiceNo">
                <el-input v-model="formData.jdInvoiceNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开船日期" prop="kcDate">
                <el-date-picker
                  v-model="formData.kcDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单票数" required prop="qty2">
                <el-input-number v-model="formData.qty2" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="快递单号" prop="ktOrder">
                <el-input v-model="formData.ktOrder" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单状态" prop="jdStat">
                <SubmitOrderStatusEnumSelect v-model="formData.jdStat" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="note">
                <el-input v-model="formData.note" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="到港日期" prop="dgDate">
                <el-date-picker
                  v-model="formData.dgDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="特殊单据号" prop="billsNo">
                <el-input v-model="formData.billsNo" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="预计收汇日期" prop="preReturnDate">
                <el-date-picker
                  v-model="formData.preReturnDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="交单不符点" prop="jdNote">
                <el-input v-model="formData.jdNote" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="文件归档信息" prop="filePlace">
                <el-input v-model="formData.filePlace" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="提单号" required prop="tdOrder">
                <el-input v-model="formData.tdOrder" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="提单日期" required prop="tdDate">
                <el-date-picker
                  v-model="formData.tdDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="提单收到日期" required prop="tdReciveDate">
                <el-date-picker
                  v-model="formData.tdReciveDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
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
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="收汇金额" prop="returnAmt">
                <el-input-number v-model="formData.returnAmt" :disabled="true" size="mini" />
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
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="投保金额" prop="tbAmt">
                <el-input-number v-model="formData.tbAmt" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="投保金额不一致原因" prop="notNote">
                <el-input v-model="formData.notNote" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="交单前检查" prop="jdCheck">
                <el-input v-model="formData.jdCheck" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证行不符点" prop="kzhBfd">
                <el-input v-model="formData.kzhBfd" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出单单号" prop="cdOrder">
                <el-input v-model="formData.cdOrder" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="快递签收日期" prop="kdReciveDate">
                <el-date-picker
                  v-model="formData.kdReciveDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="票数" prop="qty3">
                <el-input-number v-model="formData.qty3" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="银行通知编号" prop="bankOrder">
                <el-input v-model="formData.bankOrder" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="承兑日期" prop="cdDate">
                <el-date-picker
                  v-model="formData.cdDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资类型" prop="rongziType">
                <SubmitOrderFinancingTypeEnumSelect v-model="formData.rongziType" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资银行" prop="rongziBank">
                <el-input v-model="formData.rongziBank" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资金额" prop="rongziAmt">
                <el-input-number v-model="formData.rongziAmt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资利率" prop="rongziLl">
                <el-input-number v-model="formData.rongziLl" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资日期" prop="rongziDate">
                <el-date-picker
                  v-model="formData.rongziDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资天数" prop="rongziDays">
                <el-input-number v-model="formData.rongziDays" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资利息" prop="rongziLx">
                <el-input-number v-model="formData.rongziLx" size="mini" />
              </el-form-item>
            </el-col>

            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发票流水号" required prop="invoiceNoId">
                <CommercialInvoiceSelect v-model="formData.invoiceNoId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信用证号" prop="lcBillId">
                <CreditCertificateSelect v-model="formData.lcBillId" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="交单行" required prop="jdBankId">
                <BankSelect v-model="formData.jdBankId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import submitOrderServer from './../../../api/submitOrderServer'
import CommercialInvoiceSelect from './../commercial-invoice/CommercialInvoiceSelect'
import CreditCertificateSelect from './../credit-certificate/CreditCertificateSelect'
import BankSelect from './../bank/BankSelect'

import SubmitOrderOrderStatusEnumSelect from './../../../components/entity/submit-order/SubmitOrderOrderStatusEnumSelect'
import SubmitOrderStatusEnumSelect from './../../../components/entity/submit-order/SubmitOrderStatusEnumSelect'
import SubmitOrderFinancingTypeEnumSelect from './../../../components/entity/submit-order/SubmitOrderFinancingTypeEnumSelect'
const emptyFormData = {
  billNo: null,
  creator: null,
  createTime: null,
  stat: null,
  factInvoiceNo: null,
  invoiceAmt: null,
  paymentTypeId: null,
  paymentTypeCode: null,
  paymentTypeName: null,
  orgId: null,
  orgCode: null,
  orgName: null,
  custId: null,
  custCode: null,
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
  jdStat: null,
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
  invoiceNoId: null,
  lcBillId: null,
  jdBankId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'SubmitOrderEdit',
  components: {
    CommercialInvoiceSelect,
    CreditCertificateSelect,
    BankSelect,
    SubmitOrderOrderStatusEnumSelect,
    SubmitOrderStatusEnumSelect,
    SubmitOrderFinancingTypeEnumSelect,
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
      rules: {
        billNo: [
        ],
        creator: [
        ],
        createTime: [
        ],
        stat: [
        ],
        factInvoiceNo: [
        ],
        invoiceAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        paymentTypeId: [
        ],
        paymentTypeCode: [
        ],
        paymentTypeName: [
        ],
        orgId: [
        ],
        orgCode: [
        ],
        orgName: [
        ],
        custId: [
        ],
        custCode: [
        ],
        custName: [
        ],
        pinoNew: [
        ],
        qty1: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        jdMan: [
        ],
        jdDate: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        jdTotalamt: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        jdInvoiceNo: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        kcDate: [
        ],
        qty2: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        ktOrder: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        jdStat: [
        ],
        note: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        dgDate: [
        ],
        billsNo: [
        ],
        preReturnDate: [
        ],
        jdNote: [
          { min: 0, max: 512, message: '长度在 0 到 512 个字符', trigger: 'blur' },
        ],
        filePlace: [
          { min: 0, max: 512, message: '长度在 0 到 512 个字符', trigger: 'blur' },
        ],
        tdOrder: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        tdDate: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        tdReciveDate: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        returnDate: [
        ],
        returnAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        tbDate: [
        ],
        tbAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        notNote: [
        ],
        jdCheck: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        kzhBfd: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        cdOrder: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        kdReciveDate: [
        ],
        qty3: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        bankOrder: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        cdDate: [
        ],
        rongziType: [
        ],
        rongziBank: [
        ],
        rongziAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        rongziLl: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        rongziDate: [
        ],
        rongziDays: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        rongziLx: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        invoiceNoId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        lcBillId: [
        ],
        jdBankId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
    id(val) {
      if (val !== this.initFormData.id) {
        this.getData()
      }
    },
    loading(val) {
      this.$emit('loadingChange', val)
    }
  },
  created() {
    if (this.id) {
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
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      const res = await submitOrderServer.get(this.id)
      initFormData = res.data
      this.formData = {
        ...res.data
      }
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.id) {
              await submitOrderServer.put(this.formData)
            } else {
              const res = await submitOrderServer.post(this.formData)
              this.formData.id = res.data.id
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
    },
    resetData() {
      this.formData = {
        ...initFormData
      }
    },
    emitEvent({ key }) {
      switch (key) {
        case 'saveFormData':
          this.save()
          break
        case 'resetData':
          this.resetData()
          break
        case 'update':
          this.getData()
          break
        default:
          break
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
