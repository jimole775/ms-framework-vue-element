<template>
  <el-select
    v-model="selectedValue"
    size="mini"
    @change="change"
  >
    <el-option
      v-for="(item, index) in list"
      :key="index"
      :label="item.desc"
      :value="item.val" />
  </el-select>
</template>
  
<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'TableCellSelect',
  props: {
    value: {
      type: Number | String,
      default: null
    }
  },
  data() {
    return {
      list: [],
      selectedValue: null
    }
  },
  watch: {
    value(value) {
      if (value !== this.selectedValue) {
        this.selectedValue = value
      }
    }
  },
  created() {
    this.list = this.params.colDef.list
    this.selectedValue = this.params.data[this.params.colDef.field]
  },
  methods: {
    change(event) {
      this.$emit('input', event)
      this.params.data[this.params.colDef.field] = event
    }
  }
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
