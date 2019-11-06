<template>
  <div>
    <ClearanceManualEditSublist ref="clearanceManualEdit" :id="id" @loadingChange="loadingChange" />    
  </div>
</template>

<script>
import ClearanceManualEditSublist from './../../../components/entity/clearance-manual/ClearanceManualEditSublist'
export default {
  name: 'ClearanceManualEditSublistPage',
  components: {
    ClearanceManualEditSublist
  },
  data() {
    return {
      loading: false,
      id: null
    }
  },
  created() {
    // this.id = this.$route.params.id
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? id : null
  },
  methods: {
    save() {
      this.$refs.clearanceManualEdit.save()
    },
    resetData() {
      this.$refs.clearanceManualEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
