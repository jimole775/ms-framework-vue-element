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

import OrderNoticeNoticeTypeEnumUtil from './../../enum/order-notice/OrderNoticeNoticeTypeEnumUtil'

export default {
  name: 'OrderNoticeNoticeTypeEnumSelect',
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
    },
  },
  data() {
    return {
      list: [
        {
          id: 1,
          title: OrderNoticeNoticeTypeEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: OrderNoticeNoticeTypeEnumUtil.toTitle(2)
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
        res = { ...res }
      }
      this.$emit('changeData', res)
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
