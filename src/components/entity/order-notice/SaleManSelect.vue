<template>
  <div class="shipment-notice-select-popup">
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="业务员查询"
      top="10vh"
      @close="close"
    >
      <div class="max-w">
        <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务员名称">
                <el-input v-model="keyword.userName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="业务员编码">
                <el-input v-model="keyword.userCode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
              <el-form-item class="search-btn-item">
                <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
                <el-button size="mini" @click="resetSearch">重置</el-button>
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
            @row-dblclick="doubleClick"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50" />
            <el-table-column
              show-overflow-tooltip
              prop="userName"
              label="业务员姓名" />
            <el-table-column
              show-overflow-tooltip
              prop="userCode"
              label="业务员编码" />
          </el-table>
        </template>
        <div class="m-w cen-box m-t-12">
          <el-pagination
            :current-page="page"
            :page-sizes="pageSize"
            :page-size="size"
            :total="count"
            :layout="'total, sizes, prev, pager, next, jumper'"
            @size-change="pageSizeChange"
            @current-change="pageNumberChange"
          />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading="loading" size="mini" @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import Validate from './../../../utils/validate.js'
  import userInfoServer from './../../../api/userInfoServer.js'
  const initSearchParams = {
    userName: null,
    userCode: null
  }
  export default {
    name: 'SaleManSelect',
    filters: {
    },
    props: {
      // isexception: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        keyword: {
          ...initSearchParams
        },

        loading: false,
        tableData: [],
        more: false,
        page: 1,
        size: 10,
        count: 0,
        pageSize: [10, 20, 30, 40, 50]
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
      commitSearch() {
        this.page = 1
        this.search()
      },
      async search() {
        this.loading = true
        const keyword = this.keyword
        const res = await userInfoServer.search({
          keyword,
          page: this.page - 1,
          size: this.size
        })
        this.tableData = [...res.data.data]
        this.count = res.data.page.total
        this.setPageSize()
        this.loading = false
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
      resetSearch() {
        this.keyword = {
          ...initSearchParams
        }
        this.page = 1
        this.search()
      },
      doubleClick(val) {
        this.$emit('confirm', val)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
  .el-form-item {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
    /deep/ .el-form-item__label {
      width: 135px;
    }
    /deep/ .el-form-item__content {
      width: calc(100% - 135px);
    }
  }
  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
  .el-dialog__header {
    padding: 12px 12px 6px;
  }
  .shipment-notice-select-popup {
    /deep/ .el-dialog__body {
      padding: 12px 20px;
    }
  }

</style>
