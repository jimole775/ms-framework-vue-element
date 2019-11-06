<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent">
        <template slot="right">
          <el-button v-loading="loading" type="primary" size="mini" @click="onClick('addDataView')">添加信用证</el-button>
        </template>
      </ProcessInfoButton>
    </div>
    <CreditMergeEdit ref="creditMergeEdit" :id="id" @loadingChange="loadingChange" />
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40080"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import CreditMergeEdit from './../../../components/entity/credit-merge/CreditMergeEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'CreditMergeEditPage',
  components: {
    ProcessInfoBlock,
    ProcessInfoButton,
    CreditMergeEdit
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
    resetData() {
      this.$refs.creditMergeEdit.resetData()
    },
    onClick(name) {
      this.emitEvent({
        key: name
      })
    },
    emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(() => {
          this.$refs.creditMergeEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        this.$refs.creditMergeEdit.emitEvent(event)
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
