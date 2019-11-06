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
      :value="item.code" />
  </el-select>
</template>
  
<script>
import creditChangeServer from './../../../api/creditChangeServer'

export default {
  name: 'CreditChangeSelect',
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
      showField: 'code',
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
          // query = ''
        }
        if (query !== null) {
          const data = {
            keyword: {
              code: query
            },
            page: 0,
            size: 20
          }
          const res = await creditChangeServer.searchUsable(data)
          this.list = res.data
        } else {
          this.list = []
        }
      } else {
        const data = {
          keyword: {},
          page: 0,
          size: 20
        }
        const res = await creditChangeServer.searchUsable(data)
        this.list = res.data
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      if (keyword) {
        parm['code'] = keyword
        parm['creditCertificateCode'] = keyword
      }
      const data = {
        keyword: parm,
        page: 0,
        size: 20
      }
      const res = await creditChangeServer.searchUsable(data)
      this.list = res.data
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let res
        this.list.forEach(item => {
        if (item.code === this.selectedValue) {
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
