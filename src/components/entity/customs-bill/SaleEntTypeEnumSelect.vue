<template>
  <el-select
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    v-model="selectedValue"
    :disabled="disabled"
    size="mini"
    filterable
    class="max-w"
    @change="change"
  >
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.title"
      :value="item.id" />
  </el-select>
</template>
  
<script>

import SaleEntTypeEnumUtil1 from './../../enum/customs-bill/SaleEntTypeEnumUtil1'
import SaleEntTypeEnumUtil2 from './../../enum/customs-bill/SaleEntTypeEnumUtil2'

export default {
  name: 'SaleEntTypeEnumSelect',
  props: {
    value: {
      type: Number | String | Array,
      default: null
    },
    type: {
      type: String,
      default: 'single'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [],
      selectedValue: null,
      loading: false
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
    if (this.type === 'multiple') {
      this.selectedValue = this.value || []
    } else {
      this.selectedValue = this.value
    }
    const entId = this.$store.getters.entid
    if (entId === 101) {
      for (let i = 1; i <= 7; i++) {
        this.list.push({
          id: i,
          title: SaleEntTypeEnumUtil1.toTitle(i)
        })
      }
    } else if (entId === 102) {
      for (let i = 1; i <= 7; i++) {
        this.list.push({
          id: i,
          title: SaleEntTypeEnumUtil2.toTitle(i)
        })
      }
    } 
  },
  methods: {
    change(event) {
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
