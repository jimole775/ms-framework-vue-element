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
              <el-form-item label="输单日期" prop="inputDate">
                <el-date-picker
                  v-model="formData.inputDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出货预告id" prop="warnId">
                <el-input-number v-model="formData.warnId" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出货预告号" prop="warnNo">
                <el-input v-model="formData.warnNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同号" prop="piNo">
                <el-input v-model="formData.piNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="柜量" prop="boxQty">
                <el-input-number v-model="formData.boxQty" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="截关" prop="cutDate">
                <el-date-picker
                  v-model="formData.cutDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="币种" prop="currencyCode">
                <CurrencySelectEnumSelect v-model="formData.currencyCode" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="费用编码" prop="feeType">
                <el-input v-model="formData.feeType" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="金额" prop="amt">
                <el-input-number v-model="formData.amt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="原因" prop="reason">
                <el-input v-model="formData.reason" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="责任人" prop="resMan">
                <el-input v-model="formData.resMan" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="负责人" prop="responsibleLeader">
                <ResponsibleLeaderEnumSelect v-model="formData.responsibleLeader" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="责任体系" prop="responsibleOrg">
                <ResponsibleOrgEnumSelect v-model="formData.responsibleOrg" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="负激励" prop="negativeIncentive">
                <el-input-number v-model="formData.negativeIncentive" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="大区" prop="areaId">
                <AreaSelect v-model="formData.areaId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="部门" prop="orgId">
                <DepartmentSelect v-model="formData.orgId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="货代" prop="transitId">
                <ShippingCompanySelect v-model="formData.transitId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import extraFeeItemServer from './../../../api/extraFeeItemServer'
import AreaSelect from './../area/AreaSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'

import CurrencySelectEnumSelect from './../../../components/entity/extra-fee-item/CurrencySelectEnumSelect'
import ResponsibleLeaderEnumSelect from './../../../components/entity/extra-fee-item/ResponsibleLeaderEnumSelect'
import ResponsibleOrgEnumSelect from './../../../components/entity/extra-fee-item/ResponsibleOrgEnumSelect'
const emptyFormData = {
  inputDate: null,
  warnId: null,
  warnNo: null,
  piNo: null,
  boxQty: null,
  cutDate: null,
  currencyCode: null,
  feeType: null,
  amt: null,
  reason: null,
  resMan: null,
  responsibleLeader: null,
  responsibleOrg: null,
  negativeIncentive: null,
  areaId: null,
  orgId: null,
  transitId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'ExtraFeeItemEdit',
  components: {
    AreaSelect,
    DepartmentSelect,
    ShippingCompanySelect,
    CurrencySelectEnumSelect,
    ResponsibleLeaderEnumSelect,
    ResponsibleOrgEnumSelect,
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
        inputDate: [
        ],
        warnId: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        warnNo: [
        ],
        piNo: [
        ],
        boxQty: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        cutDate: [
        ],
        currencyCode: [
        ],
        feeType: [
        ],
        amt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        reason: [
        ],
        resMan: [
        ],
        responsibleLeader: [
        ],
        responsibleOrg: [
        ],
        negativeIncentive: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        areaId: [
        ],
        orgId: [
        ],
        transitId: [
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
      const res = await extraFeeItemServer.get(this.id)
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
              await extraFeeItemServer.put(this.formData)
            } else {
              const res = await extraFeeItemServer.post(this.formData)
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
