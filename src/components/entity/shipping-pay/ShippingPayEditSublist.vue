<template>
  <div class="max-w back">
    <div class="container">
      <el-button type="primary" icon="el-icon-check" size="mini" @click="save">保存</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
      <el-button v-show="formData.id" type="danger" icon="el-icon-delete" size="mini" @click="del">删除</el-button>
      <el-button v-show="formData.id" type="primary" size="mini" icon="el-icon-check">提交</el-button>
    </div>
    <div class="container m-t-not">

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
            <el-form-item label="单据号" required prop="code">
              <el-input v-model="formData.code" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="年份月份" required prop="yearMonth">
              <el-date-picker
                v-model="formData.yearMonth"
                size="mini"
                class="max-w"
                type="datetime"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="状态" prop="status">
              <FreightPayStatusEnumSelect v-model="formData.status" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="申请日期" prop="applyDate">
              <el-date-picker
                v-model="formData.applyDate"
                size="mini"
                class="max-w"
                type="datetime"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="制单人" prop="createOrderMan">
              <el-input v-model="formData.createOrderMan" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="应付总额" prop="amount">
              <el-input-number v-model="formData.amount" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="财务复核总额" prop="verifyAmount">
              <el-input-number v-model="formData.verifyAmount" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="凭证号" prop="credentials">
              <el-input v-model="formData.credentials" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="供应商" prop="supplier">
              <el-input v-model="formData.supplier" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="银行码" prop="bankCode">
              <el-input v-model="formData.bankCode" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="帐号" prop="account">
              <el-input v-model="formData.account" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="持有人" prop="bankAccountMan">
              <el-input v-model="formData.bankAccountMan" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="开户银行" prop="createAccountBank">
              <el-input v-model="formData.createAccountBank" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="费用类型" prop="costType">
              <el-input v-model="formData.costType" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="付款方式" prop="paymentMethod">
              <ShippingPayPaymentMethodEnumSelect v-model="formData.paymentMethod" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="是否预算内付款" prop="budget">
              <el-switch v-model="formData.budget" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="合同编号" prop="contractCode">
              <el-input v-model="formData.contractCode" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="支付公司" prop="payCompany">
              <ShippingPayPayCompanyEnumSelect v-model="formData.payCompany" />
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
            <el-form-item label="协议货代" prop="shippingCompanyId">
              <ShippingCompanySelect v-model="formData.shippingCompanyId" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="币种" required prop="currencyId">
              <CurrencySelect v-model="formData.currencyId" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="经营单位" prop="operateUnitId">
              <OperateUnitSelect v-model="formData.operateUnitId" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs type="border-card">
        <el-tab-pane label="内陆包干费用支付发票明细">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="clickAddFreightPayInvoice" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="clickDeleteFreightPayInvoice" />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${freightPayInvoicesSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="freightPayInvoices"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeFreightPayInvoice"
          >
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="code"
              sortable
              width="180"
              label="发票号">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.code"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="amount"
              sortable
              width="190"
              label="应付总额">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.amount"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="tax"
              sortable
              width="190"
              label="其中税金">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.tax"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="verifyAmount"
              sortable
              width="190"
              label="财务复核总额">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.verifyAmount"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="amountRmb"
              sortable
              width="190"
              label="应付总额(RMB)">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.amountRmb"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="shipmentNoticeCode"
              sortable
              width="180"
              label="出货预告号">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.shipmentNoticeCode"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="piCode"
              sortable
              width="180"
              label="PI号">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.piCode"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="registrationDate"
              sortable
              width="240"
              label="申请日期">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.registrationDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              sortable
              width="180"
              label="备注">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.remark"
                  maxlength="1024"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="isDelete"
              sortable
              label="是否删除">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isDelete"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="departmentId"
              sortable
              width="210"
              label="部门">
              <template slot-scope="scope">
                <DepartmentSelect v-model="scope.row.departmentId" />
              </template>
            </el-table-column>
            <el-table-column
              prop="freightPayId"
              sortable
              width="210"
              label="国内包干费支付">
              <template slot-scope="scope">
                <FreightPaySelect v-model="scope.row.freightPayId" />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

    </div>

    <component
      v-if="showFreightPayInvoiceDeletePopup"
      :is="'FreightPayInvoiceDeletePopup'"
      :list="freightPayInvoicesSelection"
      @close="showFreightPayInvoiceDeletePopup = false"
      @update="deletedFreightPayInvoice"
    />

  </div>
</template>

<script>
import shippingPayServer from './../../../api/shippingPayServer'
import freightPayInvoiceServer from './../../../api/freightPayInvoiceServer'
import validate from './../../../utils/validate'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import CurrencySelect from './../currency/CurrencySelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import FreightPaySelect from './../freight-pay/FreightPaySelect'
import FreightPayStatusEnumSelect from './../../../components/entity/shipping-pay/FreightPayStatusEnumSelect'
import ShippingPayPaymentMethodEnumSelect from './../../../components/entity/shipping-pay/ShippingPayPaymentMethodEnumSelect'
import ShippingPayPayCompanyEnumSelect from './../../../components/entity/shipping-pay/ShippingPayPayCompanyEnumSelect'

const emptyFormData = {
  code: null,
  yearMonth: null,
  status: null,
  applyDate: null,
  createOrderMan: null,
  amount: null,
  verifyAmount: null,
  credentials: null,
  supplier: null,
  bankCode: null,
  account: null,
  bankAccountMan: null,
  createAccountBank: null,
  costType: null,
  paymentMethod: null,
  budget: null,
  contractCode: null,
  payCompany: null,
  remark: null,
  isDelete: null,
  shippingCompanyId: null,
  currencyId: null,
  operateUnitId: null,
}
const freightPayInvoiceEmptyData = {
  code: null,
  amount: null,
  tax: null,
  verifyAmount: null,
  amountRmb: null,
  shipmentNoticeCode: null,
  piCode: null,
  registrationDate: null,
  remark: null,
  isDelete: null,
  department: null,
  freightPay: null,
}

const freightPayInvoiceRules = {
  code: [
    { message: '发票号 不能为空', validate: validate.isNotEmpty },
    {
      message: '发票号 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  amount: [
    { message: '应付总额 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  tax: [
    { message: '其中税金 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  verifyAmount: [
    { message: '财务复核总额 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  amountRmb: [
    { message: '应付总额(RMB) 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  shipmentNoticeCode: [
    {
      message: '出货预告号 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  piCode: [
    {
      message: 'PI号 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  registrationDate: [
  ],
  remark: [
    {
      message: '备注 长度不能大于1024',
      validate: validate.validateStringMinimum,
      param: [1024]
    },
  ],
  isDelete: [
  ],
  departmentId: [
  ],
  freightPayId: [
  ],
}

let initFormData = {
  ...emptyFormData
}
let initFreightPayInvoices = []

export default {
  name: 'ShippingPaySublistEdit',
  components: {
    ShippingCompanySelect,
    CurrencySelect,
    OperateUnitSelect,
    DepartmentSelect,
    FreightPaySelect,
    FreightPayStatusEnumSelect,
    ShippingPayPaymentMethodEnumSelect,
    ShippingPayPayCompanyEnumSelect,
    FreightPayInvoiceDeletePopup: () => import('./../../../views/entity-page/freight-pay-invoice/freightPayInvoiceDeletePopup.vue'),
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
      freightPayInvoices: [],
      freightPayInvoicesSelection: [],
      showFreightPayInvoiceDeletePopup: false,
      rules: {
        code: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        yearMonth: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        status: [
        ],
        applyDate: [
        ],
        createOrderMan: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        amount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        verifyAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        credentials: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        supplier: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        bankCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        account: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        bankAccountMan: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        createAccountBank: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        costType: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        paymentMethod: [
        ],
        budget: [
        ],
        contractCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        payCompany: [
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        shippingCompanyId: [
        ],
        currencyId: [
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
      const res = await shippingPayServer.get(this.id)
      const freightPayInvoiceRes = await freightPayInvoiceServer.search({
        query: `.id:${this.id}`,
        page: 0,
        size: 999
      })
      initFormData = res.data
      this.formData = {
        ...res.data
      }
      initFreightPayInvoices = freightPayInvoiceRes.data
      this.freightPayInvoices = [...initFreightPayInvoices]
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const freightPayInvoices = this.freightPayInvoices
            for (let i = 0; i < freightPayInvoices.length; i++) {
              const error = validate.dataObjectValidate(freightPayInvoices[i], freightPayInvoiceRules)
              if (error) {
                this.$message({
                  message: `内陆包干费用支付发票明细 第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            try {
              if (this.formData.id) {
                await shippingPayServer.put(this.formData)
              } else {
                const res = await shippingPayServer.post(this.formData)
                this.formData.id = res.data.id
              }
              initFormData = {
                ...this.formData
              }
              for (let i = 0; i < freightPayInvoices.length; i++) {
                const item = freightPayInvoices[i]
                item.Id = initFormData.id
                if (item.id) {
                  await freightPayInvoiceServer.put(item)
                } else {
                  await freightPayInvoiceServer.post(item)
                }
              }
            } catch (e) {
              this.$message({
                message: '保存失败 ' + e.message,
                type: 'error',
                duration: 5000
              })
              reject('error submit!!')
              return
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
    del() {
      this.$confirm('确定要删除当前表单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        shippingPayServer.delete(this.formData.id).then(() => {
          this.$message({
            message: `删除 ${this.formData.id} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'ShippingPaySublistEdit')
        })
      })
    },
    resetData() {
      this.formData = {
        ...initFormData
      }
      this.freightPayInvoices = [...initFreightPayInvoices]
    },
    clickAddFreightPayInvoice() {
      this.freightPayInvoices.push({
        ...freightPayInvoiceEmptyData
      })
    },
    selectionChangeFreightPayInvoice(val) {
      this.freightPayInvoicesSelection = val
    },
    clickDeleteFreightPayInvoice() {
      if (this.freightPayInvoicesSelection.length > 0) {
        this.showFreightPayInvoiceDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedFreightPayInvoice() {
      this.freightPayInvoicesSelection.forEach(item => {
        for (let i = 0; i < this.freightPayInvoices.length; i++) {
          if (this.freightPayInvoices[i] === item) {
            this.freightPayInvoices.splice(i, 1)
            break
          }
        }
      })
      this.freightPayInvoicesSelection = []
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    width: 100%;
    margin-right: 0;
  }
  .el-table__body {
    padding-bottom: 12px;
  }
</style>
