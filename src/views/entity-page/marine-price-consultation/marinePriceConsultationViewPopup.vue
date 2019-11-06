<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="海运价格咨询-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  单号:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.code }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  状态:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.status | MarinePriceConsultationStatusFilter }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  目的港免用箱:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.freeBox }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  免堆期(天):
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.freeStorageTime }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  预计装柜日期:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.loadDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  PI号:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.pi }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  航线:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.airRoute | MarinePriceConsultationAirRouteFilter }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  预计货款到达:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.paymentDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  是否船司价格:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <span v-if="viewData.isShippingCompanyPrice === true">是</span>
                  <span v-else>否</span>
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  其它提单要求:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.otherCommitRequirements }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  柜量:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.containerNumber }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  备注:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.remark }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  其它要求:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.otherRequest }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  销售部门:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.saleDepartment.name }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  目的国家:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.targetArea" type="text" size="mini" @click="openTargetAreaViewPopup(viewData.targetArea.id)">
                    {{ viewData.targetArea.name || viewData.targetArea.id }}
                  </el-button>
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  出货港口:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.shipmentPort" type="text" size="mini" @click="openShipmentPortViewPopup(viewData.shipmentPort.id)">
                    {{ viewData.shipmentPort.name || viewData.shipmentPort.id }}
                  </el-button>
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  到货港口:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.targetPort" type="text" size="mini" @click="openTargetPortViewPopup(viewData.targetPort.id)">
                    {{ viewData.targetPort.name || viewData.targetPort.id }}
                  </el-button>
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  推荐船司:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.recommendShippingCompany" type="text" size="mini" @click="openRecommendShippingCompanyViewPopup(viewData.recommendShippingCompany.id)">
                    {{ viewData.recommendShippingCompany.name || viewData.recommendShippingCompany.id }}
                  </el-button>
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  柜型:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.containerType.name }}
                </el-col>
                <el-col :lg="3" :md="3" :sm="4" :xs="7" class="data-col-title">
                  经营单位:
                </el-col>
                <el-col :lg="3" :md="5" :sm="8" :xs="17" class="data-col-content">
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
    <component v-if="showEdit" :is="'MarinePriceConsultationEditPopup'" :id="id" @close="showEdit = false" />
    <component
      v-if="showTargetAreaViewPopup"
      :is="'AreaViewPopup'"
      :id="areaId"
      @close="showTargetAreaViewPopup = false"
    />
    <component
      v-if="showShipmentPortViewPopup"
      :is="'PortViewPopup'"
      :id="portId"
      @close="showShipmentPortViewPopup = false"
    />
    <component
      v-if="showTargetPortViewPopup"
      :is="'PortViewPopup'"
      :id="portId"
      @close="showTargetPortViewPopup = false"
    />
    <component
      v-if="showRecommendShippingCompanyViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="shippingCompanyId"
      @close="showRecommendShippingCompanyViewPopup = false"
    />
  </div>
</template>

<script>
import marinePriceConsultationServer from './../../../api/marinePriceConsultationServer'
import MarinePriceConsultationStatusEnumUtil from './../../../components/enum/marine-price-consultation/MarinePriceConsultationStatusEnumUtil'
import MarinePriceConsultationAirRouteEnumUtil from './../../../components/enum/marine-price-consultation/MarinePriceConsultationAirRouteEnumUtil'

export default {
  name: 'MarinePriceConsultationViewPopup',
  components: {
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    PortViewPopup: () => import('./../port/portViewPopup'),
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    MarinePriceConsultationEditPopup: () => import('./marinePriceConsultationEditPopup.vue')
  },
  filters: {
    MarinePriceConsultationStatusFilter: MarinePriceConsultationStatusEnumUtil.toTitleFilter,
    MarinePriceConsultationAirRouteFilter: MarinePriceConsultationAirRouteEnumUtil.toTitleFilter,
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
      showTargetAreaViewPopup: false,
      areaId: null,
      showShipmentPortViewPopup: false,
      portId: null,
      showTargetPortViewPopup: false,
      showRecommendShippingCompanyViewPopup: false,
      shippingCompanyId: null,
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
      const res = await marinePriceConsultationServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    },
    openTargetAreaViewPopup(id) {
      this.areaId = id
      this.showTargetAreaViewPopup = true
    },
    openShipmentPortViewPopup(id) {
      this.portId = id
      this.showShipmentPortViewPopup = true
    },
    openTargetPortViewPopup(id) {
      this.portId = id
      this.showTargetPortViewPopup = true
    },
    openRecommendShippingCompanyViewPopup(id) {
      this.shippingCompanyId = id
      this.showRecommendShippingCompanyViewPopup = true
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
