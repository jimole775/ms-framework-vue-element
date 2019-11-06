<template>
  <div class="max-w">
    <el-tabs v-loading="loading" tab-position="top">
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
              <el-form-item label="登记单号" prop="code">
                <el-input v-model="formData.code" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单时间" prop="createOrderTime">
                <el-date-picker
                  v-model="formData.createOrderTime"
                  :disabled="true"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单人" prop="createOrderMan">
                <el-input v-model="formData.createOrderMan" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="单据状态" prop="orderStatus">
                <CommercialInvoiceSplitOrderStatusEnumSelect
                  v-model="formData.orderStatus"
                  :disabled="true"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="商业发票号" prop="commercialInvoiceCode">
                <CommercialInvoiceSelect
                  :merging-split-type="3"
                  v-model="formData.commercialInvoiceId"
                  :condition="{stat: 5, isRed: 1}"
                  :disabled="dis.commercialInvoiceId"
                  @changeData="changeCommercialInvoice"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="信用证号" prop="creditCertificateCode">
                <el-input v-model="formData.creditCertificateCode" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="付款方式" prop="paymentMethod">
                <el-input v-model="formData.paymentMethod" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务部门" prop="salesDepartment">
                <el-input v-model="formData.salesDepartment" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" prop="custName">
                <el-input v-model="formData.custName" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发票流水号" prop="commercialInvoiceCode">
                <el-input v-model="formData.commercialInvoiceCode" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同号" prop="contractCode">
                <el-input v-model="formData.contractCode" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="预计收汇日期" prop="estimatedReceivedRemittanceDate">
                <el-date-picker
                  v-model="formData.estimatedReceivedRemittanceDate"
                  :disabled="dis.estimatedReceivedRemittanceDate"
                  size="mini"
                  class="max-w"
                  type="date"
                  @change="computedAmount"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资类型" prop="financingType">
                <FinancingRegistrationFinancingTypeEnumSelect
                  v-model="formData.financingType"
                  :filter="financingTypeFilter"
                  :clearable="false"
                  :disabled="dis.financingType"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资金额" prop="financingAmount">
                <el-input-number
                  v-model="formData.financingAmount"
                  :min="0"
                  :disabled="dis.financingAmount"
                  size="mini"
                  @change="computedAmount"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资利率" prop="financingInterestRate">
                <el-input-number
                  v-model="formData.financingInterestRate"
                  :precision="5"
                  :step="0.01"
                  :min="0"
                  :disabled="dis.financingInterestRate"
                  size="mini"
                  @change="computedAmount"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资日期" prop="financingDate">
                <el-date-picker
                  v-model="formData.financingDate"
                  :disabled="dis.financingDate"
                  size="mini"
                  class="max-w"
                  type="date"
                  @change="computedAmount"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资天数" prop="financingDay">
                <el-input-number v-model="formData.financingDay" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资利息" prop="financingInterest">
                <el-input-number v-model="formData.financingInterest" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="手续费利率" prop="serviceChargeInterestRate">
                <el-input-number
                  v-model="formData.serviceChargeInterestRate"
                  :step="0.01"
                  :disabled="dis.serviceChargeInterestRate"
                  size="mini"
                  @change="computedAmount"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="手续费" prop="serviceCharge">
                <el-input-number v-model="formData.serviceCharge" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发票金额" prop="invoiceAmount">
                <el-input-number v-model="formData.invoiceAmount" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="libor" prop="libor">
                <el-input-number
                  v-model="formData.libor"
                  :precision="5"
                  :step="0.01"
                  disabled
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="成本利率" prop="costingRate">
                <el-input-number
                  v-model="formData.costingRate"
                  :precision="5"
                  :step="0.01"
                  :min="0"
                  :disabled="dis.costingRate"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="还押汇日期" prop="alsoDatetime">
                <el-date-picker
                  v-model="formData.alsoDatetime"
                  :disabled="dis.alsoDatetime"
                  size="mini"
                  class="max-w"
                  type="date"
                />
              </el-form-item>
            </el-col>
            <!--<el-col :lg="6" :md="8" :sm="12" :xs="24">-->
            <!--<el-form-item label="是否删除" prop="isDelete">-->
            <!--<el-switch v-model="formData.isDelete" size="mini" />-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="融资银行" prop="financingBankId">
                <BankSelect v-model="formData.financingBankId" :disabled="dis.financingBankId" @changeData="changeFinancingBank"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="经营单位" prop="operateUnitId">
                <OperateUnitSelect v-model="formData.operateUnitId" :disabled="true"/>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input :rows="4" v-model="formData.remark" :disabled="dis.remark" type="textarea" placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import financingRegistrationServer from './../../../api/financingRegistrationServer'
import CommercialInvoiceSelect from './../commercial-invoice/CommercialInvoiceSelect'
import BankSelect from './../bank/BankSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import validate from './../../../utils/validate'
import CommercialInvoiceSplitOrderStatusEnumSelect from './../../../components/entity/financing-registration/CommercialInvoiceSplitOrderStatusEnumSelect'
import FinancingRegistrationFinancingTypeEnumSelect from './../../../components/entity/financing-registration/FinancingRegistrationFinancingTypeEnumSelect'
const emptyFormData = {
  code: null,
  createOrderTime: new Date(),
  createOrderMan: null,
  orderStatus: 1,
  commercialInvoiceCode: null,
  creditCertificateCode: null,
  paymentMethod: null,
  salesDepartment: null,
  custName: null,
  contractCode: null,
  estimatedReceivedRemittanceDate: null,
  financingType: null,
  financingAmount: null,
  financingInterestRate: null,
  financingDate: null,
  financingDay: null,
  financingInterest: null,
  serviceChargeInterestRate: 0,
  serviceCharge: null,
  invoiceAmount: null,
  remark: null,
  isDelete: null,
  commercialInvoiceId: null,
  financingBankId: null,
  operateUnitId: null,
  libor: 0,
  costingRate: 0,
  alsoDatetime: null,
  entid: null
}
let initFormData = {
  ...emptyFormData
}
const initFormDis = {
  code: false,
  createOrderTime: false,
  createOrderMan: false,
  orderStatus: false,
  commercialInvoiceCode: false,
  creditCertificateCode: false,
  paymentMethod: false,
  salesDepartment: false,
  custName: false,
  contractCode: false,
  estimatedReceivedRemittanceDate: false,
  financingType: false,
  financingAmount: false,
  financingInterestRate: false,
  financingDate: false,
  financingDay: false,
  financingInterest: false,
  serviceChargeInterestRate: false,
  serviceCharge: false,
  invoiceAmount: false,
  remark: false,
  isDelete: false,
  commercialInvoiceId: false,
  financingBankId: false,
  operateUnitId: false,
  libor: false,
  costingRate: false,
  alsoDatetime: true,
}

export default {
  name: 'FinancingRegistrationEdit',
  components: {
    CommercialInvoiceSelect,
    BankSelect,
    OperateUnitSelect,
    CommercialInvoiceSplitOrderStatusEnumSelect,
    FinancingRegistrationFinancingTypeEnumSelect
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
      dis: { ...initFormDis },
      financingTypeFilter: [-1],
      rules: {
        createOrderTime: [],
        createOrderMan: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        alsoDatetime: [],
        orderStatus: [],
        commercialInvoiceCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        creditCertificateCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        paymentMethod: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        salesDepartment: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        custName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        contractCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        estimatedReceivedRemittanceDate: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            message: '必须大于融资日期',
            validator: (rule, value, callback) => {
              if (
                this.formData.estimatedReceivedRemittanceDate != null &&
                this.formData.financingDate != null
              ) {
                if (
                  this.formData.financingDate.getTime() >=
                  this.formData.estimatedReceivedRemittanceDate.getTime()
                ) {
                  callback(new Error('必须大于融资日期'))
                  return
                }
              }
              callback()
            }
          }
        ],
        financingType: [],
        financingAmount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        financingInterestRate: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        financingDate: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            message: '必须小于预计收汇日期',
            validator: (rule, value, callback) => {
              if (
                this.formData.estimatedReceivedRemittanceDate != null &&
                this.formData.financingDate != null
              ) {
                if (
                  this.formData.financingDate.getTime() >=
                  this.formData.estimatedReceivedRemittanceDate.getTime()
                ) {
                  callback(new Error('必须小于预计收汇日期'))
                  return
                }
              }
              callback()
            }
          }
        ],
        financingDay: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        financingInterest: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        serviceChargeInterestRate: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        serviceCharge: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        invoiceAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        remark: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        isDelete: [],
        commercialInvoiceId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        financingBankId: [],
        operateUnitId: []
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
    // id(val) {
    //   if (val !== this.initFormData.id) {
    //     this.getData()
    //   }
    // },
    loading(val) {
      this.$emit('loadingChange', val)
    }
  },
  created() {
    if (this.id !== null && this.id !== 'new') {
      this.getData()
    } else {
      emptyFormData.createOrderMan = this.$store.getters.userCode
      emptyFormData.operateUnitId = this.$store.getters.entid
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }      
      Object.keys(initFormDis).forEach((key) => {
        initFormDis[key] = false
      })
      this.dis = { ...initFormDis }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      const res = await financingRegistrationServer.get(this.id)
      initFormData = res.data
      this.formData = {
        ...res.data
      }
      if (res.data.stat !== 1) {
        Object.keys(initFormDis).forEach(key => {
          initFormDis[key] = true
        })
        this.dis = { ...initFormDis }
      }
      this.computedAmount()
      this.setFinancingTypeFilter()
      this.loading = false
    },
    async newAgreeProcess() {
      return new Promise(async(resolve, reject) => {
        if (JSON.stringify(initFormData) !== JSON.stringify(this.formData)) {
          // 如果当前表单数据与初始化数据不同，提示要先保存
          this.$confirm('是否确认提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async() => {
              // 同意保存，执行保存动作
              try {
                resolve(await this.saveBeforeStart())
              } catch (e) {
                reject(e)
              }
            })
            .catch(() => {
              // 不同意保存，断开流程
              reject()
            })
        } else {
          // 如果当前表单数据与初始化数据相同
          resolve()
        }
      })
    },
    async saveBeforeStart() {
      return new Promise(async(resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            try {
              const lcDayNumber = this.getLcDayNumber(this.formData.paymentMethod) || 0
              const oaDayNumber = this.getOaDayNumber(this.formData.paymentMethod) || 0
              if (validate.isNotEmpty(this.formData.creditCertificateCode)) {
                if (lcDayNumber < 60 && oaDayNumber < 60) {
                  this.$message({
                    message: '付款方式 LC 或 OA 天数需要达到 60 天',
                    type: 'warning'
                  })
                  reject('error submit!!')
                  return
                }
              } else {
                if (oaDayNumber < 60) {
                  this.$message({
                    message: '付款方式 OA 天数需要达到 60 天',
                    type: 'warning'
                  })
                  reject('error submit!!')
                  return
                }
              }
              if (this.formData.financingInterestRate) {
                this.formData.libor = this.formData.financingInterestRate - this.formData.costingRate
              }
              const { data } = await financingRegistrationServer.put(this.formData)
              if (data.code === 200) {
                initFormData = {
                  ...this.formData
                }                
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                resolve()
              } else {
                reject()
                return
              }
            } catch (e) {
              this.$message({
                message: '保存失败 ' + e.message,
                type: 'error',
                duration: 5000
              })
              reject()
              return
            }
          } else {
            if (this.editConsignor || this.editMessage) {
              this.$message({
                message: '请将单据信息中的资料填写完全',
                type: 'warning'
              })
            } else {
              this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            }
            reject()
          }
        })
      })
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const lcDayNumber =
              this.getLcDayNumber(this.formData.paymentMethod) || 0
            const oaDayNumber =
              this.getOaDayNumber(this.formData.paymentMethod) || 0
            if (validate.isNotEmpty(this.formData.creditCertificateCode)) {
              if (lcDayNumber < 60 && oaDayNumber < 60) {
                this.$message({
                  message: '付款方式 LC 或 OA 天数需要达到 60 天',
                  type: 'warning'
                })
                reject('error submit!!')
                return
              }
            } else {
              if (oaDayNumber < 60) {
                this.$message({
                  message: '付款方式 OA 天数需要达到 60 天',
                  type: 'warning'
                })
                reject('error submit!!')
                return
              }
            }
            if (this.formData.financingInterestRate) {
              this.formData.libor =
                this.formData.financingInterestRate - this.formData.costingRate
            }
            if (this.formData.id) {
              await financingRegistrationServer.put(this.formData)
            } else {
              const res = await financingRegistrationServer.post(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                // 新增保存成功后清空表单数据
                this.formData = { ...emptyFormData }
                const resData = res.data.data.dataSet.rows[0]
                this.formData.id = resData.bill_id
                this.formData.code = resData.billNo
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
                reject('error submit!!')
                return
              }
            }
            initFormData = {
              ...this.formData
            }
            this.$emit('emitEvent', {
              key: 'update',
              params: {
                id: this.formData.id
              }
            })
            this.$message({
              message: '保存成功',
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
    shareProcessInfo(data) {
      this.processInfo = data
      if (data.nodeInfo && data.nodeInfo.length > 0) {
        if (data.nodeInfo[3].status === 'awaiting_check') {
          // 第四个节点时还押汇日期字段可编辑
          initFormDis.alsoDatetime = false
          this.dis = { ...initFormDis }
          this.rules.alsoDatetime = [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    resetData() {
      this.formData = {
        ...initFormData
      }
    },
    changeFinancingBank(item) {
      this.formData.rongziBank = item.bankName
    },
    changeCommercialInvoice(item) {
      if (item == null) {
        return null
      }
      this.formData.commercialInvoiceCode = item.invoiceNo
      this.formData.creditCertificateCode = item.lcNo
      this.formData.paymentMethod = item.paymentTypeName
      this.formData.salesDepartment = item.orgName
      this.formData.custName = item.custName
      this.formData.contractCode = item.piNo
      this.formData.invoiceAmount = item.invoiceAmt
      this.setFinancingTypeFilter()
    },
    computedAmount() {
      const estimatedReceivedRemittanceDate = this.formData
        .estimatedReceivedRemittanceDate
      const financingDate = this.formData.financingDate
      if (estimatedReceivedRemittanceDate == null || financingDate == null) {
        this.formData.financingDay = 0
        this.formData.financingInterest = 0
        return
      }
      const timeNumber =
        estimatedReceivedRemittanceDate.getTime() - financingDate.getTime()
      if (timeNumber < 0) {
        this.formData.financingDay = 0
        this.formData.financingInterest = 0
        return
      }
      const dayNumber =
        timeNumber % 86400000 > 0
          ? timeNumber / 86400000 + 1
          : timeNumber / 86400000
      this.formData.financingDay = dayNumber
      this.formData.serviceCharge =
        (this.formData.financingAmount *
          this.formData.serviceChargeInterestRate) /
        100
      this.formData.financingInterest = (
        (this.formData.financingAmount *
          this.formData.financingInterestRate *
          dayNumber) /
        36000
      ).toFixed(2)
    },
    setFinancingTypeFilter() {
      const lcDayNumber = this.getLcDayNumber(this.formData.paymentMethod) || 0
      const oaDayNumber = this.getOaDayNumber(this.formData.paymentMethod) || 0
      if (validate.isNotEmpty(this.formData.creditCertificateCode)) {
        if (lcDayNumber >= 60 || oaDayNumber >= 60) {
          this.financingTypeFilter = [3, 4, 5]
        } else {
          this.financingTypeFilter = [-1]
        }
      } else {
        if (oaDayNumber >= 60) {
          this.financingTypeFilter = [1, 2]
        } else {
          this.financingTypeFilter = [-1]
        }
      }
      if (!this.financingTypeFilter.includes(this.formData.financingType)) {
        this.formData.financingType =
          this.financingTypeFilter[0] === -1
            ? null
            : this.financingTypeFilter[0]
      }
    },
    getLcDayNumber(val) {
      if (val == null) {
        return null
      }
      const res = val.match(/LC(\S*)天/)
      return res == null ? null : res[1]
    },
    getOaDayNumber(val) {
      if (val == null) {
        return null
      }
      const res = val.match(/OA(\S*)天/)
      return res == null ? null : res[1]
    },
    emitEvent(event) {
      switch (event.key) {
        case 'saveFormData':
          this.save()
          break
        case 'resetData':
          this.resetData()
          break
        case 'shareProcessInfo':
          this.shareProcessInfo(event.params.info)
          break
        case 'update':
          this.getData()
          break
        case 'agreeProcess':
          return this.newAgreeProcess()
        default:
          break
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
.el-input-number {
  width: 100%;
}
</style>
