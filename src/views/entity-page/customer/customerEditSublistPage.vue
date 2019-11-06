<template>
  <div>
    <CustomerEditSublist ref="customerEdit" :id="id" @loadingChange="loadingChange" />    
  </div>
</template>

<script>
import CustomerEditSublist from './../../../components/entity/customer/CustomerEditSublist'
export default {
  name: 'CustomerEditSublistPage',
  components: {
    CustomerEditSublist
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
      this.$refs.customerEdit.save()
    },
    resetData() {
      this.$refs.customerEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
