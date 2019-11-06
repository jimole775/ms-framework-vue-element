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

import FreightStandardContainerCostDetailEnumUtil from './../../enum/freight-standard-container/FreightStandardContainerCostDetailEnumUtil'

export default {
  name: 'FreightStandardContainerCostDetailEnumSelect',
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
          id: '0',
          title: FreightStandardContainerCostDetailEnumUtil.toTitle('0')
        },
        {
          id: '1',
          title: FreightStandardContainerCostDetailEnumUtil.toTitle('1')
        },
        {
          id: '2',
          title: FreightStandardContainerCostDetailEnumUtil.toTitle('2')
        },
        {
          id: '3',
          title: FreightStandardContainerCostDetailEnumUtil.toTitle('3')
        },
        {
          id: '4',
          title: FreightStandardContainerCostDetailEnumUtil.toTitle('4')
        },
        {
          id: '5',
          title: FreightStandardContainerCostDetailEnumUtil.toTitle('5')
        },
        {
          id: '6',
          title: FreightStandardContainerCostDetailEnumUtil.toTitle('6')
        },
        {
          id: '7',
          title: FreightStandardContainerCostDetailEnumUtil.toTitle('7')
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
