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

import CreditCertificatePlaceOfOriginCertificateEnumUtil from './../../enum/credit-certificate/CreditCertificatePlaceOfOriginCertificateEnumUtil'

export default {
  name: 'CreditCertificatePlaceOfOriginCertificateEnumSelect',
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
          title: CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitle(3)
        },
        {
          id: 4,
          title: CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitle(4)
        },
        {
          id: 5,
          title: CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitle(5)
        },
        {
          id: 6,
          title: CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitle(6)
        },
        {
          id: 7,
          title: CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitle(7)
        },
        {
          id: 8,
          title: CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitle(8)
        },
        {
          id: 9,
          title: CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitle(9)
        },
        {
          id: 10,
          title: CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitle(10)
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
      let res
      this.list.forEach(item => {
        if (item.id === this.selectedValue) {
          res = item
        }
      })
      if (this.index != null) {
        res = {
          ...res,
          $index: this.index
        }
      }
      this.$emit('changeData', res)
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
