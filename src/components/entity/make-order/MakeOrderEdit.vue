<template>
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
        <el-col v-if="formData.id" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单号" prop="makingOrderNo">
            <el-input v-model="formData.makingOrderNo" disabled size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单人" prop="createUser">
            <el-input v-model="formData.createUser" disabled size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单时间" prop="createDate">
            <el-date-picker
              v-model="formData.createDate"
              size="mini"
              disabled
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单状态" prop="makingStatus">
            <MakingStatusEnumSelect v-model="formData.makingStatus" :disabled="true"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="订舱单" prop="bookingNo">
            <el-input v-model="formData.bookingNo" :disabled="true"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="改单申请号" prop="changeNo">
            <ChangeOrderSelect v-model="formData.changeNo" :disabled="true" source="code"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发货人" prop="sender">
            <el-input 
              v-model="formData.sender"
              :disabled="isDisabled === true" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="收件人" prop="receiver">
            <el-input
              v-model="formData.receiver"
              :disabled="isDisabled === true"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="通知人" prop="notifier">
            <el-input
              v-model="formData.notifier"
              :disabled="isDisabled === true"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出运方式" prop="shipType">
            <ShipTypeEnumSelect 
              v-model="formData.shipType"
              :disabled="isDisabled === true" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="船名" prop="shipName">
            <el-input 
              v-model="formData.shipName"
              :disabled="isDisabled === true" 
              size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="航次" prop="saillings">
            <el-input 
              v-model="formData.saillings"
              :disabled="isDisabled === true"
              size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="提单号" prop="billNo">
            <el-input 
              v-model="formData.billNo"
              :disabled="isDisabled === true" 
              size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="订舱品名" prop="productName">
            <el-input 
              v-model="formData.productName"
              :disabled="isDisabled === true" 
              size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="箱号" prop="actualBoxNos">
            <el-input 
              v-model="formData.actualBoxNos"
              :disabled="isDisabled === true" 
              size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="封号" prop="seals">
            <el-input 
              v-model="formData.seals"
              :disabled="isDisabled === true"
              size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="付款方式" prop="payType">
            <PayTypeEnumSelect 
              v-model="formData.payType" 
              :disabled="true"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="包装的总数量" prop="total">
            <el-input-number 
              v-model="formData.total" 
              :disabled="isDisabled === true"
              :min="0" 
              size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="毛重" prop="grossWeight">
            <el-input-number 
              v-model="formData.grossWeight" 
              :disabled="isDisabled === true"
              :precision="2" 
              :step="1" 
              :min="0" 
              size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="体积" prop="volume">
            <el-input-number 
              v-model="formData.volume"
              :disabled="isDisabled === true" 
              :precision="2" 
              :step="1" 
              :min="0"
              size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="目的地" prop="destination">
            <el-input 
              v-model="formData.destination"
              :disabled="isDisabled === true"  
              size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货港" prop="seaportOutId">
            <PortSelect 
              v-model="formData.seaportOutId" 
              :disabled="isDisabled === true"
              @changeData="changeSeaportOut"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="到货港" prop="seaportInId">
            <PortSelect 
              v-model="formData.seaportInId" 
              :disabled="isDisabled === true"
              @changeData="changeSeaportIn"/>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :md="24" :sm="24" :xs="24">
          <el-form-item label="其他" prop="other">
            <el-input 
              v-model="formData.other" 
              :disabled="isDisabled === true"
              type="textarea"
              rows="2"
              size="mini" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs type="border-card">
      <el-tab-pane label="新仓单">
        <FileUpload
          :id="formData.id"
          :title="'附件'"
          :tab="1"
          :btn-text="'添加附件'"
          :bill-name="'制作提单'" />
      </el-tab-pane> 
      <el-tab-pane label="提单草件">
        <FileUpload
          :id="formData.id"
          :title="'附件'"
          :tab="2"
          :btn-text="'添加附件'"
          :bill-name="'制作提单'" />
      </el-tab-pane> 
      <el-tab-pane label="最终提单草件">
        <FileUpload
          :id="formData.id"
          :title="'附件'"
          :tab="3"
          :btn-text="'添加附件'"
          :bill-name="'制作提单'" />
      </el-tab-pane> 
    </el-tabs>
    <!-- <FileUpload
      :id= "id"
      :bill-name="'制作提单'"
      @uploadedFiles="receiveUploadedFiles"/> -->
  </div>
</template>

<script>
import makeOrderServer from './../../../api/makeOrderServer'
import fileServer from './../../../api/fileServer'
import PersonSelect from './../person/PersonSelect'
import ShipCabinOrderSelect from './../ship-cabin-order/ShipCabinOrderSelect'
import ChangeOrderSelect from './../change-order/ChangeOrderSelect'
import PortSelect from './../port/PortSelect'
import PayTypeEnumSelect from './../../../components/entity/make-order/PayTypeEnumSelect'
import ShipTypeEnumSelect from './../../../components/entity/make-order/ShipTypeEnumSelect'
import MakingStatusEnumSelect from './../../../components/entity/make-order/MakingStatusEnumSelect'
const emptyFormData = {
  id: null,
  makingOrderNo: null,
  createUser: null,
  createDate: null,
  makingStatus: null,
  bookingNo: null,
  changeNo: null,
  sender: null,
  receiver: null,
  notifier: null,
  shipType: null,
  shipName: null,
  saillings: null,
  billNo: null,
  productName: null,
  seals: null,
  actualBoxNos: null,
  payType: null,
  total: null,
  grossWeight: null,
  volume: null,
  destination: null,
  seaportOutId: null,
  seaportOutName: null,
  seaportInId: null,
  seaportInName: null,
  other: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'MakeOrderEdit',
  components: {
    ShipCabinOrderSelect,
    ChangeOrderSelect,
    PersonSelect,
    PortSelect,
    PayTypeEnumSelect,
    ShipTypeEnumSelect,
    MakingStatusEnumSelect,
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      isJudge1: false,
      isJudge2: false,
      isJudge3: false,
      processInfo: null,
      loading: false,
      isDisabled: false,
      uploadedFiles: {},
      formData: {
        ...initFormData
      },
      rules: {
        makingOrderNo: [],
        sender: [],
        receiver: [],
        notifier: [],
        shipName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        saillings: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        productName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        seals: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        actualBoxNos: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        total: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        grossWeight: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        volume: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        shipType: [
        ],
        payType: [
        ],
        destination: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        makingStatus: [
        ],
        other: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        versionNum: [
        ],
        bookingNo: [
        ],
        changeNo: [
        ],
        seaportOutId: [
        ],
        seaportInId: [
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
      this.formData.id = this.id
      this.getData()
    } else {
      this.$router.push({
        path: './make-order'
      })
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }
    }
  },
  methods: {
    // changeBooking(res) {
    //   if (res) {
    //     this.formData.bookingNo = res.bookingNo
    //   }
    // },
    changeSeaportIn(name, code) {
      this.formData.seaportInName = name
    },
    changeSeaportOut(name, code) {
      this.formData.seaportOutName = name
    },
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      try {
        const res = await makeOrderServer.get(this.id)
        initFormData = res.data.data
        this.formData = {
          ...res.data.data
        }
        if (this.formData.makingStatus === 2) {
          this.isDisabled = true
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.id) {
              await makeOrderServer.put(this.formData)
            } else {
              const res = await makeOrderServer.post(this.formData)
              this.formData.id = res.data.id
              this.$router.push({
                path: './' + res.data.id
              })
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
          return this.shareProcessInfo(event.params.info) 
        case 'startProcess':
          return this.newStartProcess() 
        case 'agreeProcess':
          return this.validBeforeProcess() 
        default:
          break
      }
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
    processStep2() {
      this.isJudge1 = true
    },
    processStep3() {
      this.isJudge2 = true
    },
    processStep5() {
      this.isJudge3 = true
    },
    async newStartProcess() {
      return new Promise(async(resolve, reject) => {
        await this.save()
        resolve()
      })
    },
    async validBeforeProcess() {
      return new Promise(async(resolve, reject) => {
        if (this.isJudge1 === true) {
          const keyWord = {
            busCode: 40106, // 单据类型id
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
          res.data = res.data.filter(item => item.tabNo === 1)
          if (res.data.length > 0) {
            await this.save()
            resolve()
          } else {
            this.$message({
              message: '新仓单未上传附件！',
              type: 'warning'
            })
            reject()
          }
        } else if (this.isJudge2 === true) {
          const keyWord = {
            busCode: 40106, // 单据类型id
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
          res.data = res.data.filter(item => item.tabNo === 2)
          if (res.data.length > 0) {
            await this.save()
            resolve()
          } else {
            this.$message({
              message: '提单草件未上传附件！',
              type: 'warning'
            })
            reject()
          }
        } else if (this.isJudge3 === true) {
          const keyWord = {
            busCode: 40106, // 单据类型id
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
          res.data = res.data.filter(item => item.tabNo === 3)
          if (res.data.length > 0) {
            await this.save()
            resolve()
          } else {
            this.$message({
              message: '最终提单草件未上传附件！',
              type: 'warning'
            })
            reject()
          }
        } else {
          await this.save()
          resolve()
        }
      })
    },
    resetData() {
      this.formData = {
        ...initFormData
      }
    },
    receiveUploadedFiles(files) {
      this.uploadedFiles = files
    }
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
  /deep/.el-form-item__error{
    padding-top: 0;
  }
</style>
