<template>
  <div class="max-w">
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
            <el-form-item label="申请单号" prop="code">
              <el-input v-model="formData.code" :disabled="true" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="单据状态" prop="orderStatus">
              <IrregularInvoiceOrderStatusEnumSelect v-model="formData.orderStatus" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发票号" prop="invoiceCode">
              <el-input v-model="formData.invoiceCode" :disabled="true" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="创建人" prop="createMan">
              <el-input v-model="formData.createMan" :disabled="true" size="mini" />
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
            <el-form-item label="申请类型" prop="applyType">
              <IrregularInvoiceApplyTypeEnumSelect :disabled="isDisabled === true" v-model="formData.applyType" @changeData="changeInvoiceApplyType"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户" prop="customerId">
              <CustomerSelect :disabled="isDisabled === true" v-model="formData.customerId" @changeData="receiveCustName"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                :rows="4"
                :disabled="isDisabled === true"
                v-model="formData.remark"
                type="textarea"
                placeholder="请输入内容"
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-tabs>
    <el-tabs type="border-card" class="m-b-24">
      <el-tab-pane label="商业发票">
        <el-row>
          <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="clickAddCommercialInvoice" />
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="clickDeleteCommercialInvoice" />
        </el-row>
        <el-alert
          :closable="false"
          :title="`已选中 ${commercialInvoiceSelection.length} 行数据`"
          class="m-t-12"
          type="info"
          show-icon
        />
        <el-table
          :data="commercialInvoiceList"
          border
          class="m-t-12"
          tooltip-effect="dark"
          style="width: 100%"
          @filter-method="commercialInvoiceFilter"
          @selection-change="selectionChangeCommercialInvoice">
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="note"
            label="说明"
            width="230"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.note"
                placeholder="请输入内容"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="factInvoiceNo"
            label="商业发票号"
            width="180"
          >
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="gotoInvoice(scope.row.invoiceId)">{{ scope.row.factInvoiceNo }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="custName"
            label="客户名称"
            width="180"
          />
          <el-table-column
            prop="custCode"
            label="客户编码"
            width="100"
          />
          <el-table-column
            prop="contractNo"
            label="合同号"
            width="150"
          />
          <el-table-column
            prop="amount"
            label="金额"
            width="100"
          />
          <el-table-column
            prop="paymentType"
            label="付款方式"
            width="120"
          />
          <el-table-column
            prop="fpjzDate"
            label="账期"
            width="120"
          />
          <el-table-column
            prop="oaQuota"
            label="OA额度"
            width="100"
          />
          <el-table-column
            label="申请类型"
            width="120">
            <template slot-scope="scope">
              {{ scope.row.appType === 1 ? '不符点' : scope.row.appType === 2 ? '交单金额差异' : scope.row.appType === 3 ? '提单倒签' : scope.row.appType }}
            </template>
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="日期"
            width="120"
          />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <FileUpload
      :id="id"
      :bill-name="'特殊单据申请'"
      @uploadedFiles="waitingUploadedFiles"/>
    <CommercialInvoiceSelectPopup
      v-if="showCommercialInvoiceSelectPopup"
      :condition="{ custId: formData.customerId }"
      @close="showCommercialInvoiceSelectPopup = false"
      @confirm="confirmCommercialInvoiceSelect"
    />
  </div>
</template>

<script>
import irregularInvoiceServer from './../../../api/irregularInvoiceServer'
import CustomerSelect from './../customer/CustomerSelect'
import Validate from './../../../utils/validate.js'

import IrregularInvoiceOrderStatusEnumSelect from './../../../components/entity/irregular-invoice/IrregularInvoiceOrderStatusEnumSelect'
import IrregularInvoiceApplyTypeEnumSelect from './../../../components/entity/irregular-invoice/IrregularInvoiceApplyTypeEnumSelect'
import CommercialInvoiceSelectPopup from './../../../components/entity/commercial-invoice/CommercialInvoiceSelectPopup'

const emptyFormData = {
  code: null,
  orderStatus: 1,
  invoiceCode: null,
  createMan: null,
  createTime: new Date(),
  applyType: 1,
  remark: null,
  isDelete: null,
  customerId: null,
  lineEntities: []
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'IrregularInvoiceEdit',
  components: {
    CustomerSelect,
    IrregularInvoiceOrderStatusEnumSelect,
    IrregularInvoiceApplyTypeEnumSelect,
    CommercialInvoiceSelectPopup
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      uploadedFiles: [],
      loading: false,
      isDisabled: false,
      formData: {
        ...initFormData
      },
      commercialInvoiceList: [],
      commercialInvoiceSelection: [],
      commercialInvoiceDeleteList: [],
      showCommercialInvoiceSelectPopup: false,
      rules: {
        code: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        orderStatus: [
        ],
        invoiceCode: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        createMan: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        createTime: [
        ],
        applyType: [
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        customerId: [
          { required: true, message: '不能为空', trigger: 'blur' }
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
      if (val !== initFormData.id) {
        this.getData()
      }
    },
    loading(val) {
      this.$emit('loadingChange', val)
    },
    commercialInvoiceList(val) {
      let str = ''
      val.forEach(item => {
        str += `,${item.factInvoiceNo}`
      })
      this.formData.invoiceCode = str === '' ? str : str.substr(1)
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
    emptyFormData.createMan = this.$store.getters.userCode
  },
  methods: {
    // 从选择组件拿客户名，需要传给服务器
    receiveCustName(name = '') {
      this.formData.customerName = name
    },
    close() {
      this.$emit('close')
    },    
    waitingUploadedFiles(data) {
      this.uploadedFiles = data
    },
    async getData() {
      this.loading = true
      const res = await irregularInvoiceServer.get(this.id)
      initFormData = res.data
      this.formData = {
        ...res.data
      }     
      if (res.data.orderStatus !== 1) {
        this.isDisabled = true
      } 
      this.commercialInvoiceList = this.formData.lineEntities != null ? [...this.formData.lineEntities] : []
      this.commercialInvoiceSelection = []
      this.commercialInvoiceDeleteList = []
      this.loading = false      
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            for (let i = 0; i < this.commercialInvoiceList.length; i++) {
              const item = this.commercialInvoiceList[i]
              if (!Validate.isNotEmpty(item.note)) {
                this.$message({
                  message: '商业发票的说明不允许为空，第' + (i + 1) + '行',
                  type: 'warning'
                })
                reject('error submit!!')
                return
              }
              if (item.deleted == null) {
                item.$state = 1
              } else {
                item.$state = 2
              }
              item.deleted = 0
            }
            this.commercialInvoiceDeleteList.forEach(item => {
              item.$state = 3
              item.deleted = 1
            })
            this.formData.lineEntities = [...this.commercialInvoiceList, ...this.commercialInvoiceDeleteList]
            if (this.formData.id) {
              await irregularInvoiceServer.put(this.formData)
            } else {
              const res = await irregularInvoiceServer.post(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                  // 新增保存成功后清空表单数据
                  this.formData = { ...emptyFormData }
                }
              this.formData.id = res.data.data.billsId
              this.formData.code = res.data.data.billsNo
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
    selectionChangeCommercialInvoice(val) {
      this.commercialInvoiceSelection = val
    },
    clickAddCommercialInvoice() {
      this.showCommercialInvoiceSelectPopup = true
    },
    clickDeleteCommercialInvoice() {
      const lineEntities = this.commercialInvoiceList
      this.commercialInvoiceSelection.forEach(item => {
        if (item.deleted != null) {
          item.deleted = 1
          this.commercialInvoiceDeleteList.push(item)
        }
        for (let i = 0; i < lineEntities.length; i++) {
          if (lineEntities[i] === item) {
            lineEntities.splice(i, 1)
            break
          }
        }
      })
      this.commercialInvoiceSelection = []
    },
    confirmCommercialInvoiceSelect(newList) {
      const commercialInvoiceIds = []
      const commercialInvoiceDeleteIds = []
      const commercialInvoiceList = this.commercialInvoiceList
      const commercialInvoiceDeleteList = this.commercialInvoiceDeleteList
      commercialInvoiceList.forEach(item => commercialInvoiceIds.push(item.invoiceId))
      commercialInvoiceDeleteList.forEach(item => commercialInvoiceDeleteIds.push(item.invoiceId))
      newList.forEach(item => {
        if (commercialInvoiceIds.includes(item.invoiceId)) {
          return
        } else if (commercialInvoiceDeleteIds.includes(item.invoiceId)) {
          for (let i = 0; i < commercialInvoiceDeleteList.length; i++) {
            if (commercialInvoiceDeleteList[i].invoiceId === item.invoiceId) {
              commercialInvoiceDeleteList.splice(i, 1)
              commercialInvoiceDeleteList[i].deleted = 0
              commercialInvoiceDeleteList[i].appType = this.formData.applyType
              this.commercialInvoiceList.push(commercialInvoiceDeleteList[i])
              break
            }
          }
        } else {
          item.deleted = null
          item.$state = 1
          item.contractNo = item.pinoNew
          item.paymentType = item.paymentTypeName
          // item.oaQuota = item.oaQuota
          item.amount = item.invoiceAmt
          item.note = '' // 默认选择的发票，备注/说明 字段置空
          item.appType = this.formData.applyType
          this.commercialInvoiceList.push(item)
        }
      })
      this.showCommercialInvoiceSelectPopup = false
    },
    commercialInvoiceFilter(value, row, column) {
      return row.deleted !== 1
    },
    gotoInvoice(id) {
      this.$router.push({
        path: '/DZ-manage/invoice-manage/commercial-invoice/edit/' + id
      })
    },
    changeInvoiceApplyType() {
      this.commercialInvoiceList.forEach(item => {
        item.appType = this.formData.applyType
      })
    },
    startProcess() {
      return new Promise((resovle, reject) => {
        // 第一次保存之后，强制要求上传附件
        // 第一次保存之后，就会生成id号
        if (this.id && this.uploadedFiles.length <= 0) {
          this.$message({
            message: '请先上传附件',
            type: 'warning'
          })
          return reject()
        } else {
          return resovle()
        }
      })
    },
    emitEvent({ key }) {
      switch (key) {
        case 'saveFormData':
          this.save()
          break
        case 'resetData':
          this.resetData()
          break
        case 'update':
          this.getData()
          break
        case 'startProcess':
          return this.startProcess()
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
</style>
