<template>
  <el-select
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    :disabled="disabled"
    v-model="selectedValue"
    size="mini"
    filterable
    remote
    class="max-w"
    @focus="blurFocus"
    @change="change"
  >
    <el-option
      v-for="item in list"
      :key="item.periodId"
      :label="item[showField]"
      :value="item.dname" />
  </el-select>
</template>

<script>
import commercialInvoiceServer from './../../../api/commercialInvoiceServer'

export default {
  name: 'CommercialInvoiceAccountingIntervalSelect',
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
      showField: 'dname',
      list: [],
      selectedValue: null,
      loading: false
    }
  },
  watch: {
    value(value) {
      if (value !== this.selectedValue) {
        this.changeValue(value)
      }
    }
  },
  created() {
    if (this.type === 'multiple') {
      this.selectedValue = []
    }
    this.changeValue(this.value)
  },
  methods: {
    async changeValue(value) {
      if (value !== null && value !== '') {
        const data = {
          dataSet: {
            name: 'data',
            params: {
              key: value
            },
            page: {
              startRow: 0, // 起始行
              endRow: 1 // 每页条数
            }
          }
        }
        const res = await commercialInvoiceServer.getAccountingInterval(data)
        this.list = res.data.data.data
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const data = {
        dataSet: {
          name: 'data',
          params: {
            key: keyword
          },
          page: {
            startRow: 0, // 起始行
            endRow: 20 // 每页条数
          }
        }
      }
      const res = await commercialInvoiceServer.getAccountingInterval(data)
      this.list = res.data.data.data
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let res
      this.list.forEach((item, index) => {
        if (item.dname === this.selectedValue) {
          res = item
        }
      })
      this.$emit('changeData', res)
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
