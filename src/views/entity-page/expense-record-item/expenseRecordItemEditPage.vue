<template>
  <div class="container">
    <ExpenseRecordItemEdit ref="expenseRecordItemEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ExpenseRecordItemEdit from './../../../components/entity/expense-record-item/ExpenseRecordItemEdit'
export default {
  name: 'ExpenseRecordItemEditPage',
  components: {
    ExpenseRecordItemEdit
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
      this.$refs.expenseRecordItemEdit.save()
    },
    resetData() {
      this.$refs.expenseRecordItemEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
