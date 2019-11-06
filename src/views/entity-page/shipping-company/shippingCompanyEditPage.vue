<template>
  <div class="container">
    <ShippingCompanyEdit ref="shippingCompanyEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ShippingCompanyEdit from './../../../components/entity/shipping-company/ShippingCompanyEdit'
export default {
  name: 'ShippingCompanyEditPage',
  components: {
    ShippingCompanyEdit
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
      this.$refs.shippingCompanyEdit.save()
    },
    resetData() {
      this.$refs.shippingCompanyEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
