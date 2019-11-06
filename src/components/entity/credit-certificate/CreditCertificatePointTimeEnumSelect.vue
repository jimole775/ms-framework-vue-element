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

import CreditCertificatePointTimeEnumUtil from './../../enum/credit-certificate/CreditCertificatePointTimeEnumUtil'

export default {
  name: 'CreditCertificatePointTimeEnumSelect',
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
      list: [
        {
          id: 1,
          title: CreditCertificatePointTimeEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: CreditCertificatePointTimeEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: CreditCertificatePointTimeEnumUtil.toTitle(3)
        },
        {
          id: 4,
          title: CreditCertificatePointTimeEnumUtil.toTitle(4)
        },
        {
          id: 5,
          title: CreditCertificatePointTimeEnumUtil.toTitle(5)
        },
        {
          id: 6,
          title: CreditCertificatePointTimeEnumUtil.toTitle(6)
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
