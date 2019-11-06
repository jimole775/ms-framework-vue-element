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

import ShipCabinOrderLogStatusEnumUtil from './../../enum/ship-cabin-order/ShipCabinOrderLogStatusEnumUtil'

export default {
  name: 'ShipCabinOrderLogStatusEnumSelect',
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
      default: true
    }
  },
  data() {
    return {
      list: [
        {
          id: 1,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(3)
        },
        {
          id: 4,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(4)
        },
        {
          id: 5,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(5)
        },
        {
          id: 6,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(6)
        },
        {
          id: 7,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(7)
        },
        {
          id: 8,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(8)
        },
        {
          id: 9,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(9)
        },
        {
          id: 10,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(10)
        },
        {
          id: 11,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(11)
        },
        {
          id: 12,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(12)
        },
        {
          id: 13,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(13)
        },
        {
          id: 14,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(14)
        },
        {
          id: 15,
          title: ShipCabinOrderLogStatusEnumUtil.toTitle(15)
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
