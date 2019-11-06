<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :show="showBtn" :loading="loading" @emitEvent="emitEvent">
        <template slot="right">
          <el-button
            v-loading="loading"
            type="primary"
            size="mini"
            @click="onClick('importCredit')"
          >引用历史信用证</el-button>
          <el-button
            v-loading="loading"
            :disabled="isNoClick"
            type="primary"
            size="mini"
            @click="onClick('addCredit')"
          >新增</el-button>
          <el-button  
            v-loading="loading"
            v-if="isClaim"
            type="primary"
            size="mini"
            @click="onClick('claimUnit')">
            认领
          </el-button>
        </template>
      </ProcessInfoButton>
    </div>
    <div class="container m-t-not">
      <CreditCertificateEdit
        ref="creditCertificateEdit"
        :id="id"
        @hideSubmitBtn="hideSubmitBtn"
        @loadingChange="loadingChange"
        @claimState="claimStateHandle"
        @emitEvent="emitEvent"
      />
    </div>
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
import CreditCertificateEdit from './../../../components/entity/credit-certificate/CreditCertificateEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'

export default {
  name: 'CreditCertificateEditPage',
  components: {
    CreditCertificateEdit,
    ProcessInfoBlock,
    ProcessInfoButton
  },
  data() {
    return {
      loading: false,
      isNoClick: false,
      id: null,
      isClaim: false,
      showBtn: 0
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? parseInt(id) : null
    if (!this.id) {
      this.isNoClick = true
    }
  },
  methods: {
    loadingChange(val) {
      this.loading = val
    },
    hideSubmitBtn() {
      this.showBtn = 1
    },
    onClick(name) {
      this.emitEvent({
        key: name
      })
    },
    claimStateHandle(val) {
      this.isClaim = val
    },
    async emitEvent(event) {
      if (
        event.key === 'update' &&
        event.params != null &&
        event.params.id != null
      ) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.creditCertificateEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.creditCertificateEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
