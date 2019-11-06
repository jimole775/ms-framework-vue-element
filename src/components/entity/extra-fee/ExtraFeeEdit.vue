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
              <el-form-item label="出货预告号" prop="warnNos">
                <el-input v-model="formData.warnNos" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同号" prop="piNos">
                <el-input v-model="formData.piNos" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="登记流水号" prop="regNo">
                <el-input v-model="formData.regNo" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="note">
                <el-input v-model="formData.note" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="stat">
                <ExtraFeeStatEnumSelect v-model="formData.stat" :disabled="true" />
              </el-form-item>
            </el-col>
            
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import extraFeeServer from './../../../api/extraFeeServer'

import ExtraFeeStatEnumSelect from './../../../components/entity/extra-fee/ExtraFeeStatEnumSelect'
const emptyFormData = {
  warnNos: null,
  piNos: null,
  regNo: null,
  note: null,
  stat: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'ExtraFeeEdit',
  components: {
    ExtraFeeStatEnumSelect,
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
        warnNos: [
        ],
        piNos: [
        ],
        regNo: [
        ],
        note: [
        ],
        stat: [
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
      const res = await extraFeeServer.get(this.id)
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
              await extraFeeServer.put(this.formData)
            } else {
              const res = await extraFeeServer.post(this.formData)
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
