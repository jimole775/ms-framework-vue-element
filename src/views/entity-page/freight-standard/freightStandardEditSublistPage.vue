<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent" />
    </div>  
    <FreightStandardEditSublist
      ref="freightStandardEdit"
      :id="id"
      @loadingChange="loadingChange"
      @emitEvent="emitEvent" />  
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40074"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>  
  </div>
</template>

<script>
import FreightStandardEditSublist from './../../../components/entity/freight-standard/FreightStandardEditSublist'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'FreightStandardEditSublistPage',
  components: {
    FreightStandardEditSublist,
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
      this.$refs.freightStandardEdit.save()
    },
    resetData() {
      this.$refs.freightStandardEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    },
    emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(() => {
          this.$refs.freightStandardEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        this.$refs.freightStandardEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
