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
              <el-form-item label="最大体积" prop="volume">
                <el-input-number
                  v-model="formData.volume"
                  :max="99999999.99"
                  :min="0"
                  :precision="2"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="最大毛重" prop="maxRoughWeight">
                <el-input-number
                  v-model="formData.maxRoughWeight"
                  :max="99999999.99"
                  :min="0"
                  :precision="2"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="最大净重" prop="maxSuttle">
                <el-input-number
                  v-model="formData.maxSuttle"
                  :max="99999999.99"
                  :min="0"
                  :precision="2"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="柜型" prop="containerType">
                <ContainerSelect
                  v-model="formData.containerType"
                  @changeData="changeContainerType"
                />
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="经营单位" prop="operateUnitId">
                <OperateUnitSelect v-model="formData.operateUnitId" />
              </el-form-item>
            </el-col>-->
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import containerLoadServer from './../../../api/containerLoadServer'
import ContainerSelect from './../container/ContainerSelect'
// import OperateUnitSelect from './../operate-unit/OperateUnitSelect'

const emptyFormData = {
  volume: null,
  maxRoughWeight: null,
  maxSuttle: null,
  remark: null,
  isDelete: null,
  containerType: null,
  containerTypeName: null,
  // operateUnitId: null,
  id: null
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'ContainerLoadEdit',
  components: {
    ContainerSelect
    // OperateUnitSelect,
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
        volume: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
          // { min: 0, max: 8, message: '长度在 0 到 8个字符', trigger: 'blur' },
        ],
        maxRoughWeight: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        maxSuttle: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        remark: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        isDelete: [],
        containerType: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        operateUnitId: []
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
      this.formData.id = this.id
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
    changeContainerType(name) {
      this.formData.containerTypeName = name
    },
    async getData() {
      this.loading = true
      const res = await containerLoadServer.get(this.formData.id)
      initFormData = {
        ...res
      }
      this.formData = res
      this.formData.id = res.ruleId
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.id) {
              const res = await containerLoadServer.put(this.formData)
              // this.formData.id = res.ruleId
              if (res.code !== 200) {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                })
                return
              }
            } else {
              this.formData.entid = this.$store.getters.entid
              const res = await containerLoadServer.post(this.formData)
              // this.formData.id = res.ruleId
              if (res.code !== 200) {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                })
                return
              }
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
