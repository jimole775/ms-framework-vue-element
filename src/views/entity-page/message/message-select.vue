<template>
  <el-select
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    v-model="selectedValue"
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
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
import messageServer from './../../../api/messageServer'

export default {
  name: 'MassageSelect',
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
      showField: 'content',
      list: [],
      selectedValue: null,
      loading: false
    }
  },
  watch: {
    async value(value) {
      if (value !== this.selectedValue) {
        this.changeValue(value)
      }
    }
  },
  created() {
    this.changeValue(this.value)
  },
  methods: {
    async changeValue(value) {
      if (value !== null && value !== '') {
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
          const res = await messageServer.search({
            query
          })
          this.list = res.data
        } else {
          this.list = []
        }
      } else {
        this.list = []
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      if (keyword && keyword !== '') {
        const res = await messageServer.search({
          query: `${this.showField}:${keyword}`
        })
        this.list = res.data
      } else {
        this.list = []
      }
      this.loading = false
    },
    change(event) {
      this.$emit('input', event)
    }
  }
}
</script>

<style scoped>
</style>
