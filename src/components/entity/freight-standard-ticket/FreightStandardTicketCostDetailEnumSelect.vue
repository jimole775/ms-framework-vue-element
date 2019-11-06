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

import FreightStandardTicketCostDetailEnumUtil from './../../enum/freight-standard-ticket/FreightStandardTicketCostDetailEnumUtil'

export default {
  name: 'FreightStandardTicketCostDetailEnumSelect', 
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
          id: '1',
          title: FreightStandardTicketCostDetailEnumUtil.toTitle('FUEL_SURCHARGE')
        },
        {
          id: '2',
          title: FreightStandardTicketCostDetailEnumUtil.toTitle('AIR_TRANSPORTATION')
        },
        {
          id: '3',
          title: FreightStandardTicketCostDetailEnumUtil.toTitle('BIG_CUSTOMER')
        },
        {
          id: '4',
          title: FreightStandardTicketCostDetailEnumUtil.toTitle('EU')
        },
        {
          id: '5',
          title: FreightStandardTicketCostDetailEnumUtil.toTitle('CUSTOMS')
        },
        {
          id: '6',
          title: FreightStandardTicketCostDetailEnumUtil.toTitle('VGM')
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
