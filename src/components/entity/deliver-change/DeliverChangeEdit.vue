<template>
  <div class="max-w back">
    <!-- <div class="btn-group">
      <el-button type="primary" icon="el-icon-check" size="mini" @click="save">保存</el-button>
      <el-button :disabled="isCreated" icon="el-icon-refresh" size="mini" @click="refresh">重置</el-button>
      <el-button :disabled="isCreated" type="danger" icon="el-icon-delete" size="mini" @click="del">删除</el-button>
      <el-button type="primary" size="mini" icon="el-icon-check" @click="submit">提交</el-button>
    </div>-->

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
            <el-form-item label="单据号" prop="corpserialno">
              <el-input v-model="formData.corpserialno" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="状态" prop="stat">
              <CommercialInvoiceStatusEnumSelect v-model="formData.stat" :disabled="true"/>
              <!-- <DeliverReportStatusEnumSelect v-model="formData.stat" :disabled="true" /> -->
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

          <!-- 下拉 搜索 -->
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item v-if="isCreated" label="出运申报单" prop="oldcorpserialid">
              <DeliverReportSelect
                v-model="formData.oldcorpserialid"
                :disabled="!isCreated"
                @changeData="changeBuyerno"
              />
            </el-form-item>
            <el-form-item v-if="!isCreated" label="出运申报单" prop="oldcorpserialno">
              <el-input v-model="formData.oldcorpserialno" disabled size="mini"/>
            </el-form-item>
          </el-col>

          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="买方代码" prop="buyerno">
              <el-input v-model="formData.buyerno" disabled size="mini"/>
            </el-form-item>
          </el-col>

          <el-col :lg="12" :md="12" :sm="12" :xs="24">
            <el-form-item label="买方名称" prop="buyerengname">
              <el-input v-model="formData.buyerengname" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="6" :sm="8" :xs="24">
            <el-form-item label="买方国家/地区" prop="buyercountrycode">
              <el-input v-model="formData.buyercountrycode" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="18" :md="18" :sm="18" :xs="24">
            <el-form-item label="买方地址" prop="buyerengaddr">
              <el-input v-model="formData.buyerengaddr" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="经营单位" prop="entid">
              <OperateUnitSelect v-model="formData.entid" :disabled="true"/>
              <!-- <el-input v-model="formData.entName" disabled size="mini" /> -->
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户" prop="custId">
              <el-input v-model="formData.custId" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="16" :sm="12" :xs="24">
            <el-form-item label="客户名称" prop="custName">
              <el-input v-model="formData.custName" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="部门" prop="orgName">
              <el-input v-model="formData.orgName" disabled size="mini"/>
            </el-form-item>
          </el-col>

          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="开证行swift" prop="bankno">
              <el-input v-model="formData.bankno" disabled size="mini"/>
            </el-form-item>
          </el-col>

          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="业务员" prop="employeename">
              <el-input v-model="formData.employeename" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="付款人" prop="payername">
              <el-input v-model="formData.payername" disabled size="mini"/>
            </el-form-item>
          </el-col>

          <el-col :lg="18" :md="16" :sm="12" :xs="24">
            <el-form-item label="开证行名称" prop="bankengname">
              <el-input v-model="formData.bankengname" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="信用证号" prop="lcno">
              <el-input v-model="formData.lcno" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="18" :md="16" :sm="12" :xs="24">
            <el-form-item label="开证行地址" prop="bankaddr">
              <el-input v-model="formData.bankaddr" disabled size="mini"/>
            </el-form-item>
          </el-col>

          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发票号" prop="factInvoiceNo">
              <el-input v-model="formData.factInvoiceNo" disabled size="mini"/>
            </el-form-item>
          </el-col>

          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发票金额" prop="invoicesum">
              <el-input-number v-model="formData.invoicesum" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="投保金额" prop="insuresum">
              <el-input-number v-model="formData.insuresum" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出运日期" prop="transportdate">
              <el-date-picker
                v-model="formData.transportdate"
                value-format="yyyy-MM-dd"
                size="mini"
                class="max-w"
                type="date"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="海关商品代码" prop="code10">
              <el-input v-model="formData.code10" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="海关商品名称" prop="goodsname1">
              <el-input v-model="formData.goodsname1" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="商品名称" prop="goodsname">
              <el-input v-model="formData.goodsname" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="运输方式" prop="trafficcode">
              <DeliverReportTransportationModeEnumSelect v-model="formData.trafficcode"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出运货币代码" prop="moneyid">
              <CurrencySelect v-model="formData.moneyid"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="合同支付方式" prop="paymode">
              <DeliverReportContractPaymentMethodEnumSelect
                v-model="formData.paymode"
                :clearable="false"
                @change="changePaymode"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="合同支付期限" prop="payterm">
              <el-input-number v-model="formData.payterm" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="缴费支付方式" prop="feepaymode">
              <DeliverReportPaymentMethodEnumSelect
                v-model="formData.feepaymode"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="合同号" prop="contractno">
              <el-input v-model="formData.contractno" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关单号" prop="customsbillno">
              <el-input v-model="formData.customsbillno" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="提单号" prop="transportbillno">
              <el-input v-model="formData.transportbillno" size="mini"/>
            </el-form-item>
          </el-col>

          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="保费" prop="premium">
              <el-input-number v-model="formData.premium" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="费率" prop="premiumrate">
              <el-input-number v-model="formData.premiumrate" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item class="area" label="保户特别说明" prop="remark">
              <el-input v-model="formData.remark" type="textarea" rows="2" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item class="area" label="退回原因" prop="unacceptreason">
              <el-input v-model="formData.unacceptreason" type="textarea" rows="2" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item class="area" label="变更原因" prop="alterreason">
              <el-input v-model="formData.alterreason" size="mini" type="textarea" rows="2"/>
            </el-form-item>
          </el-col>
        </el-row>

        <FileUpload :id="id" :bill-name="'信用证维护'"/>
      </el-form>
    </div>
  </div>
</template>

<script>
import DeliverReportSelect from './../deliver-report/DeliverReportSelect'
import deliverChangeServer from './../../../api/deliverChangeServer'
import DepartmentSelect from './../department/DepartmentSelect'
import CurrencySelect from './../currency/CurrencySelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'

import CommercialInvoiceStatusEnumSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceStatusEnumSelect'
// import DeliverReportStatusEnumSelect from './../../../components/entity/deliver-report/DeliverReportStatusEnumSelect'
import DeliverReportTransportationModeEnumSelect from './../../../components/entity/deliver-report/DeliverReportTransportationModeEnumSelect'
import DeliverReportContractPaymentMethodEnumSelect from './../../../components/entity/deliver-report/DeliverReportContractPaymentMethodEnumSelect'
import DeliverReportPaymentMethodEnumSelect from './../../../components/entity/deliver-report/DeliverReportPaymentMethodEnumSelect'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil.js'
const emptyFormData = {
  corpserialid: null, // 主键 id
  corpserialno: null, // 单据号
  oldcorpserialno: null, //
  oldcorpserialid: null,
  stat: 1, // 状态
  createUser: null, // 创建人
  createDate: null, // 创建时间
  buyerno: null, // 买方代码
  buyerengname: null, // 买方名称
  buyercountrycode: null, // 买方地区/国家
  buyerengaddr: null, // 买方地址
  entid: null, // 经营单位id
  entName: null, // 经营单位名称
  custId: null, // 客户编码
  custName: null, // 客户名称
  orgName: null, // 部门
  orgId: null, // 部门ID
  bankno: null, // 开证行swift
  bankengname: null, // 开证行名称
  lcno: null, // 信用证号
  bankaddr: null, // 开证行地址
  invoiceno: null, // 发票号
  invoiceid: null, // 发票id
  invoicesum: null, // 发票金额
  insuresum: null, // 投保金额
  transportdate: null, // 出运日期
  code10: '8415101000', // 海关商品代码
  goodsname1: '独立窗式或壁式空气调节器', // 海关商品名称
  goodsname: '独立窗式或壁式空气调节器', // 商品名称
  trafficcode: null, // 运输方式
  moneyid: null, // 出运货币代码
  paymode: null, // 合同支付方式
  payterm: null, // 合同支付期限
  feepaymode: null, // 缴费支付方式
  contractno: null, // 合同号
  customsbillno: null, // 报关单号
  transportbillno: null, // 提单号
  employeename: null, // 业务员
  payername: '宁波奥克斯进出口有限公司', // 付款人
  premium: null, // 保费
  premiumrate: null, // 费率
  invNottamt: null, // 非TT金额
  remark: null, // 保户特别说明
  unacceptreason: null, // 退回原因
  notNote: null, // 保费不一致原因
  alterreason: null // 变更原因
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'DeliverChangeEdit',
  components: {
    OperateUnitSelect,
    DepartmentSelect,
    CurrencySelect,
    // DeliverReportStatusEnumSelect,
    CommercialInvoiceStatusEnumSelect,
    DeliverReportTransportationModeEnumSelect,
    DeliverReportContractPaymentMethodEnumSelect,
    DeliverReportPaymentMethodEnumSelect,
    DeliverReportSelect
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
      isCreated: false,
      rules: {
        oldcorpserialid: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        alterreason: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        invoicesum: [
          { required: true, message: '不能为空', trigger: 'change' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        insuresum: [
          { required: true, message: '不能为空', trigger: 'change' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        transportdate: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        trafficcode: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        moneyid: [{ required: true, message: '不能为空', trigger: 'change' }],
        paymode: [{ required: true, message: '不能为空', trigger: 'change' }],
        payterm: [{ required: true, message: '不能为空', trigger: 'change' }],
        feepaymode: [{ required: true, message: '不能为空', trigger: 'change' }]
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
    if (Number.parseInt(this.$store.getters.entid) === 102) emptyFormData.payername = ''
    else emptyFormData.payername = '宁波奥克斯进出口有限公司'
    if (this.id !== 'new') {
      this.isCreated = false
      this.formData.corpserialid = this.id
      this.getData()
    } else {
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }
      // 新增 获取当前经营单位
      this.isCreated = true
      this.formData.entid = this.$store.getters.entid
      this.formData.createUser = this.$store.getters.userCode
      this.formData.entName = OperaUnitEnumUtil.toTitleFilter(
        this.formData.entid
      )
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      const res = await deliverChangeServer.get(this.formData.corpserialid)
      initFormData = res
      this.formData = {
        ...res
      }
      this.formData.factInvoiceNo = this.formData.invoiceno
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.corpserialid) {
              // 编辑
              const res = await deliverChangeServer.update(this.formData)
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              // this.getData()
            } else {
              console.log(this.formData)
              // 新增
              const res = await deliverChangeServer.add(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                // 新增保存成功后清空表单数据
                this.formData = { ...emptyFormData }
              }
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.isCreated = false
              this.formData.corpserialid = res.data.data.corpserialid
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
    resetData() {
      this.formData = {
        ...initFormData
      }
    },
    // 重置
    refresh() {
      this.getData()
      console.log('refresh')
    },
    // 删除
    async del() {
      this.loading = true
      const res = await deliverChangeServer.delete(this.formData.corpserialid)
      if (Number.parseInt(res.data.code) === 200) {
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.loading = false
        window.eventBus.$emit(
          'closePagePath',
          '/DZ-manage/citic-is-protected/declare-change/edit/' + this.id
        )
      } else {
        this.$message({
          message: res.data.msg,
          type: 'warning'
        })
        this.loading = false
      }
    },
    // 提交
    submit() {
      console.log('submit')
    },
    // 选中出运申报单
    async changeBuyerno(obj) {
      if (obj != null) {
        this.formData = {
          ...obj
        }
        this.formData.corpserialid = null
        this.formData.stat = null
        this.formData.createDate = null
        this.formData.corpserialno = null
        this.formData.oldcorpserialid = obj.corpserialid
        this.formData.oldcorpserialno = obj.corpserialno
        this.formData.invoiceno = obj.factInvoiceNo
      } else {
        this.resetData()
      }
    },
    changePaymode(val) {
      if (val === 'LC') {
        this.formData.feepaymode = val
      } else if (val === 'OA') {
        this.formData.feepaymode = val
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
.area {
  /deep/ .el-form-item__label {
    width: 140px !important;
    font-size: 13px;
  }
  /deep/ .el-form-item__content {
    width: calc(100% - 140px) !important;
    margin-left: 140px !important;
  }
}
.el-form-item {
  /deep/ .el-input-number {
    width: 100%;
  }
}
</style>
