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
              <el-form-item label="支付对象" prop="payTarget">
                <ExpenseRecordItemPayTargetEnumSelect v-model="formData.payTarget" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发票号" prop="invoiceCode">
                <el-input v-model="formData.invoiceCode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发票日期" prop="invoiceDate">
                <el-date-picker
                  v-model="formData.invoiceDate"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="费用编码" prop="costCode">
                <el-input v-model="formData.costCode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="费用名称" prop="costName">
                <el-input v-model="formData.costName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="柜数" prop="containerNumber">
                <el-input-number v-model="formData.containerNumber" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="单柜费用" prop="containerCost">
                <el-input-number v-model="formData.containerCost" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="总费用" prop="amount">
                <el-input-number v-model="formData.amount" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="其中税金" prop="tax">
                <el-input-number v-model="formData.tax" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="总费用(RMB)" prop="amountRmb">
                <el-input-number v-model="formData.amountRmb" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="付款公司" prop="paymentCompany">
                <el-input v-model="formData.paymentCompany" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="原因" prop="causes">
                <el-input v-model="formData.causes" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="责任人" prop="thoseResponsible">
                <el-input v-model="formData.thoseResponsible" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否额外费用" prop="isAdditionalCharge">
                <el-switch v-model="formData.isAdditionalCharge" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="报告号" prop="reportCode">
                <el-input v-model="formData.reportCode" size="mini" />
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
              <el-form-item label="费用登记" prop="expenseRecordId">
                <ExpenseRecordSelect v-model="formData.expenseRecordId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="柜型" prop="containerId">
                <ContainerSelect v-model="formData.containerId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="货代公司" prop="freightForwardingCompanyId">
                <ShippingCompanySelect v-model="formData.freightForwardingCompanyId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="货币" required prop="currencyId">
                <CurrencySelect v-model="formData.currencyId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import expenseRecordItemServer from './../../../api/expenseRecordItemServer'
import ExpenseRecordSelect from './../expense-record/ExpenseRecordSelect'
import ContainerSelect from './../container/ContainerSelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import CurrencySelect from './../currency/CurrencySelect'

import ExpenseRecordItemPayTargetEnumSelect from './../../../components/entity/expense-record-item/ExpenseRecordItemPayTargetEnumSelect'
const emptyFormData = {
  payTarget: null,
  invoiceCode: null,
  invoiceDate: null,
  costCode: null,
  costName: null,
  containerNumber: null,
  containerCost: null,
  amount: null,
  tax: null,
  amountRmb: null,
  paymentCompany: null,
  causes: null,
  thoseResponsible: null,
  isAdditionalCharge: null,
  reportCode: null,
  remark: null,
  isDelete: null,
  expenseRecordId: null,
  containerId: null,
  freightForwardingCompanyId: null,
  currencyId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'ExpenseRecordItemEdit',
  components: {
    ExpenseRecordSelect,
    ContainerSelect,
    ShippingCompanySelect,
    CurrencySelect,
    ExpenseRecordItemPayTargetEnumSelect,
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
        payTarget: [
        ],
        invoiceCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        invoiceDate: [
        ],
        costCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        costName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        containerNumber: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        containerCost: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        amount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        tax: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        amountRmb: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        paymentCompany: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        causes: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        thoseResponsible: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        isAdditionalCharge: [
        ],
        reportCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        expenseRecordId: [
        ],
        containerId: [
        ],
        freightForwardingCompanyId: [
        ],
        currencyId: [
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
      const res = await expenseRecordItemServer.get(this.id)
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
              await expenseRecordItemServer.put(this.formData)
            } else {
              const res = await expenseRecordItemServer.post(this.formData)
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
