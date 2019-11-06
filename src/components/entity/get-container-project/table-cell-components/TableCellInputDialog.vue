<template>
  <el-input :clear="true" v-model="inputValue" size="mini" @focus="eventEmit"/>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'TableCellInputDialog',
    props: {
    },
    data() {
      return {
      }
    },
    computed: {
      inputValue() {
        return this.params.data[this.params.colDef.field]
      }
    },
    created() {
    },  
    methods: {
      eventEmit(val) {
        this.params.colDef.action(this.params)
      }
    }
  })
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
