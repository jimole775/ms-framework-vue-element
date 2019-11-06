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

import ShippingPayPaymentMethodEnumUtil from './../../enum/shipping-pay/ShippingPayPaymentMethodEnumUtil'

export default {
  name: 'ShippingPayPaymentMethodEnumSelect',
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
          id: 'BANK_REMITTANCE',
          title: ShippingPayPaymentMethodEnumUtil.toTitle('BANK_REMITTANCE')
        },
        {
          id: 'BANK_ACCEPTANCE',
          title: ShippingPayPaymentMethodEnumUtil.toTitle('BANK_ACCEPTANCE')
        },
        {
          id: 'SUB_LOAN',
          title: ShippingPayPaymentMethodEnumUtil.toTitle('SUB_LOAN')
        },
        {
          id: 'REPLACEMENT_PAY',
          title: ShippingPayPaymentMethodEnumUtil.toTitle('REPLACEMENT_PAY')
        },
        {
          id: 'CHECK',
          title: ShippingPayPaymentMethodEnumUtil.toTitle('CHECK')
        },
        {
          id: 'CASH',
          title: ShippingPayPaymentMethodEnumUtil.toTitle('CASH')
        },
        {
          id: 'OTHER',
          title: ShippingPayPaymentMethodEnumUtil.toTitle('OTHER')
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
