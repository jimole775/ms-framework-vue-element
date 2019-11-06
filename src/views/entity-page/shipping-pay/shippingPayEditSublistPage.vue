<template>
  <div>
    <ShippingPayEditSublist ref="shippingPayEdit" :id="id" @loadingChange="loadingChange" />    
  </div>
</template>

<script>
import ShippingPayEditSublist from './../../../components/entity/shipping-pay/ShippingPayEditSublist'
export default {
  name: 'ShippingPayEditSublistPage',
  components: {
    ShippingPayEditSublist
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
      this.$refs.shippingPayEdit.save()
    },
    resetData() {
      this.$refs.shippingPayEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
