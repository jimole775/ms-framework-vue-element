<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '744px'"
      title="delete-银行(单证)"
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
          未删:&nbsp;&nbsp;<template v-for="(item, index) in waitDelete">{{ index > 0 ? '、' : '' }}{{ item[showField] }}</template>
        </p>
        <p>
          已删:&nbsp;&nbsp;<template v-for="(item, index) in deleted">{{ index > 0 ? '、' : '' }}{{ item[showField] }}</template>
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
import bankServer from './../../../api/bankServer'
export default {
  name: 'BankDeletePopup',
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      showField: 'name',
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
      const waitDelete = this.waitDelete
      const deleted = [...this.deleted]
      this.deleteing = true
      this.loading = true
      for (let i = 0; i < waitDelete.length; i++) {
        const data = waitDelete[i]
        this.info = `正在删除 ${data[this.showField]}`
        try {
          if (this.list != null) await bankServer.delete(this.list[0])
        } catch (e) {
          this.status = 'exception'
          this.info = `删除 ${data[this.showField]} 失败`
          this.loading = false
          return
        }
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
        deleted.push(data)
        waitDelete.splice(i, 1)
        i--
        this.waitDelete = [...waitDelete]
        this.deleted = [...deleted]
        this.progress = parseInt(deleted.length / this.list.length * 100, 10)
        this.info = `成功删除 ${data[this.showField]}`
        if (!this.deleteing) {
          break
        }
      }
      this.deleteing = false
      this.loading = false
      if (this.waitDelete.length === 0) {
        this.status = 'success'
        this.$emit('update')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
