<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent" />
    </div>
    <div class="container m-t-not">
      <OrderNoticeEdit ref="orderNoticeEdit" :id="id" @loadingChange="loadingChange" @emitEvent="emitEvent" />
    </div>
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40093"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import OrderNoticeEdit from './../../../components/entity/order-notice/OrderNoticeEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'

export default {
  name: 'OrderNoticeEditPage',
  components: {
    OrderNoticeEdit,
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
      this.$refs.orderNoticeEdit.save()
    },
    resetData() {
      this.$refs.orderNoticeEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    },
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(() => {
          this.$refs.orderNoticeEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.orderNoticeEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
