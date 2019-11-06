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

import ShippingCompanyStatusEnumUtil from './../../enum/shipping-company/ShippingCompanyStatusEnumUtil'

export default {
  name: 'ShippingCompanyStatusEnumSelect',
  props: {
    value: {
      type: Number | String | Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
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
          title: ShippingCompanyStatusEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: ShippingCompanyStatusEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: ShippingCompanyStatusEnumUtil.toTitle(3)
        },
        {
          id: 4,
          title: ShippingCompanyStatusEnumUtil.toTitle(4)
        },
        {
          id: 5,
          title: ShippingCompanyStatusEnumUtil.toTitle(5)
        },
        {
          id: 10,
          title: ShippingCompanyStatusEnumUtil.toTitle(10)
        },
        {
          id: 99,
          title: ShippingCompanyStatusEnumUtil.toTitle(99)
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
