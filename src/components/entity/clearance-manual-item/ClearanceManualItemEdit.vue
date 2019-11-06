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
              <el-form-item label="记录号" prop="recordNo">
                <el-input-number v-model="formData.recordNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="商品编码" prop="itemHNode">
                <el-input v-model="formData.itemHNode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="商品名称" prop="itemHName">
                <el-input v-model="formData.itemHName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="规格型号" prop="spec">
                <el-input v-model="formData.spec" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="主料标志" prop="isMainMaterial">
                <el-switch v-model="formData.isMainMaterial" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="计量单位" prop="uom">
                <UomEnumSelect v-model="formData.uom" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="法定计量单位" prop="stdUom">
                <StdUomEnumSelect v-model="formData.stdUom" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="申报数量" prop="declareQty">
                <el-input-number v-model="formData.declareQty" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="申报单价" prop="declarePrice">
                <el-input-number v-model="formData.declarePrice" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="申报总价" prop="declareAmt">
                <el-input-number v-model="formData.declareAmt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="币值" prop="cny">
                <CnyEnumSelect v-model="formData.cny" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="美元总价" prop="dollarAmt">
                <el-input-number v-model="formData.dollarAmt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="比例因子" prop="stdUomFactor">
                <el-input v-model="formData.stdUomFactor" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="免征方案" prop="exemptionScheme">
                <el-input v-model="formData.exemptionScheme" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="note">
                <el-input v-model="formData.note" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="产销国" prop="proMarkingCountryId">
                <AreaSelect v-model="formData.proMarkingCountryId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clearanceManualItemServer from './../../../api/clearanceManualItemServer'
import AreaSelect from './../area/AreaSelect'

import UomEnumSelect from './../../../components/entity/clearance-manual-item/UomEnumSelect'
import StdUomEnumSelect from './../../../components/entity/clearance-manual-item/StdUomEnumSelect'
import CnyEnumSelect from './../../../components/entity/clearance-manual-item/CnyEnumSelect'
const emptyFormData = {
  recordNo: null,
  itemHNode: null,
  itemHName: null,
  spec: null,
  isMainMaterial: null,
  uom: null,
  stdUom: null,
  declareQty: null,
  declarePrice: null,
  declareAmt: null,
  cny: null,
  dollarAmt: null,
  stdUomFactor: null,
  exemptionScheme: null,
  note: null,
  proMarkingCountryId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'ClearanceManualItemEdit',
  components: {
    AreaSelect,
    UomEnumSelect,
    StdUomEnumSelect,
    CnyEnumSelect,
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
        recordNo: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        itemHNode: [
        ],
        itemHName: [
        ],
        spec: [
        ],
        isMainMaterial: [
        ],
        uom: [
        ],
        stdUom: [
        ],
        declareQty: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        declarePrice: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        declareAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        cny: [
        ],
        dollarAmt: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        stdUomFactor: [
        ],
        exemptionScheme: [
        ],
        note: [
        ],
        proMarkingCountryId: [
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
      const res = await clearanceManualItemServer.get(this.id)
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
              await clearanceManualItemServer.put(this.formData)
            } else {
              const res = await clearanceManualItemServer.post(this.formData)
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
