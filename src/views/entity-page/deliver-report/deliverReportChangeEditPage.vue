<template>
  <div class="container">
    <DeliverReportEdit ref="deliverReportEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import DeliverReportEdit from './../../../components/entity/deliver-report/DeliverReportEdit'
export default {
  name: 'DeliverReportChangeEditPage',
  components: {
    DeliverReportEdit
  },
  data() {
    return {
      loading: false,
      id: null
    }
  },
  created() {
    this.id = this.$route.params.id
    console.log(this.id)
  },
  methods: {
    save() {
      this.$refs.deliverReportEdit.save()
    },
    resetData() {
      this.$refs.deliverReportEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
