<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent" />
    </div>
    <div class="container m-t-not">
      <SubmitOrderEdit ref="submitOrderEdit" :id="id" @loadingChange="loadingChange" @emitEvent="emitEvent" />
    </div>
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40087"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import SubmitOrderEdit from './../../../components/entity/submit-order/SubmitOrderEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'

export default {
  name: 'SubmitOrderEditPage',
  components: {
    SubmitOrderEdit,
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
    this.id = id != null && id !== 'new' ? id : null
  },
  methods: {
    save() {
      this.$refs.submitOrderEdit.save()
    },
    resetData() {
      this.$refs.submitOrderEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    },
    emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(() => {
          this.$refs.submitOrderEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        this.$refs.submitOrderEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
