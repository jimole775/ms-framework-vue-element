<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      :title="id ? '商业发票拆分/合并-edit' : 'new-商业发票拆分/合并'"
      top="10vh"
      @close="close"
    >
      <div>
        <CommercialInvoiceSplitEdit ref="commercialInvoiceSplitEdit" :id="id" @loadingChange="loadingChange" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommercialInvoiceSplitEdit from './../../../components/entity/commercial-invoice-split/CommercialInvoiceSplitEdit'
export default {
  name: 'CommercialInvoiceSplitEditPopup',
  components: {
    CommercialInvoiceSplitEdit
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
      const formData = await this.$refs.commercialInvoiceSplitEdit.save()
      this.$emit('update', formData)
    },
    resetData() {
      this.$refs.commercialInvoiceSplitEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
