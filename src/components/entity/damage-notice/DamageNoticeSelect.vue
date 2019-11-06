<template>
  <el-select
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
      :key="item.corpserialid"
      :label="item[showField]"
      :value="item.corpserialno" />
  </el-select>
</template>

<script>
import damageNoticeServer from './../../../api/damageNoticeServer'

export default {
  name: 'DamageNoticeSelect',
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
    }
  },
  data() {
    return {
      showField: 'corpserialno',
      list: [],
      selectedValue: null,
      loading: false
    }
  },
  watch: {
    selectedValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        let res = null
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
          keyword: {
            corpserialno: value,
            // stat: 5
          },
          page: {
            startRow: 0, // 起始行
            endRow: 1 // 每页条数
          }
        }
        const res = await damageNoticeServer.search(data)
        this.list = res.data.data.data
      }
      this.selectedValue = value
    },
    getStat5Item(input) {
      const output = []
      if (input && input instanceof Array) {
        input.forEach((iItem) => {
          if (Number.parseInt(iItem.stat) === 5) {
            output.push(iItem)
          }
        })
      }
      return output
    },
    async remoteMethod(keyword) {
      this.loading = true
      const data = {
          keyword: {
            corpserialno: keyword,
            // stat: 5
          },
          page: {
            startRow: 0, // 起始行
            endRow: 20 // 每页条数
          }
        }
      const res = await damageNoticeServer.search(data)
      this.list = this.getStat5Item(res.data.data.data)
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
