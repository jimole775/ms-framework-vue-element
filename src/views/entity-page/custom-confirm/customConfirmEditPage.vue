<template>
  <div >
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent" />
    </div>
    <CustomConfirmEdit 
      ref="customConfirmEdit"
      :id="id" 
      @loadingChange="loadingChange"
      @emitEvent="emitEvent" /> 
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40095"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>      
  </div>
</template>

<script>
import CustomConfirmEdit from './../../../components/entity/custom-confirm/CustomConfirmEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'CustomConfirmEditPage',
  components: {
    CustomConfirmEdit,
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
      this.$refs.customConfirmEdit.save()
    },
    resetData() {
      this.$refs.customConfirmEdit.resetData()
    },
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.customConfirmEdit.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.customConfirmEdit.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
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
