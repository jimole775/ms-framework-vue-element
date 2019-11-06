<template>
  <div class="container">
    <OperateUnitEdit ref="operateUnitEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import OperateUnitEdit from './../../../components/entity/operate-unit/OperateUnitEdit'
export default {
  name: 'OperateUnitEditPage',
  components: {
    OperateUnitEdit
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
      this.$refs.operateUnitEdit.save()
    },
    resetData() {
      this.$refs.operateUnitEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
