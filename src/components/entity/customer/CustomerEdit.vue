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
              <el-form-item label="申请单号" required prop="orderNumber">
                <el-input v-model="formData.orderNumber" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单时间" prop="createOrderTime">
                <el-date-picker
                  v-model="formData.createOrderTime"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单人" required prop="createOrderMan">
                <el-input v-model="formData.createOrderMan" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" required prop="status">
                <CustomerStatusEnumSelect v-model="formData.status" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="编码" prop="code">
                <el-input v-model="formData.code" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="名称" required prop="name">
                <el-input v-model="formData.name" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="简称" prop="simplifyName">
                <el-input v-model="formData.simplifyName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="地址" required prop="address">
                <el-input v-model="formData.address" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户描述" prop="customerDescribe">
                <el-input v-model="formData.customerDescribe" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="负责人" prop="thoseResponsible">
                <el-input v-model="formData.thoseResponsible" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信用等级" required prop="credit">
                <CustomerCreditEnumSelect v-model="formData.credit" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="注册名称" prop="registerName">
                <el-input v-model="formData.registerName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="网址" prop="url">
                <el-input v-model="formData.url" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="注册资本(美元)" prop="registerCapital">
                <el-input-number v-model="formData.registerCapital" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户类别" required prop="category">
                <CustomerCategoryEnumSelect v-model="formData.category" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="电话" required prop="phone">
                <el-input v-model="formData.phone" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="Email" required prop="email">
                <el-input v-model="formData.email" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="OA实际额度" prop="oaCredit">
                <el-input-number v-model="formData.oaCredit" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="贸易名称" prop="tradeName">
                <el-input v-model="formData.tradeName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="法人代表" required prop="legalRepresentative">
                <el-input v-model="formData.legalRepresentative" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="银行账号" required prop="bankAccount">
                <el-input v-model="formData.bankAccount" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户配件比例%" required prop="accessoriesProportion">
                <el-input-number v-model="formData.accessoriesProportion" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="授权书" prop="authorizationDocument">
                <el-switch v-model="formData.authorizationDocument" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="注册书" prop="registrationDocument">
                <el-switch v-model="formData.registrationDocument" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户性质" required prop="nature">
                <CustomerNatureEnumSelect v-model="formData.nature" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信保比例%" prop="creditProportion">
                <el-input-number v-model="formData.creditProportion" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户等级" required prop="level">
                <CustomerLevelEnumSelect v-model="formData.level" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="返利率" required prop="rebateProportion">
                <el-input-number v-model="formData.rebateProportion" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="区域等级" required prop="areaLevel">
                <CustomerAreaLevelEnumSelect v-model="formData.areaLevel" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="贸易类型" required prop="tradeType">
                <CustomerTradeTypeEnumSelect v-model="formData.tradeType" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="注册地址" required prop="registeredAddress">
                <el-input v-model="formData.registeredAddress" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="纳税人识别号" prop="TaxpayerNumber">
                <el-input v-model="formData.TaxpayerNumber" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户类型" required prop="type">
                <CustomerTypeEnumSelect v-model="formData.type" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否删除" prop="isDelete">
                <el-switch v-model="formData.isDelete" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="币种" required prop="currencyId">
                <CurrencySelect v-model="formData.currencyId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="银行" prop="bankInfoId">
                <BankInfoSelect v-model="formData.bankInfoId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="所在国家" required prop="areaId">
                <AreaSelect v-model="formData.areaId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务部门" required prop="departmentId">
                <DepartmentSelect v-model="formData.departmentId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="经营单位" prop="operateUnitId">
                <OperateUnitSelect v-model="formData.operateUnitId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import customerServer from './../../../api/customerServer'
import CurrencySelect from './../currency/CurrencySelect'
import BankInfoSelect from './../bank-info/BankInfoSelect'
import AreaSelect from './../area/AreaSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'

import CustomerStatusEnumSelect from './../../../components/entity/customer/CustomerStatusEnumSelect'
import CustomerCreditEnumSelect from './../../../components/entity/customer/CustomerCreditEnumSelect'
import CustomerCategoryEnumSelect from './../../../components/entity/customer/CustomerCategoryEnumSelect'
import CustomerNatureEnumSelect from './../../../components/entity/customer/CustomerNatureEnumSelect'
import CustomerLevelEnumSelect from './../../../components/entity/customer/CustomerLevelEnumSelect'
import CustomerAreaLevelEnumSelect from './../../../components/entity/customer/CustomerAreaLevelEnumSelect'
import CustomerTradeTypeEnumSelect from './../../../components/entity/customer/CustomerTradeTypeEnumSelect'
import CustomerTypeEnumSelect from './../../../components/entity/customer/CustomerTypeEnumSelect'
const emptyFormData = {
  orderNumber: null,
  createOrderTime: null,
  createOrderMan: null,
  status: null,
  code: null,
  name: null,
  simplifyName: null,
  address: null,
  customerDescribe: null,
  thoseResponsible: null,
  credit: null,
  registerName: null,
  url: null,
  registerCapital: null,
  category: null,
  phone: null,
  email: null,
  oaCredit: null,
  tradeName: null,
  legalRepresentative: null,
  bankAccount: null,
  accessoriesProportion: null,
  authorizationDocument: null,
  registrationDocument: null,
  nature: null,
  creditProportion: null,
  level: null,
  rebateProportion: null,
  areaLevel: null,
  tradeType: null,
  registeredAddress: null,
  TaxpayerNumber: null,
  type: null,
  remark: null,
  isDelete: null,
  currencyId: null,
  bankInfoId: null,
  areaId: null,
  departmentId: null,
  operateUnitId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'CustomerEdit',
  components: {
    CurrencySelect,
    BankInfoSelect,
    AreaSelect,
    DepartmentSelect,
    OperateUnitSelect,
    CustomerStatusEnumSelect,
    CustomerCreditEnumSelect,
    CustomerCategoryEnumSelect,
    CustomerNatureEnumSelect,
    CustomerLevelEnumSelect,
    CustomerAreaLevelEnumSelect,
    CustomerTradeTypeEnumSelect,
    CustomerTypeEnumSelect,
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
        orderNumber: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        createOrderTime: [
        ],
        createOrderMan: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        code: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        simplifyName: [
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 512, message: '长度在 0 到 512 个字符', trigger: 'blur' },
        ],
        customerDescribe: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        thoseResponsible: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        credit: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        registerName: [
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' },
        ],
        url: [
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' },
        ],
        registerCapital: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        category: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' },
        ],
        oaCredit: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        tradeName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        legalRepresentative: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        bankAccount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        accessoriesProportion: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        authorizationDocument: [
        ],
        registrationDocument: [
        ],
        nature: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        creditProportion: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        level: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        rebateProportion: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        areaLevel: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        tradeType: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        registeredAddress: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 512, message: '长度在 0 到 512 个字符', trigger: 'blur' },
        ],
        TaxpayerNumber: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        currencyId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        bankInfoId: [
        ],
        areaId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        departmentId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        operateUnitId: [
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
      const res = await customerServer.get(this.id)
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
              await customerServer.put(this.formData)
            } else {
              const res = await customerServer.post(this.formData)
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
