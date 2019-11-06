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
      :key="item.factInvoiceNo"
      :label="item[showField]"
      :value="item.factInvoiceNo" />
  </el-select>
</template>

<script>
import commercialInvoiceServer from './../../../api/customCommercialInvoiceServer'

export default {
  name: 'CommercialInvoiceSelect',
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
    },
    mergingSplitType: {
      type: Number,
      default: null
    },
    condition: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      showField: 'factInvoiceNo',
      list: [],
      selectedValue: null,
      loading: false
    }
  },
  watch: {
    value(value) {
      // console.log('input is changed')
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
  mounted() {
    /** 为没有下拉箭头的框体添加一个固定的箭头
     ** 这是由于组件添加了 remote 属性造成的 */
    const arrows = document.querySelectorAll('.el-input__icon.el-icon-')
    Array.prototype.forEach.call(arrows, (arrow) => {
      arrow.className = 'el-input__icon el-icon-arrow-down'
    })
  },
  methods: {
    async changeValue(value) {
      if (this.type === 'multiple') {
        // todo
      } else if (value !== null && value !== '') {
         const data = {
          config: 'ACT_SPD_BILL_INVOICE_CONFIRM_004',
          params: {
            invoiceNo: value.toString()
          },
          page: {
            startRow: 0, // 起始行
            endRow: 20 // 每页条数
          }
      }
        const res = await commercialInvoiceServer.doSearch(data)
        this.list = res.data.data.data
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      // console.log(keyword)
      this.loading = true
      const data = {
          config: 'ACT_SPD_BILL_INVOICE_CONFIRM_004',
          params: {
            mergingSplitType: this.mergingSplitType,
            invoiceNo: keyword.toString()
          },
          page: {
            startRow: 0, // 起始行
            endRow: 20 // 每页条数
          }
      }
      const res = await commercialInvoiceServer.doSearch(data)
      this.list = res.data.data.data
      this.loading = false
    },
    blurFocus() {
      // console.log('input focus')
      this.remoteMethod('')
    },
    change(event) {
      let res
      this.list.forEach((item, index) => {
        if (item.factInvoiceNo === this.selectedValue) {
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
