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
              <el-form-item label="公司编码" prop="code">
                <el-input v-model="formData.code" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="公司名称" prop="name">
                <el-input v-model="formData.name" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="公司简称" prop="simplifyName">
                <el-input v-model="formData.simplifyName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="到期时间" prop="validityTime">
                <el-date-picker
                  v-model="formData.validityTime"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="shippingCompanyStatus">
                <ShippingCompanyStatusEnumSelect v-model="formData.shippingCompanyStatus" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="审核状态" prop="shippingCompanyDataStatus">
                <ShippingCompanyDataStatusEnumSelect v-model="formData.shippingCompanyDataStatus" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="类型" prop="shippingCompanyType">
                <ShippingCompanyTypeEnumSelect v-model="formData.shippingCompanyType" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="货代类型" prop="shippingCompanyProxyType">
                <ShippingCompanyProxyTypeEnumSelect v-model="formData.shippingCompanyProxyType" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="资格证书号" prop="certificateCode">
                <el-input v-model="formData.certificateCode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="账户名" prop="accountName">
                <el-input v-model="formData.accountName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="账户号" prop="account">
                <el-input v-model="formData.account" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="证书到期" prop="certificateValidityTime">
                <el-date-picker
                  v-model="formData.certificateValidityTime"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="订舱费" prop="charterFee">
                <el-input-number v-model="formData.charterFee" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="安保费" prop="securityCost">
                <el-input-number v-model="formData.securityCost" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="VGM费用" prop="vgmCost">
                <el-input-number v-model="formData.vgmCost" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="操作费用" prop="operationCost">
                <el-input-number v-model="formData.operationCost" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="电子邮件" prop="email">
                <el-input v-model="formData.email" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="地址" prop="address">
                <el-input v-model="formData.address" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="列入黑名单" prop="blacklist">
                <el-switch v-model="formData.blacklist" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否删除" prop="isDelete">
                <el-switch v-model="formData.isDelete" size="mini" />
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import shippingCompanyServer from './../../../api/shippingCompanyServer'

import ShippingCompanyStatusEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyStatusEnumSelect'
import ShippingCompanyDataStatusEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyDataStatusEnumSelect'
import ShippingCompanyTypeEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyTypeEnumSelect'
import ShippingCompanyProxyTypeEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyProxyTypeEnumSelect'
const emptyFormData = {
  code: null,
  name: null,
  simplifyName: null,
  validityTime: null,
  shippingCompanyStatus: null,
  shippingCompanyDataStatus: null,
  shippingCompanyType: null,
  shippingCompanyProxyType: null,
  certificateCode: null,
  accountName: null,
  account: null,
  certificateValidityTime: null,
  charterFee: null,
  securityCost: null,
  vgmCost: null,
  operationCost: null,
  email: null,
  address: null,
  remark: null,
  blacklist: null,
  isDelete: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'ShippingCompanyEdit',
  components: {
    ShippingCompanyStatusEnumSelect,
    ShippingCompanyDataStatusEnumSelect,
    ShippingCompanyTypeEnumSelect,
    ShippingCompanyProxyTypeEnumSelect,
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
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        simplifyName: [
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' },
        ],
        validityTime: [
        ],
        shippingCompanyStatus: [
        ],
        shippingCompanyDataStatus: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        shippingCompanyType: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        shippingCompanyProxyType: [
        ],
        certificateCode: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        accountName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        account: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        certificateValidityTime: [
        ],
        charterFee: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        securityCost: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        vgmCost: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        operationCost: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        email: [
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' },
        ],
        address: [
          { min: 0, max: 256, message: '长度在 0 到 256 个字符', trigger: 'blur' },
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        blacklist: [
        ],
        isDelete: [
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
      const res = await shippingCompanyServer.get(this.id)
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
              await shippingCompanyServer.put(this.formData)
            } else {
              const res = await shippingCompanyServer.post(this.formData)
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
