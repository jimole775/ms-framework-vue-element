<template>
  <div>
    <el-dialog
      :visible="true"
      :close-on-click-modal="false"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      :title="id ? '单证人员编辑' : '单证人员新增'"
      top="10vh"
      @close="close"
    >
      <div>
        <TradeDocumenterEdit ref="tradeDocumenterEdit" :id="id" @loadingChange="loadingChange" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TradeDocumenterEdit from './../../../components/entity/trade-documenter/TradeDocumenterEdit'
export default {
  name: 'TradeDocumenterEditPopup',
  components: {
    TradeDocumenterEdit
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
      const formData = await this.$refs.tradeDocumenterEdit.save()
      this.$emit('update', formData)
    },
    resetData() {
      this.$refs.tradeDocumenterEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
