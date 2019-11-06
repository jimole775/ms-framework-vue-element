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
            <el-form-item v-if="formData.code" label="单据号" required prop="code">
              <el-input v-model="formData.code" :disabled="true" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item v-if="formData.status" label="单据状态" prop="status">
              <FreightStandardStatusEnumSelect :disabled="true" v-model="formData.status" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item v-if="formData.createUser" label="创建人" required prop="code">
              <el-input v-model="formData.createUser" :disabled="true" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item v-if="formData.createDate" label="创建时间" required prop="code">
              <el-input v-model="formData.createDate" :disabled="true" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item v-if="formData.updateName" label="更新人" required prop="code">
              <el-input v-model="formData.updateName" :disabled="true" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item v-if="formData.updateDate" label="更新时间" required prop="code">
              <el-input v-model="formData.updateDate" :disabled="true" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" size="mini" />
            </el-form-item>
          </el-col>
          <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="是否删除" prop="isDelete">
              <el-switch v-model="formData.isDelete" size="mini" />
            </el-form-item>
          </el-col> -->
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item v-if="formData.operateUnitId" label="经营单位" prop="operateUnitId">
              <OperateUnitSelect :disabled="true" v-model="formData.operateUnitId" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs type="border-card">
        <el-tab-pane label="包干费用标准按柜明细">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="clickAddFreightStandardContainer" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="clickDeleteFreightStandardContainer" />
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${freightStandardContainersSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="freightStandardContainers"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeFreightStandardContainer"
          >
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="shippingCompanyProxyType"
              sortable
              width="100"
              label="货代类型">
              <template slot-scope="scope">
                <ShippingCompanyProxyTypeEnumSelect :disabled="true" v-model="scope.row.shippingCompanyProxyType" />
              </template>
            </el-table-column>
            <el-table-column
              prop="shippingCompanyId"
              sortable
              width="180"
              label="船务公司">
              <template slot-scope="scope">
                <ShippingCompanySelect :index="scope.$index" v-model="scope.row.shippingCompanyId" @changeData="changeDataToOne"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="freightStandardContainerCostDetail"
              sortable
              width="140"
              label="费用明细">
              <template slot-scope="scope">
                <CostProjectSelect v-model="scope.row.freightStandardContainerCostDetail" :from="1"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="startTime"
              sortable
              width="140"
              label="有效期开始">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期时间"
                  size="mini"
                  @change="judgeValidOneStart(scope)"   
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="endTime"
              sortable
              width="140"
              label="有效期结束">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.endTime"
                  type="date"
                  placeholder="选择日期时间"
                  size="mini"
                  @change="judgeValidOneEnd(scope)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="specGp20"
              sortable
              width="160"
              label="20GP">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.specGp20"
                  :min="0"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="specGp40"
              sortable
              width="160"
              label="40GP">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.specGp40"
                  :min="0"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="specHq40"
              sortable
              width="160"
              label="40HQ">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.specHq40"
                  :min="0"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="specHq45"
              sortable
              width="160"
              label="45HQ">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.specHq45"
                  :min="0"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="specRh40"
              sortable
              width="160"
              label="40RH">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.specRh40"
                  :min="0"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="mergeContainer"
              sortable
              width="160"
              label="拼箱">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.mergeContainer"
                  :min="-999999999.99"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="airTransportation"
              sortable
              width="160"
              label="空运">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.airTransportation"
                  :min="0"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="boxPrice8"
              sortable
              width="160"
              label="一卡一车">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.boxPrice8"
                  :min="0"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="boxPrice9"
              sortable
              width="160"
              label="二卡一车">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.boxPrice9"
                  :min="0"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="boxPrice10"
              sortable
              width="160"
              label="三卡一车">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.boxPrice10"
                  :min="0"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="railwayTank"
              sortable
              width="190"
              label="铁路柜明细">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.railwayTank"
                  :min="0"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column> -->
            <!-- <el-table-column
              prop="isDelete"
              sortable
              label="是否删除">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isDelete"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column> -->
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="包干费用标准按票明细">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="clickAddFreightStandardTicket" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="clickDeleteFreightStandardTicket" />
            <upload-excel-component :on-success="handleSuccessTicket" :before-upload="beforeUpload"/>
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${freightStandardTicketsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="freightStandardTickets"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeFreightStandardTicket"
          >
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" />
            <el-table-column
              prop="shippingCompanyProxyType"
              sortable
              label="货代类型">
              <template slot-scope="scope">
                <ShippingCompanyProxyTypeEnumSelect :disabled="true" v-model="scope.row.shippingCompanyProxyType" />
              </template>
            </el-table-column>
            <el-table-column
              prop="shippingCompanyId"
              label="船务公司">
              <template slot-scope="scope">
                <ShippingCompanySelect :index="scope.$index" v-model="scope.row.shippingCompanyId" @changeData="changeDataToTwo"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="freightStandardTicketCostDetail"
              sortable
              label="费用明细">
              <template slot-scope="scope">
                <CostProjectSelect v-model="scope.row.freightStandardTicketCostDetail" :from="2"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="startTime"
              sortable
              width="140"
              label="有效期开始">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.startTime"
                  type="date"
                  editable
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期时间"
                  size="mini"
                  @change="judgeValidTwoStart(scope)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="endTime"
              sortable
              width="140"
              label="有效期结束">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.endTime"
                  type="date"
                  placeholder="选择日期时间"
                  size="mini"
                  @change="judgeValidTwoEnd(scope)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              sortable
              width="140"
              label="金额">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.price"
                  :min="0"
                  :max="999999999.99"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="isDelete"
              sortable
              label="是否删除">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isDelete"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column> -->
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <component
      v-if="showFreightStandardContainerDeletePopup"
      :is="'FreightStandardContainerDeletePopup'"
      :list="freightStandardContainersSelection"
      @close="showFreightStandardContainerDeletePopup = false"
      @update="deletedFreightStandardContainer"
    />
    <component
      v-if="showFreightStandardTicketDeletePopup"
      :is="'FreightStandardTicketDeletePopup'"
      :list="freightStandardTicketsSelection"
      @close="showFreightStandardTicketDeletePopup = false"
      @update="deletedFreightStandardTicket"
    />

  </div>
</template>

<script>
import freightStandardServer from '@/api/freightStandardServer'
import shippingCompanyServer from '@/api/shippingCompanyServer.js'
// import freightStandardContainerServer from './../../../api/freightStandardContainerServer'
// import freightStandardTicketServer from './../../../api/freightStandardTicketServer'
import validate from './../../../utils/validate'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import FreightStandardSelect from './../freight-standard/FreightStandardSelect'
import FreightStandardStatusEnumUtil from './../../../components/enum/freight-standard/FreightStandardStatusEnumUtil'
import CostProjectSelect from './../freight-standard/CostProjectSelect'
import CurrencySelect from './../currency/CurrencySelect'
import UploadExcelComponent from '@/components/UploadExcel/importIndex.vue'
import FreightStandardStatusEnumSelect from './../../../components/entity/freight-standard/FreightStandardStatusEnumSelect'
import ShippingCompanyProxyTypeEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyProxyTypeEnumSelect'
import ShippingCompanyProxyTypeEnumUtil from './../../enum/shipping-company/ShippingCompanyProxyTypeEnumUtil'
const emptyFormData = {
  code: null,
  status: null,
  remark: null,
  isDelete: null,
  operateUnitId: null,
}
const freightStandardContainerEmptyData = {
  freightStandardContainerCostDetail: null,
  startTime: null,
  endTime: null,
  specGp20: null,
  specGp40: null,
  specHq40: null,
  specHq45: null,
  specRh40: null,
  mergeContainer: null,
  airTransportation: null,
  boxPrice8: null,
  boxPrice9: null,
  boxPrice10: null,
  // railwayTank: null,
  isDelete: null,
  shippingCompany: null,
  freightStandard: null,
}
const freightStandardTicketEmptyData = {
  freightStandardTicketCostDetail: null,
  startTime: null,
  endTime: null,
  price: null,
  isDelete: null,
  shippingCompany: null,
  freightStandard: null,
}

const freightStandardContainerRules = {
  freightStandardContainerCostDetail: [
    { message: '费用明细 不能为空', validate: validate.isNotEmpty },
  ],
  startTime: [
  ],
  endTime: [
  ],
  specGp20: [
    { message: '20GP 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  specGp40: [
    { message: '40GP 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  specHq40: [
    { message: '40HQ 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  specHq45: [
    { message: '45HQ 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  mergeContainer: [
    { message: '拼箱 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  airTransportation: [
    { message: '空运 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  boxPrice8: [
    { message: '一卡一车 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  boxPrice9: [
    { message: '二卡一车 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  boxPrice10: [
    { message: '三卡一车 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  // railwayTank: [
  //   { message: '铁路柜明细 必须为数字', validate: validate.isNumberOrEmpty },
  // ],
  isDelete: [
  ],
  shippingCompanyId: [
  ],
}
const freightStandardTicketRules = {
  freightStandardTicketCostDetail: [
    { message: '费用明细 不能为空', validate: validate.isNotEmpty },
  ],
  startTime: [
  ],
  endTime: [
  ],
  price: [
    { message: '金额 必须为数字', validate: validate.isNumberOrEmpty },
  ],
  isDelete: [
  ],
  shippingCompanyId: [
  ],
}

let initFormData = {
  ...emptyFormData
}
// let initFreightStandardContainers = []
// let initFreightStandardTickets = []

export default {
  name: 'FreightStandardSublistEdit',
  components: {
    OperateUnitSelect,
    CurrencySelect,
    ShippingCompanySelect,
    FreightStandardSelect,
    CostProjectSelect,
    UploadExcelComponent,
    FreightStandardStatusEnumSelect,
    ShippingCompanyProxyTypeEnumSelect,
    FreightStandardContainerDeletePopup: () => import('./../../../views/entity-page/freight-standard-container/freightStandardContainerDeletePopup.vue'),
    FreightStandardTicketDeletePopup: () => import('./../../../views/entity-page/freight-standard-ticket/freightStandardTicketDeletePopup.vue'),
  },
  filters: {
    FreightStandardStatusFilter: FreightStandardStatusEnumUtil.toTitleFilter,
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
      freightStandardContainers: [],
      freightStandardTickets: [],
      oldBoxLine: [],
      oldDocLine: [],
      freightStandardContainersSelection: [],
      showFreightStandardContainerDeletePopup: false,
      freightStandardTicketsSelection: [],
      showFreightStandardTicketDeletePopup: false,
      rules: {
        code: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        status: [
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        operateUnitId: [
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
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        showClose: true,
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      // 按柜导入成功
      const addlist = []
      results.forEach(item => {
        const data = {
          freightStandardContainerCostDetail: item['费用明细'],
          shippingCompanyProxyType: ShippingCompanyProxyTypeEnumUtil.toValue(item['货代类型']),
          shippingCompanyName: item['船务公司'],
          // shippingCompanyId: parseInt(item.船务公司ID),
          // shippingCompanyCode: item.船务公司编码,
          specGp20: parseFloat(item['20GP']),
          specGp40: parseFloat(item['40GP']),
          specHq40: parseFloat(item['40HQ']),
          specHq45: parseFloat(item['45HQ']),
          specRh40: parseFloat(item['40RH']),
          mergeContainer: parseFloat(item['拼箱']),
          airTransportation: parseFloat(item['空运']),
          boxPrice8: parseFloat(item['一卡一车']),
          boxPrice9: parseFloat(item['二卡一车']),
          boxPrice10: parseFloat(item['三卡一车']),
          // railwayTank: parseFloat(item.铁路柜明细),
          startTime: item['有效期开始'],
          endTime: item['有效期结束'],
        } 
        addlist.push(data)
      })

      this.freightStandardContainers = this.freightStandardContainers.concat(addlist)
      this.patchingCompanyId(this.freightStandardContainers)
    },
    handleSuccessTicket({ results, header }) {
      // 按票导入成功
      const addlist = []
      results.forEach(item => {
        const data = {
          freightStandardTicketCostDetail: item['费用明细'],
          shippingCompanyProxyType: ShippingCompanyProxyTypeEnumUtil.toValue(item['货代类型']),
          price: parseFloat(item['金额']),
          startTime: item['有效期开始'],
          endTime: item['有效期结束'],
          shippingCompanyName: item['船务公司'],
          // shippingCompanyCode: parseInt(item['船务公司编码']),
          // shippingCompanyId: parseInt(item['船务公司ID']),
        }
        addlist.push(data)
      })
      this.freightStandardTickets = this.freightStandardTickets.concat(addlist)
      this.patchingCompanyId(this.freightStandardTickets)
    },
    patchingCompanyId(viewList) {
      const params = {
        // name: { 
        //   name: '',
        //   shippingCompanyProxyType: '', 
        // }
      }
      
      viewList.forEach((addItem) => {
        if (addItem.shippingCompanyName && !params[addItem.shippingCompanyName]) {
          params[addItem.shippingCompanyName] = { name: addItem.shippingCompanyName, shippingCompanyProxyType: addItem.shippingCompanyProxyType }
        }
      })

      Object.keys(params).forEach(async(key) => {
        const paramItem = params[key]
        if (paramItem.name) {
         const { rows: [data, duplicate] } = await shippingCompanyServer.search({ keyword: {
            ...paramItem
          }})

          if (duplicate) {
            return this.$message({
              showClose: true,
              message: paramItem.name + ', 存在不同ID, 请重新配置',
              type: 'warning',
            })
          }
          
          if (data) {
            viewList.forEach((item, index) => {
              if (item.shippingCompanyName === data.name) {
                item.shippingCompanyId = data.id
              }
              this.$set(viewList, index, item)
            })
          }
        }
      })
    },
    close() {
      this.$emit('close')
    },
    changeDataToOne(res) {
      this.freightStandardContainers[res.$index].shippingCompanyName = res.supplierName
      this.freightStandardContainers[res.$index].shippingCompanyCode = res.supplierCode
      this.freightStandardContainers[res.$index].shippingCompanyProxyType = res.hdType
    },
    changeDataToTwo(res) {
      this.freightStandardTickets[res.$index].shippingCompanyName = res.supplierName
      this.freightStandardTickets[res.$index].shippingCompanyCode = res.supplierCode
      this.freightStandardTickets[res.$index].shippingCompanyProxyType = res.hdType
    },
    judgeValidOneStart(data) {
      if (this.freightStandardContainers[data.$index].endTime == null) {
        return
      } else {
        const beginTime1 = this.freightStandardContainers[data.$index].startTime
        const endTime1 = this.freightStandardContainers[data.$index].endTime
        const timeNumber = endTime1.getTime() - beginTime1.getTime()
        if (timeNumber < 0) {
          this.$message({
            message: '按柜费用有效期开始时间不能大于有效期结束时间',
            type: 'warning'
          })
          this.freightStandardContainers[data.$index].startTime = null
          return
        }
      }
    },
    judgeValidOneEnd(data) {
      if (this.freightStandardContainers[data.$index].startTime == null) {
        return
      } else {
        const beginTime1 = this.freightStandardContainers[data.$index].startTime
        const endTime1 = this.freightStandardContainers[data.$index].endTime
        const timeNumber = beginTime1.getTime() - endTime1.getTime()
        if (timeNumber > 0) {
          this.$message({
            message: '按柜费用有效期结束时间不能小于有效期开始时间',
            type: 'warning'
          })
          this.freightStandardContainers[data.$index].endTime = null
          return
        }
      }
    },
    judgeValidTwoStart(data) {
      if (this.freightStandardTickets[data.$index].endTime == null) {
        return
      } else {
        const beginTime1 = this.freightStandardTickets[data.$index].startTime
        const endTime1 = this.freightStandardTickets[data.$index].endTime
        const timeNumber = endTime1.getTime() - beginTime1.getTime()
        if (timeNumber < 0) {
          this.$message({
            message: '按票费用有效期开始时间不能大于有效期结束时间',
            type: 'warning'
          })
          this.freightStandardTickets[data.$index].startTime = null
          return
        }
      }
    },
    judgeValidTwoEnd(data) {
      if (this.freightStandardTickets[data.$index].startTime == null) {
        return
      } else {
        const beginTime1 = this.freightStandardTickets[data.$index].startTime
        const endTime1 = this.freightStandardTickets[data.$index].endTime
        const timeNumber = beginTime1.getTime() - endTime1.getTime()
        if (timeNumber > 0) {
          this.$message({
            message: '按票费用有效期结束时间不能小于有效期开始时间',
            type: 'warning'
          })
          this.freightStandardTickets[data.$index].endTime = null
          return
        }
      }
    },
    async getData() {
      this.loading = true
      const res = await freightStandardServer.get(this.formData.id)
      this.oldBoxLine = [...res.boxLine]
      this.oldDocLine = [...res.docLine]
      this.freightStandardContainers = res.boxLine
      this.freightStandardTickets = res.docLine
      initFormData = res
      this.formData = {
        ...res
      }
      this.formData.id = res.stdId
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const freightStandardContainers = this.freightStandardContainers
            for (let i = 0; i < freightStandardContainers.length; i++) {
              const error = validate.dataObjectValidate(freightStandardContainers[i], freightStandardContainerRules)
              if (error) {
                this.$message({
                  message: `包干费用标准按柜明细 第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            const freightStandardTickets = this.freightStandardTickets
            for (let i = 0; i < freightStandardTickets.length; i++) {
              const error = validate.dataObjectValidate(freightStandardTickets[i], freightStandardTicketRules)
              if (error) {
                this.$message({
                  message: `包干费用标准按票明细 第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            try {
              if (this.formData.id != null) {
                const res = await freightStandardServer.put(this.formData, this.freightStandardContainers, this.freightStandardTickets, this.oldBoxLine, this.oldDocLine)
                if (res.code !== 200) {
                  this.$message({
                    message: res.msg,
                    type: 'warning'
                  })
                  this.freightStandardContainers.forEach((item, index) => {
                    this.$set(this.freightStandardContainers, index, item)
                  })
                  this.freightStandardTickets.forEach((item, index) => {
                    this.$set(this.freightStandardTickets, index, item)
                  })
                  return
                }
                this.formData.id = res.data.dataSet.rows[0].std_id
                // this.getData()
              } else {
                this.formData.entid = this.$store.getters.entid
                const res = await freightStandardServer.post(this.formData, this.freightStandardContainers, this.freightStandardTickets)
                if (res.code !== 200) {
                  // 新增保存成功后清空表单数据
                  this.formData = { ...emptyFormData }
                  this.$message({
                    message: res.msg,
                    type: 'warning'
                  })
                  this.freightStandardContainers.forEach((item, index) => {
                    this.$set(this.freightStandardContainers, index, item)
                  })
                  this.freightStandardTickets.forEach((item, index) => {
                    this.$set(this.freightStandardTickets, index, item)
                  })
                  return
                }
                this.formData.id = res.data.dataSet.rows[0].std_id
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
              // this.$message({
              //   message: '修改成功',
              //   type: 'success'
              // })
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
    del() {
      this.$confirm('确定要删除当前表单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        freightStandardServer.delete(this.formData).then(() => {
          this.$message({
            message: `成功删除当前包干单 ${this.formData.code}`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'FreightStandardEditSublistPage') 
        })
      })
    },
    resetData() {
      if (this.id) {
        this.formData = {
          ...initFormData
        }
        this.freightStandardContainers = []
        this.freightStandardTickets = []
        this.getData()
      }
      this.formData = {
        ...initFormData
      }
      this.freightStandardContainers = []
      this.freightStandardTickets = []
    },
    clickAddFreightStandardContainer() {
      this.freightStandardContainers.push({
        ...freightStandardContainerEmptyData
      })
    },
    selectionChangeFreightStandardContainer(val) {
      this.freightStandardContainersSelection = val
    },
    clickDeleteFreightStandardContainer() {
      if (this.freightStandardContainersSelection.length > 0) {
        this.freightStandardContainersSelection.forEach(item => {
          for (let i = 0; i < this.freightStandardContainers.length; i++) {
            if (this.freightStandardContainers[i] === item) {
              this.freightStandardContainers.splice(i, 1)
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
    deletedFreightStandardContainer() {
      this.freightStandardContainersSelection.forEach(item => {
        for (let i = 0; i < this.freightStandardContainers.length; i++) {
          if (this.freightStandardContainers[i] === item) {
            this.freightStandardContainers.splice(i, 1)
            break
          }
        }
      })
      this.freightStandardContainersSelection = []
    },
    clickAddFreightStandardTicket() {
      this.freightStandardTickets.push({
        ...freightStandardTicketEmptyData
      })
    },
    selectionChangeFreightStandardTicket(val) {
      this.freightStandardTicketsSelection = val
    },
    clickDeleteFreightStandardTicket() {
      if (this.freightStandardTicketsSelection.length > 0) {
        this.freightStandardTicketsSelection.forEach(item => {
          for (let i = 0; i < this.freightStandardTickets.length; i++) {
            if (this.freightStandardTickets[i] === item) {
              this.freightStandardTickets.splice(i, 1)
              break
            }
          }
        })
        this.freightStandardTicketsSelection = [] 
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedFreightStandardTicket() {
      this.freightStandardTicketsSelection.forEach(item => {
        for (let i = 0; i < this.freightStandardTickets.length; i++) {
          if (this.freightStandardTickets[i] === item) {
            this.freightStandardTickets.splice(i, 1)
            break
          }
        }
      })
      this.freightStandardTicketsSelection = []
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
  }
  .el-table__body {
    padding-bottom: 12px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
</style>
