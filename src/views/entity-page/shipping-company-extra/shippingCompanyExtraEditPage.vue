<template>
  <div class="container">
    <ShippingCompanyExtraEdit ref="shippingCompanyExtraEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ShippingCompanyExtraEdit from './../../../components/entity/shipping-company-extra/ShippingCompanyExtraEdit'
export default {
  name: 'ShippingCompanyExtraEditPage',
  components: {
    ShippingCompanyExtraEdit
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
      this.$refs.shippingCompanyExtraEdit.save()
    },
    resetData() {
      this.$refs.shippingCompanyExtraEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
