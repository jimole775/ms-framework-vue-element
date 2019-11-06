<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>系统公告</span>
      </div>
      <el-table 
        :data="systemNotice"
        :loading="loading"
        highlight-current-row
        style="width: 100%"
        @row-dblclick="openNoticePreview($event)">
        <el-table-column
          prop="title"
          show-overflow-tooltip
          sortable
          min-width="95"
          label="主题">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column 
          prop="publishDate" 
          sortable 
          min-width="95" 
          label="发布时间">
          <template slot-scope="scope">{{ scope.row.publishDate | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
      </el-table>
      <div v-if="systemNotice.length" class="m-w cen-box m-t-12">
        <el-pagination
          :current-page="systemNoticePage"
          :total="systemNoticeTotal"
          :page-size="systemNoticeSize"
          small
          layout="prev, pager, next"
          @prev-click="systemNoticePageNumberChange"
          @next-click="systemNoticePageNumberChange"
          @current-change="systemNoticePageNumberChange" />
      </div>
    </el-card>
    <el-dialog
      :visible="previewPop"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '60%'"
      :title="previewTitle"
      top="10vh"
      center
      custom-class="system-notice--fix-overflow-text"
      @close="close">
      <section v-html="previewContent"/>
    </el-dialog>
  </div>
</template>
<script>
import homePageServer from './../../api/homePageServer'
export default {
  data() {
    return {         
      loading: false,   
      systemNotice: [],
      systemNoticeSize: 5,
      systemNoticePage: 1,
      systemNoticeTotal: 0,
      previewPop: false,
      previewContent: '',
      previewTitle: '',
      htmlContentBox: null
    }
  },  
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {      
    this.htmlContentBox = document.createElement('div')
    this.getSystemNotice()
  },
  methods: {
    close() {
        this.previewPop = false
    },
    openNoticePreview(row) {
        this.previewContent = this.reformHtmlContent(row.noticeContent)
        this.previewTitle = row.title
        this.previewPop = true
    },
    reformHtmlContent(val) {
        // 把转义符转成标签
        if (/&lt;/.test(val)) {
          this.htmlContentBox.innerHTML = val
          return this.htmlContentBox.innerText || this.htmlContentBox.textContent
        } else {
          return val
        }
    },
    systemNoticePageNumberChange(val) {
      this.systemNoticePage = val
      this.getSystemNotice()
    },
    async getSystemNotice() {
      const paging = {
        size: this.systemNoticeSize,
        page: this.systemNoticePage - 1,
      }
      const { data: { data: { data, page }}} = await homePageServer.getSystemNotice({ paging })
      this.systemNotice = data
      this.systemNoticeTotal = page.total
    }
  }
}
</script>

<style>
  .system-notice--fix-overflow-text{
    overflow: auto;
  }
</style>
