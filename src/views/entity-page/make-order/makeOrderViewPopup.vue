<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="制作提单-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  制单号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.makingOrderNo }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  订舱单号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.bookingNo }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  发货人:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.sender }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  收件人:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.receiver }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  通知人:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.notifier }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  船名:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.shipName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  船次:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.saillings }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  订舱品名:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.productName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  出货港名称:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.seaportOutName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  到货港名称:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.seaportInName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  集装箱分号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.container }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  包装的总数量:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.total }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  毛重:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.grossWeight }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  体积:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.volume }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  付款方式:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.payType | PayTypeFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  目的地:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.destination }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  制作状态:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.makingStatus | MakingStatusFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  其他:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.other }}
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
                  版本号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.versionNum }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  订舱单:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.bookingId" type="text" size="mini" @click="openBookingIdViewPopup(viewData.bookingId.id)">
                    {{ viewData.bookingId.name || viewData.bookingId.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  改单申请号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.changeNo" type="text" size="mini" @click="openChangeNoViewPopup(viewData.changeNo.id)">
                    {{ viewData.changeNo.name || viewData.changeNo.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  出货港:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.seaportOutId" type="text" size="mini" @click="openSeaportOutIdViewPopup(viewData.seaportOutId.id)">
                    {{ viewData.seaportOutId.name || viewData.seaportOutId.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  到货港:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.seaportInId" type="text" size="mini" @click="openSeaportInIdViewPopup(viewData.seaportInId.id)">
                    {{ viewData.seaportInId.name || viewData.seaportInId.id }}
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
    <component v-if="showEdit" :is="'MakeOrderEditPopup'" :id="id" @close="showEdit = false" />
    <component
      v-if="showBookingIdViewPopup"
      :is="'ShipCabinOrderViewPopup'"
      :id="bookingIdId"
      @close="showBookingIdViewPopup = false"
    />
    <component
      v-if="showChangeNoViewPopup"
      :is="'ChangeOrderViewPopup'"
      :id="changeNoId"
      @close="showChangeNoViewPopup = false"
    />
    <component
      v-if="showSeaportOutIdViewPopup"
      :is="'PortViewPopup'"
      :id="seaportOutIdId"
      @close="showSeaportOutIdViewPopup = false"
    />
    <component
      v-if="showSeaportInIdViewPopup"
      :is="'PortViewPopup'"
      :id="seaportInIdId"
      @close="showSeaportInIdViewPopup = false"
    />
  </div>
</template>

<script>
import makeOrderServer from './../../../api/makeOrderServer'
import PayTypeEnumUtil from './../../../components/enum/make-order/PayTypeEnumUtil'
import MakingStatusEnumUtil from './../../../components/enum/make-order/MakingStatusEnumUtil'

export default {
  name: 'MakeOrderViewPopup',
  components: {
    ShipCabinOrderViewPopup: () => import('./../ship-cabin-order/shipCabinOrderViewPopup'),
    ChangeOrderViewPopup: () => import('./../change-order/changeOrderViewPopup'),
    PortViewPopup: () => import('./../port/portViewPopup'),
    MakeOrderEditPopup: () => import('./makeOrderEditPopup.vue')
  },
  filters: {
    PayTypeFilter: PayTypeEnumUtil.toTitleFilter,
    MakingStatusFilter: MakingStatusEnumUtil.toTitleFilter,
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
      showBookingIdViewPopup: false,
      bookingIdId: null,
      showChangeNoViewPopup: false,
      changeNoId: null,
      showSeaportOutIdViewPopup: false,
      seaportOutIdId: null,
      showSeaportInIdViewPopup: false,
      seaportInIdId: null,
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
      const res = await makeOrderServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    },
    openBookingIdViewPopup(id) {
      this.bookingIdId = id
      this.showBookingIdViewPopup = true
    },
    openChangeNoViewPopup(id) {
      this.changeNoId = id
      this.showChangeNoViewPopup = true
    },
    openSeaportOutIdViewPopup(id) {
      this.seaportOutIdId = id
      this.showSeaportOutIdViewPopup = true
    },
    openSeaportInIdViewPopup(id) {
      this.seaportInIdId = id
      this.showSeaportInIdViewPopup = true
    },
  }
}
</script>

<style scoped>
</style>
