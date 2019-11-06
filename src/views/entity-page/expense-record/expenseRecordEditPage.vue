<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent" />
    </div> 
    <ExpenseRecordEdit 
      ref="expenseRecordEdit" 
      :id="id" 
      @loadingChange="loadingChange" 
      @emitEvent="emitEvent" />   
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40089"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>   
  </div>
</template>

<script>
import ExpenseRecordEdit from './../../../components/entity/expense-record/ExpenseRecordEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'ExpenseRecordEditPage',
  components: {
    ExpenseRecordEdit,
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
    this.id = id != null && id !== 'new' ? parseInt(id) : null
  },
  methods: {
    save() {
      this.$refs.expenseRecordEdit.save()
    },
    resetData() {
      this.$refs.expenseRecordEdit.resetData()
    },
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.expenseRecordEdit.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.expenseRecordEdit.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
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
