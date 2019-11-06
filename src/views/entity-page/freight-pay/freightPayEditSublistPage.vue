<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent" />
    </div>
    <FreightPayEditSublist 
      ref="freightPayEdit" 
      :id="id" 
      @loadingChange="loadingChange"
      @emitEvent="emitEvent" />
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40088"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>     
  </div>
</template>

<script>
import FreightPayEditSublist from './../../../components/entity/freight-pay/FreightPayEditSublist'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'FreightPayEditSublistPage',
  components: {
    FreightPayEditSublist,
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
      this.$refs.freightPayEdit.save()
    },
    resetData() {
      this.$refs.freightPayEdit.resetData()
    },
    emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
      }
      this.$refs.freightPayEdit.emitEvent(event)
      this.$refs.ProcessInfoBlock.emitEvent(event)
      this.$refs.processInfoButton.emitEvent(event)
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
