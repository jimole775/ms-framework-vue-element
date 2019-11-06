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

import PayTypeEnumUtil from './../../enum/freight-pay/PayTypeEnumUtil'

export default {
  name: 'PayTypeEnumSelect',
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
          id: '银行汇款',
          title: PayTypeEnumUtil.toTitle('银行汇款')
        },
        {
          id: '银行承兑',
          title: PayTypeEnumUtil.toTitle('银行承兑')
        },
        {
          id: '转货款',
          title: PayTypeEnumUtil.toTitle('转货款')
        },
        {
          id: '置换支付',
          title: PayTypeEnumUtil.toTitle('置换支付')
        },
        {
          id: '转账支票',
          title: PayTypeEnumUtil.toTitle('转账支票')
        },
        {
          id: '现金',
          title: PayTypeEnumUtil.toTitle('现金')
        },
        {
          id: '其它',
          title: PayTypeEnumUtil.toTitle('其它')
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
