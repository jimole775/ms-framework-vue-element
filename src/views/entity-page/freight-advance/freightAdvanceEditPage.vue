<template>
  <div class="container">
    <FreightAdvanceEdit ref="freightAdvanceEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import FreightAdvanceEdit from './../../../components/entity/freight-advance/FreightAdvanceEdit'
export default {
  name: 'FreightAdvanceEditPage',
  components: {
    FreightAdvanceEdit
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
      this.$refs.freightAdvanceEdit.save()
    },
    resetData() {
      this.$refs.freightAdvanceEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
