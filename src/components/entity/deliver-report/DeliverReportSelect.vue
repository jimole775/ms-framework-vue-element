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
      :key="item.corpserialid"
      :label="item[showField]"
      :value="item.corpserialid" />
  </el-select>
</template>

<script>
import deliverReportServer from './../../../api/deliverReportServer'

export default {
  name: 'DeliverReportSelect',
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
      showField: 'corpserialno',
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
      if (value !== null && value !== '') {
        const data = {
          keyword: {
            corpserialno: value,
            stat: 5 
          },
          page: 0,
          size: 1
        }
        const res = await deliverReportServer.search(data)
        this.list = res.data.data.data
      }
      this.selectedValue = value
    },
    async remoteMethod(val) {
      this.loading = true
      const data = {
        keyword: {
          corpserialno: val,
          stat: 5
        },
        page: 0,
        size: 20
      }
      const res = await deliverReportServer.search(data)
      this.list = res.data.data.data
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let res
      this.list.forEach((item, index) => {
        if (item.corpserialid === this.selectedValue) {
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
