<template>
  <el-input
    v-model="inputValue"
    size="mini"
    @change="changeData"/>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'TableCellInput',
    props: {
      value: {
        type: Number | String,
        default: null
      }
    },
    data() {
      return {
        inputValue: null,
      }
    },
    created() {
      this.inputValue = this.params.data[this.params.colDef.field]
    },
    methods: {
      changeData(val) {
        this.params.data[this.params.colDef.field] = val
      }
    }
  })
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
