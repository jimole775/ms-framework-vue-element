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
    @focus="blurFocus"
    @change="change"
  >
    <el-option
      v-for="item in list"
      :key="item.orderFeeId"
      :label="item[showField]"
      :value="item.orderFeeCode"
    />
  </el-select>
</template>
  
<script>
import costProjectServer from './../../../api/costProjectServer'

export default {
  name: 'CostProjectSelect',
  props: {
    value: {
      type: Number | String | Array,
      default: null
    },
    from: {
      type: Number,
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
    index: {
      type: Number | String,
      default: null
    },
    search: {
      type: Number | String,
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
      if (this.search) {
        // 根据ID，只查一条数据
        if (value !== null && value !== '') {
          const data = {
            keyword: {
              id: value
            },
            page: 0,
            size: 1
          }
          const res = await costProjectServer.search(data)
          this.list = res.rows
        }
        this.selectedValue = this.list[0] ? this.list[0].orderFeeName : ''
      } else {
        // 模糊查询
        if (value !== null && value !== '') {
          const data = {
            keyword: {
              code: value
            },
            page: 0,
            size: 1
          }
          const res = await costProjectServer.search(data)
          this.list = res.rows
        }
        this.selectedValue = value
      }
    },
    async remoteMethod(word) {
      this.loading = true
      const data = {
        keyword: {
          name: word,
          costProjectProjectType: this.from
        },
        page: 0,
        size: 20
      }
      const res = await costProjectServer.search(data)
      this.list = res.rows
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
