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
              <el-form-item label="单据号" required prop="code">
                <el-input v-model="formData.code" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="年份月份" required prop="yearMonth">
                <el-date-picker
                  v-model="formData.yearMonth"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="status">
                <FreightPayStatusEnumSelect v-model="formData.status" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="申请日期" prop="applyDate">
                <el-date-picker
                  v-model="formData.applyDate"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单人" prop="createOrderMan">
                <el-input v-model="formData.createOrderMan" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="应付总额" prop="amount">
                <el-input-number v-model="formData.amount" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="财务复核总额" prop="verifyAmount">
                <el-input-number v-model="formData.verifyAmount" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="凭证号" prop="credentials">
                <el-input v-model="formData.credentials" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="供应商" prop="supplier">
                <el-input v-model="formData.supplier" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="银行码" prop="bankCode">
                <el-input v-model="formData.bankCode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="帐号" prop="account">
                <el-input v-model="formData.account" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="持有人" prop="bankAccountMan">
                <el-input v-model="formData.bankAccountMan" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开户银行" prop="createAccountBank">
                <el-input v-model="formData.createAccountBank" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="费用类型" prop="costType">
                <el-input v-model="formData.costType" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="付款方式" prop="paymentMethod">
                <ShippingPayPaymentMethodEnumSelect v-model="formData.paymentMethod" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否预算内付款" prop="budget">
                <el-switch v-model="formData.budget" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同编号" prop="contractCode">
                <el-input v-model="formData.contractCode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="支付公司" prop="payCompany">
                <ShippingPayPayCompanyEnumSelect v-model="formData.payCompany" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否删除" prop="isDelete">
                <el-switch v-model="formData.isDelete" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="协议货代" prop="shippingCompanyId">
                <ShippingCompanySelect v-model="formData.shippingCompanyId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="币种" required prop="currencyId">
                <CurrencySelect v-model="formData.currencyId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="经营单位" prop="operateUnitId">
                <OperateUnitSelect v-model="formData.operateUnitId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import shippingPayServer from './../../../api/shippingPayServer'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import CurrencySelect from './../currency/CurrencySelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'

import FreightPayStatusEnumSelect from './../../../components/entity/shipping-pay/FreightPayStatusEnumSelect'
import ShippingPayPaymentMethodEnumSelect from './../../../components/entity/shipping-pay/ShippingPayPaymentMethodEnumSelect'
import ShippingPayPayCompanyEnumSelect from './../../../components/entity/shipping-pay/ShippingPayPayCompanyEnumSelect'
const emptyFormData = {
  code: null,
  yearMonth: null,
  status: null,
  applyDate: null,
  createOrderMan: null,
  amount: null,
  verifyAmount: null,
  credentials: null,
  supplier: null,
  bankCode: null,
  account: null,
  bankAccountMan: null,
  createAccountBank: null,
  costType: null,
  paymentMethod: null,
  budget: null,
  contractCode: null,
  payCompany: null,
  remark: null,
  isDelete: null,
  shippingCompanyId: null,
  currencyId: null,
  operateUnitId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'ShippingPayEdit',
  components: {
    ShippingCompanySelect,
    CurrencySelect,
    OperateUnitSelect,
    FreightPayStatusEnumSelect,
    ShippingPayPaymentMethodEnumSelect,
    ShippingPayPayCompanyEnumSelect,
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
        code: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        yearMonth: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        status: [
        ],
        applyDate: [
        ],
        createOrderMan: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        amount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        verifyAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        credentials: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        supplier: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        bankCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        account: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        bankAccountMan: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        createAccountBank: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        costType: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        paymentMethod: [
        ],
        budget: [
        ],
        contractCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        payCompany: [
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        shippingCompanyId: [
        ],
        currencyId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        operateUnitId: [
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
      const res = await shippingPayServer.get(this.id)
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
              await shippingPayServer.put(this.formData)
            } else {
              const res = await shippingPayServer.post(this.formData)
              this.formData.id = res.data.id
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
    },
    resetData() {
      this.formData = {
        ...initFormData
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
