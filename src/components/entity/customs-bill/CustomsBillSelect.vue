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
      :key="item.customs_id"
      :label="item[showField]"
      :value="item.customs_id" />
  </el-select>
</template>

<script>
import customsBillServer from './../../../api/customsBillServer'

export default {
  name: 'CustomsBillSelect',
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
    stat: {
      type: Number,
      default: null
    },
    test: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showField: 'customs_no',
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
              customs_id: query
            },
            page: 0,
            size: 20
          }
          const res = await customsBillServer.search(data)
          this.list = res.sdpSaleCustomsVos
        } else {
          this.list = []
        }
      } else {
        const data = {
          keyword: {},
          page: 0,
          size: 20
        }
        const res = await customsBillServer.search(data)
        this.list = res.sdpSaleCustomsVos
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      if (this.stat) {
        parm['stat'] = this.stat
      }
      if (keyword) {
        parm['customs_no'] = keyword
      }
      const data = {
        keyword: parm,
        page: 0,
        size: 20
      }
      const res = await customsBillServer.search(data)
      this.list = res.sdpSaleCustomsVos
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let res
        this.list.forEach(item => {
        if (item.customs_id === parseInt(this.selectedValue)) {
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
