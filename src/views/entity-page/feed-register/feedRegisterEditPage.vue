<template>
  <div class="container">
    <FeedRegisterEdit ref="feedRegisterEdit" :id="id" @loadingChange="loadingChange" />    
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" size="mini" @click="resetData">重置</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import FeedRegisterEdit from './../../../components/entity/feed-register/FeedRegisterEdit'
export default {
  name: 'FeedRegisterEditPage',
  components: {
    FeedRegisterEdit
  },
  data() {
    return {
      loading: false,
      id: null
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? id : null
  },
  methods: {
    save() {
      this.$refs.feedRegisterEdit.save()
    },
    resetData() {
      this.$refs.feedRegisterEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
