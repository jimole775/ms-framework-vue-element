<template>
  <div class="max-w">
    <el-form
      :model="asyncFromData"
      :ref="'formData'"
      :rules="rules"
      class="demo-form-inline"
      label-position="right"
      label-width="120px"
    >
      <el-tabs v-loading="loading" tab-position="top">
        <el-tab-pane label="提单信息">
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="申请单号" prop="code">
                <el-input v-model="asyncFromData.code" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="status">
                <OrderNoticeStatusEnumSelect v-model="asyncFromData.status" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单人" prop="createOrderMan">
                <el-input v-model="asyncFromData.createOrderMan" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单时间" prop="createOrderTime">
                <el-date-picker
                  v-model="asyncFromData.createOrderTime"
                  :disabled="true"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="商业发票号" prop="commercialInvoiceId">
                <CommercialInvoiceSelect
                  ref="CommercialInvoiceSelect"
                  :merging-split-type="3"
                  v-model="asyncFromData.commercialInvoiceId"
                  :disabled="isDisable1 === true"
                  @changeData="changeData"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同号" prop="contractCode">
                <el-input v-model="asyncFromData.contractCode" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发票总金额" prop="invoiceAmount">
                <el-input-number
                  v-model="asyncFromData.invoiceAmount"
                  :disabled="true"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务部门" prop="salesDepartment">
                <el-input v-model="asyncFromData.salesDepartment" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="付款类型" prop="paymentMethod">
                <el-input v-model="asyncFromData.paymentMethod" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="TT金额" prop="ttAmount">
                <el-input-number v-model="asyncFromData.ttAmount" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户" prop="customerId">
                <CustomerSelect v-model="asyncFromData.customerId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发票流水号">
                <el-input v-model="asyncFromData.invoiceNo" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="提单号" prop="presentOrderCode">
                <el-input 
                  v-model="asyncFromData.presentOrderCode"
                  :disabled="isDisable1 === true"
                  size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="装船日期" prop="loadDate">
                <el-date-picker
                  :disabled="!(loadDate_open_edit === true)"
                  v-model="asyncFromData.loadDate"
                  size="mini"
                  class="max-w"
                  type="date"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="买方代码" prop="buyerCode">
                <el-input 
                  v-model="asyncFromData.buyerCode" 
                  :disabled="true"
                  size="mini"/>
              </el-form-item>
            </el-col>
            <el-col v-if="asyncFromData.tbStat==2" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="投保发票号" prop="insureInvoiceCode">
                <el-input v-model="asyncFromData.insureInvoiceCode" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="投保金额" prop="insureAmount">
                <el-input-number v-model="asyncFromData.insureAmount" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="投保日期" prop="insureDate">
                <el-date-picker
                  :disabled="true"
                  v-model="asyncFromData.insureDate"
                  size="mini"
                  class="max-w"
                  type="date"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="通知单号" prop="noticeCode">
                <el-input v-model="asyncFromData.noticeCode" :disabled="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="电放费" prop="voicePlayAmount">
                <el-input-number 
                  v-model="asyncFromData.voicePlayAmount" 
                  size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="分配金额总额" prop="distributionAmount">
                <el-input-number
                  v-model="asyncFromData.distributionAmount"
                  :disabled="true"
                  size="mini"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务员" prop="salesman">
                <el-input 
                  v-model="asyncFromData.salesman" 
                  :disabled="isDisable1 === true"
                  :clearable="true" 
                  size="mini" 
                  @focus="saleManSearch()" 
                  @clear="clearSalMan"/>
              </el-form-item>
            </el-col>
            <!--<el-col :lg="6" :md="8" :sm="12" :xs="24">-->
            <!--<el-form-item label="到港日期" prop="predictArriveDate">-->
            <!--<el-date-picker-->
            <!--v-model="asyncFromData.predictArriveDate"-->
            <!--size="mini"-->
            <!--class="max-w"-->
            <!--type="date"-->
            <!--/>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :lg="6" :md="8" :sm="12" :xs="24">-->
            <!--<el-form-item label="实际到港日期" prop="orderRecivedDate">-->
            <!--<el-date-picker-->
            <!--v-model="asyncFromData.orderRecivedDate"-->
            <!--size="mini"-->
            <!--class="max-w"-->
            <!--type="date"-->
            <!--/>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item
                v-if="asyncFromData.paymentMethod != null && asyncFromData.paymentMethod.indexOf('后TT') > -1"
                label="免堆期(天)"
                prop="freeStorageTime"
                required
              >
                <el-input-number v-model="asyncFromData.freeStorageTime" size="mini"/>
              </el-form-item>
              <el-form-item v-else label="免堆期(天)" prop="freeStorageTime">
                <el-input-number 
                  v-model="asyncFromData.freeStorageTime" 
                  :disabled="isDisable1 === true"
                  size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="预计到港时间" prop="predictArriveDate">
                <el-date-picker
                  v-model="asyncFromData.predictArriveDate"
                  :disabled="isDisable1 === true"
                  size="mini"
                  class="max-w"
                  type="date"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="经营单位" prop="operateUnitId">
                <OperateUnitSelect v-model="asyncFromData.operateUnitId" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="提单签收时间" prop="orderRecivedDate">
                <el-date-picker
                  v-model="asyncFromData.orderRecivedDate"
                  :disabled="isDisable3 === true"
                  size="mini"
                  class="max-w"
                  type="date"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input 
                  v-model="asyncFromData.remark" 
                  :disabled="isDisable1 === true"
                  :rows="4" 
                  type="textarea" 
                  size="mini"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="放单信息">
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="放单类型" prop="noticeType">
                <OrderNoticeNoticeTypeEnumSelect 
                  v-model="asyncFromData.noticeType"
                  :disabled="isDisable2 === true"
                  @changeData="changeNoticeType" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-collapse v-model="noticeActiveNames" class="m-b-12">
            <el-collapse-item v-if="asyncFromData.noticeType === 1" title="电放信息" name="1">
              <el-row>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="负责人" prop="applyThoseResponsible">
                    <el-input 
                      v-model="asyncFromData.applyThoseResponsible" 
                      :disabled="isDisable2 === true"
                      size="mini"/>
                  </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="申请人手机" prop="applyPhone">
                    <el-input 
                      v-model="asyncFromData.applyPhone" 
                      :disabled="isDisable2 === true"
                      size="mini"/>
                  </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="区域经理" prop="regionalManager">
                    <el-input
                      v-model="asyncFromData.regionalManager" 
                      :disabled="isDisable2 === true"
                      :clearable="true" 
                      size="mini" 
                      @focus="regionalManagerSearch()" 
                      @clear="clearRegionalManager"/>
                  </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="收货人信息" prop="consigneeInfo">
                    <el-input 
                      v-model="asyncFromData.consigneeInfo" 
                      :disabled="isDisable2 === true"
                      size="mini"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="收件人信息" name="2">
              <el-row>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="收件人" prop="recipient">
                    <el-input 
                      v-model="asyncFromData.recipient" 
                      :disabled="isDisable2 === true"
                      size="mini" 
                      @focus="showRecient"/>
                  </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="收货人地址" prop="recipientAddress">
                    <el-input v-model="asyncFromData.recipientAddress" disabled size="mini"/>
                  </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="邮编" prop="postcode">
                    <el-input 
                      v-model="asyncFromData.postcode" 
                      :disabled="isDisable2 === true"
                      size="mini"/>
                  </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="联系人" prop="recipientContact">
                    <el-input v-model="asyncFromData.recipientContact" disabled size="mini"/>
                  </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="电话号码" prop="recipientPhone">
                    <el-input v-model="asyncFromData.recipientPhone" disabled size="mini"/>
                  </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="国家" prop="recipientCountry">
                    <el-input v-model="asyncFromData.recipientCountry" disabled size="mini"/>
                  </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="城市" prop="recipientCity">
                    <el-input 
                      v-model="asyncFromData.recipientCity"  
                      :disabled="isDisable2 === true"
                      size="mini"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item v-if="asyncFromData.noticeType === 2" title="寄单信息" name="3">
              <el-row>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="快递公司名称" prop="courierCompanyName">
                    <el-input 
                      v-model="asyncFromData.courierCompanyName" 
                      :disabled="isDisable2 === true && special_field_open_edit === false"
                      size="mini"/>
                  </el-form-item>
                </el-col>
                <el-col :lg="6" :md="8" :sm="12" :xs="24">
                  <el-form-item label="寄单号" prop="courierCode">
                    <el-input 
                      v-model="asyncFromData.courierCode" 
                      :disabled="isDisable2 === true && special_field_open_edit === false"
                      size="mini"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-tabs type="border-card" @tab-click="changeDetail">
      <el-tab-pane label="核销明细">
        <el-table :data="invoiceList" border style="width: 100%">
          <el-table-column type="index" label="序号"/>
          <el-table-column prop="allo_no" sortable min-width="150" label="分配单号"/>
          <el-table-column prop="other_no" sortable min-width="150" label="资金系统单号"/>
          <el-table-column prop="allo_amt" sortable min-width="150" label="分配金额"/>
          <el-table-column prop="funds_type" sortable min-width="150" label="到款类型">
            <template
              slot-scope="scope"
            >{{ scope.row.funds_type == 1 ? 'tt' : scope.row.funds_type == 2 ? 'td' : scope.row.funds_type }}</template>
          </el-table-column>
          <el-table-column prop="create_time" sortable min-width="150" label="创建时间"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="批注明细">
        <el-table v-loading="loadingAnnotate" :data="annotateList" border style="width: 100%">
          <el-table-column type="index" label="序号"/>
          <el-table-column prop="title" sortable width="120" label="项目"/>
          <el-table-column prop="value" sortable label="内容"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-tabs type="border-card" class="file-div">
      <el-tab-pane label="基础附件">
        <FileUpload :id="id" :btn-text="'添加附件'" :bill-name="'提单放单流水号'"/>
      </el-tab-pane>
      <el-tab-pane label="电放附件">
        <FileUpload :id="id" :btn-text="'添加附件'" :tab="1" :bill-name="'提单放单流水号'"/>
      </el-tab-pane>
    </el-tabs>
    <component
      v-if="showRecientView"
      :is="'RecientViewPopup'"
      @updateInfo="updateRecientInfo"
      @close="showRecientView = false"
    />
    <RegionalManagerSelect
      v-if="showRgManager"
      @confirm="changeRegionalManager"
      @close="showRgManager = false"
    />
    <SaleManSelect
      v-if="showSaleMan"
      @confirm="changeSaleMan"
      @close="showSaleMan = false"
    />
  </div>
</template>

<script>
import RegionalManagerSelect from './RegionalManagerSelect.vue'
import SaleManSelect from './SaleManSelect.vue'
import orderNoticeServer from './../../../api/orderNoticeServer'
import CommercialInvoiceSelect from './../commercial-invoice/CommercialInvoiceSelect'
import CustomerSelect from './../customer/CustomerSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import { getAccount } from '@/api/login'
import OrderNoticeStatusEnumSelect from './../../../components/entity/order-notice/OrderNoticeStatusEnumSelect'
import OrderNoticeNoticeTypeEnumSelect from './../../../components/entity/order-notice/OrderNoticeNoticeTypeEnumSelect'
const emptyFormData = {
  code: null,
  status: 1,
  createOrderMan: null,
  createOrderTime: new Date(),
  commercialInvoiceCode: null,
  contractCode: null,
  invoiceAmount: null,
  salesDepartment: null,
  paymentMethod: null,
  ttAmount: null,
  presentOrderCode: null,
  loadDate: null,
  buyerCode: null,
  insureInvoiceCode: null,
  insureAmount: null,
  insureDate: null,
  noticeCode: null,
  voicePlayAmount: null,
  distributionAmount: null,
  salesman: null,
  predictArriveDate: null,
  freeStorageTime: null,
  remark: null,
  isDelete: null,
  noticeType: null,
  applyThoseResponsible: null,
  applyPhone: null,
  regionalManager: null,
  consigneeInfo: null,
  recipient: null,
  recipientAddress: null,
  postcode: null,
  recipientContact: null,
  recipientPhone: null,
  recipientCountry: null,
  recipientCity: null,
  courierCompanyName: null,
  courierCode: null,
  commercialInvoiceId: null,
  customerId: null,
  operateUnitId: null,
  orderRecivedDate: null,
  invoiceNo: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'OrderNoticeEdit',
  components: {
    CommercialInvoiceSelect,
    CustomerSelect,
    RecientViewPopup: () => import('./RecientViewPopup.vue'),
    OperateUnitSelect,
    OrderNoticeStatusEnumSelect,
    OrderNoticeNoticeTypeEnumSelect,
    RegionalManagerSelect,
    SaleManSelect
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loadDate_open_edit: true,
      special_field_open_edit: false, // 由于不清楚 isDisable1 isDisable2 isDisable3 的控制场景，要加控制需求，只能额外叠加变量
      loading: false,
      showRgManager: false,
      loadingAnnotate: false,
      showRecientView: false,
      showSaleMan: false,
      isdel1: false,
      isdel2: false,
      isDisable3: true,
      isDisable1: false,
      isDisable2: true,
      formData: {
        ...initFormData
      },
      noticeActiveNames: ['1', '2', '3'],
      invoiceList: [],
      annotateList: [],
      rules: {
        code: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        status: [],
        createOrderMan: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        createOrderTime: [],
        commercialInvoiceCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        contractCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        invoiceAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        salesDepartment: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        paymentMethod: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        ttAmount: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
        presentOrderCode: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        loadDate: [],
        buyerCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        insureInvoiceCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        insureAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        insureDate: [],
        noticeCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        voicePlayAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        distributionAmount: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        salesman: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        predictArriveDate: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        freeStorageTime: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        remark: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        isDelete: [],
        noticeType: [],
        applyThoseResponsible: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        applyPhone: [
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' }
        ],
        regionalManager: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        consigneeInfo: [
          {
            min: 0,
            max: 512,
            message: '长度在 0 到 512 个字符',
            trigger: 'blur'
          }
        ],
        recipient: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        recipientAddress: [
          {
            min: 0,
            max: 512,
            message: '长度在 0 到 512 个字符',
            trigger: 'blur'
          }
        ],
        postcode: [
          { min: 0, max: 12, message: '长度在 0 到 12 个字符', trigger: 'blur' }
        ],
        recipientContact: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        recipientPhone: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        recipientCountry: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        recipientCity: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        courierCompanyName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        courierCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        commercialInvoiceId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        customerId: [],
        operateUnitId: []
      }
    }
  },
  computed: {
    asyncFromData() {
      return this.formData
    },
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
    }
  },
  created() {
    if (this.id) {
      this.getData()
    } else {
      emptyFormData.createOrderMan = this.$store.getters.userCode
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }
    }
  },
  methods: {
    changeRegionalManager(val) {
      this.formData.regionalManager = val.userName
      this.showRgManager = false
    },
    changeSaleMan(val) {
      this.formData.salesman = val.userName
      this.showSaleMan = false
    },
    regionalManagerSearch() {
      if (this.isdel1 === false) {
        this.showRgManager = true
      } else {
        this.isdel1 = false
      }
    },
    clearRegionalManager() {
      this.showRgManager = false
      this.isdel1 = true
    },
    saleManSearch() {
      if (this.isdel2 === false) {
        this.showSaleMan = true
      } else {
        this.isdel2 = false
      }
    },
    clearSalMan() {
      this.showSaleMan = false
      this.isdel2 = true
    },
    async changeNoticeType(res) { // 选择放单类型
      if (res.id === 1) {
        await getAccount().then(response => {
          this.formData.applyThoseResponsible = response.data.data.userName
          this.formData.applyPhone = response.data.data.userMobile
        })
      }
    },
    close() {
      this.$emit('close')
    },
    showRecient() {
      this.showRecientView = true
    },
    updateRecientInfo(data) {
      this.formData.recipient = data.cust_name
      this.formData.recipientAddress = data.address
      this.formData.postcode = data.post_code
      this.formData.recipientContact = data.link_man
      this.formData.recipientPhone = data.tel
      this.formData.recipientCountry = data.country
      this.formData.recipientCity = data.city
      this.showRecientView = false
    },
    async getData() {
      this.loading = true
      const res = await orderNoticeServer.get(this.id)
      let invoiceRes = null
      initFormData = res.data
      this.formData = {
        ...res.data
      }
      if (this.formData.noticeType === 0) { // 放单类型数据库默认为0
        this.formData.noticeType = null
      }
      if (res.data.invoiceId) {
        invoiceRes = await orderNoticeServer.getInvoice({
          invoiceId: res.data.invoiceId,
          invoiceNo: res.data.invoiceNo
        })
        this.invoiceList =
          invoiceRes.data.bill_invoice_funds_lineofbill_invoice_header
      }
      if (this.asyncFromData.status === 1) {
        this.isDisable3 = false
      }

      // 由于一些数据并没有以字段的形式存进数据库，
      // 只能在保存之后，手动拉取
      if (this.formData.invoiceId) {
        this.$refs.CommercialInvoiceSelect.change(this.formData.invoiceId, () => {
          /** 发票自带的【业务员】字段可以在当前模块修改
            * 修改之后不能存进发票数据，修改的字段只能存到服务器
            * 也就是说，服务器只存一个业务员字段，发票数据的其他字段都是发票自带的
            * 那么，这种情况只能通过判断服务器有无返回业务员字段来覆盖发票的业务员字段了
            * 用回调的方式，在流程最后进行覆盖
            **/
          if (res && res.data && res.data.salesUserId) {
            this.formData.salesman = this.formData.salesUserId = res.data.salesUserId
          }
        })
      }

      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        if (this.isDisable2 === false) {
          if (this.asyncFromData.noticeType === null || this.asyncFromData.noticeType === '') {
            this.$message({
              message: '当前节点，放单类型字段不能为空！',
              type: 'warning'
            })
            reject()
          } else {
            this.$refs['formData'].validate(async valid => {
              if (valid) {
                if (this.formData.paymentMethod != null && this.formData.paymentMethod.indexOf('后TT') > -1) {
                  if (!this.formData.freeStorageTime) {
                    this.$message({
                      message: '请填写免堆期',
                      type: 'warning'
                    })
                    return
                  }
                }
                if (this.formData.id) {
                  await orderNoticeServer.put(this.formData)
                } else {
                  const res = await orderNoticeServer.post(this.formData)
                  if (Number.parseInt(res.data.code) === 200) {
                    // 新增保存成功后清空表单数据
                    this.formData = { ...emptyFormData }
                  }
                  this.formData.id = res.data.data.dataSet.rows[0].tddf_id
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
                this.changeDetail({ index: '1' })
              } else {
                this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
                reject('error submit!!')
              }
            })
          }
        } else {
           this.$refs['formData'].validate(async valid => {
            if (valid) {
              if (this.formData.paymentMethod != null && this.formData.paymentMethod.indexOf('后TT') > -1) {
                if (!this.formData.freeStorageTime) {
                  this.$message({
                    message: '请填写免堆期',
                    type: 'warning'
                  })
                  return
                }
              }
              if (this.formData.id) {
                await orderNoticeServer.put(this.formData)
              } else {
                const res = await orderNoticeServer.post(this.formData)
                if (Number.parseInt(res.data.code) === 200) {
                  // 新增保存成功后清空表单数据
                  this.formData = { ...emptyFormData }
                }
                this.formData.id = res.data.data.dataSet.rows[0].tddf_id
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
              this.changeDetail({ index: '1' })
            } else {
              this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
              reject('error submit!!')
            }
          })
        }
      })
    },
    resetData() {
      this.formData = {
        ...initFormData
      }
    },
    async changeData(item, cb) {
      if (!item) return
      this.formData.contractCode = item.pinoNew
      this.formData.invoiceAmount = item.invoiceAmt
      this.formData.salesDepartmentId = item.orgId
      this.formData.salesDepartment = item.orgName
      this.formData.commercialInvoiceCode = item.factInvoiceNo
      this.formData.invoiceNo = item.invoiceNo
      this.formData.invoiceId = item.invoiceId
      this.formData.customerId = item.custId
      this.formData.custCode = item.custCode
      this.formData.custName = item.custName
      this.formData.ttAmount = item.ttCheckAmt
      this.formData.paymentMethod = item.paymentTypeName
      this.formData.operateUnitId = item.entid
      this.formData.noticeCode = item.noticeNo
      /** 装船日期改为用户填写，不需要取发票日期*/
      // this.formData.loadDate = item.actualShipDate 
      this.formData.insureAmount = item.tbAmt
      this.formData.insureDate = item.tbDate
      this.formData.insureInvoiceCode = item.factInvoiceNo
      this.formData.tbStat = item.tbStat
      this.formData.salesman = item.salesUserId
      const buyerCodeRes = await orderNoticeServer.getBuyerCode({
        invoiceId: this.formData.invoiceId,
      })
      if (buyerCodeRes.buyerInfo) {
        if (buyerCodeRes.buyerInfo.length > 0) {
          this.asyncFromData.buyerCode = buyerCodeRes.buyerInfo[0].buyerno
        } else {
          this.asyncFromData.buyerCode = ''
        }
      } else {
        this.asyncFromData.buyerCode = ''
      }
      const invoiceRes = await orderNoticeServer.getInvoice({
        invoiceId: this.formData.invoiceId,
        invoiceNo: this.formData.invoiceNo
      })
      this.invoiceList = invoiceRes.data.bill_invoice_funds_lineofbill_invoice_header
      let nums = 0
      if (this.invoiceList) {
        for (let i = 0; i < this.invoiceList.length; i++) {
         nums += parseFloat(this.invoiceList[i].allo_amt)
        }
        this.asyncFromData.distributionAmount = nums
      } else {
        this.asyncFromData.distributionAmount = 0
      }

      cb && cb()
    },
    async changeDetail(tab) {
      if (tab.index === '1') {
        const fpDetails = []
        if (this.invoiceList) {
          this.invoiceList.forEach(item => {
            fpDetails.push({
              alloAmt: item.allo_amt,
              alloId: item.allo_id,
              alloNo: item.allo_no,
              fundsType: item.funds_type,
              invoiceId: item.invoice_id,
              invoiceNo: item.invoice_no,
              otherNo: item.other_no
            })
          })
        }
        this.loadingAnnotate = true
        try {
          const res = await orderNoticeServer.getAnnotate({
            custId: this.formData.customerId,
            paymentTypeName: this.formData.paymentMethod,
            invoiceAmt: this.formData.invoiceAmount,
            factInvoiceNo: this.formData.commercialInvoiceCode,
            ttAmt: this.formData.ttAmount,
            ciInvoiceno: this.formData.insureInvoiceCode,
            ciAmt: this.formData.insureAmount,
            tddfId: this.formData.id,
            fpDetails
          })
          this.annotateList = [
            {
              title: '逾期',
              value: res.data.yq || ''
            },
            {
              title: '定金',
              value: res.data.dj || '无'
            },
            {
              title: '投保发票号',
              value: res.data.tbfph || '无'
            },
            {
              title: '投保金额',
              value: res.data.tbje || 0
            }
          ]
        } finally {
          this.loadingAnnotate = false
        }
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
    processStep1() {
      this.isDisable1 = true
      this.isDisable3 = false
      this.loadDate_open_edit = true
    },
    processStep2() {
      this.isDisable1 = true
      this.isDisable2 = false
      this.isDisable3 = true
      this.loadDate_open_edit = false
      this.rules.noticeType = {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
    },
    processStep3() {
      this.isDisable1 = true
      this.isDisable2 = true
    },
    processStep4() {
      this.isDisable1 = true
    },
    processStep5() {
      this.isDisable1 = true
    },
    processStep6() {
      this.isDisable1 = true
    },
    processStep7() {
      // 财务单证节点
      this.isDisable1 = true
      this.special_field_open_edit = true
      this.loadDate_open_edit = true
      this.rules.voicePlayAmount = {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
    },
    processStep8() {
      this.isDisable1 = true
      this.special_field_open_edit = false
      this.loadDate_open_edit = false
      this.isDisable2 = false
    },
    processStep9() {
      this.isDisable1 = true
      this.isDisable2 = true
      this.rules.noticeType = {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
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
        case 'startProcess':
          return this.newStartProcess()
        case 'agreeProcess':
          return this.emitChangeEvent()
        case 'shareProcessInfo':
          this.shareProcessInfo(event.params.info)
          break  
        default:
          break
      }
    },
    async emitChangeEvent() {
      // 这里先设置为空，以触发 input 的change事件
      // this.formData.commercialInvoiceId = ''
      return new Promise(async(resolve, reject) => {
        await this.save()
        resolve()
      })
    },
    async newStartProcess() {
      return new Promise(async(resolve, reject) => {
        await this.save()
        resolve()
      })
    },
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
.file-div {
  margin-top: 12px;
}
</style>
