<template>
  <div class="max-w">
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
            <el-input v-model="formData.code" :disabled="true" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建人" prop="createMan">
            <el-input v-model="formData.createMan" :disabled="true" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建时间" prop="createTime">
            <el-date-picker
              v-model="formData.createTime"
              :disabled="true"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单据状态" prop="orderStatus">
            <ChangeOrderOrderStatusEnumSelect v-model="formData.orderStatus" :disabled="true"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="经营单位" prop="operateUnitId">
            <OperateUnitSelect v-model="formData.entid" :disabled="true"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号" prop="shipmentNoticeId">
            <ShipmentNoticeSelect
              v-show="formData.orderStatus === 1"
              v-model="formData.shipmentNoticeId"
              size="mini"
              @changeData="changeShipmentNotice"
            />
            <el-input 
              v-show="formData.orderStatus !== 1"
              v-model="formData.warnNo" 
              :disabled="true" 
              size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号" prop="piNo">
            <el-input v-model="formData.piNo" :disabled="true" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户" prop="customer">
            <el-input v-model="formData.customer" :disabled="true" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="改单费" prop="changeOrderCost">
            <el-input-number v-model="formData.changeOrderCost" :disabled="isMust == true" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="费用承担人" prop="paymentMan">
            <el-input v-model="formData.paymentMan" :disabled="formData.orderStatus !== 1" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="改单原因" prop="changeReason">
            <el-input
              v-model="formData.changeReason"
              :rows="4"
              :disabled="formData.orderStatus !== 1"
              type="textarea"
              size="mini"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="改单内容" prop="changeContent">
            <el-input
              v-model="formData.changeContent"
              :rows="4"
              :disabled="formData.orderStatus !== 1"
              type="textarea"
              size="mini"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <FileUpload :id="id" :bill-name="'改单申请单据号'"/>
    </el-form>
  </div>
</template>

<script>
import changeOrderServer from './../../../api/changeOrderServer'
import shipmentNoticeServer from './../../../api/shipmentNoticeServer.js'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import ChangeOrderOrderStatusEnumSelect from './../../../components/entity/change-order/ChangeOrderOrderStatusEnumSelect'
import ShipmentNoticeSelect from './../../../components/entity/shipment-notice/ShipmentNoticeSelect'
// import shipmentNoticeServer from './../../../api/shipmentNoticeServer.js'
const emptyFormData = {
  code: null,
  createMan: null,
  createTime: new Date(),
  orderStatus: 1,
  shipmentNotice: null,
  piNo: null,
  customer: null,
  changeOrderCost: null,
  paymentMan: null,
  changeReason: null,
  changeContent: null,
  isDelete: null,
  operateUnitId: null,
  shipmentNoticeId: null,
  entid: null
}
let initFormData = {
  ...emptyFormData
}
const rules = {
  code: [
    { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  createMan: [
    { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  createTime: [],
  orderStatus: [],
  shipmentNotice: [
    { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  shipmentNoticeId: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ],
  piNo: [
    { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  customer: [
    { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  changeOrderCost: [
    { type: 'number', message: '必须为数字', trigger: 'blur' }
  ],
  paymentMan: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
  ],
  changeReason: [
    { required: true, message: '不能为空', trigger: 'blur' },
    {
      min: 0,
      max: 1024,
      message: '长度在 0 到 1024 个字符',
      trigger: 'blur'
    }
  ],
  changeContent: [
    { required: true, message: '不能为空', trigger: 'blur' },
    {
      min: 0,
      max: 1024,
      message: '长度在 0 到 1024 个字符',
      trigger: 'blur'
    }
  ]
}
export default {
  name: 'ChangeOrderEdit',
  components: {
    OperateUnitSelect,
    ChangeOrderOrderStatusEnumSelect,
    ShipmentNoticeSelect
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
      isMust: false,
      formData: {
        ...initFormData
      },
      rules: { ...rules }
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
    emptyFormData.createMan = this.$store.getters.userCode
    emptyFormData.entid = this.$store.getters.entid
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
      const res = await changeOrderServer.get(this.id)
      initFormData = { ...res.data }
      initFormData.changeOrderCost = parseFloat(initFormData.changeOrderCost)
      this.formData = {
        ...res.data
      }
      if (this.formData.orderStatus === 5) {
        this.isMust = true
      }
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.id) {
              await changeOrderServer.put(this.formData)
            } else {
              const res = await changeOrderServer.post(this.formData)
              // if (Number.parseInt(res.data.code) === 200) {
              //   // 新增保存成功后清空表单数据
              //   this.formData = { ...emptyFormData }
              // }
              this.formData.id = res.data.data.dataSet.rows[0].gd_id
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
    },
    changeShipmentNotice(item) {
      this.formData.warnId = item.warnid
      this.formData.warnNo = item.warnno
      this.formData.piNo = item.pino
      this.formData.customer = item.custname
    },
    shareProcessInfo(info) {
      this.processInfo = info
      if (
        this.processInfo &&
        this.processInfo.nodeInfo &&
        this.processInfo.nodeInfo.length
      ) {
        this.processInfo.nodeInfo.forEach(processNode => {
          if (processNode.status && processNode.status === 'awaiting_check') {
            this.curProcessOrder = processNode.nodeOrder
            const eventName = 'processStep' + this.curProcessOrder
            this[eventName] && this[eventName]()
          }
        })
      }
    },
    processStep0() {
      this.isMust = true
    },
    processStep1() {
      this.isMust = true
    },
    async processStep2() {
      let payStyle = null
      const res = await shipmentNoticeServer.search({
        query: {
          id: this.formData.warnId
        }
      })

      payStyle = parseInt(res.data[0].paystyle)      
      if (payStyle === 1 || payStyle === 2 || payStyle === 3 || payStyle === 4) {
        this.isMust = false
        this.rules.changeOrderCost = [
          { required: true, 
            validator: (rule, value, callback) => {
              if (this.formData.changeOrderCost === 0 || this.formData.changeOrderCost === null || this.formData.changeOrderCost === '') {
                return callback(new Error('改单费不能为空且必须大于0'))
              }
              callback()
            },
            trigger: 'blur' }
        ]
      } else {
        this.isMust = true
      }
    },
    async processStep3() {
      let payStyle = null
      const res = await shipmentNoticeServer.search({
        query: {
          id: this.formData.warnId
        }
      })
      payStyle = parseInt(res.data[0].paystyle)      
      if (payStyle === 1 || payStyle === 4) {
        this.isMust = false
        this.rules.changeOrderCost = [
          { required: true, 
            validator: (rule, value, callback) => {
              if (this.formData.changeOrderCost === 0 || this.formData.changeOrderCost === null || this.formData.changeOrderCost === '') {
                return callback(new Error('改单费不能为空且必须大于0'))
              }
              callback()
            },
            trigger: 'blur' }
        ]
      } else {
        this.isMust = true
      }
    },
    async processStep4() {
      this.isMust = true
    },
    async processStep5() {
      let payStyle = null
      const res = await shipmentNoticeServer.search({
        query: {
          id: this.formData.warnId
        }
      })
      payStyle = parseInt(res.data[0].paystyle)     
      if (payStyle === 1 || payStyle === 3) {
        this.isMust = false
        this.rules.changeOrderCost = [
          { required: true, 
            validator: (rule, value, callback) => {
              if (this.formData.changeOrderCost === 0 || !this.formData.changeOrderCost) {
                return callback(new Error('改单费不能为空且必须大于0'))
              }
              callback()
            },
            trigger: 'blur' }
        ]
      } else {
        this.isMust = true
      }
    },
    async processStep6() {
      this.isMust = true
    },
    emitEvent(event) {
      switch (event.key) {
        case 'saveFormData':
          this.save()
          break
        case 'resetData':
          this.resetData()
          break
        case 'update':
          this.getData()
          break
        case 'shareProcessInfo':
          this.shareProcessInfo(event.params.info)
          break
        case 'agreeProcess':
          return this.newAgreeProcess()
        case 'startProcess':
          return this.newStartProcess()
        default:
          break
      }
    },
    async newAgreeProcess() {
      await this.saveBeforeStart()
    },
    async newStartProcess() {
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
          // 如果当前表单数据与初始化数据相同，检查当前数据实际发货数据是否相同
          try {
            resolve()
          } catch (e) {
            reject(e)
          }
        }
      })
    },
    async saveBeforeStart() {
      // 在保存前的验证
      return new Promise(async(resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.id) {
              await changeOrderServer.put(this.formData)
            } else {
              const res = await changeOrderServer.post(this.formData)
              this.formData.id = res.data.data.dataSet.rows[0].gd_id
              this.getData()
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
            resolve({
              ...this.formData
            })
            // await this.checkInfo()
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
    // async checkInfo() {
    //   const res = await shipmentNoticeServer.search({
    //     query: {
    //       id: this.formData.warnId
    //     }
    //   })
    //   const boolInfo = res.data[0].logisticsname
    //   if (boolInfo !== null && boolInfo !== '') {
    //     this.$parent.changeRemark('指定货代')
    //   } else {
    //     this.$parent.changeRemark('协议货代')
    //   }
    // }
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
