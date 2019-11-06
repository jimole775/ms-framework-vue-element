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
      v-for="item in list"
      :key="item.id"
      :label="item[showField]"
      :value="item.id" />
  </el-select>
</template>
  
<script>
import unitMeasurementServer from './../../../api/unitMeasurementServer'

export default {
  name: 'UnitMeasurementSelect',
  props: {
    value: {
      type: Number | String | Array,
      default: null
    },
    index: {
      type: Number | String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'single'
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
    selectedValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        let res
        this.list.forEach(item => {
          if (item.id === parseInt(newValue)) {
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
    this.getData()
  },
  methods: {
    async getData() {
      const type = {
        type: 'uom'
      }
      const res = await unitMeasurementServer.search(type)
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
            if (item.id === parseInt(value)) {
              this.list.unshift(item)
            } else {
              this.list.push(item)
            }
          })
          this.selectedValue = parseInt(value)
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
          this.selectedValue = value
        }
      } else {
        this.selectedValue = value
        this.list = this.allData
      }
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
