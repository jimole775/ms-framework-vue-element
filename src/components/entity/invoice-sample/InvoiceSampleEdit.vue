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
            
            <el-col v-if="formData.id" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="编码" required prop="code">
                <el-input v-model="formData.code" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col v-if="formData.id" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单时间" prop="createOrderTime">
                <el-date-picker
                  v-model="formData.createOrderTime"
                  disabled
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col v-if="formData.id" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单人" required prop="createOrderMan">
                <el-input v-model="formData.createOrderMan" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" prop="customerId">
                <CustomerSelect v-model="formData.customerId" @changeData="changeCustomer"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户编码" prop="customerCode">
                <el-input v-model="formData.customerCode" disabled size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="销售部门" prop="departmentId">
                <DepartmentSelect v-model="formData.departmentId" @changeData="changeDepartment"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="部门编码" prop="departmentCode">
                <el-input v-model="formData.departmentCode" disabled size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <FileUpload
      :id="id"
      :bill-name="'客户箱单发票案例库'"/>
  </div>
</template>

<script>
import invoiceSampleServer from './../../../api/invoiceSampleServer'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import CustomerSelect from './../customer/CustomerSelect'

const emptyFormData = {
  code: null,
  createOrderTime: null,
  createOrderMan: null,
  remark: null,
  isDelete: null,
  departmentId: null,
  departmentCode: null,
  departmentName: null,
  customerId: null,
  customerName: null,
  customerCode: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'InvoiceSampleEdit',
  components: {
    OperateUnitSelect,
    DepartmentSelect,
    CustomerSelect,
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
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        createOrderTime: [
        ],
        createOrderMan: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        departmentId: [
        ],
        customerId: [
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
    changeCustomer(name, code) {
      this.formData.customerName = name
      this.formData.customerCode = code
    },
    changeDepartment(name, code) {
      this.formData.departmentName = name
      this.formData.departmentCode = code
    },
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      try {
        const res = await invoiceSampleServer.get(this.id)
        initFormData = res.data
        this.formData = {
          ...res.data
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.id) {
              await invoiceSampleServer.put(this.formData)
            } else {
              this.formData.entid = this.$store.getters.entid
              const res = await invoiceSampleServer.post(this.formData)
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
  /deep/.el-form-item__label{
    width:  130px!important;
  }
  /deep/.el-form-item__content{
    margin-left: 130px!important;
  }
  /deep/.el-form-item__error{
    padding-top: 0;
  }
</style>
