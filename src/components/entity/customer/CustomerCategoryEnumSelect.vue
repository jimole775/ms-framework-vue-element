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

import CustomerCategoryEnumUtil from './../../enum/customer/CustomerCategoryEnumUtil'

export default {
  name: 'CustomerCategoryEnumSelect',
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
          id: 'STORE',
          title: CustomerCategoryEnumUtil.toTitle('STORE')
        },
        {
          id: 'WHOLESALER',
          title: CustomerCategoryEnumUtil.toTitle('WHOLESALER')
        },
        {
          id: 'RETAIL',
          title: CustomerCategoryEnumUtil.toTitle('RETAIL')
        },
        {
          id: 'PROFESSIONAL',
          title: CustomerCategoryEnumUtil.toTitle('PROFESSIONAL')
        },
        {
          id: 'INTERMEDIARY_TRADE',
          title: CustomerCategoryEnumUtil.toTitle('INTERMEDIARY_TRADE')
        },
        {
          id: 'BIG_CUSTOMER',
          title: CustomerCategoryEnumUtil.toTitle('BIG_CUSTOMER')
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
