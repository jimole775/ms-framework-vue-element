<template>
  <el-select 
    :loading="loading" 
    :multiple="type === 'multiple'" 
    :clearable="clearable" 
    v-model="selectedValue"
    :disabled="disabled" 
    size="mini" 
    filterable 
    class="max-w" 
    @change="change">
    <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id" />
  </el-select>
</template>

<script>
  import CustomsBillDiffEnumUtil from './../../enum/customs-bill/CustomsBillDiffEnumUtil'

  export default {
    name: 'CustomsDiffSelect',
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
        list: [{
            id: 1,
            title: CustomsBillDiffEnumUtil.toTitle(1)
          },
          {
            id: 2,
            title: CustomsBillDiffEnumUtil.toTitle(2)
          },
          {
            id: 3,
            title: CustomsBillDiffEnumUtil.toTitle(3)
          },
          {
            id: 4,
            title: CustomsBillDiffEnumUtil.toTitle(4)
          },
          {
            id: 5,
            title: CustomsBillDiffEnumUtil.toTitle(5)
          },
          {
            id: 6,
            title: CustomsBillDiffEnumUtil.toTitle(6)
          },
          {
            id: 7,
            title: CustomsBillDiffEnumUtil.toTitle(7)
          },
          {
            id: 8,
            title: CustomsBillDiffEnumUtil.toTitle(8)
          },
        ],
        selectedValue: null,
        loading: false
      }
    },
    watch: {
      value(value) {
        if (value !== this.selectedValue) {
          this.selectedValue = value
        }
      }
    },
    created() {
      if (this.type === 'multiple') {
        this.selectedValue = this.value || []
      } else {
        this.selectedValue = this.value
      }
    },
    methods: {
      change(event) {
        this.$emit('input', event)
        this.$emit('changeData', event)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
