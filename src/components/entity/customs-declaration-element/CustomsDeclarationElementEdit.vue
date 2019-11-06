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
              <el-form-item label="HS编码" prop="code">
                <el-input v-model="formData.code" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="排序号" prop="sortNumber">
                <el-input-number v-model="formData.sortNumber" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="中文品名" prop="name">
                <el-input v-model="formData.name" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="英文品名" prop="englishName">
                <el-input v-model="formData.englishName" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="要素品名" prop="elementName">
                <el-input v-model="formData.elementName" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="报关要素" prop="decalrElement">
                <el-input v-model="formData.decalrElement" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制冷量(BTU)" prop="refrigeratingCapacity">
                <el-input v-model="formData.refrigeratingCapacity" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="退税率" prop="refundTax">
                <el-input-number 
                  v-model="formData.refundTax"
                  :step="0.1"
                  :precision="2" 
                  :max="1"
                  :min="0"
                  size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="不退税率" prop="notRefundTax">
                <el-input-number 
                  v-model="formData.notRefundTax" 
                  :step="0.1"
                  :precision="2" 
                  :max="1"
                  :min="0"
                  size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="单位" prop="unit">
                <el-input v-model="formData.unit" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="第二单位" prop="secondUnit">
                <el-input v-model="formData.secondUnit" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否可用" prop="enable">
                <el-switch v-model="formData.enable" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="冷暖类型" prop="coldWarm">
                <WarmOrColdSelect v-model="formData.coldWarm"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="大类名称" prop="bigClassName">
                <BigTypeNameSelect v-model="formData.bigClassName" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="机型详细分类" prop="modelsType">
                <TypeClassifySelect v-model="formData.modelsType" />
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="经营单位" prop="companyId">
                <OperateUnitSelect v-model="formData.companyId" />
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import customsDeclarationElementServer from './../../../api/customsDeclarationElementServer'
// import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import WarmOrColdSelect from './WarmOrColdSelect'
import BigTypeNameSelect from './BigTypeNameSelect'
import TypeClassifySelect from './TypeClassifySelect'
const emptyFormData = {
  nameId: null,
  code: null,
  sortNumber: null,
  name: null,
  englishName: null,
  elementName: null,
  decalrElement: null,
  refrigeratingCapacity: null,
  refundTax: null,
  notRefundTax: null,
  unit: null,
  secondUnit: null,
  enable: true,
  remark: null,
  isDelete: null,
  companyId: null,
  coldWarm: null,
  bigClassName: null,
  modelsType: null
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'CustomsDeclarationElementEdit',
  components: {
    // OperateUnitSelect,
    WarmOrColdSelect,
    BigTypeNameSelect,
    TypeClassifySelect
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
          { min: 0, max: 60, message: '长度在 0 到 60 个字符', trigger: 'blur' },
        ],
        sortNumber: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 60, message: '长度在 0 到 60 个字符', trigger: 'blur' },
        ],
        englishName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 60, message: '长度在 0 到 60 个字符', trigger: 'blur' },
        ],
        elementName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 60, message: '长度在 0 到 60 个字符', trigger: 'blur' },
        ],
        refrigeratingCapacity: [
          { min: 0, max: 60, message: '长度在 0 到 60 个字符', trigger: 'blur' },
        ],
        refundTax: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        notRefundTax: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        unit: [
          { min: 0, max: 60, message: '长度在 0 到 60 个字符', trigger: 'blur' },
        ],
        enable: [
        ],
        remark: [
          { min: 0, max: 60, message: '长度在 0 到 60 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        decalrElement: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 60, message: '长度在 0 到 60 个字符', trigger: 'blur' },
        ],
        companyId: [
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
      const res = await customsDeclarationElementServer.get(this.id)
      this.formData.nameId = res.nameId
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
            if (this.formData.nameId != null && this.formData.nameId !== '') {
              const res = await customsDeclarationElementServer.put(this.formData) 
              if (res.code !== 200) {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
                reject('error submit!!')
                return
              }
            } else {
              this.formData.entid = this.$store.getters.entid
              const res = await customsDeclarationElementServer.post(this.formData)
              if (res.code !== 200) {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
                reject('error submit!!')
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
