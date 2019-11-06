<template>
  <el-select
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    v-model="selectedValue"
    :disabled="disabled"
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
/**
 * 由于后端偶尔返回的是null = '未报关'，有时候返回的是 -1 = '未报关'，所以只能特地复制出一个Select组件，给有 -1 的部件使用
 * */
import CustomsBillCustomsStatusEnumUtil from './../../enum/customs-bill/CustomsBillCustomsStatusEnumUtil_forCustMgr'

export default {
  name: 'CustomsStatEnumSelectForCustMgr',
  props: {
    value: {
      type: Number | String | Array,
      default: null
    },
    type: {
      type: String,
      default: 'single'
    },
    disabled: {
      type: Boolean,
      default: false
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
          id: '-1',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('-1')
        },
        {
          id: '00',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('00')
        },
        {
          id: '01',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('01')
        },
        {
          id: '02',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('02')
        },
        {
          id: '03',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('03')
        },
        {
          id: '04',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('04')
        },
        {
          id: '05',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('05')
        },
        {
          id: '06',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('06')
        },
        {
          id: '07',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('07')
        },
        {
          id: '08',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('08')
        },
        {
          id: '09',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('09')
        },
        {
          id: '10',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('10')
        },
        {
          id: '11',
          title: CustomsBillCustomsStatusEnumUtil.toTitle('11')
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
