<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="港口-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
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
                  英文名称:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.englishName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  港口类型:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.portType | PortTypeFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  是否可用:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.enable === true ? '是' : '否' }}
                </el-col>
               
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  备注:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.remark }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  所在国家:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.areaName }}
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import portServer from './../../../api/portServer'
import PortTypeEnumUtil from './../../../components/enum/port/PortTypeEnumUtil'

export default {
  name: 'PortViewPopup',
  components: {
    PortEditPopup: () => import('./portEditPopup.vue')
  },
  filters: {
    PortTypeFilter: PortTypeEnumUtil.toTitleFilter,
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
    close() {
      this.$emit('close')
    },
    async getData() {
      const res = await portServer.get(this.id)
      this.viewData = res
      console.log(this.viewData)
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
