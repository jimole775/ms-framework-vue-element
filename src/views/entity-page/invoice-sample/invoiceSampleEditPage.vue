<template>
  <div class="container">
    <InvoiceSampleEdit ref="invoiceSampleEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import InvoiceSampleEdit from './../../../components/entity/invoice-sample/InvoiceSampleEdit'
export default {
  name: 'InvoiceSampleEditPage',
  components: {
    InvoiceSampleEdit
  },
  data() {
    return {
      loading: false,
      id: null
    }
  },
  created() {
    this.id = parseInt(this.$route.query.id)
  },
  methods: {
    save() {
      this.$refs.invoiceSampleEdit.save()
    },
    resetData() {
      this.$refs.invoiceSampleEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
