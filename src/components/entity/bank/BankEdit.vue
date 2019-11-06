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
              <el-form-item label="Swift_Code" prop="Swift_Code">
                <el-input v-model="formData.Swift_Code" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="名称" prop="name">
                <el-input v-model="formData.name" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="地址" prop="address">
                <el-input v-model="formData.address" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否有效" prop="enable">
                <el-switch v-model="formData.enable" size="mini"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import bankServer from './../../../api/bankServer'
import DepartmentSelect from './../department/DepartmentSelect'

const emptyFormData = {
  Swift_Code: null,
  name: null,
  address: null,
  remark: null,
  enable: true,
  id: null
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'BankEdit',
  components: {
    DepartmentSelect
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
        Swift_Code: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        address: [
          // { required: true, message: '不能为空', trigger: 'blur' },
          // {
          //   min: 0,
          //   max: 512,
          //   message: '长度在 0 到 512 个字符',
          //   trigger: 'blur'
          // }
        ],
        remark: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        enable: []
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
    // id(val) {
    //   if (val !== this.initFormData.id) {
    //     this.getData()
    //   }
    // },
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
    async getData() {
      this.loading = true
      const res = await bankServer.get(this.formData.id)
      initFormData = {
        ...res[0]
      }
      this.formData = {
        ...res[0]
      }
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.id !== null) {
              const res = await bankServer.put(this.formData)
              if (res.data.code !== 200) {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
                return
              }
            } else {
              this.formData.entid = this.$store.getters.entid
              const res = await bankServer.post(this.formData)
              if (res.data.code !== 200) {
                this.$message({
                  message: res.data.msg,
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
