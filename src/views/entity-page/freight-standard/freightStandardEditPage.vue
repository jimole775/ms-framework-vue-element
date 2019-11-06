<template>
  <div class="container">
    <FreightStandardEdit ref="freightStandardEdit" :id="id" @loadingChange="loadingChange" />
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import FreightStandardEdit from './../../../components/entity/freight-standard/FreightStandardEdit'
export default {
  name: 'FreightStandardEditPage',
  components: {
    FreightStandardEdit
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
      this.$refs.freightStandardEdit.save()
    },
    resetData() {
      this.$refs.freightStandardEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
