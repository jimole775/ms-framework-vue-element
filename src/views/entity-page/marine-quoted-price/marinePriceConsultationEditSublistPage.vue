<template>
  <div>
    <MarinePriceConsultationEditSublist ref="marinePriceConsultationEdit" :id="id" @loadingChange="loadingChange" />    
  </div>
</template>

<script>
import MarinePriceConsultationEditSublist from './../../../components/entity/marine-quoted-price/MarinePriceConsultationEditSublist'

export default {
  name: 'QuotedPriceEditSublist',
  components: {
    MarinePriceConsultationEditSublist
  },
  data() {
    return {
      loading: false,
      id: null
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? parseInt(id) : null
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
