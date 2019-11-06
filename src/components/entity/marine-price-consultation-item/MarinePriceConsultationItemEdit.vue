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
              <el-form-item label="截关日期" prop="expirationDate">
                <el-date-picker
                  v-model="formData.expirationDate"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="价格有效日期" prop="pricePeriodValidity">
                <el-date-picker
                  v-model="formData.pricePeriodValidity"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="总金额" required prop="totalAmount">
                <el-input-number v-model="formData.totalAmount" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="综合低价" prop="lowestPrice">
                <el-input-number v-model="formData.lowestPrice" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="综合排名" prop="sort">
                <el-input-number v-model="formData.sort" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="最晚订舱日期" prop="lastScheduledDate">
                <el-date-picker
                  v-model="formData.lastScheduledDate"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="预计航程(天)" prop="transportTime">
                <el-input-number v-model="formData.transportTime" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="确定船司" prop="designate">
                <el-switch v-model="formData.designate" size="mini" />
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
              <el-form-item label="海运价格咨询" required prop="marinePriceConsultationId">
                <MarinePriceConsultationSelect v-model="formData.marinePriceConsultationId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="货代公司" required prop="recommendShippingCompanyId">
                <ShippingCompanySelect v-model="formData.recommendShippingCompanyId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="船运公司" required prop="shippingCompanyId">
                <ShippingCompanySelect v-model="formData.shippingCompanyId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="货币" required prop="currencyId">
                <CurrencySelect v-model="formData.currencyId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="单位" required prop="unitMeasurementId">
                <UnitMeasurementSelect v-model="formData.unitMeasurementId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import marinePriceConsultationItemServer from './../../../api/marinePriceConsultationItemServer'
import MarinePriceConsultationSelect from './../marine-price-consultation/MarinePriceConsultationSelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import CurrencySelect from './../currency/CurrencySelect'
import UnitMeasurementSelect from './../unit-measurement/UnitMeasurementSelect'

const emptyFormData = {
  expirationDate: null,
  pricePeriodValidity: null,
  totalAmount: null,
  lowestPrice: null,
  sort: null,
  lastScheduledDate: null,
  transportTime: null,
  designate: null,
  remark: null,
  isDelete: null,
  marinePriceConsultationId: null,
  recommendShippingCompanyId: null,
  shippingCompanyId: null,
  currencyId: null,
  unitMeasurementId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'MarinePriceConsultationItemEdit',
  components: {
    MarinePriceConsultationSelect,
    ShippingCompanySelect,
    CurrencySelect,
    UnitMeasurementSelect,
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
        expirationDate: [
        ],
        pricePeriodValidity: [
        ],
        totalAmount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        lowestPrice: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        sort: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        lastScheduledDate: [
        ],
        transportTime: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        designate: [
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        marinePriceConsultationId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        recommendShippingCompanyId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        shippingCompanyId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        currencyId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        unitMeasurementId: [
          { required: true, message: '不能为空', trigger: 'change' },
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
      const res = await marinePriceConsultationItemServer.get(this.id)
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
              await marinePriceConsultationItemServer.put(this.formData)
            } else {
              const res = await marinePriceConsultationItemServer.post(this.formData)
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
