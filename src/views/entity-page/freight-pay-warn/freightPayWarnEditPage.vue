<template>
  <div class="container">
    <FreightPayWarnEdit ref="freightPayWarnEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import FreightPayWarnEdit from './../../../components/entity/freight-pay-warn/FreightPayWarnEdit'
export default {
  name: 'FreightPayWarnEditPage',
  components: {
    FreightPayWarnEdit
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
      this.$refs.freightPayWarnEdit.save()
    },
    resetData() {
      this.$refs.freightPayWarnEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
