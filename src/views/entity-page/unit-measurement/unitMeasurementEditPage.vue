<template>
  <div class="container">
    <UnitMeasurementEdit ref="unitMeasurementEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import UnitMeasurementEdit from './../../../components/entity/unit-measurement/UnitMeasurementEdit'
export default {
  name: 'UnitMeasurementEditPage',
  components: {
    UnitMeasurementEdit
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
      this.$refs.unitMeasurementEdit.save()
    },
    resetData() {
      this.$refs.unitMeasurementEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
