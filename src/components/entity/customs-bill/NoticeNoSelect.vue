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
import noticeNoServer from './../../../api/noticeNoServer'

export default {
  name: 'NoticeNoSelect',
  props: {
    value: {
      type: Number | String | Array,
      default: null
    },
    warnId: {
      type: Number | String | Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'single'
    },
  },
  data() {
    return {
      showField: 'code',
      allData: [],
      list: [],
      selectedValue: null,
    }
  },
  watch: {
    selectedValue(newValue, oldValue) {
      const res = []
      if (this.type === 'multiple') {
        this.list.forEach((item, index) => {
          if (newValue.indexOf(item.id) !== -1) {
            res.push(item)
          }
        })
      } else {
        this.list.forEach((item, index) => {
          if (item.id === newValue) {
            res.push(item)
          }
        })
      }
      this.$emit('changeData', res, oldValue)
    },
    warnId(id) {
      this.getData(id)
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
    this.getData(this.warnId)
  },
  methods: {
    async getData(warnId) {
      if (warnId) {
        const res = await noticeNoServer.search(warnId)
        this.allData = []
        const ids = []
        res.data.forEach(item => {
          ids.push(item.notice_id)
          this.allData.push({
            id: item.notice_id,
            code: item.notice_no
          })
        })
        this.changeValue(ids)
      }
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
            this.list = []
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
      if (value === null && this.type === 'multiple') {
        this.selectedValue = []
      } else {
        this.selectedValue = value
      }

      // 如果没有任何数据列表，可以往外广播空值事件
      if (this.list.length === 0 && this.allData.length === 0) {
        this.$emit('isEmpty', event)
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
