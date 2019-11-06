<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item label="内容">
            <el-input v-model="keyword.content" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item label="类型">
            <el-input v-model="keyword.type" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="keyword.createTimeStart"
              class="max-w"
              type="datetime"
              placeholder="选择日期时间" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :md="8" :sm="12" :xs="24">
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="keyword.createTimeEnd"
              class="max-w"
              type="datetime"
              placeholder="选择日期时间" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :md="8" :sm="12" :xs="24">
          <el-form-item label="用户">
            <MassageSelect v-model="keyword.userId" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" @click="commitSearch">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
            <el-button type="text" @click="more = !more">
              {{ more ? '收起' : '更多' }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button-group>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="clickAddBtn">新增</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="clickBatchDeleteBtn">删除</el-button>
      <el-button type="primary" icon="el-icon-printer">打印</el-button>
    </el-button-group>
    <el-alert
      :closable="false"
      :title="`已选中 ${multipleSelection.length} 行数据`"
      class="m-t-24"
      type="info"
      show-icon />
    <template>
      <el-table
        :data="tableData"
        :loading="loading"
        border
        class="m-t-24"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55" />
        <el-table-column
          prop="content"
          label="content"
          sortable
          width="180" />
        <el-table-column
          prop="userId"
          sortable
          label="userId" />
        <el-table-column
          prop="type"
          label="type"
          sortable
          width="180" />
        <el-table-column
          :formatter="formatDateTime"
          prop="createTime"
          label="createTime"
          sortable
          width="180" />
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="clickViewBtn(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="clickEditBtn(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="m-w cen-box m-t-24">
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="size"
        :total="count"
        :layout="windowWidth < 768 ? 'total, jumper' : 'total, sizes, prev, pager, next, jumper'"
        @size-change="pageSizeChange"
        @current-change="pageNumberChange"
      />
    </div>
    <component
      v-if="showViewPopup"
      :is="'MessageViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'MessageEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'MessageDeletePopup'"
      :list="multipleSelection"
      @close="showDeletePopup = false"
      @update="update"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import Datetime from './../../../utils/datetime'
import MassageSelect from './../message/message-select'
import messageServer from './../../../api/messageServer'
const initSearchParams = {
  userId: [],
  content: '',
  createTimeStart: null,
  createTimeEnd: null,
  type: null
}
export default {
  name: 'MessageManagement',
  components: {
    MassageSelect,
    MessageViewPopup: () => import('./message-view-popup.vue'),
    MessageEditPopup: () => import('./message-edit-popup.vue'),
    MessageDeletePopup: () => import('./message-delete-popup.vue')
  },
  data() {
    return {
      loading: false,
      keyword: {
        ...initSearchParams
      },
      page: 1,
      size: 10,
      count: 0,
      sort: null,
      tableData: [],
      currentClickRow: {},
      multipleSelection: [],
      showViewPopup: false,
      showEditPopup: false,
      showDeletePopup: false,
      more: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    this.search()
  },
  methods: {
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = this.keyword
      let query = '*:*'
      if (keyword.userId && keyword.userId.length > 0) {
        query += ' AND ('
        keyword.userId.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `userId:${id}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.content)) {
        query += ` AND content:${keyword.content}`
      }
      if (keyword.createTimeStart) {
        query += ` AND createTime:[${Datetime.dateToDateStr(keyword.createTimeStart)} TO *]`
      }
      if (keyword.createTimeEnd) {
        query += ` AND createTime:[* TO ${Datetime.dateToDateStr(keyword.createTimeEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.type)) {
        query += ` AND type:${keyword.type}`
      }
      const res = await messageServer.search({
        query,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
      this.count = res.pagination.count
      this.loading = false
    },
    formatDateTime(row, column, cellValue) {
      return Datetime.dateTimeToDateTimeStr(cellValue)
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    clickViewBtn(row) {
      this.currentClickRow = row
      this.showViewPopup = true
    },
    clickEditBtn(row) {
      this.currentClickRow = row
      this.showEditPopup = true
    },
    clickAddBtn() {
      this.currentClickRow = {}
      this.showEditPopup = true
    },
    clickBatchDeleteBtn() {
      if (this.multipleSelection.length > 0) {
        this.showDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    commitSearch() {
      this.page = 1
      this.search()
    },
    resetSearch() {
      this.keyword = {
        ...initSearchParams
      }
      this.page = 1
      this.search()
    },
    update() {
      setTimeout(() => {
        this.search()
      }, 1000)
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    width: calc(100% - 24px);
    margin: 12px;
    padding: 24px;
    background-color: #ffffff;
  }
  .el-form-item {
    width: 100%;
    margin-right: 0;
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
