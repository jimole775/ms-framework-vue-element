<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="货柜转载最大值-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  最大体积:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content" show-overflow-tooltip>
                  {{ viewData.volume }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  最大毛重:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.maxRoughWeight }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  最大净重:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.maxSuttle }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  备注:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content" show-overflow-tooltip> 
                  {{ viewData.remark }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  柜型:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.containerTypeName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  经营单位:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.entid | OperaUnitFilter }}
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
    <component
      v-if="showContainerTypeViewPopup"
      :is="'ContainerViewPopup'"
      :id="containerId"
      @close="showContainerTypeViewPopup = false"
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
import containerLoadServer from './../../../api/containerLoadServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'

export default {
  name: 'ContainerLoadViewPopup',
  components: {
    ContainerLoadEditPopup: () => import('./containerLoadEditPopup.vue')
  },
  filters: {
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
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
      showContainerTypeViewPopup: false,
      containerId: null,
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
    close() {
      this.$emit('close')
    },
    async getData() {
      const res = await containerLoadServer.get(this.id)
      this.viewData = res
      this.loading = false
    },
  }
}
</script>

<style scoped>
</style>
