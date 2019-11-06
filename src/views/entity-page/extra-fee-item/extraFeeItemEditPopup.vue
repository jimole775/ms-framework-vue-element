<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      :title="id ? '额外费用登记明细-edit' : 'new-额外费用登记明细'"
      top="10vh"
      @close="close"
    >
      <div>
        <ExtraFeeItemEdit ref="extraFeeItemEdit" :id="id" @loadingChange="loadingChange" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ExtraFeeItemEdit from './../../../components/entity/extra-fee-item/ExtraFeeItemEdit'
export default {
  name: 'ExtraFeeItemEditPopup',
  components: {
    ExtraFeeItemEdit
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
      const formData = await this.$refs.extraFeeItemEdit.save()
      this.$emit('update', formData)
    },
    resetData() {
      this.$refs.extraFeeItemEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
