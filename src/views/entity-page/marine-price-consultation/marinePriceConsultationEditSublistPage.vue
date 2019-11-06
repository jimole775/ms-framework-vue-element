<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent">
        <template slot="right">
          <el-button v-loading="loading" v-show="isAudit === true" type="primary" size="mini" @click="onClick('auditReturn')">询价回写oms</el-button>
          <el-button
            v-loading="loading"
            :disabled="stat !== true"
            type="primary"
            icon="el-icon-delete"
            size="mini"
            @click="onClick('delete')">
            删除
          </el-button>
        </template>
      </ProcessInfoButton>  
    </div>
    <MarinePriceConsultationEditSublist 
      ref="marinePriceConsultationEdit" 
      :id="id" 
      @loadingChange="loadingChange"
      @isAuditChane1="isAuditChane1"
      @isAuditChane="isAuditChane" />    
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40078"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import MarinePriceConsultationEditSublist from './../../../components/entity/marine-price-consultation/MarinePriceConsultationEditSublist'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'MarinePriceConsultationEditSublistPage',
  components: {
    ProcessInfoBlock,
    ProcessInfoButton,
    MarinePriceConsultationEditSublist
  },
  data() {
    return {
      loading: false,
      id: null,
      isAudit: false,
      stat: false
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? parseInt(id) : null
  },
  methods: {
    onClick(name) {
      this.emitEvent({ key: name })
    },
    save() {
      this.$refs.marinePriceConsultationEdit.save()
    },
    resetData() {
      this.$refs.marinePriceConsultationEdit.resetData()
    },
    isAuditChane(val) {
      this.isAudit = val
    },
    isAuditChane1(val) {
      this.stat = val
    },
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.marinePriceConsultationEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.marinePriceConsultationEdit.emitEvent(event)
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
