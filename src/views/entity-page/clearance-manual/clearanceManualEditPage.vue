<template>
  <div class="container">
    <ClearanceManualEdit ref="clearanceManualEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ClearanceManualEdit from './../../../components/entity/clearance-manual/ClearanceManualEdit'
export default {
  name: 'ClearanceManualEditPage',
  components: {
    ClearanceManualEdit
  },
  data() {
    return {
      loading: false,
      id: null
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? id : null
  },
  methods: {
    save() {
      this.$refs.clearanceManualEdit.save()
    },
    resetData() {
      this.$refs.clearanceManualEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
