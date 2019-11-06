<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="出境关别-view"
      top="10vh"
      @close="close">
      <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
        <el-row>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="编码">
              <el-input v-model="keyword.customsCode" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="名称">
              <el-input v-model="keyword.customsName" size="mini" />
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
          class="m-t-12"
          style="width: 100%"
          @row-dblclick="updateInfo"
          @selection-change="handleSelectionChange">
          <el-table-column
            show-overflow-tooltip
            prop="customsCode"
            sortable
            label="编码" />
          <el-table-column
            show-overflow-tooltip
            prop="customsName"
            sortable
            label="名称" />
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
import customsPortServer from './../../../api/customsPortServer'
export default {
  name: 'CustomsHouseViewPopup',
  data() {
    return {
      loading: true,
      tableData: [],
      keyword: {
        customsCode: null,
        customsName: null,
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
      const res = await customsPortServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = []
      res.data.forEach((item, index) => {
        this.$set(this.tableData, index, item)
      })
      this.count = res.page.total
      this.$nextTick(() => {
        this.setPageSize()
      })
      this.loading = false
    },
    commitSearch() {
      this.page = 1
      this.search()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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

<style scoped>
</style>
