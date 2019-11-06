<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent" />
    </div>  
    <ShippingAdvanceEdit
      ref="shippingAdvanceEdit"
      :id="id"
      @loadingChange="loadingChange"
      @emitEvent="emitEvent" />   
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40076"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>   
  </div>
</template>

<script>
import ShippingAdvanceEdit from './../../../components/entity/shipping-advance/ShippingAdvanceEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'ShippingAdvanceEditPage',
  components: {
    ShippingAdvanceEdit,
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
      this.$refs.shippingAdvanceEdit.save()
    },
    resetData() {
      this.$refs.shippingAdvanceEdit.resetData()
    },
    emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(() => {
          this.$refs.shippingAdvanceEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        this.$refs.shippingAdvanceEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
