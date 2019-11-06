<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '744px'"
      title="delete-海运价格咨询明细"
      top="10vh"
      @close="close"
    >
      <div class="max-w">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="progress"
          :status="status"
        />
        <p>状态:&nbsp;&nbsp;{{ deleteing ? '删除中' : deleted.length === 0 ? '待确定' : waitDelete.length === 0 ? '完成' : '暂停中' }}</p>
        <p>进度:&nbsp;&nbsp;{{ deleted.length }}/{{ waitDelete.length + deleted.length }}</p>
        <p>
          未删:&nbsp;&nbsp;<template v-for="(item, index) in waitDelete">{{ index > 0 ? '、' : '' }}{{ item[showField] || (index + 1) }}</template>
        </p>
        <p>
          已删:&nbsp;&nbsp;<template v-for="(item, index) in deleted">{{ index > 0 ? '、' : '' }}{{ item[showField] || (index + 1) }}</template>
        </p>
        <p>详情:&nbsp;&nbsp;{{ info }}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="status === 'exception'" size="mini" @click="close">关闭</el-button>
        <div v-else>
          <el-button v-if="deleteing && waitDelete.length > 0" size="mini" @click="deleteing = false">停止</el-button>
          <el-button v-loading="loading" v-if="!deleteing && waitDelete.length > 0" type="primary" size="mini" @click="startDelete">开始</el-button>
          <el-button v-if="!deleteing && waitDelete.length === 0" type="primary" size="mini" @click="close">完成</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import marinePriceConsultationItemServer from './../../../api/marinePriceConsultationItemServer'
export default {
  name: 'MarinePriceConsultationItemDeletePopup',
  props: {
    list: {
      type: Array,
      default: null
    },
    showField: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      loading: false,
      deleteing: false,
      progress: 0,
      waitDelete: [],
      deleted: [],
      info: '',
      status: null
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
    showField(val) {
      console.log(val)
    }
  },
  created() {
    this.waitDelete = []
    this.deleted = []
    if (this.list) {
      this.waitDelete = [...this.list]
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async startDelete() {
      const waitDelete = [...this.waitDelete]
      this.deleteing = true
      this.loading = true
      const waitDeleteId = []
      waitDelete.forEach(item => {
        waitDeleteId.push(item.id)
      })
      try {
        await marinePriceConsultationItemServer.delete(waitDeleteId)
      } catch (e) {
        this.status = 'exception'
        this.info = `删除失败`
        this.loading = false
        return
      }
      this.info = `成功删除`
      this.deleteing = false
      this.loading = false
      this.status = 'success'
      this.$emit('update')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
