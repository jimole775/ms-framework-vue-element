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

import ActSaleBookingDeliveryReportSelectPayStyleEnumUtil from './../../../enum/statistics/act-sale-booking-delivery-report-select/ActSaleBookingDeliveryReportSelectPayStyleEnumUtil'

export default {
  name: 'ActSaleBookingDeliveryReportSelectPayStyleEnumSelect',
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
          title: ActSaleBookingDeliveryReportSelectPayStyleEnumUtil.toTitle('1')
        },
        {
          id: '2',
          title: ActSaleBookingDeliveryReportSelectPayStyleEnumUtil.toTitle('2')
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
