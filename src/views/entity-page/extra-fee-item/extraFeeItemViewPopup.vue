<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="额外费用登记明细-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  输单日期:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.inputDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  出货预告id:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.warnId }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  出货预告号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.warnNo }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  合同号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.piNo }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  柜量:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.boxQty }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  截关:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.cutDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  币种:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.currencyCode | CurrencySelectFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  费用编码:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.feeType }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  金额:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.amt }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  原因:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.reason }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  责任人:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.resMan }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  负责人:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.responsibleLeader | ResponsibleLeaderFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  责任体系:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.responsibleOrg | ResponsibleOrgFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  负激励:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.negativeIncentive }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  大区:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.area" type="text" size="mini" @click="openAreaViewPopup(viewData.area.id)">
                    {{ viewData.area.name || viewData.area.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  部门:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.org" type="text" size="mini" @click="openOrgViewPopup(viewData.org.id)">
                    {{ viewData.org.name || viewData.org.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  货代:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.transit" type="text" size="mini" @click="openTransitViewPopup(viewData.transit.id)">
                    {{ viewData.transit.name || viewData.transit.id }}
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
    <component v-if="showEdit" :is="'ExtraFeeItemEditPopup'" :id="id" @close="showEdit = false" />
    <component
      v-if="showAreaViewPopup"
      :is="'AreaViewPopup'"
      :id="areaId"
      @close="showAreaViewPopup = false"
    />
    <component
      v-if="showOrgViewPopup"
      :is="'DepartmentViewPopup'"
      :id="orgId"
      @close="showOrgViewPopup = false"
    />
    <component
      v-if="showTransitViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="transitId"
      @close="showTransitViewPopup = false"
    />
  </div>
</template>

<script>
import extraFeeItemServer from './../../../api/extraFeeItemServer'
import CurrencySelectEnumUtil from './../../../components/enum/extra-fee-item/CurrencySelectEnumUtil'
import ResponsibleLeaderEnumUtil from './../../../components/enum/extra-fee-item/ResponsibleLeaderEnumUtil'
import ResponsibleOrgEnumUtil from './../../../components/enum/extra-fee-item/ResponsibleOrgEnumUtil'

export default {
  name: 'ExtraFeeItemViewPopup',
  components: {
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    DepartmentViewPopup: () => import('./../department/departmentViewPopup'),
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    ExtraFeeItemEditPopup: () => import('./extraFeeItemEditPopup.vue')
  },
  filters: {
    CurrencySelectFilter: CurrencySelectEnumUtil.toTitleFilter,
    ResponsibleLeaderFilter: ResponsibleLeaderEnumUtil.toTitleFilter,
    ResponsibleOrgFilter: ResponsibleOrgEnumUtil.toTitleFilter,
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
      showAreaViewPopup: false,
      areaId: null,
      showOrgViewPopup: false,
      orgId: null,
      showTransitViewPopup: false,
      transitId: null,
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
      const res = await extraFeeItemServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    },
    openAreaViewPopup(id) {
      this.areaId = id
      this.showAreaViewPopup = true
    },
    openOrgViewPopup(id) {
      this.orgId = id
      this.showOrgViewPopup = true
    },
    openTransitViewPopup(id) {
      this.transitId = id
      this.showTransitViewPopup = true
    },
  }
}
</script>

<style scoped>
</style>
