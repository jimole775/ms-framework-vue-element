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
      :value="item.id" />
  </el-select>
</template>
  
<script>
import portServer from './../../../api/portServer'

export default {
  name: 'PortSelect',
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
    async changeValue(value) {
      if (value != null && value !== '' && value.length !== 0) {
        let query = null
        if (this.type === 'single' && (typeof value === 'number' || typeof value === 'string')) {
          query = value
        } else if (this.type === 'multiple' && typeof value === 'object' && value.length && value.length > 0) {
          // query = value
        }
        if (query !== null) {
          const data = {
            keyword: {
              id: query
            },
            page: 0,
            size: 1
          }
          const res = await portServer.search(data)
          this.list = res.rows
        } else {
          this.list = []
        }
      } else {
        const data = {
          keyword: {},
          page: 0,
          size: 20
        }
        const res = await portServer.search(data)
        this.list = res.rows
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      if (keyword) {
        parm['name'] = keyword
      }
      const data = {
        keyword: parm,
        page: 0,
        size: 20
      }
      const res = await portServer.search(data)
      this.list = res.rows
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let name = null
      let code = null
      this.list.forEach((item, index) => {
        if (item.id === this.selectedValue) {
          name = item.name
          code = item.code
        }
      })
      this.$emit('changeData', name, code)
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
