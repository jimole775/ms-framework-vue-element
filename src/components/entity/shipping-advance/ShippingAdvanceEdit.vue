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
              <el-form-item v-if="formData.code" label="单号" prop="code">
                <el-input v-model="formData.code" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="年份" prop="year">
                <el-date-picker
                  v-model="formData.year"
                  size="mini"
                  class="max-w"
                  type="year"
                  value-format="yyyy"
                  placeholder="选择年"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="月份" prop="month">
                <el-date-picker
                  v-model="formData.month"
                  size="mini"
                  class="max-w"
                  type="month"
                  format="MM"
                  value-format="MM"
                  placeholder="选择月"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-if="formData.status" label="状态" prop="status">
                <FreightAdvanceStatusEnumSelect :disabled="true" v-model="formData.status"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="总金额" prop="amount">
                <el-input-number v-model="formData.amount" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="预提金额" prop="advanceAmount">
                <el-input-number v-model="formData.advanceAmount" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-if="formData.createMan" label="创建人" prop="createMan">
                <el-input v-model="formData.createMan" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-if="formData.applyDate" label="申请日期" prop="applyDate">
                <el-date-picker
                  v-model="formData.applyDate"
                  :disabled="true"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="凭证号" prop="credentials">
                <el-input v-model="formData.credentials" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-if="formData.operateUnitId" label="经营单位" prop="operateUnitId">
                <OperateUnitSelect :disabled="true" v-model="formData.operateUnitId"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tabs>
      <el-tabs type="border-card">
        <el-tab-pane label="海运费预提明细 ">
          <el-row>
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="clickAddFreightStandardContainer"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteFreightAdvanceContainer"
            />
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
            <el-button
              type="primary"
              icon="el-icon-copy-document"
              size="mini"
              @click="clickExportBtn"
            >导出</el-button>
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${freightAdvaceContainersSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="shipeAdvanceContainers"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeFreightAdvanceContainer"
          >
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop=" isYt" min-width="100" label="是否预提">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isYt" @change="changeIsYt(scope.$index)"/>
              </template>
            </el-table-column>
            <el-table-column prop="transitName" min-width="150" show-overflow-tooltip label="公司名称"/>
            <el-table-column prop="warnNo" min-width="180" show-overflow-tooltip label="出货预告号"/>
            <el-table-column prop="piNo" min-width="150" show-overflow-tooltip label="合同号"/>
            <el-table-column prop="invoiceNo" min-width="180" show-overflow-tooltip label="发票号"/>
            <el-table-column prop="superOrgName" min-width="100" label="大区"/>
            <el-table-column prop="orgName" min-width="100" show-overflow-tooltip label="部门"/>
            <el-table-column prop="hyfAmt" min-width="120" show-overflow-tooltip label="计提金额"/>
            <el-table-column
              prop="advanceAmount"
              min-width="170"
              align="center"
              sortable
              label="本次预提金额"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.advanceAmount"
                  :precision="2"
                  :step="0.1"
                  :min="0"
                  size="mini"
                  @change="changeYt"
                />
              </template>
            </el-table-column>
            <el-table-column prop="ytedAmt" min-width="120" label="已预提金额"/>
            <el-table-column prop="payAmt" min-width="120" label="已支付金额"/>
            <el-table-column prop="remark" min-width="150" label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" placeholder="请输入备注" size="mini"/>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-tabs type="border-card">
        <el-tab-pane label="附件">
          <FileUpload
            :id="formData.id"
            :title="'附件'"
            :tab="1"
            :btn-text="'添加附件'"
            :bill-name="'海运费预提单据号'"
          />
        </el-tab-pane>
      </el-tabs>
      <component
        v-if="showExportPopup"
        :is="'ExportPopup'"
        :list="dataExport"
        :t-header="tHeader"
        :filter-val="filterVal"
        @close="showExportPopup = false"
      />
    </div>
    <ShipmentdAdvanceNoticeSelect
      v-if="showAdvancePopup"
      @confirm="confirmInfo"
      @close="showAdvancePopup = false"
    />
  </div>
</template>
<script>
import shippingAdvanceServer from './../../../api/shippingAdvanceServer'
// import DepartmentSelect from './../department/DepartmentSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import FreightAdvanceStatusEnumSelect from './../../../components/entity/freight-advance/FreightAdvanceStatusEnumSelect'
import ShipmentdAdvanceNoticeSelect from './ShipmentdAdvanceNoticeSelect.vue'
// import CurrencySelect from './../currency/CurrencySelect'
import UploadExcelComponent from '@/components/UploadExcel/importIndex.vue'
const emptyFormData = {
  id: null,
  code: null,
  year: '',
  month: '',
  status: null,
  amount: 0,
  advanceAmount: 0,
  createMan: null,
  applyDate: null,
  credentials: null,
  remark: null,
  warnId: null,
  operateUnitId: null
}
const initExport = {
  isYt: '是否预提',
  transitName: '船务公司名',
  warnNo: '出货预告号',
  warnId: '出货预告号ID',
  piNo: '合同号',
  invoiceNo: '发票号',
  superOrgName: '大区名称',
  orgName: '部门名称',
  custName: '客户名称',
  custCode: '客户编码',
  hyfAmt: '计提金额',
  advanceAmount: '本次预提金额',
  ytedAmt: '已预提金额',
  payAmt: '已支付金额',
  remark: '备注'
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'ShippingAdvanceEdit',
  components: {
    // DepartmentSelect,
    OperateUnitSelect,
    FreightAdvanceStatusEnumSelect,
    ShipmentdAdvanceNoticeSelect,
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    // CurrencySelect
    UploadExcelComponent
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
      showAdvancePopup: false,
      showExportPopup: false,
      currcode: 'CNY',
      shipeAdvanceContainers: [],
      freightAdvaceContainersSelection: [],
      oldLines: [],
      formData: {
        ...initFormData
      },
      rules: {
        code: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        year: [{ required: true, message: '年份不能为空', trigger: 'change' }],
        month: [{ required: true, message: '月份不能为空', trigger: 'change' }],
        status: [],
        amount: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
        advanceAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        createMan: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        applyDate: [],
        credentials: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '备注不能为空', trigger: 'change' },
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
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
  },
  methods: {
    changeIsYt(res) {
      if (this.shipeAdvanceContainers[res].isYt === true) {
        this.formData.amount += this.shipeAdvanceContainers[res].hyfAmt
        this.formData.advanceAmount += this.shipeAdvanceContainers[res].advanceAmount
      } else {
        this.formData.amount -= this.shipeAdvanceContainers[res].hyfAmt
        this.formData.advanceAmount -= this.shipeAdvanceContainers[res].advanceAmount
      }
    },
    clickExportBtn() {
      if (this.shipeAdvanceContainers.length > 0) {
        this.dataExport = JSON.parse(
          JSON.stringify(this.shipeAdvanceContainers)
        )
      } else {
        this.$message({
          message: '当前海运费预提没有数据可导出',
          type: 'warning'
        })
        return
      }
      this.dataExport.forEach(item => {
        item.isYt = item.isYt ? '是' : '否'
      })
      this.setExportData()
      this.showExportPopup = true
    },
    setExportData() {
      // 设置要导出数据的表头和对应的字段
      // 清空已有表头和对应的字段
      this.tHeader = []
      this.filterVal = []
      // 遍历初始化的导出字段数据
      for (const key in initExport) {
        this.filterVal.push(key)
        this.tHeader.push(initExport[key])
      }
    },
    handleSuccess({ results, header }) {
      // 海运费预提导入成功
      const addlist = []
      results.forEach(item => {
        const data = {
          isYt: item['是否预提'] === '是',
          warnNo: item['出货预告号'],
          warnId: parseInt(item['出货预告号ID']),
          piNo: item['合同号'],
          invoiceNo: item['发票号'],
          superOrgName: item['大区名称'],
          orgName: item['部门名称'],
          boxQty10: 0,
          delete: 0,
          custName: item['客户名称'],
          custCode: item['客户编码'],
          transitName: item['船务公司名'],
          hyfAmt: parseFloat(item['计提金额']),
          advanceAmount: parseFloat(item['本次预提金额']),
          ytedAmt: parseFloat(item['已预提金额']),
          payAmt: parseFloat(item['已支付金额']),
          remark: item['备注']
        }
        addlist.push(data)
      })
      this.shipeAdvanceContainers = this.shipeAdvanceContainers.concat(addlist)
      for (let i = 0; i < addlist.length; i++) {
        this.formData.amount += addlist[i].hyfAmt
        this.formData.advanceAmount += addlist[i].advanceAmount
      }
      // console.log(addlist)
      this.shipeAdvanceContainers.forEach((item, index) => {
        this.$set(this.shipeAdvanceContainers, index, item)
      })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '导入文件不超过1mb',
        type: 'warning'
      })
      return false
    },
    close() {
      this.$emit('close')
    },
    clickAddFreightStandardContainer() {
      if (this.formData.year === '' || this.formData.month === '') {
        this.$message({
          message: `请先选择年月`,
          type: 'warning'
        })
        return
      }
      this.showAdvancePopup = true
    },
    clickDeleteFreightAdvanceContainer() {
      if (this.freightAdvaceContainersSelection.length > 0) {
        const selections = this.freightAdvaceContainersSelection
        for (let i = 0; i < selections.length; i++) {
          this.formData.amount -= selections[i].hyfAmt
          this.formData.advanceAmount -= selections[i].advanceAmount
        }
        this.freightAdvaceContainersSelection.forEach(item => {
          for (let i = 0; i < this.shipeAdvanceContainers.length; i++) {
            if (this.shipeAdvanceContainers[i] === item) {
              this.shipeAdvanceContainers.splice(i, 1)
              break
            }
          }
        })
        this.freightStandardContainersSelection = []
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    selectionChangeFreightAdvanceContainer(val) {
      this.freightAdvaceContainersSelection = val
    },
    confirmInfo(chooseData) {
      this.showAdvancePopup = false
      for (let i = 0; i < chooseData.length; i++) {
        chooseData[i].advanceAmount = chooseData[i].hyfAmt
        if (chooseData[i].hyfAmt == null) {
          chooseData[i].hyfAmt = 0
        }
        if (chooseData[i].advanceAmount == null) {
          chooseData[i].advanceAmount = 0
        }
        if (chooseData[i].ytedAmt == null) {
          chooseData[i].ytedAmt = 0
        }
        if (chooseData[i].payAmt == null) {
          chooseData[i].payAmt = 0
        }
        chooseData[i].remark = ''
        for (let j = 0; j < this.shipeAdvanceContainers.length; j++) {
          if (chooseData[i].warnId === this.shipeAdvanceContainers[j].warnId) {
            chooseData.splice(i, 1)
          }
        }
      }
      this.shipeAdvanceContainers = this.shipeAdvanceContainers.concat(
        chooseData
      )
      for (let i = 0; i < chooseData.length; i++) {
        this.formData.amount += chooseData[i].hyfAmt
        this.formData.advanceAmount += chooseData[i].advanceAmount
      }
      this.shipeAdvanceContainers.forEach((item, index) => {
        this.$set(this.shipeAdvanceContainers, index, item)
      })
    },
    async getData() {
      this.loading = true
      const res = await shippingAdvanceServer.get(this.formData.id)
      initFormData = res
      this.oldLines = [...res.lineEntities]
      this.formData = {
        ...res
      }
      this.shipeAdvanceContainers = res.lineEntities
      this.formData.id = res.ytId
      this.loading = false
    },
    changeYt() {
      if (
        this.shipeAdvanceContainers != null &&
        this.shipeAdvanceContainers !== ''
      ) {
        let number = 0
        for (let i = 0; i < this.shipeAdvanceContainers.length; i++) {
          if (this.shipeAdvanceContainers[i].advanceAmount == null) {
            this.shipeAdvanceContainers[i].advanceAmount = 0
          }
          // if (this.shipeAdvanceContainers[i].advanceAmount > (this.shipeAdvanceContainers[i].boxAmt + this.shipeAdvanceContainers[i].docAmt)) {
          //   this.shipeAdvanceContainers[i].advanceAmount = this.shipeAdvanceContainers[i].boxAmt + this.shipeAdvanceContainers[i].docAmt
          // }
          number += this.shipeAdvanceContainers[i].advanceAmount
        }
        this.formData.advanceAmount = number
        this.shipeAdvanceContainers.forEach((item, index) => {
          this.$set(this.shipeAdvanceContainers, index, item)
        })
      }
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.ytId) {
              const params = JSON.parse(JSON.stringify(this.formData))
              const res = await shippingAdvanceServer.put(
                params,
                this.shipeAdvanceContainers,
                this.oldLines
              )
              this.formData.id = res.data.dataSet.rows[0].yt_id
              // this.getData()
            } else {
              this.formData.entid = this.$store.getters.entid
              const params = JSON.parse(JSON.stringify(this.formData))
              const res = await shippingAdvanceServer.post(
                params,
                this.shipeAdvanceContainers
              )
              if (Number.parseInt(res.data.code) === 200) {
                // 新增保存成功后清空表单数据
                this.formData = { ...emptyFormData }
              }
              this.formData.id = res.data.dataSet.rows[0].yt_id
              // this.getData()
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
      if (this.id) {
        this.formData = {
          ...initFormData
        }
        this.shipeAdvanceContainers = []
        this.formData.id = this.id
        this.getData()
      } else {
        this.formData = {
          ...initFormData
        }
        this.shipeAdvanceContainers = []
      }
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
        shippingAdvanceServer.delete(this.formData).then(() => {
          this.$message({
            message: `成功删除当前海运费预提单 ${this.formData.ytNo}`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'ShippingAdvanceEditPage')
        })
      })
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
