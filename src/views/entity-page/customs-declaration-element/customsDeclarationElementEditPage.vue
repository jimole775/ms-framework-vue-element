<template>
  <div class="container">
    <CustomsDeclarationElementEdit ref="customsDeclarationElementEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomsDeclarationElementEdit from './../../../components/entity/customs-declaration-element/CustomsDeclarationElementEdit'
export default {
  name: 'CustomsDeclarationElementEditPage',
  components: {
    CustomsDeclarationElementEdit
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
      this.$refs.customsDeclarationElementEdit.save()
    },
    resetData() {
      this.$refs.customsDeclarationElementEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
