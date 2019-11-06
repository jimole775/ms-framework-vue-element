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
              <el-form-item label="费用明细" required prop="freightStandardContainerCostDetail">
                <FreightStandardContainerCostDetailEnumSelect v-model="formData.freightStandardContainerCostDetail" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="有效期开始时间" prop="startTime">
                <el-date-picker
                  v-model="formData.startTime"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="有效期结束时间" prop="endTime">
                <el-date-picker
                  v-model="formData.endTime"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="20GP" prop="specGp20">
                <el-input-number v-model="formData.specGp20" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="40GP" prop="specGp40">
                <el-input-number v-model="formData.specGp40" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="40HQ" prop="specHq40">
                <el-input-number v-model="formData.specHq40" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="45HQ" prop="specHq45">
                <el-input-number v-model="formData.specHq45" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="拼箱" prop="mergeContainer">                
                <el-input-number
                  v-model="formData.mergeContainer"
                  :min="-999999999.99"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
                <!-- <el-input-number v-model="formData.mergeContainer" size="mini" /> -->
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="空运" prop="airTransportation">
                <el-input-number v-model="formData.airTransportation" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="一卡一车" prop="oneContainer">
                <el-input-number v-model="formData.oneContainer" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="两卡一车" prop="towContainer">
                <el-input-number v-model="formData.towContainer" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="三卡一车" prop="threeContainer">
                <el-input-number v-model="formData.threeContainer" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否删除" prop="isDelete">
                <el-switch v-model="formData.isDelete" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="船务公司" prop="shippingCompanyId">
                <ShippingCompanySelect v-model="formData.shippingCompanyId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="包干费用标准" prop="freightStandardId">
                <FreightStandardSelect v-model="formData.freightStandardId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import freightStandardContainerServer from './../../../api/freightStandardContainerServer'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import FreightStandardSelect from './../freight-standard/FreightStandardSelect'

import FreightStandardContainerCostDetailEnumSelect from './../../../components/entity/freight-standard-container/FreightStandardContainerCostDetailEnumSelect'
const emptyFormData = {
  freightStandardContainerCostDetail: null,
  startTime: null,
  endTime: null,
  specGp20: null,
  specGp40: null,
  specHq40: null,
  specHq45: null,
  mergeContainer: null,
  airTransportation: null,
  oneContainer: null,
  towContainer: null,
  threeContainer: null,
  isDelete: null,
  shippingCompanyId: null,
  freightStandardId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'FreightStandardContainerEdit',
  components: {
    ShippingCompanySelect,
    FreightStandardSelect,
    FreightStandardContainerCostDetailEnumSelect,
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
        freightStandardContainerCostDetail: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        startTime: [
        ],
        endTime: [
        ],
        specGp20: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        specGp40: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        specHq40: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        specHq45: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        mergeContainer: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        airTransportation: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        oneContainer: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        towContainer: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        threeContainer: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        isDelete: [
        ],
        shippingCompanyId: [
        ],
        freightStandardId: [
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
      const res = await freightStandardContainerServer.get(this.id)
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
              await freightStandardContainerServer.put(this.formData)
            } else {
              const res = await freightStandardContainerServer.post(this.formData)
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
