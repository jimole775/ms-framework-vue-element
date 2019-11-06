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

import TowingCabinetBoxAddressEnumUtil from './../../../enum/statistics/towing-cabinet/TowingCabinetBoxAddressEnumUtil'

export default {
  name: 'TowingCabinetBoxAddressEnumSelect',
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
          id: '姜山',
          title: TowingCabinetBoxAddressEnumUtil.toTitle('姜山')
        },
        // {
        //   id: '春晓',
        //   title: TowingCabinetBoxAddressEnumUtil.toTitle('春晓')
        // },
        // {
        //   id: '北仑',
        //   title: TowingCabinetBoxAddressEnumUtil.toTitle('北仑')
        // },
        {
          id: '茅山',
          title: TowingCabinetBoxAddressEnumUtil.toTitle('茅山')
        },
        {
          id: '潘火',
          title: TowingCabinetBoxAddressEnumUtil.toTitle('潘火')
        },
        {
          id: '小港',
          title: TowingCabinetBoxAddressEnumUtil.toTitle('小港')
        },
        // {
        //   id: '方桥',
        //   title: TowingCabinetBoxAddressEnumUtil.toTitle('方桥')
        // }
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
