<template>
  <div class="container m-t-not">
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
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="状态" prop="status">
              <MarinePriceConsultationStatusEnumSelect v-model="formData.status" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出货预告号" prop="warnNo">
              <el-input v-model="formData.warnNo" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="目的港免用箱" required prop="freeBox">
              <el-input-number
                v-model="formData.freeBox"
                :min="0"
                :disabled="noUpdate"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="免堆期(天)" prop="freeStorageTime">
              <el-input-number
                v-model="formData.freeStorageTime"
                :min="0"
                :disabled="noUpdate"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="预计装柜日期" prop="loadDate">
              <el-date-picker
                v-model="formData.loadDate"
                :disabled="noUpdate"
                size="mini"
                class="max-w"
                type="date"
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
                :disabled="noUpdate"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="预计货款到达日" prop="paymentDate">
              <el-date-picker
                v-model="formData.paymentDate"
                :disabled="noUpdate"
                size="mini"
                class="max-w"
                type="date"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item :required="!showUpToDate" label="询价截至日期" prop="enquiryUptoDate">
              <el-date-picker
                v-model="formData.enquiryUptoDate"
                :disabled="showUpToDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="是否船司价格" prop="isShippingCompanyPrice">
              <el-switch
                v-model="formData.isShippingCompanyPrice"
                :disabled="closeNewItem"
                size="mini"
                @change="changeShippingPrice"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="销售部门" prop="saleDepartmentId">
              <DepartmentSelect v-model="formData.saleDepartmentId"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="目的国家" prop="targetAreaId">
              <AreaSelect v-model="formData.targetAreaId" :disabled="noUpdate"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出货港口" required prop="shipmentPortId">
              <PortSelect v-model="formData.shipmentPortId" :disabled="noUpdate"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="到货港口" required prop="targetPortId">
              <PortSelect v-model="formData.targetPortId" :disabled="noUpdate"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="推荐船司" prop="recommendShippingCompanyId">
              <ShippingCompanySelect v-model="formData.recommendShippingCompanyId" @changeData="changeCompany"/>
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
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item label="其它提单要求" prop="otherCommitRequirements">
              <el-input v-model="formData.otherCommitRequirements" :disabled="eye.otherCommitRequirements" type="textarea" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" type="textarea" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item label="其它要求" prop="otherRequest">
              <el-input 
                v-model="formData.otherRequest" 
                type="textarea"
                disabled
                size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item label="必填原因" prop="mustCause">
              <el-input 
                v-model="formData.mustCause" 
                :disabled="isNotMin === false"
                type="textarea"
                size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs type="border-card">
        <el-tab-pane label="海运价格咨询明细">
          <el-row v-if="!closeNewItem">
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
            <el-table-column
              prop="recommendShippingCompanyId"
              sortable
              min-width="115"
              label="货代公司"
            >
              <template slot-scope="scope">
                <ShippingCompanySelect
                  :index="scope.$index"
                  v-model="scope.row.recommendShippingCompanyId"
                  :form="1"
                  @changeData="changeRecommendCompany"
                />
              </template>
            </el-table-column>
            <el-table-column prop="shippingCompanyId" sortable min-width="115" label="船运公司">
              <template slot-scope="scope">
                <ShippingCompanySelect
                  :index="scope.$index"
                  v-model="scope.row.shippingCompanyId"
                  :form="2"
                  :is-ship-company="true"
                  @changeData="changeShipCompany"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-if="!hideDetail"
              prop="expirationDate"
              sortable
              min-width="220"
              label="截关日期"
            >
              <template slot-scope="scope">
                <!-- <el-date-picker
                  v-model="scope.row.expirationDate"
                  type="date"
                  placeholder="选择日期"
                  size="mini"
                  disabled
                  value-format="yyyy-MM-dd"
                /> -->
                <el-input v-model="scope.row.expirationDate" placeholder="请输入" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!hideDetail"
              prop="currencyCode"
              sortable
              min-width="110"
              label="货币"
            >
              <template slot-scope="scope">
                <CurrencySelect
                  :index="scope.$index"
                  v-model="scope.row.currencyCode"
                  :disabled="true"
                  @changeData="changeCurrency"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-if="!hideDetail"
              prop="freeBox"
              sortable
              min-width="140"
              label="目的港免用箱"
            >
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.freeBox" :min="0" disabled size="mini"/>
              </template>
            </el-table-column>
            <el-table-column v-if="!hideDetail" prop="airRoute" sortable min-width="110" label="航线">
              <template slot-scope="scope">
                <MarinePriceConsultationAirRouteEnumSelect v-model="scope.row.airRoute" :disabled="true"/>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!hideDetail"
              prop="pricePeriodValidity"
              sortable
              min-width="245"
              label="价格有效日期"
            >
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.pricePeriodValidity"
                  type="date"
                  placeholder="选择日期"
                  size="mini"
                  disabled
                  value-format="yyyy-MM-dd"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-if="!hideDetail"
              prop="unitMeasurementCode"
              sortable
              min-width="110"
              label="单位"
            >
              <template slot-scope="scope">
                <UnitMeasurementSelect
                  :index="scope.$index"
                  v-model="scope.row.unitMeasurementCode"
                  :disabled="true"
                  @changeData="changeUnitMeasure"
                />
              </template>
            </el-table-column>
            <template v-if="!hideDetail">
              <el-table-column
                v-for="box in boxList"
                :prop="box.model"
                :key="box.price ? box.key + '单价' : box.key + '数量'"
                :label="box.price ? box.key + '单价' : box.key + '数量'"
                sortable
                min-width="145"
              >
                <template slot-scope="scope">
                  <el-input-number
                    v-model="scope.row[box.model]"
                    :precision="box.price ? 2 : 0"
                    :step="box.price ? 0.1 : 1"
                    :min="0"
                    size="mini"
                    disabled
                    @change="changePrice(scope.$index, box.price, box.model)"
                  />
                </template>
              </el-table-column>
            </template>
            <el-table-column
              v-if="!hideDetail"
              prop="totalAmount"
              sortable
              min-width="100"
              label="总金额"
            />
            <!-- <el-table-column
              prop="lowestPrice"
              sortable
              min-width="145"
              label="综合低价"/>
            <el-table-column type="index" label="综合排名" width="80" />-->
            <el-table-column
              v-if="!hideDetail"
              prop="lastScheduledDate"
              sortable
              min-width="245"
              label="最晚订舱日"
            >
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.lastScheduledDate"
                  type="date"
                  placeholder="选择日期"
                  size="mini"
                  disabled
                  value-format="yyyy-MM-dd"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-if="!hideDetail"
              prop="transportTime"
              sortable
              min-width="145"
              label="预计航程(天)"
            >
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.transportTime" :min="0" disabled size="mini"/>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!hideDetail"
              prop="designate"
              sortable
              min-width="115"
              label="确定船司"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.designate"
                  :disabled="showDesignate"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                  @change="changeDesignate(scope.$index)"
                />
              </template>
            </el-table-column>
            <el-table-column 
              v-if="!hideDetail" 
              prop="remark" 
              sortable 
              min-width="350" 
              label="备注">
              <template slot-scope="scope">
                <el-input 
                  v-model="scope.row.remark" 
                  maxlength="1024" 
                  size="mini"
                  @change="changeNote(scope.$index)"/>
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
      :show-field="'seq'"
      @close="showMarinePriceConsultationItemDeletePopup = false"
      @update="deletedMarinePriceConsultationItem"
    />
  </div>
</template>

<script>
import marinePriceConsultationServer from './../../../api/marinePriceConsultationServer'
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
  mustCause: null,
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
  freeBox: null,
  airRoute: null,
  currencyName: null,
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
  expirationDate: [],
  pricePeriodValidity: [],
  totalAmount: [],
  lowestPrice: [],
  lastScheduledDate: [],
  transportTime: [],
  designate: [],
  remark: [],
  recommendShippingCompanyId: [
    { message: '货代公司 不能为空', validate: validate.isNotEmpty }
  ],
  shippingCompanyId: [
    { message: '船运公司 不能为空', validate: validate.isNotEmpty }
  ],
  currencyCode: [],
  unitMeasurementCode: []
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
      hideDetail: false,
      noUpdate: false,
      getItems: true,
      showNotice: false,
      formData: {
        ...initFormData
      },
      isJudgeMin: false,
      isNotMin: false,
      showUpToDate: true,
      changeDuplicateRule: false,
      closeNewItem: false,
      changeShipping: false,
      showDesignate: true,
      processInfo: {},
      boxList: [],
      marinePriceConsultationItems: [],
      marinePriceConsultationItemsSelection: [],
      showMarinePriceConsultationItemDeletePopup: false,
      eye: {
        otherCommitRequirements: true
      },
      rules: {
        status: [],
        warnNo: [],
        freeStorageTime: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        loadDate: [{ required: true, message: '不能为空', trigger: 'blur' }],
        boxNames: [{ required: true, message: '不能为空', trigger: 'blur' }],
        boxCounts: [{ required: true, message: '不能为空', trigger: 'blur' }],
        airRoute: [{ required: true, message: '不能为空', trigger: 'blur' }],
        paymentDate: [{ required: true, message: '不能为空', trigger: 'blur' }],
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
        mustCause: [],
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
        targetAreaId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
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
    changeNote(index) {
      if (this.marinePriceConsultationItems[index].designate === true) {
        this.formData.otherRequest = this.marinePriceConsultationItems[index].remark
      }
    },
    changeDesignate(index) {
      if (this.marinePriceConsultationItems[index].remark) {
        this.formData.otherRequest = this.marinePriceConsultationItems[index].remark
      } else {
        this.formData.otherRequest = null
      }
      if (this.marinePriceConsultationItems[index].designate) {
        this.marinePriceConsultationItems.forEach((item, i) => {
          if (i !== index) {
            item.designate = false
          }
          this.$set(this.marinePriceConsultationItems, i, item)
        })
      }
      if (this.isJudgeMin === true) {
        let minNum = 9999999999999999999999
        for (let i = 0; i < this.marinePriceConsultationItems.length; i++) {
          if (this.marinePriceConsultationItems[i].totalAmount < minNum && this.marinePriceConsultationItems[i].totalAmount !== 0) {
            minNum = this.marinePriceConsultationItems[i].totalAmount 
          }  
        }
        if (this.marinePriceConsultationItems[index].totalAmount > minNum && this.marinePriceConsultationItems[index].totalAmount !== 0) {
          this.isNotMin = true
          this.rules.mustCause = {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        } else {
          this.isNotMin = false
          this.rules.mustCause = []
        }
      }
    },
    // 询价回写oms
    async auditReturn() {
      this.loading = true
      try {
        await marinePriceConsultationServer.auditReturn(this.id)
        this.$message({
          message: '询价回写oms成功！',
          type: 'warning'
        })
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    // 制单页面删除按钮
    async delete() {
      this.loading = true
      try {
        await marinePriceConsultationServer.delete(this.id)
        this.$router.push({
          path: '/CW-manage/marine-price-consultation/edit/new'
        })
        window.eventBus.$emit('closePage', 'MarinePriceConsultationEditSublistPage')
        this.$message({
          message: '订单删除成功！',
          type: 'warning'
        })
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    async getData() {
      this.loading = true
      try {
        const res = await marinePriceConsultationServer.get(this.id)
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
        if (this.formData.status === 1) {
          this.$emit('isAuditChane1', true)
        }
        if (this.formData.status === 5) {
          this.$emit('isAuditChane', true)
        }
        if (res.data.isShippingCompanyPrice) {
          // 船司价格
          // 取消货代公司验证
          marinePriceConsultationItemRules.recommendShippingCompanyId = []
        } else {
          // 非船司价格
          // 取消船公司验证
          marinePriceConsultationItemRules.shippingCompanyId = []
        }
        if (res.data.sdpSaleEnquiryLineList.length > 0) {
          initMarinePriceConsultationItems = res.data.sdpSaleEnquiryLineList
          if (this.isfiltration === true) {
            const marinePriceConsultationItemsNew = JSON.parse(JSON.stringify(initMarinePriceConsultationItems))
            // const marinePriceConsultationItemsNew = initMarinePriceConsultationItems.filter(
            //   item => item.totalAmount
            // )
            this.marinePriceConsultationItems = [
              ...marinePriceConsultationItemsNew
            ]  
            if (this.isJudgeMin === true) {
              let minNum = 9999999999999999999999
              let knowNum = null
              for (let i = 0; i < this.marinePriceConsultationItems.length; i++) {
                if (this.marinePriceConsultationItems[i].designate === true) {
                  knowNum = this.marinePriceConsultationItems[i].totalAmount
                }
              }
              for (let i = 0; i < this.marinePriceConsultationItems.length; i++) {
                if (this.marinePriceConsultationItems[i].totalAmount < minNum && this.marinePriceConsultationItems[i].totalAmount !== 0) {
                  minNum = this.marinePriceConsultationItems[i].totalAmount 
                }  
              }
              if (knowNum > minNum && knowNum !== 0) {
                this.isNotMin = true
                this.rules.mustCause = {
                  required: true,
                  trigger: 'blur'
                }
              } else {
                this.isNotMin = false
                this.rules.mustCause = []
              }  
            }
          } else {
            this.marinePriceConsultationItems = [
              ...initMarinePriceConsultationItems
            ]  
          } 
        } else if (!this.getItems && res.data.isNoCommit !== 1) { 
          // 是否可以设置默认供应商
          this.changeShipping = true
          // 设置默认供应商
          
          this.setDefaultItems(res.data)
        } 
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    changeShippingPrice() {
      if (this.changeShipping) {
        if (this.formData.isShippingCompanyPrice) {
          // 船司价格
          // 取消货代公司验证
          marinePriceConsultationItemRules.recommendShippingCompanyId = []
          marinePriceConsultationItemRules.shippingCompanyId = [
            {
              required: true,
              message: '不能为空',
              trigger: 'change',
              validate: validate.isNotEmpty
            }
          ]
        } else {
          // 非船司价格
          // 取消船公司验证
          marinePriceConsultationItemRules.shippingCompanyId = []
          marinePriceConsultationItemRules.recommendShippingCompanyId = [
            {
              required: true,
              message: '不能为空',
              trigger: 'change',
              validate: validate.isNotEmpty
            }
          ]
        }
        this.setDefaultItems(this.formData)
      }
    },
    setDefaultItems(data) {
      const marinePriceConsultationItems = []      
      this.tarnsformInitData()
      if (data.isShippingCompanyPrice) {
        // 船司价格
        data.shippingList.forEach(item => {
          const newItem = { ...marinePriceConsultationItemEmptyData }
          newItem.shippingCompanyId = item.supplierId
          newItem.shippingCompanyCode = item.supplierCode
          newItem.shippingCompanyName = item.supplierName
          marinePriceConsultationItems.push(newItem)
        })
      } else {
        // 非船司价格
        data.transitList.forEach(item => {
          const newItem = { ...marinePriceConsultationItemEmptyData }
          newItem.recommendShippingCompanyId = item.supplierId
          newItem.recommendShippingCompanyCode = item.supplierCode
          newItem.recommendShippingCompanyName = item.supplierName
          marinePriceConsultationItems.push(newItem)
        })
      }

      initMarinePriceConsultationItems = marinePriceConsultationItems
      this.marinePriceConsultationItems = [...initMarinePriceConsultationItems]
      this.marinePriceConsultationItems.forEach((item, index) => {
        this.$set(this.marinePriceConsultationItems, index, item)
      })
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
    async save() {    
      return new Promise((resolve, reject) => {  
        if (this.isJudgeMin === true) {
          let minNum = 9999999999999999999999
          let knowNum = null
          for (let i = 0; i < this.marinePriceConsultationItems.length; i++) {
            if (this.marinePriceConsultationItems[i].designate === true) {
              knowNum = this.marinePriceConsultationItems[i].totalAmount
            }
          }
          for (let i = 0; i < this.marinePriceConsultationItems.length; i++) {
            if (this.marinePriceConsultationItems[i].totalAmount < minNum && this.marinePriceConsultationItems[i].totalAmount !== 0) {
              minNum = this.marinePriceConsultationItems[i].totalAmount 
            }  
          }
          if (knowNum > minNum && !this.formData.mustCause && knowNum !== 0) {
            this.isNotMin = true
            this.rules.mustCause = {
              required: true,
              trigger: 'blur'
            }
            this.$message({
              message: '海运价格咨询明细中选中的总金额不是最小金额，请输入必填原因！',
              type: 'warning'
            })
            reject()
          } else {
            this.isNotMin = false
            this.rules.mustCause = []
            this.$refs['formData'].validate(async valid => {
              if (valid) {     
                let checkDuplicateCompany = null
                if (this.changeDuplicateRule) {
                  // 船公司和货代公司联合不能重复
                  checkDuplicateCompany = this.checkDuplicateCompanyNew()
                } else {
                  checkDuplicateCompany = this.checkDuplicateCompany()
                }
                if (checkDuplicateCompany === 1) {
                  this.$message({
                    message: '船公司不能重复',
                    type: 'warning'
                  })
                  reject()
                } else if (checkDuplicateCompany === 2) {
                  this.$message({
                    message: '货代公司不能重复',
                    type: 'warning'
                  })
                  reject()
                } else if (checkDuplicateCompany === 3) {
                  this.$message({
                    message: '船公司和货代公司不能同时重复',
                    type: 'warning'
                  })
                  reject()
                }
                const marinePriceConsultationItems = this.marinePriceConsultationItems
                if (this.showNotice) {
                  if (marinePriceConsultationItems.length === 0) {
                    this.$message({
                      message: '明细不能为空',
                      type: 'warning',
                      duration: 1000
                    })
                    reject('error submit!!')
                    return
                  }
                }
                for (let i = 0; i < marinePriceConsultationItems.length; i++) {
                  if (this.marinePriceConsultationItems[i].designate === false) {
                    if (this.marinePriceConsultationItems[i].recommendShippingCompanyId) {
                      marinePriceConsultationItemRules.shippingCompanyId = []
                    } else if (this.marinePriceConsultationItems[i].shippingCompanyId) {
                      marinePriceConsultationItemRules.recommendShippingCompanyId = []
                    }
                  } else {
                    marinePriceConsultationItemRules.recommendShippingCompanyId = [
                      {
                        message: '货代公司 不能为空',
                        validate: validate.isNotEmpty
                      }
                    ]
                    marinePriceConsultationItemRules.shippingCompanyId = [
                      {
                        message: '船运公司 不能为空',
                        validate: validate.isNotEmpty
                      }
                    ]
                  }
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
                if (!this.showDesignate) {
                  let hasDesignate = false
                  marinePriceConsultationItems.forEach((item, index) => {
                    if (item.designate) {
                      hasDesignate = true
                    }
                  })
                  if (!hasDesignate) {
                    this.$message({
                      message: '请先确定船司',
                      type: 'warning'
                    })
                    reject()
                    return
                  }
                }
                try {
                  if (this.formData.id) {
                    const postData = {
                      header: this.formData,
                      line: marinePriceConsultationItems
                    }
                    // 只修改，不新增
                    await marinePriceConsultationServer.put(postData)
                    this.getData()
                  }
                  this.$emit('emitEvent', {
                    key: 'update',
                    params: {
                      id: this.formData.id
                    }
                  })
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
          }
        } else {
          this.$refs['formData'].validate(async valid => {
            if (valid) {
              let checkDuplicateCompany = null
              if (this.changeDuplicateRule) {
                // 船公司和货代公司联合不能重复
                checkDuplicateCompany = this.checkDuplicateCompanyNew()
              } else {
                checkDuplicateCompany = this.checkDuplicateCompany()
              }
              if (checkDuplicateCompany === 1) {
                this.$message({
                  message: '船公司不能重复',
                  type: 'warning'
                })
                reject()
              } else if (checkDuplicateCompany === 2) {
                this.$message({
                  message: '货代公司不能重复',
                  type: 'warning'
                })
                reject()
              } else if (checkDuplicateCompany === 3) {
                this.$message({
                  message: '船公司和货代公司不能同时重复',
                  type: 'warning'
                })
                reject()
              }
              const marinePriceConsultationItems = this
                .marinePriceConsultationItems
              if (this.showNotice) {
                if (marinePriceConsultationItems.length === 0) {
                  this.$message({
                    message: '明细不能为空',
                    type: 'warning',
                    duration: 1000
                  })
                  reject('error submit!!')
                  return
                }
              }
              for (let i = 0; i < marinePriceConsultationItems.length; i++) {
                if (this.marinePriceConsultationItems[i].designate === false) {
                  if (this.marinePriceConsultationItems[i].recommendShippingCompanyId) {
                    marinePriceConsultationItemRules.shippingCompanyId = []
                  } else if (this.marinePriceConsultationItems[i].shippingCompanyId) {
                    marinePriceConsultationItemRules.recommendShippingCompanyId = []
                  }
                } else {
                  marinePriceConsultationItemRules.recommendShippingCompanyId = [
                    {
                      message: '货代公司 不能为空',
                      validate: validate.isNotEmpty
                    }
                  ]
                  marinePriceConsultationItemRules.shippingCompanyId = [
                    {
                      message: '船运公司 不能为空',
                      validate: validate.isNotEmpty
                    }
                  ]
                }
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
              if (!this.showDesignate) {
                let hasDesignate = false
                marinePriceConsultationItems.forEach((item, index) => {
                  if (item.designate) {
                    hasDesignate = true
                  }
                })
                if (!hasDesignate) {
                  this.$message({
                    message: '请先确定船司',
                    type: 'warning'
                  })
                  reject()
                  return
                }
              }
              try {
                if (this.formData.id) {
                  const postData = {
                    header: this.formData,
                    line: marinePriceConsultationItems
                  }
                  // 只修改，不新增
                  await marinePriceConsultationServer.put(postData)
                  this.getData()
                }
                this.$emit('emitEvent', {
                  key: 'update',
                  params: {
                    id: this.formData.id
                  }
                })
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
        }
      })
    },
    changeRecommendCompany(res) {  
      if (res && res.$index !== null && res.$index !== undefined) {
        this.marinePriceConsultationItems[
          res.$index
        ].recommendShippingCompanyCode = res.code
        this.marinePriceConsultationItems[
          res.$index
        ].recommendShippingCompanyName = res.name
        this.marinePriceConsultationItems[
          res.$index
        ].recommendShippingCompanyShortName = res.shortName
      }
    },
    changeCompany(res) { 
      if (res) {
        this.formData.recommendShippingCompanyId = res.code      
        this.formData.recommendShippingCompany.name = res.name
        this.formData.recommendShippingCompany.id = res.code
      } else {
        this.formData.recommendShippingCompanyId = null 
        this.formData.recommendShippingCompany.name = null
        this.formData.recommendShippingCompany.id = null
      }
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
        marinePriceConsultationServer.delete(this.formData.id).then(() => {
          this.$message({
            message: `删除 ${this.formData.id} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'ShippingInquiryEditSublist')
        })
      })
    },
    async emitEvent(event) {
      switch (event.key) {
        case 'delete':
          this.delete()
          break
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
          this.shareProcessInfo(event.params.info)
          break
        case 'startProcess':
          return this.newStartProcess()
        case 'agreeProcess':
          return this.newAgreeProcess()
        default:
          this[event.key] && this[event.key](event.params)
          break
      }
    },
    async newAgreeProcess() {
      return new Promise(async(resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            this.formData.sdpSaleEnquiryLineList = initMarinePriceConsultationItems
            if (JSON.stringify(initFormData) !== JSON.stringify(this.formData)) {
              // 如果当前表单数据与初始化数据不同，提示要先保存
              this.$confirm('是否确认提交？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
                .then(async() => {
                  // 同意保存，执行保存动作
                  try {
                    resolve(await this.saveBeforeStart())
                  } catch (e) {
                    reject(e)
                  }
                })
                .catch(() => {
                  // 不同意保存，断开流程
                  reject()
                })
            } else {
              // 如果当前表单数据与初始化数据相同
              resolve()
            }
          } else {
            this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            reject()
          }
        })
      })
    },
    shareProcessInfo(data) {
      this.processInfo = data
      if (data.nodeInfo && data.nodeInfo.length > 0 && data.nodeInfo[1]) {
        if (data.nodeInfo[1].status === 'agree') {
          this.noUpdate = true
          this.showNotice = true
        }
      }
      if (data.nodeInfo && data.nodeInfo.length > 0 && data.nodeInfo[3]) {
        // 判断询价截至日期逻辑
        if (
          data.nodeInfo[3].remark === '管理员' &&
          data.nodeInfo[3].status === 'awaiting_check'
        ) {
          this.hideDetail = true
        }
      }
      if (data.nodeInfo && data.nodeInfo.length > 0 && data.nodeInfo[2]) {
        if (data.nodeInfo[2].status === 'agree') {
          // 管理员节点之后判断重复的逻辑改成船公司和货代公司联合不能重复
          this.changeDuplicateRule = true
        }
        // 判断询价截至日期逻辑
        if (
          data.nodeInfo[2].remark === '船务操作' &&
          data.nodeInfo[2].status === 'awaiting_check'
        ) {
          this.showUpToDate = false
          this.getItems = false
          this.getData()
        }
        if (
          data.nodeInfo[2].remark === '船务操作' &&
          data.nodeInfo[2].status === 'agree'
        ) {
          this.closeNewItem = true
          this.showUpToDate = true
          this.getItems = false
          this.getData()
        }
        // 判断确定船司逻辑
        if (
          data.nodeInfo[5].remark === '业务确认' &&
          data.nodeInfo[5].status === 'awaiting_check'
        ) {
          this.showDesignate = false
        }
      }

      // 只有 1 和 5 节点，能填写 【其它提单要求】 字段
      if (data.nodeInfo[1].remark === '业务员' &&
          data.nodeInfo[1].status === 'awaiting_check' || 
          data.nodeInfo[5].remark === '业务确认' &&
          data.nodeInfo[5].status === 'awaiting_check') {        
        this.eye.otherCommitRequirements = false
      } else {
        this.eye.otherCommitRequirements = true
      }

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
    processStep1() { // 业务确认节点保存做总金额是否最小校验
      this.isJudgeMin = true
      this.isfiltration = true
    },
    processStep5() { // 业务确认节点保存做总金额是否最小校验
      this.isJudgeMin = true
      this.isfiltration = true      
    },
    processStep6() {
      this.isfiltration = false
      this.isJudgeMin = false
    },
    processStep7() {
      this.isfiltration = false
    },
    processStep8() {
      this.isfiltration = false
    },
    processStep9() {
      this.isfiltration = false
    },
    processStep10() {
      this.isfiltration = true
    },
    checkDuplicateCompany() {
      // 船公司
      const shippingCompany = []
      // 货代公司
      const recommendShippingCompany = []
      this.marinePriceConsultationItems.forEach(item => {
        if (item.shippingCompanyId) {
          shippingCompany.push(item.shippingCompanyId)
        }
        if (item.recommendShippingCompanyId) {
          recommendShippingCompany.push(item.recommendShippingCompanyId)
        }
      })
      if (shippingCompany.length !== [...new Set(shippingCompany)].length) {
        return 1
      }
      if (
        recommendShippingCompany.length !==
        [...new Set(recommendShippingCompany)].length
      ) {
        return 2
      }
      return null
    },
    checkDuplicateCompanyNew() {
      // 公司
      const company = []
      this.marinePriceConsultationItems.forEach(item => {
        company.push({
          shippingCompanyId: item.shippingCompanyId,
          recommendShippingCompanyId: item.recommendShippingCompanyId
        })
      })
      if (company.length !== [...new Set(company)].length) {
        return 3
      }
      return null
    },
    async newStartProcess() {
      return new Promise(async(resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            this.formData.sdpSaleEnquiryLineList = initMarinePriceConsultationItems
            if (JSON.stringify(initFormData) !== JSON.stringify(this.formData)) {
              // 如果当前表单数据与初始化数据不同，提示要先保存
              this.$confirm('是否确认提交？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
                .then(async() => {
                  // 同意保存，执行保存动作
                  try {
                    resolve(await this.saveBeforeStart())
                  } catch (e) {
                    reject(e)
                  }
                })
                .catch(() => {
                  // 不同意保存，断开流程
                  reject()
                })
            } else {
              // 如果当前表单数据与初始化数据相同
              resolve()
            }
          } else {
            this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            reject()
          }
        })
      })
    },
    async saveBeforeStart() {
      return new Promise(async(resolve, reject) => {
        if (this.isJudgeMin === true) {
          let minNum = 9999999999999999999999
          let knowNum = null
          for (let i = 0; i < this.marinePriceConsultationItems.length; i++) {
            if (this.marinePriceConsultationItems[i].designate === true) {
              knowNum = this.marinePriceConsultationItems[i].totalAmount
            }
          }
          for (let i = 0; i < this.marinePriceConsultationItems.length; i++) {
            if (this.marinePriceConsultationItems[i].totalAmount < minNum && this.marinePriceConsultationItems[i].totalAmount !== 0) {
              minNum = this.marinePriceConsultationItems[i].totalAmount 
            }  
          }
          if (knowNum > minNum && !this.formData.mustCause && knowNum !== 0) {
            this.isNotMin = true
            this.rules.mustCause = {
              required: true,
              trigger: 'blur'
            }
            this.$message({
              message: '海运价格咨询明细中选中的总金额不是最小金额，请输入必填原因！',
              type: 'warning'
            })
            reject()
          } else {
            this.isNotMin = false
            this.rules.mustCause = []
            this.$refs['formData'].validate(async valid => {
              if (valid) {
                let checkDuplicateCompany = null
                if (this.changeDuplicateRule) {
                  // 船公司和货代公司联合不能重复
                  checkDuplicateCompany = this.checkDuplicateCompanyNew()
                } else {
                  checkDuplicateCompany = this.checkDuplicateCompany()
                }
                if (checkDuplicateCompany === 1) {
                  this.$message({
                    message: '船公司不能重复',
                    type: 'warning'
                  })
                  reject()
                } else if (checkDuplicateCompany === 2) {
                  this.$message({
                    message: '货代公司不能重复',
                    type: 'warning'
                  })
                  reject()
                } else if (checkDuplicateCompany === 3) {
                  this.$message({
                    message: '船公司和货代公司不能同时重复',
                    type: 'warning'
                  })
                  reject()
                }
                const marinePriceConsultationItems = this
                  .marinePriceConsultationItems
                if (this.showNotice) {
                  if (marinePriceConsultationItems.length === 0) {
                    this.$message({
                      message: '明细不能为空',
                      type: 'warning',
                      duration: 1000
                    })
                    reject('error submit!!')
                    return
                  }
                }
                for (let i = 0; i < marinePriceConsultationItems.length; i++) {
                  if (this.showDesignate === false) {
                    // 海运费询价在业务确认节点时，不需要校验货代公司和船公司为空
                    marinePriceConsultationItemRules.recommendShippingCompanyId = []
                    marinePriceConsultationItemRules.shippingCompanyId = []
                  } else if (this.marinePriceConsultationItems[i].designate === false) {
                    if (this.marinePriceConsultationItems[i].recommendShippingCompanyId) {
                      marinePriceConsultationItemRules.shippingCompanyId = []
                    } else if (this.marinePriceConsultationItems[i].shippingCompanyId) {
                      marinePriceConsultationItemRules.recommendShippingCompanyId = []
                    }
                  } else {
                    marinePriceConsultationItemRules.recommendShippingCompanyId = [
                      {
                        message: '货代公司 不能为空',
                        validate: validate.isNotEmpty
                      }
                    ]
                    marinePriceConsultationItemRules.shippingCompanyId = [
                      {
                        message: '船运公司 不能为空',
                        validate: validate.isNotEmpty
                      }
                    ]
                  }
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
                if (!this.showDesignate) {
                  let hasDesignate = false
                  marinePriceConsultationItems.forEach((item, index) => {
                    if (item.designate) {
                      hasDesignate = true
                    }
                  })
                  if (!hasDesignate) {
                    this.$message({
                      message: '请先确认船司！',
                      type: 'warning'
                    })
                    reject()
                    return
                  }
                }
                try {
                  if (this.formData.id) {
                    const postData = {
                      header: this.formData,
                      line: marinePriceConsultationItems
                    }
                    // 只修改，不新增
                    const res = await marinePriceConsultationServer.put(postData)
                    if (Number.parseInt(res.data.code) === 200) {
                      initFormData = {
                        ...this.formData
                      }
                      initMarinePriceConsultationItems = marinePriceConsultationItems
                      this.$message({
                        message: '修改成功',
                        type: 'success'
                      })
                    } else {
                      this.$message({
                        message: '保存失败 ',
                        type: 'error'
                      })
                      reject('error submit!!')
                      return
                    }
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
          }
        } else {
          this.$refs['formData'].validate(async valid => {
            if (valid) {
              let checkDuplicateCompany = null
              if (this.changeDuplicateRule) {
                // 船公司和货代公司联合不能重复
                checkDuplicateCompany = this.checkDuplicateCompanyNew()
              } else {
                checkDuplicateCompany = this.checkDuplicateCompany()
              }
              if (checkDuplicateCompany === 1) {
                this.$message({
                  message: '船公司不能重复',
                  type: 'warning'
                })
                reject()
              } else if (checkDuplicateCompany === 2) {
                this.$message({
                  message: '货代公司不能重复',
                  type: 'warning'
                })
                reject()
              } else if (checkDuplicateCompany === 3) {
                this.$message({
                  message: '船公司和货代公司不能同时重复',
                  type: 'warning'
                })
                reject()
              }
              const marinePriceConsultationItems = this
                .marinePriceConsultationItems
              if (this.showNotice) {
                if (marinePriceConsultationItems.length === 0) {
                  this.$message({
                    message: '明细不能为空',
                    type: 'warning',
                    duration: 1000
                  })
                  reject('error submit!!')
                  return
                }
              }
              for (let i = 0; i < marinePriceConsultationItems.length; i++) {
                if (this.showDesignate === false) {
                  // 海运费询价在业务确认节点时，不需要校验货代公司和船公司为空
                  marinePriceConsultationItemRules.recommendShippingCompanyId = []
                  marinePriceConsultationItemRules.shippingCompanyId = []
                } else if (this.marinePriceConsultationItems[i].designate === false) {
                  if (this.marinePriceConsultationItems[i].recommendShippingCompanyId) {
                    marinePriceConsultationItemRules.shippingCompanyId = []
                  } else if (this.marinePriceConsultationItems[i].shippingCompanyId) {
                    marinePriceConsultationItemRules.recommendShippingCompanyId = []
                  }
                } else {
                  marinePriceConsultationItemRules.recommendShippingCompanyId = [
                    {
                      message: '货代公司 不能为空',
                      validate: validate.isNotEmpty
                    }
                  ]
                  marinePriceConsultationItemRules.shippingCompanyId = [
                    {
                      message: '船运公司 不能为空',
                      validate: validate.isNotEmpty
                    }
                  ]
                }
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
              if (!this.showDesignate) {
                let hasDesignate = false
                marinePriceConsultationItems.forEach((item, index) => {
                  if (item.designate) {
                    hasDesignate = true
                  }
                })
                if (!hasDesignate) {
                  this.$message({
                    message: '请先确认船司',
                    type: 'warning'
                  })
                  reject()
                  return
                }
              }
              try {
                if (this.formData.id) {
                  const postData = {
                    header: this.formData,
                    line: marinePriceConsultationItems
                  }
                  // 只修改，不新增
                  const res = await marinePriceConsultationServer.put(postData)
                  if (Number.parseInt(res.data.code) === 200) {
                    initFormData = {
                      ...this.formData
                    }
                    initMarinePriceConsultationItems = marinePriceConsultationItems
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    })
                  } else {
                    this.$message({
                      message: '保存失败 ',
                      type: 'error'
                    })
                    reject('error submit!!')
                    return
                  }
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
        }
      })
    },
    resetData() {
      this.formData = {
        ...initFormData
      }
      this.marinePriceConsultationItems = []
      this.getData()
    },
    clickAddMarinePriceConsultationItem() {
      // 增加一个排序属性，点击删除的时候，可以让删除组件知道标识
      marinePriceConsultationItemEmptyData.seq = this.marinePriceConsultationItems.length + 1
      this.tarnsformInitData()
      this.marinePriceConsultationItems.push({
        ...marinePriceConsultationItemEmptyData
      })
    },
    tarnsformInitData() {
      // formData.boxNames 柜形
      // formData.boxCounts 柜量
      // 根据柜型，把柜量的数据赋值给 boxQty1 boxQty3
      const keys = this.formData.boxNames.split(',')
      const vals = this.formData.boxCounts.split(',')
      const map = {}
      keys.forEach((key, index) => {
        map[key] = vals[index]
      })
      
      const models = [
        {
          key: '20GP',
          model: 'boxQty1'
        },
        {
          key: '40GP',
          model: 'boxQty2'
        },
        {
          key: '40HQ',
          model: 'boxQty3'
        },
        {
          key: '45HQ',
          model: 'boxQty4'
        },
        {
          key: '40RH',
          model: 'boxQty5'
        },
        {
          key: '拼箱',
          model: 'boxQty6'
        },
        {
          key: '空运',
          model: 'boxQty7'
        },
        {
          key: '一卡一车',
          model: 'boxQty8'
        },
        {
          key: '二卡一车',
          model: 'boxQty9'
        },
        {
          key: '三卡一车',
          model: 'boxQty10'
        }
      ]

      models.forEach((modelItem) => {
        if (map[modelItem.key]) {
          marinePriceConsultationItemEmptyData[modelItem.model] = map[modelItem.key]
        }
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
      this.showMarinePriceConsultationItemDeletePopup = false
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
