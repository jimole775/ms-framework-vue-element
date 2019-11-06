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
      :label="item[field]"
      :value="item[returnVal]" />
  </el-select>
</template>

<script>
import bankServer from './../../../api/bankServer'

export default {
  name: 'BankSelectCertificate',
  props: {
    value: {
      type: Number | String | Array,
      default: null
    },
    type: {
      type: String,
      default: 'single'
    },
    bankType: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    showField: {
      type: String,
      default: 'name'
    },
    getField: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      // showField: 'name',
      list: [],
      selectedValue: null,
      loading: false
    }
  },
  computed: {
    field() {
      return this.showField
    },
    returnVal() {
      return this.getField
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
              id: query,
              bankType: this.bankType
            },
            page: 0,
            size: 999
          }
          const res = await bankServer.search(data)
          this.list = res.rows
        } else {
          this.list = []
        }
      } else {
        const data = {
          keyword: {
            bankType: this.bankType
          },
          page: 0,
          size: 999
        }
        const res = await bankServer.search(data)
        this.list = res.rows
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      if (keyword) {
        if (this.getField === 'swiftCode') {
          parm['code'] = keyword
        } else {
          parm['name'] = keyword
        }
      }
      parm['bankType'] = this.bankType
      const data = {
        keyword: parm,
        page: 0,
        size: 9999
      }
      const res = await bankServer.search(data)
      this.list = res.rows
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let res
      this.list.forEach((item, index) => {
        if (item[this.getField] === this.selectedValue) {
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
