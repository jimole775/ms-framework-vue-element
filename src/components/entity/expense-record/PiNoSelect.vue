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
      :key="item.warnid"
      :label="item[showField]"
      :value="item.pino" />
  </el-select>
</template>

<script>
import shipmentNoticeServer from './../../../api/shipmentNoticeServer'

export default {
  name: 'PiNoSelect',
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
    index: {
      type: Number | String,
      default: null
    },
    test: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showField: 'pino',
      list: [],
      selectedValue: null,
      loading: false
    }
  },
  watch: {
    selectedValue(newValue, oldValue) {
    },
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
    // 如果没有值传入，就不需要到服务器查询列表
    if (this.value) this.changeValue(this.value)
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
            query: {
              piNo: query,
              entid: this.$store.getters.entid
            },
            page: 0,
            size: 20
          }
          const res = await shipmentNoticeServer.search(data)
          this.list = res.data
        } else {
          this.list = []
        }
      } else {
        const data = {
          query: {},
          page: 0,
          size: 20
        }
        const res = await shipmentNoticeServer.search(data)
        this.list = res.data
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      parm['entid'] = this.$store.getters.entid
      if (keyword) {
        parm['piNo'] = keyword
      }
      const data = {
        query: parm,
        page: 0,
        size: 20
      }
      const res = await shipmentNoticeServer.search(data)
      this.list = res.data
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let res
      this.list.forEach(item => {
        if (item.pino === this.selectedValue) {
          res = item
        }
      })
      if (this.index != null) {
        res = {
          ...res,
          $index: this.index
        }
      }
      this.$emit('changeData', res)
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
