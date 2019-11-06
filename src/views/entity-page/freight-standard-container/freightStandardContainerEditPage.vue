<template>
  <div class="container">
    <FreightStandardContainerEdit ref="freightStandardContainerEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import FreightStandardContainerEdit from './../../../components/entity/freight-standard-container/FreightStandardContainerEdit'
export default {
  name: 'FreightStandardContainerEditPage',
  components: {
    FreightStandardContainerEdit
  },
  data() {
    return {
      loading: false,
      id: null
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  methods: {
    save() {
      this.$refs.freightStandardContainerEdit.save()
    },
    resetData() {
      this.$refs.freightStandardContainerEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
