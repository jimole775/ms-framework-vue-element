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
              <el-form-item label="订单费用编码" prop="code">
                <el-input v-model="formData.code" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="订单费用名称" prop="name">
                <el-input v-model="formData.name" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="序列" prop="key">
                <el-input-number v-model="formData.key" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="订单费用类型" prop="costProjectType">
                <CostProjectTypeEnumSelect v-model="formData.costProjectType" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="项目类型" prop="costProjectProjectType">
                <CostProjectProjectTypeEnumSelect v-model="formData.costProjectProjectType" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否可用" prop="enable">
                <el-switch v-model="formData.enable" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否额外费用" prop="isExtra">
                <el-switch v-model="formData.isExtra" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="标准费用" prop="normFee">
                <el-input-number 
                  v-model="formData.normFee"
                  :step="1"
                  :precision="2" 
                  :max="999999999.99"
                  :min="0"
                  size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="默认指代费用" prop="normFee">
                <el-switch v-model="formData.isDefault" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import costProjectServer from './../../../api/costProjectServer'
import AreaSelect from './../area/AreaSelect'

import CostProjectTypeEnumSelect from './../../../components/entity/cost-project/CostProjectTypeEnumSelect'
import CostProjectProjectTypeEnumSelect from './../../../components/entity/cost-project/CostProjectProjectTypeEnumSelect'
const emptyFormData = {
  code: null,
  name: null,
  key: null,
  normFee: null,
  costProjectType: null,
  costProjectProjectType: null,
  enable: true,
  isDefault: true,
  isDelete: null,
  remark: null,
  id: null,
  isExtra: false
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'CostProjectEdit',
  components: {
    AreaSelect,
    CostProjectTypeEnumSelect,
    CostProjectProjectTypeEnumSelect,
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
          { min: 0, max: 16, message: '长度在 0 到 16 个字符', trigger: 'blur' },
        ],
        name: [
          { min: 0, max: 16, message: '长度在 0 到 16 个字符', trigger: 'blur' },
        ],
        costProjectType: [
        ],
        costProjectProjectType: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        enable: [
        ],
        isDelete: [
        ],
        isDefault: [],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
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
      const res = await costProjectServer.get(this.id)

      if (res.enable === 2) {
        res.enable = true
      }
      if (res.enable === 1) {
        res.enable = false
      }
      
      if (res.isDefault === 1) {
        res.isDefault = true
      }

      if (res.isDefault === 2) {
        res.isDefault = false
      }
      if (res.isExtra === 2) {
        res.isExtra = true
      }
      if (res.isExtra === 1) {
        res.isExtra = false
      }
      this.formData.id = res.orderFeeId
      initFormData = {
        ...res
      }
      this.formData = res
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.id) {
              if (this.formData.enable === true) {
                this.formData.enable = 2
              }
              if (this.formData.enable === false) {
                this.formData.enable = 1
              }
              if (this.formData.isDefault === true) {
                this.formData.isDefault = 1
              }
              if (this.formData.isDefault === false) {
                this.formData.isDefault = 2
              }
              if (this.formData.isExtra === true) {
                this.formData.isExtra = 2
              }
              if (this.formData.isExtra === false) {
                this.formData.isExtra = 1
              }
              await costProjectServer.put(this.formData)
            } else {
              if (this.formData.enable === true) {
                this.formData.enable = 2
              }
              if (this.formData.enable === false) {
                this.formData.enable = 1
              }
              if (this.formData.isDefault === true) {
                this.formData.isDefault = 1
              }
              if (this.formData.isDefault === false) {
                this.formData.isDefault = 2
              }
              if (this.formData.isExtra === true) {
                this.formData.isExtra = 2
              }
              if (this.formData.isExtra === false) {
                this.formData.isExtra = 1
              }
              this.formData.entid = this.$store.getters.entid
              const res = await costProjectServer.post(this.formData)
              this.formData.id = res
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
