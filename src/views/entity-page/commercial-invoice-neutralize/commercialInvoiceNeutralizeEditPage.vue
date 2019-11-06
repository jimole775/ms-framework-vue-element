<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :show="showBtn" :loading="loading" @emitEvent="emitEvent">
        <template slot="left">
          <el-button v-loading="loading" :disabled="isClick" type="primary" size="mini" @click="onClick('goToSpecialDocuments')" @insertClick="insertClick">跳转特殊申请单数据</el-button>
        </template>
      </ProcessInfoButton>
    </div>
    <div class="container m-t-not">
      <CommercialInvoiceNeutralizeEdit
        ref="commercialInvoiceNeutralizeEdit"
        :id="id"
        :no="no"
        @hideSubmitBtn="hideSubmitBtn"
        @loadingChange="loadingChange"
        @emitEvent="emitEvent"
      />
    </div>
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40105"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>

    <!-- <div class="container">
      <CommercialInvoiceNeutralizeEdit ref="commercialInvoiceEdit" :id="id" :no="no" @loadingChange="loadingChange" />
    </div> -->
  </div>
</template>

<script>
import CommercialInvoiceNeutralizeEdit from './../../../components/entity/commercial-invoice-neutralize/CommercialInvoiceNeutralizeEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'CommercialInvoiceNeutralizeEditPage',
  components: {
    CommercialInvoiceNeutralizeEdit,
    ProcessInfoBlock,
    ProcessInfoButton
  },
  data() {
    return {
      loading: false,
      id: null,
      no: null,
      isClick: true,
      showBtn: 0
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? id : null
    const isClick = id != null && id !== 'new'
    this.isClick = !isClick
    // this.isClick = id != null && id !== 'new' ? false : true

    const no = this.$route.query.no
    this.no = no != null || no !== undefined ? no : null
  },
  methods: {
    save() {
      this.$refs.commercialInvoiceEdit.save()
    },
    hideSubmitBtn() {
      this.showBtn = 1
    },
    resetData() {
      this.$refs.commercialInvoiceEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    },
    onClick(name) {
      this.emitEvent({
        key: name
      })
    },
    insertClick(val) {
      this.isClick = val
    },
    emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(() => {
          this.$refs.commercialInvoiceNeutralizeEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        this.$refs.commercialInvoiceNeutralizeEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
