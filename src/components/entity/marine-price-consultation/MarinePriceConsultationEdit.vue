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
              <el-form-item label="单号" required prop="code">
                <el-input v-model="formData.code" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="status">
                <MarinePriceConsultationStatusEnumSelect v-model="formData.status" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="目的港免用箱" required prop="freeBox">
                <el-input v-model="formData.freeBox" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="免堆期(天)" prop="freeStorageTime">
                <el-input-number v-model="formData.freeStorageTime" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="预计装柜日期" prop="loadDate">
                <el-date-picker
                  v-model="formData.loadDate"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="PI号" required prop="pi">
                <el-input v-model="formData.pi" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="航线" prop="airRoute">
                <MarinePriceConsultationAirRouteEnumSelect v-model="formData.airRoute" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="预计货款到达日期" prop="paymentDate">
                <el-date-picker
                  v-model="formData.paymentDate"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否船司价格" prop="isShippingCompanyPrice">
                <el-switch v-model="formData.isShippingCompanyPrice" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="其它提单要求" prop="otherCommitRequirements">
                <el-input v-model="formData.otherCommitRequirements" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="柜量" required prop="containerNumber">
                <el-input-number v-model="formData.containerNumber" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="名称" required prop="name">
                <el-input v-model="formData.name" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="其它要求" prop="otherRequest">
                <el-input v-model="formData.otherRequest" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否删除" prop="isDelete">
                <el-switch v-model="formData.isDelete" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="销售部门" prop="saleDepartmentId">
                <DepartmentSelect v-model="formData.saleDepartmentId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="目的国家" prop="targetAreaId">
                <AreaSelect v-model="formData.targetAreaId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出货港口" required prop="shipmentPortId">
                <PortSelect v-model="formData.shipmentPortId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="到货港口" required prop="targetPortId">
                <PortSelect v-model="formData.targetPortId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="推荐船司" prop="recommendShippingCompanyId">
                <ShippingCompanySelect v-model="formData.recommendShippingCompanyId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="柜型" required prop="containerTypeId">
                <ContainerSelect v-model="formData.containerTypeId" />
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
import marinePriceConsultationServer from './../../../api/marinePriceConsultationServer'
import DepartmentSelect from './../department/DepartmentSelect'
import AreaSelect from './../area/AreaSelect'
import PortSelect from './../port/PortSelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import ContainerSelect from './../container/ContainerSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'

import MarinePriceConsultationStatusEnumSelect from './../../../components/entity/marine-price-consultation/MarinePriceConsultationStatusEnumSelect'
import MarinePriceConsultationAirRouteEnumSelect from './../../../components/entity/marine-price-consultation/MarinePriceConsultationAirRouteEnumSelect'
const emptyFormData = {
  code: null,
  status: null,
  freeBox: null,
  freeStorageTime: null,
  loadDate: null,
  pi: null,
  airRoute: null,
  paymentDate: null,
  isShippingCompanyPrice: null,
  otherCommitRequirements: null,
  containerNumber: null,
  name: null,
  remark: null,
  otherRequest: null,
  isDelete: null,
  saleDepartmentId: null,
  targetAreaId: null,
  shipmentPortId: null,
  targetPortId: null,
  recommendShippingCompanyId: null,
  containerTypeId: null,
  operateUnitId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'MarinePriceConsultationEdit',
  components: {
    DepartmentSelect,
    AreaSelect,
    PortSelect,
    ShippingCompanySelect,
    ContainerSelect,
    OperateUnitSelect,
    MarinePriceConsultationStatusEnumSelect,
    MarinePriceConsultationAirRouteEnumSelect,
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
        status: [
        ],
        freeBox: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        freeStorageTime: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        loadDate: [
        ],
        pi: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        airRoute: [
        ],
        paymentDate: [
        ],
        isShippingCompanyPrice: [
        ],
        otherCommitRequirements: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        containerNumber: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        otherRequest: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        saleDepartmentId: [
        ],
        targetAreaId: [
        ],
        shipmentPortId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        targetPortId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        recommendShippingCompanyId: [
        ],
        containerTypeId: [
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
      const res = await marinePriceConsultationServer.get(this.id)
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
              await marinePriceConsultationServer.put(this.formData)
            } else {
              const res = await marinePriceConsultationServer.post(this.formData)
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
