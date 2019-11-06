<template>
  <div class="container">
    <ClearanceManualProductEdit ref="clearanceManualProductEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ClearanceManualProductEdit from './../../../components/entity/clearance-manual-product/ClearanceManualProductEdit'
export default {
  name: 'ClearanceManualProductEditPage',
  components: {
    ClearanceManualProductEdit
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
      this.$refs.clearanceManualProductEdit.save()
    },
    resetData() {
      this.$refs.clearanceManualProductEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
