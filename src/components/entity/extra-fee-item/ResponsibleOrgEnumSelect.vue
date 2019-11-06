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

import ResponsibleOrgEnumUtil from './../../enum/extra-fee-item/ResponsibleOrgEnumUtil'

export default {
  name: 'ResponsibleOrgEnumSelect',
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
          title: ResponsibleOrgEnumUtil.toTitle(0)
        },
        {
          id: 1,
          title: ResponsibleOrgEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: ResponsibleOrgEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: ResponsibleOrgEnumUtil.toTitle(3)
        },
        {
          id: 4,
          title: ResponsibleOrgEnumUtil.toTitle(4)
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
