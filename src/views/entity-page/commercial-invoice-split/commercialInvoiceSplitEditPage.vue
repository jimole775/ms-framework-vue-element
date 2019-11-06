<template>
  <div class="container">
    <CommercialInvoiceSplitEdit ref="commercialInvoiceEdit" :id="id" @loadingChange="loadingChange" />    
  </div>
</template>

<script>
import CommercialInvoiceSplitEdit from './../../../components/entity/commercial-invoice-split/CommercialInvoiceSplitEdit'
export default {
  name: 'CommercialInvoiceSplitEditPage',
  components: {
    CommercialInvoiceSplitEdit
  },
  data() {
    return {
      loading: false,
      id: null
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? id : null
  },
  methods: {
    save() {
      this.$refs.commercialInvoiceEdit.save()
    },
    resetData() {
      this.$refs.commercialInvoiceEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
