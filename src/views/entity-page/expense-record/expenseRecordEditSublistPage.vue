<template>
  <div>
    <ExpenseRecordEditSublist ref="expenseRecordEdit" :id="id" @loadingChange="loadingChange" />    
  </div>
</template>

<script>
import ExpenseRecordEditSublist from './../../../components/entity/expense-record/ExpenseRecordEditSublist'
export default {
  name: 'ExpenseRecordEditSublistPage',
  components: {
    ExpenseRecordEditSublist
  },
  data() {
    return {
      loading: false,
      id: null
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  methods: {
    save() {
      this.$refs.expenseRecordEdit.save()
    },
    resetData() {
      this.$refs.expenseRecordEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
