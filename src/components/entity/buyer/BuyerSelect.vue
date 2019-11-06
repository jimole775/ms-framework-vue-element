<template>
  <!-- <el-select
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    :disabled="disabled"
    v-model="selectedValue"
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
  </el-select> -->
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
    @focus="blurFocus"
    @change="change"
  >
    <el-option
      v-for="item in list"
      :key="item.corpserialno"
      :label="item[showField]"
      :value="item.corpserialno" />
  </el-select>
</template>
  
<script>
import buyerServer from './../../../api/buyerServer'

export default {
  name: 'BuyerSelect',
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
      showField: 'buyerno',
      list: [],
      selectedValue: null,
      loading: false
    }
  },
  watch: {
    selectedValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        let res
        this.list.forEach((item, index) => {
          if (item.corpserialno === newValue) {
            res = item
          }
        })
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
      if (value !== null && value !== '') {
        const data = {
          id: value,
          page: 0,
          size: 20
        }
        const res = await buyerServer.search(data)
        this.list = res.data.data.data
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
       const data = {
        buyerno: keyword,
        custCode: keyword,
        custName: keyword,
        chnname: keyword,
        engname: keyword,
        page: 0,
        size: 20
      }
      const res = await buyerServer.search(data)
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
