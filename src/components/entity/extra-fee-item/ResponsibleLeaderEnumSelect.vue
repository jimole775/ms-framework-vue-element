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

import ResponsibleLeaderEnumUtil from './../../enum/extra-fee-item/ResponsibleLeaderEnumUtil'

export default {
  name: 'ResponsibleLeaderEnumSelect',
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
          id: 0,
          title: ResponsibleLeaderEnumUtil.toTitle(0)
        },
        {
          id: 1,
          title: ResponsibleLeaderEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: ResponsibleLeaderEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: ResponsibleLeaderEnumUtil.toTitle(3)
        },
        {
          id: 4,
          title: ResponsibleLeaderEnumUtil.toTitle(4)
        },
        {
          id: 5,
          title: ResponsibleLeaderEnumUtil.toTitle(5)
        },
        {
          id: 6,
          title: ResponsibleLeaderEnumUtil.toTitle(6)
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
