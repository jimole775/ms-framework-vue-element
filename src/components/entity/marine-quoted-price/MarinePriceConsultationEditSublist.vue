<template>
  <div class="container">
    <div class="f-l">
      <el-button v-loading="loading" v-if="showSaveBtn" type="primary" size="mini" @click="save">保存</el-button>
      <el-button v-loading="loading" v-if="showPushBtn" type="primary" size="mini" @click="push">提交</el-button>
    </div>
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
            <el-form-item label="单号" prop="code">
              <el-input v-model="formData.code" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="状态" prop="status">
              <MarinePriceConsultationStatusEnumSelect v-model="formData.status" />
            </el-form-item>
          </el-col>-->
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出货预告号" prop="warnNo">
              <el-input v-model="formData.warnNo" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="目的港免用箱" required prop="freeBox">
              <el-input-number v-model="formData.freeBox" :min="0" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="免堆期(天)" prop="freeStorageTime">
              <el-input-number v-model="formData.freeStorageTime" :min="0" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="预计装柜日期" prop="loadDate">
              <el-date-picker
                v-model="formData.loadDate"
                size="mini"
                class="max-w"
                type="date"
                disabled
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="合同号" prop="piNo">
              <el-input v-model="formData.piNo" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="航线" prop="airRoute">
              <MarinePriceConsultationAirRouteEnumSelect
                v-model="formData.airRoute"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="预计货款到达日" prop="paymentDate">
              <el-date-picker
                v-model="formData.paymentDate"
                size="mini"
                class="max-w"
                type="date"
                disabled
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="询价截至日期" prop="enquiryUptoDate">
              <el-date-picker
                v-model="formData.enquiryUptoDate"
                size="mini"
                class="max-w"
                type="datetime"
                disabled
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="是否船司价格" prop="isShippingCompanyPrice">
              <el-switch v-model="formData.isShippingCompanyPrice" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="销售部门" prop="saleDepartmentId">
              <DepartmentSelect v-model="formData.saleDepartmentId" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="目的国家" prop="targetAreaId">
              <AreaSelect v-model="formData.targetAreaId" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出货港口" required prop="shipmentPortId">
              <PortSelect v-model="formData.shipmentPortId" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="到货港口" required prop="targetPortId">
              <PortSelect v-model="formData.targetPortId" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="推荐船司" prop="recommendShippingCompanyId">
              <ShippingCompanySelect
                v-model="formData.recommendShippingCompanyId"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="柜型" prop="boxNames">
              <el-input v-model="formData.boxNames" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="柜量" prop="boxCounts">
              <el-input v-model="formData.boxCounts" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="其它提单要求" prop="otherCommitRequirements">
              <el-input v-model="formData.otherCommitRequirements" disabled size="mini" />
            </el-form-item>
          </el-col>-->
          <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" disabled size="mini" />
            </el-form-item>
          </el-col>-->
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="其它要求" prop="otherRequest">
              <el-input v-model="formData.otherRequest" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="是否报价">
              <el-input v-model="quotedPriceState" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item label="其它提单要求" prop="otherCommitRequirements">
              <el-input v-model="formData.otherCommitRequirements" disabled type="textarea" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" disabled type="textarea" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs type="border-card">
        <el-tab-pane label="供应商报价明细">
          <el-row v-if="dateValid">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="clickAddMarinePriceConsultationItem"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteMarinePriceConsultationItem"
            />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${marinePriceConsultationItemsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="marinePriceConsultationItems"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeMarinePriceConsultationItem"
          >
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号" width="50"/>
            <!-- <el-table-column
              prop="recommendShippingCompanyId"
              sortable
              min-width="115"
              label="货代公司">
              <template slot-scope="scope">
                <ShippingCompanySelect
                  :index="scope.$index"
                  v-model="scope.row.recommendShippingCompanyId"
                  @changeData="changeRecommendCompany"/>
              </template>
            </el-table-column>-->
            <el-table-column prop="shippingCompanyId" sortable min-width="115" label="船运公司" required>
              <template slot-scope="scope">
                <ShippingCompanySelect
                  :index="scope.$index"
                  v-model="scope.row.shippingCompanyId"
                  :disabled="isDisabled === true"
                  :form="2"
                  @changeData="changeShipCompany"
                />
              </template>
            </el-table-column>
            <el-table-column prop="expirationDate" sortable min-width="245" label="截关日期" required>
              <template slot-scope="scope">
                <!-- <el-date-picker
                  v-model="scope.row.expirationDate"
                  :disabled="isDisabled === true"
                  type="date"
                  placeholder="选择日期"
                  size="mini"
                  value-format="yyyy-MM-dd"
                /> -->
                <el-input 
                  v-model="scope.row.expirationDate"
                  :disabled="isDisabled === true"
                  placeholder="请输入"
                  size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="currencyCode" sortable min-width="110" label="货币" required>
              <template slot-scope="scope">
                <CurrencySelect
                  :index="scope.$index"
                  v-model="scope.row.currencyCode"
                  :disabled="isDisabled === true"
                  @changeData="changeCurrency"
                />
              </template>
            </el-table-column>
            <el-table-column prop="freeBox" sortable min-width="140" label="目的港免用箱" required>
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.freeBox" :disabled="isDisabled === true" :min="0" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="airRoute" sortable min-width="110" label="航线" required>
              <template slot-scope="scope">
                <MarinePriceConsultationAirRouteEnumSelect v-model="scope.row.airRoute" :disabled="isDisabled === true"/>
              </template>
            </el-table-column>
            <el-table-column prop="pricePeriodValidity" sortable min-width="245" label="价格有效日期" required>
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.pricePeriodValidity"
                  :disabled="isDisabled === true"
                  type="date"
                  placeholder="选择日期"
                  size="mini"
                  value-format="yyyy-MM-dd"
                />
              </template>
            </el-table-column>
            <el-table-column prop="unitMeasurementCode" sortable min-width="110" label="单位" required>
              <template slot-scope="scope">
                <UnitMeasurementSelect
                  :index="scope.$index"
                  v-model="scope.row.unitMeasurementCode"
                  :disabled="isDisabled === true"
                  @changeData="changeUnitMeasure"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-for="box in boxList"
              :prop="box.model"
              :key="box.price ? box.key + '单价' : box.key + '数量'"
              :label="box.price ? box.key + '单价' : box.key + '数量'"
              sortable
              min-width="145"
              required
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row[box.model]"
                  :precision="box.price ? 2 : 0"
                  :step="box.price ? 0.1 : 1"
                  :disabled="!box.price || isDisabled === true"
                  size="mini"
                  @change="changePrice(scope.$index, box.price, box.model)"
                />
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="totalAmount"
              sortable
              min-width="100"
              label="总金额"/>
            <el-table-column
              prop="lowestPrice"
              sortable
              min-width="145"
              label="综合低价">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.lowestPrice"
                  :precision="2"
                  :step="0.1"
                  :min="0"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column type="index" label="综合排名" width="80" />-->
            <el-table-column prop="lastScheduledDate" sortable min-width="245" label="最晚订舱日" required>
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.lastScheduledDate"
                  :disabled="isDisabled === true"
                  type="date"
                  placeholder="选择日期"
                  size="mini"
                  value-format="yyyy-MM-dd"
                />
              </template>
            </el-table-column>
            <el-table-column prop="transportTime" sortable min-width="145" label="预计航程(天)" required>
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.transportTime" :disabled="isDisabled === true" :min="0" size="mini"/>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="designate"
              sortable
              min-width="115"
              label="确定船司">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.designate"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column>-->
            <el-table-column prop="remark" sortable min-width="350" label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" :disabled="isDisabled === true" maxlength="1024" size="mini"/>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <component
      v-if="showMarinePriceConsultationItemDeletePopup"
      :is="'MarinePriceConsultationItemDeletePopup'"
      :list="marinePriceConsultationItemsSelection"
      @close="showMarinePriceConsultationItemDeletePopup = false"
      @update="deletedMarinePriceConsultationItem"
    />
  </div>
</template>

<script>
import marineQuotedPriceServer from './../../../api/marineQuotedPriceServer'
import validate from './../../../utils/validate'
import DepartmentSelect from './../department/DepartmentSelect'
import AreaSelect from './../area/AreaSelect'
import PortSelect from './../port/PortSelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import ContainerSelect from './../container/ContainerSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import MarinePriceConsultationSelect from './../marine-price-consultation/MarinePriceConsultationSelect'
import CurrencySelect from './../currency/CurrencySelect'
import UnitMeasurementSelect from './../unit-measurement/UnitMeasurementSelect'
import MarinePriceConsultationStatusEnumSelect from './../../../components/entity/marine-price-consultation/MarinePriceConsultationStatusEnumSelect'
import MarinePriceConsultationAirRouteEnumSelect from './../../../components/entity/marine-price-consultation/MarinePriceConsultationAirRouteEnumSelect'

const emptyFormData = {
  code: null,
  status: null,
  warnNo: null,
  freeBox: null,
  freeStorageTime: null,
  boxNames: null,
  boxCounts: null,
  loadDate: null,
  pi: null,
  airRoute: null,
  paymentDate: null,
  enquiryUptoDate: null,
  isShippingCompanyPrice: null,
  otherCommitRequirements: null,
  containerNumber: null,
  remark: null,
  otherRequest: null,
  saleDepartmentId: null,
  targetAreaId: null,
  shipmentPortId: null,
  targetPortId: null,
  recommendShippingCompanyId: null
}
const marinePriceConsultationItemEmptyData = {
  enquirylistLineId: null, // 行id
  expirationDate: null, // 截关日期
  pricePeriodValidity: null, // 价格有效日期
  totalAmount: null, // 总金额
  lowestPrice: null, // 综合低价
  lastScheduledDate: null, // 最晚订舱日期
  transportTime: null, // 预计航程
  designate: false, // 确定船司
  remark: null, // 备注
  recommendShippingCompanyId: null, // 货代公司
  recommendShippingCompanyCode: null,
  recommendShippingCompanyName: null,
  recommendShippingCompanyShortName: null,
  shippingCompanyId: null, // 船运公司
  shippingCompanyCode: null,
  shippingCompanyName: null,
  shippingCompanyShortName: null,
  currencyCode: null,
  currencyName: null,
  freeBox: null,
  airRoute: null,
  unitMeasurementCode: null,
  unitMeasurementName: null,
  boxPrice1: null,
  boxPrice2: null,
  boxPrice3: null,
  boxPrice4: null,
  boxPrice5: null,
  boxPrice6: null,
  boxPrice7: null,
  boxPrice8: null,
  boxPrice9: null,
  boxPrice10: null,
  boxQty1: null,
  boxQty2: null,
  boxQty3: null,
  boxQty4: null,
  boxQty5: null,
  boxQty6: null,
  boxQty7: null,
  boxQty8: null,
  boxQty9: null,
  boxQty10: null
}

const marinePriceConsultationItemRules = {
  expirationDate: [{ message: '截关日期 不能为空', validate: validate.isNotEmpty }],
  pricePeriodValidity: [{ message: '价格有效日期 不能为空', validate: validate.isNotEmpty }],
  // totalAmount: [
  //   { message: '总金额 不能为空', validate: validate.isNotEmpty },
  //   { message: '总金额 必须为数字', validate: validate.isNumberOrEmpty },
  // ],
  lowestPrice: [
    { message: '综合低价 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  lastScheduledDate: [{ message: '最晚订舱日期 不能为空', validate: validate.isNotEmpty }],
  transportTime: [
    { message: '预计航程(天) 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  freeBox: [
    { message: '目的港免用箱 不能为空', validate: validate.isNotEmpty }
  ],
  designate: [],
  remark: [],
  // recommendShippingCompanyId: [
  //   { message: '货代公司 不能为空', validate: validate.isNotEmpty }
  // ],
  shippingCompanyId: [
    { message: '船运公司 不能为空', validate: validate.isNotEmpty }
  ],
  airRoute: [
    { message: '航线 不能为空', validate: validate.isNotEmpty }
  ],
  currencyCode: [{ message: '货币 不能为空', validate: validate.isNotEmpty }],
  unitMeasurementCode: [
    { message: '单位 不能为空', validate: validate.isNotEmpty }
  ]
}

let initFormData = {
  ...emptyFormData
}
let initMarinePriceConsultationItems = []

const boxList = [
  {
    key: '20GP',
    model: 'boxQty1'
  },
  {
    key: '20GP',
    price: true,
    model: 'boxPrice1'
  },
  {
    key: '40GP',
    model: 'boxQty2'
  },
  {
    key: '40GP',
    price: true,
    model: 'boxPrice2'
  },
  {
    key: '40HQ',
    model: 'boxQty3'
  },
  {
    key: '40HQ',
    price: true,
    model: 'boxPrice3'
  },
  {
    key: '45HQ',
    model: 'boxQty4'
  },
  {
    key: '45HQ',
    price: true,
    model: 'boxPrice4'
  },
  {
    key: '40RH',
    model: 'boxQty5'
  },
  {
    key: '40RH',
    price: true,
    model: 'boxPrice5'
  },
  {
    key: '拼箱',
    model: 'boxQty6'
  },
  {
    key: '拼箱',
    price: true,
    model: 'boxPrice6'
  },
  {
    key: '空运',
    model: 'boxQty7'
  },
  {
    key: '空运',
    price: true,
    model: 'boxPrice7'
  },
  {
    key: '一卡一车',
    model: 'boxQty8'
  },
  {
    key: '一卡一车',
    price: true,
    model: 'boxPrice8'
  },
  {
    key: '二卡一车',
    model: 'boxQty9'
  },
  {
    key: '二卡一车',
    price: true,
    model: 'boxPrice9'
  },
  {
    key: '三卡一车',
    model: 'boxQty10'
  },
  {
    key: '三卡一车',
    price: true,
    model: 'boxPrice10'
  }
]

export default {
  name: 'MarinePriceConsultationSublistEdit',
  components: {
    DepartmentSelect,
    AreaSelect,
    PortSelect,
    ShippingCompanySelect,
    ContainerSelect,
    OperateUnitSelect,
    MarinePriceConsultationSelect,
    CurrencySelect,
    UnitMeasurementSelect,
    MarinePriceConsultationStatusEnumSelect,
    MarinePriceConsultationAirRouteEnumSelect,
    MarinePriceConsultationItemDeletePopup: () =>
      import('./../../../views/entity-page/marine-price-consultation-item/marinePriceConsultationItemDeletePopup.vue')
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
      isDisabled: false,
      dateValid: false,
      showSaveBtn: true,
      showPushBtn: true,
      boxList: [],
      marinePriceConsultationItems: [],
      marinePriceConsultationItemsSelection: [],
      showMarinePriceConsultationItemDeletePopup: false,
      rules: {
        status: [],
        warnNo: [],
        freeStorageTime: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        loadDate: [],
        boxNames: [{ required: true, message: '不能为空', trigger: 'blur' }],
        boxCounts: [{ required: true, message: '不能为空', trigger: 'blur' }],
        airRoute: [],
        paymentDate: [],
        enquiryUptoDate: [],
        isShippingCompanyPrice: [],
        otherCommitRequirements: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        containerNumber: [
          { required: true, message: '不能为空', trigger: 'blur' },
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
        otherRequest: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        saleDepartmentId: [],
        targetAreaId: [],
        shipmentPortId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        targetPortId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        recommendShippingCompanyId: []
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    },
    quotedPriceState() {
      // 提交后就是“已报价”
      // 未提交就是“未报价”
      // 过了询价截至日期就是“已过期、”
      const isExpired = new Date().getTime() > new Date(this.formData.enquiryUptoDate).getTime()
      if (this.showPushBtn) {
        return isExpired ? '已过期' : '未报价'
      } else {
        return '已报价'
      }
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
      try {
        const res = await marineQuotedPriceServer.get(this.id)
        if (!res.data.enquiryUptoDate) {
          this.dateValid = true
        } else {
          const today = new Date().getTime()
          const endDate = new Date(res.data.enquiryUptoDate).getTime() + 60000
          const judgeDate = new Date(res.data.enquiryUptoDate).getTime()
          if (judgeDate < today) {
            this.isDisabled = true
          } else {
            this.isDisabled = false
          }
          if (today <= endDate) {
            this.dateValid = true
          } else {
            this.showSaveBtn = false
            this.showPushBtn = false
            this.dateValid = false
          }
        }
        const boxNames = res.data.boxNames.split(',')
        const boxListNew = boxList.filter(
          item => boxNames.indexOf(item.key) !== -1
        )
        const boxNamesNum = res.data.boxNamesObject
        boxListNew.forEach(item => {
          if (!item.price) {
            Object.keys(boxNamesNum).forEach(key => {
              if (key === item.key) {
                marinePriceConsultationItemEmptyData[item.model] =
                  boxNamesNum[key]
              }
            })
          }
        })
        this.boxList = boxListNew
        initFormData = res.data
        this.formData = {
          ...res.data
        }
        if (res.data.isSave === 1) {
          this.showSaveBtn = false
        } else if (res.data.isSave === 2) {
          this.showSaveBtn = true
        }
        if (
          res.data.sdpSaleEnquiryLineList.length > 0 &&
          res.data.sdpSaleEnquiryLineList[0].isCommit === 2
        ) {
          this.showPushBtn = true
        } else {
          this.showPushBtn = false
        }
        initMarinePriceConsultationItems = res.data.sdpSaleEnquiryLineList
        this.marinePriceConsultationItems = [
          ...initMarinePriceConsultationItems
        ]
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    changePrice(index, price, key) {
      if (price) {
        let priceAll = 0
        for (let i = 1; i < 11; i++) {
          priceAll +=
            this.marinePriceConsultationItems[index]['boxPrice' + i] *
            this.marinePriceConsultationItems[index]['boxQty' + i]
        }
        this.marinePriceConsultationItems[index].totalAmount = priceAll.toFixed(
          2
        )
      }
    },
    push() {
      this.marinePriceConsultationItems.forEach(item => {
        item.isCommit = 1
      })
      this.save()
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const marinePriceConsultationItems = this
              .marinePriceConsultationItems
            for (let i = 0; i < marinePriceConsultationItems.length; i++) {
              const error = validate.dataObjectValidate(
                marinePriceConsultationItems[i],
                marinePriceConsultationItemRules
              )
              if (error) {
                this.$message({
                  message:
                    `海运价格咨询明细 第 ${i + 1} 行 ` +
                    error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            const today = new Date().getTime()
            const endDate =
              new Date(this.formData.enquiryUptoDate).getTime() + 60000
            if (today > endDate) {
              this.$message({
                message: '报价已结束',
                type: 'warning',
                duration: 1000
              })
              reject('error submit!!')
              return
            }
            try {
              if (this.formData.id) {
                const postData = {
                  header: this.formData,
                  line: marinePriceConsultationItems
                }
                // 只修改，不新增
                await marineQuotedPriceServer.put(postData)
                this.getData()
              }
              // this.$emit('emitEvent', {
              //   key: 'update',
              //   params: {
              //     id: this.formData.id
              //   }
              // })
              initFormData = {
                ...this.formData
              }
            } catch (e) {
              this.$message({
                message: '保存失败 ' + e.message,
                type: 'error',
                duration: 5000
              })
              reject('error submit!!')
              return
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
    changeRecommendCompany(res) {
      this.marinePriceConsultationItems[
        res.$index
      ].recommendShippingCompanyCode = res.code
      this.marinePriceConsultationItems[
        res.$index
      ].recommendShippingCompanyName = res.name
      this.marinePriceConsultationItems[
        res.$index
      ].recommendShippingCompanyShortName = res.shortName
    },
    changeShipCompany(res) {
      this.marinePriceConsultationItems[res.$index].shippingCompanyCode =
        res.code
      this.marinePriceConsultationItems[res.$index].shippingCompanyName =
        res.name
      this.marinePriceConsultationItems[res.$index].shippingCompanyShortName =
        res.shortName
    },
    changeCurrency(res) {
      this.marinePriceConsultationItems[res.$index].currencyName = res.name
    },
    changeUnitMeasure(res) {
      this.marinePriceConsultationItems[res.$index].unitMeasurementName =
        res.name
    },
    del() {
      this.$confirm('确定要删除当前表单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        marineQuotedPriceServer.delete(this.formData.id).then(() => {
          this.$message({
            message: `删除 ${this.formData.id} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'ShippingInquiryEditSublist')
        })
      })
    },
    // emitEvent({ key }) {
    //   switch (key) {
    //     case 'saveFormData':
    //       this.save()
    //       break
    //     case 'resetData':
    //       this.resetData()
    //       break
    //     case 'update':
    //       this.getData()
    //       break
    //     default:
    //       break
    //   }
    // },
    resetData() {
      this.formData = {
        ...initFormData
      }
      this.marinePriceConsultationItems = [...initMarinePriceConsultationItems]
    },
    clickAddMarinePriceConsultationItem() {
      marinePriceConsultationItemEmptyData.recommendShippingCompanyId = this.marinePriceConsultationItems[0].recommendShippingCompanyId
      marinePriceConsultationItemEmptyData.recommendShippingCompanyCode = this.marinePriceConsultationItems[0].recommendShippingCompanyCode
      marinePriceConsultationItemEmptyData.recommendShippingCompanyName = this.marinePriceConsultationItems[0].recommendShippingCompanyName
      this.marinePriceConsultationItems.push({
        ...marinePriceConsultationItemEmptyData
      })
    },
    selectionChangeMarinePriceConsultationItem(val) {
      this.marinePriceConsultationItemsSelection = val
    },
    clickDeleteMarinePriceConsultationItem() {
      if (this.marinePriceConsultationItemsSelection.length > 0) {
        this.showMarinePriceConsultationItemDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedMarinePriceConsultationItem() {
      this.marinePriceConsultationItemsSelection.forEach(item => {
        for (let i = 0; i < this.marinePriceConsultationItems.length; i++) {
          if (this.marinePriceConsultationItems[i] === item) {
            this.marinePriceConsultationItems.splice(i, 1)
            break
          }
        }
      })
      this.marinePriceConsultationItemsSelection = []
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
/deep/.el-form-item__label {
  width: 130px !important;
}
/deep/.el-form-item__content {
  margin-left: 130px !important;
}
/deep/.el-form-item__error {
  padding-top: 0;
}
</style>
