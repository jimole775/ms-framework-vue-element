<template>
  <el-select
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    v-model="selectedValue"
    :disabled="disabled"
    size="mini"
    filterable
    remote
    class="max-w"
    @clear="clearEvent"
    @focus="blurFocus"
    @change="change"
  >
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item[showField]"
      :value="item.id" />
  </el-select>
</template>
  
<script>
import customerServer from './../../../api/customerServer'

export default {
  name: 'CustomerSelect',
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
      showField: 'name',
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
    clearEvent() {
      this.emitEvents()
    },
    async changeValue(value) {
      if (value !== null && value !== '') {
        const data = {
          keyword: {
            id: value
          }
        }
        const res = await customerServer.search(data)
        if (res.data) {
          this.list = res.data
        }
      }
      this.selectedValue = value
      this.emitEvents()
    },
    emitEvents() {      
      let name = null
      let code = null
      let suplierInfo = null 
      this.list && this.list.forEach((item, index) => {
        if (item.id === this.selectedValue) {
          name = item.name
          code = item.code
          suplierInfo = item
        }
      })
      this.$emit('changeData', name, code, suplierInfo)
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      if (keyword) {
        parm['name'] = keyword
      }
      const data = {
        keyword: parm
      }
      const res = await customerServer.search(data)
      this.list = res.data
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {      
      this.emitEvents()
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
