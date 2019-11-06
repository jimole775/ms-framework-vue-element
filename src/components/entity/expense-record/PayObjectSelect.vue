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

import FreightAdvanceStatusEnumUtil from './../../enum/expense-record/PayObjectSelectUtil'

export default {
  name: 'PayObjectSelect',
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
    index: {
      type: Number | String,
      default: null
    },
    // disabled: {
    //   type: Boolean,
    //   default: true
    // }
  },
  data() {
    return {
      list: [
        {
          id: 1,
          title: FreightAdvanceStatusEnumUtil.toTitle(1)
        },
        {
          id: 2,
          title: FreightAdvanceStatusEnumUtil.toTitle(2)
        },
        {
          id: 3,
          title: FreightAdvanceStatusEnumUtil.toTitle(3)
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
      let res
      this.list.forEach(item => {
        if (item.id === this.selectedValue) {
          res = item
        }
      })
      if (this.index != null) {
        res = {
          ...res,
          $index: this.index
        }
      }
      this.$emit('changeData', res)
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

