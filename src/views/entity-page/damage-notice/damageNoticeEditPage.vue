<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent" />
    </div>
    <div class="container m-t-not">
      <DamageNoticeEdit
        ref="damageNoticeEdit"
        :id="id"
        @loadingChange="loadingChange"
        @emitEvent="emitEvent"
      />
    </div>
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40083"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import DamageNoticeEdit from './../../../components/entity/damage-notice/DamageNoticeEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'

export default {
  name: 'DamageNoticeEditPage',
  components: {
    DamageNoticeEdit,
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
    // this.id = this.$route.params.id
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? id : null
    console.log(this.id)
    // this.id = this.$route.query.id
  },
  methods: {
    save() {
      this.$refs.damageNoticeEdit.save()
    },
    resetData() {
      this.$refs.damageNoticeEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    },
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.damageNoticeEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.damageNoticeEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
