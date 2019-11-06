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
      :key="item.venderId"
      :label="item[showField]"
      :value="item.venderId" />
  </el-select>
</template>
  
<script>
import customerServer from './../../../api/feePaycustomerServer'

export default {
  name: 'FeePayCustomerSelect',
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
      showField: 'venderName',
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
      if (value !== null && value !== '') {
        const data = {
          keyword: {
            id: value,
            entid: this.$store.getters.entid
          }
        }
        const res = await customerServer.search(data)
        this.list = res.rows
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      if (keyword) {
        parm['name'] = keyword
        parm['entid'] = this.$store.getters.entid
      }
      const data = {
        keyword: parm
      }
      const res = await customerServer.search(data)
      this.list = res.rows
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let returnInfo = null 
      this.list.forEach((item, index) => {
        if (item.venderId === this.selectedValue) {
          returnInfo = item
        }
      })
      this.$emit('changeData', returnInfo)
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
