<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="进料加工成品维护-view"
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
                  标准机型:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.machineType" type="text" size="mini" @click="openMachineTypeViewPopup(viewData.machineType.id)">
                    {{ viewData.machineType.name || viewData.machineType.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  进口物料:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-button v-if="viewData.material" type="text" size="mini" @click="openMaterialViewPopup(viewData.material.id)">
                    {{ viewData.material.name || viewData.material.id }}
                  </el-button>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  经营单位:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
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
    <component v-if="showEdit" :is="'MaterialProcessEditPopup'" :id="id" @close="showEdit = false" />
    <component
      v-if="showMachineTypeViewPopup"
      :is="'MachineTypeViewPopup'"
      :id="machineTypeId"
      @close="showMachineTypeViewPopup = false"
    />
    <component
      v-if="showMaterialViewPopup"
      :is="'MaterialViewPopup'"
      :id="materialId"
      @close="showMaterialViewPopup = false"
    />
  </div>
</template>

<script>
import materialProcessServer from './../../../api/materialProcessServer'

export default {
  name: 'MaterialProcessViewPopup',
  components: {
    MachineTypeViewPopup: () => import('./../machine-type/machineTypeViewPopup'),
    MaterialViewPopup: () => import('./../material/materialViewPopup'),
    MaterialProcessEditPopup: () => import('./materialProcessEditPopup.vue')
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
      showMachineTypeViewPopup: false,
      machineTypeId: null,
      showMaterialViewPopup: false,
      materialId: null,
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
      const res = await materialProcessServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    },
    openMachineTypeViewPopup(id) {
      this.machineTypeId = id
      this.showMachineTypeViewPopup = true
    },
    openMaterialViewPopup(id) {
      this.materialId = id
      this.showMaterialViewPopup = true
    },
  }
}
</script>

<style scoped>
</style>
