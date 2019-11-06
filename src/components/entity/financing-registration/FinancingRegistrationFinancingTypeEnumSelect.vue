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

import FinancingRegistrationFinancingTypeEnumUtil from './../../enum/financing-registration/FinancingRegistrationFinancingTypeEnumUtil'

export default {
  name: 'FinancingRegistrationFinancingTypeEnumSelect',
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
    filter: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      list: [],
      selectedValue: null,
      loading: false
    }
  },
  watch: {
    value(value) {
      if (value !== this.selectedValue) {
        this.selectedValue = value
      }
    },
    filter() {
      this.initList()
    }
  },
  created() {
    this.initList()
    if (this.type === 'multiple') {
      this.selectedValue = this.value || []
    } else {
      this.selectedValue = this.value
    }
  },
  methods: {
    change(event) {
      this.$emit('input', event)
    },
    initList() {
      this.list = []
      const filter = this.filter
      if (filter.includes(1) || filter.length < 1) {
        this.list.push({
          id: 1,
          title: FinancingRegistrationFinancingTypeEnumUtil.toTitle(1)
        })
      }
      if (filter.includes(2) || filter.length < 1) {
        this.list.push({
          id: 2,
          title: FinancingRegistrationFinancingTypeEnumUtil.toTitle(2)
        })
      }
      if (filter.includes(3) || filter.length < 1) {
        this.list.push({
          id: 3,
          title: FinancingRegistrationFinancingTypeEnumUtil.toTitle(3)
        })
      }
      if (filter.includes(4) || filter.length < 1) {
        this.list.push({
          id: 4,
          title: FinancingRegistrationFinancingTypeEnumUtil.toTitle(4)
        })
      }
      if (filter.includes(5) || filter.length < 1) {
        this.list.push({
          id: 5,
          title: FinancingRegistrationFinancingTypeEnumUtil.toTitle(5)
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
