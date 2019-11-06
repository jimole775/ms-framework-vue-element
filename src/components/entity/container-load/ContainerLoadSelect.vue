<template>
  <el-select
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    v-model="selectedValue"
    size="mini"
    filterable
    remote
    class="max-w"
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
import containerLoadServer from './../../../api/containerLoadServer'

export default {
  name: 'ContainerLoadSelect',
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
    }
  },
  data() {
    return {
      showField: 'id',
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
          query = `id:${value}`
        } else if (this.type === 'multiple' && typeof value === 'object' && value.length && value.length > 0) {
          query = ''
          for (let i = 0; i < value.length; i++) {
            if (i > 0) {
              query += ' OR '
            }
            query += `id:${value[i]}`
          }
        }
        if (query !== null) {
          const res = await containerLoadServer.search({
            query
          })
          this.list = res.data
        } else {
          this.list = []
        }
      } else {
        const res = await containerLoadServer.search({
          query: '*:*'
        })
        this.list = res.data
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const res = await containerLoadServer.search({
        query: `${this.showField}:${keyword || '*'}`
      })
      this.list = res.data
      this.loading = false
    },
    change(event) {
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
