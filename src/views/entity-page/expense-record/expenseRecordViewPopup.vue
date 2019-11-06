<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="费用登记-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  流水号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.code }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  创建人:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.createMan }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  创建时间:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  状态:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.status | ExpenseRecordStatusFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  出货预告号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.shipmentNotice }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  运费付款方式:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.paymentMethod | ExpenseRecordSPaymentMethodFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  合同号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.contractCode }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  备注:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.remark }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  合计金额:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.amount }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  发票号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.invoiceCode }}
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
                  部门:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.department" type="text" size="mini" @click="openDepartmentViewPopup(viewData.department.id)">
                    {{ viewData.department.name || viewData.department.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  客户:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.customer" type="text" size="mini" @click="openCustomerViewPopup(viewData.customer.id)">
                    {{ viewData.customer.name || viewData.customer.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  经营单位:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.operateUnit" type="text" size="mini" @click="openOperateUnitViewPopup(viewData.operateUnit.id)">
                    {{ viewData.operateUnit.name || viewData.operateUnit.id }}
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
    <component v-if="showEdit" :is="'ExpenseRecordEditPopup'" :id="id" @close="showEdit = false" />
    <component
      v-if="showDepartmentViewPopup"
      :is="'DepartmentViewPopup'"
      :id="departmentId"
      @close="showDepartmentViewPopup = false"
    />
    <component
      v-if="showCustomerViewPopup"
      :is="'CustomerViewPopup'"
      :id="customerId"
      @close="showCustomerViewPopup = false"
    />
    <component
      v-if="showOperateUnitViewPopup"
      :is="'OperateUnitViewPopup'"
      :id="operateUnitId"
      @close="showOperateUnitViewPopup = false"
    />
  </div>
</template>

<script>
import expenseRecordServer from './../../../api/expenseRecordServer'
import ExpenseRecordStatusEnumUtil from './../../../components/enum/expense-record/ExpenseRecordStatusEnumUtil'
import ExpenseRecordSPaymentMethodEnumUtil from './../../../components/enum/expense-record/ExpenseRecordSPaymentMethodEnumUtil'

export default {
  name: 'ExpenseRecordViewPopup',
  components: {
    DepartmentViewPopup: () => import('./../department/departmentViewPopup'),
    CustomerViewPopup: () => import('./../customer/customerViewPopup'),
    OperateUnitViewPopup: () => import('./../operate-unit/operateUnitViewPopup'),
    ExpenseRecordEditPopup: () => import('./expenseRecordEditPopup.vue')
  },
  filters: {
    ExpenseRecordStatusFilter: ExpenseRecordStatusEnumUtil.toTitleFilter,
    ExpenseRecordSPaymentMethodFilter: ExpenseRecordSPaymentMethodEnumUtil.toTitleFilter,
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
      showDepartmentViewPopup: false,
      departmentId: null,
      showCustomerViewPopup: false,
      customerId: null,
      showOperateUnitViewPopup: false,
      operateUnitId: null,
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
      const res = await expenseRecordServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    },
    openDepartmentViewPopup(id) {
      this.departmentId = id
      this.showDepartmentViewPopup = true
    },
    openCustomerViewPopup(id) {
      this.customerId = id
      this.showCustomerViewPopup = true
    },
    openOperateUnitViewPopup(id) {
      this.operateUnitId = id
      this.showOperateUnitViewPopup = true
    },
  }
}
</script>

<style scoped>
</style>
