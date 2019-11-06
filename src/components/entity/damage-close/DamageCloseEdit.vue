<template>
  <div class="max-w back">
    <!-- <div class="container">
      <el-button type="primary" icon="el-icon-check" size="mini" @click="save">保存</el-button>
      <el-button v-show="!isCreated" icon="el-icon-refresh" size="mini" @click="refresh">重置</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
      <el-button v-if="formData.stat === 1" v-show="formData.corpserialid" type="danger" icon="el-icon-delete" size="mini" @click="del">删除
      </el-button>
      <el-button v-if="formData.stat === 1 || formData.stat === 4" v-show="formData.corpserialid" type="primary" size="mini" icon="el-icon-check">提交
      </el-button>
    </div>-->

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
              <el-form-item label="单号" prop="corpserialno">
                <el-input v-model="formData.corpserialno" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="stat">
                <CommercialInvoiceStatusEnumSelect
                  :disabled="true"
                  v-model="formData.stat"
                  type="clearable"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="创建人" prop="createUser">
                <el-input v-model="formData.createUser" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="创建时间" prop="createDate">
                <el-input v-model="formData.createDate" disabled size="mini"/>
              </el-form-item>
            </el-col>

            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="可损通知" prop="sourceNo">
                <DamageNoticeSelect
                  v-model="formData.sourceNo"
                  size="mini"
                  @changeData="changeSourceNo"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="最终索赔金额" prop="settAmt">
                <el-input-number
                  v-model="formData.settAmt"
                  :precision="2"
                  :step="1"
                  :min="0"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="最终赔付金额" prop="finalAmt">
                <el-input-number
                  v-model="formData.finalAmt"
                  :precision="2"
                  :step="1"
                  :min="0"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="撤销处理类型" prop="settType">
                <DamageCloseUndoEnumSelect v-model="formData.settType"/>
              </el-form-item>
            </el-col>

            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="销售区域" prop="areano">
                <!-- <AreaNoSelect v-model="formData.areano" :disabled="true" @changeData="changeAreaname" /> -->
                <DepartmentSelect v-model="formData.areano" @changeData="changeAreaname"/>
              </el-form-item>
            </el-col>

            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证行名称" prop="openbankengname">
                <BankNameSelect
                  v-model="formData.openbankengname"
                  :disabled="true"
                  @changeData="changeBizopenbankno"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证行swift" prop="bizopenbankno">
                <el-input v-model="formData.bizopenbankno" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开证行地址" prop="openbankaddress">
                <el-input v-model="formData.openbankaddress" disabled size="mini"/>
              </el-form-item>
            </el-col>

            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="买方代码" prop="sinosurebuyerno">
                <BuyerNoSelect
                  v-model="formData.sinosurebuyerno"
                  :disabled="true"
                  type="clearable"
                  @changeData="changeCustCode"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="买方简称" prop="shtname">
                <el-input v-model="formData.shtname" disabled size="mini" type="clearable"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户编码" prop="custCode">
                <el-input v-model="formData.custCode" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户简称" prop="custName">
                <el-input v-model="formData.custName" disabled size="mini"/>
              </el-form-item>
            </el-col>

            <el-col :lg="12" :md="12" :sm="24" :xs="24">
              <el-form-item label="买方名称" prop="buyerengname">
                <el-input v-model="formData.buyerengname" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :md="12" :sm="24" :xs="24">
              <el-form-item label="买方地址" prop="buyerengaddress">
                <el-input v-model="formData.buyerengaddress" disabled size="mini"/>
              </el-form-item>
            </el-col>

            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="保兑行名称" prop="exbankengname">
                <BankNameSelect
                  v-model="formData.exbankengname"
                  :disabled="true"
                  @changeData="changeBizexbankno"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="保兑行swift" prop="bizexbankno">
                <el-input v-model="formData.bizexbankno" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="保兑行地址" prop="exbankaddress">
                <el-input v-model="formData.exbankaddress" disabled size="mini"/>
              </el-form-item>
            </el-col>

            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="经营单位" prop="entid">
                <OperateUnitSelect v-model="formData.entid" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="案件编码" prop="caseNo">
                <el-input v-model="formData.caseNo" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="可损原因" prop="plreasoncode">
                <DamageNoticeDamageReasonEnumSelect
                  :disabled="true"
                  v-model="formData.plreasoncode"
                />
              </el-form-item>
            </el-col>

            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item class="isYN" label="是否委托我司追讨" prop="troverflag">
                <el-switch v-model="formData.troverflag" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item class="isYN" label="是否已办理贸易融资" prop="financeflag">
                <el-switch v-model="formData.financeflag" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item class="isYN" label="是否已签署《索赔权转让协议》" prop="ifinsuranturge">
                <el-switch v-model="formData.ifinsuranturge" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item class="isYN" label="是否已签署《赔款转让协议》" prop="detainflag">
                <el-switch v-model="formData.detainflag" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item class="isYN" label="是否已向保兑银行催款" prop="ifbankurge">
                <el-switch v-model="formData.ifbankurge" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item class="isYN" label="是否签署《应收账款转让协议》" prop="ifarf">
                <el-switch v-model="formData.ifarf" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :md="12" :sm="24" :xs="24">
              <el-form-item label="案情说明" prop="caseexplain">
                <el-input v-model="formData.caseexplain" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :md="12" :sm="24" :xs="24">
              <el-form-item label="减损措施" prop="adoptmeasure">
                <el-input v-model="formData.adoptmeasure" size="mini"/>
              </el-form-item>
            </el-col>
          </el-row>
          <FileUpload :id="formData.corpserialid" :bill-name="'可损结案维护'"/>
        </el-form>
        <FileUpload
          :id="formData.corpserialid"
          :title="'附件'"
          :tab="1"
          :btn-text="'添加附件'"
          :bill-name="'可损通知结案处理流水号'"
        />
      </el-tabs>
    </div>
  </div>
</template>
<script>
import AreaNoSelect from './../area/AreaNoSelect'
import BankNameSelect from './../bank/BankNameSelect'
import damageCloseServer from './../../../api/damageCloseServer'
import DamageNoticeDamageReasonEnumSelect from './../../../components/entity/damage-notice/DamageNoticeDamageReasonEnumSelect'
// import DamageNoticeSelect from './../../../components/entity/damage-close/DamageNoticeSelect'
import DamageNoticeSelect from './../../../components/entity/damage-notice/DamageNoticeSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import FreightStandardSelect from './../freight-standard/FreightStandardSelect'
import CostProjectSelect from './../cost-project/CostProjectSelect'
import FreightStandardStatusEnumSelect from './../../../components/entity/freight-standard/FreightStandardStatusEnumSelect'
import ShippingCompanyProxyTypeEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyProxyTypeEnumSelect'
import CommercialInvoiceStatusEnumSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceStatusEnumSelect'
import CommercialInvoiceOrderNoSelect from './../commercial-invoice/CommercialInvoiceOrderNoSelect'
import BuyerNoSelect from './../../../components/entity/buyer/BuyerNoSelect'

import FreightAdvanceStatusEnumSelect from './../../../components/entity/freight-advance/FreightAdvanceStatusEnumSelect'
import DeliverReportPopupSelect from './../deliver-report/DeliverReportPopupSelect'
import CurrencySelect from './../currency/CurrencySelect'
import DamageCloseUndoEnumSelect from './DamageCloseUndoEnumSelect'

// 头部信息
const headerObj = {
  corpserialid: null, // 主键 ID
  corpserialno: null, // 单号
  sourceNo: null, // 可损通知
  settAmt: null, // 最终索赔金额
  finalAmt: null, // 最终赔付金额
  settType: null, // 撤销处理类型
  caseNo: null, // 案件编码
  stat: 1, // 状态
  createUser: null,
  createDate: null,
  areano: null, //
  areaname: null, // 销售区域
  bizopenbankno: null, // 中信保开证行swift码
  openbankengname: null, // 开证行名称
  openbankaddress: null, // 开证行地址
  bizexbankno: null, // 中信保保兑行swift码
  exbankengname: null, // 保兑行名称
  exbankaddress: null, // 保兑行地址
  custCode: null, // 客户编码
  custName: null, // 客户名称
  sinosurebuyerno: null, // 买方代码

  // buyerno: null, // 买方代码
  shtname: null, // 买方简称
  buyerengname: null, // 买方名称
  buyerengaddress: null, // 买方地址
  plreasoncode: null, // 可损原因 类型0拖欠1拒收2破产3其他
  entid: null, // 经营单位
  troverflag: false, // 是否委托追讨0否1是
  financeflag: false, // 是否融资0否1是
  ifinsuranturge: false, // 是否已签署《索赔权转让协议》0否1是
  detainflag: false, // 被保险人是否已签署《赔款转让协议》0否1是
  ifbankurge: false, // 是否已向保兑银行催款0否1是
  ifarf: false, // 是否已签署《应收账款转让协议》：0否（默认），1是0否1是
  caseexplain: null, // 案情说明
  adoptmeasure: null // 减损措施说明
}

let initFormData = {
  ...headerObj
}
export default {
  name: 'DamageNoticeEdit',
  components: {
    OperateUnitSelect,
    FreightAdvanceStatusEnumSelect,
    DeliverReportPopupSelect,
    CurrencySelect,
    AreaNoSelect,
    DamageNoticeSelect,
    DamageCloseUndoEnumSelect,
    BankNameSelect,
    DamageNoticeDamageReasonEnumSelect,
    DepartmentSelect,
    BuyerNoSelect,
    ShippingCompanySelect,
    FreightStandardSelect,
    CostProjectSelect,
    FreightStandardStatusEnumSelect,
    ShippingCompanyProxyTypeEnumSelect,
    CommercialInvoiceStatusEnumSelect,
    CommercialInvoiceOrderNoSelect,
    FreightStandardContainerDeletePopup: () =>
      import('./../../../views/entity-page/freight-standard-container/freightStandardContainerDeletePopup.vue'),
    FreightStandardTicketDeletePopup: () =>
      import('./../../../views/entity-page/freight-standard-ticket/freightStandardTicketDeletePopup.vue')
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      isCreated: false,
      loading: false,
      showAdvancePopup: false,
      lineList: [],
      isSelection: [],
      oldLines: [],
      formData: {
        ...headerObj
      },
      rules: {
        sourceNo: [{ required: true, message: '不能为空', trigger: 'change' }],
        areano: [{ required: true, message: '不能为空', trigger: 'change' }],
        settType: [{ required: true, message: '不能为空', trigger: 'change' }],
        code: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        year: [{ required: true, message: '年份不能为空', trigger: 'change' }],
        month: [{ required: true, message: '月份不能为空', trigger: 'change' }],
        currencyCode: [
          { required: true, message: '币种不能为空', trigger: 'change' }
        ],
        status: [],
        settAmt: [
          { required: true, message: '不能为空', trigger: 'change' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        finalAmt: [
          { required: true, message: '不能为空', trigger: 'change' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
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
      this.isCreated = false
      this.formData.corpserialid = this.id
      this.getData()
    } else {
      initFormData = {
        ...headerObj
      }
      this.formData = {
        ...headerObj
      }
      this.isCreated = true
      this.formData.createUser = this.$store.getters.userCode
      this.formData.entid = this.$store.getters.entid
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    clickDeleteFreightAdvanceContainer() {
      if (this.isSelection.length > 0) {
        const selections = this.isSelection
        for (let i = 0; i < selections.length; i++) {
          this.formData.amount -= selections[i].boxAmt + selections[i].docAmt
          this.formData.advanceAmount -= selections[i].advanceAmount
        }
        this.isSelection.forEach(item => {
          for (let i = 0; i < this.lineList.length; i++) {
            if (this.lineList[i] === item) {
              this.lineList.splice(i, 1)
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
      this.isSelection = val
    },
    async getData() {
      this.loading = true
      const res = await damageCloseServer.get(this.formData.corpserialid)
      if (res.data.code !== 200) {
        this.loading = false
        this.$message({
          message: res.data.msg,
          type: 'warning'
        })
      } else {
        initFormData = res.data.data.data[0]
        this.formData = {
          ...res.data.data.data[0]
        }
        this.loading = false
      }
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            this.loading = true
            if (this.formData.corpserialid) {
              // 编辑
              const res = await damageCloseServer.edit(this.formData)
              if (Number.parseInt(res.code) === 200) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                // this.getData()
              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                })
              }
            } else {
              // new
              this.formData.entid = this.$store.getters.entid
              const res = await damageCloseServer.add(this.formData)
              if (Number.parseInt(res.code) === 200) {
                // 新增保存成功后清空表单数据
                this.formData = { ...headerObj }
                this.lineList = []
                this.formData.corpserialid = res.data.corpserialid
                this.isCreated = false
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                })
              }
              this.loading = false
              // this.getData()
            }

            initFormData = {
              ...this.formData
            }
            this.$emit('emitEvent', {
              key: 'update',
              params: {
                id: this.formData.corpserialid
              }
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
    refresh() {
      this.getData()
    },
    resetData() {
      this.formData = {
        ...initFormData
      }
    },
    async del() {
      this.loading = true
      const res = await damageCloseServer.delete(this.formData.corpserialid)
      this.loading = false
      if (Number.parseInt(res.code) === 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        let closeId = null
        if (this.id) {
          closeId = this.id
        } else {
          closeId = 'new'
        }
        window.eventBus.$emit(
          'closePagePath',
          '/DZ-manage/citic-is-protected/damage-close/edit/' + closeId
        )
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },

    // 买方代码
    changeCustCode(obj) {
      if (obj === undefined) {
        this.formData.shtname = null
        this.formData.custCode = null
        this.formData.custName = null
        this.formData.buyerengname = null
        this.formData.buyerengaddress = null
      } else {
        this.formData.shtname = obj.shtname
        this.formData.custCode = obj.custCode
        this.formData.custName = obj.custName
        this.formData.buyerengname = obj.engname
        this.formData.buyerengaddress = obj.engaddress
      }
    },
    // 开证行swift
    changeBizopenbankno(obj) {
      if (obj == null) {
        this.formData.bizopenbankno = null
        this.formData.openbankengname = null
        this.formData.openbankaddress = null
      } else {
        this.formData.bizopenbankno = obj.Swift_Code
        this.formData.openbankengname = obj.bankName
        this.formData.openbankaddress = obj.adress
      }
    },
    // 保兑行swift
    changeBizexbankno(obj) {
      if (obj == null) {
        this.formData.bizexbankno = null
        this.formData.exbankengname = null
        this.formData.exbankaddress = null
      } else {
        this.formData.bizexbankno = obj.Swift_Code
        this.formData.exbankengname = obj.bankName
        this.formData.exbankaddress = obj.adress
      }
    },
    // 销售区域
    changeAreaname(res) {
      this.formData.areaname = res.areaName
    },
    // 可损通知
    changeSourceNo(res) {
      if (res == null) {
        this.formData.sourceNo = null
        this.formData.areano = null
        this.formData.areaname = null
        this.formData.bizopenbankno = null
        this.formData.openbankengname = null
        this.formData.openbankaddress = null
        this.formData.bizexbankno = null
        this.formData.exbankengname = null
        this.formData.exbankaddress = null
        this.formData.custCode = null
        this.formData.custName = null
        this.formData.sinosurebuyerno = null
        this.formData.shtname = null
        this.formData.buyerengname = null
        this.formData.buyerengaddress = null
        this.formData.plreasoncode = null
        this.formData.entid = null
        this.formData.troverflag = false
        this.formData.financeflag = false
        this.formData.ifinsuranturge = false
        this.formData.detainflag = false
        this.formData.ifbankurge = false
        this.formData.ifarf = false
        this.formData.caseexplain = null
        this.formData.adoptmeasure = null
      } else {
        this.formData.sourceNo = res.corpserialno
        this.formData.areano = res.areano
        this.formData.areaname = res.areaname
        this.formData.bizopenbankno = res.bizopenbankno
        this.formData.openbankengname = res.openbankengname
        this.formData.openbankaddress = res.openbankaddress
        this.formData.bizexbankno = res.bizexbankno
        this.formData.exbankengname = res.exbankengname
        this.formData.exbankaddress = res.exbankaddress
        this.formData.custCode = res.custCode
        this.formData.custName = res.custName
        this.formData.sinosurebuyerno = res.sinosurebuyerno
        this.formData.shtname = res.shtname
        this.formData.buyerengname = res.buyerengname
        this.formData.buyerengaddress = res.buyerengaddress
        this.formData.plreasoncode = res.plreasoncode
        this.formData.entid = res.entid
        this.formData.troverflag = res.troverflag
        this.formData.financeflag = res.financeflag
        this.formData.ifinsuranturge = res.ifinsuranturge
        this.formData.detainflag = res.detainflag
        this.formData.ifbankurge = res.ifbankurge
        this.formData.ifarf = res.ifarf
        this.formData.caseexplain = res.caseexplain
        this.formData.adoptmeasure = res.adoptmeasure
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item {
  width: 100%;
  margin-right: 0;
  /deep/ .el-form-item__label {
    width: 100px;
  }
  /deep/ .el-form-item__content {
    width: calc(100% - 120px);
  }
  // /deep/ .el-form-item__error {
  //   display: none
  // }
  /deep/ .el-form-item__label {
    font-size: 13px;
  }
  /deep/ .el-input-number {
    width: 100%;
  }
}
.isYN {
  /deep/ .el-form-item__label {
    width: 230px !important;
  }
  /deep/ .el-form-item__content {
    margin: 0 !important;
    float: left !important;
    width: calc(100% - 230px) !important;
  }
}
.note-textarea {
  margin-top: 5px;
  margin-bottom: 8px;
}
</style>
