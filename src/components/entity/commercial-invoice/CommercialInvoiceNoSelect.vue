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
      :value="item.factInvoiceNo"
    />
  </el-select>
</template>

<script>
import commercialInvoiceServer from './../../../api/commercialInvoiceServer'

export default {
  name: 'CommercialInvoiceNoSelect',
  props: {
    value: {
      type: Number | String | Array,
      default: null
    },
    tbstat: {
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
    requestStat: {
      type: String | Number,
      default: 5
    }
  },
  data() {
    return {
      showField: 'invoiceNo',
      list: [],
      selectedValue: null,
      loading: false
    }
  },
  watch: {
    selectedValue(value) {},
    value(value) {
      if (value && value !== this.selectedValue) {
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
      if (value !== null && value !== '' && this.type !== 'multiple') {
        const data = {
          keyword: {
            commercialInvoiceCode: value,
            stat: this.requestStat, // 5 是已审 1 是制单
            isRed: 1
          },
          page: 0,
          size: 20
        }
        const res = await commercialInvoiceServer.search(data)
        // console.log('res:', res)
        this.list = res.data.data.data
        this.$emit('changeData', this.list[0])
      } else {
        // if (this.type === 'multiple' && typeof value === 'object' && value.length && value.length > 0)
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const tbStat = this.tbstat
      const data = {
        keyword: {
          commercialInvoiceCode: keyword,
          // stat: 5, // 5 是已审 1 是制单
          stat: this.requestStat, // 5 是已审 1 是制单
          tbStat
        },
        page: 0,
        size: 20
      }

      const res = await commercialInvoiceServer.search(data)
      this.list = res.data.data.data
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      if (this.type === 'multiple') {
        const arr = []
        for (let i = 0; i < this.selectedValue.length; i++) {
          for (let j = 0; j < this.list.length; j++) {
            if (this.selectedValue[i] === this.list[j].factInvoiceNo) {
              arr.push(this.list[j])
              break
            }
          }
        }
        this.$emit('changeData', arr)
      } else {
        let res = null
        this.list.forEach((item, index) => {
          if (item.factInvoiceNo === this.selectedValue) {
            res = item
          }
        })
        this.$emit('changeData', res)
      }
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
