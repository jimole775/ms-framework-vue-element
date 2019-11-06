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
    @focus="blurFocus"
    @change="change"
  >
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item[showField]"
      :value="item[valueField]" />
  </el-select>
</template>
  
<script>
import changeOrderServer from './../../../api/changeOrderServer'

export default {
  name: 'ChangeOrderSelect',
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
    source: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showField: 'code',
      valueField: 'id',
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
    if (this.source) {
      this.valueField = 'code'
    }
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
      if (value != null && value !== '' && value.length !== 0) {
        let query = null
        if (this.type === 'single' && (typeof value === 'number' || typeof value === 'string')) {
          query = value
        } else if (this.type === 'multiple' && typeof value === 'object' && value.length && value.length > 0) {
          // query = ''
        }
        if (query !== null) {
          const parm = {}
          let key = 'id'
          if (this.source) {
            key = 'code'
          }
          parm[key] = query
          const data = {
            query: parm,
            page: 0,
            size: 20
          }
          const res = await changeOrderServer.search(data)
          this.list = res.data
        } else {
          this.list = []
        }
      } else {
        const data = {
          query: {}
        }
        const res = await changeOrderServer.search(data)
        this.list = res.data
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      if (keyword) {
        parm['code'] = keyword
      }
      const data = {
        query: parm,
        page: 0,
        size: 20
      }
      const res = await changeOrderServer.search(data)
      this.list = res.data
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let res
      this.list.forEach((item, index) => {
        if (item.id === this.selectedValue) {
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
