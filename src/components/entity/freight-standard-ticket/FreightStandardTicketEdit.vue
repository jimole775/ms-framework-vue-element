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
              <el-form-item label="费用明细" required prop="freightStandardTicketCostDetail">
                <FreightStandardTicketCostDetailEnumSelect v-model="formData.freightStandardTicketCostDetail" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="有效期开始时间" prop="startTime">
                <el-date-picker
                  v-model="formData.startTime"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="有效期结束时间" prop="endTime">
                <el-date-picker
                  v-model="formData.endTime"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="金额" prop="price">
                <el-input-number v-model="formData.price" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否删除" prop="isDelete">
                <el-switch v-model="formData.isDelete" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="船务公司" prop="shippingCompanyId">
                <ShippingCompanySelect v-model="formData.shippingCompanyId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="包干费用标准" prop="freightStandardId">
                <FreightStandardSelect v-model="formData.freightStandardId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import freightStandardTicketServer from './../../../api/freightStandardTicketServer'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import FreightStandardSelect from './../freight-standard/FreightStandardSelect'

import FreightStandardTicketCostDetailEnumSelect from './../../../components/entity/freight-standard-ticket/FreightStandardTicketCostDetailEnumSelect'
const emptyFormData = {
  freightStandardTicketCostDetail: null,
  startTime: null,
  endTime: null,
  price: null,
  isDelete: null,
  shippingCompanyId: null,
  freightStandardId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'FreightStandardTicketEdit',
  components: {
    ShippingCompanySelect,
    FreightStandardSelect,
    FreightStandardTicketCostDetailEnumSelect,
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
        freightStandardTicketCostDetail: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        startTime: [
        ],
        endTime: [
        ],
        price: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        isDelete: [
        ],
        shippingCompanyId: [
        ],
        freightStandardId: [
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
      const res = await freightStandardTicketServer.get(this.id)
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
              await freightStandardTicketServer.put(this.formData)
            } else {
              const res = await freightStandardTicketServer.post(this.formData)
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
