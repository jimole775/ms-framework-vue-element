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
      :key="item['invoiceId']"
      :label="item[showField]"
      :value="item['invoiceNo']"
    />
  </el-select>
</template>

<script>
import commercialInvoiceServer from './../../../api/commercialInvoiceServer'

export default {
  name: 'DeliverCommercialInvoiceNoSelect',
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
    showField: {
      type: String,
      default: 'factInvoiceNo'
    },
    parentFormData: {
      type: Object | Array,
      default: {}
    }
  },
  data() {
    return {
      list: [],
      selectedValue: null,
      loading: false
    }
  },
  watch: {
    selectedValue(value) {},
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
      if (value !== null && value !== '' && this.type !== 'multiple') {
          const data = {
            keyword: {
              invoiceNo: value,
              stat: 5,
              isRed: 1,
              tbStat: 0
            },
            page: 0,
            size: 20
          }
          const res = await commercialInvoiceServer.search(data)        
          this.list = res.data.data.data
          // 如果search接口拿不到 factInvoiceNo，就使用formData的数据，里面大概率会存有 factInvoiceNo
          if (this.list.length === 0) {
            this.list = [this.parentFormData]
          }
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
          stat: 5,
          tbStat,
          isRed: 1
        },
        page: 0,
        size: 9999
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
            if (this.selectedValue[i] === this.list[j].invoiceNo) {
              arr.push(this.list[j])
            }
          }
        }
        this.$emit('changeData', arr)
      } else {
        let res = null
        this.list.forEach((item, index) => {
          if (item.invoiceNo === this.selectedValue) {
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
