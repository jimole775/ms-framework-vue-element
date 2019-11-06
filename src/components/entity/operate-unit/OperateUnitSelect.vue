<template>
  <el-select
    :multiple="type === 'multiple'"
    v-model="selectedValue"
    :disabled="disabled"
    clearable
    size="mini"
    class="max-w"
    @clear="clearAction"
    @change="change"
  >
    <el-option
      v-for="(item, index) in list"
      :key="index"
      :label="item[showField]"
      :value="item.id" />
  </el-select>
</template>
  
<script>
import operateUnitServer from './../../../api/operateUnitServer'

export default {
  name: 'OperateUnitSelect',
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
    }
  },
  data() {
    return {
      showField: 'name',
      allData: [],
      list: [],
      selectedValue: null,
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
    this.getData()
  },
  methods: {
    async getData() {
      const type = {
        type: 'ent'
      }
      const res = await operateUnitServer.search(type)
      this.allData = []
      Object.keys(res.data.data).forEach(key => {
        this.allData.push({
          id: parseInt(key),
          name: res.data.data[key]
        })
      })
      this.changeValue(this.value)
    },
    changeValue(value) {
      this.list = []
      if (value != null && value !== '' && value.length !== 0) {
        if (this.type === 'single' && (typeof value === 'number' || typeof value === 'string')) {
          this.allData.forEach(item => {
            if (item.id === value) {
              this.list.unshift(item)
            } else {
              this.list.push(item)
            }
          })
        } else if (this.type === 'multiple' && typeof value === 'object' && value.length && value.length > 0) {
          value.forEach(it => {
            this.allData.forEach(item => {
              if (item.id === it) {
                this.list.unshift(item)
              } else {
                this.list.push(item)
              }
            })
          })
        }
      } else {
        this.list = this.allData
      }
      this.selectedValue = value
    },
    clearAction() {
      this.list = this.allData
    },
    change(event) {
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
