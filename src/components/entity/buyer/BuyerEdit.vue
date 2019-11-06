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
              <el-form-item label="单号" prop="code">
                <el-input v-model="formData.code" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="创建人" prop="createMan">
                <el-input v-model="formData.createMan" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="创建时间" prop="createTime">
                <el-date-picker
                  v-model="formData.createTime"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="单据状态" prop="orderStatus">
                <ChangeOrderOrderStatusEnumSelect v-model="formData.orderStatus" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="地址" prop="registerAddress">
                <el-input v-model="formData.registerAddress" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="英文名称" required prop="englishName">
                <el-input v-model="formData.englishName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="买方简称" required prop="simplifyName">
                <el-input v-model="formData.simplifyName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="联系人" prop="contact">
                <el-input v-model="formData.contact" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="英文地址" required prop="englishAddress">
                <el-input v-model="formData.englishAddress" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="电话" prop="phone">
                <el-input v-model="formData.phone" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="中文名称" prop="name">
                <el-input v-model="formData.name" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="传真" prop="fax">
                <el-input v-model="formData.fax" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="中文地址" required prop="address">
                <el-input v-model="formData.address" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="注册登记号" prop="registerCode">
                <el-input v-model="formData.registerCode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="CFO" prop="cfo">
                <el-input v-model="formData.cfo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="CEO" prop="ceo">
                <el-input v-model="formData.ceo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="Email" prop="email">
                <el-input v-model="formData.email" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="网络地址" prop="url">
                <el-input v-model="formData.url" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="法人代表" prop="legalPerson">
                <el-input v-model="formData.legalPerson" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="年销售额" prop="yearSalesAmount">
                <el-input-number v-model="formData.yearSalesAmount" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是政府机构" prop="isGovernment">
                <el-switch v-model="formData.isGovernment" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="成立日期" prop="companyRegisterDate">
                <el-date-picker
                  v-model="formData.companyRegisterDate"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="资产净值" prop="netWorth">
                <el-input-number v-model="formData.netWorth" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是上市公司" prop="isListedCompany">
                <el-switch v-model="formData.isListedCompany" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" required prop="remark">
                <el-input v-model="formData.remark" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="驳回原因" prop="rejectReason">
                <el-input v-model="formData.rejectReason" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否删除" prop="isDelete">
                <el-switch v-model="formData.isDelete" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="销售区域" required prop="salesDepartmentId">
                <DepartmentSelect v-model="formData.salesDepartmentId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" required prop="customerId">
                <CustomerSelect v-model="formData.customerId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="所属国家地区" required prop="countryId">
                <AreaSelect v-model="formData.countryId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="注册区域" prop="registerAreaId">
                <AreaSelect v-model="formData.registerAreaId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="经营单位" prop="departmentId">
                <DepartmentSelect v-model="formData.departmentId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buyerServer from './../../../api/buyerServer'
import DepartmentSelect from './../department/DepartmentSelect'
import CustomerSelect from './../customer/CustomerSelect'
import AreaSelect from './../area/AreaSelect'

import ChangeOrderOrderStatusEnumSelect from './../../../components/entity/buyer/ChangeOrderOrderStatusEnumSelect'
const emptyFormData = {
  code: null,
  createMan: null,
  createTime: null,
  orderStatus: null,
  registerAddress: null,
  englishName: null,
  simplifyName: null,
  contact: null,
  englishAddress: null,
  phone: null,
  name: null,
  fax: null,
  address: null,
  registerCode: null,
  cfo: null,
  ceo: null,
  email: null,
  url: null,
  legalPerson: null,
  yearSalesAmount: null,
  isGovernment: null,
  companyRegisterDate: null,
  netWorth: null,
  isListedCompany: null,
  remark: null,
  rejectReason: null,
  isDelete: null,
  salesDepartmentId: null,
  customerId: null,
  countryId: null,
  registerAreaId: null,
  departmentId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'BuyerEdit',
  components: {
    DepartmentSelect,
    CustomerSelect,
    AreaSelect,
    ChangeOrderOrderStatusEnumSelect,
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
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        createMan: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        createTime: [
        ],
        orderStatus: [
        ],
        registerAddress: [
          { min: 0, max: 512, message: '长度在 0 到 512 个字符', trigger: 'blur' },
        ],
        englishName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        simplifyName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' },
        ],
        contact: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        englishAddress: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 512, message: '长度在 0 到 512 个字符', trigger: 'blur' },
        ],
        phone: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' },
        ],
        name: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        fax: [
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 512, message: '长度在 0 到 512 个字符', trigger: 'blur' },
        ],
        registerCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        cfo: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        ceo: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        email: [
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' },
        ],
        url: [
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' },
        ],
        legalPerson: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        yearSalesAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        isGovernment: [
        ],
        companyRegisterDate: [
        ],
        netWorth: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        isListedCompany: [
        ],
        remark: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        rejectReason: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        salesDepartmentId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        customerId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        countryId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        registerAreaId: [
        ],
        departmentId: [
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
      const res = await buyerServer.get(this.id)
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
              await buyerServer.put(this.formData)
            } else {
              const res = await buyerServer.post(this.formData)
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
