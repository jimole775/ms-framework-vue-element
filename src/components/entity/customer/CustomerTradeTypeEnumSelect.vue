<template>
  <el-select
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    v-model="selectedValue"
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

import CustomerTradeTypeEnumUtil from './../../enum/customer/CustomerTradeTypeEnumUtil'

export default {
  name: 'CustomerTradeTypeEnumSelect',
  props: {
    value: {
      type: Number | String | Array,
      default: null
    },
    type: {
      type: String,
      default: 'single'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [
        {
          id: 1,
          title: CustomerTradeTypeEnumUtil.toTitle('进出口贸易')
        },
        {
          id: 2,
          title: CustomerTradeTypeEnumUtil.toTitle('香港转口贸易')
        },
        {
          id: 3,
          title: CustomerTradeTypeEnumUtil.toTitle('香港直营')
        },
        {
          id: 5,
          title: CustomerTradeTypeEnumUtil.toTitle('股份直营')
        },
        {
          id: 6,
          title: CustomerTradeTypeEnumUtil.toTitle('新香港转口')
        },
        {
          id: 7,
          title: CustomerTradeTypeEnumUtil.toTitle('新香港直营')
        },
      ],
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
