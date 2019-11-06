<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent">
        <template slot="left">
          <el-button
            v-loading="loading"
            type="primary"
            size="mini"
            @click="onClick('goToSpecialDocuments')"
          >跳转特殊单据数据</el-button>
        </template>
        <template slot="left">
          <el-button
            v-loading="loading"
            type="primary"
            size="mini"
            @click="onClick('goToBillDocuments')"
          >跳转提单放单数据</el-button>
        </template>
        <ProcessInfoButton
          ref="processInfoButton"
          :id="id"
          :loading="loading"
          style="float: left;"
          @emitEvent="emitEvent"
        />
      </ProcessInfoButton>
    </div>
    <SubmitOrderEditSublist ref="submitOrderEdit" :id="id" @emitEvent="emitEvent" @loadingChange="loadingChange"/>
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
import SubmitOrderEditSublist from './../../../components/entity/submit-order/SubmitOrderEditSublist'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'SubmitOrderEditSublistPage',
  components: {
    ProcessInfoBlock,
    ProcessInfoButton,
    SubmitOrderEditSublist
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
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.submitOrderEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.submitOrderEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    },
    loadingChange(val) {
      this.loading = val
    },
    onClick(name) {
      this.emitEvent({
        key: name
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
