<template>
  <div class="container">
    <ClearanceManualItemEdit ref="clearanceManualItemEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ClearanceManualItemEdit from './../../../components/entity/clearance-manual-item/ClearanceManualItemEdit'
export default {
  name: 'ClearanceManualItemEditPage',
  components: {
    ClearanceManualItemEdit
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
      this.$refs.clearanceManualItemEdit.save()
    },
    resetData() {
      this.$refs.clearanceManualItemEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
