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
              <el-form-item label="编码" prop="code">
                <el-input v-model="formData.code" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="名称" prop="name">
                <el-input v-model="formData.name" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="英文名称" prop="englishName">
                <el-input v-model="formData.englishName" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="港口类型" prop="portType">
                <PortTypeEnumSelect v-model="formData.portType"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否可用" prop="enable">
                <el-switch v-model="formData.enable" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini"/>
              </el-form-item>
            </el-col>

            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="所在国家" prop="areaId">
                <AreaSelect v-model="formData.areaId" @changeData="changeAreaName"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import portServer from './../../../api/portServer'
import AreaSelect from './../area/AreaSelect'
import PortTypeEnumSelect from './../../../components/entity/port/PortTypeEnumSelect'
const emptyFormData = {
  id: null,
  code: null,
  name: null,
  englishName: null,
  portType: null,
  enable: true,
  remark: null,
  areaId: null,
  areaName: null,
  areaCode: null,
  oldSeaportCode: null
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'PortEdit',
  components: {
    AreaSelect,
    PortTypeEnumSelect
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
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        englishName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        portType: [{ required: true, message: '不能为空', trigger: 'blur' }],
        enable: [],
        remark: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        areaName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 64个字符',
            trigger: 'blur'
          }
        ]
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
    changeAreaName(name, code) {
      this.formData.areaName = name
      this.formData.areaCode = code
    },
    async getData() {
      this.loading = true
      const res = await portServer.get(this.formData.id)
      var findData = res
      findData.oldSeaportCode = findData.code
      initFormData = {
        ...res
      }
      this.formData = {
        ...res
      }
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.seaportId != null && this.seaportId !== '') {
              const res = await portServer.put(this.formData)
              this.formData.enable = this.formData.enable === 2
              if (res.code !== 200) {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                })
                return
              }
            } else {
              this.formData.entid = this.$store.getters.entid
              const res = await portServer.post(this.formData)
              this.formData.enable = this.formData.enable === 2
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
