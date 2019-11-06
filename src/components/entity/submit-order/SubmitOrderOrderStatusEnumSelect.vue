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

import SubmitOrderOrderStatusEnumUtil from './../../enum/submit-order/SubmitOrderOrderStatusEnumUtil'

export default {
  name: 'SubmitOrderOrderStatusEnumSelect',
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
          title: SubmitOrderOrderStatusEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: SubmitOrderOrderStatusEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: SubmitOrderOrderStatusEnumUtil.toTitle(3)
        },
        {
          id: 4,
          title: SubmitOrderOrderStatusEnumUtil.toTitle(4)
        },
        {
          id: 5,
          title: SubmitOrderOrderStatusEnumUtil.toTitle(5)
        },
        {
          id: 10,
          title: SubmitOrderOrderStatusEnumUtil.toTitle(10)
        },
        {
          id: 99,
          title: SubmitOrderOrderStatusEnumUtil.toTitle(99)
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
