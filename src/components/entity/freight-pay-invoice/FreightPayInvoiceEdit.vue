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
              <el-form-item label="发票号" prop="invoiceNo">
                <el-input v-model="formData.invoiceNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="应付金额" prop="amt">
                <el-input-number v-model="formData.amt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="其中税金" prop="tax">
                <el-input-number v-model="formData.tax" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="财务复核金额" prop="checkAmt">
                <el-input-number v-model="formData.checkAmt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出货预告号" prop="warnNo">
                <el-input v-model="formData.warnNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="PI号" prop="piNo">
                <el-input v-model="formData.piNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="费用登记日期" prop="payregCreateTime">
                <el-date-picker
                  v-model="formData.payregCreateTime"
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
              <el-form-item label="部门" prop="orgId">
                <DepartmentSelect v-model="formData.orgId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import freightPayInvoiceServer from './../../../api/freightPayInvoiceServer'
import DepartmentSelect from './../department/DepartmentSelect'

const emptyFormData = {
  invoiceNo: null,
  amt: null,
  tax: null,
  checkAmt: null,
  warnNo: null,
  piNo: null,
  payregCreateTime: null,
  note: null,
  orgId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'FreightPayInvoiceEdit',
  components: {
    DepartmentSelect,
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
        invoiceNo: [
        ],
        amt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        tax: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        checkAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        warnNo: [
        ],
        piNo: [
        ],
        payregCreateTime: [
        ],
        note: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        orgId: [
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
      const res = await freightPayInvoiceServer.get(this.id)
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
              await freightPayInvoiceServer.put(this.formData)
            } else {
              const res = await freightPayInvoiceServer.post(this.formData)
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
