<template>
  <el-select
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    :disabled="disabled"
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

import IrregularInvoiceOrderStatusEnumUtil from './../../enum/irregular-invoice/IrregularInvoiceOrderStatusEnumUtil'

export default {
  name: 'IrregularInvoiceOrderStatusEnumSelect',
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [
        {
          id: 1,
          title: IrregularInvoiceOrderStatusEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: IrregularInvoiceOrderStatusEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: IrregularInvoiceOrderStatusEnumUtil.toTitle(3)
        },
        {
          id: 4,
          title: IrregularInvoiceOrderStatusEnumUtil.toTitle(4)
        },
        {
          id: 5,
          title: IrregularInvoiceOrderStatusEnumUtil.toTitle(5)
        },
        {
          id: 10,
          title: IrregularInvoiceOrderStatusEnumUtil.toTitle(10)
        },
        {
          id: 99,
          title: IrregularInvoiceOrderStatusEnumUtil.toTitle(99)
        }
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
