<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="message-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'" style="height: 200px;">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :md="3" :sm="4" :xs="7" class="data-col-title">
                  id:
                </el-col>
                <el-col :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.id }}
                </el-col>
                <el-col :md="3" :sm="4" :xs="7" class="data-col-title">
                  content:
                </el-col>
                <el-col :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.content }}
                </el-col>
                <el-col :md="3" :sm="4" :xs="7" class="data-col-title">
                  createTime:
                </el-col>
                <el-col :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :md="3" :sm="4" :xs="7" class="data-col-title">
                  type:
                </el-col>
                <el-col :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.type }}
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="openEdit">编辑</el-button>
      </div>
    </el-dialog>
    <component v-if="showEdit" :is="'MessageEditPopup'" :id="id" @close="showEdit = false" />
  </div>
</template>

<script>
import messageServer from './../../../api/messageServer'
export default {
  name: 'MessageViewPopup',
  components: {
    MessageEditPopup: () => import('./message-edit-popup.vue')
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loading: true,
      showEdit: false,
      viewData: {}
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    if (this.id) {
      this.getData()
    }
  },
  methods: {
    openEdit() {
      this.showEdit = true
    },
    close() {
      this.$emit('close')
    },
    async getData() {
      const res = await messageServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
