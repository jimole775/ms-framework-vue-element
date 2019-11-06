<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent"/>
    </div>
    <CustomsBillFedEdit ref="customsBillFedEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40102"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import CustomsBillFedEdit from './../../../components/entity/customs-bill-fed/CustomsBillFedEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'CustomsBillFedEditPage',
  components: {
    ProcessInfoBlock,
    ProcessInfoButton,
    CustomsBillFedEdit
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
    emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(() => {
          this.$refs.customsBillFedEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        this.$refs.customsBillFedEdit.emitEvent(event)
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
