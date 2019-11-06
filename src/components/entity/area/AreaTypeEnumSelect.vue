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

import AreaTypeEnumUtil from './../../enum/area/AreaTypeEnumUtil'

export default {
  name: 'AreaTypeEnumSelect',
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
          id: 1,
          title: AreaTypeEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: AreaTypeEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: AreaTypeEnumUtil.toTitle(3)
        },
        {
          id: 4,
          title: AreaTypeEnumUtil.toTitle(4)
        },
        {
          id: 5,
          title: AreaTypeEnumUtil.toTitle(5)
        },
        {
          id: 6,
          title: AreaTypeEnumUtil.toTitle(6)
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
