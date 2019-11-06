<template>
  <el-select
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    :placeholder="placeholderText"
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
      :value="item.name" />
  </el-select>
</template>
  
<script>
import personServer from './../../../api/personServer'

export default {
  name: 'PersonSelect',
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
    }, 
    customId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showField: 'name',
      list: [],
      selectedValue: null,
      placeholderText: '请选择',
      loading: false,
    }
  },
  computed: {
  },
  watch: {
    value(value) {
      if (value !== this.selectedValue) {
        this.changeValue(value)
        this.initEmit(value)
      }
    },
  },
  created() {
    if (this.type === 'multiple') {
      this.selectedValue = []
    }
    this.changeValue(this.value)
  },
  mounted() {
    /** 为没有下拉箭头的框体添加一个固定的箭头
     ** 这是由于组件添加了 remote 属性造成的 */
    const arrows = document.querySelectorAll('.el-input__icon.el-icon-')
    Array.prototype.forEach.call(arrows, (arrow) => {
      arrow.className = 'el-input__icon el-icon-arrow-down'
    })
  },
  methods: {
    async changeValue(value) {    
      if (value !== null && value !== '') {
        const data = {
          keyword: {
            name: value
          },
          page: 0,
          size: 1
        }
        let res = {}
        if (this.customId) {
          res = await personServer.customSearch(this.customId)
        } else {
          res = await personServer.search(data)
        }
        if (!res.data.length) {
          this.placeholderText = '暂无数据'
          setTimeout(() => {
            this.placeholderText = '请选择'
          }, 1600)
        }
        this.list = res.data
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
      let res = {}
      if (this.customId) {
        res = await personServer.customSearch(this.customId)
      } else {
        res = await personServer.search(data)
      }
      if (!res.data.length) {
        this.placeholderText = '暂无数据'
        setTimeout(() => {
          this.placeholderText = '请选择'
        }, 1600)
      }
      this.list = res.data
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let ref
      this.list.forEach((item, index) => {
        if (item.name === this.selectedValue) {
          ref = item
        }
      })
      this.$emit('changeData', ref)
      this.$emit('input', event)
    },
    async initEmit(value) {
      if (value !== null && value !== '') {
        const data = {
          keyword: {
            name: value
          },
          page: 0,
          size: 1
        }
        let res = {}
        if (this.customId) {
          res = await personServer.customSearch(this.customId)
        } else {
          res = await personServer.search(data)
        }
        this.list = res.data         
        if (!res.data.length) {
          this.placeholderText = '暂无数据'
          setTimeout(() => {
            this.placeholderText = '请选择'
          }, 1600)
        }
        let ref
        this.list.forEach((item, index) => {
          if (item.name === value) {
            ref = item
          }
        })
        this.$emit('changeData', ref)
      }     
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
