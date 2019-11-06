<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent" />
    </div>
    <div class="container m-t-not">
      <IrregularInvoiceEdit ref="irregularInvoiceEdit" :id="id" @loadingChange="loadingChange" @emitEvent="emitEvent" />
    </div>
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40099"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import IrregularInvoiceEdit from './../../../components/entity/irregular-invoice/IrregularInvoiceEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'

export default {
  name: 'IrregularInvoiceEditPage',
  components: {
    IrregularInvoiceEdit,
    ProcessInfoBlock,
    ProcessInfoButton
  },
  data() {
    return {
      loading: false,
      id: null
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? parseInt(id) : null
  },
  methods: {
    save() {
      this.$refs.irregularInvoiceEdit.save()
    },
    resetData() {
      this.$refs.irregularInvoiceEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    },
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.irregularInvoiceEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.irregularInvoiceEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
