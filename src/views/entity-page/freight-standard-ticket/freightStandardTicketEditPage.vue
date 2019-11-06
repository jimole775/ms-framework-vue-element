<template>
  <div class="container">
    <FreightStandardTicketEdit ref="freightStandardTicketEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import FreightStandardTicketEdit from './../../../components/entity/freight-standard-ticket/FreightStandardTicketEdit'
export default {
  name: 'FreightStandardTicketEditPage',
  components: {
    FreightStandardTicketEdit
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
      this.$refs.freightStandardTicketEdit.save()
    },
    resetData() {
      this.$refs.freightStandardTicketEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
