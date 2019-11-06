<template>
  <div class="max-w back">
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
            <el-form-item label="登记流水号" prop="regNo">
              <el-input :disabled="true" v-model="formData.regNo" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="创建人" prop="createUser">
              <el-input :disabled="true" v-model="formData.createUser" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="创建时间" prop="createDate">
              <el-input :disabled="true" v-model="formData.createDate" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="状态" prop="stat">
              <ExtraFeeStatEnumSelect :disabled="true" v-model="formData.stat" />
            </el-form-item>
          </el-col>
          <el-col :xs="24">
            <el-form-item label="备注" prop="note">
              <el-input v-model="formData.note" size="mini" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs type="border-card">
        <el-tab-pane label="额外费用登记明细">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="clickAddExtraFeeItem" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="clickDeleteExtraFeeItem" />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${extraFeeItemsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="extraFeeItems"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeExtraFeeItem"
          >
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="inputDate"
              width="240"
              label="输单日期">
              <template slot-scope="scope">
                <el-date-picker
                  :disabled="true"
                  v-model="scope.row.inputDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期时间"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="warnNo"
              width="180"
              label="出货预告号">
              <template slot-scope="scope">
                <el-input
                  :disabled="true"
                  v-model="scope.row.warnNo"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="piNo"
              width="180"
              label="合同号">
              <template slot-scope="scope">
                <el-input
                  :disabled="true"
                  v-model="scope.row.piNo"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="areaName"
              width="210"
              label="大区">
              <template slot-scope="scope">
                <el-input
                  :disabled="true"
                  v-model="scope.row.areaName"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="orgName"
              width="210"
              label="部门">
              <template slot-scope="scope">
                <el-input
                  :disabled="true"
                  v-model="scope.row.orgName"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="boxQty"
              width="190"
              label="柜量">
              <template slot-scope="scope">
                <el-input-number
                  :disabled="true"
                  v-model="scope.row.boxQty"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="currencyCode"
              width="210"
              label="币种">
              <template slot-scope="scope">
                <CurrencySelect :disabled="true" v-model="scope.row.currencyCode" />
              </template>
            </el-table-column>
            <el-table-column
              prop="feeType"
              width="180"
              label="费用名称">
              <template slot-scope="scope">
                <el-input
                  :disabled="true"
                  v-model="scope.row.feeType"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="amt"
              width="190"
              label="金额">
              <template slot-scope="scope">
                <el-input-number
                  :disabled="true"
                  v-model="scope.row.amt"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="transitName"
              width="210"
              label="货代">
              <template slot-scope="scope">
                <el-input
                  :disabled="true"
                  v-model="scope.row.transitName"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="cutDate"
              width="240"
              label="截关日期">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.cutDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期时间"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="reason"
              width="180"
              label="原因">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.reason"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="resMan"
              width="180"
              label="责任人">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.resMan"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="responsibleLeader"
              width="210"
              label="负责人">
              <template slot-scope="scope">
                <ResponsibleLeaderEnumSelect v-model="scope.row.responsibleLeader" />
              </template>
            </el-table-column>
            <el-table-column
              prop="responsibleOrg"
              width="210"
              label="责任体系">
              <template slot-scope="scope">
                <ResponsibleOrgEnumSelect v-model="scope.row.responsibleOrg" />
              </template>
            </el-table-column>
            <el-table-column
              prop="negativeIncentive"
              width="190"
              label="负激励">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.negativeIncentive"
                  :precision="2"
                  :step="1"
                  size="mini" 
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="costConfirmDate"
              width="210"
              label="费用确认时间" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <ExtraRecordSelect v-if="showCostRecord" @confirm="confirmInfo" @close="showCostRecord = false" />
  </div>
</template>

<script>
import extraFeeServer from './../../../api/extraFeeServer'
// import extraFeeItemServer from './../../../api/extraFeeItemServer'
// import validate from './../../../utils/validate'
import ExtraRecordSelect from './ExtraRecordSelect.vue'
import ExtraFeeStatEnumSelect from './../../../components/entity/extra-fee/ExtraFeeStatEnumSelect'
import CurrencySelect from './../../../components/entity/currency/CurrencySelect'
import ResponsibleLeaderEnumSelect from './../../../components/entity/extra-fee-item/ResponsibleLeaderEnumSelect'
import ResponsibleOrgEnumSelect from './../../../components/entity/extra-fee-item/ResponsibleOrgEnumSelect'

const emptyFormData = {
  id: null,
  warnNos: null,
  createUser: null,
  createDate: null,
  note: null,
  stat: null,
}
// const extraFeeItemEmptyData = {
//   inputDate: null,
//   warnId: null,
//   warnNo: null,
//   piNo: null,
//   boxQty: null,
//   cutDate: null,
//   currencyCode: null,
//   feeType: null,
//   amt: null,
//   reason: null,
//   resMan: null,
//   responsibleLeader: null,
//   responsibleOrg: null,
//   negativeIncentive: null,
//   area: null,
//   org: null,
//   transit: null,
// }

// const extraFeeItemRules = {
//   inputDate: [
//   ],
//   warnId: [
//     { message: '出货预告id 必须为数字', validate: validate.isNumberOrEmpty },
//   ],
//   warnNo: [
//   ],
//   piNo: [
//   ],
//   boxQty: [
//     { message: '柜量 必须为数字', validate: validate.isNumberOrEmpty },
//   ],
//   cutDate: [
//   ],
//   currencyCode: [
//   ],
//   feeType: [
//   ],
//   amt: [
//     { message: '金额 必须为数字', validate: validate.isNumberOrEmpty },
//   ],
//   reason: [
//   ],
//   resMan: [
//   ],
//   responsibleLeader: [
//   ],
//   responsibleOrg: [
//   ],
//   negativeIncentive: [
//     { message: '负激励 必须为数字', validate: validate.isNumberOrEmpty },
//   ],
//   areaName: [
//   ],
//   orgName: [
//   ],
//   transitName: [
//   ],
// }

let initFormData = {
  ...emptyFormData
}
// let initExtraFeeItems = []

export default {
  name: 'ExtraFeeSublistEdit',
  components: {
    ExtraFeeStatEnumSelect,
    CurrencySelect,
    ResponsibleLeaderEnumSelect,
    ResponsibleOrgEnumSelect,
    ExtraRecordSelect,
    ExtraFeeItemDeletePopup: () => import('./../../../views/entity-page/extra-fee-item/extraFeeItemDeletePopup.vue'),
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
      showCostRecord: false,
      formData: {
        ...initFormData
      },
      extraFeeItems: [],
      extraFeeItemsSelection: [],
      rules: {
        warnNos: [
        ],
        piNos: [
        ],
        regNo: [
        ],
        note: [
        ],
        stat: [
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
    this.formData.id = this.id
    if (this.formData.id !== null) {
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
    confirmInfo(resData) {
      this.showCostRecord = false
      for (let i = 0; i < resData.length; i++) {
        for (let j = 0; j < this.extraFeeItems.length; j++) {
          if (resData[i].warnNo === this.extraFeeItems[j].warnNo && 
          resData[i].transitName === this.extraFeeItems[j].transitName && 
          resData[i].areaName === this.extraFeeItems[j].areaName &&
          resData[i].feeType === this.extraFeeItems[j].feeType &&
          resData[i].currencyCode === this.extraFeeItems[j].currencyCode &&
          resData[i].custCode === this.extraFeeItems[j].custCode &&
          resData[i].piNo === this.extraFeeItems[j].piNo) {
            resData.splice(i, 1)
          }
        } 
      }
      for (let i = 0; i < resData.length; i++) {
        resData[i].negativeIncentive = resData[i].amt * 0.1
        resData[i].inputDate = new Date()
      }
      this.extraFeeItems = this.extraFeeItems.concat(resData)
    },
    async getData() {
      this.loading = true
      const res = await extraFeeServer.get(this.formData.id)
      initFormData = res.header
      this.formData = {
        ...res.header
      }
      // this.formData.id = res.header.regId
      this.extraFeeItems = [...res.lineList]
      this.formData.id = res.header.regId
      this.loading = false
    },
    async saveForSubmit() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            try {
              if (this.formData.id !== null) {
                const res = await extraFeeServer.put(this.formData, this.extraFeeItems)
                this.formData.id = res
              } else {
                this.formData.entid = this.$store.getters.entid
                const res = await extraFeeServer.post(this.formData, this.extraFeeItems)
                // if (Number.parseInt(res.code) === 200) {
                //   // 新增保存成功后清空表单数据
                //   this.formData = { ...emptyFormData }
                // }
                this.formData.id = res.data
              }
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            } catch (e) {
              this.$message({
                message: '保存失败 ' + e.message,
                type: 'error',
                duration: 5000
              })
              reject('error submit!!')
              return
            }
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
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            try {
              if (this.formData.id !== null) {
                const res = await extraFeeServer.put(this.formData, this.extraFeeItems)
                this.formData.id = res
              } else {
                this.formData.entid = this.$store.getters.entid
                const res = await extraFeeServer.post(this.formData, this.extraFeeItems)
                // if (Number.parseInt(res.code) === 200) {
                //   // 新增保存成功后清空表单数据
                //   this.formData = { ...emptyFormData }
                // }
                this.formData.id = res.data
              }
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$emit('emitEvent', {
                key: 'update',
                params: {
                  id: this.formData.id
                }
              })
            } catch (e) {
              this.$message({
                message: '保存失败 ' + e.message,
                type: 'error',
                duration: 5000
              })
              reject('error submit!!')
              return
            }
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
        await this.saveForSubmit()
        resolve()
      })
    },
     async valiAgreeProcess() {
      return new Promise(async(resolve, reject) => {
        await this.save()
        resolve()
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
          return this.newStartProcess()   
        case 'agreeProcess':
          return this.valiAgreeProcess()  
        default:
          break
      }
    },
    del() {
      this.$confirm('确定要删除当前表单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        extraFeeServer.delete(this.formData.id).then(() => {
          this.$message({
            message: `删除额外费用登记 ${this.formData.regNo} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'ExtraFeeEditSublistPage')
        })
      })
    },
    resetData() {
      if (this.id) {
        this.formData = { ...emptyFormData }
        this.extraFeeItems = []
        this.formData.id = this.id
        this.getData()
      } else {
        this.formData = { ...emptyFormData }
        this.extraFeeItems = []
      }
    },
    clickAddExtraFeeItem() {
      this.showCostRecord = true
      // this.extraFeeItems.push({
      //   ...extraFeeItemEmptyData
      // })
    },
    selectionChangeExtraFeeItem(val) {
      this.extraFeeItemsSelection = val
    },
    clickDeleteExtraFeeItem() {
      if (this.extraFeeItemsSelection.length > 0) { 
          this.extraFeeItemsSelection.forEach(item => {
            for (let i = 0; i < this.extraFeeItems.length; i++) {
              if (this.extraFeeItems[i] === item) {
                this.extraFeeItems.splice(i, 1)
                break
              }
            }
          })
        this.extraFeeItemsSelection = [] 
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedExtraFeeItem() {
      this.extraFeeItemsSelection.forEach(item => {
        for (let i = 0; i < this.extraFeeItems.length; i++) {
          if (this.extraFeeItems[i] === item) {
            this.extraFeeItems.splice(i, 1)
            break
          }
        }
      })
      this.extraFeeItemsSelection = []
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
