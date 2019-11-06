<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent">
        <template slot="left">
          <el-button
            v-loading="loading"
            type="primary"
            size="mini"
            @click="onClick"
          >信保审批导出</el-button>
        </template>
      </ProcessInfoButton>
    </div>
    <div class="container m-t-not">
      <DeliverReportEdit
        ref="deliverReportEdit"
        :id="id"
        @loadingChange="loadingChange"
        @emitEvent="emitEvent"
      />
    </div>
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40081"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import DeliverReportEdit from './../../../components/entity/deliver-report/DeliverReportEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'DeliverReportEditPage',
  components: {
    DeliverReportEdit,
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
    this.id = id != null && id !== 'new' ? parseInt(id) : null
  },
  methods: {
    onClick() {
      this.$refs.deliverReportEdit.approvingExport(event)
    },
    save() {
      this.$refs.deliverReportEdit.save()
    },
    resetData() {
      this.$refs.deliverReportEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    },
    emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(() => {
          this.$refs.deliverReportEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        this.$refs.deliverReportEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
