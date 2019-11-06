<template>
  <div>
    <div class="container">
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="save">保存</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
      <el-button v-if="formData.stat === '1'" v-show="formData.id" type="danger" icon="el-icon-delete" size="mini" @click="del">删除</el-button>
      <el-button v-if="formData.stat === '1' || formData.stat === '4'" v-show="formData.id" type="primary" size="mini" icon="el-icon-check">提交</el-button>
    </div>
    <div class="container m-t-not">
      <GetContainerProjectEdit ref="getContainerProjectEdit" :id="id" @loadingChange="loadingChange" />
    </div>
    <!--<div class="max-w">-->
    <!--<div class="f-r">-->
    <!--<el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>-->
    <!--<el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import GetContainerProjectEdit from './../../../components/entity/get-container-project/GetContainerProjectEdit'
export default {
  name: 'GetContainerProjectEditPage',
  components: {
    GetContainerProjectEdit
  },
  data() {
    return {
      loading: false,
      id: null,
      formData: {}
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? parseInt(id) : null
  },
  methods: {
    save() {
      this.$refs.getContainerProjectEdit.save()
    },
    resetData() {
      this.$refs.getContainerProjectEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
