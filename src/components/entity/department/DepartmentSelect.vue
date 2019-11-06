<template>
  <el-select
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    v-model="selectedValue"
    :disabled="disabled"
    :placeholder="customHolder"
    :class="customClass"
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
      :value="item.id">
      <span style="float: left">{{ item.name }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.entid | OperaUnitFilter }}</span>
    </el-option>  
  </el-select>
</template>
  
<script>
import departmentServer from './../../../api/departmentServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
export default {
  name: 'DepartmentSelect',
  filters: {
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
  },
  props: {
    value: {
      type: Number | String | Array,
      default: null
    },
    stat: {
      type: String | Number,
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
    customClass: {
      type: String,
      default: ''
    },
    customHolder: {
      type: String,
      default: '请选择'
    },
    index: {
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
      if (this.type === 'multiple') {
        const data = {
          keyword: {
            orgIdList: value,
            stat: this.stat
          },
          page: 0,
          size: 9999
        }
        const res = await departmentServer.search(data)
        this.list = res.rows
      } else {
        if (value !== null && value !== '') {
          const data = {
            keyword: {
              orgIdList: [value],
              stat: this.stat
            },
            page: 0,
            size: 1
          }
          const res = await departmentServer.search(data)
          this.list = res.rows
        }
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      if (keyword) {
        parm['name'] = keyword
      }
      if (this.stat !== null) {
        parm['stat'] = this.stat
      }
      const data = {
        keyword: parm,
        page: 0,
        size: 20
      }
      const res = await departmentServer.search(data)
      this.list = res.rows
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      if (this.type === 'multiple') {
        const res = []
        this.list.forEach((item, index) => {
          if (this.selectedValue.indexOf(item.id) !== -1) {
            res.push(item)
          }
        })
        this.$emit('changeData', res)
      } else {
        let name = null
        let code = null
        let res = null
        this.list.forEach((item, index) => {
          if (item.id === this.selectedValue) {
            name = item.name
            code = item.code
            res = item
          }
        })
        this.$emit('changeData', name, code)
        this.$emit('changeDataRes', res)
      }
      if (this.index != null) {
        let res
        this.list.forEach(item => {
          if (item.id === this.selectedValue) {
            res = item
          }
        })
        res = {
          ...res,
          $index: this.index
        }
        this.$emit('changeDataTwo', res)
      }
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
