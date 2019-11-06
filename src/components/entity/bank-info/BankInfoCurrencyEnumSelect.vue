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

import BankInfoCurrencyEnumUtil from './../../enum/bank-info/BankInfoCurrencyEnumUtil'

export default {
  name: 'BankInfoCurrencyEnumSelect',
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
          id: 'USD',
          title: BankInfoCurrencyEnumUtil.toTitle('USD')
        },
        {
          id: 'CNY',
          title: BankInfoCurrencyEnumUtil.toTitle('CNY')
        },
        {
          id: 'EUR',
          title: BankInfoCurrencyEnumUtil.toTitle('EUR')
        },
        {
          id: 'HK$',
          title: BankInfoCurrencyEnumUtil.toTitle('HK$')
        },
        {
          id: 'GBP',
          title: BankInfoCurrencyEnumUtil.toTitle('GBP')
        },
        {
          id: 'THB',
          title: BankInfoCurrencyEnumUtil.toTitle('THB')
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
