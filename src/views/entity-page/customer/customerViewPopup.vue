<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="客户-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  申请单号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.orderNumber }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  制单时间:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.createOrderTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  制单人:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.createOrderMan }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  状态:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.status | CustomerStatusFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  编码:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.code }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  名称:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.name }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  简称:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.simplifyName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  地址:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.address }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  客户描述:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.customerDescribe }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  负责人:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.thoseResponsible }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  信用等级:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.credit | CustomerCreditFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  注册名称:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.registerName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  网址:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.url }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  注册资本(美元):
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.registerCapital }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  客户类别:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.category | CustomerCategoryFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  电话:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.phone }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  Email:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.email }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  OA实际额度:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.oaCredit }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  贸易名称:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.tradeName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  法人代表:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.legalRepresentative }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  银行账号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.bankAccount }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  客户配件比例%:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.accessoriesProportion }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  授权书:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-tag :type="viewData.authorizationDocument === true ? 'success' : 'danger'">
                    {{ viewData.authorizationDocument === true ? '是' : '否' }}
                  </el-tag>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  注册书:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-tag :type="viewData.registrationDocument === true ? 'success' : 'danger'">
                    {{ viewData.registrationDocument === true ? '是' : '否' }}
                  </el-tag>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  客户性质:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.nature | CustomerNatureFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  信保比例%:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.creditProportion }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  客户等级:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.level | CustomerLevelFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  返利率:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.rebateProportion }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  区域等级:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.areaLevel | CustomerAreaLevelFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  贸易类型:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.tradeType | CustomerTradeTypeFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  注册地址:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.registeredAddress }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  纳税人识别号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.TaxpayerNumber }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  客户类型:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.type | CustomerTypeFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  备注:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.remark }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  是否删除:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-tag :type="viewData.isDelete === true ? 'success' : 'danger'">
                    {{ viewData.isDelete === true ? '是' : '否' }}
                  </el-tag>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  币种:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.currency.name }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  银行:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.bankInfo" type="text" size="mini" @click="openBankInfoViewPopup(viewData.bankInfo.id)">
                    {{ viewData.bankInfo.name || viewData.bankInfo.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  所在国家:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.area" type="text" size="mini" @click="openAreaViewPopup(viewData.area.id)">
                    {{ viewData.area.name || viewData.area.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  业务部门:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.department.name }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  经营单位:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.operateUnit.name }}
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="openEdit">编辑</el-button>
      </div>
    </el-dialog>
    <component v-if="showEdit" :is="'CustomerEditPopup'" :id="id" @close="showEdit = false" />
    <component
      v-if="showBankInfoViewPopup"
      :is="'BankInfoViewPopup'"
      :id="bankInfoId"
      @close="showBankInfoViewPopup = false"
    />
    <component
      v-if="showAreaViewPopup"
      :is="'AreaViewPopup'"
      :id="areaId"
      @close="showAreaViewPopup = false"
    />
  </div>
</template>

<script>
import customerServer from './../../../api/customerServer'
import CustomerStatusEnumUtil from './../../../components/enum/customer/CustomerStatusEnumUtil'
import CustomerCreditEnumUtil from './../../../components/enum/customer/CustomerCreditEnumUtil'
import CustomerCategoryEnumUtil from './../../../components/enum/customer/CustomerCategoryEnumUtil'
import CustomerNatureEnumUtil from './../../../components/enum/customer/CustomerNatureEnumUtil'
import CustomerLevelEnumUtil from './../../../components/enum/customer/CustomerLevelEnumUtil'
import CustomerAreaLevelEnumUtil from './../../../components/enum/customer/CustomerAreaLevelEnumUtil'
import CustomerTradeTypeEnumUtil from './../../../components/enum/customer/CustomerTradeTypeEnumUtil'
import CustomerTypeEnumUtil from './../../../components/enum/customer/CustomerTypeEnumUtil'

export default {
  name: 'CustomerViewPopup',
  components: {
    BankInfoViewPopup: () => import('./../bank-info/bankInfoViewPopup'),
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    CustomerEditPopup: () => import('./customerEditPopup.vue')
  },
  filters: {
    CustomerStatusFilter: CustomerStatusEnumUtil.toTitleFilter,
    CustomerCreditFilter: CustomerCreditEnumUtil.toTitleFilter,
    CustomerCategoryFilter: CustomerCategoryEnumUtil.toTitleFilter,
    CustomerNatureFilter: CustomerNatureEnumUtil.toTitleFilter,
    CustomerLevelFilter: CustomerLevelEnumUtil.toTitleFilter,
    CustomerAreaLevelFilter: CustomerAreaLevelEnumUtil.toTitleFilter,
    CustomerTradeTypeFilter: CustomerTradeTypeEnumUtil.toTitleFilter,
    CustomerTypeFilter: CustomerTypeEnumUtil.toTitleFilter,
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loading: true,
      showEdit: false,
      showBankInfoViewPopup: false,
      bankInfoId: null,
      showAreaViewPopup: false,
      areaId: null,
      viewData: {}
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    this.viewData = {}
    if (this.id) {
      this.getData()
    }
  },
  methods: {
    openEdit() {
      this.showEdit = true
    },
    close() {
      this.$emit('close')
    },
    async getData() {
      const res = await customerServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    },
    openBankInfoViewPopup(id) {
      this.bankInfoId = id
      this.showBankInfoViewPopup = true
    },
    openAreaViewPopup(id) {
      this.areaId = id
      this.showAreaViewPopup = true
    },
  }
}
</script>

<style scoped>
</style>
