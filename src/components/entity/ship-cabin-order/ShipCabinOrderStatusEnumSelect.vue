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

import ShipCabinOrderStatusEnumUtil from './../../enum/ship-cabin-order/ShipCabinOrderStatusEnumUtil'

export default {
  name: 'ShipCabinOrderStatusEnumSelect',
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
          title: ShipCabinOrderStatusEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: ShipCabinOrderStatusEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: ShipCabinOrderStatusEnumUtil.toTitle(3)
        },
        {
          id: 4,
          title: ShipCabinOrderStatusEnumUtil.toTitle(4)
        },
        {
          id: 5,
          title: ShipCabinOrderStatusEnumUtil.toTitle(5)
        },
        {
          id: 6,
          title: ShipCabinOrderStatusEnumUtil.toTitle(6)
        },
        {
          id: 7,
          title: ShipCabinOrderStatusEnumUtil.toTitle(7)
        },
        {
          id: 8,
          title: ShipCabinOrderStatusEnumUtil.toTitle(8)
        },
        {
          id: 10,
          title: ShipCabinOrderStatusEnumUtil.toTitle(10)
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
