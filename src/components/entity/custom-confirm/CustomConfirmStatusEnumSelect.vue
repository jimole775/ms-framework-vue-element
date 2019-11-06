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

import CustomConfirmStatusEnumUtil from './../../enum/custom-confirm/CustomConfirmStatusEnumUtil'

export default {
  name: 'CustomConfirmStatusEnumSelect',
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
          title: CustomConfirmStatusEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: CustomConfirmStatusEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: CustomConfirmStatusEnumUtil.toTitle(3)
        },
        {
          id: 4,
          title: CustomConfirmStatusEnumUtil.toTitle(4)
        },
        {
          id: 5,
          title: CustomConfirmStatusEnumUtil.toTitle(5)
        },
        {
          id: 10,
          title: CustomConfirmStatusEnumUtil.toTitle(10)
        },
        {
          id: 99,
          title: CustomConfirmStatusEnumUtil.toTitle(99)
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
