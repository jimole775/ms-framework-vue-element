<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      :title="id ? '成品信息-edit' : 'new-成品信息'"
      top="10vh"
      @close="close"
    >
      <div>
        <ClearanceManualProductEdit ref="clearanceManualProductEdit" :id="id" @loadingChange="loadingChange" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ClearanceManualProductEdit from './../../../components/entity/clearance-manual-product/ClearanceManualProductEdit'
export default {
  name: 'ClearanceManualProductEditPopup',
  components: {
    ClearanceManualProductEdit
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
      const formData = await this.$refs.clearanceManualProductEdit.save()
      this.$emit('update', formData)
    },
    resetData() {
      this.$refs.clearanceManualProductEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
