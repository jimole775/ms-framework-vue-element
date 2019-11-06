<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :show="showBtn" :loading="loading" @emitEvent="emitEvent">
        <template slot="right">
          <el-button v-loading="loading" type="primary" size="mini" @click="onClick('toVoid')">作废</el-button>
        </template>
      </ProcessInfoButton>
    </div>
    <CreditCloseEdit ref="creditCloseEdit" :id="id" @hideSubmitBtn="hideSubmitBtn" @loadingChange="loadingChange" />
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40075"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import CreditCloseEdit from './../../../components/entity/credit-close/CreditCloseEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'CreditCloseEditPage',
  components: {
    ProcessInfoBlock,
    ProcessInfoButton,
    CreditCloseEdit
  },
  data() {
    return {
      loading: false,
      id: null,
      showBtn: 0
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? parseInt(id) : null
  },
  methods: {
    hideSubmitBtn() {
      this.showBtn = 1
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
          this.$refs.creditCloseEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        this.$refs.creditCloseEdit.emitEvent(event)
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
