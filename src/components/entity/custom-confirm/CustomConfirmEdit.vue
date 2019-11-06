<template>
  <div class="max-w back">
    <div class="container m-t-not">
      <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
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
              <el-form-item v-show="formData.billId" label="清关确认单号" prop="code">
                <el-input v-model="formData.code" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="formData.billId" label="制单时间" prop="createOrderTime">
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
              <el-form-item v-show="formData.billId" label="制单人" prop="createOrderMan">
                <el-input v-model="formData.createOrderMan" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="status">
                <CustomConfirmStatusEnumSelect :disabled="true" v-model="formData.status" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="商业发票号" prop="invoiceId">
                <CommercialInvoiceSelect 
                  :merging-split-type="3" 
                  v-model="formData.invoiceId" 
                  :stat="5"
                  :is-red="1"
                  :disabled="dis.commercialInvoiceCode" 
                  @changeData="changeCommercialInvoice" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同号" prop="contractCode">
                <el-input v-model="formData.contractCode" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发票流水号" prop="commercialInvoiceId">
                <el-input v-model="formData.commercialInvoiceId" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务员" prop="salesMan">
                <el-input v-model="formData.salesMan" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="销售部门" prop="salesDepartment">
                <el-input v-model="formData.salesDepartment" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="销售部门编码" prop="salesDepartmentCode">
                <el-input v-model="formData.salesDepartmentCode" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" prop="customer">
                <el-input v-model="formData.customer" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户编码" prop="customerCode">
                <el-input v-model="formData.customerCode" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发运方式" prop="shipType">
                <ShipTypeEnumSelect v-model="formData.shipType" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="有无产地证" prop="origin">
                <el-input v-model="formData.origin" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="产地证类型" prop="originCertificate">
                <el-input v-model="formData.originCertificate" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="formData.billId" label="经营单位" prop="operateUnitId">
                <OperateUnitSelect v-model="formData.operateUnitId" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input 
                  v-model="formData.remark"
                  type="textarea"
                  rows="2"
                  size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="formData.billId" label="是否需要修改" prop="isXiugai">
                <!-- <el-switch v-model="formData.isXiugai" :disabled="dis.isXiugai && formData.status !== 5 && isEdit" size="mini" /> -->
                <el-switch v-model="formData.isXiugai" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tabs>
      <el-tabs type="border-card">
        <el-tab-pane label="附件">
          <FileUpload
            :id="formData.id"
            :title="'附件'"
            :tab="1"
            :btn-text="'添加附件'"
            :bill-name="'清关单流水号'" />
        </el-tab-pane>  
        <el-tab-pane label="商业发票及装箱清单">
          <FileUpload
            :id="formData.id"
            :title="'商业发票及装箱清单'"
            :tab="2"
            :btn-text="'商业发票及装箱清单'"
            :bill-name="'清关单流水号'" />
        </el-tab-pane>  
        <el-tab-pane label="原产地证">
          <FileUpload
            :id="formData.id"
            :title="'原产地证'"
            :tab="3"
            :btn-text="'原产地证'"
            :bill-name="'清关单流水号'" />
        </el-tab-pane>  
        <el-tab-pane label="报关单">
          <FileUpload
            :id="formData.id"
            :title="'报关单'"
            :tab="4"
            :btn-text="'报关单'"
            :bill-name="'清关单流水号'" />
        </el-tab-pane>  
        <el-tab-pane label="提单草稿件">
          <FileUpload
            :id="formData.id" 
            :title="'提单草稿件'"
            :tab="5"
            :btn-text="'提单草稿件'"
            :bill-name="'清关单流水号'" />
        </el-tab-pane>  
      </el-tabs>
    </div>
  </div>
</template>

<script>
import customConfirmServer from './../../../api/customConfirmServer'
import fileServer from './../../../api/fileServer'
// import CustomInvoiceSelect from './CustomInvoiceSelect'
import ShipTypeEnumSelect from './../../entity/customs-bill/ShipTypeEnumSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import TradeDocumenterSelect from './../../../components/entity/trade-documenter/TradeDocumenterSelect'
import CustomConfirmStatusEnumSelect from './../../../components/entity/custom-confirm/CustomConfirmStatusEnumSelect'
import CommercialInvoiceSelect from './../commercial-invoice/CommercialInvoiceSelect'
import BillTypeEnumUtil from './../../enum/bill-type/BillTypeEnumUtil'
const emptyFormData = {
  id: null,
  code: null,
  createOrderTime: null,
  createOrderMan: null,
  status: 1,
  commercialInvoiceCode: null,
  invoiceId: null,
  contractCode: null,
  salesMan: null,
  salesDepartment: null,
  salesDepartmentCode: null,
  customer: null,
  customerCode: null,
  remark: null,
  entid: null,
  isXiugai: false,
  commercialInvoiceId: null,
  operateUnitId: null,
  shipType: null,
  origin: null,
  originCertificate: null

}
let initFormData = {
  ...emptyFormData
}
const initFormDis = {
  commercialInvoiceCode: false,
  remark: false,
  isXiugai: false,
}
const initFormDis2 = {
  commercialInvoiceCode: false,
  remark: false,
  isXiugai: false,
}
export default {
  name: 'CustomConfirmEdit',
  components: {
    // CustomInvoiceSelect,
    OperateUnitSelect,
    CustomConfirmStatusEnumSelect,
    CommercialInvoiceSelect,
    TradeDocumenterSelect,
    ShipTypeEnumSelect
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
      isEdit: true,
      formData: {
        ...initFormData
      },
      dis: { ...initFormDis },
      rules: {
        code: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        createOrderTime: [
        ],
        createOrderMan: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        status: [
        ],
        commercialInvoiceCode: [],
        invoiceId: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        contractCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        salesMan: [],
        salesDepartment: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        customer: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isXiugai: [
        ],
        commercialInvoiceId: [],
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
    if (this.id) {
      this.formData.id = this.id
      this.getData()      
    } else {
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }
    }
    if (this.formData.status === 1) {
      this.dis = { ...initFormDis2 }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    changeCommercialInvoice(data) {
      if (!data) {
        return
      }
      this.formData.commercialInvoiceCode = data.factInvoiceNo
      if (data.pinoNew != null) {
        this.formData.contractCode = data.pinoNew
      }
      if (data.salesUserId != null) {
        this.formData.salesMan = data.salesUserId 
      }    
      this.formData.commercialInvoiceId = data.invoiceNo
      this.formData.invoiceId = data.invoiceId
      this.formData.salesDepartment = data.orgName
      this.formData.salesDepartmentCode = data.orgCode     
      this.formData.customer = data.custName
      this.formData.customerCode = data.custCode  
      this.formData.shipType = data.shipType
      this.formData.origin = parseInt(data.origin) === 2 ? '是' : '否'
      this.formData.originCertificate = data.originCertificate
    },
    async getData() {
      this.loading = true
      const res = await customConfirmServer.get(this.formData.id)
      initFormData = res
      this.formData = {
        ...res
      }
      if (res.stat !== 1) {
        Object.keys(initFormDis).forEach(key => {
          initFormDis[key] = true
        })
        this.dis = { ...initFormDis }
      }
      this.formData.id = res.billId
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.id !== null && this.formData.id !== '') {
              const res = await customConfirmServer.put(this.formData)
              this.formData.id = res.billId
              this.getData()
            } else {
              this.formData.entid = this.$store.getters.entid
              const res = await customConfirmServer.post(this.formData)
              // if (res.billId) {
              //     // 新增保存成功后清空表单数据
              //     this.formData = { ...emptyFormData }
              //   }
              this.formData.id = res.billId
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
    async newStartProcess() {
      return new Promise(async(resolve, reject) => {
        const keyWord = {
          busCode: BillTypeEnumUtil.toValue('清关单流水号'), // 单据类型id
          busNo: this.formData.id, // 单据id
        }
        const data = {
          keyWord,
          page: {
            startRow: (this.page - 1) * 10,
            endRow: this.page * 10
          }
        }
        const res = await fileServer.checkFile(data)
        const judgeOne = res.data.filter(item => item.tabNo === 2)
        const judgeTwo = res.data.filter(item => item.tabNo === 5)
        if (judgeOne.length > 0 && judgeTwo.length > 0) {
          resolve()
        } else {
           this.$message({
            message: `商业发票及装箱清单或提单草稿件的附件不能为空！`,
            type: 'warning'
          })
          reject()
        }
      })
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
      // 在保存前的验证
      return new Promise(async(resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            await customConfirmServer.put(this.formData)
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
    shareProcessInfo(data) {
      if (data.nodeInfo && data.nodeInfo.length > 0) {
        if (data.nodeInfo[3] && data.nodeInfo[3].status === 'awaiting_check' || data.nodeInfo[3].status === 'agree') {
          this.isEdit = false
        }
        if (data.nodeInfo[3].status === 'awaiting_check') {
          // 流程节点在第四个节点，"是否需要修改"字段不置灰
          initFormDis.isXiugai = false
          this.dis = { ...initFormDis }
        }
      }
    },
    del() {
      this.$confirm('确定要删除当前表单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        customConfirmServer.delete(this.formData).then(() => {
          this.$message({
            message: `成功删除当前清关单 ${this.formData.billNo}`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'CustomConfirmEditPage') 
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
