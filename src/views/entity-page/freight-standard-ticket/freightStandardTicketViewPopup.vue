<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="包干费用标准按票明细-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  费用明细:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.freightStandardTicketCostDetail | FreightStandardTicketCostDetailFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  有效期开始时间:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.startTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  有效期结束时间:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.endTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  金额:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.price }}
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
                  船务公司:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.shippingCompany" type="text" size="mini" @click="openShippingCompanyViewPopup(viewData.shippingCompany.id)">
                    {{ viewData.shippingCompany.name || viewData.shippingCompany.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  包干费用标准:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.freightStandard" type="text" size="mini" @click="openFreightStandardViewPopup(viewData.freightStandard.id)">
                    {{ viewData.freightStandard.name || viewData.freightStandard.id }}
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
    <component v-if="showEdit" :is="'FreightStandardTicketEditPopup'" :id="id" @close="showEdit = false" />
    <component
      v-if="showShippingCompanyViewPopup"
      :is="'ShippingCompanyViewPopup'"
      :id="shippingCompanyId"
      @close="showShippingCompanyViewPopup = false"
    />
    <component
      v-if="showFreightStandardViewPopup"
      :is="'FreightStandardViewPopup'"
      :id="freightStandardId"
      @close="showFreightStandardViewPopup = false"
    />
  </div>
</template>

<script>
import freightStandardTicketServer from './../../../api/freightStandardTicketServer'
import FreightStandardTicketCostDetailEnumUtil from './../../../components/enum/freight-standard-ticket/FreightStandardTicketCostDetailEnumUtil'

export default {
  name: 'FreightStandardTicketViewPopup',
  components: {
    ShippingCompanyViewPopup: () => import('./../shipping-company/shippingCompanyViewPopup'),
    FreightStandardViewPopup: () => import('./../freight-standard/freightStandardViewPopup'),
    FreightStandardTicketEditPopup: () => import('./freightStandardTicketEditPopup.vue')
  },
  filters: {
    FreightStandardTicketCostDetailFilter: FreightStandardTicketCostDetailEnumUtil.toTitleFilter,
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
      showShippingCompanyViewPopup: false,
      shippingCompanyId: null,
      showFreightStandardViewPopup: false,
      freightStandardId: null,
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
      const res = await freightStandardTicketServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    },
    openShippingCompanyViewPopup(id) {
      this.shippingCompanyId = id
      this.showShippingCompanyViewPopup = true
    },
    openFreightStandardViewPopup(id) {
      this.freightStandardId = id
      this.showFreightStandardViewPopup = true
    },
  }
}
</script>

<style scoped>
</style>
