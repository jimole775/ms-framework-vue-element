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
              <el-form-item label="单据号" prop="payNo">
                <el-input v-model="formData.payNo" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="年份" required prop="payYear">
                <el-date-picker
                  v-model="formData.payYear"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="月份" required prop="payMonth">
                <el-date-picker
                  v-model="formData.payMonth"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="stat">
                <FeePayStatEnumSelect v-model="formData.stat" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="申请日期" prop="createDate">
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
              <el-form-item label="制单人" prop="createUser">
                <el-input v-model="formData.createUser" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="应付总额" prop="totalAmt">
                <el-input-number v-model="formData.totalAmt" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="财务复核总额" prop="totalCheckAmt">
                <el-input-number v-model="formData.totalCheckAmt" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="凭证号" prop="sapNo">
                <el-input v-model="formData.sapNo" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="银行码" prop="bankAccountNum">
                <el-input v-model="formData.bankAccountNum" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="帐号" prop="bankCode">
                <el-input v-model="formData.bankCode" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="持有人" prop="bankAccountOwer">
                <el-input v-model="formData.bankAccountOwer" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开户银行" prop="bankName">
                <el-input v-model="formData.bankName" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="币种" required prop="currency">
                <CurrencyEnumSelect v-model="formData.currency" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="费用类型" required prop="feeType">
                <el-input v-model="formData.feeType" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="付款方式" required prop="payType">
                <PayTypeEnumSelect v-model="formData.payType" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="预算内付款" prop="isYs">
                <el-switch v-model="formData.isYs" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同编号" prop="piNos">
                <el-input v-model="formData.piNos" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="支付公司" required prop="compCode">
                <CompCodeEnumSelect v-model="formData.compCode" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" required prop="note">
                <el-input v-model="formData.note" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="协议货代" required prop="transitId">
                <ShippingCompanySelect v-model="formData.transitId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="供应商" required prop="venderId">
                <CustomerSelect v-model="formData.venderId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import freightPayServer from './../../../api/freightPayServer'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import CustomerSelect from './../customer/CustomerSelect'

import FeePayStatEnumSelect from './../../../components/entity/freight-pay/FeePayStatEnumSelect'
import CurrencyEnumSelect from './../../../components/entity/freight-pay/CurrencyEnumSelect'
import PayTypeEnumSelect from './../../../components/entity/freight-pay/PayTypeEnumSelect'
import CompCodeEnumSelect from './../../../components/entity/freight-pay/CompCodeEnumSelect'
const emptyFormData = {
  payNo: null,
  payYear: null,
  payMonth: null,
  stat: null,
  createDate: null,
  createUser: null,
  totalAmt: null,
  totalCheckAmt: null,
  sapNo: null,
  bankAccountNum: null,
  bankCode: null,
  bankAccountOwer: null,
  bankName: null,
  currency: null,
  feeType: null,
  payType: null,
  isYs: null,
  piNos: null,
  compCode: null,
  note: null,
  transitId: null,
  venderId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'FreightPayEdit',
  components: {
    ShippingCompanySelect,
    CustomerSelect,
    FeePayStatEnumSelect,
    CurrencyEnumSelect,
    PayTypeEnumSelect,
    CompCodeEnumSelect,
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
        payNo: [
        ],
        payYear: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        payMonth: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        stat: [
        ],
        createDate: [
        ],
        createUser: [
        ],
        totalAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        totalCheckAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        sapNo: [
        ],
        bankAccountNum: [
        ],
        bankCode: [
        ],
        bankAccountOwer: [
        ],
        bankName: [
        ],
        currency: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        feeType: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        payType: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        isYs: [
        ],
        piNos: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        compCode: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        note: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        transitId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        venderId: [
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
      const res = await freightPayServer.get(this.id)
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
              await freightPayServer.put(this.formData)
            } else {
              const res = await freightPayServer.post(this.formData)
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
