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
      :key="item.invoiceId"
      :label="item[showField]"
      :value="item.invoiceId" />
  </el-select>
</template>

<script>
import commercialInvoiceServer from './../../../api/commercialInvoiceServer'

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
    mergingSplitType: {
      type: Number,
      default: null
    },
    stat: {
      type: Number,
      default: null
    },
    isRed: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
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
      if (value !== this.selectedValue) {
        this.changeValue(value)
      }
    },
    // selectedValue(val) {
    //   if (this.selectedValue && val) {
    //     this.change(val)
    //   }
    // }
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
        const res = await commercialInvoiceServer.get(value)
        this.list = [res.data.header]
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const data = {
        dataSet: {
          name: 'data',
          params: {
            entid: parseInt(localStorage.getItem('entid')),
            stat: parseInt(this.stat),
            isRed: parseInt(this.isRed),
            mergingSplitType: this.mergingSplitType,
            key: keyword.toString(),
            ...this.condition
          },
          page: {
            startRow: 0, // 起始行
            endRow: 20 // 每页条数
          }
        }
      }
      const res = await commercialInvoiceServer.doSearch(data)
      this.list = res.data.data.data
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event, cb) {
      let res
      this.list.forEach((item, index) => {
        if (item.invoiceId === this.selectedValue) {
          res = item
        }
      })
      this.$emit('changeData', res, cb)
      if (event) this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
