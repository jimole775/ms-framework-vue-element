<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="海运价格咨询明细-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  截关日期:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.expirationDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  价格有效日期:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.pricePeriodValidity | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  总金额:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.totalAmount }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  综合低价:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.lowestPrice }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  综合排名:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.sort }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  最晚订舱日期:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.lastScheduledDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  预计航程(天):
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.transportTime }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  确定船司:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-tag :type="viewData.designate === true ? 'success' : 'danger'">
                    {{ viewData.designate === true ? '是' : '否' }}
                  </el-tag>
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
                  海运价格咨询:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.marinePriceConsultation" type="text" size="mini" @click="openMarinePriceConsultationViewPopup(viewData.marinePriceConsultation.id)">
                    {{ viewData.marinePriceConsultation.name || viewData.marinePriceConsultation.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  货代公司:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.recommendShippingCompany" type="text" size="mini" @click="openRecommendShippingCompanyViewPopup(viewData.recommendShippingCompany.id)">
                    {{ viewData.recommendShippingCompany.name || viewData.recommendShippingCompany.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  船运公司:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.shippingCompany" type="text" size="mini" @click="openShippingCompanyViewPopup(viewData.shippingCompany.id)">
                    {{ viewData.shippingCompany.name || viewData.shippingCompany.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  货币:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.currency.name }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  单位:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.unitMeasurement" type="text" size="mini" @click="openUnitMeasurementViewPopup(viewData.unitMeasurement.id)">
                    {{ viewData.unitMeasurement.name || viewData.unitMeasurement.id }}
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
    <component v-if="showEdit" :is="'MarinePriceConsultationItemEditPopup'" :id="id" @close="showEdit = false" />
    <component
      v-if="showMarinePriceConsultationViewPopup"
      :is="'MarinePriceConsultationViewPopup'"
      :id="marinePriceConsultationId"
      @close="showMarinePriceConsultationViewPopup = false"
    />
    <component
      v-if="showRecommendShippingCompanyViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="shippingCompanyId"
      @close="showRecommendShippingCompanyViewPopup = false"
    />
    <component
      v-if="showShippingCompanyViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="shippingCompanyId"
      @close="showShippingCompanyViewPopup = false"
    />
    <component
      v-if="showUnitMeasurementViewPopup"
      :is="'UnitMeasurementViewPopup'"
      :id="unitMeasurementId"
      @close="showUnitMeasurementViewPopup = false"
    />
  </div>
</template>

<script>
import marinePriceConsultationItemServer from './../../../api/marinePriceConsultationItemServer'

export default {
  name: 'MarinePriceConsultationItemViewPopup',
  components: {
    MarinePriceConsultationViewPopup: () => import('./../marine-price-consultation/marinePriceConsultationViewPopup'),
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    UnitMeasurementViewPopup: () => import('./../unit-measurement/unitMeasurementViewPopup'),
    MarinePriceConsultationItemEditPopup: () => import('./marinePriceConsultationItemEditPopup.vue')
  },
  filters: {
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
      showMarinePriceConsultationViewPopup: false,
      marinePriceConsultationId: null,
      showRecommendShippingCompanyViewPopup: false,
      shippingCompanyId: null,
      showShippingCompanyViewPopup: false,
      showUnitMeasurementViewPopup: false,
      unitMeasurementId: null,
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
      const res = await marinePriceConsultationItemServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    },
    openMarinePriceConsultationViewPopup(id) {
      this.marinePriceConsultationId = id
      this.showMarinePriceConsultationViewPopup = true
    },
    openRecommendShippingCompanyViewPopup(id) {
      this.shippingCompanyId = id
      this.showRecommendShippingCompanyViewPopup = true
    },
    openShippingCompanyViewPopup(id) {
      this.shippingCompanyId = id
      this.showShippingCompanyViewPopup = true
    },
    openUnitMeasurementViewPopup(id) {
      this.unitMeasurementId = id
      this.showUnitMeasurementViewPopup = true
    },
  }
}
</script>

<style scoped>
</style>
