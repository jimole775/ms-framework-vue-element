<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="费用登记明细-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  支付对象:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.payTarget | ExpenseRecordItemPayTargetFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  发票号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.invoiceCode }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  发票日期:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.invoiceDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  费用编码:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.costCode }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  费用名称:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.costName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  柜数:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.containerNumber }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  单柜费用:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.containerCost }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  总费用:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.amount }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  其中税金:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.tax }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  总费用(RMB):
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.amountRmb }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  付款公司:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.paymentCompany }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  原因:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.causes }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  责任人:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.thoseResponsible }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  是否额外费用:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-tag :type="viewData.isAdditionalCharge === true ? 'success' : 'danger'">
                    {{ viewData.isAdditionalCharge === true ? '是' : '否' }}
                  </el-tag>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  报告号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.reportCode }}
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
                  费用登记:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.expenseRecord" type="text" size="mini" @click="openExpenseRecordViewPopup(viewData.expenseRecord.id)">
                    {{ viewData.expenseRecord.name || viewData.expenseRecord.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  柜型:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.container" type="text" size="mini" @click="openContainerViewPopup(viewData.container.id)">
                    {{ viewData.container.name || viewData.container.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  货代公司:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.freightForwardingCompany" type="text" size="mini" @click="openFreightForwardingCompanyViewPopup(viewData.freightForwardingCompany.id)">
                    {{ viewData.freightForwardingCompany.name || viewData.freightForwardingCompany.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  货币:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.currency" type="text" size="mini" @click="openCurrencyViewPopup(viewData.currency.id)">
                    {{ viewData.currency.name || viewData.currency.id }}
                  </el-button>
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
    <component v-if="showEdit" :is="'ExpenseRecordItemEditPopup'" :id="id" @close="showEdit = false" />
    <component
      v-if="showExpenseRecordViewPopup"
      :is="'ExpenseRecordViewPopup'"
      :id="expenseRecordId"
      @close="showExpenseRecordViewPopup = false"
    />
    <component
      v-if="showContainerViewPopup"
      :is="'ContainerViewPopup'"
      :id="containerId"
      @close="showContainerViewPopup = false"
    />
    <component
      v-if="showFreightForwardingCompanyViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="shippingCompanyId"
      @close="showFreightForwardingCompanyViewPopup = false"
    />
    <component
      v-if="showCurrencyViewPopup"
      :is="'CurrencyViewPopup'"
      :id="currencyId"
      @close="showCurrencyViewPopup = false"
    />
  </div>
</template>

<script>
import expenseRecordItemServer from './../../../api/expenseRecordItemServer'
import ExpenseRecordItemPayTargetEnumUtil from './../../../components/enum/expense-record-item/ExpenseRecordItemPayTargetEnumUtil'

export default {
  name: 'ExpenseRecordItemViewPopup',
  components: {
    ExpenseRecordViewPopup: () => import('./../expense-record/expenseRecordViewPopup'),
    ContainerViewPopup: () => import('./../container/containerViewPopup'),
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    CurrencyViewPopup: () => import('./../currency/currencyViewPopup'),
    ExpenseRecordItemEditPopup: () => import('./expenseRecordItemEditPopup.vue')
  },
  filters: {
    ExpenseRecordItemPayTargetFilter: ExpenseRecordItemPayTargetEnumUtil.toTitleFilter,
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
      showExpenseRecordViewPopup: false,
      expenseRecordId: null,
      showContainerViewPopup: false,
      containerId: null,
      showFreightForwardingCompanyViewPopup: false,
      shippingCompanyId: null,
      showCurrencyViewPopup: false,
      currencyId: null,
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
      const res = await expenseRecordItemServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    },
    openExpenseRecordViewPopup(id) {
      this.expenseRecordId = id
      this.showExpenseRecordViewPopup = true
    },
    openContainerViewPopup(id) {
      this.containerId = id
      this.showContainerViewPopup = true
    },
    openFreightForwardingCompanyViewPopup(id) {
      this.shippingCompanyId = id
      this.showFreightForwardingCompanyViewPopup = true
    },
    openCurrencyViewPopup(id) {
      this.currencyId = id
      this.showCurrencyViewPopup = true
    },
  }
}
</script>

<style scoped>
</style>
