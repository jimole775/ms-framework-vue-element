<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="料件信息-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  记录号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.recordNo }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  商品编码:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.itemHNode }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  商品名称:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.itemHName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  规格型号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.spec }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  主料标志:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-tag :type="viewData.isMainMaterial === true ? 'success' : 'danger'">
                    {{ viewData.isMainMaterial === true ? '是' : '否' }}
                  </el-tag>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  计量单位:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.uom | UomFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  法定计量单位:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.stdUom | StdUomFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  申报数量:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.declareQty }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  申报单价:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.declarePrice }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  申报总价:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.declareAmt }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  币值:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.cny | CnyFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  美元总价:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.dollarAmt }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  比例因子:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.stdUomFactor }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  免征方案:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.exemptionScheme }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  备注:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.note }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  产销国:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.proMarkingCountry" type="text" size="mini" @click="openProMarkingCountryViewPopup(viewData.proMarkingCountry.id)">
                    {{ viewData.proMarkingCountry.name || viewData.proMarkingCountry.id }}
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
    <component v-if="showEdit" :is="'ClearanceManualItemEditPopup'" :id="id" @close="showEdit = false" />
    <component
      v-if="showProMarkingCountryViewPopup"
      :is="'AreaViewPopup'"
      :id="proMarkingCountryId"
      @close="showProMarkingCountryViewPopup = false"
    />
  </div>
</template>

<script>
import clearanceManualItemServer from './../../../api/clearanceManualItemServer'
import UomEnumUtil from './../../../components/enum/clearance-manual-item/UomEnumUtil'
import StdUomEnumUtil from './../../../components/enum/clearance-manual-item/StdUomEnumUtil'
import CnyEnumUtil from './../../../components/enum/clearance-manual-item/CnyEnumUtil'

export default {
  name: 'ClearanceManualItemViewPopup',
  components: {
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    ClearanceManualItemEditPopup: () => import('./clearanceManualItemEditPopup.vue')
  },
  filters: {
    UomFilter: UomEnumUtil.toTitleFilter,
    StdUomFilter: StdUomEnumUtil.toTitleFilter,
    CnyFilter: CnyEnumUtil.toTitleFilter,
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
      showProMarkingCountryViewPopup: false,
      proMarkingCountryId: null,
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
      const res = await clearanceManualItemServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    },
    openProMarkingCountryViewPopup(id) {
      this.proMarkingCountryId = id
      this.showProMarkingCountryViewPopup = true
    },
  }
}
</script>

<style scoped>
</style>
