<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      :title="id ? '计量单位-edit' : 'new-计量单位'"
      top="10vh"
      @close="close"
    >
      <div>
        <UnitMeasurementEdit ref="unitMeasurementEdit" :id="id" @loadingChange="loadingChange" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UnitMeasurementEdit from './../../../components/entity/unit-measurement/UnitMeasurementEdit'
export default {
  name: 'UnitMeasurementEditPopup',
  components: {
    UnitMeasurementEdit
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async save() {
      const formData = await this.$refs.unitMeasurementEdit.save()
      this.$emit('update', formData)
    },
    resetData() {
      this.$refs.unitMeasurementEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
