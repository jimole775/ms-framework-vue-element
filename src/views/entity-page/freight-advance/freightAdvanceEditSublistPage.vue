<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent" />
    </div> 
    <FreightAdvanceEditSublist
      ref="freightAdvanceEdit"
      :id="id" 
      @loadingChange="loadingChange" 
      @emitEvent="emitEvent" />    
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40077"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>    
  </div>
</template>

<script>
import FreightAdvanceEditSublist from './../../../components/entity/freight-advance/FreightAdvanceEditSublist'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'FreightAdvanceEditSublistPage',
  components: {
    FreightAdvanceEditSublist,
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
      this.$refs.freightAdvanceEdit.save()
    },
    resetData() {
      this.$refs.freightAdvanceEdit.resetData()
    },
    emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(() => {
          this.$refs.freightAdvanceEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        this.$refs.freightAdvanceEdit.emitEvent(event)
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
