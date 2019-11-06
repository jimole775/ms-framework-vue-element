<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="产品查询"
      top="10vh"
      @close="close">
      <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
        <el-row>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="匹配词">
              <el-input v-model="keyword.condition" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
            <el-form-item class="search-btn-item">
              <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template>
        <el-table
          :data="tableData"
          :loading="loading"
          border
          style="width: 100%"
          @row-dblclick="updateInfo">
          <el-table-column
            type="index"
            width="55"
            label="序号"/>
          <el-table-column
            show-overflow-tooltip
            prop="ab_votes"
            sortable
            min-width="100"
            label="AB票" />
          <el-table-column
            show-overflow-tooltip
            prop="item_h_name"
            sortable
            min-width="120"
            label="产品名称" />
          <el-table-column
            show-overflow-tooltip
            prop="qty"
            sortable
            min-width="80"
            label="数量" />
        </el-table>
      </template>
      <div class="m-w cen-box m-t-12">
        <el-pagination
          :current-page="page"
          :page-sizes="pageSize"
          :page-size="size"
          :total="count"
          :layout="windowWidth < 768 ? 'total, jumper' : 'total, sizes, prev, pager, next, jumper'"
          @size-change="pageSizeChange"
          @current-change="pageNumberChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import customsBillServer from './../../../api/customsBillServer'

export default {
  name: 'AddDetailViewPopup',
  components: {},
  props: {
    warnId: {
      type: Number | String | Array,
      default: null
    },
    abVotes: {
      type: Number | String | Array,
      default: null
    },
    noticeIds: {
      type: Number | String | Array,
      default: null
    },
  },
  data() {
    return {
      loading: true,
      tableData: [],
      keyword: {
        condition: null,
      },
      page: 1,
      size: 10,
      count: 0,
      pageSize: [10, 20, 30, 40, 50],
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    this.viewData = {}
    this.search()
  },
  methods: {
    async search() {
      this.loading = true
      const keyword = this.keyword
      keyword.warn_id = this.warnId
      keyword.ab_votes = this.abVotes
      keyword.notice_ids = this.noticeIds.join(',')
      this.multipleSelection = []
      const res = await customsBillServer.addDetailSearch({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res
      res.forEach((item, index) => {
        this.$set(this.tableData, index, item)
      })
      this.count = res.length
      this.pageSize = [res.length]
      // this.$nextTick(() => {
      //   this.setPageSize()
      // })
      this.loading = false
    },
    commitSearch() {
      this.page = 1
      this.search()
    },
    updateInfo(row) {
      this.$emit('updateInfo', row)
    },
    setPageSize() {
      // 重新设定分页条件
      this.pageSize = []
      for (let i = 1; i < 6; i++) {
        if (this.count > 10 * i) {
          this.pageSize.push(10 * i)
        }
      }
      this.pageSize.push(this.count)
    },
    pageSizeChange(val) {
      this.size = val
      this.page = 1
      this.search()
    },
    pageNumberChange(val) {
      this.page = val
      this.search()
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
    /deep/ .el-form-item__label {
      width: 90px;
    }
    /deep/ .el-form-item__content {
      width: calc(100% - 90px);
    }
  }
  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
</style>
