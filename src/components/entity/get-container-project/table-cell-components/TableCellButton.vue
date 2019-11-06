<template>
  <el-button @click="eventEmit"/>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'TableCellButton',
    props: {
    },
    data() {
      return {
        row: null,
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
