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
    @change="change"
  >
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.title"
      :value="item.id" />
  </el-select>
</template>
  
<script>

// import ABVotesEnumUtil from './../../enum/customs-bill/ABVotesEnumUtil'

export default {
  name: 'ABVotesEnumSelect',
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
      list: [],
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
    this.list = [
      {
        id: 'A',
        title: 'A'
      },
      {
        id: 'B',
        title: 'B'
      },
      {
        id: 'C',
        title: 'C'
      },
      {
        id: 'D',
        title: 'D'
      },
      {
        id: 'E',
        title: 'E'
      },
      {
        id: 'F',
        title: 'F'
      },
      {
        id: 'G',
        title: 'G'
      },
      {
        id: 'H',
        title: 'H'
      },
      {
        id: 'I',
        title: 'I'
      },
      {
        id: 'J',
        title: 'J'
      },
      {
        id: 'K',
        title: 'K'
      },
      {
        id: 'L',
        title: 'L'
      },
    ]
  },
  methods: {
    change(event) {
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
