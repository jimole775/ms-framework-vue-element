<template>
  <div class="container">
    <MarinePriceConsultationEdit ref="marinePriceConsultationEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MarinePriceConsultationEdit from './../../../components/entity/marine-price-consultation/MarinePriceConsultationEdit'
export default {
  name: 'MarinePriceConsultationEditPage',
  components: {
    MarinePriceConsultationEdit
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
      this.$refs.marinePriceConsultationEdit.save()
    },
    resetData() {
      this.$refs.marinePriceConsultationEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
