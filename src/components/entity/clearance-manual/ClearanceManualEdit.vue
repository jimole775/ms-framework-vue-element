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
              <el-form-item label="手册编号" prop="manualNo">
                <el-input v-model="formData.manualNo" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备案资料库编号" prop="recordDatabaseCode">
                <el-input v-model="formData.recordDatabaseCode" :disabled="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="手册类型" prop="manualType">
                <ManualTypeEnumSelect v-model="formData.manualType" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="主管海关" prop="CompetentCustoms">
                <el-input v-model="formData.CompetentCustoms" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="主管外经贸" prop="manageFTrad">
                <el-input v-model="formData.manageFTrad" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="经营单位" prop="managementName">
                <ManagementNameEnumSelect v-model="formData.managementName" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="加工单位" prop="processName">
                <ProcessNameEnumSelect v-model="formData.processName" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="内销比" prop="imsRatio">
                <el-input-number v-model="formData.imsRatio" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="协议号" prop="agreementCode">
                <el-input v-model="formData.agreementCode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="批准文号" prop="approvalNumber">
                <el-input v-model="formData.approvalNumber" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="进口合同号" prop="importedPiNo">
                <el-input v-model="formData.importedPiNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出口合同号" prop="exportPiNo">
                <el-input v-model="formData.exportPiNo" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备案进口总值" prop="recordImportValue">
                <el-input-number v-model="formData.recordImportValue" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="进口币制" prop="importCurrency">
                <ImportCurrencyEnumSelect v-model="formData.importCurrency" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备案出口总值" prop="recordExportValue">
                <el-input-number v-model="formData.recordExportValue" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出口币制" prop="exportCurrency">
                <ExportCurrencyEnumSelect v-model="formData.exportCurrency" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="加工种类" prop="processType">
                <ProcessTypeEnumSelect v-model="formData.processType" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="保税方式" prop="bondedType">
                <BondedTypeEnumSelect v-model="formData.bondedType" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="结束有效期" prop="endDate">
                <el-date-picker
                  v-model="formData.endDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="处理标志" prop="dueType">
                <DueTypeEnumSelect v-model="formData.dueType" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="管理对象" prop="manager">
                <el-input v-model="formData.manager" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="录入日期" prop="inputDate">
                <el-date-picker
                  v-model="formData.inputDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="申报日期" prop="declareDate">
                <el-date-picker
                  v-model="formData.declareDate"
                  :disabled="false"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="单耗申报环节" prop="costDeclare">
                <el-input v-model="formData.costDeclare" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="note">
                <el-input v-model="formData.note" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="台账银行" prop="ledgerBankId">
                <BankSelect v-model="formData.ledgerBankId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clearanceManualServer from './../../../api/clearanceManualServer'
import BankSelect from './../bank/BankSelect'

import ManualTypeEnumSelect from './../../../components/entity/clearance-manual/ManualTypeEnumSelect'
import ManagementNameEnumSelect from './../../../components/entity/clearance-manual/ManagementNameEnumSelect'
import ProcessNameEnumSelect from './../../../components/entity/clearance-manual/ProcessNameEnumSelect'
import ImportCurrencyEnumSelect from './../../../components/entity/clearance-manual/ImportCurrencyEnumSelect'
import ExportCurrencyEnumSelect from './../../../components/entity/clearance-manual/ExportCurrencyEnumSelect'
import ProcessTypeEnumSelect from './../../../components/entity/clearance-manual/ProcessTypeEnumSelect'
import BondedTypeEnumSelect from './../../../components/entity/clearance-manual/BondedTypeEnumSelect'
import DueTypeEnumSelect from './../../../components/entity/clearance-manual/DueTypeEnumSelect'
const emptyFormData = {
  manualNo: null,
  recordDatabaseCode: null,
  manualType: null,
  CompetentCustoms: null,
  manageFTrad: null,
  managementName: null,
  processName: null,
  imsRatio: null,
  agreementCode: null,
  approvalNumber: null,
  importedPiNo: null,
  exportPiNo: null,
  recordImportValue: null,
  importCurrency: null,
  recordExportValue: null,
  exportCurrency: null,
  processType: null,
  bondedType: null,
  endDate: null,
  dueType: null,
  manager: null,
  inputDate: null,
  declareDate: null,
  costDeclare: null,
  note: null,
  ledgerBankId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'ClearanceManualEdit',
  components: {
    BankSelect,
    ManualTypeEnumSelect,
    ManagementNameEnumSelect,
    ProcessNameEnumSelect,
    ImportCurrencyEnumSelect,
    ExportCurrencyEnumSelect,
    ProcessTypeEnumSelect,
    BondedTypeEnumSelect,
    DueTypeEnumSelect,
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
        manualNo: [
        ],
        recordDatabaseCode: [
        ],
        manualType: [
        ],
        CompetentCustoms: [
        ],
        manageFTrad: [
        ],
        managementName: [
        ],
        processName: [
        ],
        imsRatio: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        agreementCode: [
        ],
        approvalNumber: [
        ],
        importedPiNo: [
        ],
        exportPiNo: [
        ],
        recordImportValue: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        importCurrency: [
        ],
        recordExportValue: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        exportCurrency: [
        ],
        processType: [
        ],
        bondedType: [
        ],
        endDate: [
        ],
        dueType: [
        ],
        manager: [
        ],
        inputDate: [
        ],
        declareDate: [
        ],
        costDeclare: [
        ],
        note: [
        ],
        ledgerBankId: [
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
      const res = await clearanceManualServer.get(this.id)
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
              await clearanceManualServer.put(this.formData)
            } else {
              const res = await clearanceManualServer.post(this.formData)
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
