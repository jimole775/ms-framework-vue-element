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
      v-for="(item, index) in list"
      :key="index"
      :label="item[showField]"
      :value="item.userCode" />
  </el-select>
</template>
  
<script>
import personServer from './../../../api/personServer'

export default {
  name: 'PersonCodeSelect',
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
      if (this.type === 'multiple') {
        const data = {
          keyword: {
            userCodes: value
          },
          page: 0,
          size: 1
        }
        const res = await personServer.search(data)
        this.list = res.data
      } else if (value !== null && value !== '') {
        const data = {
          keyword: {
            userCode: value
          },
          page: 0,
          size: 1
        }
        const res = await personServer.search(data)
        this.list = res.data
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      parm['userType'] = '外部用户'
      if (keyword) {
        parm['name'] = keyword
      }
      const data = {
        keyword: parm,
        page: 0,
        size: 20
      }
      const res = await personServer.search(data)
      this.list = res.data
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
