<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :show="showBtn" :loading="loading" @emitEvent="emitEvent">
        <!-- <template slot="right">
          <el-button v-loading="loading" type="primary" size="mini">引用收货人备案</el-button>
          <el-button v-loading="loading" type="primary" size="mini">引用发货人备案</el-button>
        </template>-->
      </ProcessInfoButton>
    </div>
    <CreditChangeEdit ref="creditChangeEdit" :id="id" @hideSubmitBtn="hideSubmitBtn" @loadingChange="loadingChange"/>
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40079"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import CreditChangeEdit from './../../../components/entity/credit-change/CreditChangeEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'CreditChangeEditPage',
  components: {
    ProcessInfoBlock,
    ProcessInfoButton,
    CreditChangeEdit
  },
  data() {
    return {
      loading: false,
      id: null,
      showBtn: 0,
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
    async emitEvent(event) {
      if (
        event.key === 'update' &&
        event.params != null &&
        event.params.id != null
      ) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.creditChangeEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.creditChangeEdit.emitEvent(event)
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
