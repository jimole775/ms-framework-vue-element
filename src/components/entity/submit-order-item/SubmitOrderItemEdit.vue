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
              <el-form-item label="交单发票号" prop="jdInvoiceNo">
                <el-input v-model="formData.jdInvoiceNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="交单金额" prop="jdAmt">
                <el-input-number v-model="formData.jdAmt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="币种" prop="currencyName">
                <CurrencyNameEnumSelect v-model="formData.currencyName" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信用证号" prop="lcNo">
                <el-input v-model="formData.lcNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="提单号" prop="tdOrder">
                <el-input v-model="formData.tdOrder" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="提单日期" prop="tdDate">
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
              <el-form-item label="交单不符点" prop="jdNote">
                <el-input v-model="formData.jdNote" size="mini" />
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
              <el-form-item label="银行通知编码" prop="bankOrder">
                <el-input v-model="formData.bankOrder" size="mini" />
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
              <el-form-item label="备注" prop="note">
                <el-input v-model="formData.note" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="交单行" prop="jdBankId">
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
import submitOrderItemServer from './../../../api/submitOrderItemServer'
import BankSelect from './../bank/BankSelect'

import CurrencyNameEnumSelect from './../../../components/entity/submit-order-item/CurrencyNameEnumSelect'
const emptyFormData = {
  jdInvoiceNo: null,
  jdAmt: null,
  currencyName: null,
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
  jdBankId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'SubmitOrderItemEdit',
  components: {
    BankSelect,
    CurrencyNameEnumSelect,
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
        jdInvoiceNo: [
        ],
        jdAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        currencyName: [
        ],
        lcNo: [
        ],
        tdOrder: [
        ],
        tdDate: [
        ],
        jdNote: [
        ],
        jdCheck: [
        ],
        kzhBfd: [
        ],
        cdDate: [
        ],
        bankOrder: [
        ],
        cdOrder: [
        ],
        kdReciveDate: [
        ],
        note: [
        ],
        jdBankId: [
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
      const res = await submitOrderItemServer.get(this.id)
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
              await submitOrderItemServer.put(this.formData)
            } else {
              const res = await submitOrderItemServer.post(this.formData)
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
