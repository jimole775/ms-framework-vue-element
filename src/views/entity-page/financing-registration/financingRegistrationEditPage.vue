<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent" />
    </div>
    <div class="container m-t-not">
      <FinancingRegistrationEdit ref="financingRegistrationEdit" :id="id" @loadingChange="loadingChange" @emitEvent="emitEvent" />
    </div>
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40096"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import FinancingRegistrationEdit from './../../../components/entity/financing-registration/FinancingRegistrationEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'

export default {
  name: 'FinancingRegistrationEditPage',
  components: {
    FinancingRegistrationEdit,
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
      this.$refs.financingRegistrationEdit.save()
    },
    resetData() {
      this.$refs.financingRegistrationEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    },
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.financingRegistrationEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.financingRegistrationEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
