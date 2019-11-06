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
            <el-form-item label="流水号" required prop="code">
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
            <el-form-item label="状态" prop="status">
              <ExpenseRecordStatusEnumSelect v-model="formData.status" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出货预告号" required prop="shipmentNotice">
              <el-input v-model="formData.shipmentNotice" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="运费付款方式" prop="paymentMethod">
              <ExpenseRecordSPaymentMethodEnumSelect v-model="formData.paymentMethod" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="合同号" prop="contractCode">
              <el-input v-model="formData.contractCode" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="合计金额" prop="amount">
              <el-input-number v-model="formData.amount" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发票号" prop="invoiceCode">
              <el-input v-model="formData.invoiceCode" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="是否删除" prop="isDelete">
              <el-switch v-model="formData.isDelete" size="mini" />
            </el-form-item>
          </el-col>
          
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="部门" prop="departmentId">
              <DepartmentSelect v-model="formData.departmentId" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户" prop="customerId">
              <CustomerSelect v-model="formData.customerId" />
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
        <el-tab-pane label="费用登记明细">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="clickAddExpenseRecordItem" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="clickDeleteExpenseRecordItem" />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${expenseRecordItemsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="expenseRecordItems"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeExpenseRecordItem"
          >
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="payTarget"
              sortable
              width="210"
              label="支付对象">
              <template slot-scope="scope">
                <ExpenseRecordItemPayTargetEnumSelect v-model="scope.row.payTarget" />
              </template>
            </el-table-column>
            <el-table-column
              prop="invoiceCode"
              sortable
              width="180"
              label="发票号">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.invoiceCode"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="invoiceDate"
              sortable
              width="240"
              label="发票日期">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.invoiceDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="costCode"
              sortable
              width="180"
              label="费用编码">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.costCode"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="costName"
              sortable
              width="180"
              label="费用名称">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.costName"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="containerNumber"
              sortable
              width="190"
              label="柜数">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.containerNumber"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="containerCost"
              sortable
              width="190"
              label="单柜费用">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.containerCost"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="amount"
              sortable
              width="190"
              label="总费用">
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
              prop="amountRmb"
              sortable
              width="190"
              label="总费用(RMB)">
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
              prop="paymentCompany"
              sortable
              width="180"
              label="付款公司">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.paymentCompany"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="causes"
              sortable
              width="180"
              label="原因">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.causes"
                  maxlength="1024"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="thoseResponsible"
              sortable
              width="180"
              label="责任人">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.thoseResponsible"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="isAdditionalCharge"
              sortable
              label="是否额外费用">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isAdditionalCharge"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="reportCode"
              sortable
              width="180"
              label="报告号">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.reportCode"
                  maxlength="64"
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
              prop="containerId"
              sortable
              width="210"
              label="柜型">
              <template slot-scope="scope">
                <ContainerSelect v-model="scope.row.containerId" />
              </template>
            </el-table-column>
            <el-table-column
              prop="freightForwardingCompanyId"
              sortable
              width="210"
              label="货代公司">
              <template slot-scope="scope">
                <ShippingCompanySelect v-model="scope.row.freightForwardingCompanyId" />
              </template>
            </el-table-column>
            <el-table-column
              prop="currencyId"
              sortable
              width="210"
              label="货币">
              <template slot-scope="scope">
                <CurrencySelect v-model="scope.row.currencyId" />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

    </div>

    <component
      v-if="showExpenseRecordItemDeletePopup"
      :is="'ExpenseRecordItemDeletePopup'"
      :list="expenseRecordItemsSelection"
      @close="showExpenseRecordItemDeletePopup = false"
      @update="deletedExpenseRecordItem"
    />

  </div>
</template>

<script>
import expenseRecordServer from './../../../api/expenseRecordServer'
import expenseRecordItemServer from './../../../api/expenseRecordItemServer'
import validate from './../../../utils/validate'
import DepartmentSelect from './../department/DepartmentSelect'
import CustomerSelect from './../customer/CustomerSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import ExpenseRecordSelect from './../expense-record/ExpenseRecordSelect'
import ContainerSelect from './../container/ContainerSelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import CurrencySelect from './../currency/CurrencySelect'
import ExpenseRecordStatusEnumSelect from './../../../components/entity/expense-record/ExpenseRecordStatusEnumSelect'
import ExpenseRecordSPaymentMethodEnumSelect from './../../../components/entity/expense-record/ExpenseRecordSPaymentMethodEnumSelect'
import ExpenseRecordItemPayTargetEnumSelect from './../../../components/entity/expense-record-item/ExpenseRecordItemPayTargetEnumSelect'

const emptyFormData = {
  code: null,
  createMan: null,
  createTime: null,
  status: null,
  shipmentNotice: null,
  paymentMethod: null,
  contractCode: null,
  remark: null,
  amount: null,
  invoiceCode: null,
  isDelete: null,
  departmentId: null,
  customerId: null,
  operateUnitId: null,
}
const expenseRecordItemEmptyData = {
  payTarget: null,
  invoiceCode: null,
  invoiceDate: null,
  costCode: null,
  costName: null,
  containerNumber: null,
  containerCost: null,
  amount: null,
  tax: null,
  amountRmb: null,
  paymentCompany: null,
  causes: null,
  thoseResponsible: null,
  isAdditionalCharge: null,
  reportCode: null,
  remark: null,
  isDelete: null,
  expenseRecord: null,
  container: null,
  freightForwardingCompany: null,
  currency: null,
}

const expenseRecordItemRules = {
  payTarget: [
  ],
  invoiceCode: [
    {
      message: '发票号 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  invoiceDate: [
  ],
  costCode: [
    {
      message: '费用编码 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  costName: [
    {
      message: '费用名称 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  containerNumber: [
    { message: '柜数 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  containerCost: [
    { message: '单柜费用 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  amount: [
    { message: '总费用 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  tax: [
    { message: '其中税金 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  amountRmb: [
    { message: '总费用(RMB) 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  paymentCompany: [
    {
      message: '付款公司 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  causes: [
    {
      message: '原因 长度不能大于1024',
      validate: validate.validateStringMinimum,
      param: [1024]
    },
  ],
  thoseResponsible: [
    {
      message: '责任人 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  isAdditionalCharge: [
  ],
  reportCode: [
    {
      message: '报告号 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
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
  containerId: [
  ],
  freightForwardingCompanyId: [
  ],
  currencyId: [
    { message: '货币 不能为空', validate: validate.isNotEmpty },
  ],
}

let initFormData = {
  ...emptyFormData
}
let initExpenseRecordItems = []

export default {
  name: 'ExpenseRecordSublistEdit',
  components: {
    DepartmentSelect,
    CustomerSelect,
    OperateUnitSelect,
    ExpenseRecordSelect,
    ContainerSelect,
    ShippingCompanySelect,
    CurrencySelect,
    ExpenseRecordStatusEnumSelect,
    ExpenseRecordSPaymentMethodEnumSelect,
    ExpenseRecordItemPayTargetEnumSelect,
    ExpenseRecordItemDeletePopup: () => import('./../../../views/entity-page/expense-record-item/expenseRecordItemDeletePopup.vue'),
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
      expenseRecordItems: [],
      expenseRecordItemsSelection: [],
      showExpenseRecordItemDeletePopup: false,
      rules: {
        code: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        createMan: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        createTime: [
        ],
        status: [
        ],
        shipmentNotice: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        paymentMethod: [
        ],
        contractCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        amount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        invoiceCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        departmentId: [
        ],
        customerId: [
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
      const res = await expenseRecordServer.get(this.id)
      const expenseRecordItemRes = await expenseRecordItemServer.search({
        query: `expenseRecord.id:${this.id}`,
        page: 0,
        size: 999
      })
      initFormData = res.data
      this.formData = {
        ...res.data
      }
      initExpenseRecordItems = expenseRecordItemRes.data
      this.expenseRecordItems = [...initExpenseRecordItems]
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const expenseRecordItems = this.expenseRecordItems
            for (let i = 0; i < expenseRecordItems.length; i++) {
              const error = validate.dataObjectValidate(expenseRecordItems[i], expenseRecordItemRules)
              if (error) {
                this.$message({
                  message: `费用登记明细 第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            try {
              if (this.formData.id) {
                await expenseRecordServer.put(this.formData)
              } else {
                const res = await expenseRecordServer.post(this.formData)
                if (Number.parseInt(res.code) === 200) {
                  // 新增保存成功后清空表单数据
                  this.formData = { ...emptyFormData }
                }
                this.formData.id = res.rows[0].reg_id
              }
              initFormData = {
                ...this.formData
              }
              for (let i = 0; i < expenseRecordItems.length; i++) {
                const item = expenseRecordItems[i]
                item.expenseRecordId = initFormData.id
                if (item.id) {
                  await expenseRecordItemServer.put(item)
                } else {
                  await expenseRecordItemServer.post(item)
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
        expenseRecordServer.delete(this.formData.id).then(() => {
          this.$message({
            message: `删除 ${this.formData.id} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'ExpenseRecordSublistEdit')
        })
      })
    },
    resetData() {
      this.formData = {
        ...initFormData
      }
      this.expenseRecordItems = [...initExpenseRecordItems]
    },
    clickAddExpenseRecordItem() {
      this.expenseRecordItems.push({
        ...expenseRecordItemEmptyData
      })
    },
    selectionChangeExpenseRecordItem(val) {
      this.expenseRecordItemsSelection = val
    },
    clickDeleteExpenseRecordItem() {
      if (this.expenseRecordItemsSelection.length > 0) {
        this.showExpenseRecordItemDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedExpenseRecordItem() {
      this.expenseRecordItemsSelection.forEach(item => {
        for (let i = 0; i < this.expenseRecordItems.length; i++) {
          if (this.expenseRecordItems[i] === item) {
            this.expenseRecordItems.splice(i, 1)
            break
          }
        }
      })
      this.expenseRecordItemsSelection = []
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
