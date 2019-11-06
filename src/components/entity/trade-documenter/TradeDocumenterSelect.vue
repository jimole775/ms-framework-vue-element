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
import tradeDocumenterServer from './../../../api/tradeDocumenterServer'

export default {
  name: 'TradeDocumenterSelect',
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
  methods: {
    async changeValue(value) {
      if (value != null && value !== '' && value.length !== 0) {
        let query = null
        if (this.type === 'single' && (typeof value === 'number' || typeof value === 'string')) {
          query = value
        } else if (this.type === 'multiple' && typeof value === 'object' && value.length && value.length > 0) {
          // 不做复选
        }
        if (query !== null) {
          const data = {
            keyword: {
              id: query
            },
            page: 0,
            size: 1
          }
          const res = await tradeDocumenterServer.search(data)
          this.list = res.rows
        } else {
          this.list = []
        }
      } else {
        const data = {
          keyword: {},
          page: 0,
          size: 9999
        }
        const res = await tradeDocumenterServer.search(data)
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
        size: 9999
      }
      const res = await tradeDocumenterServer.search(data)
      this.list = res.rows
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let name = null
      this.list.forEach((item, index) => {
        if (item.id === this.selectedValue) {
          name = item.name
        }
      })
      this.$emit('changeData', name)
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
