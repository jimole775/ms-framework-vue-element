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
      :key="item.seq"
      :label="item[showField]"
      :value="item.boxName" />
  </el-select>
</template>
  
<script>
import boxTypeServer from './../../../api/boxTypeChooseServer'

export default {
  name: 'BoxTypeChoose',
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
    warnid: {
      type: Number | String,
      default: null
    },
    index: {
      type: Number | String,
      default: null
    },
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
        let type = null
        const inx = this.index
        this.list && this.list.forEach((item, index) => {
          item.seq = index
          if (item.id === newValue) {
            type = item.boxType
          }
        })
        this.$emit('changeData', type, inx)
      }
    },
    // warnid(id) {
    //   this.widrnid = id
    // },
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
    if (this.value !== '') {
      this.changeValue(this.value)
    }
    // if (this.warnid != null) {
    //   this.changeValue(this.warnid)
    // } 
  },
  methods: {
    async changeValue(value) {
      if (value !== null && value !== '') {
        const data = {
          keyword: {
            boxName: value
          },
          page: 0,
          size: 1
        }
        if (this.warnid) {
          data.keyword['id'] = this.warnid
        }
        const res = await boxTypeServer.search(data)
        this.list = res.data
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      if (keyword) {        
        parm['boxName'] = keyword
      }
      if (this.warnid) {
        parm['id'] = this.warnid
      }
      const data = {
        keyword: parm,
        page: 0,
        size: 20
      }
      const res = await boxTypeServer.search(data)
      if (Number.parseInt(res.code) === 200) {
        if (res.data) {
          this.list = res.data
        } else {
          this.list = []
          this.$message({
            message: '当前出货预告号没有对应的柜型',
            type: 'warning'
          })
        }
        this.loading = false
      }
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
