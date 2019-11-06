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
      :key="item.supplierId"
      :label="item[showField]"
      :value="item.supplierId" />
  </el-select>
</template>

<script>
import customsBillFedServer from './../../../api/customsBillFedServer'

export default {
  name: 'CustomsBillFedSelect',
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
      showField: 'name',
      list: [],
      selectedValue: null,
      loading: false
    }
  },
  watch: {
    selectedValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        let res
        this.list.forEach(item => {
          if (item.id === parseInt(newValue)) {
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
      }
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
              id: query
            },
            page: 0,
            size: 20
          }
          const res = await customsBillFedServer.search(data)
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
        const res = await customsBillFedServer.search(data)
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
      const res = await customsBillFedServer.search(data)
      this.list = res.rows
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
