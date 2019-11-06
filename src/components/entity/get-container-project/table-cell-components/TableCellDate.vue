<template>
  <el-date-picker 
    v-model="dateVal"
    :clearable="false"
    style="width:100%"
    size="mini" 
    type="date" 
    placeholder="选择年月"
    value-format="yyyy-MM-dd"
    @change="changeData" />
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'TableCellDate',
    props: {
      value: {
        type: Number | String,
        default: null
      }
    },
    data() {
      return {
        dateVal: null,
      }
    },
    created() {
      this.dateVal = this.params.data[this.params.colDef.field]
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
