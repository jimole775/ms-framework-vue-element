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
              <el-form-item label="预计发货日期" prop="preShipDate">
                <el-date-picker
                  v-model="formData.preShipDate"
                  :disabled="true"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="大区" prop="superOrgId">
                <el-input-number v-model="formData.superOrgId" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="大区" prop="superOrgCode">
                <el-input v-model="formData.superOrgCode" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="大区" prop="superOrgName">
                <el-input v-model="formData.superOrgName" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" prop="custName">
                <el-input v-model="formData.custName" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出货预告号" prop="warnId">
                <el-input-number v-model="formData.warnId" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出货预告号" prop="warnNo">
                <el-input v-model="formData.warnNo" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="PI号" prop="piNo">
                <el-input v-model="formData.piNo" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="金额" prop="amt">
                <el-input-number v-model="formData.amt" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="其他" prop="otherAmt">
                <el-input-number v-model="formData.otherAmt" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="应付金额" prop="payAmt">
                <el-input-number v-model="formData.payAmt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已预提金额" prop="ytedAmt">
                <el-input-number v-model="formData.ytedAmt" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已支付金额" prop="payedAmt">
                <el-input-number v-model="formData.payedAmt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发票号" prop="fpNo">
                <el-input v-model="formData.fpNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="商业发票号" prop="regNo">
                <el-input v-model="formData.regNo" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="note">
                <el-input v-model="formData.note" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已预提" prop="isYt">
                <el-switch v-model="formData.isYt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已特殊处理" prop="isTs">
                <el-switch v-model="formData.isTs" size="mini" />
              </el-form-item>
            </el-col>
            
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import freightPayWarnServer from './../../../api/freightPayWarnServer'

const emptyFormData = {
  preShipDate: null,
  superOrgId: null,
  superOrgCode: null,
  superOrgName: null,
  custName: null,
  warnId: null,
  warnNo: null,
  piNo: null,
  amt: null,
  otherAmt: null,
  payAmt: null,
  ytedAmt: null,
  payedAmt: null,
  fpNo: null,
  regNo: null,
  note: null,
  isYt: null,
  isTs: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'FreightPayWarnEdit',
  components: {
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
        preShipDate: [
        ],
        superOrgId: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        superOrgCode: [
        ],
        superOrgName: [
        ],
        custName: [
        ],
        warnId: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        warnNo: [
        ],
        piNo: [
        ],
        amt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        otherAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        payAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        ytedAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        payedAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        fpNo: [
        ],
        regNo: [
        ],
        note: [
        ],
        isYt: [
        ],
        isTs: [
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
      const res = await freightPayWarnServer.get(this.id)
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
              await freightPayWarnServer.put(this.formData)
            } else {
              const res = await freightPayWarnServer.post(this.formData)
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
