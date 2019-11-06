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
              <DeliverReportStatusEnumSelect v-model="formData.stat" :disabled="true"/>
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
              <!-- <CustomerSelect
                v-model="formData.custId"
                :disabled="true"
                size="mini"
              @changeData="changeCustId" />-->
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
            <el-form-item label="发票号" prop="invoiceno">
              <DeliverCommercialInvoiceNoSelect
                v-model="formData.invoiceno"
                :tbstat="1"
                :parent-form-data="formData"
                @input="clearableInvoiceid"
                @changeData="changeInvoiceno"
              />
            </el-form-item>
          </el-col>

          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发票金额" prop="invoicesum">
              <el-input-number v-model="formData.invoicesum" :min="0" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="投保金额" prop="insuresum">
              <el-input-number v-model="formData.insuresum" :min="0" size="mini"/>
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
            <el-form-item label="业务员" prop="employeename">
              <el-input v-model="formData.employeename" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="付款人" prop="payername">
              <el-input v-model="formData.payername" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="保费" prop="premium">
              <el-input-number v-model="formData.premium" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="费率" prop="premiumrate">
              <el-input-number 
                v-model="formData.premiumrate" 
                :precision="4"
                size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="非TT金额" prop="invNottamt">
              <el-input-number v-model="formData.invNottamt" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item class="area" label="保户特别说明" prop="remark">
              <el-input v-model="formData.remark" type="textarea" rows="2" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item class="area" label="退回原因" prop="unacceptreason">
              <el-input
                v-model="formData.unacceptreason"
                type="textarea"
                rows="2"
                size="mini"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item class="area" label="投保金额不一致原因" prop="notNote">
              <el-input
                v-model="formData.notNote"
                size="mini"
                type="textarea"
                rows="2"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog :visible.sync="jumpListVisible" title="点击跳转至对应发货通知">
      <el-table :data="noticesList">
        <el-table-column type="index" label="序号"/>
        <el-table-column prop="no" label="通知单号">
          <template slot-scope="scope">
            <a href="javascript:void(0)" @click="jumpToOMS(scope.row.id)">{{ scope.row.no }}</a>
          </template> 
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
import deliverReportServer from './../../../api/deliverReportServer'
import commercialInvoiceServer from './../../../api/commercialInvoiceServer'
// import creditCertificateServer from './../../../api/creditCertificateServer.js'
// import CustomerSelect from './../customer/CustomerSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import DeliverCommercialInvoiceNoSelect from './DeliverCommercialInvoiceNoSelect'
import CurrencySelect from './../currency/CurrencySelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import containerServer from './../../../api/containerServer'
import DeliverReportStatusEnumSelect from './../../../components/entity/deliver-report/DeliverReportStatusEnumSelect'
import DeliverReportTransportationModeEnumSelect from './../../../components/entity/deliver-report/DeliverReportTransportationModeEnumSelect'
import DeliverReportContractPaymentMethodEnumSelect from './../../../components/entity/deliver-report/DeliverReportContractPaymentMethodEnumSelect'
import DeliverReportPaymentMethodEnumSelect from './../../../components/entity/deliver-report/DeliverReportPaymentMethodEnumSelect'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil.js'
const emptyFormData = {
  // code: null,
  // status: null,
  // createName: null,
  // createDate: null,
  // buyerno: null,
  // invoiceAmount: null,
  // insuranceAmount: null,
  // shipmentDate: null,
  // customGoodsCode: '8415101000',
  // customGoodsName: '独立窗式或壁式空气调节器',
  // goodsName: '独立窗式或壁式空气调节器',
  // transportationMode: null,
  // contractPaymentMethod: null,
  // contractPaymentDeadline: null,
  // paymentMethod: null,
  // contractCode: null,
  // clearanceGoodsCode: null,
  // billLadingCode: null,
  // salesman: null,
  // payer: null,
  // securityAmount: null,
  // expenseRatio: null,
  // notTtAmount: null,
  // specialRemark: null,
  // returnReason: null,
  // uncertainAmountReason: null,
  // // isDelete: null,
  // buyCustomerId: null,
  // departmentId: null,
  // openAccountBankId: null,
  // commercialInvoiceId: null,
  // currencyId: null,
  corpserialid: null, // 主键 id
  corpserialno: null, // 单据号
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
  notNote: null // 保费不一致原因
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'DeliverReportEdit',
  components: {
    OperateUnitSelect,
    DepartmentSelect,
    DeliverCommercialInvoiceNoSelect,
    CurrencySelect,
    DeliverReportStatusEnumSelect,
    DeliverReportTransportationModeEnumSelect,
    DeliverReportContractPaymentMethodEnumSelect,
    DeliverReportPaymentMethodEnumSelect
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
      jumpListVisible: false,
      noticesList: [],
      formData: {
        ...initFormData
      },
      isEditOne: 0,
      isCreated: false,
      rules: {
        invoiceno: [{ required: true, message: '不能为空', trigger: 'change' }],
        invoiceid: [{ required: true, message: '不能为空', trigger: 'change' }],
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
    if (Number.parseInt(this.$store.getters.entid) === 102) emptyFormData.payername = ''
    else emptyFormData.payername = '宁波奥克斯进出口有限公司'
    if (this.id) {
      this.isCreated = false
      this.formData.corpserialid = this.id
      this.isEditOne = 1
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
    async approvingExport() {
      this.loading = true
      const keyword = {}
      keyword.departmentId = this.$store.getters.entid
      keyword.invoiceNo = this.formData.invoiceno
      const res = await commercialInvoiceServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      const [{ noticeIds, noticeNos }] = res.data.data.data
      this.jumpListVisible = true
      const ids = noticeIds.split(',')
      const nos = noticeNos.split(',')
      this.noticesList = []
      ids.forEach((id, index) => {
        this.noticesList.push({
          id: id,
          no: nos[index]
        })
      })
      // noticeIds: "546396,554543"
      // noticeNos: "SSNH2019040451178"
      // 拿出通知单号

      this.loading = false
    },
    async jumpToOMS(id) {
      let key = {
        id: id,
        userid: this.$store.getters.userCode
      }
      key = window.encodeURIComponent(Base64.encode(JSON.stringify(key)))
      const res = await containerServer.search({
        type: 'OMSIP'
      })        
      const urlTo = res.data.data.OMSprod
      const url = urlTo + 'web/index.html#/crmman/sale_ship_notice_headerEdit?param=' + key
      window.open(url)
    },
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      // if (!this.formData.corpserialid) {
      //   this.formData.corpserialid = this.id
      // }
      // this.formData.corpserialid = this.id
      const res = await deliverReportServer.get(this.formData.corpserialid)
      initFormData = res
      this.formData = {
        ...res
      }
      // console.log(this.formData)
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (
              this.formData.insuresum !== this.formData.invNottamt &&
              this.formData.notNote === null
            ) {
              this.$message({
                message: '投保金额与非TT金额不一致，请填写不一致原因',
                type: 'warning'
              })
            } else {
              if (this.formData.corpserialid) {
                // 编辑
                const res = await deliverReportServer.update(this.formData)
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                this.getData()
                // console.log(res)
              } else {
                // 新增
                this.formData.entid = this.$store.getters.entid
                const res = await deliverReportServer.add(this.formData)
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                this.formData.corpserialid = res.data.data
                this.$emit('emitEvent', {
                  key: 'update',
                  params: {
                    id: this.formData.corpserialid
                  }
                })
              }
              initFormData = {
                ...this.formData
              }
              resolve({
                ...this.formData
              })
            }
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
    resetData() {
      this.formData = {
        ...initFormData
      }
    },
    // 重置
    refresh() {
      this.getData()
      // console.log('refresh')
    },
    // 删除
    async del() {
      this.loading = true
      const res = await deliverReportServer.delete(this.formData.corpserialid)
      this.$message({
        message: res.data.msg,
        type: 'success'
      })
      this.loading = false
      // console.log(res)
      window.eventBus.$emit(
        'closePagePath',
        '/DZ-manage/citic-is-protected/deliver-report/edit/' + this.id
      )
    },
    // 提交
    submit() {
      // console.log('submit')
    },
    // 选中发票号
    async changeInvoiceno(obj) {
      if (obj != null && this.isEditOne !== 1) {
        // console.log(obj)
        // this.formData.invoiceno = obj.invoiceNo
        this.formData.invoiceid = obj.invoiceId
        this.formData.custId = obj.custCode
        this.formData.custName = obj.custName
        this.formData.orgName = obj.orgName
        this.formData.orgId = obj.orgId
        this.formData.lcno = obj.lcNo
        this.formData.invoicesum = obj.invoiceAmt
        this.formData.insuresum = obj.tbAmt
        this.formData.moneyid = obj.currencyCode
        this.formData.employeename = obj.salesUserId
        // this.formData.paymode = obj.paymentTypeCode
        // this.formData.transportdate = obj.actualShipDate // 商业发票：实际出货日期
        this.formData.code10 = '8415101000'
        this.formData.goodsname1 = '独立窗式或壁式空气调节器'
        this.formData.goodsname = '独立窗式或壁式空气调节器'
        this.formData.contractno = obj.pinoNew // 商业发票： 新合同号

        // 有’信用证号‘ 查询对应的买方信息 和开证行信息
        if (!obj.lcNo || obj.lcNo !== '') {
          // const keyword = {
          //   creditCertificateCode: lcNo
          // }
          // const res = await creditCertificateServer.search(keyword)
          // this.formData.bankno = res.data[0].swift

          const data = {
            params: {
              invoiceId: obj.invoiceId,
              lcNo: obj.lcNo
            }
          }
          const res = await deliverReportServer.queryEdiInfo(data)
          if (Number.parseInt(res.data.code) === 200) {
            if (res.data.data.bankInfo) {
              const bankInfo = {
                ...res.data.data.bankInfo
              }
              // console.log(bankInfo)
              this.formData.bankno = bankInfo.bankno
              this.formData.corpbankno = bankInfo.corpserialno
              this.formData.bankchnname = bankInfo.bankchnname
              this.formData.bankengname = bankInfo.bankengname
              this.formData.bankcountrycode = bankInfo.bankcountrycode
              this.formData.bankaddr = bankInfo.bankaddr
            }
            if (res.data.data.buyerInfo != null) {
              const buyerInfo = {
                ...res.data.data.buyerInfo[0]
              }
              // console.log(buyerInfo)
              this.formData.buyerno = buyerInfo.buyerno
              // this.formData.buyerchnname = res.buyerInfo.chnname
              this.formData.buyerengname = buyerInfo.engname
              // this.formData.corpbuyerno = res.buyerInfo.corpserialno
              this.formData.buyercountrycode = buyerInfo.countrycode
              this.formData.buyerengaddr = buyerInfo.engaddress
              // this.formData.buyerchnaddr = res.buyerInfo.chnaddress
              // this.formData.buyerregno = res.buyerInfo.regno
              // this.formData.buyertel = res.buyerInfo.tel
              // this.formData.buyerfax = res.buyerInfo.fax
              this.formData.custId = buyerInfo.custId
              this.formData.custCode = buyerInfo.custCode
              this.formData.custName = buyerInfo.custName
            }
            if (res.data.data.invoiceInfo != null) {
              this.formData.payterm = res.data.data.invoiceInfo.payterm
              this.formData.invNottamt = res.data.data.invoiceInfo.invNottamt
              this.formData.insuresum = res.data.data.invoiceInfo.insuresum
            }
          }
        }
        if (obj.paymentTypeName.indexOf('LC') > -1) {
          this.formData.paymode = 'LC'
        } else {
          this.formData.paymode = 'OA'
          this.formData.feepaymode = 'OA'
        }
      } else {
        this.isEditOne = 2
        // this.resetData()
      }
    },
    // 发票号，清空 触发事件
    clearableInvoiceid(val) {
      if (!val) {
        this.resetData()
      }
    },
    changeCustId(name, code) {
      // console.log(name, code)
    },
    changePaymode(val) {
      if (val === 'LC') {
        this.formData.feepaymode = val
      } else if (val === 'OA') {
        this.formData.feepaymode = val
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.area {
  // margin-bottom: 8px;
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
// .area:nth-of-type(1) {
//   margin-top: 5px;
// }
// .el-form-item {
//   width: 100%;
//   margin-right: 0;
//   // margin-bottom: 1px;
//   /deep/ .el-form-item__error {
//     display: none
//   }
// }
</style>
