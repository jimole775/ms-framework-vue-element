<template>
  <div class="container">
    <MarinePriceConsultationItemEdit ref="marinePriceConsultationItemEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MarinePriceConsultationItemEdit from './../../../components/entity/marine-price-consultation-item/MarinePriceConsultationItemEdit'
export default {
  name: 'MarinePriceConsultationItemEditPage',
  components: {
    MarinePriceConsultationItemEdit
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
      this.$refs.marinePriceConsultationItemEdit.save()
    },
    resetData() {
      this.$refs.marinePriceConsultationItemEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
