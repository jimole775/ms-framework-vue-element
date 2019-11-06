<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :check="showBtn" :loading="loading" @emitEvent="emitEvent"/>
    </div>
    <ShippingCompanyEditSublist ref="shippingCompanyEdit" :id="id" @loadingChange="loadingChange" @showSaveBtn="showSaveBtn" @emitEvent="emitEvent"/>
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40103"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>  
  </div>
</template>

<script>
import ShippingCompanyEditSublist from './../../../components/entity/shipping-company/ShippingCompanyEditSublist'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'ShippingCompanyEditSublistPage',
  components: {
    ProcessInfoBlock,
    ProcessInfoButton,
    ShippingCompanyEditSublist
  },
  data() {
    return {
      showBtn: 0,
      loading: false,
      id: null
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? parseInt(id) : null
  },
  methods: {
    showSaveBtn() {
      this.showBtn = 1
    },
    onClick(name) {
      this.emitEvent({
        key: name
      })
    },
    save() {
      this.$refs.shippingCompanyEdit.save()
    },
    resetData() {
      this.$refs.shippingCompanyEdit.resetData()
    },
    emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(() => {
          this.$refs.shippingCompanyEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        this.$refs.shippingCompanyEdit.emitEvent(event)
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
